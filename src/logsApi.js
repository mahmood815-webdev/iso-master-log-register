import { supabase } from './supabaseClient';

// سائن ان
export async function loginWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// سائن آؤٹ
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// لاگز پڑھنا
export async function getMasterLogs() {
  const { data, error } = await supabase
    .from('master_logs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// نیا لاگ شامل کرنا + براؤزر میں بیک اپ رکھنا
export async function createMasterLog(logData, userId) {
  const { data, error } = await supabase
    .from('master_logs')
    .insert([{ ...logData, user_id: userId }])
    .select();
  if (error) throw error;

  const savedItem = data[0];
  localStorage.setItem('last_master_log_entry', JSON.stringify(savedItem));
  return savedItem;
}

// لوکل ڈرائیو پر بیک اپ فائل ڈاؤن لوڈ کرنا
export function saveBackupToLocalDrive(logs) {
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'master-logs-backup.json';
  link.click();
  URL.revokeObjectURL(url);
}