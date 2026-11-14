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
  Code2
} from 'lucide-react';

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
            developerUrl: 'https://github.com/mahmood-web-dev',
            contactEmail: 'contact@apexglobalconstruction.com',
            contactPhone: '+92 300 0000000'
          };
    } catch {
      return {
        websiteUrl: 'https://www.apexglobalconstruction.com',
        linkedinUrl: 'https://www.linkedin.com',
        whatsappUrl: 'https://wa.me/923000000000',
        developerName: 'Mahmood Web Developer',
        developerUrl: 'https://github.com/mahmood-web-dev',
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

  // --- Live Site Weather & UK HSE / ISO 45001 Safety Compliance State (Auto-Saved & Live) ---
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
          // keep coordinate fallback
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

  // --- Daily Site Safety Checklist State (Auto-Saved & Daily Reset) ---
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
      // fallback below
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

  // --- Register Entries & Navigation States (Auto-Saved) ---
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

  const handleAddEntry = (e) => {
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

  const handleSaveEditedEntry = (e) => {
    e.preventDefault();
    if (!editEntryData || !editEntryData.title.trim()) return;
    setEntries((prev) =>
      prev.map((entry) => (entry.id === editEntryData.id ? { ...editEntryData } : entry))
    );
    setSelectedEntry({ ...editEntryData });
    setIsEditingEntry(false);
    showToast(`Updated & saved ${editEntryData.id}!`);
  };

  const handleDeleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    setSelectedEntry(null);
    setIsEditingEntry(false);
    showToast(`Removed ${id} from register.`);
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

  // Filtered List
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

  // Dashboard Stats
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

  // Status Badge Helper
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

  // Helper for Discipline Icons
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

  // Attachment Icon Helper
  const getAttachmentIcon = (type) => {
    if (type === 'url') return <ExternalLink className="w-4 h-4 text-sky-400" />;
    if (type?.includes('image')) return <Image className="w-4 h-4 text-emerald-400" />;
    return <FileText className="w-4 h-4 text-rose-400" />;
  };

  // Report Share Text
  const reportShareText = useMemo(() => {
    const list = filteredEntries
      .map((e) => `• [${e.id}] (${e.rev}) ${e.title} - ${e.status}`)
      .join('\n');
    return `📊 ISO 19650 REGISTER REPORT (${reportTimeframe.toUpperCase()})
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
${list || 'No items recorded for this timeframe.'}`;
  }, [filteredEntries, activeModule, reportTimeframe, projectInfo, statusCounts]);

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(reportShareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    showToast('Summary copied to clipboard!');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  // Export to MS Excel (CSV Format)
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
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    const fileName = `${projectInfo.projectCode}_${activeModule.replace(/[^a-zA-Z0-9]/g, '_')}_${todayDateKey}.csv`;
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredEntries.length} records to Excel (.csv)!`);
  };

  // Single-Item Export & Share Helpers
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
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-16 right-5 z-50 bg-[#1e2636]/95 backdrop-blur-xl border border-emerald-500/50 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* =====================================================================
          1. ALWAYS-VISIBLE STICKY TOP COMPANY BRANDING + INLINE LINKS + STATUS BAR
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#171e2b]/95 backdrop-blur-2xl border-b border-slate-700/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2 space-y-2">
          {/* Row 1: Editable Company Logo & Name (Left) + Editable Website, Social Media & Contact Us Button (Right) */}
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
                      {companyInfo.tagline}
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

            {/* Right Side Inline with Company Logo & Name: Editable Website, Social Media & Contact Us Button */}
            <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
              <a
                href={socialLinks.websiteUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit Company Website: ${socialLinks.websiteUrl}`}
                className="inline-flex items-center gap-1.5 bg-[#1e2636] hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/40 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Website</span>
              </a>

              <a
                href={socialLinks.linkedinUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title={`LinkedIn: ${socialLinks.linkedinUrl}`}
                className="inline-flex items-center gap-1.5 bg-[#1e2636] hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">LinkedIn</span>
              </a>

              <a
                href={socialLinks.whatsappUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title={`WhatsApp / Social: ${socialLinks.whatsappUrl}`}
                className="inline-flex items-center gap-1.5 bg-[#1e2636] hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Social</span>
              </a>

              <button
                type="button"
                onClick={() => setIsEditingLinks(!isEditingLinks)}
                title="Edit & Auto-Save Website, Social Media & Developer Links"
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
            </div>
          </div>

          {/* Inline Editable Hyperlinks Drawer (Auto-Saved) */}
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
                <label className="block text-[10px] font-bold text-indigo-300 mb-0.5">LinkedIn URL</label>
                <input
                  type="url"
                  value={socialLinks.linkedinUrl}
                  onChange={(e) => setSocialLinks((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                  className="w-full bg-[#111621] border border-slate-600 text-white px-2.5 py-1 rounded-lg focus:outline-none focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-emerald-300 mb-0.5">WhatsApp / Social URL</label>
                <input
                  type="url"
                  value={socialLinks.whatsappUrl}
                  onChange={(e) => setSocialLinks((prev) => ({ ...prev, whatsappUrl: e.target.value }))}
                  className="w-full bg-[#111621] border border-slate-600 text-white px-2.5 py-1 rounded-lg focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-rose-300 mb-0.5">Developer / Company Link</label>
                <input
                  type="url"
                  value={socialLinks.developerUrl}
                  onChange={(e) => setSocialLinks((prev) => ({ ...prev, developerUrl: e.target.value }))}
                  className="w-full bg-[#111621] border border-slate-600 text-white px-2.5 py-1 rounded-lg focus:outline-none focus:border-rose-400"
                />
              </div>
              <div className="flex items-end gap-1.5">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-amber-300 mb-0.5">Contact Email</label>
                  <input
                    type="email"
                    value={socialLinks.contactEmail}
                    onChange={(e) => setSocialLinks((prev) => ({ ...prev, contactEmail: e.target.value }))}
                    className="w-full bg-[#111621] border border-slate-600 text-white px-2.5 py-1 rounded-lg focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingLinks(false);
                    showToast('Website, social & developer links auto-saved!');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-lg cursor-pointer shrink-0"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Row 2: 1st UK HSE/ISO 45001:2018 -> 2nd Temp -> 3rd Date & Time -> Project Dropdown */}
          <div className="flex flex-wrap items-center justify-start gap-2 pt-1.5 border-t border-slate-700/60">
            {/* 1st: UK HSE / ISO 45001:2018 Approve - Safe to Work Button */}
            <button
              type="button"
              onClick={() => {
                setSiteSafetyWeather((prev) => ({
                  ...prev,
                  safetyStatus:
                    prev.safetyStatus === 'APPROVED - SAFE TO WORK'
                      ? 'CAUTION - HIGH WIND / PPE CHECK'
                      : 'APPROVED - SAFE TO WORK'
                }));
                showToast('UK HSE / ISO 45001:2018 status updated & auto-saved!');
              }}
              title="Click to toggle UK HSE / ISO 45001:2018 Safety Status (Auto-Saved)"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer shrink-0 ${
                siteSafetyWeather.safetyStatus.includes('APPROVED')
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
                  : 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{siteSafetyWeather.ukStandard}:</span>
              <span className="text-white">{siteSafetyWeather.safetyStatus}</span>
            </button>

            {/* 2nd: Live Temperature & Site Weather Button */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setWeatherPanelOpen(!weatherPanelOpen)}
                title="Click to view or edit Live Temperature & Site Location (Auto-Saved)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all duration-150 cursor-pointer shadow-sm ${
                  weatherPanelOpen
                    ? 'bg-sky-600 text-white border-sky-400'
                    : 'bg-[#1e2636] hover:bg-[#253044] border-sky-500/40 text-slate-100'
                }`}
              >
                <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-extrabold text-white">{siteSafetyWeather.tempC}°C</span>
                <span className="text-slate-300 hidden xl:inline">{siteSafetyWeather.condition}</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 hidden sm:inline" />
                <span className="font-semibold text-sky-300 max-w-[120px] truncate hidden sm:inline">
                  {siteSafetyWeather.siteCity}
                </span>
                <Edit3 className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              {weatherPanelOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setWeatherPanelOpen(false)} />
                  <div className="absolute left-0 mt-2 w-[320px] sm:w-[370px] bg-[#1a2232]/98 backdrop-blur-2xl border border-sky-500/50 rounded-2xl shadow-2xl p-4 z-50 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <div className="flex items-center gap-1.5">
                        <CloudSun className="w-4 h-4 text-amber-400" />
                        <h3 className="font-extrabold text-white">Live Site Weather & Location</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setWeatherPanelOpen(false)}
                        className="p-1 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="bg-[#121722] border border-slate-700/90 rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <div className="text-xl font-black text-white flex items-center gap-2">
                          <span>{siteSafetyWeather.tempC}°C</span>
                          <span className="text-xs font-semibold text-amber-300">{siteSafetyWeather.condition}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="inline-flex items-center gap-1">
                            <Wind className="w-3 h-3 text-sky-400" /> {siteSafetyWeather.windKmh} km/h
                          </span>
                          <span>•</span>
                          <span>Updated {siteSafetyWeather.lastUpdated}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleDetectGpsSiteLocation}
                        disabled={isFetchingWeather}
                        className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold px-2.5 py-1.5 rounded-xl text-[11px] flex items-center gap-1 transition cursor-pointer shrink-0"
                      >
                        <Compass className={`w-3.5 h-3.5 ${isFetchingWeather ? 'animate-spin' : ''}`} />
                        <span>{isFetchingWeather ? 'Locating...' : 'Live GPS'}</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Construction Site City / Location (Auto-Saves)
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            spellCheck={true}
                            value={siteSafetyWeather.siteCity}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSiteSafetyWeather((prev) => ({ ...prev, siteCity: val }));
                              setProjectInfo((prev) => ({ ...prev, location: val }));
                            }}
                            placeholder="e.g. London, UK or Plot 402..."
                            className="flex-1 bg-[#111621] border border-slate-600 text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-sky-400"
                          />
                          <button
                            type="button"
                            onClick={handleSyncTypedLocationWeather}
                            disabled={isFetchingWeather}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1.5 rounded-lg transition cursor-pointer shrink-0"
                          >
                            Sync
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Temp (°C)</label>
                          <input
                            type="number"
                            value={siteSafetyWeather.tempC}
                            onChange={(e) =>
                              setSiteSafetyWeather((prev) => ({ ...prev, tempC: Number(e.target.value) }))
                            }
                            className="w-full bg-[#111621] border border-slate-600 text-white font-mono px-2 py-1 rounded-lg focus:outline-none focus:border-sky-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Wind (km/h)</label>
                          <input
                            type="number"
                            value={siteSafetyWeather.windKmh}
                            onChange={(e) =>
                              setSiteSafetyWeather((prev) => ({ ...prev, windKmh: Number(e.target.value) }))
                            }
                            className="w-full bg-[#111621] border border-slate-600 text-white font-mono px-2 py-1 rounded-lg focus:outline-none focus:border-sky-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Condition</label>
                          <select
                            value={siteSafetyWeather.condition}
                            onChange={(e) =>
                              setSiteSafetyWeather((prev) => ({ ...prev, condition: e.target.value }))
                            }
                            className="w-full bg-[#111621] border border-slate-600 text-white px-1.5 py-1 rounded-lg focus:outline-none focus:border-sky-400"
                          >
                            <option value="Clear & Dry">Clear & Dry</option>
                            <option value="Clear Sky">Clear Sky</option>
                            <option value="Partly Cloudy">Partly Cloudy</option>
                            <option value="Rain / Wet Site">Rain / Wet</option>
                            <option value="High Wind">High Wind</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-400 font-semibold">✓ Auto-saved to project</span>
                      <button
                        type="button"
                        onClick={() => {
                          setWeatherPanelOpen(false);
                          showToast('Site weather & location saved!');
                        }}
                        className="bg-rose-600 hover:bg-emerald-600 text-white font-bold px-3 py-1 rounded-lg text-[11px] transition cursor-pointer"
                      >
                        Save & Close
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 3rd: Live Date & Time Calendar Pill */}
            <div className="flex items-center gap-2 bg-[#1e2636] border border-slate-700 px-3 py-1.5 rounded-xl shrink-0">
              <Calendar className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-slate-200">{formattedDate}</span>
              <span className="text-slate-600">|</span>
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono text-xs font-bold text-emerald-300 tracking-wide">
                {formattedTime}
              </span>
            </div>

            {/* 4th: Highlighted Editable & Auto-Saved Project Dropdown List */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600/25 via-red-600/20 to-[#1e2636] border border-rose-500/60 px-2.5 py-1 rounded-xl shadow-sm flex-1 sm:flex-initial min-w-[220px] max-w-full">
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                PROJECT
              </span>

              <select
                value={activeProjectId}
                onChange={(e) => handleSelectProjectFromDropdown(e.target.value)}
                title="Switch Active Construction Project (Auto-Saved)"
                className="bg-[#121722] hover:bg-[#192030] text-white text-xs font-extrabold px-2.5 py-1 rounded-lg border border-rose-400/50 focus:outline-none focus:border-white transition cursor-pointer truncate max-w-[200px] sm:max-w-[250px]"
              >
                {projectsList.map((proj) => (
                  <option key={proj.id} value={proj.id} className="bg-[#181e2a] text-white font-bold">
                    [{proj.projectCode}] {proj.projectName}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setIsEditingInfo(!isEditingInfo)}
                title="Edit Selected Project Details"
                className={`p-1 rounded-lg border transition cursor-pointer shrink-0 ${
                  isEditingInfo
                    ? 'bg-rose-600 text-white border-rose-300'
                    : 'bg-[#121722] hover:bg-rose-600 text-rose-300 hover:text-white border-slate-600'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleAddNewProjectToDropdown}
                title="Add New Project to Dropdown List"
                className="p-1 rounded-lg bg-emerald-600/25 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 transition cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Compact Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 pt-3 space-y-3">
        {/* =====================================================================
            2. COMPACT PROJECT BANNER + WINDOWS 11 FLUENT LIVE DASHBOARD PANEL
           ===================================================================== */}
        <section className="bg-[#181e2a] border border-slate-700/80 rounded-2xl p-3.5 sm:p-4 shadow-xl space-y-3">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pb-3 border-b border-slate-700/70">
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                  PROJECT
                </span>
                <span className="bg-white text-rose-700 text-[10px] font-black px-2 py-0.5 rounded-md font-mono uppercase">
                  {projectInfo.projectCode}
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  {projectInfo.location}
                </span>
              </div>

              <h1 className="text-base sm:text-xl font-extrabold tracking-tight uppercase leading-snug">
                <span className="bg-gradient-to-r from-rose-600 to-red-600 text-white px-3 py-0.5 rounded-lg shadow-sm inline-block border border-rose-400/30">
                  {projectInfo.projectName}
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs bg-[#202838] px-3 py-1.5 rounded-xl border border-slate-700/90 w-fit max-w-full">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Client:</span>
                  <span className="font-semibold text-white">{projectInfo.client}</span>
                </div>
                <span className="text-slate-600">|</span>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Consultant:</span>
                  <span className="font-semibold text-white">{projectInfo.consultant}</span>
                </div>
                <span className="text-slate-600">|</span>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Main Contractor:</span>
                  <span className="font-semibold text-amber-300">{projectInfo.contractor}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Edit Project Info + Far-Right Adjustable Editable Daily Safety Checklist */}
            <div className="flex flex-wrap items-center justify-end gap-2 shrink-0 ml-auto">
              <button
                type="button"
                onClick={() => setIsEditingInfo(!isEditingInfo)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 border cursor-pointer ${
                  isEditingInfo
                    ? 'bg-rose-600 text-white border-rose-400 hover:bg-rose-500'
                    : 'bg-[#222b3d] text-white border-slate-600 hover:bg-rose-600 hover:border-rose-500'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingInfo ? 'Close Editor' : 'Edit Project Info'}</span>
              </button>

              {/* Adjustable & Easily Editable Daily Site Safety Checklist Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    if (safetyDropdownOpen) {
                      setIsEditingSafetyList(false);
                      setSafetyDropdownOpen(false);
                    } else {
                      setSafetyDropdownOpen(true);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 font-bold px-3.5 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer shadow-sm border ${
                    safetyDropdownOpen
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border-emerald-500/50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    Daily Safety ({safetyCompletedCount}/{safetyTotalCount})
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      safetyDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {safetyDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => {
                        setIsEditingSafetyList(false);
                        setSafetyDropdownOpen(false);
                      }}
                    />

                    <div className="absolute right-0 mt-2 w-[330px] sm:w-[440px] max-w-[92vw] resize-x overflow-auto bg-[#1b2332]/98 backdrop-blur-2xl border border-emerald-500/50 rounded-2xl shadow-2xl p-3.5 z-50 space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-2 gap-2">
                        <div className="min-w-0">
                          <h3 className="text-xs font-extrabold text-white flex items-center gap-1.5 truncate">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Daily Site Safety Checklist</span>
                          </h3>
                          <span className="text-[10px] text-slate-300 block truncate">
                            UK HSE Standard • Auto-Saved ({dailySafetyChecklist.date})
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              if (isEditingSafetyList) {
                                setIsEditingSafetyList(false);
                                setSafetyDropdownOpen(false);
                                showToast('Safety checklist updated, saved & closed!');
                              } else {
                                setIsEditingSafetyList(true);
                              }
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                              isEditingSafetyList
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                                : 'bg-slate-800 hover:bg-sky-600 text-slate-200 hover:text-white border-slate-600'
                            }`}
                          >
                            {isEditingSafetyList ? (
                              <>
                                <Check className="w-3 h-3" /> Save & Hide
                              </>
                            ) : (
                              <>
                                <Edit3 className="w-3 h-3" /> Edit
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingSafetyList(false);
                              setSafetyDropdownOpen(false);
                            }}
                            title="Hide Checklist"
                            className="p-1 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {isEditingSafetyList && (
                        <form onSubmit={handleAddSafetyItem} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            spellCheck={true}
                            value={newSafetyItemText}
                            onChange={(e) => setNewSafetyItemText(e.target.value)}
                            placeholder="Add new site safety inspection check..."
                            className="flex-1 bg-[#111621] border border-slate-600 text-white text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-emerald-400"
                          />
                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add
                          </button>
                        </form>
                      )}

                      <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                        {dailySafetyChecklist.items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              if (!isEditingSafetyList) toggleSafetyCheckItem(item.id);
                            }}
                            className={`flex items-start gap-2.5 p-2 rounded-xl border transition ${
                              isEditingSafetyList
                                ? 'bg-[#131823] border-slate-600'
                                : item.checked
                                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-100 cursor-pointer'
                                : 'bg-[#131823] border-slate-700/80 text-slate-200 hover:border-slate-500 cursor-pointer'
                            }`}
                          >
                            {isEditingSafetyList ? (
                              <div className="flex items-center gap-1.5 w-full">
                                <input
                                  type="text"
                                  spellCheck={true}
                                  value={item.label}
                                  onChange={(e) => handleUpdateSafetyItemLabel(item.id, e.target.value)}
                                  className="flex-1 bg-[#1a2232] border border-slate-600 text-white text-xs px-2 py-1 rounded-lg focus:outline-none focus:border-sky-400"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSafetyItem(item.id)}
                                  title="Delete Item"
                                  className="p-1 text-rose-400 hover:bg-rose-600 hover:text-white rounded-lg transition cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <>
                                {item.checked ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                )}
                                <span
                                  className={`text-xs leading-snug ${
                                    item.checked ? 'line-through text-emerald-200/80' : 'text-slate-100'
                                  }`}
                                >
                                  {item.label}
                                </span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pt-1.5 border-t border-slate-700 flex items-center justify-between text-[10px] text-slate-300">
                        <span className="font-mono font-bold text-emerald-400">
                          {safetyTotalCount > 0
                            ? Math.round((safetyCompletedCount / safetyTotalCount) * 100)
                            : 0}
                          % Verified
                        </span>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              setDailySafetyChecklist({
                                date: todayDateKey,
                                items: dailySafetyChecklist.items.map((i) => ({ ...i, checked: true }))
                              });
                              setIsEditingSafetyList(false);
                              setSafetyDropdownOpen(false);
                              showToast('All daily safety checks verified & saved!');
                            }}
                            className="text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
                          >
                            Verify All & Hide ✓
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingSafetyList(false);
                              setSafetyDropdownOpen(false);
                            }}
                            className="text-slate-300 hover:text-white font-semibold cursor-pointer"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Windows 11 Fluent Smart Live Dashboard Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="bg-[#1e2636] px-3.5 py-2.5 rounded-xl border border-slate-700/80 hover:border-slate-500 transition flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-300 uppercase block">Total Logged</span>
                <span className="text-xl font-extrabold text-white">{statusCounts.total}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-700/80 text-slate-200">
                <Layers className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-[#1e2636] px-3.5 py-2.5 rounded-xl border border-emerald-500/30 hover:border-emerald-400/60 transition flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-emerald-300 uppercase block">Approved (A)</span>
                <span className="text-xl font-extrabold text-emerald-400">{statusCounts.codeA}</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-[#1e2636] px-3.5 py-2.5 rounded-xl border border-amber-500/30 hover:border-amber-400/60 transition flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-amber-300 uppercase block">Noted (B)</span>
                <span className="text-xl font-extrabold text-amber-400">{statusCounts.codeB}</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-[#1e2636] px-3.5 py-2.5 rounded-xl border border-rose-500/30 hover:border-rose-400/60 transition flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-rose-300 uppercase block">Revise/Rej (C/D)</span>
                <span className="text-xl font-extrabold text-rose-400">
                  {statusCounts.codeC + statusCounts.codeD}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-rose-500/15 text-rose-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-[#1e2636] px-3.5 py-2.5 rounded-xl border border-sky-500/30 hover:border-sky-400/60 transition flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-sky-300 uppercase block">Under Review</span>
                <span className="text-xl font-extrabold text-sky-400">{statusCounts.underReview}</span>
              </div>
              <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. SEPARATE FULL-WIDTH "EDIT PROJECT INFO" PANEL
           ===================================================================== */}
        {isEditingInfo && (
          <section className="w-full bg-[#1a202d] border border-rose-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-rose-400" />
                <h2 className="text-sm font-bold text-white">
                  Edit Project Information (Auto-Saves & Built-in Spell Check)
                </h2>
              </div>
              <button
                onClick={() => setIsEditingInfo(false)}
                className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-rose-600 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">Project Name *</label>
                <input
                  type="text"
                  spellCheck={true}
                  value={projectInfo.projectName}
                  onChange={(e) => setProjectInfo({ ...projectInfo, projectName: e.target.value })}
                  className="w-full bg-[#111621] border border-slate-600 text-white font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">Project Code (ISO Prefix)</label>
                <input
                  type="text"
                  value={projectInfo.projectCode}
                  onChange={(e) =>
                    setProjectInfo({ ...projectInfo, projectCode: e.target.value.toUpperCase() })
                  }
                  className="w-full bg-[#111621] border border-slate-600 text-rose-400 font-mono font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">Client Name</label>
                <input
                  type="text"
                  spellCheck={true}
                  value={projectInfo.client}
                  onChange={(e) => setProjectInfo({ ...projectInfo, client: e.target.value })}
                  className="w-full bg-[#111621] border border-slate-600 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">Lead Consultant</label>
                <input
                  type="text"
                  spellCheck={true}
                  value={projectInfo.consultant}
                  onChange={(e) => setProjectInfo({ ...projectInfo, consultant: e.target.value })}
                  className="w-full bg-[#111621] border border-slate-600 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">Main Contractor</label>
                <input
                  type="text"
                  spellCheck={true}
                  value={projectInfo.contractor}
                  onChange={(e) => setProjectInfo({ ...projectInfo, contractor: e.target.value })}
                  className="w-full bg-[#111621] border border-slate-600 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">Site Location / Address</label>
                <input
                  type="text"
                  spellCheck={true}
                  value={projectInfo.location}
                  onChange={(e) => setProjectInfo({ ...projectInfo, location: e.target.value })}
                  className="w-full bg-[#111621] border border-slate-600 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
              <button
                type="button"
                onClick={handleDeleteCurrentProject}
                className="inline-flex items-center gap-1.5 bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 font-semibold px-3 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" /> Remove Project
              </button>

              <button
                onClick={() => {
                  setIsEditingInfo(false);
                  showToast('Project details saved!');
                }}
                className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Save & Close
              </button>
            </div>
          </section>
        )}

        {/* =====================================================================
            4. HIGHLIGHTED SMART REGISTER LOG BAR + QUICK ACTION BUTTONS
           ===================================================================== */}
        <nav className="bg-gradient-to-r from-[#1c2434] via-[#212b3e] to-[#1c2434] border border-sky-500/40 rounded-2xl p-2.5 sm:px-4 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-rose-600 text-white px-3 py-1.5 rounded-xl shadow-sm shrink-0">
              <LayoutGrid className="w-4 h-4" />
              <span className="text-xs font-extrabold tracking-wide uppercase">Register Log</span>
            </div>

            <div className="relative flex-1 lg:w-72">
              <select
                value={activeModule}
                onChange={(e) => setActiveModule(e.target.value)}
                className="w-full bg-[#121722] hover:bg-[#171e2c] text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl border border-sky-500/50 focus:outline-none focus:border-rose-500 transition cursor-pointer shadow-inner"
              >
                {DOCUMENT_TYPES.map((doc) => (
                  <option key={doc.value} value={doc.value} className="bg-[#181e2a] text-white font-medium">
                    {doc.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full lg:w-auto">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-sky-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-md transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> New Entry
            </button>

            <button
              onClick={handleExportToExcel}
              className="inline-flex items-center gap-1.5 bg-[#151b27] hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 font-semibold px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel (.csv)
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#151b27] hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 font-semibold px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> PDF / Report
            </button>

            <button
              onClick={handleBackupToDriveOrFile}
              title="Download JSON Backup for PC or Google Drive"
              className="inline-flex items-center gap-1.5 bg-[#151b27] hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/40 font-semibold px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer"
            >
              <CloudUpload className="w-3.5 h-3.5" /> Backup
            </button>

            <label
              title="Restore JSON Backup from PC or Drive"
              className="inline-flex items-center gap-1.5 bg-[#151b27] hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/40 font-semibold px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5" /> Load
              <input type="file" accept=".json" onChange={handleRestoreBackup} className="hidden" />
            </label>
          </div>
        </nav>

        {/* =====================================================================
            5. COMPACT ROUNDED SEARCH & FILTER BAR
           ===================================================================== */}
        <div className="bg-[#181e2a] border border-slate-700/80 rounded-2xl p-2 sm:px-3.5 shadow-md flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center w-full md:w-96 bg-[#111621] border border-slate-600/90 rounded-full p-1 pl-3.5 focus-within:border-sky-400 transition">
            <Search className="w-3.5 h-3.5 text-slate-300 shrink-0 mr-2" />
            <input
              type="text"
              spellCheck={true}
              placeholder="Search ISO ID, Title, Drawing No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white px-1.5">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => showToast(`Showing ${filteredEntries.length} matching records`)}
              className="bg-rose-600 hover:bg-sky-500 text-white font-bold text-xs px-3.5 py-1 rounded-full transition-all duration-150 shrink-0 cursor-pointer"
            >
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto text-xs">
            <select
              value={selectedDisciplineFilter}
              onChange={(e) => setSelectedDisciplineFilter(e.target.value)}
              className="bg-[#202838] hover:bg-[#273144] text-slate-100 border border-slate-600 rounded-full px-3 py-1.5 font-medium focus:outline-none focus:border-sky-400 transition cursor-pointer"
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
              className="bg-[#202838] hover:bg-[#273144] text-slate-100 border border-slate-600 rounded-full px-3 py-1.5 font-medium focus:outline-none focus:border-sky-400 transition cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Approved (Code A)">Approved (Code A)</option>
              <option value="Approved as Noted (Code B)">Approved as Noted (Code B)</option>
              <option value="Resubmit / Revise (Code C)">Resubmit / Revise (Code C)</option>
              <option value="Closed / Rejected (Code D)">Closed / Rejected (Code D)</option>
              <option value="Under Review">Under Review</option>
            </select>
          </div>
        </div>

        {/* =====================================================================
            6. REFINED SMART "+ NEW ENTRY" SCROLLABLE POPUP MODAL
           ===================================================================== */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
            <div className="bg-[#181f2d] w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-sky-500/50 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-[#1f2839] border-b border-slate-700 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base font-extrabold text-white truncate">
                      New Document Entry — {activeModule}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mt-0.5">
                      <span>ISO 19650 Serial:</span>
                      <span className="font-mono font-bold text-sky-400 bg-[#111621] px-2 py-0.5 rounded-md border border-slate-700">
                        {previewIsoCode}
                      </span>
                      <span className="text-emerald-400 hidden sm:inline">• Spell Check Active</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white transition cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                id="new-entry-form"
                onSubmit={handleAddEntry}
                className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs"
              >
                <div className="bg-[#131823] p-4 rounded-2xl border border-slate-700/80 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    1. ISO 19650 Coding & Revision
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">Originator Code</label>
                      <input
                        type="text"
                        value={formData.originatorCode}
                        onChange={(e) =>
                          setFormData({ ...formData, originatorCode: e.target.value.toUpperCase() })
                        }
                        className="w-full px-3.5 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl font-mono focus:border-sky-400 focus:outline-none"
                        placeholder="CON / CLN / CSL"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">Zone / Sector Code</label>
                      <input
                        type="text"
                        value={formData.zoneCode}
                        onChange={(e) =>
                          setFormData({ ...formData, zoneCode: e.target.value.toUpperCase() })
                        }
                        className="w-full px-3.5 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl font-mono focus:border-sky-400 focus:outline-none"
                        placeholder="Z1 / BLK-A"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">Revision Code</label>
                      <select
                        value={formData.rev}
                        onChange={(e) => setFormData({ ...formData, rev: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl focus:border-sky-400 focus:outline-none"
                      >
                        <option value="Rev 0">Rev 0 (Initial)</option>
                        <option value="Rev 1">Rev 1</option>
                        <option value="Rev 2">Rev 2</option>
                        <option value="Rev 3">Rev 3</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-[#131823] p-4 rounded-2xl border border-slate-700/80 space-y-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                    2. Document Subject & Disciplines
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">Document Title & Subject *</label>
                    <input
                      type="text"
                      required
                      spellCheck={true}
                      placeholder="e.g., Substation Foundation Reinforcement Drawing Sheet 1..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0d1119] border border-slate-600 text-white rounded-xl text-sm focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-200 mb-1.5">
                      Select Disciplines (Multiple) *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_DISCIPLINES.map((disc) => {
                        const isSelected = formData.disciplines.includes(disc);
                        return (
                          <button
                            type="button"
                            key={disc}
                            onClick={() => toggleFormDiscipline(disc)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-sky-600 text-white border-sky-400 shadow-sm'
                                : 'bg-[#1c2434] text-slate-200 border-slate-600 hover:bg-slate-700'
                            }`}
                          >
                            {getDisciplineIcon(disc)}
                            {disc}
                            {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-[#131823] p-4 rounded-2xl border border-slate-700/80 space-y-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    3. Drawing, BOQ & Specification References
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">Drawing Number</label>
                      <input
                        type="text"
                        placeholder="e.g. DWG-CV-101"
                        value={formData.drawingNo}
                        onChange={(e) => setFormData({ ...formData, drawingNo: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">Drawing Title</label>
                      <input
                        type="text"
                        spellCheck={true}
                        placeholder="e.g. Layout Plan"
                        value={formData.drawingTitle}
                        onChange={(e) => setFormData({ ...formData, drawingTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">BOQ Item Ref</label>
                      <input
                        type="text"
                        placeholder="e.g. BOQ Item 3.2.1"
                        value={formData.boqRef}
                        onChange={(e) => setFormData({ ...formData, boqRef: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">Specification Ref</label>
                      <input
                        type="text"
                        placeholder="e.g. Spec Sec 03300"
                        value={formData.specRef}
                        onChange={(e) => setFormData({ ...formData, specRef: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">Submission Format</label>
                      <div className="flex items-center gap-4 bg-[#0d1119] p-2.5 rounded-xl border border-slate-600">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-100">
                          <input
                            type="checkbox"
                            checked={formData.submissionFormat.hardCopy}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                submissionFormat: {
                                  ...formData.submissionFormat,
                                  hardCopy: e.target.checked
                                }
                              })
                            }
                            className="rounded text-sky-500 w-4 h-4"
                          />
                          <span>Hard Copy</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-slate-100">
                          <input
                            type="checkbox"
                            checked={formData.submissionFormat.softCopy}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                submissionFormat: {
                                  ...formData.submissionFormat,
                                  softCopy: e.target.checked
                                }
                              })
                            }
                            className="rounded text-sky-500 w-4 h-4"
                          />
                          <span>Soft Copy (PDF/CAD)</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">
                        Enclosures / Attached Items
                      </label>
                      <input
                        type="text"
                        spellCheck={true}
                        placeholder="e.g. 2 x Printed Drawing Rolls, 1 x Calculation Sheet"
                        value={formData.enclosures}
                        onChange={(e) => setFormData({ ...formData, enclosures: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#131823] p-4 rounded-2xl border border-slate-700/80 space-y-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    4. Attachments, Scope & Review Status
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <button
                        type="button"
                        onClick={() => setAttachmentMode('file')}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                          attachmentMode === 'file'
                            ? 'bg-sky-600 text-white border-sky-400'
                            : 'bg-[#0d1119] text-slate-300 border-slate-600 hover:text-white'
                        }`}
                      >
                        Upload File (PDF / Image)
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttachmentMode('link')}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                          attachmentMode === 'link'
                            ? 'bg-sky-600 text-white border-sky-400'
                            : 'bg-[#0d1119] text-slate-300 border-slate-600 hover:text-white'
                        }`}
                      >
                        External Cloud / Drive URL
                      </button>
                    </div>

                    {attachmentMode === 'file' ? (
                      <div className="bg-[#0d1119] border border-dashed border-slate-600 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-300 truncate pr-2">
                          <UploadCloud className="w-4 h-4 text-sky-400 shrink-0" />
                          <span className="truncate">
                            {uploadedFile
                              ? `${uploadedFile.name} (${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB)`
                              : 'Choose PDF, CAD, or Photo file...'}
                          </span>
                        </div>
                        <label className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg cursor-pointer transition shrink-0">
                          Browse
                          <input type="file" onChange={handleFileChange} className="hidden" />
                        </label>
                      </div>
                    ) : (
                      <input
                        type="url"
                        placeholder="https://drive.google.com/..."
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl focus:border-sky-400 focus:outline-none"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-semibold text-slate-200 mb-1">
                        Item Scope / Description
                      </label>
                      <textarea
                        rows={2}
                        spellCheck={true}
                        placeholder="Brief scope of submittal or inspection..."
                        value={formData.itemDescription}
                        onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block font-semibold text-slate-200 mb-1">Initial Status</label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl focus:border-sky-400 focus:outline-none"
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Approved (Code A)">Approved (Code A)</option>
                          <option value="Approved as Noted (Code B)">Approved as Noted (Code B)</option>
                          <option value="Resubmit / Revise (Code C)">Resubmit / Revise (Code C)</option>
                          <option value="Closed / Rejected (Code D)">Closed / Rejected (Code D)</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        spellCheck={true}
                        placeholder="Reviewer comments or notes..."
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#0d1119] border border-slate-600 text-white rounded-xl focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex items-center justify-between px-5 py-3.5 bg-[#1f2839] border-t border-slate-700 shrink-0 text-xs">
                <span className="text-slate-400 hidden sm:inline">Auto-saves locally upon submission</span>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="new-entry-form"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-emerald-600 text-white font-bold shadow-lg transition cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Entry to Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            7. EYE-COMFORTING SLATE REGISTER DATA TABLE & MOBILE CARDS
           ===================================================================== */}
        <div className="bg-[#181e2a] rounded-3xl border border-slate-700/80 shadow-xl overflow-hidden">
          {filteredEntries.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-sm font-bold text-slate-200">No entries found in {activeModule}</h3>
              <p className="text-xs text-slate-400">
                Click "New Entry" in the navigation bar above to add your first record.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1f2737] text-slate-300 text-[11px] uppercase tracking-wider border-b border-slate-700">
                      <th className="p-4">ISO Serial & Rev</th>
                      <th className="p-4">Disciplines</th>
                      <th className="p-4">Title & Drawing Details</th>
                      <th className="p-4">BOQ / Spec Ref</th>
                      <th className="p-4">Format</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Save & Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/70 text-[13px] leading-relaxed">
                    {filteredEntries.map((item) => {
                      const badge = getStatusBadge(item.status);
                      return (
                        <tr
                          key={item.id}
                          onClick={() => openEntryModal(item, false)}
                          className="hover:bg-[#202838] transition cursor-pointer"
                        >
                          <td className="p-4 align-top">
                            <span className="font-mono text-xs font-bold text-sky-400 block">{item.id}</span>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-[#12161f] text-slate-300 rounded-md font-mono text-[11px] border border-slate-700">
                              {item.rev}
                            </span>
                          </td>

                          <td className="p-4 align-top">
                            <div className="flex flex-wrap gap-1 max-w-[160px]">
                              {(item.disciplines || []).map((disc) => (
                                <span
                                  key={disc}
                                  className="inline-flex items-center gap-1 bg-[#12161f] text-slate-200 px-2 py-0.5 rounded-full text-[11px] font-medium border border-slate-700"
                                >
                                  {getDisciplineIcon(disc)}
                                  {disc}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="p-4 align-top max-w-xs">
                            <div className="font-semibold text-white">{item.title}</div>
                            {(item.drawingNo || item.drawingTitle) && (
                              <div className="text-xs text-slate-400 mt-0.5 font-mono">
                                {item.drawingNo}
                                {item.drawingTitle ? ` — ${item.drawingTitle}` : ''}
                              </div>
                            )}
                          </td>

                          <td className="p-4 align-top font-mono text-xs text-slate-300">
                            <div>{item.boqRef || '—'}</div>
                            <div className="text-slate-400 text-[11px]">{item.specRef || ''}</div>
                          </td>

                          <td className="p-4 align-top text-xs text-slate-300">
                            {item.submissionFormat?.hardCopy && <span className="block">• Hard Copy</span>}
                            {item.submissionFormat?.softCopy && <span className="block">• Soft Copy</span>}
                            {!item.submissionFormat?.hardCopy && !item.submissionFormat?.softCopy && '—'}
                          </td>

                          <td className="p-4 align-top text-xs text-slate-300 whitespace-nowrap font-mono">
                            {item.date}
                          </td>

                          <td className="p-4 align-top">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${badge.style}`}
                            >
                              {badge.icon}
                              {item.status}
                            </span>
                          </td>

                          <td className="p-4 align-top text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() => openEntryModal(item, true)}
                                title="Edit Submittal Record"
                                className="p-2 bg-[#1c2333] hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-xl transition border border-slate-700 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handlePrintItemPDF(item)}
                                title="Print / Save Item PDF"
                                className="p-2 bg-[#1c2333] hover:bg-sky-600 text-sky-400 hover:text-white rounded-xl transition border border-slate-700 cursor-pointer"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleExportItemToExcel(item)}
                                title="Download Item as Excel (.csv)"
                                className="p-2 bg-[#1c2333] hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl transition border border-slate-700 cursor-pointer"
                              >
                                <FileSpreadsheet className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleShareItemEmail(item)}
                                title="Share via Email"
                                className="p-2 bg-[#1c2333] hover:bg-rose-600 text-rose-400 hover:text-white rounded-xl transition border border-slate-700 cursor-pointer"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleCopyItemTeams(item)}
                                title="Share via MS Teams"
                                className="p-2 bg-[#1c2333] hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-xl transition border border-slate-700 cursor-pointer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => openEntryModal(item, false)}
                                title="Inspect & Edit Details"
                                className="p-2 bg-[#1c2333] hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700 cursor-pointer"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="block lg:hidden divide-y divide-slate-800">
                {filteredEntries.map((item) => {
                  const badge = getStatusBadge(item.status);
                  return (
                    <div
                      key={item.id}
                      onClick={() => openEntryModal(item, false)}
                      className="p-4 space-y-3 hover:bg-[#1a202e] transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-xs font-bold text-sky-400">{item.id}</span>
                          <span className="text-[10px] text-slate-500 font-mono ml-2">({item.rev})</span>
                          <h3 className="text-sm font-semibold text-white mt-0.5">{item.title}</h3>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${badge.style}`}
                        >
                          {badge.icon}
                          {item.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {(item.disciplines || []).map((disc) => (
                          <span
                            key={disc}
                            className="inline-flex items-center gap-1 bg-[#1e2534] text-slate-200 px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-slate-700"
                          >
                            {getDisciplineIcon(disc)}
                            {disc}
                          </span>
                        ))}
                      </div>

                      <div
                        className="flex items-center justify-between border-t border-slate-800 pt-2.5 text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-slate-500">{item.date}</span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => openEntryModal(item, true)}
                            className="inline-flex items-center gap-1 bg-[#1c2333] hover:bg-amber-500 text-amber-300 hover:text-slate-950 px-2.5 py-1 rounded-full text-[11px] font-medium border border-slate-700 transition"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                          <button
                            onClick={() => handlePrintItemPDF(item)}
                            className="inline-flex items-center gap-1 bg-[#1c2333] hover:bg-sky-600 text-sky-300 hover:text-white px-2.5 py-1 rounded-full text-[11px] font-medium border border-slate-700 transition"
                          >
                            <Printer className="w-3 h-3" /> PDF
                          </button>
                          <button
                            onClick={() => handleExportItemToExcel(item)}
                            className="inline-flex items-center gap-1 bg-[#1c2333] hover:bg-emerald-600 text-emerald-300 hover:text-white px-2.5 py-1 rounded-full text-[11px] font-medium border border-slate-700 transition"
                          >
                            <FileSpreadsheet className="w-3 h-3" /> Excel
                          </button>
                          <button
                            onClick={() => handleShareItemEmail(item)}
                            className="inline-flex items-center gap-1 bg-[#1c2333] hover:bg-rose-600 text-rose-300 hover:text-white px-2.5 py-1 rounded-full text-[11px] font-medium border border-slate-700 transition"
                          >
                            <Mail className="w-3 h-3" /> Email
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* =====================================================================
          8. REFINED SUBMITTAL INSPECTOR & INLINE EDIT SCROLLABLE POPUP MODAL
         ===================================================================== */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 z-50">
          <div className="bg-[#181f2d] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-700 shadow-2xl overflow-hidden text-slate-200">
            <div className="flex items-start justify-between px-5 py-4 bg-[#1f2839] border-b border-slate-700 shrink-0 gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-sky-400 bg-[#111621] px-2.5 py-0.5 rounded-md border border-slate-700">
                    {selectedEntry.id}
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    {selectedEntry.rev} • {selectedEntry.date}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-white mt-1 truncate">
                  {isEditingEntry ? 'Editing Submittal Record' : selectedEntry.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!isEditingEntry && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditEntryData({
                        ...selectedEntry,
                        disciplines: [...(selectedEntry.disciplines || ['Civil'])]
                      });
                      setIsEditingEntry(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Record
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEntry(null);
                    setIsEditingEntry(false);
                  }}
                  className="text-slate-300 hover:text-white hover:bg-rose-600 p-2 rounded-xl bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {isEditingEntry && editEntryData ? (
              <form
                id="edit-submittal-form"
                onSubmit={handleSaveEditedEntry}
                className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">Revision</label>
                    <select
                      value={editEntryData.rev}
                      onChange={(e) => setEditEntryData({ ...editEntryData, rev: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl"
                    >
                      <option value="Rev 0">Rev 0</option>
                      <option value="Rev 1">Rev 1</option>
                      <option value="Rev 2">Rev 2</option>
                      <option value="Rev 3">Rev 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">Approval Status</label>
                    <select
                      value={editEntryData.status}
                      onChange={(e) => setEditEntryData({ ...editEntryData, status: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl"
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Approved (Code A)">Approved (Code A)</option>
                      <option value="Approved as Noted (Code B)">Approved as Noted (Code B)</option>
                      <option value="Resubmit / Revise (Code C)">Resubmit / Revise (Code C)</option>
                      <option value="Closed / Rejected (Code D)">Closed / Rejected (Code D)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">Submission Date</label>
                    <input
                      type="date"
                      value={editEntryData.date}
                      onChange={(e) => setEditEntryData({ ...editEntryData, date: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-200 mb-1">
                    Document Title & Subject *
                  </label>
                  <input
                    type="text"
                    required
                    spellCheck={true}
                    value={editEntryData.title}
                    onChange={(e) => setEditEntryData({ ...editEntryData, title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl text-sm focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-200 mb-1.5">Disciplines</label>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_DISCIPLINES.map((disc) => {
                      const isSelected = (editEntryData.disciplines || []).includes(disc);
                      return (
                        <button
                          type="button"
                          key={disc}
                          onClick={() => toggleEditEntryDiscipline(disc)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition cursor-pointer ${
                            isSelected
                              ? 'bg-sky-600 text-white border-sky-400'
                              : 'bg-[#131823] text-slate-300 border-slate-600 hover:bg-slate-700'
                          }`}
                        >
                          {getDisciplineIcon(disc)}
                          {disc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">Drawing No</label>
                    <input
                      type="text"
                      value={editEntryData.drawingNo || ''}
                      onChange={(e) => setEditEntryData({ ...editEntryData, drawingNo: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">Drawing Title</label>
                    <input
                      type="text"
                      spellCheck={true}
                      value={editEntryData.drawingTitle || ''}
                      onChange={(e) =>
                        setEditEntryData({ ...editEntryData, drawingTitle: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">BOQ Ref</label>
                    <input
                      type="text"
                      value={editEntryData.boqRef || ''}
                      onChange={(e) => setEditEntryData({ ...editEntryData, boqRef: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">Spec Ref</label>
                    <input
                      type="text"
                      value={editEntryData.specRef || ''}
                      onChange={(e) => setEditEntryData({ ...editEntryData, specRef: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      Author / Subcontractor
                    </label>
                    <input
                      type="text"
                      spellCheck={true}
                      value={editEntryData.author || ''}
                      onChange={(e) => setEditEntryData({ ...editEntryData, author: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      Recipient / Reviewer
                    </label>
                    <input
                      type="text"
                      spellCheck={true}
                      value={editEntryData.recipient || ''}
                      onChange={(e) => setEditEntryData({ ...editEntryData, recipient: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Scope / Description</label>
                  <textarea
                    rows={2}
                    spellCheck={true}
                    value={editEntryData.itemDescription || ''}
                    onChange={(e) =>
                      setEditEntryData({ ...editEntryData, itemDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-200 mb-1">
                    Reviewer Remarks / Notes
                  </label>
                  <textarea
                    rows={2}
                    spellCheck={true}
                    value={editEntryData.comments || ''}
                    onChange={(e) => setEditEntryData({ ...editEntryData, comments: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl"
                  />
                </div>
              </form>
            ) : (
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#131823] p-4 rounded-2xl border border-slate-700/80">
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Module</span>
                    <span className="font-semibold text-white">{selectedEntry.module}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">
                      Originator / Zone
                    </span>
                    <span className="font-semibold text-white">
                      {selectedEntry.originator} / {selectedEntry.zone}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Status</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold mt-0.5 border ${
                        getStatusBadge(selectedEntry.status).style
                      }`}
                    >
                      {selectedEntry.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Drawing No</span>
                    <span className="font-mono text-slate-200">{selectedEntry.drawingNo || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">BOQ Ref</span>
                    <span className="font-mono text-slate-200">{selectedEntry.boqRef || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Spec Ref</span>
                    <span className="font-mono text-slate-200">{selectedEntry.specRef || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Author</span>
                    <span className="text-slate-200">{selectedEntry.author || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Recipient</span>
                    <span className="text-slate-200">{selectedEntry.recipient || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Enclosures</span>
                    <span className="text-slate-200">{selectedEntry.enclosures || 'None'}</span>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-300 block mb-1.5">Disciplines:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedEntry.disciplines || []).map((disc) => (
                      <span
                        key={disc}
                        className="inline-flex items-center gap-1 bg-[#131823] text-slate-200 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-700"
                      >
                        {getDisciplineIcon(disc)}
                        {disc}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedEntry.itemDescription && (
                  <div>
                    <span className="font-bold text-slate-300 block mb-1">Description & Scope:</span>
                    <p className="text-slate-200 bg-[#131823] p-3.5 rounded-2xl border border-slate-700/80 leading-relaxed">
                      {selectedEntry.itemDescription}
                    </p>
                  </div>
                )}

                {selectedEntry.comments && (
                  <div>
                    <span className="font-bold text-slate-300 block mb-1">Reviewer Remarks:</span>
                    <p className="text-amber-200 bg-amber-950/25 p-3.5 rounded-2xl border border-amber-500/30 leading-relaxed">
                      {selectedEntry.comments}
                    </p>
                  </div>
                )}

                {selectedEntry.attachment && (
                  <div className="border-t border-slate-700 pt-3">
                    <span className="font-bold text-slate-300 block mb-2">Attached Document / Link:</span>
                    <div className="flex items-center justify-between p-3.5 bg-sky-500/10 rounded-2xl border border-sky-500/30">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        {getAttachmentIcon(selectedEntry.attachment.type)}
                        <div className="truncate">
                          <p className="font-medium text-white truncate">{selectedEntry.attachment.name}</p>
                          <span className="text-[10px] text-slate-400">{selectedEntry.attachment.size}</span>
                        </div>
                      </div>
                      {selectedEntry.attachment.url && (
                        <a
                          href={selectedEntry.attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-sky-600 hover:bg-emerald-500 text-white rounded-full font-semibold text-xs flex items-center gap-1 transition shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Open
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 bg-[#1f2839] border-t border-slate-700 shrink-0 text-xs">
              {isEditingEntry ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(selectedEntry.id)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-red-950/70 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 font-semibold transition cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Delete Entry
                  </button>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={() => setIsEditingEntry(false)}
                      className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form="edit-submittal-form"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleExportItemToExcel(selectedEntry)}
                      className="px-3 py-1.5 bg-[#131823] hover:bg-emerald-600 text-emerald-300 hover:text-white border border-slate-600 rounded-xl font-semibold flex items-center gap-1 transition cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShareItemEmail(selectedEntry)}
                      className="px-3 py-1.5 bg-[#131823] hover:bg-rose-600 text-rose-300 hover:text-white border border-slate-600 rounded-xl font-semibold flex items-center gap-1 transition cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email
                    </button>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={() => handlePrintItemPDF(selectedEntry)}
                      className="px-4 py-2 bg-sky-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Printer className="w-4 h-4" /> Print / PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEntry(null);
                        setIsEditingEntry(false);
                      }}
                      className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-xl font-medium transition cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bulk Report Export & Share Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#161b26] rounded-3xl max-w-xl w-full p-6 border border-slate-700 shadow-2xl space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Export ISO Register Summary</h3>
              <button
                onClick={() => setReportModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Timeframe Period</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Daily', 'Weekly', 'Monthly', 'Annually'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setReportTimeframe(tf)}
                      className={`py-2 rounded-full font-semibold border transition cursor-pointer ${
                        reportTimeframe === tf
                          ? 'bg-sky-600 text-white border-sky-400'
                          : 'bg-[#0f131c] text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Generated Summary Preview</label>
                <textarea
                  readOnly
                  rows={8}
                  value={reportShareText}
                  className="w-full font-mono text-[11px] p-3.5 bg-[#0f131c] text-slate-300 border border-slate-800 rounded-2xl focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-800 pt-4 text-xs">
              <button
                onClick={handlePrintPDF}
                className="px-4 py-2 bg-sky-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
              <button
                onClick={handleCopyShareLink}
                className="px-4 py-2 bg-emerald-600 hover:bg-amber-500 hover:text-slate-950 text-white font-semibold rounded-full transition flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-4 h-4" /> {copiedLink ? 'Copied!' : 'Copy Summary'}
              </button>
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 border border-slate-700 text-slate-300 hover:bg-slate-800 rounded-full font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          9. SMART WINDOWS 11 FLUENT "CONTACT US" FORM POPUP MODAL
         ===================================================================== */}
      {contactModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#181f2d] rounded-3xl max-w-lg w-full border border-sky-500/40 shadow-2xl overflow-hidden text-slate-200">
            <div className="flex items-center justify-between px-5 py-4 bg-[#1f2839] border-b border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-indigo-600 flex items-center justify-center text-white shadow">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm sm:text-base">Contact Us & Support</h3>
                  <p className="text-[11px] text-slate-400">{companyInfo.companyName}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendContactForm} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    spellCheck={true}
                    placeholder="Enter your name..."
                    value={contactForm.senderName}
                    onChange={(e) => setContactForm({ ...contactForm, senderName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl focus:border-sky-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Your Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={contactForm.senderEmail}
                    onChange={(e) => setContactForm({ ...contactForm, senderEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl focus:border-sky-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Subject</label>
                <input
                  type="text"
                  spellCheck={true}
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Message / Inquiry *</label>
                <textarea
                  rows={4}
                  required
                  spellCheck={true}
                  placeholder="Write your construction project inquiry, feedback, or custom development request..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0d1119] border border-slate-600 text-white rounded-xl focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div className="bg-[#131823] p-3 rounded-xl border border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="text-slate-400">
                  Direct Email: <strong className="text-sky-300">{socialLinks.contactEmail}</strong>
                </span>
                <a
                  href={socialLinks.websiteUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" /> Official Website
                </a>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-emerald-600 text-white font-bold shadow-lg transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          10. ALWAYS-VISIBLE FIXED BOTTOM FOOTER BAR ("CREATED WITH MAHMOOD WEB DEVELOPER" + CONTACT US)
         ===================================================================== */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-[#171e2b]/95 backdrop-blur-2xl border-t border-slate-700/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Code2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Created with</span>
              <a
                href={socialLinks.developerUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${socialLinks.developerName} Link`}
                className="font-extrabold text-white hover:text-sky-400 underline decoration-rose-500/70 underline-offset-4 transition"
              >
                {socialLinks.developerName}
              </a>
            </span>

            <button
              type="button"
              onClick={() => setIsEditingLinks(!isEditingLinks)}
              title="Edit Developer / Company Link (Auto-Saved)"
              className="p-1 rounded-lg bg-[#202838] hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-600 transition cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
            </button>

            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-[11px] text-emerald-400 font-semibold">
              Daily Auto-Updated ({formattedDate})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={socialLinks.websiteUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 bg-[#202838] hover:bg-sky-600 text-sky-300 hover:text-white border border-slate-600 px-3 py-1.5 rounded-xl font-semibold transition"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Company Link</span>
            </a>

            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-3.5 py-1.5 rounded-xl shadow-md transition-all duration-150 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}