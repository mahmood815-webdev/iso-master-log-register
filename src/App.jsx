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
      return Array.isArray(parsed) ? parsed : INITIAL_ENTRIES;
    } catch {
      return INITIAL_ENTRIES;
    }
  });

  useEffect(() => {
    localStorage.setItem('iso_master_register_entries', JSON.stringify(entries));
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
            ? { ...row.payload, id: row.payload.id || row.id }
            : {
                id: row.id,
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
        .update({ title: updatedItem.title, payload: updatedItem })
        .eq('doc_no', updatedItem.id);
    }
  };

  const handleDeleteEntry = async (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    setSelectedEntry(null);
    setIsEditingEntry(false);
    showToast(`Removed ${id} from register.`);

    if (user) {
      await supabase.from('master_logs').delete().eq('doc_no', id);
    }
  };

  const toggleEditEntryDiscipline = (disc) => {
    setEditEntryData((prev) => {
      if (!prev) return prev;
      const exists = prev.disciplines.includes(disc);
      if (exists) {
        if (prev.disciplines.length === 1) return prev;
        return { ...prev, disciplines: prev.disciplines.filter((d) => d !== disc) };
      }
      return { ...prev, disciplines: [...prev.disciplines, disc] };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      if (item.module !== activeModule) return false;

      const matchesSearch =
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.drawingNo && item.drawingNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDiscipline =
        selectedDisciplineFilter === 'All' || (item.disciplines || []).includes(selectedDisciplineFilter);
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

      return matchesSearch && matchesDiscipline && matchesStatus;
    });
  }, [entries, activeModule, searchQuery, selectedDisciplineFilter, selectedStatus]);

  const statusCounts = useMemo(() => {
    const moduleEntries = entries.filter((e) => e.module === activeModule);
    const codeA = moduleEntries.filter((e) => e.status.includes('Code A')).length;
    const codeB = moduleEntries.filter((e) => e.status.includes('Code B')).length;
    const codeC = moduleEntries.filter((e) => e.status.includes('Code C')).length;
    const codeD = moduleEntries.filter((e) => e.status.includes('Code D')).length;
    const underReview = moduleEntries.filter((e) => e.status === 'Under Review').length;
    const total = moduleEntries.length;

    return { codeA, codeB, codeC, codeD, underReview, total };
  }, [entries, activeModule]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#12161f] text-slate-200 flex items-center justify-center p-6 text-sm">
        لوڈ ہو رہا ہے...
      </div>
    );
  }

  if (!user) {
    return <AuthBox />;
  }

  const handleSendContactForm = (e) => {
    e.preventDefault();
    if (!contactForm.senderName.trim() || !contactForm.message.trim()) return;
    const mailSubject = encodeURIComponent(
      `[${projectInfo.projectCode}] ${contactForm.subject} - ${contactForm.senderName}`
    );
    const mailBody = encodeURIComponent(
      `From: ${contactForm.senderName} (${contactForm.senderEmail || 'No email provided'})\nProject: ${projectInfo.projectName}\n\nMessage:\n${contactForm.message}`
    );
    window.open(`mailto:${socialLinks.contactEmail}?subject=${mailSubject}&body=${mailBody}`, '_blank');
    setContactForm({
      senderName: '',
      senderEmail: '',
      subject: 'Project Inquiry / Technical Support',
      message: ''
    });
    setContactModalOpen(false);
    showToast('Contact message prepared & saved!');
  };

  const getStatusBadge = (status) => {
    if (status.includes('Code A')) {
      return {
        style: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
      };
    }
    if (status.includes('Code B')) {
      return {
        style: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        icon: <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-400" />
      };
    }
    if (status.includes('Code C')) {
      return {
        style: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
        icon: <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-400" />
      };
    }
    if (status.includes('Code D')) {
      return {
        style: 'bg-red-500/20 text-red-400 border-red-500/40 font-bold',
        icon: <XCircle className="w-3.5 h-3.5 mr-1 text-red-400" />
      };
    }
    return {
      style: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
      icon: <Clock className="w-3.5 h-3.5 mr-1 text-sky-400" />
    };
  };

  const getDisciplineIcon = (disc) => {
    switch (disc) {
      case 'Civil':
        return <HardHat className="w-3.5 h-3.5 text-amber-400" />;
      case 'Architecture':
        return <Building2 className="w-3.5 h-3.5 text-blue-400" />;
      case 'Structure':
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Electrical':
        return <Zap className="w-3.5 h-3.5 text-yellow-400" />;
      case 'HVAC':
        return <Compass className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Plumbing & Drainage':
        return <Wrench className="w-3.5 h-3.5 text-teal-400" />;
      default:
        return <Briefcase className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getAttachmentIcon = (type) => {
    if (type === 'url') return <ExternalLink className="w-4 h-4 text-sky-400" />;
    if (type?.includes('image')) return <Image className="w-4 h-4 text-emerald-400" />;
    return <FileText className="w-4 h-4 text-rose-400" />;
  };

  const reportShareText = `📊 ISO 19650 REGISTER REPORT (${reportTimeframe.toUpperCase()})
Project: ${projectInfo.projectName} (${projectInfo.projectCode})
Client: ${projectInfo.client} | Consultant: ${projectInfo.consultant} | Contractor: ${projectInfo.contractor}
Module: ${activeModule}

📌 SUMMARY KPI METRICS:
Total Logged: ${statusCounts.total}
Approved (Code A): ${statusCounts.codeA}
Approved as Noted (Code B): ${statusCounts.codeB}
Resubmit / Revise (Code C): ${statusCounts.codeC}
Closed / Rejected (Code D): ${statusCounts.codeD}
Under Review: ${statusCounts.underReview}

📝 DOCUMENT REGISTER SUMMARY:
${
  filteredEntries.map((e) => `• [${e.id}] (${e.rev}) ${e.title} - ${e.status}`).join('\n') ||
  'No items recorded for this timeframe.'
}`;

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(reportShareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    showToast('Summary copied to clipboard!');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleExportToExcel = () => {
    const headers = [
      'ISO Serial Number',
      'Module / Register Type',
      'Revision',
      'Date',
      'Title / Subject',
      'Disciplines',
      'Status',
      'Originator',
      'Zone',
      'Author',
      'Recipient',
      'Drawing Number',
      'Drawing Title',
      'BOQ Item Ref',
      'Spec Section Ref',
      'Submission Format',
      'Enclosures',
      'Item Scope / Description',
      'Remarks'
    ];

    const csvRows = filteredEntries.map((item) => {
      const formatStr = `${item.submissionFormat?.hardCopy ? 'Hard Copy' : ''} ${
        item.submissionFormat?.softCopy ? 'Soft Copy' : ''
      }`.trim();
      return [
        `"${item.id}"`,
        `"${item.module}"`,
        `"${item.rev}"`,
        `"${item.date}"`,
        `"${(item.title || '').replace(/"/g, '""')}"`,
        `"${(item.disciplines || []).join(', ')}"`,
        `"${item.status}"`,
        `"${item.originator || ''}"`,
        `"${item.zone || ''}"`,
        `"${(item.author || '').replace(/"/g, '""')}"`,
        `"${(item.recipient || '').replace(/"/g, '""')}"`,
        `"${item.drawingNo || ''}"`,
        `"${(item.drawingTitle || '').replace(/"/g, '""')}"`,
        `"${item.boqRef || ''}"`,
        `"${item.specRef || ''}"`,
        `"${formatStr}"`,
        `"${(item.enclosures || '').replace(/"/g, '""')}"`,
        `"${(item.itemDescription || '').replace(/"/g, '""')}"`,
        `"${(item.comments || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...csvRows].join('\n');
    const link = document.createElement('a');
    const fileName = `${projectInfo.projectCode}_${activeModule.replace(/[^a-zA-Z0-9]/g, '_')}_${todayDateKey}.csv`;
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredEntries.length} records to Excel (.csv)!`);
  };

  const handlePrintItemPDF = (item) => {
    setSelectedEntry(item);
    setIsEditingEntry(false);
    setTimeout(() => window.print(), 200);
  };

  const handleExportItemToExcel = (item) => {
    const headers = [
      'ISO Serial',
      'Module',
      'Rev',
      'Date',
      'Title',
      'Disciplines',
      'Status',
      'Drawing No',
      'BOQ Ref',
      'Spec Ref',
      'Remarks'
    ];
    const row = [
      `"${item.id}"`,
      `"${item.module}"`,
      `"${item.rev}"`,
      `"${item.date}"`,
      `"${(item.title || '').replace(/"/g, '""')}"`,
      `"${(item.disciplines || []).join(', ')}"`,
      `"${item.status}"`,
      `"${item.drawingNo || ''}"`,
      `"${item.boqRef || ''}"`,
      `"${item.specRef || ''}"`,
      `"${(item.comments || '').replace(/"/g, '""')}"`
    ].join(',');
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), row].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `${item.id}_${item.rev.replace(/\s+/g, '')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${item.id} to Excel (.csv)`);
  };

  const handleShareItemEmail = (item) => {
    const subject = encodeURIComponent(
      `[${projectInfo.projectCode}] ${item.id} (${item.rev}) - ${item.title}`
    );
    const body = encodeURIComponent(
      `Project: ${projectInfo.projectName}\nISO Serial: ${item.id} (${item.rev})\nModule: ${item.module}\nTitle: ${item.title}\nDisciplines: ${(item.disciplines || []).join(', ')}\nStatus: ${item.status}\nDate: ${item.date}\nRemarks: ${item.comments || 'N/A'}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleCopyItemTeams = (item) => {
    const text = `📋 **${item.id} (${item.rev})** — *${item.title}*\nProject: ${projectInfo.projectName} | Status: **${item.status}** | Disciplines: ${(item.disciplines || []).join(', ')}`;
    navigator.clipboard.writeText(text);
    showToast(`Copied ${item.id} formatted for MS Teams!`);
  };

  return (
    <div className="min-h-screen bg-[#12161f] text-[#e6ebf2] font-sans antialiased pb-24 selection:bg-rose-600 selection:text-white">
      {toastMsg && (
        <div className="fixed bottom-16 right-5 z-50 bg-[#1e2636]/95 backdrop-blur-xl border border-emerald-500/50 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. STICKY TOP COMPANY BRANDING + INLINE LINKS + STATUS BAR */}
      <header className="sticky top-0 z-40 bg-[#171e2b]/95 backdrop-blur-2xl border-b border-slate-700/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <label
                title="Click to upload Company Logo (Auto-Saves)"
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 border border-rose-400/40 flex items-center justify-center overflow-hidden cursor-pointer shrink-0 group shadow-md"
              >
                {companyInfo.logoUrl ? (
                  <img src={companyInfo.logoUrl} alt="Company Logo" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-5 h-5 text-white" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <UploadCloud className="w-4 h-4 text-white" />
                </div>
                <input type="file" accept="image/*" onChange={handleCompanyLogoUpload} className="hidden" />
              </label>

              {isEditingCompany ? (
                <div className="flex flex-wrap items-center gap-1.5 bg-[#1e2636] p-1.5 rounded-xl border border-rose-500/50">
                  <input
                    type="text"
                    spellCheck={true}
                    value={companyInfo.companyName}
                    onChange={(e) => setCompanyInfo((prev) => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Company Name..."
                    className="bg-[#111621] border border-slate-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg focus:outline-none focus:border-rose-400"
                  />
                  <input
                    type="text"
                    value={companyInfo.logoUrl}
                    onChange={(e) => setCompanyInfo((prev) => ({ ...prev, logoUrl: e.target.value }))}
                    placeholder="Logo Image URL (optional)..."
                    className="bg-[#111621] border border-slate-600 text-slate-300 text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:border-sky-400 hidden sm:inline-block"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingCompany(false);
                      showToast('Company branding saved!');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 min-w-0">
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-black tracking-wide text-white truncate">
                      {companyInfo.companyName}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate hidden sm:block">
                      {companyInfo.tagline} • {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingCompany(true)}
                    title="Edit Company Name or Logo URL"
                    className="p-1.5 rounded-lg bg-[#1e2636] hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer shrink-0"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
              <a
                href={socialLinks.websiteUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#1e2636] hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/40 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Website</span>
              </a>

              <a
                href={socialLinks.linkedinUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#1e2636] hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">LinkedIn</span>
              </a>

              <a
                href={socialLinks.whatsappUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#1e2636] hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Social</span>
              </a>

              <button
                type="button"
                onClick={() => setIsEditingLinks(!isEditingLinks)}
                className={`p-1.5 rounded-xl border transition cursor-pointer ${
                  isEditingLinks
                    ? 'bg-amber-500 text-slate-950 border-amber-300'
                    : 'bg-[#1e2636] hover:bg-amber-500 text-amber-300 hover:text-slate-950 border-slate-700'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-sky-600 hover:to-indigo-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-md transition-all duration-150 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                className="inline-flex items-center gap-1 bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-600 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {isEditingLinks && (
            <div className="bg-[#1e2636] border border-amber-500/40 rounded-2xl p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs shadow-xl">
              <div>
                <label className="block text-[10px] font-bold text-sky-300 mb-0.5">Website URL</label>
                <input
                  type="url"
                  value={socialLinks.websiteUrl}
                  onChange={(e) => setSocialLinks((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                  className="w-full bg-[#111621] border border-slate-600 text-white px-2.5 py-1 rounded-lg focus:outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-indigo-3