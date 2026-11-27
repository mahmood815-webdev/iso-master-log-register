const STORAGE_KEY = 'iso_master_logs_cache';

// 1. تمام لاگز کو براؤزر کے localStorage میں محفوظ (Cache) کرنا
export function saveLogsToCache(logs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('LocalStorage میں ڈیٹا محفوظ نہیں ہو سکا:', error);
  }
}

// 2. براؤزر کے localStorage سے محفوظ شدہ لاگز واپس پڑھنا
export function loadLogsFromCache() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('LocalStorage سے ڈیٹا پڑھنے میں مسئلہ:', error);
    return [];
  }
}

// 3. لاگز کو JSON فائل کی صورت میں لوکل ڈرائیو پر ڈاؤن لوڈ کرنا
export function downloadAsJSON(logs) {
  if (!logs || logs.length === 0) {
    alert('ڈاؤن لوڈ کرنے کے لیے کوئی لاگ موجود نہیں ہے۔');
    return;
  }

  const fileName = `master-log-backup-${new Date().toISOString().slice(0, 10)}.json`;
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
  triggerDownload(blob, fileName);
}

// 4. لاگز کو CSV (جو Excel میں براہِ راست کھلتی ہے) کی صورت میں لوکل ڈرائیو پر ڈاؤن لوڈ کرنا
export function downloadAsCSV(logs) {
  if (!logs || logs.length === 0) {
    alert('ڈاؤن لوڈ کرنے کے لیے کوئی لاگ موجود نہیں ہے۔');
    return;
  }

  const headers = Object.keys(logs[0]);
  const csvRows = [
    headers.join(','), // پہلی لائن: کالم کے نام
    ...logs.map((row) =>
      headers
        .map((field) => {
          const value = row[field] ?? '';
          const escaped = String(value).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(',')
    ),
  ];

  // BOM (\uFEFF) شامل کرنے سے اردو اور خاص حروف Excel میں بالکل درست نظر آتے ہیں
  const csvContent = '\uFEFF' + csvRows.join('\n');
  const fileName = `master-log-backup-${new Date().toISOString().slice(0, 10)}.csv`;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, fileName);
}

// مشترکہ ڈاؤن لوڈ ہیلپر فنکشن
function triggerDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}