import { supabase } from './supabaseClient';

// ========================
// 1. AUTHENTICATION API
// ========================

// Sign Up (Optional, to create a test user)
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

// Sign In
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// Sign Out (current session)
export async function signOut() {
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) throw error;
}

// ========================
// 2. CRUD API (Table: 'logs')
// ========================

// CREATE
export async function createLog(newLog) {
  const { data, error } = await supabase
    .from('logs')
    .insert([newLog])
    .select();
  if (error) throw error;
  return data;
}

// READ (Fetch all)
export async function getLogs() {
  const { data, error } = await supabase
    .from('logs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// UPDATE
export async function updateLog(id, updatedFields) {
  const { data, error } = await supabase
    .from('logs')
    .update(updatedFields)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
}

// DELETE
export async function deleteLog(id) {
  const { error } = await supabase
    .from('logs')
    .delete()
    .eq('id', id);
  if (error) throw error;
}