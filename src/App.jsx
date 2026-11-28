import { useEffect, useState } from 'react';
import {
  loadLogsFromCache,
  saveLogsToCache,
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
  const [statusMsg, setStatusMsg] = useState('');

  // لوکل کیش سے پرانے لاگز فوراً لوڈ کریں
  const [logs, setLogs] = useState(() => {
    const cached = loadLogsFromCache();
    return Array.isArray(cached) ? cached : [];
  });

  // لاگ ان اسٹیٹس چیک اور مانیٹر کریں
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

  // لاگ ان ہونے پر Supabase سے لاگز لائیں (اگر ٹیبل موجود ہو)
  useEffect(() => {
    if (!user) return;

    async function fetchRemoteLogs() {
      const { data, error } = await supabase
        .from('master_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const normalized = data.map((row) => ({
          id: row.id,
          docNo: row.doc_no ?? row.docNo ?? '',
          title: row.title ?? '',
        }));
        setLogs(normalized);
      }
    }

    fetchRemoteLogs();
  }, [user]);

  // جب بھی logs بدلیں تو لوکل کیش میں خود بخود سیو کریں
  useEffect(() => {
    saveLogsToCache(logs);
  }, [logs]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setStatusMsg('');
  }

  async function handleCreateEntry(e) {
    e.preventDefault();
    const cleanDocNo = docNo.trim();
    const cleanTitle = title.trim();
    if (!cleanDocNo || !cleanTitle) return;

    const tempId = Date.now();
    const newEntry = {
      id: tempId,
      docNo: cleanDocNo,
      title: cleanTitle,
    };

    // فہرست اور لوکل کیش میں فوراً شامل کریں
    setLogs((prev) => [newEntry, ...prev]);
    setDocNo('');
    setTitle('');
    setStatusMsg('لاگ لوکل اور کیش میں محفوظ ہو گیا ہے۔');

    // اگر یوزر لاگ ان ہے تو Supabase میں بھی محفوظ کرنے کی کوشش کریں
    if (user) {
      const { data, error } = await supabase
        .from('master_logs')
        .insert([
          {
            doc_no: cleanDocNo,
            title: cleanTitle,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) {
        setStatusMsg('لوکل سیو ہو گیا، مگر Supabase میں محفوظ کرتے وقت پیغام: ' + error.message);
      } else if (data) {
        setLogs((prev) =>
          prev.map((item) =>
            item.id === tempId
              ? {
                  id: data.id,
                  docNo: data.doc_no ?? cleanDocNo,
                  title: data.title ?? cleanTitle,
                }
              : item
          )
        );
        setStatusMsg('لاگ Supabase بیک اینڈ اور لوکل دونوں میں محفوظ ہو گیا ہے۔');
      }
    }
  }

  if (checkingAuth) {
    return <p style={{ padding: '20px' }}>لوڈ ہو رہا ہے...</p>;
  }

  if (!user) {
    return <AuthBox />;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>ISO Master Log Register</h2>
          <small>لاگ ان یوزر: {user.email}</small>
        </div>
        <button type="button" onClick={handleLogout}>
          لاگ آؤٹ (Logout)
        </button>
      </div>

      {statusMsg && (
        <p style={{ marginBottom: '12px', fontSize: '14px' }}>{statusMsg}</p>
      )}

      {/* نئی انٹری کا فارم */}
      <form
        onSubmit={handleCreateEntry}
        style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}
      >
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

      {/* بیک اپ بٹنز */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => downloadAsJSON(logs)}>
          Download JSON Backup
        </button>
        <button type="button" onClick={() => downloadAsCSV(logs)}>
          Download CSV / Excel Backup
        </button>
      </div>

      {/* محفوظ شدہ لاگز کی فہرست */}
      <ul>
        {logs.map((item) => (
          <li key={item.id}>
            {item.docNo} — {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}