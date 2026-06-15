import React, { useState, useEffect } from "react";
import {
  Search, SlidersHorizontal, Heart, Bell, Home, Scale, Sparkles,
  ChevronLeft, ChevronDown, ChevronRight, Check, X, Plus, ArrowUpDown,
  Star, Smartphone, Laptop, Headphones, Tablet, Monitor, Car,
  TrendingDown, Truck, Clock, BellRing, Mail, MessageSquare, Package,
  Cpu, MemoryStick, HardDrive, Maximize, Zap, Camera, BatteryFull, Trophy,
  Sun, Moon, ArrowUp,
} from "lucide-react";

/* ============================ VERİ (Gerçek & Demo Karışık) ============================ */
const CATEGORIES = [
  { id: "telefon", label: "Telefon", icon: Smartphone },
  { id: "laptop", label: "Laptop", icon: Laptop },
  { id: "kulaklik", label: "Kulaklık", icon: Headphones },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "monitor", label: "Monitör", icon: Monitor },
  { id: "otomobil", label: "Otomobil", icon: Car },
];
const CAT_ICON = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.icon]));
const CAT_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));
const tl = (n) => Number(n || 0).toLocaleString("tr-TR") + " ₺";

const PRODUCTS = [
  { id: "p1", category: "telefon", brand: "Xiaomi", model: "POCO X6 Pro", mono: "X6", name: "Xiaomi POCO X6 Pro 512GB", year: 2024, month: 1, price: 22499, rating: 4.7,
    specs: { "Yonga seti": "Dimensity 8300-Ultra", "RAM": "12 GB", "Depolama": "512 GB", "Ekran": "6.67\" 1800 Nit", "Yenileme": "120 Hz", "Kamera": "64 MP OIS", "Batarya": "5000 mAh · 67W", "Ağırlık": "186 g", "Bağlantı": "5G · Wi-Fi 6" },
    history: [24999, 23999, 23499, 22999, 22799, 22499],
    sellers: [{ name: "Mi Store", price: 22499, stock: true, ship: "Ücretsiz" }, { name: "Vatan", price: 22999, stock: true, ship: "Ücretsiz" }, { name: "Teknosa", price: 23499, stock: true, ship: "49 ₺" }] },
  { id: "p2", category: "telefon", brand: "Samsung", model: "Galaxy S23 FE", mono: "S23", name: "Samsung Galaxy S23 FE 256GB", year: 2023, month: 10, price: 26899, rating: 4.5,
    specs: { "Yonga seti": "Exynos 2200", "RAM": "8 GB", "Depolama": "256 GB", "Ekran": "6.4\" 1450 Nit", "Yenileme": "120 Hz", "Kamera": "50 MP OIS", "Batarya": "4500 mAh · 25W", "Ağırlık": "209 g", "Bağlantı": "5G · Wi-Fi 6E" },
    history: [29999, 28999, 27999, 27499, 26999, 26899],
    sellers: [{ name: "Samsung TR", price: 26899, stock: true, ship: "Ücretsiz" }, { name: "Amazon", price: 27100, stock: true, ship: "Ücretsiz" }] },
  { id: "p3", category: "telefon", brand: "Realme", model: "11 Pro+", mono: "R11", name: "Realme 11 Pro+ 512GB", year: 2023, month: 5, price: 23999, rating: 4.6,
    specs: { "Yonga seti": "Dimensity 7050", "RAM": "12 GB", "Depolama": "512 GB", "Ekran": "6.7\" 950 Nit OLED", "Yenileme": "120 Hz", "Kamera": "200 MP OIS", "Batarya": "5000 mAh · 100W", "Ağırlık": "183 g", "Bağlantı": "5G · Wi-Fi 6" },
    history: [25999, 25499, 24999, 24499, 24199, 23999],
    sellers: [{ name: "Vatan", price: 23999, stock: true, ship: "Ücretsiz" }, { name: "Mediamarkt", price: 24290, stock: true, ship: "Ücretsiz" }] },
];
const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];

const num = (s) => { const m = String(s).replace(",", ".").match(/[\d.]+/); return m ? parseFloat(m[0]) : null; };

// GÜÇLENDİRİLMİŞ HESAPLAMA MOTORU (AWS'den eksik veri gelse bile çökmez)
const cheapestOf = (p) => p?.sellers?.length ? Math.min(...p.sellers.map((s) => s.price || 0)) : (p?.price || 0);
const dropPct = (p) => p?.history?.length > 1 ? Math.round(((p.history[0] - p.history[p.history.length - 1]) / p.history[0]) * 100) : 0;

const SPEC_ICON = { "Yonga seti": Cpu, "İşlemci": Cpu, "RAM": MemoryStick, "Depolama": HardDrive, "Ekran": Maximize, "Yenileme": Zap, "Kamera": Camera, "Batarya": BatteryFull };
const HIGHER_BETTER = ["RAM", "Depolama", "Batarya", "Yenileme", "Ekran", "Sürücü"];

function useIsDesktop() {
  const get = () => (typeof window !== "undefined" ? window.matchMedia("(min-width:1024px)").matches : true);
  const [d, setD] = useState(get);
  useEffect(() => {
    const m = window.matchMedia("(min-width:1024px)");
    const h = () => setD(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return d;
}

/* ============================ KÜÇÜK BİLEŞENLER ============================ */
function Logo({ size = 36 }) {
  const r = size * 0.28, bar = (w, c) => <div style={{ height: size * 0.07, width: w, background: c, borderRadius: 9 }} />;
  return (
    <div style={{ width: size, height: size, borderRadius: r, overflow: "hidden", display: "flex", boxShadow: "0 6px 16px rgba(16,21,27,.18)", flexShrink: 0 }}>
      <div style={{ width: "42%", background: "#11161D", display: "flex", flexDirection: "column", justifyContent: "center", gap: size * 0.05, paddingLeft: size * 0.13 }}>
        {bar(size * 0.2, "rgba(255,255,255,.85)")}{bar(size * 0.14, "rgba(255,255,255,.45)")}
      </div>
      <div style={{ width: 2, background: "#fff" }} />
      <div style={{ flex: 1, background: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Check size={size * 0.4} color="#fff" strokeWidth={3.2} />
      </div>
    </div>
  );
}
function Wordmark({ size = 22 }) {
  return <span className="fontui" style={{ fontSize: size, fontWeight: 800, letterSpacing: "-.025em", lineHeight: 1 }}><span className="ink">Kıyas</span><span className="save">Bul</span></span>;
}

// GÜÇLENDİRİLMİŞ GÖRSEL MOTORU (Resimleri AWS'den çeker)
function Thumb({ p, className = "", radius = 14 }) {
  const cat = (p?.category || "telefon").toLowerCase();
  const Icon = CAT_ICON[cat] || Smartphone;
  const imgUrl = p?.img || p?.image; // AWS'den gelen resim etiketlerini okur

  return (
    <div className={"relative flex items-center justify-center overflow-hidden " + className}
      style={{ borderRadius: radius, background: "linear-gradient(145deg,#FBFCFE 0%,#EEF1F6 55%,#E6EAF1 100%)", border: "1px solid rgba(16,21,27,.06)" }}>
      {imgUrl ? (
<img src={imgUrl} alt={p?.name || ""} referrerPolicy="no-referrer" className="w-full h-full object-contain" style={{ mixBlendMode: "multiply", padding: 8 }} />      ) : (
        <Icon className="opacity-20" style={{ width: "38%", height: "38%", color: "#10151B" }} strokeWidth={1.3} />
      )}
      <span className="mono absolute right-1.5 bottom-1" style={{ fontSize: 9, color: "rgba(16,21,27,.34)" }}>{p?.mono || ""}</span>
    </div>
  );
}

function Sparkline({ data = [], w = 80, h = 30, save = true }) {
  const safeData = data.length > 0 ? data : [0, 0];
  const min = Math.min(...safeData), max = Math.max(...safeData);
  const X = (i) => (i / (safeData.length - 1 || 1)) * w, Y = (v) => h - 3 - ((v - min) / (max - min || 1)) * (h - 6);
  const line = safeData.map((v, i) => X(i).toFixed(1) + "," + Y(v).toFixed(1)).join(" ");
  const col = save ? "var(--save)" : "var(--up)", gid = "g" + Math.round(safeData[0] + safeData.length);
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col} stopOpacity="0.16" /><stop offset="1" stopColor={col} stopOpacity="0" /></linearGradient></defs>
      <polygon points={"0," + h + " " + line + " " + w + "," + h} fill={"url(#" + gid + ")"} />
      <polyline points={line} fill="none" stroke={col} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={X(safeData.length - 1)} cy={Y(safeData[safeData.length - 1])} r="2.6" fill={col} />
    </svg>
  );
}

// GÜÇLENDİRİLMİŞ YILDIZ SİSTEMİ (Puansız gelse bile çökmez)
function Stars({ r, size = 12 }) {
  const rating = Number(r) || 0;
  return <span className="inline-flex items-center gap-0.5"><Star size={size} style={{ color: "#E8A93B", fill: "#E8A93B" }} /><span className="mono ink2" style={{ fontSize: 11 }}>{rating > 0 ? rating.toFixed(1) : "-"}</span></span>;
}

/* ============================ UYGULAMA ============================ */
export default function App() {
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    fetch("https://6fc49hsoq6.execute-api.us-east-1.amazonaws.com/v2/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 AWS'den Gelen Canlı Veri:", data);
        if (Array.isArray(data)) setApiProducts(data);
      })
      .catch((err) => console.error("🚨 AWS Bağlantı Hatası:", err));
  }, []);

  const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
  const isDesktop = useIsDesktop();
  const maxCompare = isDesktop ? 3 : 2;

  const [stack, setStack] = useState(["home"]);
  const page = stack[stack.length - 1];
  const go = (p) => { setStack((s) => [...s, p]); window.scrollTo({ top: 0 }); };
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const home = () => { setStack(["home"]); window.scrollTo({ top: 0 }); };

  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cat, setCat] = useState(null);
  const [brandFilter, setBrandFilter] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState("Önerilen");
  const [sortOpen, setSortOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [compare, setCompare] = useState([]);
  const [favs, setFavs] = useState(() => load("kb_favs", []));
  const [recent, setRecent] = useState(() => load("kb_recent", []));
  const [theme, setTheme] = useState(() => load("kb_theme", null) || ((typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light"));
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("p1");
  const [aiStep, setAiStep] = useState(0);
  const [aiUse, setAiUse] = useState(null);
  const [aiBudget, setAiBudget] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [alarm, setAlarm] = useState(null);
  const [alarmPrice, setAlarmPrice] = useState("");
  const [alarmDone, setAlarmDone] = useState(false);
  const [channels, setChannels] = useState({ push: true, mail: false, sms: false });

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); try { localStorage.setItem("kb_theme", JSON.stringify(theme)); } catch (e) {} }, [theme]);
  useEffect(() => { try { localStorage.setItem("kb_favs", JSON.stringify(favs)); } catch (e) {} }, [favs]);
  useEffect(() => { try { localStorage.setItem("kb_recent", JSON.stringify(recent)); } catch (e) {} }, [recent]);
  useEffect(() => { const h = () => setShowTop(window.scrollY > 600); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  // GÜVENLİ LİSTELEME
  const BASE_LIST = apiProducts.length > 0 ? apiProducts : PRODUCTS;
  const product = BASE_LIST.find((p) => p.id === active) || BASE_LIST[0] || PRODUCTS[0];
  
  const toggleCompare = (id) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < maxCompare ? [...c, id] : c));
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const openProduct = (id) => { setActive(id); setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)); go("detail"); };
  const runSearch = () => { setSearchTerm(query); go("results"); };
  const openAlarm = (p) => { setAlarm(p); setAlarmPrice(String(Math.round(cheapestOf(p) * 0.9 / 100) * 100)); setAlarmDone(false); };

  const priceCeil = Math.max(...BASE_LIST.map((p) => p.price || 0), 50000);

  const results = (() => {
    let list = [...BASE_LIST];
    
    if (cat) {
      list = list.filter((p) => (p.category || "").toLowerCase() === cat.toLowerCase());
    }
    if (brandFilter.length) {
      list = list.filter((p) => brandFilter.includes(p.brand || ""));
    }
    if (maxPrice > 0) {
      list = list.filter((p) => (p.price || 0) <= maxPrice);
    }
    if (searchTerm) {
      const q = searchTerm.toLocaleLowerCase("tr");
      list = list.filter((p) => (p.name || "").toLocaleLowerCase("tr").includes(q));
    }
    if (sort === "En düşük fiyat") list = list.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === "En yüksek fiyat") list = list.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sort === "En yeni") list = list.sort((a, b) => ((b.year || 0) * 12 + (b.month || 0)) - ((a.year || 0) * 12 + (a.month || 0)));
    else if (sort === "Puan") list = list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return list;
  })();
  
  const clearFilters = () => { setCat(null); setBrandFilter([]); setMaxPrice(0); setSearchTerm(""); setQuery(""); };
  const startAi = () => { setAiThinking(true); setTimeout(() => { setAiThinking(false); setAiStep(2); }, 1100); };

  /* ----- ÜRÜN KARTI (dikey, grid uyumlu) ----- */
  const ProductCard = ({ p }) => {
    if (!p) return null;
    const cheap = cheapestOf(p), fav = favs.includes(p.id), cmp = compare.includes(p.id), d = dropPct(p);
    return (
      <div className="press group surface rounded-2xl border bd shadowcard overflow-hidden flex flex-col cursor-pointer" onClick={() => openProduct(p.id)}>
        <div className="relative p-3 pb-0">
          <Thumb p={p} className="w-full aspect-square" radius={16} />
          <div className="absolute top-3 left-3 right-3 -m-0 p-0" style={{ pointerEvents: "none" }}>
            <div className="flex items-start justify-between" style={{ pointerEvents: "auto" }}>
              {d > 0 ? <span className="mono save bgsaveb inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg" style={{ fontSize: 11, fontWeight: 700 }}><TrendingDown size={12} />%{d}</span> : <span />}
              <button onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }} className="press surface rounded-full p-1.5 shadow-sm" style={{ color: fav ? "var(--up)" : "#9AA1AC" }}>
                <Heart size={16} fill={fav ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-3 flex flex-col flex-1">
          <p className="fontui font-semibold ink leading-snug line-clamp-2" style={{ fontSize: 14 }}>{p.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="mono ink2" style={{ fontSize: 11 }}>{p.year || new Date().getFullYear()}/{String(p.month || 1).padStart(2, "0")}</span>
            <span style={{ width: 3, height: 3, borderRadius: 9, background: "#CBD0D8" }} /><Stars r={p.rating} size={12} />
          </div>
          <div className="mt-auto pt-2.5">
            <p className="mono" style={{ fontSize: 9, color: "#9AA1AC", letterSpacing: ".04em" }}>EN DÜŞÜK • {p.sellers?.length || 1} SATICI</p>
            <p className="mono ink" style={{ fontSize: 18, fontWeight: 600 }}>{tl(cheap)}</p>
            <button onClick={(e) => { e.stopPropagation(); toggleCompare(p.id); }}
              className="press mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-xl py-2" style={{ fontSize: 12, fontWeight: 600, color: cmp ? "var(--bg)" : "var(--ink2)", background: cmp ? "var(--ink)" : "var(--surface)", border: cmp ? "1px solid var(--ink)" : "1px solid var(--line)" }}>
              <Scale size={13} /> {cmp ? "Karşılaştırmada" : "Karşılaştır"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DealCard = ({ p }) => {
    if(!p) return null;
    const cheap = cheapestOf(p), d = dropPct(p);
    const old = p?.history?.length > 0 ? p.history[0] : (p.price || 0);
    return (
      <div onClick={() => openProduct(p.id)} className="press cursor-pointer surface rounded-2xl border bd shadowcard p-3 shrink-0 lg:shrink" style={{ width: isDesktop ? "auto" : 168 }}>
        <div className="flex items-center justify-between">
          <Thumb p={p} className="w-12 h-12" radius={12} />
          <span className="mono save bgsaveb inline-flex items-center gap-0.5 px-2 py-1 rounded-lg" style={{ fontSize: 11, fontWeight: 700 }}><TrendingDown size={12} />%{d}</span>
        </div>
        <p className="fontui font-semibold ink truncate mt-2.5" style={{ fontSize: 13 }}>{p.name}</p>
        <p className="mono mt-1" style={{ fontSize: 11, color: "#A4ABB5", textDecoration: "line-through" }}>{tl(old)}</p>
        <p className="mono ink" style={{ fontSize: 16, fontWeight: 600 }}>{tl(cheap)}</p>
      </div>
    );
  };

  const VsCard = ({ a, b }) => {
    if(!a || !b) return null;
    return (
      <div onClick={() => { setCompare([a.id, b.id]); go("compare"); }} className="press cursor-pointer surface rounded-2xl border bd shadowcard p-3 flex items-center gap-2 shrink-0 lg:shrink" style={{ width: isDesktop ? "auto" : 210 }}>
        <Thumb p={a} className="w-11 h-11" radius={11} />
        <span className="mono flex items-center justify-center shrink-0" style={{ color: "var(--bg)", background: "var(--ink)", width: 24, height: 24, borderRadius: 24, fontWeight: 700, fontSize: 10 }}>VS</span>
        <Thumb p={b} className="w-11 h-11" radius={11} />
        <div className="flex-1 min-w-0 pl-1"><p className="fontui font-semibold ink truncate" style={{ fontSize: 12 }}>{a.model || a.brand}</p><p className="fontui ink2 truncate" style={{ fontSize: 12 }}>{b.model || b.brand}</p></div>
        <ChevronRight size={16} className="hidden lg:block" style={{ color: "#C2C7D0" }} />
      </div>
    );
  };

  /* ----- FİLTRELER ----- */
  const Filters = () => (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mono mb-2" style={{ fontSize: 10, color: "#9AA1AC", letterSpacing: ".04em" }}>KATEGORİ</p>
        <div className="flex flex-col gap-1">
          <button onClick={() => setCat(null)} className="press text-left rounded-lg px-2.5 py-1.5 fontui" style={{ fontSize: 13, background: !cat ? "var(--ink)" : "transparent", color: !cat ? "var(--bg)" : "var(--ink2)" }}>Tümü</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCat(cat === c.id ? null : c.id)} className="press text-left rounded-lg px-2.5 py-1.5 fontui inline-flex items-center gap-2" style={{ fontSize: 13, background: cat === c.id ? "var(--ink)" : "transparent", color: cat === c.id ? "var(--bg)" : "var(--ink2)" }}><c.icon size={14} />{c.label}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="mono mb-2" style={{ fontSize: 10, color: "#9AA1AC", letterSpacing: ".04em" }}>MAKS. FİYAT</p>
        <input type="range" min="0" max={priceCeil} step="500" value={maxPrice || priceCeil} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-emerald-600" />
        <p className="mono ink mt-1" style={{ fontSize: 12, fontWeight: 600 }}>{maxPrice > 0 ? "≤ " + tl(maxPrice) : "Sınır yok"}</p>
      </div>
      <button onClick={clearFilters} className="press fontui text-left" style={{ fontSize: 12, color: "var(--up)", fontWeight: 600 }}>Filtreleri temizle</button>
    </div>
  );

  const SortDropdown = () => (
    <div className="relative">
      <button onClick={() => setSortOpen((v) => !v)} className="press inline-flex items-center gap-1.5 rounded-xl px-3 py-2 surface" style={{ fontSize: 13, border: "1px solid var(--line)", color: "var(--ink2)", fontWeight: 600 }}><ArrowUpDown size={14} /> {sort} <ChevronDown size={14} /></button>
      {sortOpen && (
        <div className="absolute right-0 z-30 mt-1 surface shadowcard rounded-xl overflow-hidden" style={{ border: "1px solid var(--line)", width: 170 }}>
          {["Önerilen", "En düşük fiyat", "En yüksek fiyat", "En yeni", "Puan"].map((o) => <button key={o} onClick={() => { setSort(o); setSortOpen(false); }} className="press w-full text-left fontui px-3 py-2" style={{ fontSize: 13, background: sort === o ? "var(--surface2)" : "var(--surface)", color: sort === o ? "var(--ink)" : "var(--ink2)", fontWeight: sort === o ? 700 : 500 }}>{o}</button>)}
        </div>
      )}
    </div>
  );

  const Empty = ({ icon: Icon, title, desc, cta, onCta }) => (
    <div className="flex flex-col items-center justify-center text-center gap-2.5 py-20">
      <div className="flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: 18, background: "var(--surface)", border: "1px solid var(--line)", color: "#AEB4BE" }}><Icon size={24} /></div>
      <p className="fontui font-semibold ink" style={{ fontSize: 16 }}>{title}</p>
      <p className="fontui ink2" style={{ fontSize: 13, maxWidth: 280 }}>{desc}</p>
      {cta && <button onClick={onCta} className="press mt-1 btn-primary fontui font-semibold rounded-xl px-4 py-2" style={{ fontSize: 13 }}>{cta}</button>}
    </div>
  );

  /* ============================ SAYFALAR ============================ */
  const PageHome = () => {
    const deals = [...BASE_LIST].sort((a, b) => dropPct(b) - dropPct(a)).slice(0, isDesktop ? 5 : 6);
    return (
      <div className="anim">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl mt-4 lg:mt-6 px-5 py-8 lg:px-12 lg:py-14" style={{ background: "linear-gradient(135deg,#0E1218 0%,#161D27 60%,#10302A 130%)" }}>
          <div className="max-w-2xl">
            <span className="mono inline-flex items-center gap-1.5 text-white/70 px-3 py-1 rounded-full mb-4" style={{ fontSize: 11, background: "rgba(255,255,255,.08)" }}><Sparkles size={12} /> AI destekli karşılaştırma</span>
            <h1 className="fontui text-white" style={{ fontSize: isDesktop ? 42 : 28, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.05 }}>Teknolojide<br />doğru seçim.</h1>
            <p className="fontui text-white/70 mt-3" style={{ fontSize: isDesktop ? 17 : 14, maxWidth: 460 }}>Telefon, laptop, kulaklık ve daha fazlasını karşılaştır; en uygun fiyatı bul, fiyat düşünce haberdar ol.</p>
            <div className="mt-6 flex items-center gap-2 surface rounded-2xl p-1.5 pl-4 max-w-xl shadow-lg">
              <Search size={20} style={{ color: "#A4ABB5" }} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Ürün, marka veya model ara…" className="fontui flex-1 outline-none ink bg-transparent py-2" style={{ fontSize: 15 }} />
              <button onClick={runSearch} className="press btn-primary fontui font-semibold rounded-xl px-5 py-2.5" style={{ fontSize: 14 }}>Ara</button>
            </div>
          </div>
          <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 opacity-90"><Logo size={120} /></div>
        </section>

        {/* KATEGORİLER */}
        <section className="mt-8">
          <h2 className="fontui font-bold ink mb-3" style={{ fontSize: 17 }}>Kategoriler</h2>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2.5">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => { setCat(c.id); setSearchTerm(""); go("results"); }} className="press surface border bd rounded-2xl flex flex-col items-center justify-center gap-2 py-4 shadowcard">
                <c.icon size={24} className="ink2" /><span className="fontui ink2" style={{ fontSize: 12, fontWeight: 500 }}>{c.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* SON BAKILANLAR */}
        {recent.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-3"><h2 className="fontui font-bold ink inline-flex items-center gap-1.5" style={{ fontSize: 17 }}><Clock size={17} className="ink2" /> Son bakılanlar</h2><button onClick={() => setRecent([])} className="press mono ink2" style={{ fontSize: 11 }}>Temizle</button></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{recent.map((id) => BASE_LIST.find((p) => p.id === id)).filter(Boolean).slice(0, isDesktop ? 4 : 4).map((p) => <ProductCard key={p.id} p={p} />)}</div>
          </section>
        )}

        {/* POPÜLER ÜRÜNLER (Veritabanından ilk gelenler) */}
        <section className="mt-8">
          <h2 className="fontui font-bold ink mb-3" style={{ fontSize: 17 }}>Tüm Ürünler</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{BASE_LIST.slice(0, isDesktop ? 8 : 6).map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </section>
      </div>
    );
  };

  const PageResults = () => (
    <div className="anim mt-4 lg:mt-6">
      {!isDesktop && <button onClick={back} className="press inline-flex items-center gap-1 ink2 mb-2" style={{ fontSize: 13 }}><ChevronLeft size={18} /> Geri</button>}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h1 className="fontui font-bold ink" style={{ fontSize: 22 }}>{cat ? CAT_LABEL[cat] : searchTerm ? `"${searchTerm}"` : "Tüm ürünler"}</h1>
          <p className="mono ink2" style={{ fontSize: 12 }}>{results.length} sonuç</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSheetOpen(true)} className="press lg:hidden inline-flex items-center gap-1.5 rounded-xl px-3 py-2" style={{ fontSize: 13, border: "1px solid var(--ink)", color: "var(--ink)", fontWeight: 600 }}><SlidersHorizontal size={14} /> Filtrele</button>
          <SortDropdown />
        </div>
      </div>
      <div className="flex gap-6 items-start">
        <aside className="hidden lg:block shrink-0 sticky top-24" style={{ width: 220 }}><div className="surface border bd rounded-2xl p-4 shadowcard">{Filters()}</div></aside>
        <div className="flex-1 min-w-0">
          {results.length === 0
            ? <Empty icon={Search} title="Sonuç bulunamadı" desc="Farklı bir kelime dene veya filtreleri temizle." cta="Filtreleri temizle" onCta={clearFilters} />
            : <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{results.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
        </div>
      </div>
    </div>
  );

  const PageDetail = () => {
    const p = product, cheap = cheapestOf(p), d = dropPct(p);
    const sorted = [...(p.sellers || [])].sort((a, b) => (a.price || 0) - (b.price || 0));
    const fav = favs.includes(p.id);
    return (
      <div className="anim mt-4 lg:mt-6">
        <button onClick={back} className="press inline-flex items-center gap-1 ink2 mb-3" style={{ fontSize: 13 }}><ChevronLeft size={18} /> Geri</button>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* SOL: görsel */}
          <div className="surface border bd rounded-3xl p-6 flex items-center justify-center shadowcard" style={{ minHeight: isDesktop ? 380 : 220 }}>
            <Thumb p={p} className="w-40 h-40 lg:w-64 lg:h-64" radius={28} />
          </div>
          {/* SAĞ: fiyat + satıcılar */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="mono ink2 px-2 py-0.5 rounded" style={{ fontSize: 11, border: "1px solid var(--line)" }}>{p.year || new Date().getFullYear()}/{String(p.month || 1).padStart(2, "0")}</span>
              <span className="mono ink2 px-2 py-0.5 rounded" style={{ fontSize: 11, border: "1px solid var(--line)" }}>{CAT_LABEL[(p.category || "").toLowerCase()] || p.category || "Diğer"}</span>
              <Stars r={p.rating} size={13} />
            </div>
            <h1 className="fontui ink" style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em" }}>{p.name}</h1>
            <div className="flex items-end justify-between mt-4">
              <div>
                <p className="mono" style={{ fontSize: 10, color: "#9AA1AC", letterSpacing: ".04em" }}>EN DÜŞÜK FİYAT</p>
                <div className="flex items-center gap-2"><p className="mono ink" style={{ fontSize: 30, fontWeight: 700 }}>{tl(cheap)}</p>{d > 0 && <span className="mono save bgsaveb inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg" style={{ fontSize: 12, fontWeight: 700 }}><TrendingDown size={12} />%{d}</span>}</div>
              </div>
              <div className="text-right"><p className="mono" style={{ fontSize: 9, color: "#A4ABB5" }}>GEÇMİŞ</p><Sparkline data={p?.history?.length > 1 ? p.history : [cheap, cheap]} w={90} h={32} /></div>
            </div>
            <div className="mt-4 border bd rounded-2xl overflow-hidden">
              {sorted.length > 0 ? sorted.map((s, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3" style={{ borderTop: i ? "1px solid var(--line2)" : "none", background: i === 0 ? "var(--saveBg)" : "var(--surface)" }}>
                  <div><p className="fontui font-semibold ink inline-flex items-center gap-1.5" style={{ fontSize: 14 }}>{s.name || "Mağaza"}{i === 0 && <span className="mono bgsave" style={{ color: "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 6, fontWeight: 700 }}>EN UCUZ</span>}</p><p className="mono mt-0.5 inline-flex items-center gap-2 ink2" style={{ fontSize: 10 }}><span className="inline-flex items-center gap-1"><Truck size={11} />{s.ship || "-"}</span><span style={{ color: s.stock !== false ? "var(--save)" : "var(--up)" }}>{s.stock !== false ? "Stokta" : "Tükendi"}</span></p></div>
                  <div className="flex items-center gap-1.5"><p className="mono ink" style={{ fontSize: 15, fontWeight: 600 }}>{tl(s.price || cheap)}</p><ChevronRight size={16} style={{ color: "#C2C7D0" }} /></div>
                </div>
              )) : (
                 <div className="px-4 py-4 surface text-center">
                   <p className="fontui ink2" style={{fontSize: 14}}>Satıcı bilgisi bulunamadı.</p>
                 </div>
              )}
            </div>
            <div className="flex gap-2.5 mt-4">
              <button onClick={() => openAlarm(p)} className="press flex-1 inline-flex items-center justify-center gap-2 py-3 fontui font-semibold ink rounded-xl" style={{ border: "1.5px solid var(--ink)", fontSize: 14 }}><BellRing size={16} /> Fiyat alarmı</button>
              <button onClick={() => { if (!compare.includes(p.id)) toggleCompare(p.id); go("compare"); }} className="press flex-1 inline-flex items-center justify-center gap-2 py-3 fontui font-semibold rounded-xl btn-primary" style={{ fontSize: 14 }}><Scale size={16} /> Karşılaştır</button>
              <button onClick={() => toggleFav(p.id)} className="press rounded-xl px-3.5" style={{ border: "1px solid var(--line)", color: fav ? "var(--up)" : "#9AA1AC" }}><Heart size={18} fill={fav ? "currentColor" : "none"} /></button>
            </div>
          </div>
        </div>

        {/* TEKNİK ÖZELLİKLER */}
        {(p.specs && Object.keys(p.specs).length > 0) && (
          <section className="mt-8 surface border bd rounded-2xl p-5 shadowcard">
            <h2 className="fontui font-bold ink mb-3" style={{ fontSize: 16 }}>Teknik özellikler</h2>
            <div className="grid md:grid-cols-2 gap-x-10">
              {Object.entries(p.specs).map(([k, v], i) => { const Ico = SPEC_ICON[k]; return (
                <div key={k} className="flex items-center justify-between py-2.5" style={{ borderTop: "1px solid var(--line2)" }}><span className="fontui inline-flex items-center gap-2 ink2" style={{ fontSize: 13 }}>{Ico && <Ico size={14} style={{ color: "#AEB4BE" }} />}{k}</span><span className="mono ink" style={{ fontSize: 13, fontWeight: 500 }}>{v}</span></div>
              ); })}
            </div>
          </section>
        )}

        {/* BENZER ÜRÜNLER */}
        <section className="mt-8">
          <h2 className="fontui font-bold ink mb-3" style={{ fontSize: 16 }}>Benzer ürünler</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{BASE_LIST.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4).map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      </div>
    );
  };

  const PageCompare = () => {
    const sel = compare.map((id) => BASE_LIST.find((p) => p.id === id)).filter(Boolean);
    if (sel.length < 2) return (
      <div className="anim mt-4 lg:mt-6">
        <Empty icon={Scale} title="Karşılaştırmak için en az 2 ürün seç" desc={'Ürün kartlarındaki "Karşılaştır" düğmesine bas, farkları yan yana gösterelim.'} cta="Ürünlere göz at" onCta={home} />
      </div>
    );
    const keys = sel.reduce((acc, p) => acc.filter((k) => k in (p.specs || {})), Object.keys(sel[0]?.specs || {})).slice(0, 9);
    const rowDefs = [
      { k: "Fiyat", get: (p) => p.price || 0, fmt: (p) => tl(p.price || 0), better: "low" },
      { k: "Çıkış", get: (p) => (p.year || 0) * 12 + (p.month || 0), fmt: (p) => (p.year || "-") + "/" + String(p.month || 1).padStart(2, "0"), better: "high" },
      ...keys.map((k) => ({ k, get: (p) => num((p.specs || {})[k]), fmt: (p) => (p.specs || {})[k], better: HIGHER_BETTER.includes(k) ? "high" : null })),
    ];
    
    // Geri kalanı aynı (hatasız mantık çalışır)
    const colW = "minmax(0,1fr)";
    return (
      <div className="anim mt-4 lg:mt-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="fontui font-bold ink" style={{ fontSize: 22 }}>Karşılaştırma</h1>
          <button onClick={home} className="press mono ink2" style={{ fontSize: 12 }}>+ Ürün ekle</button>
        </div>
        <div className="surface border bd rounded-2xl overflow-hidden shadowcard">
          {/* başlık */}
          <div className="grid sticky top-16 lg:top-20 surface z-10" style={{ gridTemplateColumns: "92px " + sel.map(() => colW).join(" "), borderBottom: "1px solid var(--line)" }}>
            <div />
            {sel.map((p, i) => (
              <div key={p.id} className="p-3 text-center relative" style={{ borderLeft: "1px solid var(--line)" }}>
                <button onClick={() => toggleCompare(p.id)} className="press absolute top-2 right-2 ink2"><X size={14} /></button>
                <div className="flex justify-center"><Thumb p={p} className="w-12 h-12" radius={12} /></div>
                <p className="fontui font-semibold ink mt-1.5 truncate" style={{ fontSize: 12 }}>{p.model || p.name}</p>
              </div>
            ))}
          </div>
          {/* satırlar */}
          {rowDefs.map((r) => {
            const vals = sel.map(r.get);
            const valid = vals.filter((x) => x != null);
            const best = r.better && valid.length > 0 ? (r.better === "low" ? Math.min(...valid) : Math.max(...valid)) : null;
            return (
              <div key={r.k} className="grid" style={{ gridTemplateColumns: "92px " + sel.map(() => colW).join(" "), borderTop: "1px solid var(--line2)" }}>
                <div className="px-3 py-3"><span className="mono" style={{ fontSize: 10, color: "#9AA1AC" }}>{r.k}</span></div>
                {sel.map((p, i) => { const win = r.better && r.get(p) === best && new Set(vals).size > 1; return (
                  <div key={p.id} className="px-3 py-3" style={{ borderLeft: "1px solid var(--line)", background: win ? "var(--saveBg)" : "var(--surface)" }}>
                    <span className="mono inline-flex items-center gap-1" style={{ fontSize: 13, color: win ? "var(--saveD)" : "var(--ink)", fontWeight: win ? 700 : 500 }}>{r.fmt(p) || "-"}{win && <Check size={13} />}</span>
                  </div>
                ); })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const PageFavs = () => {
    const list = BASE_LIST.filter((p) => favs.includes(p.id));
    return (
      <div className="anim mt-4 lg:mt-6">
        <h1 className="fontui font-bold ink mb-4" style={{ fontSize: 22 }}>Favoriler</h1>
        {list.length === 0 ? <Empty icon={Heart} title="Henüz favorin yok" desc="Beğendiğin ürünleri kalbe dokunarak buraya ekle." cta="Ürünlere göz at" onCta={home} />
          : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
      </div>
    );
  };

  const renderPage = () => {
    switch (page) {
      case "results": return PageResults();
      case "detail": return PageDetail();
      case "compare": return PageCompare();
      case "favs": return PageFavs();
      default: return PageHome();
    }
  };

  const NavIcon = ({ icon: Icon, label, count, onClick, accent }) => (
    <button onClick={onClick} className="press relative flex flex-col lg:flex-row items-center gap-1 lg:gap-1.5 lg:px-2.5 lg:py-2 rounded-xl" style={{ color: accent ? "var(--ai)" : "var(--ink2)" }}>
      <Icon size={20} /><span className="fontui hidden lg:inline" style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
      {count > 0 && <span className="mono absolute" style={{ top: -4, right: -4, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 16, background: "var(--up)", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
    </button>
  );

  return (
    <div className="fontui appbg min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-30 surface border-b bd">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 h-16 flex items-center gap-4">
          <button onClick={home} className="press flex items-center gap-2 shrink-0"><Logo size={34} /><Wordmark size={20} /></button>
          <div className="hidden md:flex flex-1 items-center gap-2 surface2 rounded-xl px-3 max-w-xl mx-auto" style={{ height: 42 }}>
            <Search size={18} style={{ color: "#A4ABB5" }} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Ürün, marka veya model ara…" className="fontui flex-1 bg-transparent outline-none ink" style={{ fontSize: 14 }} />
          </div>
          <div className="flex items-center gap-1 lg:gap-2 ml-auto md:ml-0">
            <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} className="press flex items-center justify-center rounded-xl ink2" style={{ width: 38, height: 38 }}>
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <NavIcon icon={Scale} label="Karşılaştır" count={compare.length} onClick={() => go("compare")} />
            <NavIcon icon={Heart} label="Favoriler" count={favs.length} onClick={() => go("favs")} />
          </div>
        </div>
      </header>

      {/* İÇERİK */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 lg:px-8 pb-24 lg:pb-16">{renderPage()}</main>

      {/* ALT NAV (mobil) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 surface border-t bd flex items-stretch">
        {[{ p: "home", i: Home, l: "Ana Sayfa", fn: home }, { p: "compare", i: Scale, l: "Karşılaştır", fn: () => go("compare"), c: compare.length }, { p: "favs", i: Heart, l: "Favoriler", fn: () => go("favs"), c: favs.length }].map((t) => (
          <button key={t.p} onClick={t.fn} className="press relative flex-1 flex flex-col items-center gap-1 py-2" style={{ color: page === t.p ? "var(--ink)" : "#A8AEB8" }}>
            <t.i size={21} strokeWidth={page === t.p ? 2.3 : 1.7} />{t.c > 0 && <span className="mono absolute" style={{ top: 4, right: "28%", minWidth: 15, height: 15, borderRadius: 15, background: "var(--up)", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.c}</span>}<span className="fontui" style={{ fontSize: 10, fontWeight: page === t.p ? 700 : 500 }}>{t.l}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}