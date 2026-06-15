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
const tl = (n) => n.toLocaleString("tr-TR") + " ₺";

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
  { id: "l1", category: "laptop", brand: "Marka D", model: "Pro 14", mono: "P14", name: "Marka D · Pro 14", year: 2025, month: 3, price: 42999, rating: 4.6,
    specs: { "İşlemci": "8 çekirdek", "RAM": "16 GB", "Depolama": "512 GB SSD", "Ekran": "14\" 2.5K", "Yenileme": "120 Hz", "Batarya": "70 Wh", "Ağırlık": "1.45 kg", "Bağlantı": "Wi-Fi 6E · USB-C" },
    history: [45999, 45499, 44499, 43999, 43499, 42999],
    sellers: [{ name: "Mağaza A", price: 42999, stock: true, ship: "Ücretsiz" }, { name: "Mağaza D", price: 43750, stock: true, ship: "Ücretsiz" }] },
  { id: "l2", category: "laptop", brand: "Marka E", model: "Air 13", mono: "A13", name: "Marka E · Air 13", year: 2024, month: 10, price: 31499, rating: 4.3,
    specs: { "İşlemci": "8 çekirdek", "RAM": "16 GB", "Depolama": "256 GB SSD", "Ekran": "13\" Full HD+", "Yenileme": "60 Hz", "Batarya": "52 Wh", "Ağırlık": "1.24 kg", "Bağlantı": "Wi-Fi 6 · USB-C" },
    history: [33999, 33499, 32999, 32499, 31999, 31499],
    sellers: [{ name: "Mağaza B", price: 31499, stock: true, ship: "Ücretsiz" }, { name: "Mağaza A", price: 31990, stock: true, ship: "Ücretsiz" }] },
  { id: "h1", category: "kulaklik", brand: "Marka F", model: "Buds Pro", mono: "BP", name: "Marka F · Buds Pro", year: 2025, month: 5, price: 4299, rating: 4.3,
    specs: { "Tip": "Kablosuz kulak içi", "Sürücü": "11 mm", "ANC": "Aktif", "Batarya": "6 sa + 24 sa", "Bağlantı": "Bluetooth 5.3", "Ağırlık": "5.2 g" },
    history: [4999, 4899, 4799, 4499, 4399, 4299],
    sellers: [{ name: "Mağaza B", price: 4299, stock: true, ship: "Ücretsiz" }, { name: "Mağaza A", price: 4490, stock: true, ship: "39 ₺" }] },
  { id: "t1", category: "tablet", brand: "Marka H", model: "Tab S", mono: "TS", name: "Marka H · Tab S", year: 2025, month: 2, price: 18999, rating: 4.4,
    specs: { "Yonga seti": "8 çekirdek", "RAM": "8 GB", "Depolama": "256 GB", "Ekran": "11\" AMOLED", "Yenileme": "120 Hz", "Batarya": "8400 mAh", "Ağırlık": "498 g", "Bağlantı": "Wi-Fi 6 · USB-C" },
    history: [20999, 20499, 19999, 19499, 19199, 18999],
    sellers: [{ name: "Mağaza C", price: 18999, stock: true, ship: "Ücretsiz" }, { name: "Mağaza A", price: 19390, stock: true, ship: "Ücretsiz" }] },
  { id: "m1", category: "monitor", brand: "Marka I", model: "View 27", mono: "V27", name: "Marka I · View 27", year: 2024, month: 12, price: 7499, rating: 4.1,
    specs: { "Ekran": "27\" IPS", "Çözünürlük": "2560×1440", "Yenileme": "165 Hz", "Tepki": "1 ms", "Bağlantı": "HDMI · DP · USB-C", "Ağırlık": "5.6 kg" },
    history: [8299, 8199, 7999, 7699, 7599, 7499],
    sellers: [{ name: "Mağaza C", price: 7499, stock: true, ship: "Ücretsiz" }, { name: "Mağaza D", price: 7790, stock: true, ship: "59 ₺" }] },
];
const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];

const num = (s) => { const m = String(s).replace(",", ".").match(/[\d.]+/); return m ? parseFloat(m[0]) : null; };
const cheapestOf = (p) => p.sellers?.length ? Math.min(...p.sellers.map((s) => s.price)) : (p.price || 0);
const dropPct = (p) => p.history?.length > 0 ? Math.round(((p.history[0] - p.history[p.history.length - 1]) / p.history[0]) * 100) : 0;
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
function Thumb({ p, className = "", radius = 14 }) {
  const Icon = CAT_ICON[p.category];
  return (
    <div className={"relative flex items-center justify-center overflow-hidden " + className}
      style={{ borderRadius: radius, background: "linear-gradient(145deg,#FBFCFE 0%,#EEF1F6 55%,#E6EAF1 100%)", border: "1px solid rgba(16,21,27,.06)" }}>
      <Icon className="opacity-20" style={{ width: "38%", height: "38%", color: "#10151B" }} strokeWidth={1.3} />
      <span className="mono absolute right-1.5 bottom-1" style={{ fontSize: 9, color: "rgba(16,21,27,.34)" }}>{p.mono}</span>
    </div>
  );
}
function Sparkline({ data, w = 80, h = 30, save = true }) {
  const min = Math.min(...data), max = Math.max(...data);
  const X = (i) => (i / (data.length - 1)) * w, Y = (v) => h - 3 - ((v - min) / (max - min || 1)) * (h - 6);
  const line = data.map((v, i) => X(i).toFixed(1) + "," + Y(v).toFixed(1)).join(" ");
  const col = save ? "var(--save)" : "var(--up)", gid = "g" + Math.round(data[0] + data.length);
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col} stopOpacity="0.16" /><stop offset="1" stopColor={col} stopOpacity="0" /></linearGradient></defs>
      <polygon points={"0," + h + " " + line + " " + w + "," + h} fill={"url(#" + gid + ")"} />
      <polyline points={line} fill="none" stroke={col} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={X(data.length - 1)} cy={Y(data[data.length - 1])} r="2.6" fill={col} />
    </svg>
  );
}
function Stars({ r, size = 12 }) {
  return <span className="inline-flex items-center gap-0.5"><Star size={size} style={{ color: "#E8A93B", fill: "#E8A93B" }} /><span className="mono ink2" style={{ fontSize: 11 }}>{r.toFixed(1)}</span></span>;
}

/* ============================ YENİ SAYFALAR ============================ */
const AboutPage = () => (
  <div className="anim mx-auto max-w-3xl px-6 py-10">
    <h1 className="fontui ink mb-6" style={{ fontSize: 28, fontWeight: 800 }}>KıyasBul Hakkında</h1>
    <div className="surface border bd rounded-2xl p-6 shadowcard space-y-4">
      <p className="fontui ink2 leading-relaxed" style={{ fontSize: 15 }}>
        Merhaba! KıyasBul, teknoloji ürünlerinin fiyat ve özellik karşılaştırmasını yapan bağımsız bir platformdur.
      </p>
      <p className="fontui ink2 leading-relaxed" style={{ fontSize: 15 }}>
        <strong className="ink">Amacımız:</strong> Farklı mağazalardaki fiyatları tek yerde toplayarak, en iyi fiyat/performans ürünlerini bulmanıza yardımcı olmak.
      </p>
      <p className="fontui ink2 leading-relaxed" style={{ fontSize: 15 }}>
        <strong className="ink">Nasıl Çalışıyoruz?</strong> Piyasadaki güvenilir mağazalardan veri topluyor, ürünleri detaylı şekilde karşılaştırıyor ve size en güncel bilgileri sunuyoruz.
      </p>
      <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(59,130,246,.08)", border: "1px solid rgba(59,130,246,.2)" }}>
        <p className="fontui" style={{ fontSize: 14, color: "#2563EB" }}>
          <strong>💡 Misyonumuz:</strong> Teknoloji alışverişini kolay, şeffaf ve adil hale getirmek.
        </p>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="anim mx-auto max-w-3xl px-6 py-10">
    <h1 className="fontui ink mb-6" style={{ fontSize: 28, fontWeight: 800 }}>İletişim</h1>
    <div className="surface border bd rounded-2xl p-6 shadowcard space-y-6">
      <div>
        <h2 className="fontui ink mb-3" style={{ fontSize: 18, fontWeight: 700 }}>📧 Email</h2>
        <a href="mailto:info@kiyasbul.shop" className="fontui inline-flex items-center gap-2 px-4 py-3 rounded-xl" style={{ fontSize: 15, background: "var(--surface2)", border: "1px solid var(--line)", color: "#2563EB", fontWeight: 600 }}>
          <Mail size={18} /> info@kiyasbul.shop
        </a>
      </div>
      <div>
        <h2 className="fontui ink mb-3" style={{ fontSize: 18, fontWeight: 700 }}>💬 Geri Bildirim</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          Önerileriniz, şikayetleriniz veya işbirliği teklifleriniz için yukarıdaki email adresine yazabilirsiniz. 
          En kısa sürede dönüş yapıyoruz.
        </p>
      </div>
      <div className="p-4 rounded-xl" style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)" }}>
        <p className="fontui" style={{ fontSize: 14, color: "#16A34A" }}>
          <strong>✅ Ortalama Yanıt Süresi:</strong> 24 saat içinde
        </p>
      </div>
    </div>
  </div>
);

const PrivacyPage = () => (
  <div className="anim mx-auto max-w-3xl px-6 py-10">
    <h1 className="fontui ink mb-6" style={{ fontSize: 28, fontWeight: 800 }}>Gizlilik Politikası</h1>
    <div className="surface border bd rounded-2xl p-6 shadowcard space-y-5">
      <p className="mono ink2" style={{ fontSize: 12 }}>Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
      
      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>1. Topladığımız Bilgiler</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          KıyasBul olarak, site deneyimini iyileştirmek için temel istatistik bilgileri topluyoruz:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1 fontui ink2" style={{ fontSize: 14 }}>
          <li>Ziyaret istatistikleri (Google Analytics)</li>
          <li>Tarayıcı ve cihaz bilgileri</li>
          <li>Yaklaşık konum (ülke seviyesi)</li>
        </ul>
      </section>

      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>2. Çerezler (Cookies)</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          Sitemiz, deneyiminizi iyileştirmek için çerezler kullanabilir. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.
        </p>
      </section>

      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>3. Affiliate Linkler</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          Sitemizdeki bazı linkler affiliate (satış ortaklığı) linkleridir. Bu linklere tıkladığınızda, tarayıcınıza bir çerez yerleştirilebilir ve yaptığınız alışverişten komisyon alabiliriz. Bu, sizin ödediğiniz fiyata etki etmez.
        </p>
      </section>

      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>4. Üçüncü Taraf Hizmetler</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          Google Analytics gibi üçüncü taraf hizmetler, site trafiğini analiz etmek için kullanılabilir. Bu hizmetlerin kendi gizlilik politikaları geçerlidir.
        </p>
      </section>

      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>5. İletişim</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          Gizlilik politikamız hakkında sorularınız için: <a href="mailto:info@kiyasbul.shop" className="text-blue-600 hover:underline">info@kiyasbul.shop</a>
        </p>
      </section>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="anim mx-auto max-w-3xl px-6 py-10">
    <h1 className="fontui ink mb-6" style={{ fontSize: 28, fontWeight: 800 }}>Kullanım Şartları</h1>
    <div className="surface border bd rounded-2xl p-6 shadowcard space-y-5">
      <p className="mono ink2" style={{ fontSize: 12 }}>Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
      
      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>1. Hizmetin Doğası</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          KıyasBul, teknolojik ürünlerin fiyat ve özellik karşılaştırmasını sunan bir bilgi platformudur. Satış yapmıyoruz, sadece farklı mağazalardaki fiyatları gösteriyoruz.
        </p>
      </section>

      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>2. Fiyat Doğruluğu</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          Fiyatlar düzenli olarak güncellenmeye çalışılsa da, anlık değişiklikler olabilir. Satın alma işlemi yapmadan önce ilgili mağazanın sitesinden güncel fiyatı kontrol etmenizi öneririz.
        </p>
      </section>

      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>3. Affiliate İlişkileri</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          Bu site affiliate linkler içermektedir. Bu linklere tıklayıp alışveriş yaptığınızda komisyon alabiliriz. Bu, size sunulan fiyatı etkilemez.
        </p>
      </section>

      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>4. Sorumluluk Reddi</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          KıyasBul, üçüncü taraf sitelerdeki ürün kalitesi, teslimat, iade gibi konulardan sorumlu değildir. Alışverişinizi yaptığınız mağazanın şartları geçerlidir.
        </p>
      </section>

      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>5. Fikri Mülkiyet</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          Sitedeki içerik, tasarım ve kodlar KıyasBul'a aittir. İzinsiz kopyalanamaz veya kullanılamaz.
        </p>
      </section>

      <section>
        <h2 className="fontui ink mb-2" style={{ fontSize: 17, fontWeight: 700 }}>6. İletişim</h2>
        <p className="fontui ink2 leading-relaxed" style={{ fontSize: 14 }}>
          Sorularınız için: <a href="mailto:info@kiyasbul.shop" className="text-blue-600 hover:underline">info@kiyasbul.shop</a>
        </p>
      </section>
    </div>
  </div>
);

/* ============================ UYGULAMA ============================ */
export default function App() {
useEffect(() => {
    fetch("https://6fc49hsoq6.execute-api.us-east-1.amazonaws.com/v2/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 AWS'den Gelen Canlı Veri:", data);
        setApiProducts(data);
      })
      .catch((err) => console.error("🚨 AWS Bağlantı Hatası:", err));
  }, []);
  // ----------------------------------
  const [apiProducts, setApiProducts] = useState([]);
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
  const [favs, setFavs] = useState(() => load("kb_favs", ["p2"]));
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

  const product = PRODUCTS.find((p) => p.id === active) || PRODUCTS[0];
  const toggleCompare = (id) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < maxCompare ? [...c, id] : c));
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const openProduct = (id) => { setActive(id); setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)); go("detail"); };
  const runSearch = () => { setSearchTerm(query); go("results"); };
  const openAlarm = (p) => { setAlarm(p); setAlarmPrice(String(Math.round(cheapestOf(p) * 0.9 / 100) * 100)); setAlarmDone(false); };

  const priceCeil = Math.max(...PRODUCTS.map((p) => p.price));
const results = (() => {
  let list = apiProducts.length > 0 ? apiProducts : PRODUCTS;
  
  if (cat) {
    list = list.filter((p) => p.category?.toLowerCase() === cat.toLowerCase());
  }
  if (brandFilter.length) {
    list = list.filter((p) => brandFilter.includes(p.brand));
  }
  if (maxPrice > 0) {
    list = list.filter((p) => p.price <= maxPrice);
  }
  if (searchTerm) {
    const q = searchTerm.toLocaleLowerCase("tr");
    list = list.filter((p) => p.name.toLocaleLowerCase("tr").includes(q));
  }
  if (sort === "En düşük fiyat") list = [...list].sort((a, b) => a.price - b.price);
  else if (sort === "En yüksek fiyat") list = [...list].sort((a, b) => b.price - a.price);
  else if (sort === "En yeni") list = [...list].sort((a, b) => b.year * 12 + b.month - (a.year * 12 + a.month));
  else if (sort === "Puan") list = [...list].sort((a, b) => b.rating - a.rating);
  
  return list;
})();
  const clearFilters = () => { setCat(null); setBrandFilter([]); setMaxPrice(0); setSearchTerm(""); setQuery(""); };
  const startAi = () => { setAiThinking(true); setTimeout(() => { setAiThinking(false); setAiStep(2); }, 1100); };

  /* ----- ÜRÜN KARTI (dikey, grid uyumlu) ----- */
  const ProductCard = ({ p }) => {
    const cheap = cheapestOf(p), fav = favs.includes(p.id), cmp = compare.includes(p.id), d = dropPct(p);
    return (
      <div className="press group surface rounded-2xl border bd shadowcard overflow-hidden flex flex-col cursor-pointer" onClick={() => openProduct(p.id)}>
        <div className="relative p-3 pb-0">
          <Thumb p={p} className="w-full" radius={16} />
          <div className="absolute top-3 left-3 right-3 -m-0 p-0" style={{ pointerEvents: "none" }}>
            <div className="flex items-start justify-between" style={{ pointerEvents: "auto" }}>
              {d > 0 ? <span className="mono save bgsaveb inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg" style={{ fontSize: 11, fontWeight: 700 }}><TrendingDown size={12} />%{d}</span> : <span />}
              <button onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }} className="press surface rounded-full p-1.5 shadow-sm" style={{ color: fav ? "var(--up)" : "#9AA1AC" }}>
                <Heart size={16} fill={fav ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute" />
        <div className="p-3 flex flex-col flex-1">
          <p className="fontui font-semibold ink leading-snug" style={{ fontSize: 14 }}>{p.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="mono ink2" style={{ fontSize: 11 }}>{p.year}/{String(p.month).padStart(2, "0")}</span>
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
    const cheap = cheapestOf(p), d = dropPct(p), old = p.history[0];
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
  const VsCard = ({ a, b }) => (
    <div onClick={() => { setCompare([a.id, b.id]); go("compare"); }} className="press cursor-pointer surface rounded-2xl border bd shadowcard p-3 flex items-center gap-2 shrink-0 lg:shrink" style={{ width: isDesktop ? "auto" : 210 }}>
      <Thumb p={a} className="w-11 h-11" radius={11} />
      <span className="mono flex items-center justify-center shrink-0" style={{ color: "var(--bg)", background: "var(--ink)", width: 24, height: 24, borderRadius: 24, fontWeight: 700, fontSize: 10 }}>VS</span>
      <Thumb p={b} className="w-11 h-11" radius={11} />
      <div className="flex-1 min-w-0 pl-1"><p className="fontui font-semibold ink truncate" style={{ fontSize: 12 }}>{a.model}</p><p className="fontui ink2 truncate" style={{ fontSize: 12 }}>{b.model}</p></div>
      <ChevronRight size={16} className="hidden lg:block" style={{ color: "#C2C7D0" }} />
    </div>
  );

  /* ----- FİLTRELER (sidebar + sheet ortak) ----- */
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
        <p className="mono mb-2" style={{ fontSize: 10, color: "#9AA1AC", letterSpacing: ".04em" }}>MARKA</p>
        <div className="flex flex-col gap-1.5">
          {BRANDS.map((b) => { const on = brandFilter.includes(b); return (
            <button key={b} onClick={() => setBrandFilter((f) => f.includes(b) ? f.filter((x) => x !== b) : [...f, b])} className="press flex items-center gap-2 fontui" style={{ fontSize: 13, color: "var(--ink2)" }}>
              <span className="flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: 6, background: on ? "var(--ink)" : "var(--surface)", border: on ? "none" : "1.5px solid var(--line)" }}>{on && <Check size={12} color="var(--bg)" />}</span>{b}
            </button> ); })}
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
    const deals = [...PRODUCTS].sort((a, b) => dropPct(b) - dropPct(a)).slice(0, isDesktop ? 5 : 6);
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

        {/* AI BANNER */}
        <button onClick={() => { setAiStep(0); go("ai"); }} className="press w-full mt-8 flex items-center gap-4 p-4 lg:p-5 rounded-2xl text-left bgaib" style={{ border: "1px solid rgba(90,91,224,.16)" }}>
          <span className="bgai flex items-center justify-center shrink-0" style={{ width: 48, height: 48, borderRadius: 15, boxShadow: "0 6px 16px rgba(90,91,224,.35)" }}><Sparkles size={22} color="#fff" /></span>
          <div className="flex-1"><p className="fontui font-bold ink" style={{ fontSize: isDesktop ? 17 : 15 }}>Hangisini alacağına karar veremedin mi?</p><p className="mono ai" style={{ fontSize: 12, fontWeight: 600 }}>Amacını ve bütçeni söyle, AI sana 3 ürün önersin →</p></div>
          <ChevronRight className="ai hidden lg:block" size={22} />
        </button>

        {/* SON BAKILANLAR */}
        {recent.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-3"><h2 className="fontui font-bold ink inline-flex items-center gap-1.5" style={{ fontSize: 17 }}><Clock size={17} className="ink2" /> Son bakılanlar</h2><button onClick={() => setRecent([])} className="press mono ink2" style={{ fontSize: 11 }}>Temizle</button></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{recent.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean).slice(0, isDesktop ? 4 : 4).map((p) => <ProductCard key={p.id} p={p} />)}</div>
          </section>
        )}

        {/* FİYATI DÜŞENLER */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-3"><h2 className="fontui font-bold ink inline-flex items-center gap-1.5" style={{ fontSize: 17 }}><TrendingDown size={18} className="save" /> Fiyatı düşenler</h2><span className="mono" style={{ fontSize: 11, color: "#A4ABB5" }}>saatlik güncel</span></div>
          <div className="flex gap-3 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible" style={{ scrollbarWidth: "none" }}>{deals.map((p) => <DealCard key={p.id} p={p} />)}</div>
        </section>

        {/* POPÜLER KIYASLAMALAR */}
        <section className="mt-8">
          <h2 className="fontui font-bold ink mb-3" style={{ fontSize: 17 }}>Popüler kıyaslamalar</h2>
          <div className="flex gap-3 overflow-x-auto lg:grid lg:grid-cols-3 lg:overflow-visible" style={{ scrollbarWidth: "none" }}><VsCard a={PRODUCTS[0]} b={PRODUCTS[1]} /><VsCard a={PRODUCTS[1]} b={PRODUCTS[2]} /><VsCard a={PRODUCTS[3]} b={PRODUCTS[4]} /></div>
        </section>

        {/* POPÜLER ÜRÜNLER */}
        <section className="mt-8">
          <h2 className="fontui font-bold ink mb-3" style={{ fontSize: 17 }}>Popüler ürünler</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{PRODUCTS.slice(0, isDesktop ? 8 : 6).map((p) => <ProductCard key={p.id} p={p} />)}</div>
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
    const sorted = [...p.sellers].sort((a, b) => a.price - b.price), fav = favs.includes(p.id);
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
              <span className="mono ink2 px-2 py-0.5 rounded" style={{ fontSize: 11, border: "1px solid var(--line)" }}>{p.year}/{String(p.month).padStart(2, "0")}</span>
              <span className="mono ink2 px-2 py-0.5 rounded" style={{ fontSize: 11, border: "1px solid var(--line)" }}>{CAT_LABEL[p.category]}</span>
              <Stars r={p.rating} size={13} />
            </div>
            <h1 className="fontui ink" style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em" }}>{p.name}</h1>
            <div className="flex items-end justify-between mt-4">
              <div>
                <p className="mono" style={{ fontSize: 10, color: "#9AA1AC", letterSpacing: ".04em" }}>EN DÜŞÜK FİYAT</p>
                <div className="flex items-center gap-2"><p className="mono ink" style={{ fontSize: 30, fontWeight: 700 }}>{tl(cheap)}</p>{d > 0 && <span className="mono save bgsaveb inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg" style={{ fontSize: 12, fontWeight: 700 }}><TrendingDown size={12} />%{d}</span>}</div>
              </div>
              <div className="text-right"><p className="mono" style={{ fontSize: 9, color: "#A4ABB5" }}>30 GÜN</p><Sparkline data={p.history} w={90} h={32} /></div>
            </div>
            <div className="mt-4 border bd rounded-2xl overflow-hidden">
              {sorted.map((s, i) => (
                <div key={s.name} className="flex items-center justify-between px-4 py-3" style={{ borderTop: i ? "1px solid var(--line2)" : "none", background: i === 0 ? "var(--saveBg)" : "var(--surface)" }}>
                  <div><p className="fontui font-semibold ink inline-flex items-center gap-1.5" style={{ fontSize: 14 }}>{s.name}{i === 0 && <span className="mono bgsave" style={{ color: "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 6, fontWeight: 700 }}>EN UCUZ</span>}</p><p className="mono mt-0.5 inline-flex items-center gap-2 ink2" style={{ fontSize: 10 }}><span className="inline-flex items-center gap-1"><Truck size={11} />{s.ship}</span><span style={{ color: s.stock ? "var(--save)" : "var(--up)" }}>{s.stock ? "Stokta" : "Tükendi"}</span></p></div>
                  <div className="flex items-center gap-1.5"><p className="mono ink" style={{ fontSize: 15, fontWeight: 600 }}>{tl(s.price)}</p><ChevronRight size={16} style={{ color: "#C2C7D0" }} /></div>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 mt-4">
              <button onClick={() => openAlarm(p)} className="press flex-1 inline-flex items-center justify-center gap-2 py-3 fontui font-semibold ink rounded-xl" style={{ border: "1.5px solid var(--ink)", fontSize: 14 }}><BellRing size={16} /> Fiyat alarmı</button>
              <button onClick={() => { if (!compare.includes(p.id)) toggleCompare(p.id); go("compare"); }} className="press flex-1 inline-flex items-center justify-center gap-2 py-3 fontui font-semibold rounded-xl btn-primary" style={{ fontSize: 14 }}><Scale size={16} /> Karşılaştır</button>
              <button onClick={() => toggleFav(p.id)} className="press rounded-xl px-3.5" style={{ border: "1px solid var(--line)", color: fav ? "var(--up)" : "#9AA1AC" }}><Heart size={18} fill={fav ? "currentColor" : "none"} /></button>
            </div>
            <p className="mono mt-3 inline-flex items-center gap-1" style={{ fontSize: 10, color: "#B6BCC6" }}><Clock size={11} /> Son güncelleme: 12 dk önce</p>
          </div>
        </div>

        {/* TEKNİK ÖZELLİKLER */}
        <section className="mt-8 surface border bd rounded-2xl p-5 shadowcard">
          <h2 className="fontui font-bold ink mb-3" style={{ fontSize: 16 }}>Teknik özellikler</h2>
          <div className="grid md:grid-cols-2 gap-x-10">
            {Object.entries(p.specs).map(([k, v], i) => { const Ico = SPEC_ICON[k]; return (
              <div key={k} className="flex items-center justify-between py-2.5" style={{ borderTop: "1px solid var(--line2)" }}><span className="fontui inline-flex items-center gap-2 ink2" style={{ fontSize: 13 }}>{Ico && <Ico size={14} style={{ color: "#AEB4BE" }} />}{k}</span><span className="mono ink" style={{ fontSize: 13, fontWeight: 500 }}>{v}</span></div>
            ); })}
          </div>
        </section>

        {/* BENZER ÜRÜNLER */}
        <section className="mt-8">
          <h2 className="fontui font-bold ink mb-3" style={{ fontSize: 16 }}>Benzer ürünler</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4).map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      </div>
    );
  };

  const PageCompare = () => {
    const sel = compare.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    if (sel.length < 2) return (
      <div className="anim mt-4 lg:mt-6">
        <Empty icon={Scale} title="Karşılaştırmak için en az 2 ürün seç" desc={'Ürün kartlarındaki "Karşılaştır" düğmesine bas, farkları yan yana gösterelim.'} cta="Ürünlere göz at" onCta={home} />
      </div>
    );
    const keys = sel.reduce((acc, p) => acc.filter((k) => k in p.specs), Object.keys(sel[0].specs)).slice(0, 9);
    const rowDefs = [
      { k: "Fiyat", get: (p) => p.price, fmt: (p) => tl(p.price), better: "low" },
      { k: "Çıkış", get: (p) => p.year * 12 + p.month, fmt: (p) => p.year + "/" + String(p.month).padStart(2, "0"), better: "high" },
      ...keys.map((k) => ({ k, get: (p) => num(p.specs[k]), fmt: (p) => p.specs[k], better: HIGHER_BETTER.includes(k) ? "high" : null })),
    ];
    const winners = sel.filter((_, i) => rowDefs.reduce((n, r) => {
      if (!r.better) return n;
      const vals = sel.map(r.get);
      const best = r.better === "low" ? Math.min(...vals.filter((x) => x != null)) : Math.max(...vals.filter((x) => x != null));
      return n + (r.get(sel[i]) === best ? 1 : 0);
    }, 0));
    const winCounts = sel.map((p) => rowDefs.reduce((n, r) => { if (!r.better) return n; const vals = sel.map(r.get).filter((x) => x != null); const best = r.better === "low" ? Math.min(...vals) : Math.max(...vals); return n + (r.get(p) === best ? 1 : 0); }, 0));
    const lead = Math.max(...winCounts);
    const verdicts = [];
    { const v = sel.map((p) => p.price); const mi = v.indexOf(Math.min(...v)); verdicts.push(sel[mi].model + " daha uygun"); }
    { const v = sel.map((p) => num(p.specs.Batarya)); if (v.every((x) => x != null) && new Set(v).size > 1) { const mi = v.indexOf(Math.max(...v)); verdicts.push(sel[mi].model + " daha uzun batarya"); } }
    { const v = sel.map((p) => num(p.specs.RAM)); if (v.every((x) => x != null) && new Set(v).size > 1) { const mi = v.indexOf(Math.max(...v)); verdicts.push(sel[mi].model + " daha çok RAM"); } }
    const colW = "minmax(0,1fr)";
    return (
      <div className="anim mt-4 lg:mt-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="fontui font-bold ink" style={{ fontSize: 22 }}>Karşılaştırma</h1>
          <button onClick={home} className="press mono ink2" style={{ fontSize: 12 }}>+ Ürün ekle</button>
        </div>
        {/* özet karar */}
        <div className="flex gap-2 overflow-x-auto mb-3" style={{ scrollbarWidth: "none" }}>
          {verdicts.map((v, i) => <span key={i} className="mono save bgsaveb inline-flex items-center gap-1 px-3 py-1.5 rounded-lg shrink-0" style={{ fontSize: 12, fontWeight: 600 }}><Check size={12} />{v}</span>)}
        </div>
        <div className="surface border bd rounded-2xl overflow-hidden shadowcard">
          {/* başlık */}
          <div className="grid sticky top-16 lg:top-20 surface z-10" style={{ gridTemplateColumns: "92px " + sel.map(() => colW).join(" "), borderBottom: "1px solid var(--line)" }}>
            <div />
            {sel.map((p, i) => (
              <div key={p.id} className="p-3 text-center relative" style={{ borderLeft: "1px solid var(--line)" }}>
                <button onClick={() => toggleCompare(p.id)} className="press absolute top-2 right-2 ink2"><X size={14} /></button>
                <div className="flex justify-center"><Thumb p={p} className="w-12 h-12" radius={12} /></div>
                <p className="fontui font-semibold ink mt-1.5 truncate" style={{ fontSize: 12 }}>{p.model}</p>
                <span className="mono inline-flex items-center gap-1 mt-0.5" style={{ fontSize: 10, color: winCounts[i] === lead ? "var(--save)" : "#A4ABB5", fontWeight: 600 }}>{winCounts[i] === lead && <Trophy size={10} />}{winCounts[i]} kategori</span>
              </div>
            ))}
          </div>
          {/* satırlar */}
          {rowDefs.map((r) => {
            const vals = sel.map(r.get);
            const valid = vals.filter((x) => x != null);
            const best = r.better ? (r.better === "low" ? Math.min(...valid) : Math.max(...valid)) : null;
            return (
              <div key={r.k} className="grid" style={{ gridTemplateColumns: "92px " + sel.map(() => colW).join(" "), borderTop: "1px solid var(--line2)" }}>
                <div className="px-3 py-3"><span className="mono" style={{ fontSize: 10, color: "#9AA1AC" }}>{r.k}</span></div>
                {sel.map((p, i) => { const win = r.better && r.get(p) === best && new Set(vals).size > 1; return (
                  <div key={p.id} className="px-3 py-3" style={{ borderLeft: "1px solid var(--line)", background: win ? "var(--saveBg)" : "var(--surface)" }}>
                    <span className="mono inline-flex items-center gap-1" style={{ fontSize: 13, color: win ? "var(--saveD)" : "var(--ink)", fontWeight: win ? 700 : 500 }}>{r.fmt(p)}{win && <Check size={13} />}</span>
                  </div>
                ); })}
              </div>
            );
          })}
        </div>
        <p className="mono mt-3" style={{ fontSize: 11, color: "#B6BCC6" }}>Yeşil = o kategoride öne çıkan. Karar senin — fiyat/özellik dengesine göre seç.{isDesktop ? " Masaüstünde 3 ürüne kadar ekleyebilirsin." : ""}</p>
      </div>
    );
  };

  const PageAi = () => {
    const uses = [{ id: "oyun", label: "Oyun", d: "Yüksek performans, soğutma", icon: Zap }, { id: "foto", label: "Fotoğraf", d: "İyi kamera ve ekran", icon: Camera }, { id: "is", label: "İş", d: "Verim, batarya, taşınabilirlik", icon: Laptop }, { id: "gunluk", label: "Günlük kullanım", d: "Dengeli ve uygun fiyat", icon: Smartphone }];
    const budgets = ["10.000 ₺ altı", "10.000 – 20.000 ₺", "20.000 – 35.000 ₺", "35.000  üstü"];
    const useLabel = uses.find((u) => u.id === aiUse)?.label;
    const wrap = (children) => <div className="anim mt-4 lg:mt-10 mx-auto" style={{ maxWidth: 620 }}>{children}</div>;
    const badge = (s) => <div className="inline-flex items-center gap-2 ai bgaib px-3 py-1.5 rounded-full mb-4"><Sparkles size={14} /><span className="mono" style={{ fontSize: 11, fontWeight: 700 }}>AI Asistan · {s}/2</span></div>;

    if (aiThinking) return wrap(
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <span className="bgai flex items-center justify-center" style={{ width: 60, height: 60, borderRadius: 19, boxShadow: "0 8px 24px rgba(90,91,224,.4)" }}><Sparkles size={28} color="#fff" /></span>
        <div className="inline-flex items-center gap-1.5"><span className="dot bgai" style={{ width: 8, height: 8, borderRadius: 8 }} /><span className="dot bgai" style={{ width: 8, height: 8, borderRadius: 8, animationDelay: ".2s" }} /><span className="dot bgai" style={{ width: 8, height: 8, borderRadius: 8, animationDelay: ".4s" }} /></div>
        <p className="fontui ink2" style={{ fontSize: 14 }}>Sana en uygun ürünleri seçiyorum…</p>
      </div>
    );
    if (aiStep === 0) return wrap(<>
      {badge(1)}<h1 className="fontui ink mb-4" style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em" }}>Ne için kullanacaksın?</h1>
      <div className="grid sm:grid-cols-2 gap-3">{uses.map((u) => { const on = aiUse === u.id; return (
        <button key={u.id} onClick={() => { setAiUse(u.id); setAiStep(1); }} className="press flex items-center gap-3 surface p-4 text-left shadowcard rounded-2xl" style={{ border: on ? "1.5px solid var(--ai)" : "1px solid var(--line)" }}>
          <span className="flex items-center justify-center shrink-0 bgaib ai" style={{ width: 42, height: 42, borderRadius: 13 }}><u.icon size={19} /></span>
          <div><p className="fontui font-bold ink" style={{ fontSize: 15 }}>{u.label}</p><p className="mono ink2" style={{ fontSize: 11 }}>{u.d}</p></div>
        </button> ); })}</div>
    </>);
    if (aiStep === 1) return wrap(<>
      <button onClick={() => setAiStep(0)} className="press inline-flex items-center gap-1 ink2 mb-2" style={{ fontSize: 13 }}><ChevronLeft size={18} /> Geri</button>
      {badge(2)}<h1 className="fontui ink" style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em" }}>Bütçen ne kadar?</h1><p className="fontui ink2 mt-1 mb-4" style={{ fontSize: 13 }}>Amaç: {useLabel}</p>
      <div className="grid sm:grid-cols-2 gap-3">{budgets.map((bd) => { const on = aiBudget === bd; return (
        <button key={bd} onClick={() => { setAiBudget(bd); startAi(); }} className="press flex items-center justify-between surface p-4 shadowcard rounded-2xl" style={{ border: on ? "1.5px solid var(--ai)" : "1px solid var(--line)" }}>
          <span className="mono ink" style={{ fontSize: 15, fontWeight: 600 }}>{bd}</span><span style={{ width: 18, height: 18, borderRadius: 18, border: on ? "5px solid var(--ai)" : "2px solid #D4D8DF" }} />
        </button> ); })}</div>
    </>);
    const picks = PRODUCTS.filter((p) => p.category === "telefon");
    const why = ["Performans ve fiyat dengesi en iyi olan", "Bütçe dostu, günlük kullanımda yeterli", "En yüksek özellikler, üst seviye deneyim"];
    return wrap(<>
      <button onClick={() => { setAiStep(0); setAiUse(null); setAiBudget(null); }} className="press mono ai mb-3" style={{ fontSize: 12, fontWeight: 700 }}>↻ Yeniden başla</button>
      <div className="flex gap-2.5 bgaib p-3 rounded-2xl mb-4" style={{ border: "1px solid rgba(90,91,224,.16)" }}><Sparkles size={16} className="ai shrink-0 mt-0.5" /><p className="fontui ink2" style={{ fontSize: 13 }}><b className="ink">{useLabel}</b> kullanımı ve <b className="ink">{aiBudget}</b> için seçtiğim 3 ürün — performans/fiyat dengesine göre sıraladım.</p></div>
      <div className="flex flex-col gap-3">{picks.map((p, i) => (
        <button key={p.id} onClick={() => openProduct(p.id)} className="press surface p-4 text-left shadowcard rounded-2xl" style={{ border: i === 0 ? "1.5px solid var(--ai)" : "1px solid var(--line)" }}>
          <div className="flex gap-3">
            <div className="relative shrink-0"><Thumb p={p} className="w-16 h-16" radius={15} /><span className="mono absolute flex items-center justify-center" style={{ top: -7, left: -7, width: 24, height: 24, borderRadius: 24, background: i === 0 ? "var(--ai)" : "var(--ink)", color: "var(--bg)", fontWeight: 700, fontSize: 11, border: "2px solid var(--surface)" }}>{i + 1}</span></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2"><p className="fontui font-bold ink truncate" style={{ fontSize: 15 }}>{p.name}</p>{i === 0 && <span className="mono bgai" style={{ color: "#fff", fontSize: 9, padding: "2px 7px", borderRadius: 6, fontWeight: 700 }}>EN İYİ</span>}</div>
              <p className="mono ink2 mt-1" style={{ fontSize: 11 }}>{p.specs["Yonga seti"]} · {p.specs.RAM} · {p.specs.Batarya}</p>
              <p className="mono ink mt-1.5" style={{ fontSize: 17, fontWeight: 600 }}>{tl(cheapestOf(p))}</p>
            </div>
          </div>
          <div className="flex items-start gap-1.5 mt-3 pt-3" style={{ borderTop: "1px solid var(--line2)" }}><Sparkles size={13} className="ai shrink-0 mt-0.5" /><p className="fontui ink2" style={{ fontSize: 12 }}>{why[i]}</p></div>
        </button>
      ))}</div>
    </>);
  };

  const PageFavs = () => {
    const list = PRODUCTS.filter((p) => favs.includes(p.id));
    return (
      <div className="anim mt-4 lg:mt-6">
        <h1 className="fontui font-bold ink mb-4" style={{ fontSize: 22 }}>Favoriler</h1>
        {list.length === 0 ? <Empty icon={Heart} title="Henüz favorin yok" desc="Beğendiğin ürünleri kalbe dokunarak buraya ekle." cta="Ürünlere göz at" onCta={home} />
          : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
      </div>
    );
  };

  const PageNotif = () => {
    const items = [
      { i: TrendingDown, t: "Fiyat düştü", d: "Marka A · A1 Pro · 25.999 → 24.999 ", time: "2 sa önce", unread: true, kind: "save" },
      { i: Package, t: "Yeniden stokta", d: "Marka C · C5 Lite tekrar satışta", time: "Dün", unread: true, kind: "ink" },
      { i: BellRing, t: "Hedef fiyata ulaşıldı", d: "Marka B · B7 alarmın tetiklendi", time: "3 gün önce", unread: false, kind: "ai" },
    ];
    return (
      <div className="anim mt-4 lg:mt-6 mx-auto" style={{ maxWidth: 680 }}>
        <h1 className="fontui font-bold ink mb-4" style={{ fontSize: 22 }}>Bildirimler</h1>
        <div className="surface border bd rounded-2xl overflow-hidden shadowcard">
          {items.map((n, i) => (
            <div key={i} className="flex gap-3 px-4 py-3.5" style={{ borderTop: i ? "1px solid var(--line2)" : "none", background: n.unread ? "var(--surface)" : "var(--surface2)" }}>
              <span className={"flex items-center justify-center shrink-0 " + (n.kind === "save" ? "save bgsaveb" : n.kind === "ai" ? "ai bgaib" : "ink")} style={{ width: 40, height: 40, borderRadius: 13, background: n.kind === "ink" ? "var(--surface2)" : undefined }}><n.i size={18} /></span>
              <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><p className="fontui font-semibold ink" style={{ fontSize: 14 }}>{n.t}</p>{n.unread && <span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--up)" }} />}</div><p className="mono ink2 truncate" style={{ fontSize: 11 }}>{n.d}</p><p className="mono mt-0.5" style={{ fontSize: 10, color: "#B6BCC6" }}>{n.time}</p></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch (page) {
      case "results": return PageResults();
      case "detail": return PageDetail();
      case "compare": return PageCompare();
      case "ai": return PageAi();
      case "favs": return PageFavs();
      case "notif": return PageNotif();
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "privacy": return <PrivacyPage />;
      case "terms": return <TermsPage />;
      default: return PageHome();
    }
  };

  /* ----- ÜST MENÜ (desktop) + mobil başlık ----- */
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
            <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} className="press flex items-center justify-center rounded-xl ink2" style={{ width: 38, height: 38 }} title={theme === "dark" ? "Açık tema" : "Karanlık tema"} aria-label="Tema değiştir">
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button onClick={() => { setAiStep(0); go("ai"); }} className="press hidden lg:inline-flex items-center gap-1.5 bgai text-white rounded-xl px-3 py-2" style={{ fontSize: 13, fontWeight: 600 }}><Sparkles size={16} /> AI Öneri</button>
            <NavIcon icon={Scale} label="Karşılaştır" count={compare.length} onClick={() => go("compare")} />
            <NavIcon icon={Heart} label="Favoriler" count={favs.length} onClick={() => go("favs")} />
            <NavIcon icon={Bell} label="Bildirim" count={2} onClick={() => go("notif")} />
          </div>
        </div>
        {/* mobil arama */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center gap-2 surface2 rounded-xl px-3" style={{ height: 42 }}>
            <Search size={18} style={{ color: "#A4ABB5" }} /><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Ara…" className="fontui flex-1 bg-transparent outline-none ink" style={{ fontSize: 14 }} />
          </div>
        </div>
      </header>

      {/* İÇERİK */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 lg:px-8 pb-24 lg:pb-16">{renderPage()}</main>

      {/* FOOTER (desktop) */}
      <footer className="hidden lg:block border-t bd surface">
        <div className="mx-auto max-w-6xl px-8 py-10 grid grid-cols-4 gap-8">
          <div><div className="flex items-center gap-2 mb-3"><Logo size={32} /><Wordmark size={18} /></div><p className="fontui ink2" style={{ fontSize: 13, maxWidth: 230 }}>Karşılaştır, en uygununu bul. Teknolojide doğru seçim.</p></div>
          <div><p className="fontui font-bold ink mb-2.5" style={{ fontSize: 13 }}>Kategoriler</p>{CATEGORIES.map((c) => <button key={c.id} onClick={() => { setCat(c.id); setSearchTerm(""); go("results"); }} className="press block fontui ink2 py-1" style={{ fontSize: 13 }}>{c.label}</button>)}</div>
          <div><p className="fontui font-bold ink mb-2.5" style={{ fontSize: 13 }}>Keşfet</p><button onClick={() => { setAiStep(0); go("ai"); }} className="press block fontui ink2 py-1" style={{ fontSize: 13 }}>AI Öneri</button><button onClick={() => go("compare")} className="press block fontui ink2 py-1" style={{ fontSize: 13 }}>Karşılaştır</button><button onClick={() => go("favs")} className="press block fontui ink2 py-1" style={{ fontSize: 13 }}>Favoriler</button></div>
          <div>
            <p className="fontui font-bold ink mb-2.5" style={{ fontSize: 13 }}>KıyasBul</p>
            <button onClick={() => go("about")} className="press block fontui ink2 py-1 text-left" style={{ fontSize: 13 }}>Hakkımızda</button>
            <button onClick={() => go("contact")} className="press block fontui ink2 py-1 text-left" style={{ fontSize: 13 }}>İletişim</button>
            <button onClick={() => go("privacy")} className="press block fontui ink2 py-1 text-left" style={{ fontSize: 13 }}>Gizlilik Politikası</button>
            <button onClick={() => go("terms")} className="press block fontui ink2 py-1 text-left" style={{ fontSize: 13 }}>Kullanım Şartları</button>
          </div>
        </div>
        <div className="border-t bd">
          <div className="mx-auto max-w-6xl px-8 py-4">
            <div className="mb-3 p-3 rounded-xl" style={{ background: "rgba(234,179,8,.08)", border: "1px solid rgba(234,179,8,.2)" }}>
              <p className="fontui" style={{ fontSize: 11, color: "#B8960A", lineHeight: 1.5 }}>
                <strong>📢 Şeffaflık:</strong> Bu sitede affiliate linkler bulunmaktadır. Linklere tıklayıp alışveriş yaptığınızda küçük bir komisyon alabiliriz. Bu, sizin ödediğiniz fiyata etki etmez.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="mono" style={{ fontSize: 11, color: "#A4ABB5" }}>© 2026 KıyasBul</p>
              <p className="mono" style={{ fontSize: 11, color: "#C2C7D0" }}>Gösterilen veriler örnektir</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ALT NAV (mobil) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 surface border-t bd flex items-stretch">
        {[{ p: "home", i: Home, l: "Ana Sayfa", fn: home }, { p: "compare", i: Scale, l: "Karşılaştır", fn: () => go("compare"), c: compare.length }, { p: "ai", i: Sparkles, l: "AI", fn: () => { setAiStep(0); go("ai"); }, mid: true }, { p: "favs", i: Heart, l: "Favoriler", fn: () => go("favs"), c: favs.length }, { p: "notif", i: Bell, l: "Bildirim", fn: () => go("notif"), c: 2 }].map((t) => t.mid ? (
          <button key={t.p} onClick={t.fn} className="press relative -mt-4 flex items-center justify-center" style={{ width: 56 }}><span className="bgai flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 18, margin: "0 auto", boxShadow: "0 6px 16px rgba(90,91,224,.4)", border: "3px solid #fff" }}><Sparkles size={22} color="#fff" /></span></button>
        ) : (
          <button key={t.p} onClick={t.fn} className="press relative flex-1 flex flex-col items-center gap-1 py-2" style={{ color: page === t.p ? "var(--ink)" : "#A8AEB8" }}>
            <t.i size={21} strokeWidth={page === t.p ? 2.3 : 1.7} />{t.c > 0 && <span className="mono absolute" style={{ top: 4, right: "28%", minWidth: 15, height: 15, borderRadius: 15, background: "var(--up)", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.c}</span>}<span className="fontui" style={{ fontSize: 10, fontWeight: page === t.p ? 700 : 500 }}>{t.l}</span>
          </button>
        ))}
      </nav>

      {/* YUKARI ÇIK */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="press hidden lg:flex items-center justify-center fixed z-40 surface shadowcard anim" style={{ right: 24, bottom: 24, width: 46, height: 46, borderRadius: 23, border: "1px solid var(--line)", color: "var(--ink)" }} title="Yukarı çık" aria-label="Yukarı çık"><ArrowUp size={20} /></button>
      )}

      {/* MOBİL FİLTRE SHEET */}
      {sheetOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex items-end" style={{ background: "rgba(16,21,27,.45)" }} onClick={() => setSheetOpen(false)}>
          <div className="w-full surface p-5 anim" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, maxHeight: "80%", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><p className="fontui font-bold ink" style={{ fontSize: 16 }}>Filtrele</p><button onClick={() => setSheetOpen(false)} className="press ink2"><X size={20} /></button></div>
            {Filters()}
            <button onClick={() => setSheetOpen(false)} className="press w-full mt-5 btn-primary fontui font-semibold rounded-xl py-3" style={{ fontSize: 14 }}>{results.length} sonucu göster</button>
          </div>
        </div>
      )}

      {/* FİYAT ALARMI MODAL */}
      {alarm && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4" style={{ background: "rgba(16,21,27,.5)" }} onClick={() => setAlarm(null)}>
          <div className="w-full surface anim" style={{ maxWidth: 440, borderTopLeftRadius: 22, borderTopRightRadius: 22, borderRadius: isDesktop ? 22 : undefined }} onClick={(e) => e.stopPropagation()}>
            {alarmDone ? (
              <div className="p-8 flex flex-col items-center text-center gap-3">
                <span className="bgsave flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: 18, boxShadow: "0 8px 22px rgba(5,150,105,.35)" }}><Check size={28} color="#fff" /></span>
                <p className="fontui ink" style={{ fontSize: 17, fontWeight: 800 }}>Alarm kuruldu</p>
                <p className="fontui ink2" style={{ fontSize: 13, maxWidth: 280 }}><b className="ink">{alarm.name}</b> fiyatı <b className="mono ink">{tl(Number(alarmPrice) || 0)}</b> altına düşünce haber vereceğiz.</p>
                <button onClick={() => setAlarm(null)} className="press mt-2 btn-primary fontui font-semibold rounded-xl px-6 py-2.5" style={{ fontSize: 14 }}>Tamam</button>
              </div>
            ) : (
              <div className="p-5">
                <div className="flex items-center justify-between mb-3"><p className="fontui font-bold ink" style={{ fontSize: 16 }}>Fiyat alarmı</p><button onClick={() => setAlarm(null)} className="press ink2"><X size={20} /></button></div>
                <div className="flex gap-3 items-center surface2 border bd rounded-xl p-3 mb-4"><Thumb p={alarm} className="w-11 h-11" radius={12} /><div><p className="fontui font-semibold ink" style={{ fontSize: 14 }}>{alarm.name}</p><p className="mono ink2" style={{ fontSize: 11 }}>Şu an: {tl(cheapestOf(alarm))}</p></div></div>
                <p className="mono mb-1.5" style={{ fontSize: 10, color: "#9AA1AC", letterSpacing: ".04em" }}>HEDEF FİYAT</p>
                <div className="flex items-center border bd rounded-xl px-3 mb-4" style={{ height: 52 }}><input value={alarmPrice} onChange={(e) => setAlarmPrice(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className="mono flex-1 ink bg-transparent outline-none" style={{ fontSize: 20, fontWeight: 600 }} /><span className="mono ink2" style={{ fontSize: 16 }}>₺</span></div>
                <p className="mono mb-1.5" style={{ fontSize: 10, color: "#9AA1AC", letterSpacing: ".04em" }}>BİLDİRİM KANALI</p>
                <div className="flex flex-col gap-2 mb-4">{[{ k: "push", i: BellRing, t: "Push bildirim" }, { k: "mail", i: Mail, t: "E-posta" }, { k: "sms", i: MessageSquare, t: "SMS" }].map((c) => { const on = channels[c.k]; return (
                  <button key={c.k} onClick={() => setChannels((s) => ({ ...s, [c.k]: !s[c.k] }))} className="press flex items-center justify-between border bd rounded-xl px-3.5" style={{ height: 50 }}>
                    <span className="fontui inline-flex items-center gap-2.5 ink" style={{ fontSize: 14 }}><c.i size={16} style={{ color: "#AEB4BE" }} />{c.t}</span>
                    <span style={{ width: 42, height: 25, borderRadius: 25, padding: 3, display: "flex", justifyContent: on ? "flex-end" : "flex-start", background: on ? "var(--ink)" : "#DCDFE4", transition: "all .2s" }}><span style={{ width: 19, height: 19, borderRadius: 19, background: "#fff" }} /></span>
                  </button> ); })}</div>
                <button onClick={() => setAlarmDone(true)} className="press w-full btn-primary fontui font-semibold rounded-xl py-3" style={{ fontSize: 15 }}>Alarmı kur</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}