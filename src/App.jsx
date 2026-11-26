import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { signIn, signOut, getLogs, createLog, updateLog, deleteLog } from './api';

export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logs, setLogs] = useState([]);
  const [title, setTitle] = useState('');

  // 1. Track Auth State (Sign In / Sign Out)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchLogs();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchLogs();
      else setLogs([]);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchLogs = async () => {
    const data = await getLogs();
    setLogs(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createLog({ title, status: 'Open' });
    setTitle('');
    fetchLogs();
  };

  const handleToggleStatus = async (log) => {
    const nextStatus = log.status === 'Open' ? 'Closed' : 'Open';
    await updateLog(log.id, { status: nextStatus });
    fetchLogs();
  };

  const handleDelete = async (id) => {
    await deleteLog(id);
    fetchLogs();
  };

  // 3. Render Login Screen if Signed Out
  if (!session) {
    return (
      <form onSubmit={handleLogin} style={{ padding: 20 }}>
        <h2>Sign In</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
    );
  }

  // 4. Render CRUD Dashboard if Signed In
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Master Log Register</h2>
        <button onClick={signOut}>Sign Out</button>
      </div>

      {/* CREATE */}
      <form onSubmit={handleAdd}>
        <input placeholder="New log title..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      {/* READ, UPDATE, DELETE */}
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.title} — <strong>{log.status}</strong>
            <button onClick={() => handleToggleStatus(log)}>Toggle Status</button>
            <button onClick={() => handleDelete(log.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}