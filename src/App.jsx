import { useEffect, useState } from 'react';
import {
  saveLogsToCache,
  loadLogsFromCache,
  downloadAsJSON,
  downloadAsCSV,
} from './utils/backupHelper';
import { supabase } from './supabaseClient';
import AuthBox from './AuthBox';

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [docNo, setDocNo] = useState('');
  const [title, setTitle] = useState('');
  const [logs, setLogs] = useState(() => {
    const cached = loadLogsFromCache();
    return Array.isArray(cached) ? cached : [];
  });

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

  useEffect(() => {
    saveLogsToCache(logs);
  }, [logs]);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

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

      <div style={{ padding: '20px' }}>
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

        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <button type="button" onClick={() => downloadAsJSON(logs)}>
            Download JSON Backup
          </button>
          <button type="button" onClick={() => downloadAsCSV(logs)}>
            Download CSV / Excel Backup
          </button>
        </div>

        <ul>
          {logs.map((item) => (
            <li key={item.id}>
              {item.docNo} — {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}