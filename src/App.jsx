import React, { useState, useMemo, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Layers,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldAlert,
  ChevronRight,
  X,
  Building2,
  Zap,
  Wrench,
  Compass,
  Image,
  ExternalLink,
  UploadCloud,
  MapPin,
  Briefcase,
  HardHat,
  Edit3,
  Check,
  XCircle,
  Printer,
  Copy,
  Mail,
  MessageSquare,
  FileSpreadsheet,
  Save,
  FolderOpen,
  CloudUpload,
  LayoutGrid,
  CloudSun,
  ShieldCheck,
  CheckSquare,
  Square,
  ChevronDown,
  Wind,
  Globe,
  Share2,
  Send,
  Phone,
  Code2,
  LogOut
} from 'lucide-react';
import {
  loadLogsFromCache,
  saveLogsToCache,
  downloadAsJSON,
  downloadAsCSV
} from './utils/backupHelper';
import { supabase } from './supabaseClient';
import AuthBox from './AuthBox';

// --- ISO 19650 Standard Construction Document Types ---
const DOCUMENT_TYPES = [
  { value: 'Submittals', code: 'SUB', label: 'Submittals (SUB)' },
  { value: 'Transmittals', code: 'TRN', label: 'Transmittals (TRN)' },
  { value: 'Material Approval Request', code: 'MAR', label: 'Material Approval Request (MAR)' },
  { value: 'Material Inspection Request', code: 'MIR', label: 'Material Inspection Request (MIR)' },
  { value: 'Work Inspection Request', code: 'WIR', label: 'Work Inspection Request (WIR)' },
  { value: 'Request for Information', code: 'RFI', label: 'Request for Information (RFI)' },
  { value: 'Shop Drawings', code: 'SHD', label: 'Shop Drawings (SHD)' },
  { value: 'As-Built Drawings', code: 'ABD', label: 'As-Built Drawings (ABD)' },
  { value: 'Method Statements', code: 'MST', label: 'Method Statements (MST)' },
  { value: 'Inspection & Test Plan', code: 'ITP', label: 'Inspection & Test Plan (ITP)' },
  { value: 'Non-Conformance Report', code: 'NCR', label: 'Non-Conformance Report (NCR)' },
  { value: 'Site Observation Report', code: 'SOR', label: 'Site Observation Report (SOR)' },
  { value: 'Daily Progress Report', code: 'DPR', label: 'Daily Progress Report (DPR)' },
  { value: 'Minutes of Meeting', code: 'MOM', label: 'Minutes of Meeting (MOM)' },
  { value: 'Technical Submittal', code: 'TSB', label: 'Technical Submittal (TSB)' },
  { value: 'Field Change Order', code: 'FCO', label: 'Field Change Order (FCO)' },
  { value: 'HSE Safety Inspection', code: 'HSE', label: 'HSE Safety Inspection (HSE)' },
  { value: 'Handover & O&M Manuals', code: 'HOM', label: 'Handover & O&M Manuals (HOM)' }
];

const AVAILABLE_DISCIPLINES = [
  'Civil',
  'Architecture',
  'Structure',
  'Electrical',
  'HVAC',
  'Plumbing & Drainage',
  'Fire Fighting',
  'Survey & Infrastructure',
  'HSE & QA/QC'
];

const STATUS_OPTIONS = [
  'Under Review',
  'Approved (Code A)',
  'Approved as Noted (Code B)',
  'Revise & Resubmit (Code C)',
  'Rejected (Code D)'
];

const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    projectName: 'COMMERCIAL HIGH-RISE TOWER & INFRASTRUCTURE',
    projectCode: 'PRJ-2026',
    client: 'Metropolitan Development Authority',
    consultant: 'Arup & Partners Engineering',
    contractor: 'Apex Global Construction Ltd.',
    location: 'Plot 402, Central Business District'
  },
  {
    id: 'proj-2',
    projectName: 'REGIONAL MEDICAL CENTER & UTILITY PLANT',
    projectCode: 'RMC-108',
    client: 'National Healthcare Trust',
    consultant: 'Buro Happold Consultants',
    contractor: 'Apex Global Construction Ltd.',
    location: 'North Corridor, Sector 7'
  }
];

const DEFAULT_SAFETY_ITEMS = [
  { id: 's1', label: 'Full PPE compliance verified (Hard hats, Hi-Vis, Steel-toe boots, Eye protection)', checked: true },
  { id: 's2', label: 'Morning Toolbox Talk (TBT) conducted & signed by all site supervisors', checked: true },
  { id: 's3', label: 'Scaffolding green-tagged & edge protection / fall arrest systems inspected', checked: true },
  { id: 's4', label: 'Excavation shoring, trench barriers & underground utility permits checked', checked: false },
  { id: 's5', label: 'Tower crane / lifting gear daily pre-use inspection & banksman assigned', checked: false },
  { id: 's6', label: 'Temporary electrical DB boards ELCB tested & fire extinguishers accessible', checked: false }
];

const INITIAL_ENTRIES = [
  {
    id: 'PRJ-2026-CON-Z1-SUB-0001',
    module: 'Submittals',
    rev: 'Rev 0',
    date: '2026-11-10',
    title: 'Substation Foundation Reinforcement Shop Drawing & Bar Bending Schedule',
    disciplines: ['Civil', 'Structure'],
    status: 'Approved (Code A)',
    originator: 'CON',
    zone: 'Z1',
    author: 'Eng. Tariq Mahmood (Lead Structural)',
    recipient: 'Arup & Partners Resident Engineer',
    drawingNo: 'DWG-ST-104',
    drawingTitle: 'Substation Raft Foundation & Rebar Details',
    boqRef: 'BOQ-03.2.1',
    specRef: 'SPEC-03300',
    submissionFormat: { hardCopy: true, softCopy: true },
    enclosures: '2 x A1 Printed Sheets, 1 x Structural Calculation Package',
    itemDescription: 'Complete reinforcement detailing for Grade C40 concrete raft foundation.',
    comments: 'Approved for construction. Ensure 50mm bottom cover blocks are used.',
    attachment: { name: 'DWG-ST-104_Rev0.pdf', type: 'application/pdf', size: '4.20 MB', url: '' }
  },
  {
    id: 'PRJ-2026-CON-Z2-SUB-0002',
    module: 'Submittals',
    rev: 'Rev 1',
    date: '2026-11-12',
    title: 'Main LV Switchgear & Distribution Board Technical Submittal',
    disciplines: ['Electrical'],
    status: 'Approved as Noted (Code B)',
    originator: 'CON',
    zone: 'Z2',
    author: 'Eng. Sarah Jenkins (MEP Manager)',
    recipient: 'Arup & Partners MEP Lead',
    drawingNo: 'DWG-EL-209',
    drawingTitle: 'Basement LV Room Single Line Diagram',
    boqRef: 'BOQ-16.1.4',
    specRef: 'SPEC-16400',
    submissionFormat: { hardCopy: false, softCopy: true },
    enclosures: 'Manufacturer Type Test Certificates & IP54 Compliance Sheet',
    itemDescription: '4000A Form 4B Type 2 main low-voltage switchgear assembly.',
    comments: 'Proceed with procurement; incorporate surge protection device rating note in As-Built.',
    attachment: null
  },
  {
    id: 'PRJ-2026-CON-Z1-SUB-0003',
    module: 'Submittals',
    rev: 'Rev 0',
    date: '2026-11-14',
    title: 'Chilled Water Primary Pumps & Vibration Isolators Submittal',
    disciplines: ['HVAC', 'Plumbing & Drainage'],
    status: 'Under Review',
    originator: 'CON',
    zone: 'Z1',
    author: 'Eng. Omar Farooq (HVAC Lead)',
    recipient: 'Arup & Partners MEP Lead',
    drawingNo: 'DWG-HV-302',
    drawingTitle: 'Chiller Plant Room Piping & Pump Layout',
    boqRef: 'BOQ-15.4.2',
    specRef: 'SPEC-15180',
    submissionFormat: { hardCopy: true, softCopy: true },
    enclosures: 'Pump Performance Curves & Acoustic Data Sheet',
    itemDescription: 'Duty/Standby end-suction centrifugal chilled water pumps.',
    comments: 'Submitted for consultant review.',
    attachment: null
  }
];

export default function App() {
  // --- Supabase Auth State ---
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- Live Real-Time Clock & Date State ---
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const todayDateKey = currentTime.toISOString().split('T')[0];

  // --- Toast Notification State ---
  const [toastMsg, setToastMsg] = useState('');
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  // --- Company Branding State (Auto-Saved) ---
  const [companyInfo, setCompanyInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('iso_company_info');
      return saved
        ? JSON.parse(saved)
        : {
            companyName: 'APEX GLOBAL ENGINEERING & CONSTRUCTION',
            tagline: 'ISO 19650 BIM & Construction Document Control System',
            logoUrl: ''
          };
    } catch {
      return {
        companyName: 'APEX GLOBAL ENGINEERING & CONSTRUCTION',
        tagline: 'ISO 19650 BIM & Construction Document Control System',
        logoUrl: ''
      };
    }
  });
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  useEffect(() => {
    localStorage.setItem('iso_company_info', JSON.stringify(companyInfo));
  }, [companyInfo]);

  // --- Editable & Auto-Saved Website, Social Media & Developer Contact Links ---
  const [socialLinks, setSocialLinks] = useState(() => {
    try {
      const saved = localStorage.getItem('iso_company_social_links');
      return saved
        ? JSON.parse(saved)
        : {
            websiteUrl: 'https://www.apexglobalconstruction.com',
            linkedinUrl: 'https://www.linkedin.com',
            whatsappUrl: 'https://wa.me/923000000000',
            developerName: 'Mahmood Web Developer',
            developerUrl: 'https://github.com/mahmood815-webdev',
            contactEmail: 'contact@apexglobalconstruction.com',
            contactPhone: '+92 300 0000000'
          };
    } catch {
      return {
        websiteUrl: 'https://www.apexglobalconstruction.com',
        linkedinUrl: 'https://www.linkedin.com',
        whatsappUrl: 'https://wa.me/923000000000',
        developerName: 'Mahmood Web Developer',
        developerUrl: 'https://github.com/mahmood815-webdev',
        contactEmail: 'contact@apexglobalconstruction.com',
        contactPhone: '+92 300 0000000'
      };
    }
  });
  const [isEditingLinks, setIsEditingLinks] = useState(false);

  useEffect(() => {
    localStorage.setItem('iso_company_social_links', JSON.stringify(socialLinks));
  }, [socialLinks]);

  // --- Smart Contact Us Form Popup State ---
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    senderName: '',
    senderEmail: '',
    subject: 'Project Inquiry / Technical Support',
    message: ''
  });

  const handleCompanyLogoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCompanyInfo((prev) => ({ ...prev, logoUrl: reader.result }));
        showToast('Company logo updated & auto-saved!');
      }
    };
    reader.readAsDataURL(file);
  };

  // --- Multi-Project Dropdown State (Auto-Saved) ---
  const [projectsList, setProjectsList] = useState(() => {
    try {
      const saved = localStorage.getItem('iso_projects_list');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    return localStorage.getItem('iso_active_project_id') || DEFAULT_PROJECTS[0].id;
  });

  const [projectInfo, setProjectInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('iso_active_project_info');
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS[0];
    } catch {
      return DEFAULT_PROJECTS[0];
    }
  });

  const [isEditingInfo, setIsEditingInfo] = useState(false);

  useEffect(() => {
    localStorage.setItem('iso_projects_list', JSON.stringify(projectsList));
  }, [projectsList]);

  useEffect(() => {
    localStorage.setItem('iso_active_project_id', activeProjectId);
  }, [activeProjectId]);

  useEffect(() => {
    localStorage.setItem('iso_active_project_info', JSON.stringify(projectInfo));
    setProjectsList((prev) =>
      prev.map((p) => (p.id === projectInfo.id ? { ...projectInfo } : p))
    );
  }, [projectInfo]);

  const handleSelectProjectFromDropdown = (id) => {
    const found = projectsList.find((p) => p.id === id);
    if (found) {
      setActiveProjectId(found.id);
      setProjectInfo({ ...found });
      showToast(`Switched project to ${found.projectCode}`);
    }
  };

  const handleAddNewProjectToDropdown = () => {
    const newId = `proj-${Date.now()}`;
    const nextNum = projectsList.length + 1;
    const newProj = {
      id: newId,
      projectName: `NEW CONSTRUCTION PROJECT #${nextNum}`,
      projectCode: `PRJ-0${nextNum}`,
      client: 'Client Organization',
      consultant: 'Lead Engineering Consultant',
      contractor: companyInfo.companyName || 'Main Contractor',
      location: 'Site Location'
    };
    setProjectsList((prev) => [...prev, newProj]);
    setActiveProjectId(newId);
    setProjectInfo(newProj);
    setIsEditingInfo(true);
    showToast('New project created! Edit details below.');
  };

  const handleDeleteCurrentProject = () => {
    if (projectsList.length <= 1) {
      showToast('At least one active project must remain in the list.');
      return;
    }
    const remaining = projectsList.filter((p) => p.id !== projectInfo.id);
    setProjectsList(remaining);
    setActiveProjectId(remaining[0].id);
    setProjectInfo(remaining[0]);
    setIsEditingInfo(false);
    showToast('Project removed from dropdown.');
  };

  // --- Live Site Weather & UK HSE / ISO 45001 Safety Compliance State ---
  const [siteSafetyWeather, setSiteSafetyWeather] = useState(() => {
    try {
      const saved = localStorage.getItem('iso_site_safety_weather');
      return saved
        ? JSON.parse(saved)
        : {
            siteCity: 'Plot 402, Central Business District',
            lat: null,
            lon: null,
            tempC: 24,
            condition: 'Clear & Dry',
            windKmh: 12,
            ukStandard: 'UK HSE / ISO 45001:2018',
            safetyStatus: 'APPROVED - SAFE TO WORK',
            lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          };
    } catch {
      return {
        siteCity: 'Plot 402, Central Business District',
        lat: null,
        lon: null,
        tempC: 24,
        condition: 'Clear & Dry',
        windKmh: 12,
        ukStandard: 'UK HSE / ISO 45001:2018',
        safetyStatus: 'APPROVED - SAFE TO WORK',
        lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
    }
  });

  const [weatherPanelOpen, setWeatherPanelOpen] = useState(false);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);

  useEffect(() => {
    localStorage.setItem('iso_site_safety_weather', JSON.stringify(siteSafetyWeather));
  }, [siteSafetyWeather]);

  const mapWmoCodeToCondition = (code) => {
    if (code === 0) return 'Clear Sky';
    if ([1, 2, 3].includes(code)) return 'Partly Cloudy';
    if ([45, 48].includes(code)) return 'Fog / Low Visibility';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Rain / Wet Site';
    if ([71, 73, 75, 85, 86].includes(code)) return 'Snow / Frost';
    if ([95, 96, 99].includes(code)) return 'Thunderstorm Alert';
    return 'Clear & Dry';
  };

  const fetchLiveWeatherByCoords = async (latitude, longitude, labelOverride = null) => {
    setIsFetchingWeather(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`
      );
      const data = await res.json();
      if (data && data.current) {
        const temp = Math.round(data.current.temperature_2m);
        const wind = Math.round(data.current.wind_speed_10m);
        const cond = mapWmoCodeToCondition(data.current.weather_code);
        const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setSiteSafetyWeather((prev) => ({
          ...prev,
          siteCity: labelOverride || prev.siteCity,
          lat: Number(latitude.toFixed(4)),
          lon: Number(longitude.toFixed(4)),
          tempC: temp,
          windKmh: wind,
          condition: cond,
          lastUpdated: nowStr
        }));
        if (labelOverride) {
          setProjectInfo((prev) => ({ ...prev, location: labelOverride }));
        }
        showToast(`Live weather updated: ${temp}°C, ${cond}`);
      }
    } catch {
      showToast('Offline mode: using saved site weather telemetry.');
    } finally {
      setIsFetchingWeather(false);
    }
  };

  const handleDetectGpsSiteLocation = () => {
    if (!navigator.geolocation) {
      showToast('GPS not supported on this browser. Enter site city manually.');
      return;
    }
    setIsFetchingWeather(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let resolvedName = `Site GPS (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();
          if (geoData && geoData.address) {
            const addr = geoData.address;
            const locality = addr.city || addr.town || addr.village || addr.suburb || addr.county;
            const country = addr.country;
            if (locality) {
              resolvedName = country ? `${locality}, ${country}` : locality;
            }
          }
        } catch {
          // keep fallback
        }
        await fetchLiveWeatherByCoords(latitude, longitude, resolvedName);
      },
      () => {
        setIsFetchingWeather(false);
        showToast('Location permission denied. Type your site city below.');
      },
      { timeout: 8000 }
    );
  };

  const handleSyncTypedLocationWeather = async () => {
    const query = (siteSafetyWeather.siteCity || '').trim();
    if (!query) return;
    setIsFetchingWeather(true);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();
      if (geoData && geoData.results && geoData.results.length > 0) {
        const place = geoData.results[0];
        const formattedPlace = place.country ? `${place.name}, ${place.country}` : place.name;
        await fetchLiveWeatherByCoords(place.latitude, place.longitude, formattedPlace);
      } else {
        setProjectInfo((prev) => ({ ...prev, location: query }));
        setIsFetchingWeather(false);
        showToast('Site location saved!');
      }
    } catch {
      setProjectInfo((prev) => ({ ...prev, location: query }));
      setIsFetchingWeather(false);
      showToast('Site location saved offline!');
    }
  };

  useEffect(() => {
    const weatherTimer = setInterval(() => {
      if (siteSafetyWeather.lat && siteSafetyWeather.lon) {
        fetchLiveWeatherByCoords(siteSafetyWeather.lat, siteSafetyWeather.lon);
      }
    }, 600000);
    return () => clearInterval(weatherTimer);
  }, [siteSafetyWeather.lat, siteSafetyWeather.lon]);

  // --- Daily Site Safety Checklist State ---
  const [dailySafetyChecklist, setDailySafetyChecklist] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const saved = localStorage.getItem('iso_daily_safety_checklist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.items)) {
          if (parsed.date === today) return parsed;
          return {
            date: today,
            items: parsed.items.map((item) => ({ ...item, checked: false }))
          };
        }
      }
    } catch {
      // fallback
    }
    return { date: today, items: DEFAULT_SAFETY_ITEMS };
  });

  const [safetyDropdownOpen, setSafetyDropdownOpen] = useState(false);
  const [isEditingSafetyList, setIsEditingSafetyList] = useState(false);
  const [newSafetyItemText, setNewSafetyItemText] = useState('');

  useEffect(() => {
    localStorage.setItem('iso_daily_safety_checklist', JSON.stringify(dailySafetyChecklist));
  }, [dailySafetyChecklist]);

  const toggleSafetyCheckItem = (id) => {
    setDailySafetyChecklist((prev) => ({
      ...prev,
      date: todayDateKey,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const handleAddSafetyItem = (e) => {
    e.preventDefault();
    const trimmed = newSafetyItemText.trim();
    if (!trimmed) return;
    setDailySafetyChecklist((prev) => ({
      ...prev,
      date: todayDateKey,
      items: [...prev.items, { id: `s-${Date.now()}`, label: trimmed, checked: false }]
    }));
    setNewSafetyItemText('');
  };

  const handleUpdateSafetyItemLabel = (id, label) => {
    setDailySafetyChecklist((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, label } : item))
    }));
  };

  const handleDeleteSafetyItem = (id) => {
    setDailySafetyChecklist((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id)
    }));
  };

  const safetyCompletedCount = dailySafetyChecklist.items.filter((i) => i.checked).length;
  const safetyTotalCount = dailySafetyChecklist.items.length;

  // --- Register Entries & Navigation States (localStorage + Supabase Sync) ---
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('iso_master_register_entries');
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      const cached = loadLogsFromCache();
      return Array.isArray(cached) && cached.length > 0 ? cached : INITIAL_ENTRIES;
    } catch {
      return INITIAL_ENTRIES;
    }
  });

  useEffect(() => {
    localStorage.setItem('iso_master_register_entries', JSON.stringify(entries));
    saveLogsToCache(entries);
  }, [entries]);

  useEffect(() => {
    if (!user) return;
    async function syncFromSupabase() {
      const { data, error } = await supabase
        .from('master_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map((row) =>
          row.payload && typeof row.payload === 'object'
            ? { ...row.payload, id: row.payload.id || row.doc_no || row.id }
            : {
                id: row.doc_no || row.id,
                module: row.module || 'Submittals',
                rev: row.rev || 'Rev 0',
                date: row.date || todayDateKey,
                title: row.title || '',
                disciplines: Array.isArray(row.disciplines) ? row.disciplines : ['Civil'],
                status: row.status || 'Under Review',
                originator: row.originator || 'CON',
                zone: row.zone || 'Z1',
                author: row.author || '',
                recipient: row.recipient || '',
                drawingNo: row.drawing_no || '',
                drawingTitle: row.drawing_title || '',
                boqRef: row.boq_ref || '',
                specRef: row.spec_ref || '',
                submissionFormat: { hardCopy: false, softCopy: true },
                enclosures: row.enclosures || '',
                itemDescription: row.item_description || '',
                comments: row.comments || '',
                attachment: null
              }
        );
        setEntries(mapped);
      }
    }
    syncFromSupabase();
  }, [user, todayDateKey]);

  const [activeModule, setActiveModule] = useState('Submittals');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisciplineFilter, setSelectedDisciplineFilter] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // --- New Entry Modal & Form State ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [attachmentMode, setAttachmentMode] = useState('file');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [externalUrl, setExternalUrl] = useState('');

  const [formData, setFormData] = useState({
    originatorCode: 'CON',
    zoneCode: 'Z1',
    rev: 'Rev 0',
    title: '',
    disciplines: ['Civil'],
    drawingNo: '',
    drawingTitle: '',
    boqRef: '',
    specRef: '',
    submissionFormat: { hardCopy: true, softCopy: true },
    enclosures: '',
    itemDescription: '',
    status: 'Under Review',
    comments: ''
  });

  const activeDocMeta = useMemo(() => {
    return DOCUMENT_TYPES.find((d) => d.value === activeModule) || DOCUMENT_TYPES[0];
  }, [activeModule]);

  const previewIsoCode = useMemo(() => {
    const moduleEntriesCount = entries.filter((e) => e.module === activeModule).length + 1;
    const seq = String(moduleEntriesCount).padStart(4, '0');
    const orig = (formData.originatorCode || 'CON').trim() || 'CON';
    const zone = (formData.zoneCode || 'Z1').trim() || 'Z1';
    return `${projectInfo.projectCode}-${orig}-${zone}-${activeDocMeta.code}-${seq}`;
  }, [entries, activeModule, activeDocMeta.code, projectInfo.projectCode, formData.originatorCode, formData.zoneCode]);

  const toggleFormDiscipline = (disc) => {
    setFormData((prev) => {
      const exists = prev.disciplines.includes(disc);
      if (exists) {
        if (prev.disciplines.length === 1) return prev;
        return { ...prev, disciplines: prev.disciplines.filter((d) => d !== disc) };
      }
      return { ...prev, disciplines: [...prev.disciplines, disc] };
    });
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    let attachmentObj = null;
    if (attachmentMode === 'file' && uploadedFile) {
      attachmentObj = {
        name: uploadedFile.name,
        type: uploadedFile.type || 'application/octet-stream',
        size: `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        url: URL.createObjectURL(uploadedFile)
      };
    } else if (attachmentMode === 'link' && externalUrl.trim()) {
      attachmentObj = {
        name: externalUrl.trim(),
        type: 'url',
        size: 'Cloud Link',
        url: externalUrl.trim()
      };
    }

    const newEntry = {
      id: previewIsoCode,
      module: activeModule,
      rev: formData.rev,
      date: todayDateKey,
      title: formData.title.trim(),
      disciplines: [...formData.disciplines],
      status: formData.status,
      originator: formData.originatorCode || 'CON',
      zone: formData.zoneCode || 'Z1',
      author: `${companyInfo.companyName} Team`,
      recipient: projectInfo.consultant,
      drawingNo: formData.drawingNo.trim(),
      drawingTitle: formData.drawingTitle.trim(),
      boqRef: formData.boqRef.trim(),
      specRef: formData.specRef.trim(),
      submissionFormat: { ...formData.submissionFormat },
      enclosures: formData.enclosures.trim(),
      itemDescription: formData.itemDescription.trim(),
      comments: formData.comments.trim(),
      attachment: attachmentObj
    };

    setEntries((prev) => [newEntry, ...prev]);
    setFormData((prev) => ({
      ...prev,
      title: '',
      drawingNo: '',
      drawingTitle: '',
      boqRef: '',
      specRef: '',
      enclosures: '',
      itemDescription: '',
      comments: ''
    }));
    setUploadedFile(null);
    setExternalUrl('');
    setIsFormOpen(false);
    showToast(`Saved ${newEntry.id} to ${activeModule}!`);

    if (user) {
      await supabase.from('master_logs').insert([
        {
          doc_no: newEntry.id,
          title: newEntry.title,
          user_id: user.id,
          payload: newEntry
        }
      ]);
    }
  };

  // --- Backup & Restore JSON State ---
  const handleBackupToDriveOrFile = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      companyInfo,
      projectsList,
      activeProjectId,
      projectInfo,
      siteSafetyWeather,
      dailySafetyChecklist,
      entries
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectInfo.projectCode}_ISO_Master_Backup_${todayDateKey}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('JSON Backup downloaded for PC / Google Drive!');
  };

  const handleRestoreBackup = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (parsed.entries && Array.isArray(parsed.entries)) {
          setEntries(parsed.entries);
        }
        if (parsed.companyInfo) setCompanyInfo(parsed.companyInfo);
        if (parsed.projectsList) setProjectsList(parsed.projectsList);
        if (parsed.projectInfo) setProjectInfo(parsed.projectInfo);
        if (parsed.siteSafetyWeather) setSiteSafetyWeather(parsed.siteSafetyWeather);
        if (parsed.dailySafetyChecklist) setDailySafetyChecklist(parsed.dailySafetyChecklist);
        showToast('Project backup restored successfully!');
      } catch {
        showToast('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // --- Report Modal State ---
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTimeframe, setReportTimeframe] = useState('Weekly');
  const [copiedLink, setCopiedLink] = useState(false);

  // --- Submittal Inspector & Edit Entry Modal State ---
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEditingEntry, setIsEditingEntry] = useState(false);
  const [editEntryData, setEditEntryData] = useState(null);

  const openEntryModal = (item, startInEditMode = false) => {
    setSelectedEntry(item);
    setEditEntryData({ ...item, disciplines: [...(item.disciplines || ['Civil'])] });
    setIsEditingEntry(startInEditMode);
  };

  const handleSaveEditedEntry = async (e) => {
    e.preventDefault();
    if (!editEntryData || !editEntryData.title.trim()) return;
    const updatedItem = { ...editEntryData };
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updatedItem.id ? updatedItem : entry))
    );
    setSelectedEntry(updatedItem);
    setIsEditingEntry(false);
    showToast(`Updated & saved ${updatedItem.id}!`);

    if (user) {
      await supabase
        .from('master_logs')
        .update({
          title: updatedItem.title,
          payload: updatedItem
        })
        .eq('doc_no', updatedItem.id)
        .eq('user_id', user.id);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    setEntries((prev) => prev.filter((item) => item.id !== entryId));
    if (selectedEntry?.id === entryId) {
      setSelectedEntry(null);
      setIsEditingEntry(false);
    }
    showToast(`Deleted ${entryId}`);

    if (user) {
      await supabase
        .from('master_logs')
        .delete()
        .eq('doc_no', entryId)
        .eq('user_id', user.id);
    }
  };

  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      const matchesModule = activeModule === 'All' || item.module === activeModule;
      const matchesDiscipline =
        selectedDisciplineFilter === 'All' ||
        (Array.isArray(item.disciplines) && item.disciplines.includes(selectedDisciplineFilter));
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        (item.drawingNo && item.drawingNo.toLowerCase().includes(q)) ||
        (item.author && item.author.toLowerCase().includes(q));
      return matchesModule && matchesDiscipline && matchesStatus && matchesSearch;
    });
  }, [entries, activeModule, selectedDisciplineFilter, selectedStatus, searchQuery]);

  const moduleCounts = useMemo(() => {
    const counts = { All: entries.length };
    DOCUMENT_TYPES.forEach((doc) => {
      counts[doc.value] = entries.filter((e) => e.module === doc.value).length;
    });
    return counts;
  }, [entries]);

  const statusStats = useMemo(() => {
    const scoped = activeModule === 'All' ? entries : entries.filter((e) => e.module === activeModule);
    return {
      total: scoped.length,
      approved: scoped.filter((e) => e.status.includes('Code A') || e.status.includes('Code B')).length,
      underReview: scoped.filter((e) => e.status === 'Under Review').length,
      actionRequired: scoped.filter((e) => e.status.includes('Code C') || e.status.includes('Code D')).length
    };
  }, [entries, activeModule]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
        <p className="text-sm font-medium">Loading ISO Master Log Register...</p>
      </div>
    );
  }

  if (!user) {
    return <AuthBox />;
  }return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header & Company / Project Telemetry */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Company Branding & Project Selector */}
          <div className="flex items-center gap-3">
            {companyInfo.logoUrl ? (
              <img
                src={companyInfo.logoUrl}
                alt="Company Logo"
                className="w-10 h-10 rounded-lg object-cover border border-slate-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Building2 className="w-5 h-5" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm sm:text-base font-bold tracking-wide text-white">
                  {companyInfo.companyName}
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 font-medium">
                  {projectInfo.projectCode}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{companyInfo.tagline}</p>
            </div>
          </div>

          {/* Live Date/Time, Weather & Auth Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-right">
              <div className="text-[11px] font-semibold text-sky-300">{formattedTime}</div>
              <div className="text-[10px] text-slate-400">{formattedDate}</div>
            </div>

            <button
              type="button"
              onClick={() => setWeatherPanelOpen((prev) => !prev)}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-1.5 text-left flex items-center gap-2"
            >
              <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-[11px] font-semibold text-white">
                  {siteSafetyWeather.tempC}°C · {siteSafetyWeather.condition}
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[160px]">
                  {siteSafetyWeather.siteCity}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSafetyDropdownOpen((prev) => !prev)}
              className="bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-300"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                HSE {safetyCompletedCount}/{safetyTotalCount}
              </span>
            </button>

            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-lg px-2.5 py-1.5">
              <span className="text-[11px] text-slate-300 hidden sm:inline">{user.email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs px-2 py-1 rounded bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Project Switcher & Quick Utility Bar */}
        <div className="max-w-[1440px] mx-auto mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-xs text-slate-400 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              <span>Project:</span>
            </label>
            <select
              value={activeProjectId}
              onChange={(e) => handleSelectProjectFromDropdown(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-md px-2.5 py-1.5"
            >
              {projectsList.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.projectCode} — {proj.projectName}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleAddNewProjectToDropdown}
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-300"
            >
              + New Project
            </button>

            <button
              type="button"
              onClick={() => setIsEditingInfo((prev) => !prev)}
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingInfo ? 'Done Editing' : 'Project Info'}</span>
            </button>

            {projectsList.length > 1 && (
              <button
                type="button"
                onClick={handleDeleteCurrentProject}
                className="text-xs px-2 py-1.5 rounded-md bg-rose-950/50 hover:bg-rose-900/50 border border-rose-800/50 text-rose-300"
              >
                Delete Project
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsEditingCompany((prev) => !prev)}
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200"
            >
              Company & Logo
            </button>

            <button
              type="button"
              onClick={handleBackupToDriveOrFile}
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 flex items-center gap-1"
            >
              <Save className="w-3.5 h-3.5" />
              <span>JSON Backup</span>
            </button>

            <label className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-300 flex items-center gap-1 cursor-pointer">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Restore JSON</span>
              <input
                type="file"
                accept="application/json"
                onChange={handleRestoreBackup}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => downloadAsCSV(entries)}
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 flex items-center gap-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => downloadAsJSON(entries)}
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 flex items-center gap-1"
            >
              <CloudUpload className="w-3.5 h-3.5" />
              <span>Export Logs JSON</span>
            </button>

            <button
              type="button"
              onClick={() => setReportModalOpen(true)}
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-purple-300 flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Report</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsFormOpen(true);
              }}
              className="text-xs px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-1 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>New {activeDocMeta.code} Entry</span>
            </button>
          </div>
        </div>

        {/* Optional Company Branding Editor */}
        {isEditingCompany && (
          <div className="max-w-[1440px] mx-auto mt-3 p-3 rounded-lg bg-slate-800/70 border border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Company Name</label>
              <input
                type="text"
                value={companyInfo.companyName}
                onChange={(e) => setCompanyInfo((prev) => ({ ...prev, companyName: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Tagline</label>
              <input
                type="text"
                value={companyInfo.tagline}
                onChange={(e) => setCompanyInfo((prev) => ({ ...prev, tagline: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Upload Company Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCompanyLogoUpload}
                className="w-full text-[11px] text-slate-300"
              />
            </div>
          </div>
        )}

        {/* Optional Active Project Details Editor */}
        {isEditingInfo && (
          <div className="max-w-[1440px] mx-auto mt-3 p-3 rounded-lg bg-slate-800/70 border border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Project Code</label>
              <input
                type="text"
                value={projectInfo.projectCode}
                onChange={(e) => setProjectInfo((prev) => ({ ...prev, projectCode: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-slate-400 mb-1">Project Name</label>
              <input
                type="text"
                value={projectInfo.projectName}
                onChange={(e) => setProjectInfo((prev) => ({ ...prev, projectName: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Client</label>
              <input
                type="text"
                value={projectInfo.client}
                onChange={(e) => setProjectInfo((prev) => ({ ...prev, client: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Consultant</label>
              <input
                type="text"
                value={projectInfo.consultant}
                onChange={(e) => setProjectInfo((prev) => ({ ...prev, consultant: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Site Location</label>
              <input
                type="text"
                value={projectInfo.location}
                onChange={(e) => setProjectInfo((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white"
              />
            </div>
          </div>
        )}

        {/* Weather & UK HSE / ISO 45001 Panel */}
        {weatherPanelOpen && (
          <div className="max-w-[1440px] mx-auto mt-3 p-3 rounded-lg bg-slate-800/80 border border-amber-500/30 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Wind className="w-4 h-4" />
                <span>
                  Live Site Weather & {siteSafetyWeather.ukStandard} ({siteSafetyWeather.safetyStatus})
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Wind: {siteSafetyWeather.windKmh} km/h · Updated: {siteSafetyWeather.lastUpdated}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={siteSafetyWeather.siteCity}
                onChange={(e) =>
                  setSiteSafetyWeather((prev) => ({ ...prev, siteCity: e.target.value }))
                }
                placeholder="Enter site city or location"
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white flex-1 min-w-[200px]"
              />
              <button
                type="button"
                onClick={handleSyncTypedLocationWeather}
                disabled={isFetchingWeather}
                className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium"
              >
                {isFetchingWeather ? 'Syncing...' : 'Sync Weather'}
              </button>
              <button
                type="button"
                onClick={handleDetectGpsSiteLocation}
                disabled={isFetchingWeather}
                className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-100 flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Use GPS</span>
              </button>
            </div>
          </div>
        )}

        {/* Daily Site Safety Checklist Drawer */}
        {safetyDropdownOpen && (
          <div className="max-w-[1440px] mx-auto mt-3 p-3 rounded-lg bg-slate-800/80 border border-emerald-600/40 text-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <HardHat className="w-4 h-4" />
                <span>
                  Daily Site HSE Checklist ({dailySafetyChecklist.date}) — {safetyCompletedCount}/
                  {safetyTotalCount} Completed
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingSafetyList((prev) => !prev)}
                className="text-[11px] px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200"
              >
                {isEditingSafetyList ? 'Done' : 'Edit Checklist'}
              </button>
            </div>

            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {dailySafetyChecklist.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 bg-slate-900/80 border border-slate-800 rounded px-2.5 py-1.5"
                >
                  <button
                    type="button"
                    onClick={() => toggleSafetyCheckItem(item.id)}
                    className="flex items-center gap-2 text-left flex-1"
                  >
                    {item.checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    {isEditingSafetyList ? (
                      <input
                        type="text"
                        value={item.label}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleUpdateSafetyItemLabel(item.id, e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-white text-xs"
                      />
                    ) : (
                      <span
                        className={
                          item.checked ? 'line-through text-slate-400' : 'text-slate-200'
                        }
                      >
                        {item.label}
                      </span>
                    )}
                  </button>

                  {isEditingSafetyList && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSafetyItem(item.id)}
                      className="text-rose-400 hover:text-rose-300 px-1.5 py-0.5 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditingSafetyList && (
              <form onSubmit={handleAddSafetyItem} className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={newSafetyItemText}
                  onChange={(e) => setNewSafetyItemText(e.target.value)}
                  placeholder="Add new safety checklist item..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
                >
                  Add
                </button>
              </form>
            )}
          </div>
        )}
      </header>

      {/* Main Content Layout: ISO 19650 Document Type Sidebar + Register Table */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sidebar: Document Registers */}
        <aside className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-3 h-fit">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>ISO Registers</span>
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {entries.length}
            </span>
          </div>

          <div className="space-y-1 max-h-[65vh] overflow-y-auto pr-0.5">
            <button
              type="button"
              onClick={() => setActiveModule('All')}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition ${
                activeModule === 'All'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <span className="flex items-center gap-2 truncate">
                <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">All Registers</span>
              </span>
              <span className="text-[11px] opacity-90">{moduleCounts.All || 0}</span>
            </button>

            {DOCUMENT_TYPES.map((doc) => {
              const isActive = activeModule === doc.value;
              return (
                <button
                  key={doc.value}
                  type="button"
                  onClick={() => setActiveModule(doc.value)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{doc.label}</span>
                  </span>
                  <span className="text-[11px] opacity-90">{moduleCounts[doc.value] || 0}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Main Panel: KPI Stats, Filters & Master Register Table */}
        <main className="lg:col-span-9 space-y-4">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400">Total Records</div>
              <div className="text-xl font-bold text-white mt-0.5">{statusStats.total}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-emerald-400">Approved (Code A / B)</div>
              <div className="text-xl font-bold text-emerald-300 mt-0.5">
                {statusStats.approved}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-amber-400">Under Review</div>
              <div className="text-xl font-bold text-amber-300 mt-0.5">
                {statusStats.underReview}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-rose-400">Action Required (C / D)</div>
              <div className="text-xl font-bold text-rose-300 mt-0.5">
                {statusStats.actionRequired}
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Document ID, Title, Drawing No, Author..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white"
              />
            </div>

            <select
              value={selectedDisciplineFilter}
              onChange={(e) => setSelectedDisciplineFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
            >
              <option value="All">All Disciplines</option>
              {AVAILABLE_DISCIPLINES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Master Register Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">
                {activeModule === 'All' ? 'All ISO 19650 Documents' : activeDocMeta.label}
              </h2>
              <span className="text-xs text-slate-400">
                Showing {filteredEntries.length} of {entries.length} entries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950/70 text-slate-400 border-b border-slate-800">
                    <th className="py-2.5 px-3 font-semibold">Document ID</th>
                    <th className="py-2.5 px-3 font-semibold">Rev</th>
                    <th className="py-2.5 px-3 font-semibold">Title & Description</th>
                    <th className="py-2.5 px-3 font-semibold">Disciplines</th>
                    <th className="py-2.5 px-3 font-semibold">Date</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredEntries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 px-4 text-center text-slate-400">
                        No matching records found. Click &ldquo;New Entry&rdquo; to add a record.
                      </td>
                    </tr>
                  ) : (
                    filteredEntries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-2.5 px-3 font-mono text-[11px] text-sky-300 whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px]">
                            {item.rev}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 max-w-md">
                          <div className="font-semibold text-white">{item.title}</div>
                          {item.drawingNo && (
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Dwg: {item.drawingNo}
                              {item.boqRef ? ` · BOQ: ${item.boqRef}` : ''}
                            </div>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-wrap gap-1">
                            {(item.disciplines || []).map((disc) => (
                              <span
                                key={disc}
                                className="px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700 text-[10px] text-slate-300"
                              >
                                {disc}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 border border-slate-700 text-slate-200">
                            {item.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEntryModal(item, false)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => openEntryModal(item, true)}
                              className="px-2 py-1 rounded bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-[11px]"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteEntry(item.id)}
                              className="px-2 py-1 rounded bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-[11px]"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Footer with Links & Contact Popup Trigger */}
      <footer className="bg-slate-900 border-t border-slate-800 px-4 py-3 text-xs text-slate-400">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span>
              Developed by{' '}
              <a
                href={socialLinks.developerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:underline font-medium"
              >
                {socialLinks.developerName}
              </a>
            </span>
            <span>·</span>
            <a
              href={socialLinks.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </a>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsEditingLinks((prev) => !prev)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]"
            >
              {isEditingLinks ? 'Close Links Editor' : 'Edit Links'}
            </button>
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="px-2.5 py-1 rounded bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-[11px] flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {isEditingLinks && (
          <div className="max-w-[1440px] mx-auto mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Website URL</label>
              <input
                type="url"
                value={socialLinks.websiteUrl}
                onChange={(e) => setSocialLinks((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Developer Name</label>
              <input
                type="text"
                value={socialLinks.developerName}
                onChange={(e) =>
                  setSocialLinks((prev) => ({ ...prev, developerName: e.target.value }))
                }
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Developer URL</label>
              <input
                type="url"
                value={socialLinks.developerUrl}
                onChange={(e) =>
                  setSocialLinks((prev) => ({ ...prev, developerUrl: e.target.value }))
                }
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Contact Email</label>
              <input
                type="email"
                value={socialLinks.contactEmail}
                onChange={(e) =>
                  setSocialLinks((prev) => ({ ...prev, contactEmail: e.target.value }))
                }
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
              />
            </div>
          </div>
        )}
      </footer>

      {/* New Entry Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl p-5 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  New {activeDocMeta.label} Entry
                </h3>
                <p className="text-xs text-sky-400 font-mono mt-0.5">
                  Auto ISO ID: {previewIsoCode}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Originator Code</label>
                  <input
                    type="text"
                    value={formData.originatorCode}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, originatorCode: e.target.value }))
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Zone Code</label>
                  <input
                    type="text"
                    value={formData.zoneCode}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, zoneCode: e.target.value }))
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Revision</label>
                  <input
                    type="text"
                    value={formData.rev}
                    onChange={(e) => setFormData((prev) => ({ ...prev, rev: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter submittal / document title"
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Disciplines</label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_DISCIPLINES.map((disc) => {
                    const selected = formData.disciplines.includes(disc);
                    return (
                      <button
                        key={disc}
                        type="button"
                        onClick={() => toggleFormDiscipline(disc)}
                        className={`px-2.5 py-1 rounded text-[11px] border ${
                          selected
                            ? 'bg-sky-600/30 border-sky-500 text-sky-200'
                            : 'bg-slate-950 border-slate-700 text-slate-400'
                        }`}
                      >
                        {disc}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Drawing No</label>
                  <input
                    type="text"
                    value={formData.drawingNo}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, drawingNo: e.target.value }))
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">BOQ Ref</label>
                  <input
                    type="text"
                    value={formData.boqRef}
                    onChange={(e) => setFormData((prev) => ({ ...prev, boqRef: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Comments / Remarks</label>
                <textarea
                  rows={2}
                  value={formData.comments}
                  onChange={(e) => setFormData((prev) => ({ ...prev, comments: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspector / Edit Modal */}
      {selectedEntry && editEntryData && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl p-5 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-sky-300 font-mono">{selectedEntry.id}</h3>
                <p className="text-xs text-slate-400">{selectedEntry.module} · {selectedEntry.rev}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedEntry(null);
                  setIsEditingEntry(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isEditingEntry ? (
              <form onSubmit={handleSaveEditedEntry} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editEntryData.title}
                    onChange={(e) =>
                      setEditEntryData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Revision</label>
                    <input
                      type="text"
                      value={editEntryData.rev}
                      onChange={(e) =>
                        setEditEntryData((prev) => ({ ...prev, rev: e.target.value }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Status</label>
                    <select
                      value={editEntryData.status}
                      onChange={(e) =>
                        setEditEntryData((prev) => ({ ...prev, status: e.target.value }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Comments</label>
                  <textarea
                    rows={2}
                    value={editEntryData.comments || ''}
                    onChange={(e) =>
                      setEditEntryData((prev) => ({ ...prev, comments: e.target.value }))
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsEditingEntry(false)}
                    className="px-3 py-1.5 rounded bg-slate-800 text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-slate-400">Title:</span>
                  <div className="text-white font-semibold mt-0.5">{selectedEntry.title}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400">Date:</span>{' '}
                    <span className="text-slate-200">{selectedEntry.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Status:</span>{' '}
                    <span className="text-slate-200">{selectedEntry.status}</span>
                  </div>
                </div>
                {selectedEntry.comments && (
                  <div>
                    <span className="text-slate-400">Comments:</span>
                    <div className="text-slate-200 mt-0.5">{selectedEntry.comments}</div>
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsEditingEntry(true)}
                    className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium"
                  >
                    Edit Entry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEntry(null);
                      setIsEditingEntry(false);
                    }}
                    className="px-3 py-1.5 rounded bg-slate-800 text-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-sm font-bold text-white">Register Summary Report</h3>
              <button
                type="button"
                onClick={() => setReportModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              {['Daily', 'Weekly', 'Monthly'].map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setReportTimeframe(tf)}
                  className={`px-3 py-1 rounded border ${
                    reportTimeframe === tf
                      ? 'bg-sky-600 border-sky-500 text-white'
                      : 'bg-slate-950 border-slate-700 text-slate-300'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1">
              <div className="font-semibold text-white">
                {projectInfo.projectCode} — {reportTimeframe} Summary
              </div>
              <div>Total Entries: {entries.length}</div>
              <div>Approved (Code A/B): {statusStats.approved}</div>
              <div>Under Review: {statusStats.underReview}</div>
              <div>Action Required (C/D): {statusStats.actionRequired}</div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white"
              >
                Print Report
              </button>
              <button
                type="button"
                onClick={() => setReportModalOpen(false)}
                className="px-3 py-1.5 rounded bg-sky-600 text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Popup Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-5 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-sm font-bold text-white">Contact / Support</h3>
              <button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 text-slate-300">
              <div>Email: {socialLinks.contactEmail}</div>
              <div>Phone: {socialLinks.contactPhone}</div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Message prepared & noted!');
                setContactForm({
                  senderName: '',
                  senderEmail: '',
                  subject: 'Project Inquiry / Technical Support',
                  message: ''
                });
                setContactModalOpen(false);
              }}
              className="space-y-2.5"
            >
              <input
                type="text"
                required
                value={contactForm.senderName}
                onChange={(e) =>
                  setContactForm((prev) => ({ ...prev, senderName: e.target.value }))
                }
                placeholder="Your Name"
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
              />
              <input
                type="email"
                required
                value={contactForm.senderEmail}
                onChange={(e) =>
                  setContactForm((prev) => ({ ...prev, senderEmail: e.target.value }))
                }
                placeholder="Your Email"
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
              />
              <textarea
                rows={3}
                required
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Write your message..."
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-200"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}