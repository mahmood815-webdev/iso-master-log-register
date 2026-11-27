import { useEffect, useState } from 'react';
import {
  saveLogsToCache,
  loadLogsFromCache,
  downloadAsJSON,
  downloadAsCSV,
} from './utils/backupHelper';

  // 1. Existing form input states (keep whatever fields your app already uses)
  const [docNo, setDocNo] = useState('');
  const [title, setTitle] = useState('');

  // 2. Existing logs list: initialize from localStorage cache so old records load immediately
  const [logs, setLogs] = useState(() => {
    const cached = loadLogsFromCache();
    return Array.isArray(cached) ? cached : [];
  });

  // 3. Whenever `logs` updates (new entry, edit, delete, or fetch), cache the list automatically
  useEffect(() => {
    saveLogsToCache(logs);
  }, [logs]);

  // 4. Existing submit handler: append new entry to `logs` without breaking other inputs
  function handleCreateEntry(e) {
    e.preventDefault();
    if (!docNo.trim() || !title.trim()) return;

    const entry = {
      id: Date.now(),
      docNo: docNo.trim(),
      title: title.trim(),
      savedAt: new Date().toISOString(),
    };

    setLogs((prevLogs) => [entry, ...prevLogs]);
    setDocNo('');
    setTitle('');
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Existing form stays intact */}
      <form onSubmit={handleCreateEntry} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Document No"
          value={docNo}
          onChange={(e) => setDocNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Save Entry</button>
      </form>

      {/* Backup buttons wired directly to the existing `logs` state */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button type="button" onClick={() => downloadAsJSON(logs)}>
          Download JSON Backup
        </button>
        <button type="button" onClick={() => downloadAsCSV(logs)}>
          Download CSV / Excel Backup
        </button>
      </div>

      {/* Existing table or list rendering `logs` */}
      <ul>
        {logs.map((item) => (
          <li key={item.id}>
            {item.docNo} — {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import AuthBox from './AuthBox';

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setCheckingAuth(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  // نیا لاگ محفوظ کرتے وقت user.id بھیجنے کی مثال:
  // await supabase.from('master_logs').insert([{ ...newLog, user_id: user.id }])

  if (checkingAuth) return <p>لوڈ ہو رہا ہے...</p>;

  if (!user) {
    return <AuthBox onAuthSuccess={(loggedInUser) => setUser(loggedInUser)} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
        <span>صارف: {user.email}</span>
        <button onClick={handleLogout}>لاگ آؤٹ (Logout)</button>
      </div>

      {/* یہاں آپ کا موجودہ Master Log Register کا مین کمپوننٹ آئے گا */}
    </div>
  );
}