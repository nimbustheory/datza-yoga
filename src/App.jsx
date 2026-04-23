import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";
import {
  Home, Calendar, TrendingUp, Users, CreditCard, CalendarDays,
  Menu, X, Bell, Settings, Shield, ChevronRight, ChevronDown, Clock,
  ArrowUpRight, ArrowDownRight, Award, DollarSign, LayoutDashboard,
  UserCheck, Megaphone, LogOut, Plus, Edit3, Send, Check, Search, Info,
  CircleCheck, UserPlus, Heart, Flame, Star, Sun, Moon, Wind, Sparkles,
  Mountain, Leaf, Music, Gift, Share2, MapPin, Trash2, Volume2,
  Headphones, Eye, Waves, RefreshCw, Zap, Move, Droplets
} from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const STUDIO_CONFIG = {
  name: "DATZA",
  subtitle: "STUDIOS",
  tagline: "Love your yoga, love your self.",
  logoMark: "D",
  description: "Plant-filled, non-heated yoga in Eastlake. Earth, Water, and Fire classes. Rooftop gatherings. Sound healing. Attuned to seasonal and lunar cycles.",
  heroLine1: "EARTH WATER",
  heroLine2: "FIRE",
  address: { street: "2201 Eastlake Ave E, Ste B", city: "Seattle", state: "WA", zip: "98102" },
  phone: "(206) 829-9338",
  email: "datza@datzastudios.com",
  neighborhood: "Eastlake, Seattle",
  website: "https://www.datzastudios.com",
  social: { instagram: "@datzastudios" },
  locations: [{ name: "Eastlake Studio", type: "yoga" }],
  theme: {
    accent:     { h: 135, s: 30, l: 40 },
    accentAlt:  { h: 25,  s: 60, l: 52 },
    warning:    { h: 210, s: 40, l: 48 },
    primary:    { h: 140, s: 18, l: 10 },
    surface:    { h: 135, s: 8,  l: 97 },
    surfaceDim: { h: 130, s: 6,  l: 93 },
  },
  features: {
    workshops: true, retreats: true, soundBaths: true, teacherTrainings: false,
    practiceTracking: true, communityFeed: true, guestPasses: true, milestones: true,
    multiLocation: false, elementalClasses: true, rooftopYoga: true, plantFilled: true,
  },
  classCapacity: 18,
  specialtyCapacity: 12,
};

const STUDIO_IMAGES = {
  home: "https://www.datzastudios.com/wp-content/uploads/2026/03/DSC05424web.jpg",
  classes: "https://www.datzastudios.com/wp-content/uploads/2021/02/physiotoningweb.jpg",
  schedule: "https://www.datzastudios.com/wp-content/uploads/2026/03/DatzaWinter2025-Yoga-47web.jpg",
  practice: "https://www.datzastudios.com/wp-content/uploads/2025/09/110A9485web.jpg",
  community: "https://www.datzastudios.com/wp-content/uploads/2023/09/group.jpeg",
  teachers: "https://www.datzastudios.com/wp-content/uploads/2025/05/Datza-Yoga-Studios-Teachers.jpg",
  events: "https://www.datzastudios.com/wp-content/uploads/2022/09/roof1.jpeg",
  membership: "https://www.datzastudios.com/wp-content/uploads/2023/02/candle3.jpeg",
};
const GRADIENTS = {
  home: `linear-gradient(135deg, hsl(135,30%,24%) 0%, hsl(140,18%,12%) 100%)`,
  classes: `linear-gradient(135deg, hsl(25,60%,28%) 0%, hsl(135,22%,18%) 100%)`,
  schedule: `linear-gradient(135deg, hsl(140,22%,20%) 0%, hsl(135,30%,18%) 100%)`,
  practice: `linear-gradient(135deg, hsl(135,25%,26%) 0%, hsl(140,18%,14%) 100%)`,
  community: `linear-gradient(135deg, hsl(210,40%,28%) 0%, hsl(140,18%,14%) 100%)`,
  teachers: `linear-gradient(135deg, hsl(135,30%,28%) 0%, hsl(25,30%,18%) 100%)`,
  events: `linear-gradient(135deg, hsl(25,60%,26%) 0%, hsl(135,20%,16%) 100%)`,
  membership: `linear-gradient(135deg, hsl(135,30%,22%) 0%, hsl(210,25%,18%) 100%)`,
};

const hsl = (c, a) => a !== undefined ? `hsla(${c.h},${c.s}%,${c.l}%,${a})` : `hsl(${c.h},${c.s}%,${c.l}%)`;
const hslShift = (c, lShift) => `hsl(${c.h},${c.s}%,${Math.max(0, Math.min(100, c.l + lShift))}%)`;

const T = {
  accent: hsl(STUDIO_CONFIG.theme.accent), accentDark: hslShift(STUDIO_CONFIG.theme.accent, -12),
  accentLight: hslShift(STUDIO_CONFIG.theme.accent, 30), accentGhost: hsl(STUDIO_CONFIG.theme.accent, 0.08),
  accentBorder: hsl(STUDIO_CONFIG.theme.accent, 0.18), success: hsl(STUDIO_CONFIG.theme.accentAlt),
  successGhost: hsl(STUDIO_CONFIG.theme.accentAlt, 0.08), successBorder: hsl(STUDIO_CONFIG.theme.accentAlt, 0.18),
  warning: hsl(STUDIO_CONFIG.theme.warning), warningGhost: hsl(STUDIO_CONFIG.theme.warning, 0.08),
  warningBorder: hsl(STUDIO_CONFIG.theme.warning, 0.2), bg: hsl(STUDIO_CONFIG.theme.primary),
  bgCard: hsl(STUDIO_CONFIG.theme.surface), bgDim: hsl(STUDIO_CONFIG.theme.surfaceDim),
  text: "#141c18", textMuted: "#4a6858", textFaint: "#7a9888",
  border: "#c8dcd0", borderLight: "#e0eee4",
};

const today = new Date().toISOString().split('T')[0];
const offsetDate = (d) => { const dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString().split('T')[0]; };
const formatDateShort = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); };
const formatDateLong = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }); };
const fmtTime = (t) => { const [h, m] = t.split(":"); const hr = +h; return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`; };

const TEACHERS = [
  { id: "t1", firstName: "Datza", lastName: "", role: "Founder & Lead Teacher", certs: ["Multi-Lineage Trained", "Studio Visionary"], specialties: ["Strong & Fluid", "Earth Bound Yoga", "Physio Toning Lab"], yearsTeaching: 12, bio: "Born in Riga, Latvia. Datza grew up immersed in traditional music, dance, and sport. Yoga captivated her because it offered physical strength and deep self-inquiry. She has trained with Kathleen Hunt, Janet Stone, Briohny Smith, Elena Brower, and Achintya Devi.", photo: "" },
  { id: "t2", firstName: "Roman", lastName: "V.", role: "Studio Manager & Teacher", certs: ["RYT-200"], specialties: ["Earth Bound Yoga", "Evening Chill", "Community"], yearsTeaching: 6, bio: "Roman co-manages the studio with Datza. Students praise his warmth and professionalism at the front desk. His grounding Earth classes create space for stillness and self-discovery.", photo: "" },
  { id: "t3", firstName: "Mira", lastName: "Santos", role: "Teacher", certs: ["RYT-500", "Sound Healing Certified"], specialties: ["Candlelight Restorative", "Sound Healing", "Moving Meditation"], yearsTeaching: 9, bio: "Mira leads the candlelight restorative and sound healing offerings. Her sessions blend ancient wisdom with vibrational healing, creating experiences that students describe as profoundly transformative.", photo: "" },
  { id: "t4", firstName: "Kai", lastName: "Chen", role: "Teacher", certs: ["RYT-200", "Physio Toning Certified"], specialties: ["Physio Toning Lab", "Strong & Fluid", "Fire Classes"], yearsTeaching: 5, bio: "Kai brings the fire. Her Physio Toning Lab classes are the high-intensity counterpoint to the studio restorative offerings. Cardio meets mindfulness in a plant-filled space.", photo: "" },
  { id: "t5", firstName: "Luna", lastName: "Park", role: "Teacher", certs: ["RYT-200", "Prenatal Certified"], specialties: ["Prenatal Yoga", "Moving Meditation", "Water Classes"], yearsTeaching: 7, bio: "Luna teaches Water classes — flowing, adaptive, responsive. Her prenatal practice supports expectant parents through every stage. Her Moving Meditation classes are rhythmic journeys of breath and body.", photo: "" },
];

const TODAYS_FOCUS = {
  id: "focus-today", date: today, name: "Strong & Fluid (Water)", type: "WATER", style: "Strong & Fluid", temp: "Non-heated", duration: 60,
  description: "A dynamic Water class blending strength and fluidity. Move with breath, build power, and find your flow in our plant-filled Eastlake studio. Attuned to the rhythm of the season.",
  intention: "Yoga is a soul practice. A path of awareness, rhythm, and transformation.",
  teacherTip: "Bring your own mat. $2 mat rental available. Doors lock at class start. Arrive 15 minutes early. Water bottle filler on site.",
};

const PAST_PRACTICES = [
  { id: "p-y1", date: offsetDate(-1), name: "Earth Bound Yoga (Earth)", type: "EARTH", style: "Earth Bound", temp: "Non-heated", duration: 60, description: "Grounding practice. Longer holds, deep breath, rooted awareness. The Earth element steadies the nervous system and anchors you in the present moment.", intention: "Ground into presence. Meet yourself where you are." },
  { id: "p-y2", date: offsetDate(-2), name: "Candlelight Restorative (Earth)", type: "CANDLE", style: "Candlelight Restorative", temp: "Non-heated", duration: 75, description: "Supported postures by candlelight among the plants. Bolsters, blankets, and blocks hold you as tension dissolves. The deepest form of rest.", intention: "Soften. Release. Be held by the earth beneath you." },
  { id: "p-y3", date: offsetDate(-3), name: "Physio Toning Lab (Fire)", type: "FIRE", style: "Physio Toning", temp: "Non-heated", duration: 45, description: "The Fire element. High-intensity, low-impact toning that builds serious strength. Fast-paced and music-driven. The fiery counterpoint to Earth and Water.", intention: "Ignite. Transform. Rise." },
];

const UPCOMING_PRACTICE = { id: "p-tmrw", date: offsetDate(1), name: "Moving Meditation (Water)", type: "MEDITATION", style: "Moving Meditation", temp: "Non-heated", duration: 60, description: "A Water class. Slow, rhythmic, breath-led movement that becomes meditation in motion. Not quite flow, not quite stillness — the space between.", intention: "The water does not push. It finds its way." };

const CLASSES_TODAY = [
  { id: "cl1", time: "09:00", type: "Earth Bound Yoga", coach: "Datza", capacity: 18, registered: 16, waitlist: 2, location: "Eastlake Studio" },
  { id: "cl2", time: "10:30", type: "Strong & Fluid", coach: "Roman V.", capacity: 18, registered: 14, waitlist: 0, location: "Eastlake Studio" },
  { id: "cl3", time: "12:00", type: "Physio Toning Lab", coach: "Kai Chen", capacity: 18, registered: 16, waitlist: 0, location: "Eastlake Studio" },
  { id: "cl4", time: "16:30", type: "Prenatal Yoga", coach: "Luna Park", capacity: 12, registered: 8, waitlist: 0, location: "Eastlake Studio" },
  { id: "cl5", time: "18:00", type: "Strong & Fluid", coach: "Datza", capacity: 18, registered: 18, waitlist: 4, location: "Eastlake Studio" },
  { id: "cl6", time: "19:30", type: "Evening Chill", coach: "Roman V.", capacity: 18, registered: 14, waitlist: 0, location: "Eastlake Studio" },
];

const WEEKLY_SCHEDULE = [
  { day: "Monday", classes: [{ time: "09:00", type: "Earth Bound Yoga", coach: "Datza", location: "Eastlake Studio" }, { time: "10:30", type: "Strong & Fluid", coach: "Roman", location: "Eastlake Studio" }, { time: "12:00", type: "Physio Toning Lab", coach: "Kai", location: "Eastlake Studio" }, { time: "16:30", type: "Prenatal Yoga", coach: "Luna", location: "Eastlake Studio" }, { time: "18:00", type: "Strong & Fluid", coach: "Datza", location: "Eastlake Studio" }, { time: "19:30", type: "Evening Chill", coach: "Roman", location: "Eastlake Studio" }] },
  { day: "Tuesday", classes: [{ time: "09:00", type: "Earth Bound Yoga", coach: "Datza", location: "Eastlake Studio" }, { time: "10:30", type: "Strong & Fluid", coach: "Roman", location: "Eastlake Studio" }, { time: "12:00", type: "Physio Toning Lab", coach: "Kai", location: "Eastlake Studio" }, { time: "16:30", type: "Prenatal Yoga", coach: "Luna", location: "Eastlake Studio" }, { time: "18:00", type: "Strong & Fluid", coach: "Datza", location: "Eastlake Studio" }, { time: "19:30", type: "Evening Chill", coach: "Roman", location: "Eastlake Studio" }] },
  { day: "Wednesday", classes: [{ time: "09:00", type: "Earth Bound Yoga", coach: "Datza", location: "Eastlake Studio" }, { time: "10:30", type: "Strong & Fluid", coach: "Roman", location: "Eastlake Studio" }, { time: "12:00", type: "Physio Toning Lab", coach: "Kai", location: "Eastlake Studio" }, { time: "16:30", type: "Prenatal Yoga", coach: "Luna", location: "Eastlake Studio" }, { time: "18:00", type: "Strong & Fluid", coach: "Datza", location: "Eastlake Studio" }, { time: "19:30", type: "Evening Chill", coach: "Roman", location: "Eastlake Studio" }] },
  { day: "Thursday", classes: [{ time: "09:00", type: "Earth Bound Yoga", coach: "Datza", location: "Eastlake Studio" }, { time: "10:30", type: "Strong & Fluid", coach: "Roman", location: "Eastlake Studio" }, { time: "12:00", type: "Physio Toning Lab", coach: "Kai", location: "Eastlake Studio" }, { time: "16:30", type: "Prenatal Yoga", coach: "Luna", location: "Eastlake Studio" }, { time: "18:00", type: "Strong & Fluid", coach: "Datza", location: "Eastlake Studio" }, { time: "19:30", type: "Evening Chill", coach: "Roman", location: "Eastlake Studio" }] },
  { day: "Friday", classes: [{ time: "09:00", type: "Earth Bound Yoga", coach: "Datza", location: "Eastlake Studio" }, { time: "10:30", type: "Strong & Fluid", coach: "Roman", location: "Eastlake Studio" }, { time: "12:00", type: "Physio Toning Lab", coach: "Kai", location: "Eastlake Studio" }, { time: "16:30", type: "Prenatal Yoga", coach: "Luna", location: "Eastlake Studio" }, { time: "18:00", type: "Strong & Fluid", coach: "Datza", location: "Eastlake Studio" }, { time: "19:30", type: "Evening Chill", coach: "Roman", location: "Eastlake Studio" }] },
  { day: "Saturday", classes: [{ time: "09:00", type: "Earth Bound Yoga", coach: "Datza", location: "Eastlake Studio" }, { time: "10:30", type: "Moving Meditation", coach: "Luna", location: "Eastlake Studio" }, { time: "12:00", type: "Physio Toning Lab", coach: "Kai", location: "Eastlake Studio" }, { time: "16:00", type: "Candlelight Restorative", coach: "Mira", location: "Eastlake Studio" }] },
  { day: "Sunday", classes: [{ time: "09:00", type: "Earth Bound Yoga", coach: "Datza", location: "Eastlake Studio" }, { time: "10:30", type: "Moving Meditation", coach: "Luna", location: "Eastlake Studio" }, { time: "12:00", type: "Physio Toning Lab", coach: "Kai", location: "Eastlake Studio" }, { time: "16:00", type: "Candlelight Restorative", coach: "Mira", location: "Eastlake Studio" }] },
];

const COMMUNITY_FEED = [
  { id: "cf1", user: "Nina R.", milestone: "100 Classes", message: "One hundred classes among the plants. Datza and Roman create something I have never found anywhere else. Earth, Water, Fire — every element of myself, honored.", date: today, celebrations: 32 },
  { id: "cf2", user: "Elena K.", milestone: "First Sound Bath", message: "Mira played the bowls while we lay among the plants by candlelight. I cried. I do not know why. I just know I needed it.", date: today, celebrations: 28 },
  { id: "cf3", user: "Marcus J.", milestone: "30-Day Streak", message: "Thirty days of showing up. Earth Bound on quiet mornings. Physio Toning when I needed fire. Evening Chill to close the day. This studio knows rhythm.", date: offsetDate(-1), celebrations: 24 },
  { id: "cf4", user: "Priya M.", milestone: "Prenatal Journey", message: "Luna held space for my entire pregnancy. The Water classes were exactly what my body needed. Flowing, adaptive, responsive.", date: offsetDate(-2), celebrations: 30 },
];

const MILESTONE_BADGES = {
  "First Class": { icon: Leaf, color: T.accent },
  "10 Classes": { icon: Wind, color: T.accent },
  "50 Classes": { icon: Mountain, color: T.accent },
  "100 Classes": { icon: Star, color: T.success },
  "7-Day Streak": { icon: Flame, color: T.warning },
  "30-Day Streak": { icon: Sparkles, color: T.success },
  "First Sound Bath": { icon: Headphones, color: "#8b5cf6" },
  "All 3 Elements": { icon: Droplets, color: "#3b82f6" },
  "1 Year Member": { icon: Award, color: T.success },
};

const EVENTS = [
  { id: "ev1", name: "Sound Bath by Candlelight", date: "2026-05-16", startTime: "19:30", type: "Sound Healing", description: "Crystal bowls, chimes, and vibrations among the plants by candlelight. Lie down. Let the sound wash through you. Deeply restorative. Deeply transformative.", fee: 35, maxParticipants: 18, registered: 16, status: "Almost Full" },
  { id: "ev2", name: "Rooftop Yoga: Summer Solstice", date: "2026-06-20", startTime: "18:00", type: "Special Class", description: "A seasonal practice on the Eastlake rooftop for the longest day of the year. Vinyasa attuned to the fire of the solstice. Community gathering after.", fee: 30, maxParticipants: 25, registered: 14, status: "Registration Open" },
  { id: "ev3", name: "Birthday Week Free Class", date: offsetDate(7), startTime: "09:00", type: "Community", description: "Free class during your birthday week. Email datza@datzastudios.com to claim. Because you should be celebrated.", fee: 0, maxParticipants: 18, registered: 6, status: "Ongoing" },
];

const MEMBERSHIP_TIERS = [
  { id: "m0", name: "New Student Special", type: "intro", price: 45, period: "2 weeks", features: ["Unlimited for 14 days", "All Earth, Water, Fire classes", "First purchase only", "Sound baths included"], popular: false },
  { id: "m1", name: "Drop-In", type: "drop-in", price: 25, period: "per class", features: ["Single class credit", "Any class type", "Mat rental $2"], popular: false },
  { id: "m2", name: "5 Class Pack", type: "pack", price: 110, period: "5 classes", features: ["$22 per class", "Any class type", "In-studio or livestream"], popular: false },
  { id: "m3", name: "10 Class Pack", type: "pack", price: 200, period: "10 classes", features: ["$20 per class", "Any class type", "In-studio or livestream", "10% educator discount"], popular: false },
  { id: "m4", name: "Unlimited Monthly", type: "unlimited", price: 135, period: "/month", features: ["Unlimited in-studio + livestream", "All class types", "On-demand video library", "Birthday week free class", "Auto-renewing"], popular: true },
];

const ANNOUNCEMENTS = [
  { id: "a1", title: "New Student Special: 2 Weeks for $45", message: "All Earth, Water, and Fire classes. Sound baths included. First purchase only. Love your yoga, love your self.", type: "celebration", pinned: true },
  { id: "a2", title: "Sound Bath by Candlelight: May 16", message: "Crystal bowls and vibrations among the plants. Almost full. Reserve now.", type: "info", pinned: false },
];

const MEMBERS_DATA = [
  { id: "mem1", name: "Nina Reyes", email: "nina@email.com", membership: "Unlimited Monthly", status: "active", joined: "2023-06-01", checkIns: 286, lastVisit: today },
  { id: "mem2", name: "Elena Kim", email: "elena@email.com", membership: "10 Class Pack", status: "active", joined: "2026-01-15", checkIns: 6, lastVisit: offsetDate(-2) },
  { id: "mem3", name: "Marcus Jones", email: "marcus@email.com", membership: "Unlimited Monthly", status: "active", joined: "2024-03-01", checkIns: 198, lastVisit: today },
  { id: "mem4", name: "Priya Mehta", email: "priya@email.com", membership: "5 Class Pack", status: "active", joined: "2025-10-01", checkIns: 12, lastVisit: offsetDate(-3) },
  { id: "mem5", name: "Jade Park", email: "jade@email.com", membership: "Unlimited Monthly", status: "frozen", joined: "2024-08-01", checkIns: 94, lastVisit: offsetDate(-28) },
  { id: "mem6", name: "Leo Chen", email: "leo@email.com", membership: "New Student Special", status: "active", joined: "2026-04-09", checkIns: 4, lastVisit: offsetDate(-1) },
];

const ADMIN_METRICS = { activeMembers: 146, memberChange: 8, todayCheckIns: 42, weekCheckIns: 254, monthlyRevenue: 19600, revenueChange: 9.2, renewalRate: 89.8, workshopRevenue: 3200 };

const ADMIN_CHARTS = {
  attendance: [
    { day: "Mon", total: 40, avg: 7 }, { day: "Tue", total: 36, avg: 6 },
    { day: "Wed", total: 38, avg: 6 }, { day: "Thu", total: 34, avg: 6 },
    { day: "Fri", total: 32, avg: 5 }, { day: "Sat", total: 40, avg: 10 },
    { day: "Sun", total: 34, avg: 9 },
  ],
  revenue: [
    { month: "Sep", revenue: 15200 }, { month: "Oct", revenue: 16000 },
    { month: "Nov", revenue: 16800 }, { month: "Dec", revenue: 15400 },
    { month: "Jan", revenue: 18000 }, { month: "Feb", revenue: 18800 },
    { month: "Mar", revenue: 19600 },
  ],
  classPopularity: [
    { name: "9:00 AM", pct: 90 }, { name: "10:30 AM", pct: 78 },
    { name: "12:00 PM", pct: 88 }, { name: "4:30 PM", pct: 68 },
    { name: "6:00 PM", pct: 100 }, { name: "7:30 PM", pct: 78 },
  ],
  membershipBreakdown: [
    { name: "Unlimited Monthly", value: 56, color: T.accent },
    { name: "10 Class Pack", value: 30, color: T.success },
    { name: "5 Class Pack", value: 26, color: T.warning },
    { name: "Drop-In / Intro", value: 34, color: T.textMuted },
  ],
};

const AppContext = createContext(null);

function PageHero({ image, title, subtitle }) {
  const [imgError, setImgError] = useState(false);
  const isUrl = typeof image === "string" && (image.startsWith("http") || image.startsWith("/"));
  const isGradient = typeof image === "string" && image.startsWith("linear-gradient");
  return (
    <div style={{ position: "relative", minHeight: 220, overflow: "hidden", marginBottom: 16 }}>
      {isUrl && !imgError ? (
        <img src={image} alt="" loading="lazy" onError={() => setImgError(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.84)" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: isGradient ? image : GRADIENTS.home }} />
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.36) 0%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.12) 100%)" }} />
      <div style={{ position: "relative", padding: "80px 20px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 240 }}>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "3.5rem", fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.1 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 15, color: "rgba(255,255,255,.85)", margin: "8px 0 0", maxWidth: "85%", lineHeight: 1.5 }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function TeacherAvatar({ teacher, size = 56 }) {
  const [imgError, setImgError] = useState(false);
  if (teacher.photo && !imgError) {
    return <img src={teacher.photo} alt={`${teacher.firstName} ${teacher.lastName}`} onError={() => setImgError(true)} style={{ width: size, height: size, borderRadius: size > 48 ? 14 : 10, objectFit: "cover", flexShrink: 0 }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: size > 48 ? 14 : 10, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Libre Baskerville', serif", fontSize: size * 0.38, color: "#fff", flexShrink: 0, fontWeight: 600 }}>
      {teacher.firstName[0]}{teacher.lastName[0]}
    </div>
  );
}

function SectionHeader({ title, linkText, linkPage }) {
  const { setPage } = useContext(AppContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "0 16px" }}>
      <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, margin: 0, fontWeight: 600 }}>{title}</h2>
      {linkText && <button onClick={() => setPage(linkPage)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: T.accent, background: "none", border: "none", cursor: "pointer" }}>{linkText} <ChevronRight size={16} /></button>}
    </div>
  );
}

function QuickAction({ icon: Icon, label, page, color }) {
  const { setPage } = useContext(AppContext);
  return (
    <button onClick={() => setPage(page)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", background: T.bgCard, borderRadius: 12, border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={20} color="#fff" /></div>
      <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{label}</span>
    </button>
  );
}

function PracticeCard({ practice, variant, expanded, onToggle }) {
  const isFeatured = variant === "featured";
  const isExpanded = expanded !== undefined ? expanded : isFeatured;
  const typeColors = { VINYASA: T.accent, YIN: "#8b5cf6", RESTORATIVE: T.success, LSD: "#8b5cf6", INVERSIONS: "#3b82f6", MELLOW: T.success, RESTORE: T.warning, SPECIAL: T.success };
  return (
    <div onClick={onToggle} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderLeft: `4px solid ${typeColors[practice.type] || T.accent}`, borderRadius: 12, padding: isFeatured ? "18px 18px" : "14px 16px", cursor: onToggle ? "pointer" : "default" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isExpanded ? 10 : 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            {practice.date === today ? <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: T.accentGhost, color: T.accent }}>TODAY</span> : <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 600 }}>{formatDateShort(practice.date)}</span>}
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: `${typeColors[practice.type] || T.accent}12`, color: typeColors[practice.type] || T.accent }}>{practice.style}</span>
            {practice.duration && <span style={{ fontSize: 11, color: T.textFaint }}>{practice.duration} min</span>}
          </div>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: isFeatured ? 26 : 20, margin: 0, color: T.text, fontWeight: 600 }}>{practice.name}</h3>
        </div>
        {onToggle && <ChevronDown size={18} color={T.textFaint} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />}
      </div>
      {isExpanded && (
        <div>
          {practice.temp && <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><Sun size={14} color={T.success} /><span style={{ fontSize: 12, fontWeight: 600, color: T.success }}>{practice.temp}</span></div>}
          <p style={{ fontSize: 14, color: "#5a5040", lineHeight: 1.6, margin: "0 0 12px" }}>{practice.description}</p>
          {practice.intention && <div style={{ padding: "10px 12px", background: T.accentGhost, borderRadius: 8, marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>Intention</span><p style={{ fontSize: 13, color: "#5a5040", margin: "4px 0 0", lineHeight: 1.5, fontStyle: "italic" }}>{practice.intention}</p></div>}
          {practice.teacherTip && <div style={{ padding: "10px 12px", background: T.successGhost, borderRadius: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: T.success, textTransform: "uppercase", letterSpacing: "0.05em" }}>Teacher Note</span><p style={{ fontSize: 13, color: "#5a5040", margin: "4px 0 0", lineHeight: 1.5 }}>{practice.teacherTip}</p></div>}
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, multiline }) {
  const style = { width: "100%", padding: "10px 12px", background: T.bgDim, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 14, color: T.text, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...style, resize: "vertical" }} /> : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />}
    </div>
  );
}

function EmptyState({ icon: Icon, message, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
      <Icon size={36} color={T.textFaint} style={{ margin: "0 auto 8px" }} /><p style={{ color: T.textMuted, margin: 0 }}>{message}</p>
      {sub && <p style={{ fontSize: 13, color: T.accent, margin: "6px 0 0" }}>{sub}</p>}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{ background: T.bgDim, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 2px" }}>{label}</p>
      <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: T.text, margin: 0, fontWeight: 700 }}>{value}</p>
    </div>
  );
}

function AdminCard({ title, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: "#111827", margin: "0 0 14px", fontWeight: 600 }}>{title}</h3>
      {children}
    </div>
  );
}

function CrudBar({ onAdd, addLabel = "Add New" }) {
  return (
    <button onClick={onAdd} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
      <Plus size={16} /> {addLabel}
    </button>
  );
}

function CrudActions() {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button style={{ width: 32, height: 32, borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit3 size={14} /></button>
      <button style={{ width: 32, height: 32, borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CONSUMER PAGES
// ═══════════════════════════════════════════════════════════════

function HomePage() {
  const { classRegistrations, openReservation, feedCelebrations, celebrateFeed } = useContext(AppContext);
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const upcoming = CLASSES_TODAY.filter(c => c.time >= currentTime).slice(0, 4);

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.home || GRADIENTS.home} title={<>{STUDIO_CONFIG.heroLine1}<br/><span style={{ color: T.accent, fontStyle: "italic" }}>{STUDIO_CONFIG.heroLine2}</span></>} subtitle={STUDIO_CONFIG.description} />

      <section style={{ padding: "0 16px", paddingTop: 4, position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { icon: Calendar, label: "Reserve", page: "schedule", color: T.accent },
            { icon: Flame, label: "Practice", page: "practice", color: T.success },
            { icon: Heart, label: "Community", page: "community", color: T.warning },
            { icon: Users, label: "Teachers", page: "teachers", color: T.textMuted },
          ].map(a => <QuickAction key={a.label} {...a} />)}
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <SectionHeader title="Today's Practice" linkText="All Classes" linkPage="classes" />
        <div style={{ padding: "0 16px" }}><PracticeCard practice={TODAYS_FOCUS} variant="featured" /></div>
      </section>

      <section style={{ marginTop: 28 }}>
        <SectionHeader title="Upcoming Classes" linkText="Full Schedule" linkPage="schedule" />
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.length > 0 ? upcoming.map(c => {
            const regs = (classRegistrations[c.id] || 0);
            const totalReg = c.registered + regs;
            const isFull = totalReg >= c.capacity;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ textAlign: "center", minWidth: 48 }}>
                  <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, color: T.text, fontWeight: 600 }}>{fmtTime(c.time).split(":")[0]}</span>
                  <span style={{ display: "block", fontSize: 10, color: T.textMuted }}>{fmtTime(c.time).slice(-5)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: T.text, fontSize: 14, margin: 0 }}>{c.type}</p>
                  <p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0" }}>{c.coach.split(" ")[0]} — {c.location}</p>
                </div>
                <div style={{ textAlign: "right", marginRight: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: isFull ? T.warning : totalReg >= c.capacity * 0.8 ? T.success : T.accent }}>{totalReg}/{c.capacity}</span>
                  {c.waitlist > 0 && <span style={{ display: "block", fontSize: 10, color: T.textFaint }}>+{c.waitlist} waitlist</span>}
                </div>
                <button onClick={() => openReservation({ ...c, date: today })} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: isFull ? T.bgDim : T.accent, color: isFull ? T.textMuted : "#fff" }}>
                  {isFull ? "Waitlist" : "Reserve"}
                </button>
              </div>
            );
          }) : <EmptyState icon={Moon} message="No more classes today" sub="See tomorrow's schedule" />}
        </div>
      </section>

      {STUDIO_CONFIG.features.communityFeed && (
        <section style={{ marginTop: 28 }}>
          <SectionHeader title="Community" linkText="View All" linkPage="community" />
          <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {COMMUNITY_FEED.slice(0, 3).map(item => {
              const myC = feedCelebrations[item.id] || 0;
              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: `linear-gradient(135deg, ${T.successGhost}, transparent)`, border: `1px solid ${T.successBorder}`, borderRadius: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Sparkles size={18} color="#fff" /></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: T.text, margin: 0 }}>{item.user} <span style={{ color: T.success }}>{item.milestone}</span></p>
                    <p style={{ fontSize: 11, color: "#6b6050", margin: "2px 0 0" }}>{item.message.length > 55 ? item.message.slice(0, 55) + "..." : item.message}</p>
                  </div>
                  <button onClick={() => celebrateFeed(item.id)} style={{ padding: 8, borderRadius: 8, border: "none", background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <Heart size={16} color={T.success} fill={myC > 0 ? T.success : "none"} /><span style={{ fontSize: 11, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {ANNOUNCEMENTS.length > 0 && (
        <section style={{ marginTop: 28, padding: "0 16px" }}>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, margin: "0 0 12px", fontWeight: 600 }}>Announcements</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ANNOUNCEMENTS.map(a => (
              <div key={a.id} style={{ padding: "14px 16px", borderRadius: 12, borderLeft: `4px solid ${a.type === "celebration" ? T.accent : T.textMuted}`, background: a.type === "celebration" ? T.accentGhost : T.bgDim }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: 0 }}>{a.title}</h3>
                    <p style={{ fontSize: 12, color: "#6b6050", margin: "4px 0 0" }}>{a.message}</p>
                  </div>
                  {a.pinned && <span style={{ fontSize: 10, fontWeight: 600, color: T.accent, background: T.accentGhost, padding: "2px 8px", borderRadius: 99 }}>Pinned</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ padding: "16px 16px 8px", marginTop: 20 }}>
        <div style={{ background: `linear-gradient(165deg, ${T.bg}, hsl(30,20%,14%))`, borderRadius: 16, padding: "24px 20px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.03, background: "radial-gradient(circle at 80% 30%, rgba(255,255,255,.4) 0%, transparent 50%)" }} />
          <div style={{ position: "relative" }}>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, margin: "0 0 6px", fontWeight: 600 }}>New to Datza Studios?</h3>
            <p style={{ fontSize: 13, color: "#b8a898", margin: "0 0 16px", lineHeight: 1.5 }}>New student special: 2 weeks unlimited for $45. Earth. Water. Fire.</p>
            <button onClick={() => {}} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontFamily: "'Libre Baskerville', serif", fontSize: 15, cursor: "pointer", fontWeight: 600 }}>View Memberships <ChevronRight size={16} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ClassesPage() {
  const [exp, setExp] = useState(null);
  const all = [TODAYS_FOCUS, ...PAST_PRACTICES, UPCOMING_PRACTICE].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.classes || GRADIENTS.classes} title="Classes" subtitle="Earth, Water, and Fire classes. Sound baths. Candlelight restorative." />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {all.map(p => <PracticeCard key={p.id} practice={p} expanded={exp === p.id} onToggle={() => setExp(exp === p.id ? null : p.id)} />)}
      </div>
    </div>
  );
}

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const { openReservation } = useContext(AppContext);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.schedule || GRADIENTS.schedule} title="Schedule" subtitle="Reserve your spot -- classes fill up fast" />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {days.map((d, i) => (
            <button key={d} onClick={() => setSelectedDay(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: selectedDay === i ? T.accent : T.bgDim, color: selectedDay === i ? "#fff" : T.textMuted }}>{d}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {WEEKLY_SCHEDULE[selectedDay]?.classes.map((cls, i) => {
            const isSpecial = cls.type.includes("Candlelight") || cls.type.includes("Prenatal") || cls.type.includes("Sound") || cls.type.includes("Evening");
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ textAlign: "center", minWidth: 54 }}>
                  <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: T.text, fontWeight: 600 }}>{fmtTime(cls.time)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: T.text, margin: 0 }}>{cls.type}</p>
                    {isSpecial && <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", padding: "1px 5px", borderRadius: 4, background: T.warningGhost, color: T.warning }}>Specialty</span>}
                  </div>
                  <p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0" }}>{cls.coach} — {cls.location}</p>
                </div>
                <button onClick={() => openReservation({ id: `sched-${selectedDay}-${i}`, time: cls.time, type: cls.type, coach: cls.coach || "TBD", location: cls.location, capacity: isSpecial ? STUDIO_CONFIG.specialtyCapacity : STUDIO_CONFIG.classCapacity, registered: Math.floor(Math.random() * 10) + 15, waitlist: 0, dayLabel: dayNames[selectedDay] })} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: T.accent, color: "#fff" }}>Reserve</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PracticePage() {
  const [activeTab, setActiveTab] = useState("log");
  const [reflection, setReflection] = useState({ energy: 4, focus: 4, notes: "" });
  const [saved, setSaved] = useState(null);
  const streakDays = 18; const totalClasses = 142;

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.practice || GRADIENTS.practice} title="My Practice" subtitle="Track your journey and celebrate growth" />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[
            { icon: Flame, val: streakDays, label: "Day Streak", color: T.accent, ghost: T.accentGhost, bdr: T.accentBorder },
            { icon: Star, val: totalClasses, label: "Total Classes", color: T.success, ghost: T.successGhost, bdr: T.successBorder },
            { icon: Mountain, val: 8, label: "Milestones", color: T.warning, ghost: T.warningGhost, bdr: T.warningBorder },
          ].map((s, i) => (
            <div key={i} style={{ background: s.ghost, border: `1px solid ${s.bdr}`, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
              <s.icon size={20} color={s.color} style={{ margin: "0 auto 4px" }} />
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, fontWeight: 700, color: T.text }}>{s.val}</div>
              <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: T.bgDim, borderRadius: 10, padding: 4 }}>
          {[{ id: "log", label: "Reflection" }, { id: "milestones", label: "Milestones" }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: activeTab === tab.id ? T.bgCard : "transparent", color: activeTab === tab.id ? T.text : T.textMuted, boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,.06)" : "none" }}>{tab.label}</button>
          ))}
        </div>

        {activeTab === "log" && (
          <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><Leaf size={18} color={T.accent} /><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Post-Practice Reflection</h3></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Energy Level</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setReflection({...reflection, energy: n})} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${reflection.energy >= n ? T.accent : T.border}`, background: reflection.energy >= n ? T.accentGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {n <= 2 ? <Moon size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : n <= 4 ? <Sun size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : <Sparkles size={18} color={reflection.energy >= n ? T.accent : T.textFaint} />}
                    </button>
                  ))}
                </div>
              </div>
              <InputField label="Notes / Gratitude" value={reflection.notes} onChange={v => setReflection({...reflection, notes: v})} placeholder="What arose during practice today?" multiline />
              <button onClick={() => { setSaved(true); setTimeout(() => setSaved(null), 2000); setReflection({ energy: 4, focus: 4, notes: "" }); }} style={{ padding: "12px 0", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", background: T.accent, color: "#fff", fontFamily: "'Libre Baskerville', serif", fontSize: 17 }}>
                {saved ? <><Check size={16} style={{ display: "inline", verticalAlign: "middle" }} /> Saved</> : "Save Reflection"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "milestones" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.entries(MILESTONE_BADGES).map(([name, badge], i) => {
              const earned = i < 8;
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: earned ? T.bgCard : T.bgDim, border: `1px solid ${earned ? T.border : T.borderLight}`, borderRadius: 12, opacity: earned ? 1 : 0.5 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: earned ? `${badge.color}15` : T.bgDim, display: "flex", alignItems: "center", justifyContent: "center" }}><badge.icon size={22} color={earned ? badge.color : T.textFaint} /></div>
                  <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.text }}>{name}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{earned ? "Earned" : "Keep practicing!"}</p></div>
                  {earned && <CircleCheck size={18} color={T.accent} />}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, margin: "0 0 12px", fontWeight: 600 }}>Recent Practice</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { date: today, name: "Strong & Fluid (Water)", result: "60 min", badge: "water", icon: Droplets, color: T.warning, ghost: T.warningGhost },
              { date: offsetDate(-1), name: "Earth Bound Yoga (Earth)", result: "60 min", badge: "earth", icon: Leaf, color: T.accent, ghost: T.accentGhost },
              { date: offsetDate(-2), name: "Candlelight Restorative", result: "75 min", badge: "candle", icon: Moon, color: "#8b5cf6", ghost: "#8b5cf610" },
            ].map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: h.ghost, display: "flex", alignItems: "center", justifyContent: "center" }}><h.icon size={16} color={h.color} /></div>
                <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.text }}>{h.name}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{formatDateShort(h.date)}</p></div>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.textMuted }}>{h.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityPage() {
  const { feedCelebrations, celebrateFeed } = useContext(AppContext);
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.community || GRADIENTS.community} title="Community" subtitle="Celebrate each other's practice" />
      <div style={{ padding: "16px 16px 0" }}>
        {STUDIO_CONFIG.features.guestPasses && (
          <div style={{ background: `linear-gradient(135deg, ${T.bg}, hsl(30,20%,14%))`, borderRadius: 14, padding: "18px", marginBottom: 20, color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}><Gift size={20} color={T.accent} /><h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, margin: 0, fontWeight: 600 }}>Guest Passes</h3></div>
            <p style={{ fontSize: 13, color: "#b8a898", margin: "0 0 14px", lineHeight: 1.5 }}>You have <span style={{ color: T.accent, fontWeight: 700 }}>2 guest passes</span> this month. Share the gift of practice.</p>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}><Share2 size={16} /> Share a Guest Pass</button>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {COMMUNITY_FEED.map(item => {
            const myC = feedCelebrations[item.id] || 0;
            return (
              <div key={item.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Libre Baskerville', serif", fontSize: 16, color: "#fff", fontWeight: 700, flexShrink: 0 }}>{item.user[0]}</div>
                  <div><p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: T.text }}>{item.user}</p><p style={{ fontSize: 11, color: T.textMuted }}>{formatDateShort(item.date)}</p></div>
                  <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: T.successGhost, color: T.success }}>{item.milestone}</span>
                </div>
                <p style={{ fontSize: 13, color: "#4a4030", lineHeight: 1.5, margin: "0 0 12px" }}>{item.message}</p>
                <button onClick={() => celebrateFeed(item.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: `1px solid ${myC > 0 ? T.successBorder : T.border}`, background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer" }}>
                  <Heart size={16} color={T.success} fill={myC > 0 ? T.success : "none"} /><span style={{ fontSize: 13, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TeachersPage() {
  const [expandedTeacher, setExpandedTeacher] = useState(null);
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.teachers || GRADIENTS.teachers} title="Teachers" subtitle="Plant-filled studio. Earth, Water, Fire classes. Seasonal. Eastlake." />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {TEACHERS.map(teacher => {
          const expanded = expandedTeacher === teacher.id;
          return (
            <div key={teacher.id} onClick={() => setExpandedTeacher(expanded ? null : teacher.id)} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
                <TeacherAvatar teacher={teacher} size={56} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: T.text }}>{teacher.firstName} {teacher.lastName}</h3>
                  <p style={{ fontSize: 13, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{teacher.role}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{teacher.yearsTeaching}+ years</p>
                </div>
                <ChevronDown size={18} color={T.textFaint} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </div>
              {expanded && (
                <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${T.borderLight}`, paddingTop: 14 }}>
                  <p style={{ fontSize: 13, color: "#5a5040", lineHeight: 1.6, margin: "0 0 12px" }}>{teacher.bio}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {teacher.specialties.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.accentGhost, color: T.accent }}>{s}</span>)}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {teacher.certs.map(c => <span key={c} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.bgDim, color: T.textMuted }}>{c}</span>)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MembershipPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.membership || GRADIENTS.membership} title="Membership" subtitle="Find your path to practice" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: T.bgCard, border: `1px solid ${tier.popular ? T.accent : T.border}`, borderRadius: 14, padding: "20px 18px", position: "relative", overflow: "hidden" }}>
            {tier.popular && <div style={{ position: "absolute", top: 12, right: -28, background: T.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 32px", transform: "rotate(45deg)", textTransform: "uppercase" }}>Popular</div>}
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, margin: "0 0 4px", color: T.text, fontWeight: 600 }}>{tier.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 38, color: T.accent, fontWeight: 700 }}>${tier.price}</span>
              <span style={{ fontSize: 13, color: T.textMuted }}>{tier.period}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
              {tier.features.map((f, i) => <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13, color: "#5a5040" }}><CircleCheck size={14} color={T.accent} style={{ flexShrink: 0 }} />{f}</li>)}
            </ul>
            <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Libre Baskerville', serif", background: tier.popular ? T.accent : T.bg, color: "#fff" }}>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.events || GRADIENTS.events} title="Events" subtitle="Sound baths, rooftop yoga, retreats, and special offerings" />
      <div style={{ padding: "16px 16px 0" }}>
        {EVENTS.map(ev => (
          <div key={ev.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ background: `linear-gradient(135deg, ${T.bg}, hsl(30,20%,14%))`, padding: "20px 18px", color: "#fff" }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.accent }}>{ev.type}</span>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, margin: "6px 0 4px", fontWeight: 600 }}>{ev.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#b8a898" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={14} /> {formatDateShort(ev.date)}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={14} /> {fmtTime(ev.startTime)}</span>
              </div>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <p style={{ fontSize: 13, color: "#5a5040", lineHeight: 1.6, margin: "0 0 14px" }}>{ev.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                <StatBox label="Price" value={ev.fee >= 1000 ? `$${(ev.fee/1000).toFixed(1)}k` : `$${ev.fee}`} />
                <StatBox label="Spots" value={`${ev.registered}/${ev.maxParticipants}`} />
              </div>
              <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Libre Baskerville', serif", background: T.accent, color: "#fff" }}>Register Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN PAGES
// ═══════════════════════════════════════════════════════════════

function AdminDashboard() {
  const metrics = [
    { label: "Active Members", value: ADMIN_METRICS.activeMembers, change: `+${ADMIN_METRICS.memberChange}`, positive: true, icon: Users, color: T.accent },
    { label: "Today's Check-ins", value: ADMIN_METRICS.todayCheckIns, change: `${ADMIN_METRICS.weekCheckIns}/wk`, positive: true, icon: Calendar, color: T.success },
    { label: "Monthly Revenue", value: `$${ADMIN_METRICS.monthlyRevenue.toLocaleString()}`, change: `+${ADMIN_METRICS.revenueChange}%`, positive: true, icon: DollarSign, color: T.warning },
    { label: "Workshop Revenue", value: `$${ADMIN_METRICS.workshopRevenue.toLocaleString()}`, change: "+16 registrations", positive: true, icon: Award, color: "#8b5cf6" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div><h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: "#111827", margin: 0, fontWeight: 600 }}>Dashboard</h1><p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>Welcome back. Here is what is happening at Datza Studios.</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><m.icon size={18} color={m.color} /></div>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 30, color: "#111827", fontWeight: 700 }}>{m.value}</div>
            <span style={{ display: "flex", alignItems: "center", fontSize: 12, fontWeight: 600, color: m.positive ? "#16a34a" : "#dc2626", marginTop: 4 }}>{m.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {m.change}</span>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "6px 0 0" }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <AdminCard title="Weekly Attendance"><div style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={ADMIN_CHARTS.attendance}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="day" stroke="#6b7280" fontSize={12} /><YAxis stroke="#6b7280" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827" }} /><Bar dataKey="total" fill={T.accent} radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></AdminCard>
        <AdminCard title="Revenue Trend"><div style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={ADMIN_CHARTS.revenue}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="month" stroke="#6b7280" fontSize={12} /><YAxis stroke="#6b7280" fontSize={12} tickFormatter={v => `$${v / 1000}k`} /><Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827" }} formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} /><defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.accent} stopOpacity={0.3} /><stop offset="100%" stopColor={T.accent} stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="revenue" stroke={T.accent} fill="url(#revGrad)" /></AreaChart></ResponsiveContainer></div></AdminCard>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <AdminCard title="Membership Breakdown">
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={ADMIN_CHARTS.membershipBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>{ADMIN_CHARTS.membershipBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827" }} /></PieChart></ResponsiveContainer></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>{ADMIN_CHARTS.membershipBreakdown.map((e, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: e.color }} /><span style={{ fontSize: 11, color: "#6b7280" }}>{e.name} ({e.value})</span></div>)}</div>
        </AdminCard>
        <AdminCard title="Class Popularity (% Capacity)"><div style={{ height: 210 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={ADMIN_CHARTS.classPopularity} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} /><XAxis type="number" stroke="#6b7280" fontSize={12} domain={[0, 100]} /><YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={11} width={60} /><Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827" }} formatter={v => [`${v}%`, "Capacity"]} /><Bar dataKey="pct" fill={T.accent} radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div></AdminCard>
        <AdminCard title="Recent Activity">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ text: "New member signup", detail: "Leo Chen - New Student Special", time: "5 min ago", color: T.accent },{ text: "Workshop registration", detail: "Sound Bath - Elena K.", time: "12 min ago", color: "#8b5cf6" },{ text: "Class waitlist full", detail: "6:00 PM Strong & Fluid", time: "18 min ago", color: T.success },{ text: "Payment received", detail: "Unlimited Monthly - Nina Reyes", time: "25 min ago", color: T.warning },{ text: "Guest pass redeemed", detail: "Nina Reyes's guest", time: "1 hr ago", color: "#3b82f6" }].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0" }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 6, flexShrink: 0 }} /><div style={{ flex: 1 }}><p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{a.text}</p><p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.detail}</p></div><span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>{a.time}</span></div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

function AdminMembersPage() {
  const [search, setSearch] = useState(""); const [filter, setFilter] = useState("all");
  const filtered = MEMBERS_DATA.filter(m => { if (filter !== "all" && m.status !== filter) return false; if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false; return true; });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: "#111827", margin: 0, fontWeight: 600 }}>Members</h1><CrudBar addLabel="Add Member" /></div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, position: "relative" }}><Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." style={{ width: "100%", padding: "10px 12px 10px 36px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827", fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>
        <div style={{ display: "flex", gap: 4 }}>{["all", "active", "frozen"].map(f => <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: filter === f ? T.accent : "#f3f4f6", color: filter === f ? "#fff" : "#6b7280" }}>{f}</button>)}</div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>{["Member", "Plan", "Status", "Classes", "Actions"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#6b7280", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}</tr></thead>
          <tbody>{filtered.map(m => (
            <tr key={m.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "12px 16px" }}><p style={{ color: "#111827", fontWeight: 600, margin: 0 }}>{m.name}</p><p style={{ color: "#9ca3af", fontSize: 12, margin: "2px 0 0" }}>{m.email}</p></td>
              <td style={{ padding: "12px 16px", color: "#374151", fontSize: 12 }}>{m.membership}</td>
              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textTransform: "capitalize", background: m.status === "active" ? `${T.accent}15` : `${T.warning}15`, color: m.status === "active" ? T.accent : T.warning }}>{m.status}</span></td>
              <td style={{ padding: "12px 16px", color: "#374151", fontFamily: "monospace" }}>{m.checkIns}</td>
              <td style={{ padding: "12px 16px" }}><CrudActions /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminSchedulePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: "#111827", margin: 0, fontWeight: 600 }}>Schedule</h1><CrudBar addLabel="Add Class" /></div>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>{["Time", "Class", "Teacher", "Studio", "Capacity", "Actions"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#6b7280", fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{CLASSES_TODAY.map(c => (
            <tr key={c.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "12px 14px", color: "#111827", fontFamily: "monospace" }}>{fmtTime(c.time)}</td>
              <td style={{ padding: "12px 14px", color: "#374151", fontWeight: 600 }}>{c.type}</td>
              <td style={{ padding: "12px 14px", color: "#374151" }}>{c.coach}</td>
              <td style={{ padding: "12px 14px", color: "#6b7280", fontSize: 12 }}>{c.location}</td>
              <td style={{ padding: "12px 14px" }}><span style={{ fontFamily: "monospace", fontWeight: 600, color: c.registered >= c.capacity ? T.warning : T.accent }}>{c.registered}/{c.capacity}</span></td>
              <td style={{ padding: "12px 14px" }}><CrudActions /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminTeachersPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: "#111827", margin: 0, fontWeight: 600 }}>Teachers</h1><CrudBar addLabel="Add Teacher" /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {TEACHERS.map(t => (
          <div key={t.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <TeacherAvatar teacher={t} size={48} />
              <div><h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>{t.firstName} {t.lastName}</h3><p style={{ fontSize: 12, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{t.role}</p></div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>{t.certs.slice(0,3).map(c => <span key={c} style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: "#f3f4f6", color: "#6b7280" }}>{c}</span>)}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Schedule</button>
              <button style={{ width: 36, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#6b7280", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminEventsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: "#111827", margin: 0, fontWeight: 600 }}>Events & Workshops</h1><CrudBar addLabel="New Event" /></div>
      {EVENTS.map(ev => (
        <div key={ev.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: `${T.accent}15`, color: T.accent }}>{ev.status}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "8px 0 4px" }}>{ev.name}</h3>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{formatDateShort(ev.date)} -- {ev.type} -- ${ev.fee}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div style={{ textAlign: "right" }}><div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: T.accent, fontWeight: 700 }}>{ev.registered}</div><p style={{ fontSize: 11, color: "#6b7280" }}>of {ev.maxParticipants}</p></div>
              <CrudActions />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminPricingPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: "#111827", margin: 0, fontWeight: 600 }}>Pricing & Memberships</h1><CrudBar addLabel="Add Tier" /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: "#fff", border: `1px solid ${tier.popular ? T.accent : "#e5e7eb"}`, borderRadius: 12, padding: 18 }}>
            {tier.popular && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: `${T.accent}15`, color: T.accent, marginBottom: 8, display: "inline-block" }}>POPULAR</span>}
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: "#111827", margin: "0 0 4px", fontWeight: 600 }}>{tier.name}</h3>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 32, color: T.accent, fontWeight: 700 }}>${tier.price}<span style={{ fontSize: 14, color: "#6b7280", fontWeight: 400 }}> {tier.period}</span></div>
            <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
              <button style={{ width: 36, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBroadcastPage() {
  const [message, setMessage] = useState(""); const [audience, setAudience] = useState("all");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: "#111827", margin: 0, fontWeight: 600 }}>Broadcast</h1>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
        <h3 style={{ color: "#111827", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>New Broadcast</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Title" style={{ padding: "10px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827", fontSize: 13, outline: "none" }} />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message..." rows={4} style={{ padding: "10px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
          <div style={{ display: "flex", gap: 6 }}>{["all", "unlimited", "class cards", "teachers"].map(a => <button key={a} onClick={() => setAudience(a)} style={{ padding: "6px 12px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: audience === a ? T.accent : "#f3f4f6", color: audience === a ? "#fff" : "#6b7280" }}>{a}</button>)}</div>
          <button style={{ padding: "10px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Send size={16} /> Send Broadcast</button>
        </div>
      </div>
      <div><h3 style={{ color: "#111827", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Sent</h3>{ANNOUNCEMENTS.map(a => <div key={a.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 14, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between" }}><h4 style={{ color: "#111827", margin: 0, fontSize: 14, fontWeight: 600 }}>{a.title}</h4><CrudActions /></div><p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>{a.message}</p></div>)}</div>
    </div>
  );
}

function AdminSettingsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 28, color: "#111827", margin: 0, fontWeight: 600 }}>Studio Settings</h1>
      <AdminCard title="Studio Information">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[{ label: "Studio Name", value: STUDIO_CONFIG.name }, { label: "Address", value: STUDIO_CONFIG.address.street + ", " + STUDIO_CONFIG.address.city }, { label: "Phone", value: STUDIO_CONFIG.phone }, { label: "Email", value: STUDIO_CONFIG.email }].map((f, i) => (
            <div key={i}><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}</label><input defaultValue={f.value} style={{ width: "100%", padding: "10px 12px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827", fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>
          ))}
          <button style={{ padding: "10px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Save Changes</button>
        </div>
      </AdminCard>
      <AdminCard title="Integrations">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["MindBody API", "Stripe Payments", "Mailchimp", "Google Calendar"].map((name, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#f9fafb", borderRadius: 8 }}>
              <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{name}</span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: i < 2 ? `${T.accent}15` : "#f3f4f6", color: i < 2 ? T.accent : "#6b7280" }}>{i < 2 ? "Connected" : "Connect"}</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════════════════

function ReservationModal({ classData, onConfirm, onClose }) {
  const [confirmed, setConfirmed] = useState(false);
  const [addedCal, setAddedCal] = useState(false);
  const isFull = classData.registered >= classData.capacity;
  const spotsLeft = classData.capacity - classData.registered;
  const dateLabel = classData.date ? formatDateShort(classData.date) : classData.dayLabel || "This week";

  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, padding: "24px 20px 36px", animation: "slideUp 0.25s ease-out" }}>
        {!confirmed ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, margin: 0, color: T.text, fontWeight: 600 }}>Confirm Reservation</h2>
              <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} color={T.textMuted} /></button>
            </div>
            <div style={{ background: T.bgDim, borderRadius: 14, padding: "18px 16px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Calendar size={24} color="#fff" /></div>
                <div style={{ flex: 1 }}><h3 style={{ fontSize: 17, fontWeight: 700, color: T.text, margin: "0 0 3px" }}>{classData.type}</h3><p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{classData.coach}</p></div>
              </div>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Clock size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>{fmtTime(classData.time)}</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><CalendarDays size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>{dateLabel}</span></div>
                {classData.location && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Waves size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>{classData.location}</span></div>}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Users size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: isFull ? T.warning : spotsLeft <= 5 ? T.success : T.text }}>{isFull ? "Full - join the waitlist" : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} remaining`}</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><MapPin size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>2201 Eastlake Ave E, Eastlake</span></div>
              </div>
            </div>
            <div style={{ background: T.accentGhost, border: `1px solid ${T.accentBorder}`, borderRadius: 10, padding: "12px 14px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><Info size={16} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.accent }}>Reminders</span></div>
              <p style={{ fontSize: 12, color: "#5a5040", margin: "0 0 4px", lineHeight: 1.4 }}>Arrive 10-15 minutes early. Doors close when class begins.</p>
              <p style={{ fontSize: 12, color: "#5a5040", margin: "0 0 4px", lineHeight: 1.4 }}>Doors lock at class start. Arrive 15 min early. 2-hour cancellation window.. Email datza@datzastudios.com for questions to avoid fees.</p>
              <p style={{ fontSize: 12, color: "#5a5040", margin: 0, lineHeight: 1.4 }}>Non-heated. Plant-filled. Mat rental $2. Props provided. 18-person classes..</p>
            </div>
            <button onClick={() => { setConfirmed(true); onConfirm(classData.id); }} style={{ width: "100%", padding: "14px 0", borderRadius: 10, border: "none", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'Libre Baskerville', serif", background: isFull ? T.success : T.accent, color: "#fff", marginBottom: 8 }}>{isFull ? "Join Waitlist" : "Confirm Reservation"}</button>
            <button onClick={onClose} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", fontSize: 14, fontWeight: 600, cursor: "pointer", color: T.textMuted }}>Cancel</button>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.accentGhost, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Check size={32} color={T.accent} /></div>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, margin: "0 0 4px", color: T.text, fontWeight: 600 }}>{isFull ? "Added to Waitlist" : "You're In!"}</h2>
            <p style={{ fontSize: 14, color: T.textMuted, margin: "0 0 20px" }}>{classData.type} with {classData.coach.split(" ")[0]} at {fmtTime(classData.time)}. See you on the mat!</p>
            <div style={{ background: T.bgDim, borderRadius: 12, padding: "14px 16px", marginBottom: 16, textAlign: "left" }}>
              {[["Class", classData.type], ["Teacher", classData.coach], ["Time", fmtTime(classData.time)], ["Date", dateLabel]].map(([l, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 3 ? 8 : 0 }}><span style={{ fontSize: 13, color: T.textMuted }}>{l}</span><span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{v}</span></div>)}
            </div>
            <button onClick={() => setAddedCal(true)} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: `1px solid ${addedCal ? T.accentBorder : T.border}`, background: addedCal ? T.accentGhost : "transparent", fontSize: 14, fontWeight: 600, cursor: "pointer", color: addedCal ? T.accent : T.textMuted, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>{addedCal ? <><Check size={16} /> Added to Calendar</> : <><CalendarDays size={16} /> Add to Calendar</>}</button>
            <button onClick={onClose} style={{ width: "100%", padding: "14px 0", borderRadius: 10, border: "none", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'Libre Baskerville', serif", background: T.accent, color: "#fff" }}>Done</button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

function SettingsModal({ onClose }) {
  const [notifClass, setNotifClass] = useState(true); const [notifCommunity, setNotifCommunity] = useState(true); const [notifEvents, setNotifEvents] = useState(true);
  const Toggle = ({ active, onClick }) => <button onClick={onClick} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: active ? T.accent : T.border, position: "relative" }}><div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: active ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,.15)" }} /></button>;
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, maxHeight: "85vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 26, margin: 0, fontWeight: 600 }}>Settings</h2><button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button></div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Profile</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Libre Baskerville', serif", fontSize: 20, color: "#fff", fontWeight: 700 }}>NR</div>
            <div><p style={{ fontWeight: 700, margin: 0, fontSize: 15 }}>Nina Reyes</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>Unlimited Monthly — Since Jun 2023</p></div>
          </div>
        </div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Notifications</h3>
          {[{ label: "Class Reminders", active: notifClass, toggle: () => setNotifClass(!notifClass) }, { label: "Community Milestones", active: notifCommunity, toggle: () => setNotifCommunity(!notifCommunity) }, { label: "Events & Workshops", active: notifEvents, toggle: () => setNotifEvents(!notifEvents) }].map(n => <div key={n.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}><span style={{ fontSize: 14, color: T.text }}>{n.label}</span><Toggle active={n.active} onClick={n.toggle} /></div>)}
        </div>
        <div style={{ padding: "14px 0" }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>About</h3>
          <p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{STUDIO_CONFIG.name} App v1.0</p>
          <p style={{ fontSize: 12, color: T.textFaint, margin: "4px 0 0" }}>Built by Lumi — LumiClass.App</p>
        </div>
        <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.accent, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Sign Out</button>
      </div>
    </div>
  );
}

function NotificationsModal({ onClose }) {
  const notifications = [
    { id: 1, title: "Tomorrow: Moving Meditation (Water)", message: "Rhythmic breath-led movement. Non-heated. Plant-filled studio.", type: "class", time: "2 hours ago", read: false },
    { id: 2, title: "New Milestone!", message: "Nina R. hit 100 classes. Celebrate together!", type: "community", time: "4 hours ago", read: false },
    { id: 3, title: "Class Reminder", message: "Reserved for 6:00 PM Strong & Fluid with Nicole.", type: "class", time: "6 hours ago", read: true },
    { id: 4, title: "Sound Bath by Candlelight", message: "Crystal bowls among the plants. May 16. Almost full.", type: "event", time: "1 day ago", read: true },
  ];
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, maxHeight: "80vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 26, margin: 0, fontWeight: 600 }}>Notifications</h2><button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {notifications.map(n => (
            <div key={n.id} style={{ display: "flex", gap: 12, padding: "12px 14px", background: n.read ? "transparent" : T.accentGhost, border: `1px solid ${n.read ? T.borderLight : T.accentBorder}`, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: n.type === "class" ? T.accentGhost : n.type === "community" ? T.successGhost : T.warningGhost, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n.type === "class" ? <Calendar size={16} color={T.accent} /> : n.type === "community" ? <Heart size={16} color={T.success} /> : <CalendarDays size={16} color={T.warning} />}</div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: n.read ? 500 : 700, color: T.text, margin: 0 }}>{n.title}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{n.message}</p><p style={{ fontSize: 11, color: T.textFaint, margin: "4px 0 0" }}>{n.time}</p></div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent, marginTop: 4, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App({ startInAdmin, onExitAdmin, onEnterAdmin }) {
  const [page, setPage] = useState(startInAdmin ? "admin-dashboard" : "home");
  const [isAdmin, setIsAdmin] = useState(!!startInAdmin);
  const [showMore, setShowMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [classRegistrations, setClassRegistrations] = useState({});
  const [feedCelebrations, setFeedCelebrations] = useState({});
  const [reservationClass, setReservationClass] = useState(null);
  const contentRef = useRef(null);

  const registerForClass = useCallback((classId) => { setClassRegistrations(prev => ({ ...prev, [classId]: (prev[classId] || 0) + 1 })); setReservationClass(null); }, []);
  const openReservation = useCallback((classData) => { setReservationClass(classData); }, []);
  const celebrateFeed = useCallback((feedId) => { setFeedCelebrations(prev => ({ ...prev, [feedId]: (prev[feedId] || 0) + 1 })); }, []);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [page]);

  const mainTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "practice", label: "Practice", icon: TrendingUp },
    { id: "community", label: "Community", icon: Heart },
    { id: "more", label: "More", icon: Menu },
  ];
  const moreItems = [
    { id: "classes", label: "Classes", icon: Wind },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "membership", label: "Membership", icon: CreditCard },
    { id: "events", label: "Events", icon: CalendarDays },
  ];
  const adminTabs = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "admin-schedule", label: "Schedule", icon: Calendar },
    { id: "admin-members", label: "Members", icon: Users },
    { id: "admin-teachers", label: "Teachers", icon: UserCheck },
    { id: "admin-events", label: "Events", icon: CalendarDays },
    { id: "admin-pricing", label: "Pricing", icon: DollarSign },
    { id: "admin-broadcast", label: "Broadcast", icon: Megaphone },
    { id: "admin-settings", label: "Settings", icon: Settings },
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "classes": return <ClassesPage />;
      case "schedule": return <SchedulePage />;
      case "practice": return <PracticePage />;
      case "community": return <CommunityPage />;
      case "teachers": return <TeachersPage />;
      case "membership": return <MembershipPage />;
      case "events": return <EventsPage />;
      case "admin-dashboard": return <AdminDashboard />;
      case "admin-schedule": return <AdminSchedulePage />;
      case "admin-members": return <AdminMembersPage />;
      case "admin-teachers": return <AdminTeachersPage />;
      case "admin-events": return <AdminEventsPage />;
      case "admin-pricing": return <AdminPricingPage />;
      case "admin-broadcast": return <AdminBroadcastPage />;
      case "admin-settings": return <AdminSettingsPage />;
      default: return <HomePage />;
    }
  };

  const isMoreActive = moreItems.some(item => item.id === page);
  const unreadCount = 2;

  const handleEnterAdmin = () => {
    if (onEnterAdmin) {
      onEnterAdmin();
    } else {
      setIsAdmin(true);
      setPage("admin-dashboard");
    }
  };

  const handleExitAdmin = () => {
    if (onExitAdmin) {
      onExitAdmin();
    } else {
      setIsAdmin(false);
      setPage("home");
    }
  };

  if (isAdmin) {
    return (
      <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
        <div style={{ display: "flex", width: "100%", height: startInAdmin ? "100vh" : "100%", fontFamily: "'Lato', system-ui, sans-serif", background: "#f5f5f5" }}>
          <aside style={{ width: 240, background: "#fff", borderRight: "1px solid #e5e7eb", color: "#111827", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "16px 14px", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Libre Baskerville', serif", fontSize: 14, color: "#fff", fontWeight: 700 }}>{STUDIO_CONFIG.logoMark}</div>
                <div><span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 14, display: "block", lineHeight: 1, fontWeight: 600, color: "#111827" }}>{STUDIO_CONFIG.name}</span><span style={{ fontSize: 8, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.15em" }}>Admin</span></div>
              </div>
            </div>
            <nav style={{ flex: 1, padding: "8px 6px", overflow: "auto" }}>
              {adminTabs.map(tab => {
                const active = page === tab.id;
                return <button key={tab.id} onClick={() => setPage(tab.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", background: active ? T.accent : "transparent", color: active ? "#fff" : "#6b7280", fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer", marginBottom: 2, textAlign: "left" }}><tab.icon size={16} /><span>{tab.label}</span></button>;
              })}
            </nav>
            <div style={{ borderTop: "1px solid #e5e7eb", padding: "8px 6px" }}>
              <button onClick={handleExitAdmin} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", background: "transparent", color: "#6b7280", fontSize: 13, cursor: "pointer", textAlign: "left" }}><LogOut size={16} /><span>Exit Admin</span></button>
            </div>
          </aside>
          <main style={{ flex: 1, padding: 24, overflow: "auto" }}>{renderPage()}</main>
        </div>
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
      <div style={{ width: 390, height: 720, position: "relative", overflow: "hidden", borderRadius: 0, background: "white", fontFamily: "'Lato', system-ui, sans-serif" }}>
        <header style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, background: T.bg, color: "#fff", padding: "0 14px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Libre Baskerville', serif", fontSize: 14, color: "#fff", fontWeight: 700 }}>{STUDIO_CONFIG.logoMark}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, lineHeight: 1, fontWeight: 600 }}>{STUDIO_CONFIG.name}</span>
              <span style={{ fontSize: 8, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em" }}>{STUDIO_CONFIG.subtitle}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <button onClick={handleEnterAdmin} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: T.accent }}><Shield size={20} /></button>
            <button onClick={() => setShowNotifications(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff", position: "relative" }}><Bell size={20} />{unreadCount > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: T.accent, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>{unreadCount}</span>}</button>
            <button onClick={() => setShowSettings(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff" }}><Settings size={20} /></button>
          </div>
        </header>

        <div ref={contentRef} style={{ position: "absolute", top: 52, left: 0, right: 0, bottom: 60, overflowY: "auto", overflowX: "hidden", background: T.bgDim, scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`.phone-scroll::-webkit-scrollbar { display: none; }`}</style>
          <div className="phone-scroll" style={{ width: "100%" }}>
            {renderPage()}
          </div>
        </div>

        {showMore && (
          <div onClick={() => setShowMore(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 40 }}>
            <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: 68, left: 16, right: 16, background: T.bgCard, borderRadius: 16, padding: "14px 12px", boxShadow: "0 8px 32px rgba(0,0,0,.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 6px 8px" }}><span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, fontWeight: 600 }}>More</span><button onClick={() => setShowMore(false)} style={{ padding: 4, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer" }}><X size={18} color={T.textMuted} /></button></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {moreItems.map(item => {
                  const active = page === item.id;
                  return <button key={item.id} onClick={() => { setPage(item.id); setShowMore(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? T.accentGhost : T.bgDim, color: active ? T.accent : T.textMuted }}><item.icon size={22} /><span style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</span></button>;
                })}
              </div>
            </div>
          </div>
        )}

        <nav style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "white", borderTop: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-around", zIndex: 50 }}>
          {mainTabs.map(tab => {
            const active = tab.id === "more" ? (isMoreActive || showMore) : page === tab.id;
            return (
              <button key={tab.id} onClick={() => tab.id === "more" ? setShowMore(true) : setPage(tab.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 12px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", color: active ? T.accent : T.textFaint }}>
                <tab.icon size={20} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        {showNotifications && <NotificationsModal onClose={() => setShowNotifications(false)} />}
        {reservationClass && <ReservationModal classData={reservationClass} onConfirm={registerForClass} onClose={() => setReservationClass(null)} />}
      </div>
    </AppContext.Provider>
  );
}
