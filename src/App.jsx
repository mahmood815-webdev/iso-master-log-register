import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const statusStyles = {
  Approved: 'bg-emerald-100 text-emerald-800 border-emerald-300 focus:ring-emerald-500',
  'Under Review': 'bg-amber-100 text-amber-800 border-amber-300 focus:ring-amber-500',
  'Revise & Resubmit': 'bg-rose-100 text-rose-800 border-rose-300 focus:ring-rose-500',
  Rejected: 'bg-red-100 text-red-800 border-red-300 focus:ring-red-500',
};

const statusOptions = ['Approved', 'Under Review', 'Revise & Resubmit', 'Rejected'];

export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState(null);

  const [submittals, setSubmittals] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [isMutating, setIsMutating] = useState(false); // Global mutation indicator
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const fileInputRef = useRef(null);

  // New submittal form state
  const [formData, setFormData] = useState({
    title: '',
    discipline: 'Civil / Structural',
    contractor: '',
    status: 'Under Review',
    submittedDate: new Date().toISOString().slice(0, 10),
    dueDate: '',
    rev: '00',
  });

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch initial data + Realtime subscription
  useEffect(() => {
    if (!session) return;

    const fetchSubmittals = async () => {
      setLoadingData(true);
      const { data, error } = await supabase
        .from('submittals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching submittals:', error.message);
      else setSubmittals(data || []);
      setLoadingData(false);
    };

    fetchSubmittals();

    const channel = supabase
      .channel('submittals-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'submittals' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setSubmittals((prev) => {
              // Avoid duplicates if inserted optimistically
              if (prev.some((item) => item.id === payload.new.id)) return prev;
              return [payload.new, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            setSubmittals((prev) =>
              prev.map((item) => (item.id === payload.new.id ? payload.new : item))
            );
          } else if (payload.eventType === 'DELETE') {
            setSubmittals((prev) => prev.filter((item) => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setAuthError(error.message);
      else alert('Sign-up successful! Please check your email or log in.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- OPTIMISTIC SUBMITTAL INSERTION ---
  const handleAddSubmittal = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.contractor || !session) return;

    const tempId = `SUB-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord = {
      id: tempId,
      title: formData.title,
      discipline: formData.discipline,
      contractor: formData.contractor,
      status: formData.status,
      submitted_date: formData.submittedDate,
      due_date: formData.dueDate || null,
      rev: formData.rev,
      user_id: session.user.id,
      created_at: new Date().toISOString(),
    };

    // 1. Optimistic local state update
    setSubmittals((prev) => [newRecord, ...prev]);
    setFormData({
      title: '',
      discipline: 'Civil / Structural',
      contractor: '',
      status: 'Under Review',
      submittedDate: new Date().toISOString().slice(0, 10),
      dueDate: '',
      rev: '00',
    });
    setIsMutating(true);

    // 2. Perform background request
    const { error } = await supabase.from('submittals').insert([newRecord]);
    setIsMutating(false);

    // 3. Roll back if network fails
    if (error) {
      alert(`Failed to save submittal: ${error.message}`);
      setSubmittals((prev) => prev.filter((item) => item.id !== tempId));
    }
  };

  // --- OPTIMISTIC STATUS UPDATE ---
  const handleStatusChange = async (id, newStatus) => {
    const previousSubmittals = [...submittals];

    // 1. Optimistic update
    setSubmittals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setIsMutating(true);

    // 2. Background sync
    const { error } = await supabase
      .from('submittals')
      .update({ status: newStatus })
      .eq('id', id);

    setIsMutating(false);

    // 3. Rollback on failure
    if (error) {
      alert(`Failed to update status: ${error.message}`);
      setSubmittals(previousSubmittals);
    }
  };

  // --- OPTIMISTIC RECORD DELETION ---
  const handleDeleteSubmittal = async (id) => {
    if (!window.confirm(`Are you sure you want to delete submittal record ${id}?`)) return;

    const previousSubmittals = [...submittals];

    // 1. Optimistic removal
    setSubmittals((prev) => prev.filter((item) => item.id !== id));
    setIsMutating(true);

    // 2. Background delete
    const { error } = await supabase.from('submittals').delete().eq('id', id);
    setIsMutating(false);

    // 3. Rollback on failure
    if (error) {
      alert(`Failed to delete record: ${error.message}`);
      setSubmittals(previousSubmittals);
    }
  };

  // Excel Operations
  const handleExportExcel = () => {
    const exportData = filteredSubmittals.map((item) => ({
      'Submittal ID': item.id,
      'Title / Description': item.title,
      Discipline: item.discipline,
      Contractor: item.contractor,
      Revision: item.rev,
      Status: item.status,
      'Submitted Date': item.submitted_date || 'N/A',
      'Due Date': item.due_date || 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submittals Master Log');
    XLSX.writeFile(
      workbook,
      `Submittals_Master_Log_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      const batchRecords = parsedData.map((row, index) => ({
        id: row['Submittal ID'] || row['ID'] || `SUB-IMP-${Date.now().toString().slice(-4)}-${index}`,
        title: row['Title / Description'] || row['Title'] || 'Untitled Submittal',
        discipline: row['Discipline'] || 'General',
        contractor: row['Contractor'] || 'N/A',
        status: row['Status'] || 'Under Review',
        submitted_date: row['Submitted Date'] || new Date().toISOString().slice(0, 10),
        due_date: row['Due Date'] || null,
        rev: row['Revision'] || row['Rev'] || '00',
        user_id: session.user.id,
      }));

      setIsMutating(true);
      const { error } = await supabase.from('submittals').insert(batchRecords);
      setIsMutating(false);

      if (error) {
        alert(`Failed to import batch: ${error.message}`);
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = '';
  };

  // Filtering
  const filteredSubmittals = submittals.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contractor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalCount = submittals.length;
  const approvedCount = submittals.filter((i) => i.status === 'Approved').length;
  const reviewCount = submittals.filter((i) => i.status === 'Under Review').length;
  const actionRequiredCount = submittals.filter(
    (i) => i.status === 'Revise & Resubmit' || i.status === 'Rejected'
  ).length;

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl text-white">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-wide">Submittals Master Log</h1>
            <p className="text-xs text-slate-400 mt-1">Enterprise Document Control Portal</p>
          </div>

          {authError && (
            <div className="mb-4 bg-rose-900/50 border border-rose-700 text-rose-200 text-xs p-3 rounded-lg">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg py-2.5 transition-colors shadow-sm"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-blue-400 hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top Header */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide">Submittals Master Log</h1>
            <p className="text-xs text-slate-400">
              Connected as <span className="text-blue-400">{session.user.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Background Syncing Pill */}
            {isMutating && (
              <span className="flex items-center gap-1.5 text-xs bg-amber-900/60 border border-amber-700 text-amber-200 px-3 py-1 rounded-full font-medium animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Syncing changes...
              </span>
            )}
            <button
              onClick={handleLogout}
              className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-md text-slate-300 transition-colors"
            >
              Sign Out
            </button>
            <span className="text-xs bg-emerald-900 border border-emerald-700 text-emerald-200 px-3 py-1 rounded-full font-medium">
              Supabase Live DB
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Submittals
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
              📋
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                Approved
              </p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-1">{approvedCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
              ✓
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Under Review
              </p>
              <h3 className="text-2xl font-bold text-amber-700 mt-1">{reviewCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
              ⏳
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                Action Required
              </p>
              <h3 className="text-2xl font-bold text-rose-700 mt-1">
                {actionRequiredCount}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold">
              ⚠️
            </div>
          </div>
        </section>

        {/* Quick Add Form */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-md font-semibold text-slate-900 mb-4">Log New Submittal</h2>
          <form onSubmit={handleAddSubmittal} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Submittal Title"
              value={formData.title}
              onChange={handleInputChange}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="contractor"
              placeholder="Contractor / Vendor"
              value={formData.contractor}
              onChange={handleInputChange}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="discipline"
              value={formData.discipline}
              onChange={handleInputChange}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Civil / Structural">Civil / Structural</option>
              <option value="MEP">MEP</option>
              <option value="Architectural">Architectural</option>
              <option value="QA/QC">QA/QC</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg px-4 py-2 transition-colors flex items-center justify-center gap-2"
            >
              Add Entry
            </button>
          </form>
        </section>

        {/* Action Controls */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by ID, title, or contractor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                Filter Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Under Review">Under Review</option>
                <option value="Revise & Resubmit">Revise & Resubmit</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportExcel}
              accept=".xlsx, .xls, .csv"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              📥 Import Excel
            </button>
            <button
              onClick={handleExportExcel}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              📊 Export Excel ({filteredSubmittals.length})
            </button>
          </div>
        </section>

        {/* Data Table */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Submittal ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Discipline</th>
                  <th className="py-3 px-4">Contractor</th>
                  <th className="py-3 px-4">Rev</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loadingData ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-medium">Fetching records from Supabase...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredSubmittals.length > 0 ? (
                  filteredSubmittals.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">
                        {item.id}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">{item.title}</td>
                      <td className="py-3 px-4 text-slate-600">{item.discipline}</td>
                      <td className="py-3 px-4 text-slate-600">{item.contractor}</td>
                      <td className="py-3 px-4 text-slate-600 font-mono">{item.rev}</td>
                      <td className="py-3 px-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-xs font-semibold rounded-full px-2.5 py-1 border cursor-pointer focus:outline-none focus:ring-2 ${
                            statusStyles[item.status] ||
                            'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-white text-slate-800">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteSubmittal(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors"
                          title="Delete record"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-slate-400">
                      No submittal records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}