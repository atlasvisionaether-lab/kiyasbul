# KıyasBul

Teknolojik ürünleri karşılaştır, en uygun fiyatı bul.
Bu paket, uygulamanın **mobil-first ön yüzü** (UI kabuğu). Şu an **örnek (mock) veriyle** çalışır — `src/App.jsx` içindeki `PRODUCTS` dizisi. Gerçek veri bağlanınca aynı arayüz çalışmaya devam eder.

Stack: **Vite + React 18 + Tailwind CSS + lucide-react**.

---

## 1. Çalıştırma (yerel)

Gereksinim: Node.js 18+ (20 önerilir).

```bash
npm install
npm run dev
```

Tarayıcıda: `http://localhost:5173`

Sağ alttaki ızgara butonundan tüm ekranları gezebilirsin (splash, onboarding, ana sayfa, arama, detay, karşılaştırma, AI öneri, alarm, favoriler, bildirim, boş/hata durumları).

## 2. Production build

```bash
npm run build      # çıktı: dist/
npm run preview    # dist/ önizlemesi
```

---

## 3. Vercel'e deploy

### Yol A — GitHub üzerinden (önerilen)
1. Yeni bir GitHub reposu aç: `kiyasbul`
2. Bu klasörü push et:
   ```bash
   git init
   git add .
   git commit -m "KıyasBul UI"
   git branch -M main
   git remote add origin https://github.com/KULLANICI/kiyasbul.git
   git push -u origin main
   ```
3. [vercel.com](https://vercel.com) → **Add New → Project** → repoyu **Import**
4. Vercel framework'ü otomatik **Vite** algılar:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Deploy** → birkaç saniyede `*.vercel.app` adresinde yayında.

### Yol B — Vercel CLI
```bash
npm i -g vercel
vercel          # ilk deploy (preview)
vercel --prod   # production
```

---

## 4. Domain bağlama (kiyasbul.com — Namecheap)

1. Önce **kiyasbul.com** / **kiyasbul.com.tr** kaydını al (boş olduğunu doğrula).
2. Vercel → Proje → **Settings → Domains** → `kiyasbul.com` ekle.
3. Vercel sana DNS kayıtlarını gösterir. Namecheap → Domain → **Advanced DNS**'te uygula. Genelde:
   - Kök alan: **A** kaydı → Vercel'in verdiği IP (ör. `76.76.21.21`)
   - `www`: **CNAME** → `cname.vercel-dns.com`
   - **Vercel ekranında ne yazıyorsa onu uygula** (zaman zaman değişir).
4. DNS yayılınca (genelde dakikalar) HTTPS otomatik gelir.

> Bu, atlasasistan.com'da kullandığın Vercel + Namecheap akışının aynısı.

---

## 5. Proje yapısı

```
kiyasbul/
├─ index.html            # giriş HTML
├─ src/
│  ├─ main.jsx           # React girişi
│  ├─ App.jsx            # tüm ekranlar + mantık + örnek veri (PRODUCTS)
│  └─ index.css          # Tailwind + KıyasBul tema tokenları (renk/font)
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
└─ package.json
```

Nereyi düzenlersin:
- **Veri:** `src/App.jsx` → `PRODUCTS` dizisi (ürün, spec, satıcı, fiyat geçmişi).
- **Ekran/mantık:** `src/App.jsx`.
- **Tema (renk/font/ton):** `src/index.css` (`:root` değişkenleri).

---

## 6. Sıradaki gerçek adım (önemli)

Bu kabuk hazır; uygulamanın asıl değeri **arkadaki veride**. UI, `PRODUCTS` yapısını bir API'den beslemeye hazır. Üretim için sıradaki iş:
- **Spec verisi** kaynağı (tek dikeyle başla — ör. sadece telefon),
- **Canlı fiyat** (mağaza affiliate API'leri / yapılandırılmış besleme),
- bunları sunan küçük bir **backend** + `PRODUCTS`'ı API'ye bağlama.

Hazır olduğunda bu mimariyi birlikte kurabiliriz.
