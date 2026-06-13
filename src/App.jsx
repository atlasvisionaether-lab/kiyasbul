import React, { useState } from "react";
import {
  Search, SlidersHorizontal, Heart, Bell, Home, Scale, Sparkles,
  ChevronLeft, ChevronDown, ChevronRight, Check, X, Plus, LayoutGrid,
  ArrowUpDown, Star, Smartphone, Laptop, Headphones, Tablet, Monitor, Car,
  TrendingDown, TrendingUp, Truck, Clock, AlertTriangle, BellRing,
  Mail, MessageSquare, Package, Cpu, MemoryStick, HardDrive, Maximize,
  Zap, ArrowRight, Trophy, Camera, BatteryFull,
} from "lucide-react";

/* ============================ ÖRNEK VERİ ============================ */
/*  Jenerik placeholder — gerçek marka/teknik veri uydurulmadı.        */

const CATEGORIES = [
  { id: "telefon", label: "Telefon", icon: Smartphone },
  { id: "laptop", label: "Laptop", icon: Laptop },
  { id: "kulaklik", label: "Kulaklık", icon: Headphones },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "monitor", label: "Monitör", icon: Monitor },
  { id: "otomobil", label: "Otomobil", icon: Car },
];
const CAT_ICON = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.icon]));
const tl = (n) => n.toLocaleString("tr-TR") + " ₺";

const PRODUCTS = [
  {
    id: "p1", category: "telefon", brand: "Marka A", model: "A1 Pro", mono: "A1",
    name: "Marka A · A1 Pro", year: 2025, month: 9, price: 24999, rating: 4.5,
    specs: { "Yonga seti": "8 çekirdek · 3.2 GHz", "RAM": "12 GB", "Depolama": "256 GB", "Ekran": "6.7\" AMOLED", "Yenileme": "120 Hz", "Kamera": "50 MP üçlü", "Batarya": "5000 mAh", "Ağırlık": "198 g", "Bağlantı": "5G · Wi-Fi 6E" },
    history: [27999, 26999, 26499, 25999, 25499, 24999],
    sellers: [{ name: "Mağaza A", price: 24999, stock: true, ship: "Ücretsiz" }, { name: "Mağaza B", price: 25490, stock: true, ship: "39 ₺" }, { name: "Mağaza C", price: 25999, stock: false, ship: "—" }],
  },
  {
    id: "p2", category: "telefon", brand: "Marka B", model: "B7", mono: "B7",
    name: "Marka B · B7", year: 2025, month: 6, price: 19499, rating: 4.2,
    specs: { "Yonga seti": "8 çekirdek · 2.8 GHz", "RAM": "8 GB", "Depolama": "256 GB", "Ekran": "6.6\" AMOLED", "Yenileme": "120 Hz", "Kamera": "64 MP ikili", "Batarya": "5500 mAh", "Ağırlık": "205 g", "Bağlantı": "5G · Wi-Fi 6" },
    history: [21999, 21499, 21199, 20499, 19999, 19499],
    sellers: [{ name: "Mağaza B", price: 19499, stock: true, ship: "Ücretsiz" }, { name: "Mağaza A", price: 19990, stock: true, ship: "Ücretsiz" }, { name: "Mağaza D", price: 20250, stock: true, ship: "49 ₺" }],
  },
  {
    id: "p3", category: "telefon", brand: "Marka C", model: "C5 Lite", mono: "C5",
    name: "Marka C · C5 Lite", year: 2024, month: 11, price: 12999, rating: 3.9,
    specs: { "Yonga seti": "8 çekirdek · 2.4 GHz", "RAM": "8 GB", "Depolama": "128 GB", "Ekran": "6.5\" LCD", "Yenileme": "90 Hz", "Kamera": "48 MP ikili", "Batarya": "5000 mAh", "Ağırlık": "190 g", "Bağlantı": "4G · Wi-Fi 5" },
    history: [14499, 14199, 13999, 13499, 13199, 12999],
    sellers: [{ name: "Mağaza C", price: 12999, stock: true, ship: "Ücretsiz" }, { name: "Mağaza A", price: 13290, stock: true, ship: "39 ₺" }],
  },
  {
    id: "l1", category: "laptop", brand: "Marka D", model: "Pro 14", mono: "P14",
    name: "Marka D · Pro 14", year: 2025, month: 3, price: 42999, rating: 4.6,
    specs: { "İşlemci": "8 çekirdek", "RAM": "16 GB", "Depolama": "512 GB SSD", "Ekran": "14\" 2.5K", "Yenileme": "120 Hz", "Batarya": "70 Wh", "Ağırlık": "1.45 kg", "Bağlantı": "Wi-Fi 6E · USB-C" },
    history: [45999, 45499, 44499, 43999, 43499, 42999],
    sellers: [{ name: "Mağaza A", price: 42999, stock: true, ship: "Ücretsiz" }, { name: "Mağaza D", price: 43750, stock: true, ship: "Ücretsiz" }],
  },
  {
    id: "h1", category: "kulaklik", brand: "Marka F", model: "Buds Pro", mono: "BP",
    name: "Marka F · Buds Pro", year: 2025, month: 5, price: 4299, rating: 4.3,
    specs: { "Tip": "Kablosuz kulak içi", "Sürücü": "11 mm", "ANC": "Aktif", "Batarya": "6 sa + 24 sa", "Bağlantı": "Bluetooth 5.3", "Ağırlık": "5.2 g" },
    history: [4999, 4899, 4799, 4499, 4399, 4299],
    sellers: [{ name: "Mağaza B", price: 4299, stock: true, ship: "Ücretsiz" }, { name: "Mağaza A", price: 4490, stock: true, ship: "39 ₺" }],
  },
  {
    id: "m1", category: "monitor", brand: "Marka I", model: "View 27", mono: "V27",
    name: "Marka I · View 27", year: 2024, month: 12, price: 7499, rating: 4.1,
    specs: { "Ekran": "27\" IPS", "Çözünürlük": "2560×1440", "Yenileme": "165 Hz", "Tepki": "1 ms", "Bağlantı": "HDMI · DP · USB-C", "Ağırlık": "5.6 kg" },
    history: [8299, 8199, 7999, 7699, 7599, 7499],
    sellers: [{ name: "Mağaza C", price: 7499, stock: true, ship: "Ücretsiz" }, { name: "Mağaza D", price: 7790, stock: true, ship: "59 ₺" }],
  },
];

const num = (s) => { const m = String(s).replace(",", ".").match(/[\d.]+/); return m ? parseFloat(m[0]) : null; };
const cheapestOf = (p) => Math.min(...p.sellers.map((s) => s.price));
const dropPct = (p) => Math.round(((p.history[0] - p.history[p.history.length - 1]) / p.history[0]) * 100);
const SPEC_ICON = { "Yonga seti": Cpu, "İşlemci": Cpu, "RAM": MemoryStick, "Depolama": HardDrive, "Ekran": Maximize, "Yenileme": Zap, "Kamera": Camera, "Batarya": BatteryFull };

/* ============================ BİLEŞENLER ============================ */

const Thumb = ({ p, size = 64, radius = 14 }) => {
  const Icon = CAT_ICON[p.category];
  return (
    <div className="relative flex items-center justify-center overflow-hidden shrink-0"
      style={{ width: size, height: size, borderRadius: radius, background: "linear-gradient(145deg,#FBFCFE 0%,#EEF1F6 55%,#E6EAF1 100%)", border: "1px solid rgba(16,21,27,.06)" }}>
      <Icon size={size * 0.42} strokeWidth={1.4} style={{ color: "rgba(16,21,27,.22)" }} />
      <span className="mono absolute" style={{ right: 5, bottom: 4, fontSize: size > 50 ? 9 : 8, color: "rgba(16,21,27,.34)", letterSpacing: ".02em" }}>{p.mono}</span>
    </div>
  );
};

const Sparkline = ({ data, w = 70, h = 26, save = true }) => {
  const min = Math.min(...data), max = Math.max(...data);
  const X = (i) => (i / (data.length - 1)) * w;
  const Y = (v) => h - 3 - ((v - min) / (max - min || 1)) * (h - 6);
  const line = data.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  const col = save ? "var(--save)" : "var(--up)";
  const gid = "g" + Math.round(data[0] + data.length);
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col} stopOpacity="0.16" /><stop offset="1" stopColor={col} stopOpacity="0" /></linearGradient></defs>
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline points={line} fill="none" stroke={col} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={X(data.length - 1)} cy={Y(data[data.length - 1])} r="2.4" fill={col} />
    </svg>
  );
};

const Stars = ({ r, size = 11 }) => (
  <span className="inline-flex items-center gap-0.5">
    <Star size={size} className="save" style={{ color: "#E8A93B", fill: "#E8A93B" }} />
    <span className="mono fs11" style={{ color: "var(--ink2)" }}>{r.toFixed(1)}</span>
  </span>
);

/* ============================ UYGULAMA ============================ */

export default function App() {
  const [stack, setStack] = useState(["splash"]);
  const screen = stack[stack.length - 1];
  const nav = (s) => setStack((p) => [...p, s]);
  const back = () => setStack((p) => (p.length > 1 ? p.slice(0, -1) : p));
  const reset = (s) => setStack([s]);

  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cat, setCat] = useState(null);
  const [compare, setCompare] = useState([]);
  const [favs, setFavs] = useState(["p2"]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("Önerilen");
  const [active, setActive] = useState("p1");
  const [onb, setOnb] = useState(0);
  const [aiStep, setAiStep] = useState(0);
  const [aiUse, setAiUse] = useState(null);
  const [aiBudget, setAiBudget] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [alarmPrice, setAlarmPrice] = useState("22000");
  const [alarmDone, setAlarmDone] = useState(false);
  const [channels, setChannels] = useState({ push: true, mail: false, sms: false });
  const [menuOpen, setMenuOpen] = useState(false);
  const [emptyDemo, setEmptyDemo] = useState(false);
  const [notifEmpty, setNotifEmpty] = useState(false);
  const [filtBrands, setFiltBrands] = useState([]);

  const product = PRODUCTS.find((p) => p.id === active);
  const toggleCompare = (id) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 2 ? [...c, id] : c));
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const openProduct = (id) => { setActive(id); nav("detail"); };
  const runSearch = () => { setSearchTerm(query); setEmptyDemo(false); nav("results"); };

  const results = (() => {
    let list = PRODUCTS;
    if (cat) list = list.filter((p) => p.category === cat);
    if (searchTerm) { const q = searchTerm.toLocaleLowerCase("tr"); list = list.filter((p) => p.name.toLocaleLowerCase("tr").includes(q)); }
    if (sort === "En düşük fiyat") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "En yüksek fiyat") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "En yeni") list = [...list].sort((a, b) => b.year - a.year || b.month - a.month);
    if (sort === "Puan") list = [...list].sort((a, b) => b.rating - a.rating);
    return emptyDemo ? [] : list;
  })();

  const startAi = (use, budget) => { setAiThinking(true); setTimeout(() => { setAiThinking(false); setAiStep(2); }, 1100); };

  /* ---------------- KARTLAR ---------------- */
  const ProductCard = ({ p, showCompare = true }) => {
    const cheap = cheapestOf(p);
    const fav = favs.includes(p.id);
    const cmp = compare.includes(p.id);
    const d = dropPct(p);
    return (
      <button onClick={() => openProduct(p.id)} className="press w-full text-left bg-white rounded-2xl p-3 flex gap-3 border bd shadowcard">
        <Thumb p={p} size={66} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="fontui font-semibold ink truncate" style={{ fontSize: 14 }}>{p.name}</p>
            <span onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }} className="press shrink-0 -mt-0.5 -mr-0.5 p-1" style={{ color: fav ? "var(--up)" : "#B6BCC6" }}>
              <Heart size={17} fill={fav ? "currentColor" : "none"} />
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="mono fs10" style={{ color: "var(--ink2)" }}>{p.year}/{String(p.month).padStart(2, "0")}</span>
            <span style={{ width: 3, height: 3, borderRadius: 9, background: "#CBD0D8" }} />
            <Stars r={p.rating} />
          </div>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="mono fs9" style={{ color: "#9AA1AC", letterSpacing: ".04em" }}>EN DÜŞÜK · {p.sellers.length} SATICI</p>
              <div className="flex items-center gap-1.5">
                <p className="mono ink" style={{ fontSize: 17, fontWeight: 600 }}>{tl(cheap)}</p>
                {d > 0 && <span className="mono fs10 save bgsaveb" style={{ padding: "1px 5px", borderRadius: 6, fontWeight: 600 }}>↓%{d}</span>}
              </div>
            </div>
            {showCompare && (
              <span onClick={(e) => { e.stopPropagation(); toggleCompare(p.id); }}
                className="press inline-flex items-center gap-1 mono fs11" style={{ padding: "5px 9px", borderRadius: 9, fontWeight: 600, color: cmp ? "#fff" : "var(--ink2)", background: cmp ? "var(--ink)" : "#fff", border: cmp ? "1px solid var(--ink)" : "1px solid var(--line)" }}>
                <Scale size={12} /> {cmp ? "Seçildi" : "Kıyasla"}
              </span>
            )}
          </div>
        </div>
      </button>
    );
  };

  const DealCard = ({ p }) => {
    const cheap = cheapestOf(p), d = dropPct(p), old = p.history[0];
    return (
      <button onClick={() => openProduct(p.id)} className="press shrink-0 text-left bg-white rounded-2xl border bd shadowcard p-3" style={{ width: 158 }}>
        <div className="flex items-center justify-between">
          <Thumb p={p} size={46} radius={12} />
          <span className="mono fs11 save bgsaveb inline-flex items-center gap-0.5" style={{ padding: "3px 7px", borderRadius: 8, fontWeight: 700 }}><TrendingDown size={12} />%{d}</span>
        </div>
        <p className="fontui font-semibold ink truncate mt-2" style={{ fontSize: 13 }}>{p.name}</p>
        <p className="mono fs11 mt-1.5" style={{ color: "#A4ABB5", textDecoration: "line-through" }}>{tl(old)}</p>
        <p className="mono ink" style={{ fontSize: 16, fontWeight: 600, marginTop: 1 }}>{tl(cheap)}</p>
      </button>
    );
  };

  const VsCard = ({ a, b }) => (
    <button onClick={() => { setCompare([a.id, b.id]); nav("compare"); }} className="press shrink-0 bg-white rounded-2xl border bd shadowcard p-3 flex items-center gap-2" style={{ width: 196 }}>
      <Thumb p={a} size={40} radius={11} />
      <div className="flex flex-col items-center" style={{ flexShrink: 0 }}>
        <span className="mono fs9" style={{ color: "#fff", background: "var(--ink)", width: 22, height: 22, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>VS</span>
      </div>
      <Thumb p={b} size={40} radius={11} />
      <div className="flex-1 min-w-0 pl-1">
        <p className="fontui fs11 font-semibold ink truncate">{a.model}</p>
        <p className="fontui fs11 ink2 truncate">{b.model}</p>
      </div>
    </button>
  );

  /* ---------------- ÜST BAR / NAV ---------------- */
  const TopBar = ({ title, action, sub }) => (
    <div className="flex items-center gap-2 px-2 bg-white border-b bd shrink-0" style={{ height: 52 }}>
      <button onClick={back} className="press ink p-2 rounded-xl"><ChevronLeft size={22} /></button>
      <div className="flex-1 min-w-0">
        <p className="fontui font-semibold ink truncate" style={{ fontSize: 15 }}>{title}</p>
        {sub && <p className="mono fs10" style={{ color: "#A4ABB5" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );

  const showNav = ["home", "results", "compareSelect", "compare", "ai", "favs", "notif"].includes(screen);
  const NavTab = ({ icon: Icon, label, on, onClick }) => (
    <button onClick={onClick} className="press flex-1 flex flex-col items-center gap-1 py-2" style={{ color: on ? "var(--ink)" : "#A8AEB8" }}>
      <Icon size={21} strokeWidth={on ? 2.3 : 1.7} />
      <span className="fontui" style={{ fontSize: 10, fontWeight: on ? 700 : 500 }}>{label}</span>
    </button>
  );
  const BottomNav = () => (
    <div className="flex items-stretch bg-white border-t bd shrink-0" style={{ paddingBottom: 2 }}>
      <NavTab icon={Home} label="Ana Sayfa" on={screen === "home"} onClick={() => reset("home")} />
      <NavTab icon={Scale} label="Kıyasla" on={["compareSelect", "compare"].includes(screen)} onClick={() => nav("compareSelect")} />
      <button onClick={() => { setAiStep(0); nav("ai"); }} className="press relative -mt-4" style={{ width: 56 }}>
        <span className="bgai flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 18, margin: "0 auto", boxShadow: "0 6px 16px rgba(90,91,224,.4)", border: "3px solid #fff" }}>
          <Sparkles size={22} color="#fff" />
        </span>
      </button>
      <NavTab icon={Heart} label="Favoriler" on={screen === "favs"} onClick={() => nav("favs")} />
      <NavTab icon={Bell} label="Bildirim" on={screen === "notif"} onClick={() => nav("notif")} />
    </div>
  );

  const Empty = ({ icon: Icon, title, desc, cta, onCta }) => (
    <div className="flex flex-col items-center justify-center text-center px-8 gap-2.5" style={{ paddingTop: 64, paddingBottom: 40 }}>
      <div className="flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 16, background: "#fff", border: "1px solid var(--line)", color: "#AEB4BE" }}><Icon size={22} /></div>
      <p className="fontui font-semibold ink" style={{ fontSize: 15 }}>{title}</p>
      <p className="fontui" style={{ fontSize: 13, color: "var(--ink2)", maxWidth: 230 }}>{desc}</p>
      {cta && <button onClick={onCta} className="press mono fs11 mt-1" style={{ padding: "8px 14px", borderRadius: 10, background: "var(--ink)", color: "#fff", fontWeight: 600 }}>{cta}</button>}
    </div>
  );

  /* ============================ EKRANLAR ============================ */
  const Screen = () => {
    switch (screen) {

      /* SPLASH */
      case "splash":
        return (
          <button onClick={() => reset("onboarding")} className="flex-1 flex flex-col items-center justify-center gap-5 relative" style={{ background: "radial-gradient(120% 80% at 50% 18%, #FFFFFF 0%, #F1F3F7 100%)" }}>
            <Logo size={66} />
            <div className="text-center">
              <Wordmark size={32} />
              <p className="mono fs11" style={{ color: "#9AA1AC", marginTop: 10 }}>karşılaştır, en uygununu bul</p>
            </div>
            <p className="mono fs10 absolute" style={{ bottom: 30, color: "#C2C7D0" }}>dokun → başla</p>
          </button>
        );

      /* ONBOARDING */
      case "onboarding": {
        const slides = [
          { t: "Yan yana, net karşılaştır", d: "Telefon, laptop, kulaklık… önemli özellikleri kıyasla, kazananı gör.", art: <OnbCompare /> },
          { t: "Fiyat düşünce ilk sen bil", d: "Hedef fiyatını söyle, ürün ucuzlayınca anında haber verelim.", art: <OnbPrice /> },
          { t: "Kararsızsan AI'a sor", d: "Ne için kullanacağını ve bütçeni söyle, sana 3 ürün önerelim.", art: <OnbAI /> },
        ];
        const s = slides[onb];
        return (
          <div className="flex-1 flex flex-col appbg">
            <div className="flex justify-end p-3"><button onClick={() => reset("home")} className="press mono fs11" style={{ color: "#9AA1AC" }}>Atla</button></div>
            <div className="flex-1 flex flex-col items-center justify-center px-7 gap-7">
              <div key={onb} className="anim w-full flex items-center justify-center" style={{ height: 200 }}>{s.art}</div>
              <div className="text-center"><p className="fontui ink" style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-.02em" }}>{s.t}</p><p className="fontui mt-2" style={{ fontSize: 14, color: "var(--ink2)" }}>{s.d}</p></div>
            </div>
            <div className="flex justify-center gap-1.5 pb-5">{slides.map((_, i) => <span key={i} style={{ height: 6, width: i === onb ? 22 : 6, borderRadius: 6, background: i === onb ? "var(--ink)" : "#D4D8DF", transition: "all .25s" }} />)}</div>
            <div className="p-4 pt-0"><button onClick={() => (onb < 2 ? setOnb(onb + 1) : reset("home"))} className="press w-full bgink text-white fontui font-semibold py-3.5" style={{ fontSize: 15, borderRadius: 16 }}>{onb < 2 ? "Devam" : "Başla"}</button></div>
          </div>
        );
      }

      /* HOME */
      case "home": {
        const deals = [...PRODUCTS].sort((a, b) => dropPct(b) - dropPct(a)).slice(0, 4);
        return (
          <div className="flex-1 overflow-y-auto appbg">
            <div className="px-4 pt-4 pb-3 flex items-center justify-between">
              <div><p className="mono fs11" style={{ color: "#9AA1AC" }}>İyi günler 👋</p><p className="fontui ink" style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-.02em" }}>Ne almak istiyorsun?</p></div>
              <div className="flex flex-col items-end" style={{ gap: 4 }}><Logo size={34} /><Wordmark size={12} /></div>
            </div>
            <div className="px-4">
              <button onClick={() => nav("results")} className="press w-full flex items-center gap-2.5 bg-white border bd shadowcard" style={{ padding: "13px 14px", borderRadius: 16 }}>
                <Search size={19} style={{ color: "#A4ABB5" }} /><span className="fontui" style={{ fontSize: 14, color: "#9AA1AC" }}>Ürün, marka veya model ara</span>
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto px-4 pt-3" style={{ scrollbarWidth: "none" }}>
              {CATEGORIES.map((c) => { const Icon = c.icon; return (
                <button key={c.id} onClick={() => { setCat(c.id); setSearchTerm(""); nav("results"); }} className="press shrink-0 flex flex-col items-center gap-1.5 bg-white border bd" style={{ padding: "11px 14px", borderRadius: 16 }}>
                  <Icon size={20} className="ink2" /><span className="fontui fs11 ink2" style={{ fontWeight: 500 }}>{c.label}</span>
                </button> ); })}
            </div>

            <button onClick={() => { setAiStep(0); nav("ai"); }} className="press mx-4 mt-4 flex items-center gap-3 p-3.5 text-left bgaib" style={{ width: "calc(100% - 32px)", borderRadius: 18, border: "1px solid rgba(90,91,224,.16)" }}>
              <span className="bgai flex items-center justify-center shrink-0" style={{ width: 40, height: 40, borderRadius: 13, boxShadow: "0 4px 12px rgba(90,91,224,.35)" }}><Sparkles size={19} color="#fff" /></span>
              <div className="flex-1"><p className="fontui font-bold ink" style={{ fontSize: 14 }}>Hangisini alacağına karar veremedin mi?</p><p className="mono fs11 ai" style={{ fontWeight: 600 }}>AI sana amacına göre önersin →</p></div>
            </button>

            <div className="flex items-center justify-between px-4 pt-5 pb-2">
              <p className="fontui font-bold ink inline-flex items-center gap-1.5" style={{ fontSize: 15 }}><TrendingDown size={16} className="save" /> Fiyatı düşenler</p>
              <span className="mono fs10" style={{ color: "#A4ABB5" }}>saatlik güncel</span>
            </div>
            <div className="flex gap-2.5 overflow-x-auto px-4 pb-1" style={{ scrollbarWidth: "none" }}>{deals.map((p) => <DealCard key={p.id} p={p} />)}</div>

            <div className="px-4 pt-5 pb-2"><p className="fontui font-bold ink" style={{ fontSize: 15 }}>Popüler kıyaslamalar</p></div>
            <div className="flex gap-2.5 overflow-x-auto px-4 pb-1" style={{ scrollbarWidth: "none" }}>
              <VsCard a={PRODUCTS[0]} b={PRODUCTS[1]} /><VsCard a={PRODUCTS[1]} b={PRODUCTS[2]} />
            </div>

            <div className="px-4 pt-5 pb-2"><p className="fontui font-bold ink" style={{ fontSize: 15 }}>Popüler ürünler</p></div>
            <div className="px-4 flex flex-col gap-2.5" style={{ paddingBottom: 24 }}>{PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}</div>
          </div>
        );
      }

      /* ARAMA SONUÇLARI */
      case "results":
        return (
          <div className="flex-1 flex flex-col appbg">
            <div className="bg-white border-b bd px-2 pt-2 pb-2.5 shrink-0">
              <div className="flex items-center gap-1">
                <button onClick={back} className="press ink p-2"><ChevronLeft size={22} /></button>
                <div className="flex-1 flex items-center gap-2 px-3" style={{ background: "#F2F4F7", borderRadius: 12, height: 42 }}>
                  <Search size={17} style={{ color: "#A4ABB5" }} />
                  <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Ara…" className="fontui flex-1 bg-transparent outline-none ink" style={{ fontSize: 14 }} />
                  {query && <button onClick={() => { setQuery(""); setSearchTerm(""); }} style={{ color: "#A4ABB5" }}><X size={16} /></button>}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2.5 px-1">
                <button onClick={() => setFilterOpen(true)} className="press inline-flex items-center gap-1.5 mono fs11 shrink-0" style={{ padding: "7px 11px", borderRadius: 10, border: "1px solid var(--ink)", color: "var(--ink)", fontWeight: 600 }}><SlidersHorizontal size={13} /> Filtrele{filtBrands.length > 0 && ` · ${filtBrands.length}`}</button>
                <div className="relative shrink-0">
                  <button onClick={() => setSortOpen((v) => !v)} className="press inline-flex items-center gap-1 mono fs11" style={{ padding: "7px 11px", borderRadius: 10, border: "1px solid var(--line)", color: "var(--ink2)", fontWeight: 600 }}><ArrowUpDown size={13} /> {sort} <ChevronDown size={13} /></button>
                  {sortOpen && (
                    <div className="absolute z-20 bg-white shadowcard" style={{ top: 38, left: 0, borderRadius: 12, border: "1px solid var(--line)", overflow: "hidden", width: 156 }}>
                      {["Önerilen", "En düşük fiyat", "En yüksek fiyat", "En yeni", "Puan"].map((o) => <button key={o} onClick={() => { setSort(o); setSortOpen(false); }} className="press w-full text-left mono fs11" style={{ padding: "9px 12px", color: sort === o ? "var(--ink)" : "var(--ink2)", background: sort === o ? "#F4F5F7" : "#fff", fontWeight: sort === o ? 700 : 500 }}>{o}</button>)}
                    </div>
                  )}
                </div>
                <div className="flex-1 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                  {CATEGORIES.map((c) => <button key={c.id} onClick={() => setCat(cat === c.id ? null : c.id)} className="press shrink-0 mono fs11" style={{ padding: "7px 11px", borderRadius: 10, fontWeight: 600, color: cat === c.id ? "#fff" : "var(--ink2)", background: cat === c.id ? "var(--ink)" : "#fff", border: cat === c.id ? "1px solid var(--ink)" : "1px solid var(--line)" }}>{c.label}</button>)}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 shrink-0">
              <p className="mono fs11" style={{ color: "var(--ink2)" }}><b className="ink">{results.length}</b> sonuç</p>
              <button onClick={() => setEmptyDemo((v) => !v)} className="mono fs10" style={{ color: "#C2C7D0", textDecoration: "underline" }}>boş durum</button>
            </div>
            <div className="flex-1 overflow-y-auto px-4" style={{ paddingBottom: 90 }}>
              {results.length === 0 ? <Empty icon={Search} title="Aradığın ürün bulunamadı" desc="Farklı bir kelime dene veya filtreleri temizle." cta="Filtreleri temizle" onCta={() => { setCat(null); setSearchTerm(""); setEmptyDemo(false); setFiltBrands([]); }} />
                : <div className="flex flex-col gap-2.5">{results.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
            </div>
            {compare.length > 0 && (
              <div className="absolute left-0 right-0 px-4" style={{ bottom: 70 }}>
                <button onClick={() => nav(compare.length === 2 ? "compare" : "compareSelect")} className="press w-full bgink text-white flex items-center justify-center gap-2 py-3 shadowup anim" style={{ borderRadius: 14, fontSize: 14 }}>
                  <Scale size={16} /><span className="fontui font-semibold">Kıyasla ({compare.length}/2)</span>
                </button>
              </div>
            )}
          </div>
        );

      /* ÜRÜN DETAY */
      case "detail": {
        const p = product, cheap = cheapestOf(p), d = dropPct(p);
        const sorted = [...p.sellers].sort((a, b) => a.price - b.price);
        const fav = favs.includes(p.id);
        return (
          <div className="flex-1 flex flex-col appbg">
            <TopBar title={p.name} action={<button onClick={() => toggleFav(p.id)} className="press p-2" style={{ color: fav ? "var(--up)" : "#B6BCC6" }}><Heart size={20} fill={fav ? "currentColor" : "none"} /></button>} />
            <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 96 }}>
              <div className="bg-white px-4 pt-3 pb-4">
                <div className="flex items-center justify-center" style={{ height: 168, borderRadius: 20, background: "linear-gradient(150deg,#FBFCFE,#EBEEF4)", border: "1px solid var(--line)" }}>
                  <Thumb p={p} size={110} radius={26} />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="mono fs10 ink2" style={{ padding: "3px 7px", borderRadius: 7, border: "1px solid var(--line)" }}>{p.year}/{String(p.month).padStart(2, "0")}</span>
                  <span className="mono fs10 ink2" style={{ padding: "3px 7px", borderRadius: 7, border: "1px solid var(--line)" }}>{CATEGORIES.find(c => c.id === p.category).label}</span>
                  <Stars r={p.rating} size={13} />
                </div>
                <p className="fontui ink mt-1.5" style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-.02em" }}>{p.name}</p>
              </div>

              {/* FİYAT + SATICILAR (ÜSTTE) */}
              <div className="bg-white border-t bd px-4 py-3.5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="mono fs10" style={{ color: "#9AA1AC", letterSpacing: ".04em" }}>EN DÜŞÜK FİYAT</p>
                    <div className="flex items-center gap-2">
                      <p className="mono ink" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-.01em" }}>{tl(cheap)}</p>
                      {d > 0 && <span className="mono fs11 save bgsaveb inline-flex items-center gap-0.5" style={{ padding: "2px 7px", borderRadius: 8, fontWeight: 700 }}><TrendingDown size={12} />%{d}</span>}
                    </div>
                  </div>
                  <div className="text-right"><p className="mono fs9" style={{ color: "#A4ABB5" }}>30 GÜN</p><Sparkline data={p.history} w={74} h={28} /></div>
                </div>
                <div className="mt-3 border bd" style={{ borderRadius: 14, overflow: "hidden" }}>
                  {sorted.map((s, i) => (
                    <div key={s.name} className="flex items-center justify-between px-3.5 py-3" style={{ borderTop: i ? "1px solid var(--line2)" : "none", background: i === 0 ? "var(--saveBg)" : "#fff" }}>
                      <div className="min-w-0">
                        <p className="fontui font-semibold ink inline-flex items-center gap-1.5" style={{ fontSize: 14 }}>{s.name}{i === 0 && <span className="mono fs9 bgsave" style={{ color: "#fff", padding: "2px 6px", borderRadius: 6, fontWeight: 700 }}>EN UCUZ</span>}</p>
                        <p className="mono fs10 mt-0.5 inline-flex items-center gap-2" style={{ color: "var(--ink2)" }}><span className="inline-flex items-center gap-1"><Truck size={11} />{s.ship}</span><span style={{ color: s.stock ? "var(--save)" : "var(--up)" }}>{s.stock ? "Stokta" : "Tükendi"}</span></p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <p className="mono ink" style={{ fontSize: 15, fontWeight: 600 }}>{tl(s.price)}</p>
                        <ChevronRight size={16} style={{ color: "#C2C7D0" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setAlarmDone(false); nav("alarm"); }} className="press mt-3 w-full inline-flex items-center justify-center gap-2 py-3 fontui font-semibold ink" style={{ borderRadius: 13, border: "1.5px solid var(--ink)", fontSize: 14 }}><BellRing size={16} /> Fiyat alarmı kur</button>
                <p className="mono fs10 text-center mt-2.5 inline-flex items-center justify-center gap-1 w-full" style={{ color: "#B6BCC6" }}><Clock size={11} /> Son güncelleme: 12 dk önce</p>
              </div>

              {/* TEKNİK ÖZELLİKLER (AŞAĞIDA) */}
              <div className="bg-white border-t bd px-4 py-3.5 mt-2.5">
                <p className="fontui font-bold ink mb-2.5" style={{ fontSize: 14 }}>Teknik özellikler</p>
                <div>{Object.entries(p.specs).map(([k, v], i) => { const Ico = SPEC_ICON[k]; return (
                  <div key={k} className="flex items-center justify-between py-2.5" style={{ borderTop: i ? "1px solid var(--line2)" : "none" }}>
                    <span className="fontui inline-flex items-center gap-2" style={{ fontSize: 13, color: "var(--ink2)" }}>{Ico && <Ico size={14} style={{ color: "#AEB4BE" }} />}{k}</span>
                    <span className="mono fs13 ink" style={{ fontWeight: 500 }}>{v}</span>
                  </div> ); })}</div>
              </div>

              <div className="px-4 py-3.5 mt-2.5">
                <p className="fontui font-bold ink mb-2.5" style={{ fontSize: 14 }}>Benzer ürünler</p>
                <div className="flex flex-col gap-2.5">{PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).map((x) => <ProductCard key={x.id} p={x} showCompare={false} />)}</div>
              </div>
            </div>

            <div className="border-t bd bg-white p-3 flex gap-2.5 shrink-0 shadowup">
              <button onClick={() => { if (!compare.includes(p.id)) toggleCompare(p.id); nav("compareSelect"); }} className="press flex-1 inline-flex items-center justify-center gap-2 py-3 fontui font-semibold ink" style={{ borderRadius: 13, border: "1px solid var(--line)", fontSize: 14 }}><Scale size={16} /> Kıyasla</button>
              <button onClick={() => {}} className="press flex-1 bgink text-white py-3 fontui font-semibold" style={{ borderRadius: 13, fontSize: 14 }}>En ucuza git · {tl(cheap)}</button>
            </div>
          </div>
        );
      }

      /* KARŞILAŞTIRMA SEÇİMİ */
      case "compareSelect": {
        const sel = compare.map((id) => PRODUCTS.find((p) => p.id === id));
        return (
          <div className="flex-1 flex flex-col appbg">
            <TopBar title="Karşılaştırma" sub="Mobilde en fazla 2 ürün" action={compare.length > 0 && <button onClick={() => setCompare([])} className="press mono fs11 pr-2" style={{ color: "#A4ABB5" }}>Temizle</button>} />
            <div className="px-4 pt-3 shrink-0">
              <div className="flex gap-2.5">
                {[0, 1].map((i) => { const p = sel[i]; return (
                  <div key={i} className="flex-1 p-2.5 text-center" style={{ borderRadius: 16, border: p ? "1.5px solid var(--ink)" : "1.5px dashed #CBD0D8", background: p ? "#fff" : "#FAFBFC" }}>
                    {p ? (<><Thumb p={p} size={54} radius={13} /><p className="fontui fs11 font-semibold ink mt-1.5 truncate">{p.model}</p><button onClick={() => toggleCompare(p.id)} className="press mono fs10 mt-0.5" style={{ color: "#A4ABB5" }}>çıkar ✕</button></>)
                      : (<div className="flex flex-col items-center justify-center" style={{ color: "#C2C7D0", paddingTop: 16, paddingBottom: 16 }}><Plus size={22} /><span className="mono fs10 mt-1">ürün ekle</span></div>)}
                  </div> ); })}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pt-4" style={{ paddingBottom: 96 }}>
              <p className="mono fs10 mb-2" style={{ color: "#9AA1AC", letterSpacing: ".04em" }}>EKLEMEK İÇİN SEÇ</p>
              <div className="flex flex-col gap-2.5">
                {PRODUCTS.map((p) => { const on = compare.includes(p.id), dis = !on && compare.length >= 2; return (
                  <button key={p.id} onClick={() => toggleCompare(p.id)} disabled={dis} className="press flex items-center gap-3 bg-white p-2.5 text-left shadowcard" style={{ borderRadius: 14, border: on ? "1.5px solid var(--ink)" : "1px solid var(--line)", opacity: dis ? 0.45 : 1 }}>
                    <Thumb p={p} size={46} radius={12} />
                    <div className="flex-1 min-w-0"><p className="fontui font-semibold ink truncate" style={{ fontSize: 14 }}>{p.name}</p><p className="mono fs11" style={{ color: "var(--ink2)" }}>{tl(p.price)}</p></div>
                    <span className="flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: 8, background: on ? "var(--ink)" : "#fff", border: on ? "none" : "1.5px solid #D4D8DF" }}>{on && <Check size={14} color="#fff" />}</span>
                  </button> ); })}
              </div>
            </div>
            <div className="border-t bd bg-white p-3 shrink-0">
              <button disabled={compare.length < 2} onClick={() => nav("compare")} className="press w-full py-3.5 fontui font-semibold" style={{ borderRadius: 14, fontSize: 15, background: compare.length < 2 ? "#EAECEF" : "var(--ink)", color: compare.length < 2 ? "#A4ABB5" : "#fff" }}>{compare.length < 2 ? `Karşılaştır (${compare.length}/2)` : "Karşılaştır →"}</button>
            </div>
          </div>
        );
      }

      /* KARŞILAŞTIRMA — İMZA EKRAN */
      case "compare": {
        const sel = compare.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
        if (sel.length < 2) return (<div className="flex-1 flex flex-col appbg"><TopBar title="Karşılaştırma" /><Empty icon={Scale} title="Karşılaştırmak için 2 ürün seç" desc="Listeden iki ürün işaretle, farkları yan yana gösterelim." cta="Ürün seç" onCta={() => nav("compareSelect")} /></div>);
        const [a, b] = sel;
        const HIGHER = ["RAM", "Depolama", "Batarya", "Yenileme", "Ekran", "Sürücü"];
        const keys = Object.keys(a.specs).filter((k) => k in b.specs).slice(0, 8);
        const rows = [
          { k: "Fiyat", av: tl(a.price), bv: tl(b.price), win: a.price < b.price ? "a" : a.price > b.price ? "b" : null },
          { k: "Çıkış", av: `${a.year}/${String(a.month).padStart(2, "0")}`, bv: `${b.year}/${String(b.month).padStart(2, "0")}`, win: (a.year * 12 + a.month) > (b.year * 12 + b.month) ? "a" : "b" },
          ...keys.map((k) => { let win = null; if (HIGHER.includes(k)) { const na = num(a.specs[k]), nb = num(b.specs[k]); if (na != null && nb != null && na !== nb) win = na > nb ? "a" : "b"; } return { k, av: a.specs[k], bv: b.specs[k], win, diff: a.specs[k] !== b.specs[k] }; }),
        ];
        const aWins = rows.filter((r) => r.win === "a").length, bWins = rows.filter((r) => r.win === "b").length;
        const verdicts = [];
        if (a.price < b.price) verdicts.push(`${a.model} daha uygun`); else if (b.price < a.price) verdicts.push(`${b.model} daha uygun`);
        const battA = num(a.specs.Batarya), battB = num(b.specs.Batarya);
        if (battA && battB && battA !== battB) verdicts.push(`${battA > battB ? a.model : b.model} daha uzun batarya`);
        const ramA = num(a.specs.RAM), ramB = num(b.specs.RAM);
        if (ramA && ramB && ramA !== ramB) verdicts.push(`${ramA > ramB ? a.model : b.model} daha çok RAM`);

        return (
          <div className="flex-1 flex flex-col appbg">
            <TopBar title="Karşılaştırma" action={<button onClick={() => nav("compareSelect")} className="press mono fs11 pr-2" style={{ color: "#A4ABB5" }}>Düzenle</button>} />
            {/* özet karar çubuğu */}
            <div className="px-3 py-2.5 bg-white border-b bd shrink-0">
              <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {verdicts.map((v, i) => <span key={i} className="mono fs11 shrink-0 inline-flex items-center gap-1 save bgsaveb" style={{ padding: "5px 9px", borderRadius: 9, fontWeight: 600 }}><Check size={12} />{v}</span>)}
              </div>
            </div>
            {/* sticky başlık */}
            <div className="flex border-b bd bg-white shrink-0" style={{ position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ width: 92 }} className="shrink-0" />
              {[a, b].map((p, i) => { const w = i === 0 ? aWins : bWins, lead = i === 0 ? aWins >= bWins : bWins > aWins; return (
                <div key={p.id} className="flex-1 p-2.5 text-center" style={{ borderLeft: "1px solid var(--line)" }}>
                  <div className="flex justify-center"><Thumb p={p} size={44} radius={12} /></div>
                  <p className="fontui fs11 font-semibold ink mt-1.5 truncate">{p.model}</p>
                  <span className="mono fs10 inline-flex items-center gap-1 mt-0.5" style={{ color: lead ? "var(--save)" : "#A4ABB5", fontWeight: 600 }}>{lead && <Trophy size={10} />}{w} kategori</span>
                </div> ); })}
            </div>
            <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 84 }}>
              {rows.map((r) => (
                <div key={r.k} className="flex" style={{ borderBottom: "1px solid var(--line2)" }}>
                  <div style={{ width: 92 }} className="shrink-0 px-3 py-3"><span className="mono fs10" style={{ color: "#9AA1AC" }}>{r.k}</span></div>
                  {["a", "b"].map((side) => { const val = side === "a" ? r.av : r.bv; const win = r.win === side; return (
                    <div key={side} className="flex-1 px-3 py-3" style={{ borderLeft: "1px solid var(--line)", background: win ? "var(--saveBg)" : "#fff" }}>
                      <span className="mono fs13 inline-flex items-center gap-1" style={{ color: win ? "var(--saveD)" : "var(--ink)", fontWeight: win ? 700 : 500 }}>{val}{win && <Check size={13} />}</span>
                    </div> ); })}
                </div>
              ))}
              <div className="px-3 py-3"><p className="mono fs10" style={{ color: "#B6BCC6" }}>Yeşil = o kategoride öne çıkan. Karar senin — fiyat/özellik dengesine göre seç.</p></div>
            </div>
            <div className="border-t bd bg-white p-3 flex gap-2.5 shrink-0 shadowup">
              <button onClick={() => openProduct(a.id)} className="press flex-1 py-2.5 fontui font-semibold ink" style={{ borderRadius: 12, border: "1px solid var(--line)", fontSize: 13 }}>{a.model} →</button>
              <button onClick={() => openProduct(b.id)} className="press flex-1 py-2.5 fontui font-semibold ink" style={{ borderRadius: 12, border: "1px solid var(--line)", fontSize: 13 }}>{b.model} →</button>
            </div>
          </div>
        );
      }

      /* AI ÖNERİ */
      case "ai": {
        const uses = [{ id: "oyun", label: "Oyun", d: "Yüksek performans, soğutma", icon: Zap }, { id: "foto", label: "Fotoğraf", d: "İyi kamera ve ekran", icon: Camera }, { id: "is", label: "İş", d: "Verim, batarya, taşınabilirlik", icon: Laptop }, { id: "gunluk", label: "Günlük kullanım", d: "Dengeli ve uygun fiyat", icon: Smartphone }];
        const budgets = ["10.000 ₺ altı", "10.000 – 20.000 ₺", "20.000 – 35.000 ₺", "35.000 ₺ üstü"];
        const useLabel = uses.find((u) => u.id === aiUse)?.label;

        const Header = ({ step }) => (
          <div className="px-4 pt-4 pb-1 shrink-0">
            <div className="inline-flex items-center gap-2 ai bgaib" style={{ padding: "5px 10px", borderRadius: 20 }}><Sparkles size={14} /><span className="mono fs11" style={{ fontWeight: 700 }}>AI Asistan · {step}/2</span></div>
          </div>
        );

        if (aiThinking) return (
          <div className="flex-1 flex flex-col appbg"><TopBar title="AI Asistan" />
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <span className="bgai flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: 18, boxShadow: "0 8px 24px rgba(90,91,224,.4)" }}><Sparkles size={26} color="#fff" /></span>
              <div className="inline-flex items-center gap-1.5"><span className="dot bgai" style={{ width: 7, height: 7, borderRadius: 7 }} /><span className="dot bgai" style={{ width: 7, height: 7, borderRadius: 7, animationDelay: ".2s" }} /><span className="dot bgai" style={{ width: 7, height: 7, borderRadius: 7, animationDelay: ".4s" }} /></div>
              <p className="fontui fs13" style={{ color: "var(--ink2)" }}>Sana en uygun ürünleri seçiyorum…</p>
            </div>
          </div>
        );

        if (aiStep === 0) return (
          <div className="flex-1 flex flex-col appbg"><Header step={1} />
            <div className="px-4 pt-2 pb-3"><p className="fontui ink" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em" }}>Ne için kullanacaksın?</p></div>
            <div className="flex-1 overflow-y-auto px-4" style={{ paddingBottom: 90 }}><div className="flex flex-col gap-2.5">
              {uses.map((u) => { const Ico = u.icon; const on = aiUse === u.id; return (
                <button key={u.id} onClick={() => { setAiUse(u.id); setAiStep(1); }} className="press flex items-center gap-3 bg-white p-3.5 text-left shadowcard" style={{ borderRadius: 16, border: on ? "1.5px solid var(--ai)" : "1px solid var(--line)" }}>
                  <span className="flex items-center justify-center shrink-0 bgaib ai" style={{ width: 42, height: 42, borderRadius: 13 }}><Ico size={19} /></span>
                  <div className="flex-1"><p className="fontui font-bold ink" style={{ fontSize: 15 }}>{u.label}</p><p className="mono fs11" style={{ color: "var(--ink2)" }}>{u.d}</p></div>
                  <ChevronRight size={18} style={{ color: "#C2C7D0" }} />
                </button> ); })}
            </div></div>
          </div>
        );

        if (aiStep === 1) return (
          <div className="flex-1 flex flex-col appbg"><TopBar title="AI Asistan" sub={`Amaç: ${useLabel}`} />
            <Header step={2} />
            <div className="px-4 pt-2 pb-3"><p className="fontui ink" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em" }}>Bütçen ne kadar?</p></div>
            <div className="flex-1 overflow-y-auto px-4" style={{ paddingBottom: 90 }}><div className="flex flex-col gap-2.5">
              {budgets.map((bd) => { const on = aiBudget === bd; return (
                <button key={bd} onClick={() => { setAiBudget(bd); startAi(); }} className="press flex items-center justify-between bg-white p-4 shadowcard" style={{ borderRadius: 16, border: on ? "1.5px solid var(--ai)" : "1px solid var(--line)" }}>
                  <span className="mono ink" style={{ fontSize: 15, fontWeight: 600 }}>{bd}</span>
                  <span style={{ width: 18, height: 18, borderRadius: 18, border: on ? "5px solid var(--ai)" : "2px solid #D4D8DF" }} />
                </button> ); })}
            </div></div>
          </div>
        );

        // SONUÇLAR
        const picks = PRODUCTS.filter((p) => p.category === "telefon");
        const why = ["Performans ve fiyat dengesi en iyi olan", "Bütçe dostu, günlük kullanımda yeterli", "En yüksek özellikler, üst seviye deneyim"];
        return (
          <div className="flex-1 flex flex-col appbg"><TopBar title="AI Önerisi" action={<button onClick={() => { setAiStep(0); setAiUse(null); setAiBudget(null); }} className="press mono fs11 pr-2 ai" style={{ fontWeight: 700 }}>Yeniden</button>} />
            <div className="px-4 pt-3 shrink-0">
              <div className="flex gap-2.5 bgaib p-3" style={{ borderRadius: 16, border: "1px solid rgba(90,91,224,.16)" }}>
                <Sparkles size={16} className="ai shrink-0" style={{ marginTop: 2 }} />
                <p className="fontui fs13" style={{ color: "var(--ink2)" }}><b className="ink">{useLabel}</b> kullanımı ve <b className="ink">{aiBudget}</b> için seçtiğim 3 ürün — performans/fiyat dengesine göre sıraladım.</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pt-3" style={{ paddingBottom: 90 }}><div className="flex flex-col gap-3">
              {picks.map((p, i) => (
                <button key={p.id} onClick={() => openProduct(p.id)} className="press bg-white p-3 text-left shadowcard" style={{ borderRadius: 18, border: i === 0 ? "1.5px solid var(--ai)" : "1px solid var(--line)" }}>
                  <div className="flex gap-3">
                    <div className="relative shrink-0"><Thumb p={p} size={62} radius={15} /><span className="mono fs10 absolute flex items-center justify-center" style={{ top: -6, left: -6, width: 22, height: 22, borderRadius: 22, background: i === 0 ? "var(--ai)" : "var(--ink)", color: "#fff", fontWeight: 700, border: "2px solid #fff" }}>{i + 1}</span></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2"><p className="fontui font-bold ink truncate" style={{ fontSize: 15 }}>{p.name}</p>{i === 0 && <span className="mono fs9 bgai" style={{ color: "#fff", padding: "2px 7px", borderRadius: 6, fontWeight: 700 }}>EN İYİ</span>}</div>
                      <p className="mono fs11 mt-1" style={{ color: "var(--ink2)" }}>{p.specs["Yonga seti"] || p.specs["İşlemci"]} · {p.specs.RAM} · {p.specs.Batarya || p.specs.Ekran}</p>
                      <p className="mono ink mt-1.5" style={{ fontSize: 17, fontWeight: 600 }}>{tl(cheapestOf(p))}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 mt-2.5 pt-2.5" style={{ borderTop: "1px solid var(--line2)" }}>
                    <Sparkles size={13} className="ai shrink-0" style={{ marginTop: 1 }} /><p className="fontui fs11" style={{ color: "var(--ink2)" }}>{why[i]}</p>
                  </div>
                </button>
              ))}
            </div></div>
          </div>
        );
      }

      /* FİYAT ALARMI */
      case "alarm": {
        const p = product, cheap = cheapestOf(p);
        if (alarmDone) return (
          <div className="flex-1 flex flex-col bg-white"><TopBar title="Fiyat alarmı" />
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-3 anim">
              <span className="bgsave flex items-center justify-center" style={{ width: 60, height: 60, borderRadius: 20, boxShadow: "0 8px 22px rgba(5,150,105,.35)" }}><Check size={30} color="#fff" /></span>
              <p className="fontui ink" style={{ fontSize: 18, fontWeight: 800 }}>Alarm kuruldu</p>
              <p className="fontui fs13" style={{ color: "var(--ink2)", maxWidth: 250 }}><b className="ink">{p.name}</b> fiyatı <b className="mono ink">{tl(Number(alarmPrice))}</b> altına düşünce sana haber vereceğiz.</p>
              <button onClick={back} className="press mt-2 bgink text-white fontui font-semibold" style={{ padding: "11px 22px", borderRadius: 13, fontSize: 14 }}>Tamam</button>
            </div>
          </div>
        );
        const chans = [{ k: "push", i: BellRing, t: "Push bildirim" }, { k: "mail", i: Mail, t: "E-posta" }, { k: "sms", i: MessageSquare, t: "SMS" }];
        return (
          <div className="flex-1 flex flex-col appbg"><TopBar title="Fiyat alarmı" />
            <div className="flex-1 overflow-y-auto px-4 pt-4">
              <div className="flex gap-3 bg-white border bd shadowcard p-3" style={{ borderRadius: 16 }}>
                <Thumb p={p} size={50} radius={13} /><div><p className="fontui font-semibold ink" style={{ fontSize: 14 }}>{p.name}</p><p className="mono fs11" style={{ color: "var(--ink2)" }}>Şu an: {tl(cheap)}</p></div>
              </div>
              <p className="mono fs10 mt-5 mb-2" style={{ color: "#9AA1AC", letterSpacing: ".04em" }}>HEDEF FİYAT</p>
              <div className="flex items-center bg-white border bd px-4" style={{ borderRadius: 14, height: 56 }}>
                <input value={alarmPrice} onChange={(e) => setAlarmPrice(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className="mono flex-1 ink bg-transparent outline-none" style={{ fontSize: 22, fontWeight: 600 }} />
                <span className="mono ink2" style={{ fontSize: 18 }}>₺</span>
              </div>
              <p className="fontui fs11 mt-2" style={{ color: "var(--ink2)" }}>Fiyat bu seviyenin altına düşünce haber veririz. Şu anki fiyattan <b className="save">{tl(cheap - Number(alarmPrice) > 0 ? cheap - Number(alarmPrice) : 0)}</b> daha düşük.</p>
              <p className="mono fs10 mt-5 mb-2" style={{ color: "#9AA1AC", letterSpacing: ".04em" }}>BİLDİRİM KANALI</p>
              <div className="flex flex-col gap-2.5">
                {chans.map((c) => { const on = channels[c.k]; return (
                  <button key={c.k} onClick={() => setChannels((s) => ({ ...s, [c.k]: !s[c.k] }))} className="press flex items-center justify-between bg-white border bd px-3.5" style={{ borderRadius: 14, height: 52 }}>
                    <span className="fontui inline-flex items-center gap-2.5 ink" style={{ fontSize: 14 }}><c.i size={17} style={{ color: "#AEB4BE" }} />{c.t}</span>
                    <span style={{ width: 42, height: 25, borderRadius: 25, padding: 3, display: "flex", justifyContent: on ? "flex-end" : "flex-start", background: on ? "var(--ink)" : "#DCDFE4", transition: "all .2s" }}><span style={{ width: 19, height: 19, borderRadius: 19, background: "#fff" }} /></span>
                  </button> ); })}
              </div>
            </div>
            <div className="border-t bd bg-white p-3 shrink-0"><button onClick={() => setAlarmDone(true)} className="press w-full bgink text-white py-3.5 fontui font-semibold" style={{ borderRadius: 14, fontSize: 15 }}>Alarmı kur</button></div>
          </div>
        );
      }

      /* FAVORİLER */
      case "favs": {
        const list = PRODUCTS.filter((p) => favs.includes(p.id));
        return (
          <div className="flex-1 flex flex-col appbg">
            <div className="flex items-center px-4 bg-white border-b bd shrink-0" style={{ height: 52 }}><p className="fontui font-bold ink" style={{ fontSize: 17 }}>Favoriler</p></div>
            <div className="flex-1 overflow-y-auto px-4 py-3" style={{ paddingBottom: 90 }}>
              {list.length === 0 ? <Empty icon={Heart} title="Henüz favorin yok" desc="Beğendiğin ürünleri kalbe dokunarak buraya ekle." cta="Ürünlere göz at" onCta={() => reset("home")} />
                : <div className="flex flex-col gap-2.5">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
            </div>
          </div>
        );
      }

      /* BİLDİRİMLER */
      case "notif": {
        const items = [
          { i: TrendingDown, t: "Fiyat düştü", d: "Marka A · A1 Pro · 25.999 → 24.999 ₺", time: "2 sa önce", unread: true, c: "save" },
          { i: Package, t: "Yeniden stokta", d: "Marka C · C5 Lite tekrar satışta", time: "Dün", unread: true, c: "ink" },
          { i: BellRing, t: "Hedef fiyata ulaşıldı", d: "Marka B · B7 alarmın tetiklendi", time: "3 gün önce", unread: false, c: "ai" },
        ];
        return (
          <div className="flex-1 flex flex-col appbg">
            <div className="flex items-center justify-between px-4 bg-white border-b bd shrink-0" style={{ height: 52 }}><p className="fontui font-bold ink" style={{ fontSize: 17 }}>Bildirimler</p><button onClick={() => setNotifEmpty((v) => !v)} className="mono fs10" style={{ color: "#C2C7D0", textDecoration: "underline" }}>boş durum</button></div>
            <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 90 }}>
              {notifEmpty ? <Empty icon={Bell} title="Henüz bildirim yok" desc="Fiyat alarmı kur, düşüş olunca burada görünsün." cta="Ürünlere göz at" onCta={() => reset("home")} />
                : items.map((n, i) => (
                  <div key={i} className="flex gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid var(--line2)", background: n.unread ? "#fff" : "transparent" }}>
                    <span className={`flex items-center justify-center shrink-0 ${n.c === "save" ? "save bgsaveb" : n.c === "ai" ? "ai bgaib" : "ink"}`} style={{ width: 40, height: 40, borderRadius: 13, background: n.c === "ink" ? "#F2F4F7" : undefined }}><n.i size={18} /></span>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><p className="fontui font-semibold ink" style={{ fontSize: 14 }}>{n.t}</p>{n.unread && <span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--up)" }} />}</div><p className="mono fs11 truncate" style={{ color: "var(--ink2)" }}>{n.d}</p><p className="mono fs10 mt-0.5" style={{ color: "#B6BCC6" }}>{n.time}</p></div>
                  </div>
                ))}
            </div>
          </div>
        );
      }

      /* HATA */
      case "error":
        return (
          <div className="flex-1 flex flex-col bg-white"><TopBar title="Bağlantı sorunu" />
            <Empty icon={AlertTriangle} title="Bir sorun oluştu" desc="Fiyatlar şu an yüklenemedi. Bağlantını kontrol edip tekrar dene." cta="Tekrar dene" onCta={() => reset("home")} />
          </div>
        );

      default: return null;
    }
  };

  /* EKRAN MENÜSÜ */
  const SCREENS = [["splash", "Splash"], ["onboarding", "Onboarding"], ["home", "Ana sayfa"], ["results", "Arama sonuçları"], ["detail", "Ürün detay"], ["compareSelect", "Kıyas seçimi"], ["compare", "Karşılaştırma"], ["ai", "AI öneri"], ["alarm", "Fiyat alarmı"], ["favs", "Favoriler"], ["notif", "Bildirimler"], ["error", "Hata"]];

  return (
    <div className="fontui w-full flex items-center justify-center" style={{ minHeight: "100vh", padding: 14, background: "#E4E7EC" }}>

      <div className="relative bg-white overflow-hidden flex flex-col" style={{ width: "100%", maxWidth: 402, height: 786, borderRadius: 38, border: "1px solid rgba(16,21,27,.08)", boxShadow: "0 24px 70px rgba(16,21,27,.22)" }}>
        {/* status bar */}
        <div className="flex items-center justify-between px-5 shrink-0 bg-white" style={{ height: 36 }}>
          <span className="mono fs11 ink" style={{ fontWeight: 600 }}>9:41</span>
          <span className="flex items-center gap-1.5 mono fs10 ink2"><span>5G</span><span style={{ display: "inline-flex", gap: 1.5, alignItems: "flex-end" }}>{[5, 8, 11, 14].map((h, i) => <span key={i} style={{ width: 3, height: h, background: "var(--ink)", borderRadius: 1 }} />)}</span><BatteryFull size={16} className="ink" /></span>
        </div>

        <div key={screen} className="anim flex-1 flex flex-col overflow-hidden">{Screen()}</div>

        {showNav && <BottomNav />}

        <button onClick={() => setMenuOpen(true)} className="press absolute flex items-center justify-center" style={{ right: 14, bottom: showNav ? 76 : 18, width: 42, height: 42, borderRadius: 21, background: "var(--ink)", color: "#fff", boxShadow: "0 6px 18px rgba(16,21,27,.3)", zIndex: 25 }} title="Tüm ekranlar"><LayoutGrid size={18} /></button>

        {menuOpen && (
          <div className="absolute inset-0 flex items-end anim" style={{ background: "rgba(16,21,27,.45)", zIndex: 40 }} onClick={() => setMenuOpen(false)}>
            <div className="w-full bg-white p-4" onClick={(e) => e.stopPropagation()} style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "72%", overflowY: "auto" }}>
              <div className="flex items-center justify-between mb-3"><p className="fontui font-bold ink" style={{ fontSize: 15 }}>Tüm ekranlar</p><button onClick={() => setMenuOpen(false)} className="press ink2"><X size={19} /></button></div>
              <div className="grid grid-cols-2 gap-2">
                {SCREENS.map(([id, label]) => <button key={id} onClick={() => { reset(id); setMenuOpen(false); }} className="press text-left mono fs11" style={{ padding: "10px 12px", borderRadius: 12, fontWeight: 600, color: screen === id ? "#fff" : "var(--ink2)", background: screen === id ? "var(--ink)" : "#fff", border: screen === id ? "1px solid var(--ink)" : "1px solid var(--line)" }}>{label}</button>)}
              </div>
              <p className="mono fs10 text-center mt-3" style={{ color: "#C2C7D0" }}>KıyasBul · yüksek kaliteli UI · örnek veri</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ LOGO + ONBOARDING ART ============================ */

/* KıyasBul markası: iki panel = kıyas (karşılaştır), yeşil tarafta ✓ = bul (en uygunu bulundu) */
function Logo({ size = 40 }) {
  const r = size * 0.28;
  const bar = (w, c) => <div style={{ height: size * 0.07, width: w, background: c, borderRadius: 9 }} />;
  return (
    <div style={{ width: size, height: size, borderRadius: r, overflow: "hidden", display: "flex", boxShadow: "0 6px 16px rgba(16,21,27,.18)" }}>
      <div style={{ width: "42%", background: "var(--ink)", display: "flex", flexDirection: "column", justifyContent: "center", gap: size * 0.05, paddingLeft: size * 0.13 }}>
        {bar(size * 0.2, "rgba(255,255,255,.85)")}
        {bar(size * 0.14, "rgba(255,255,255,.45)")}
      </div>
      <div style={{ width: 2, background: "#fff" }} />
      <div style={{ flex: 1, background: "var(--save)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Check size={size * 0.4} color="#fff" strokeWidth={3.2} />
      </div>
    </div>
  );
}

function Wordmark({ size = 28 }) {
  return (
    <span className="fontui" style={{ fontSize: size, fontWeight: 800, letterSpacing: "-.025em", lineHeight: 1 }}>
      <span className="ink">Kıyas</span><span className="save">Bul</span>
    </span>
  );
}

function Card3({ children, style }) { return <div className="bg-white shadowcard" style={{ borderRadius: 14, border: "1px solid var(--line)", ...style }}>{children}</div>; }

function OnbCompare() {
  return (
    <div className="flex items-center gap-3">
      <Card3 style={{ width: 92, padding: 12 }}>
        <div style={{ height: 8, width: "70%", background: "#E4E7EC", borderRadius: 4 }} />
        <div className="mt-2" style={{ height: 18, width: "85%", background: "var(--ink)", borderRadius: 4 }} />
        <div className="mt-3" style={{ height: 6, width: "60%", background: "#EAECEF", borderRadius: 4 }} />
        <div className="mt-1.5" style={{ height: 6, width: "75%", background: "#EAECEF", borderRadius: 4 }} />
      </Card3>
      <span className="mono fs11" style={{ color: "#fff", background: "var(--ink)", width: 30, height: 30, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>VS</span>
      <Card3 style={{ width: 92, padding: 12, border: "1.5px solid var(--save)" }}>
        <div className="flex justify-end"><Check size={14} className="save" /></div>
        <div className="mt-1" style={{ height: 18, width: "85%", background: "var(--save)", borderRadius: 4 }} />
        <div className="mt-3" style={{ height: 6, width: "60%", background: "#EAECEF", borderRadius: 4 }} />
        <div className="mt-1.5" style={{ height: 6, width: "75%", background: "#EAECEF", borderRadius: 4 }} />
      </Card3>
    </div>
  );
}
function OnbPrice() {
  const data = [100, 96, 92, 84, 80, 72, 70];
  const w = 168, h = 70, min = 70, max = 100;
  const X = (i) => (i / (data.length - 1)) * w, Y = (v) => h - ((v - min) / (max - min)) * h;
  const line = data.map((v, i) => `${X(i)},${Y(v)}`).join(" ");
  return (
    <Card3 style={{ padding: 16, width: 220 }}>
      <div className="flex items-center justify-between mb-2"><span className="mono fs10 ink2">FİYAT GEÇMİŞİ</span><span className="mono fs10 save bgsaveb inline-flex items-center gap-0.5" style={{ padding: "2px 6px", borderRadius: 6, fontWeight: 700 }}><TrendingDown size={11} />%30</span></div>
      <svg width={w} height={h}><defs><linearGradient id="ol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--save)" stopOpacity=".18" /><stop offset="1" stopColor="var(--save)" stopOpacity="0" /></linearGradient></defs>
        <polygon points={`0,${h} ${line} ${w},${h}`} fill="url(#ol)" /><polyline points={line} fill="none" stroke="var(--save)" strokeWidth="2.25" strokeLinejoin="round" /><circle cx={X(6)} cy={Y(70)} r="4" fill="var(--save)" stroke="#fff" strokeWidth="2" />
      </svg>
      <div className="flex items-center gap-1.5 mt-2"><BellRing size={13} className="ink2" /><span className="mono fs11 ink2">hedef fiyata ulaşıldı</span></div>
    </Card3>
  );
}
function OnbAI() {
  return (
    <Card3 style={{ padding: 16, width: 220 }}>
      <div className="flex items-center gap-2 mb-3"><span className="bgai flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 11 }}><Sparkles size={17} color="#fff" /></span><div><div style={{ height: 7, width: 90, background: "#E4E7EC", borderRadius: 4 }} /><div className="mt-1.5" style={{ height: 6, width: 60, background: "#EEF0F3", borderRadius: 4 }} /></div></div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2 mt-2" style={{ padding: 8, borderRadius: 10, border: i === 0 ? "1.5px solid var(--ai)" : "1px solid var(--line)" }}>
          <span className="mono fs10 flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: 18, background: i === 0 ? "var(--ai)" : "var(--ink)", color: "#fff", fontWeight: 700 }}>{i + 1}</span>
          <div style={{ height: 8, width: 70 + i * 8, background: "#E4E7EC", borderRadius: 4 }} />
          <div className="ml-auto" style={{ height: 10, width: 34, background: i === 0 ? "var(--ai)" : "#EAECEF", borderRadius: 4 }} />
        </div>
      ))}
    </Card3>
  );
}
