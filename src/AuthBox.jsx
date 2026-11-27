import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function AuthBox({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setMessage('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        if (data.session) {
          onAuthSuccess?.(data.session.user);
        } else {
          setMessage('اکاؤنٹ بن گیا ہے! براہِ مہربانی اپنا ای میل/جی میل ان باکس چیک کر کے تصدیق (Confirm) کریں اور پھر لاگ ان کریں۔');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onAuthSuccess?.(data.user);
      }
    } catch (err) {
      setErrorMsg(err.message || 'کوئی مسئلہ پیش آ گیا ہے۔');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 380, margin: '40px auto', padding: 24, border: '1px solid #333', borderRadius: 10 }}>
      <h2>{isSignUp ? 'نیا اکاؤنٹ بنائیں (Sign Up)' : 'لاگ ان کریں (Sign In)'}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="اپنا ای میل یا جی میل لکھیں"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="پاس ورڈ (کم از کم 6 حروف)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'انتظار کریں...' : isSignUp ? 'سائن اپ کریں' : 'لاگ ان کریں'}
        </button>
      </form>

      {errorMsg && <p style={{ color: 'red', marginTop: 10 }}>{errorMsg}</p>}
      {message && <p style={{ color: 'green', marginTop: 10 }}>{message}</p>}

      <button
        type="button"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setErrorMsg('');
          setMessage('');
        }}
        style={{ marginTop: 14, background: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
      >
        {isSignUp ? 'پہلے سے اکاؤنٹ ہے؟ لاگ ان پر جائیں' : 'نیا صارف ہیں؟ اکاؤنٹ بنائیں'}
      </button>
    </div>
  );
}