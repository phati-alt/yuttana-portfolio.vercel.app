# Handoff — yuttana-portfolio

เอกสารส่งต่องานสำหรับ Claude Code บนเครื่องอื่น อ่านไฟล์นี้ก่อนเริ่มงาน
อัปเดตล่าสุด 2026-09-29 (ล่าสุดที่ commit `25694d4` — push ขึ้น GitHub แล้ว)

> ไฟล์นี้รวม "ความรู้ที่ไม่อยู่ในโค้ด" ไว้ด้วย เพราะ memory ของ Claude บนเครื่องเดิม
> ไม่ได้ติดมากับ repo — ส่วน "กฎการทำงาน" ด้านล่างสำคัญที่สุด

---

## 1. โปรเจกต์นี้คืออะไร

พอร์ตโฟลิโอส่วนตัวของ **Mick Yuttana Pati** — UX/UI & Product Designer (Bangkok)
เว็บจริงที่ deploy อยู่ → **push ขึ้น `main` = ขึ้นเว็บจริงทันที**

- เว็บจริง: `https://yuttana-portfolio.vercel.app`
- Repo: `https://github.com/phati-alt/yuttana-portfolio.vercel.app`
  (เดิมชื่อ `webport-portfolio` — เปลี่ยนชื่อ repo และโดเมน Vercel เมื่อ 2026-09-27
  ถ้า remote ในเครื่องยังเป็น URL เก่า ให้รัน
  `git remote set-url origin https://github.com/phati-alt/yuttana-portfolio.vercel.app.git`
  — GitHub redirect ให้อัตโนมัติอยู่แล้วถ้ายังไม่ได้แก้ ไม่ใช่เรื่องด่วน)
- Title/meta ทุกหน้าตัดคำว่า "Mick" ออกแล้ว (เหลือแค่ "Yuttana") ให้ตรงกับโดเมนใหม่ —
  แก้เฉพาะ `<title>` และ `<meta name="description">` เท่านั้น โลโก้ header/footer/alt/hero copy
  ยังเป็น "Mick Yuttana" เหมือนเดิมโดยตั้งใจ (ผู้ใช้บอกให้ตัดเฉพาะจุดที่เป็น "ลิงก์"/แสดงตอนแชร์)
- Static site ล้วน: HTML + CSS + vanilla JS ไม่มี build tool / npm
- Library จาก CDN: GSAP 3.13 (+ ScrollTrigger, SplitText), Lenis (smooth scroll)
- Font: Switzer (body), Chillax 600 (hero wordmark เท่านั้น), Noto Sans Thai — จาก Fontshare / Google Fonts
- สองภาษา EN/TH (`js/i18n.js`) + dark mode (`data-theme` บน `<html>`)

### รัน local

```bash
powershell -ExecutionPolicy Bypass -File serve.ps1
```

เปิด `http://localhost:8123/` (มี `.claude/launch.json` ชื่อ `portfolio` อยู่แล้ว ถ้าใช้ preview tool)

---

## 2. โครงสร้างไฟล์

| Path | หน้าที่ |
|---|---|
| `index.html` | หน้า Home ทั้งหมด (section ด้านล่าง) |
| `css/tokens.css` | **ทุก** สี/ฟอนต์/spacing/motion — ห้าม hardcode ค่าใน `style.css` |
| `css/style.css` | layout + components ของทั้งเว็บ (~2000 บรรทัด) — **line ending เป็น CRLF** ถ้าแก้ด้วย script ต้อง normalize ก่อน replace |
| `css/case-page.css` | **ดีไซน์หน้า case** (prefix `gp-`) ใช้โดย government-project, platform, ev-charger, custom-dashboard และ modal ของ More Projects (`css/insight-panels.css` ดีไซน์เก่า ถูกลบแล้ว) |
| `js/main.js` | animation + interaction ทั้งหมด (`init*` functions, เรียกใน `boot()`) |
| `js/i18n.js` | copy ทั้งเว็บ EN/TH (`data-i18n="key"`) — ห้ามใส่ copy เฉพาะ case ที่นี่ |
| `js/cases-index.js` | **GENERATED** — label ของการ์ด case บนหน้า Home |
| `content/cases.csv` | แหล่งข้อมูล copy ของ case (slug, key, en, th) — รวม `cardMeta` / `cardOutcome` ที่การ์ดหน้า Home ใช้ |
| `tools/build-cases.ps1` | สร้าง `cases-index.js` (และหน้า case ที่ไม่ใช่ bespoke) จาก CSV |
| `work/<slug>/` | หน้า case study แต่ละตัว (index.html, data.js, assets/) |
| `work/more-projects/` | หน้า More Projects — hand-written, มี filter (Platform/Mobile/Dashboard/Website) + modal ที่ใช้ดีไซน์เดียวกับหน้า case (ดูข้อ 4) |
| `work/README.md` | คู่มือ case pages: bespoke ทั้ง 4, build ทำอะไรบ้าง, วิธีเพิ่ม/ลบ case, NEXT chain |
| `vercel.json` | redirect ถาวร `/index.html` → `/` และ `/:path+/index.html` → `/:path+/` (ทดสอบบน local ไม่ได้ — serve.ps1 ไม่อ่านไฟล์นี้) |
| `design.md` | design system อ้างอิง (Visa) ที่ tokens ดึงสีมาใช้ |
| `.vercelignore` | ไฟล์ dev-only ที่ไม่ deploy ขึ้นเว็บจริง (HANDOFF, design.md, content/, tools/, _template ฯลฯ) — **ถ้าเพิ่มไฟล์ที่เว็บต้องโหลดจริงในโฟลเดอร์เหล่านี้ ต้องเอาออกจากลิสต์ก่อน** |

### Section บนหน้า Home (ตามลำดับ)

1. **Header** — โลโก้ avatar + nav capsule (Work/About/Services/Process/Experience/Contact/**Resume ↗**) + ปุ่มภาษา + theme toggle
   - ต่ำกว่า **1260px** เป็นเมนู burger (`HEADER_BURGER_MAX` ใน main.js + `@media (max-width: 1260px)` ใน style.css — ต้องแก้คู่กัน); ช่วง 1261–1560px ลด padding ลิงก์เหลือ `.7rem`
   - header แน่นมาก: ที่ 1265px เมนูห่างชื่อแค่ ~6px — **ถ้าเพิ่ม/ขยายลิงก์ในเมนู ต้องวัดใหม่ทั้ง EN และ TH** (วัดช่องว่างระหว่าง `.header__nav` กับ `.header__logo` / `.header__actions` ใน iframe หลายความกว้าง)
   - ลิงก์กลับหน้าหลักจากหน้าอื่นเขียนเป็น `../../#section` — **ห้ามใช้ `../../index.html#...`** (ทำให้ URL มี `/index.html`)
2. **Banner (hero)** — wordmark ใหญ่ "Mick UX/UI Designer", eyebrow "Available for freelance work", CTA "Get in touch" ปุ่มเดียว, วง scroll-down
3. **Intro** — manifesto, reveal ทีละบรรทัดตาม scroll
4. **Cases** (`#work`) — การ์ด **5 ใบ** (ไม่มีการ์ด "View more projects" แล้ว — ซ่อน More Projects ไว้) เลื่อนแนวนอนแบบ sticky + scrub (`initCasesScroll`)
   - รูป cover **4:3 (640 × 480)**
   - ข้อความ (meta / ชื่อ / บรรทัดผลลัพธ์) **อยู่บนรูป ขึ้นตอน hover** — บนจอสัมผัส (`hover: none`) ย้ายไป**ใต้รูป**แสดงตลอด
   - ข้อความมาจาก `cardMeta` / `title` / `cardOutcome` ใน CSV → build → `js/cases-index.js`
5. **Band** (พื้น navy `#020f27`, dark mode `#1a1f72`) เปิดด้วยวงกลม iris (`.band__circle`)
   - About: pretitle "About me" (ขนาดเล็กแบบ section อื่น — เดิมตัวใหญ่ซ้อนกับ h2), h2, **ชิป LinkedIn** (icon + text ทรงเดียวกับชิป Toolbox, `.about__social-btn`), bio 2 ย่อหน้า, checklist, ตัวเลข 4 ช่อง (4+, 40%, 15+, +30%); รูปมีป้าย pill **"Based in Bangkok, Thailand"** (TH: ประจำอยู่ที่กรุงเทพฯ) สีการ์ด Services + หมุดฟ้าอ่อน (เดิมเป็นป้ายเหลือง "4+ Years" ซึ่งซ้ำกับตัวเลข) — ไม่มีปุ่ม Resume
     - icon LinkedIn มาจาก Lucide **0.460** (Lucide 1.x และ Simple Icons ไม่มีโลโก้ LinkedIn แล้ว)
   - Services "From strategy to handover": stack cards 5 ใบ (sticky) — **สีเดียวกันหมด** กรมท่าสว่างกว่าแถบหนึ่งระดับ ตัวขาว เลขฟ้าอ่อน กว้างสูงสุด 1120px
   - `.band` ใช้ `clip-path: inset(-400vw 0 0 0)` ตัดวงกลมเฉพาะขอบล่าง — **ห้ามเปลี่ยนเป็น `overflow: clip/hidden`** (วงกลมด้านบนวาดอยู่เหนือกรอบ .band เพราะ margin collapse → จะหายทั้งวง และ hidden ทำ sticky พัง)
6. **Process** (`#process`) — rail 4 ขั้น Discover→Define→Design→Deliver + flow notes + ลูกศรวนกลับ
7. **Toolbox** — หัว section แบบเดียวกับ Process (pretitle / "Tools I work with" / คำอธิบาย) + **ชิป icon 2 แถว** วิ่งสวนกัน 40px/s กลับทิศตาม scroll
   - icon: SVG sprite ใน index.html (Simple Icons CC0 + Lucide สำหรับ FigJam, Adobe XD, Slack, Design Systems, Usability Testing)
8. **Experience & Education** — timeline 4 จุด (ไม่มีปุ่ม Resume):
   - 01 UX/UI Designer, Swift Dynamics (Nov 2022–Present, Full time) — หัวข้อย่อย 3 กลุ่ม
   - 02 **UX/UI Designer**, Yes Web Design Studio (Apr–Aug 2022, Full time) — 3 bullets
   - 03 UI Designer (Internship), Online Asset (Nov 2021–Mar 2022) — 3 bullets: **DR.in for Doctor** (ใช้ชื่อนี้ทุกที่), SUSCO.co.th, UX case study **MorPrompt / หมอพร้อม**
   - 04 Bachelor of Science, Computer Science, University of Phayao — ป้ายวันที่ **Jun 2020 – Oct 2021** (ช่วง Senior Project ตามที่ผู้ใช้เลือก ไม่ใช่ 2017–2022) + หัวข้อย่อย "Senior Project — Rental Camera Service Website" + 4 bullets
   - ระยะเวลาคำนวณอัตโนมัติ (`initJobDurations` จาก `data-start`/`data-end`); หัวข้อย่อย (`.job__group h4`) เป็นตัวพิมพ์ใหญ่ **สี ink** (ไม่ใช่ muted)
9. **Contact** — อีเมล, ที่อยู่, LinkedIn + ปุ่ม **Download Resume**
10. **Footer** — Currently focused on, nav, อีเมล, LinkedIn

### Design tokens หลัก

- พื้น `#ffffff` / `#f1f2f6`, ตัวอักษร `#1a1a1a`, muted `#656565`
- Primary (CTA/link) `#1434cb` — Visa Brand Blue; dark mode ใช้ `#3163e9`
- Band navy `#020f27` (ไม่เปลี่ยนตาม theme)
- Wordmark `#20317e`
- Radius แบบ fluid `--radius: clamp(15px, 1.6vw, 30px)`, ปุ่มเป็น pill

---

## 3. กฎการทำงาน (สำคัญ — มาจาก feedback ของผู้ใช้)

1. **ห้าม push เองเด็ดขาด** push ได้เฉพาะเมื่อข้อความ *ล่าสุด* ของผู้ใช้สั่ง "push" ตรงๆ
   การอนุญาตครั้งก่อนไม่นับต่อ, "แก้เลย" ≠ push
   → commit ในเครื่อง แล้วขอให้ผู้ใช้ทดสอบก่อนทุกครั้ง
2. **Bug ที่เกี่ยวกับ scroll/animation**: browser pane ของ Claude (`document.hidden` = true)
   ทำให้ rAF / GSAP ticker / Lenis ไม่เดิน → เห็นผลไม่ตรงความจริง
   - ขอ DevTools screenshot / computed styles จากผู้ใช้ **ตั้งแต่ต้น** แทนการเดาหลายรอบ
   - ตรวจ state ด้วย `window.scrollTo` + `ScrollTrigger.update()` + `getBoundingClientRect()`
   - บอกตรงๆ ว่า animation จริง "ยังไม่ได้ verify"
3. **Modal ว่างเปล่าหลังคลิก** (More Projects) = paint lag ของ pane ไม่ใช่ bug — ยืนยันแล้วว่า
   `render()` ใน `js/main.js` เซ็ต `textContent` synchronous ก่อนเรียก `showModal()` เสมอ,
   `get_page_text` อ่าน DOM ตรงตอนนั้นก็เจอข้อมูลครบแล้ว, และ `computer{screenshot}` เคย error
   ตรงๆ ว่า "window is minimized or hidden, which can stop the page from drawing" — เช็กด้วย
   `get_page_text` ก่อนเชื่อ screenshot ทุกครั้งที่เจอ modal/panel ว่างหลัง trigger เปิด
4. **เนื้อหาต้องเป็นของจริง** ห้ามแต่งตัวเลข/research ขึ้นเอง
   ส่วนที่ source เขียนว่า "✨ แนะนำเพิ่ม" หรือ "estimated" = ยังไม่ยืนยัน อย่าเผยแพร่เป็นข้อเท็จจริง
5. ถ้าไม่แน่ใจ **ถามผู้ใช้ก่อน** (ผู้ใช้ตอบเป็นภาษาไทย)

---

## 4. สถานะปัจจุบัน

- **Case บนหน้า Home 5 ตัว** (ลำดับ): `government-project`, `platform`, `ev-charger`, `custom-dashboard`, **`jst-group`**
- **JST Group กลับมาเป็น case บนหน้า Home** (2026-09-29) ที่ **`/work/jst-group/`** ดีไซน์ `.gp-*` เหมือนอีก 4 case
  - ประวัติ: เดิมอยู่ที่ `work/wordpress-website/` → ถูกลบแล้วย้ายเข้า modal More Projects → ผู้ใช้ขอเอากลับมาหน้าหลัก ข้อความทุกคำเหมือนเดิม (data.js สร้างจาก entry `jst-group` ใน `work/more-projects/data.js` ซึ่งยังอยู่)
  - `vercel.json` redirect `/work/wordpress-website/*` → `/work/jst-group/`
  - บรรทัดผลลัพธ์บนการ์ด (`cardOutcome` ใน CSV) **ผม (Claude) ร่างจากข้อมูลเดิม ผู้ใช้ยังไม่ได้ยืนยันคำ**: "Designed solo in under a month: 4 pages across 3 breakpoints, plus an interactive prototype."
- **More Projects ถูกซ่อน** (ผู้ใช้ขอ 2026-09-29): การ์ด "View more projects" ออกจากหน้า Home (ดู comment ใน #casesGrid วิธีเอากลับ), หน้า `/work/more-projects/` ยังอยู่แต่ไม่มีลิงก์ไปถึง + `<meta name="robots" content="noindex">` → **Facility Management และ DR.in for Doctor ไม่ปรากฏบนเว็บตอนนี้**
  - modal ยังรองรับ `data-mp-optional` (section เสริมเฉพาะ entry ที่มี key) — ใช้กับ jst-group ใน MP
- **ทั้ง 5 หน้า case เป็น bespoke** (อยู่ใน `$customSlugs` ของ `build-cases.ps1`) → แก้ `work/<slug>/index.html` และ `data.js` ตรงๆ ได้ แต่ build ยังสร้าง `js/cases-index.js` จาก CSV
- modal More Projects กว้างสูงสุด 1440px คอลัมน์เนื้อหา 1160px (`.mp-modal .gp` ใน style.css)
- **ดีไซน์หน้า case**: 5 หน้าบน Home ใช้ `css/case-page.css` (`.gp-*`) — คอลัมน์ 960px, การ์ดเทาแบน, สีเน้นเดียว
  - สีเน้น default = น้ำเงินอ่อนของเว็บ; government-project override เป็นฟ้าน้ำใน `case.css` ของตัวเอง
  - platform มี `case.css` สำหรับ user types / framework / business impact
- NEXT chain (เขียนมือ ต้องตรงกับลำดับการ์ดหน้า Home): government-project → platform → ev-charger → custom-dashboard → jst-group → government-project
- เนื้อหาทั้ง 4 case เป็นของจริง; ยกเว้น Reflection ของ custom-dashboard (draft ใน comment)
- **ยังไม่ยืนยัน**: `timeline` ของ government-project, ev-charger, custom-dashboard (ยืนยันแล้วแค่ platform 2023–present และ JST < 1 เดือน)
- **More Projects: 9 รายการ จริง 3** (Facility Management Platform, DR.in for Doctor, JST Group) — **ยัง mockup 6**: `gateway-alerting`, `forest-permit`, `water-quality-aot`, `vaccine-record`, `purchase-request`, `num-eiang` (ดู `audit: 'mockup'` ใน `work/more-projects/data.js`) รอข้อมูลจริงจากผู้ใช้ทีละอัน (title/role/year/platform/problem/process/quote/solution/stat1+label/stat2+label ทั้ง EN และ TH)
  - custom-dashboard กับ gateway/device alerting **ไม่ใช่งานซ้ำ** — ผู้ใช้ยืนยันแล้ว ไม่ต้องถามอีก
  - การ์ด More Projects ขนาดเท่าการ์ดหน้า Home (640 × 480) และ hover แบบเดียวกัน
- **Screenshot จริงของ case pages ยังไม่มี** — gallery ในหน้า case ยังเป็นกล่องเทา "Screen 1/2/3..." (caption เขียนรอไว้แล้วในแต่ละ `data.js`) รอไฟล์รูปจริงที่ `work/<slug>/assets/screen-N.png` แล้วแทน `.media-block` ด้วย `<img>`
- ระบบ audit-badge ปิดอยู่ (`$showDataStatus = $false`) — โค้ด `initDataStatus` ยังอยู่ ถ้าไม่ใช้อีกแล้วลบทิ้งได้

### ตรวจเว็บเมื่อ 2026-09-29 — แก้แล้ว (commit `25694d4`)
- **Mockup ใน More Projects ถูกซ่อนแล้ว**: entry ที่ `audit: 'mockup'` (6 อัน เนื้อหาแต่ง บางอันใช้ชื่อหน่วยงานจริง เช่น กรมป่าไม้, AOT) ถูก `initMoreProjects` ลบออกจากหน้า + การ์ดมี `hidden` ใน HTML → **หน้าเว็บเหลือ 3 การ์ดจริง** (Facility, DR.in, JST) และปุ่มกรองที่ไม่มีการ์ด (Dashboard) ถูกเอาออกอัตโนมัติ
  - **จะเปิด entry ไหน**: ใส่เนื้อหาจริง → เปลี่ยนเป็น `audit: 'real'` → ลบ `hidden` จากการ์ดใน `work/more-projects/index.html`
- **แถบ/จุด audit ปิดแล้ว**: `$showDataStatus = $false` ใน build-cases.ps1 → `cases-index.js` ไม่มี `_audit` แล้ว
- **Share preview**: ทุกหน้ามี canonical + Open Graph + `twitter:card`; หน้า case ใช้ cover ของตัวเอง, Home/More Projects ใช้ `assets/og-image.png` (1200×630 สร้างด้วย System.Drawing — script อยู่ใน scratchpad ของ session ถ้าจะแก้รูปให้สร้างใหม่ หรือทำใน Figma)
- **Footer**: บรรทัด "Available for: Freelance & Full-time" (TH: พร้อมรับงาน: ฟรีแลนซ์ และงานประจำ) + จุดกะพริบแบบ hero ทุกหน้า
- คอมเมนต์ในโค้ดที่ล้าสมัยแก้แล้ว (more-projects header/data.js, การ์ด More บน Home, header comment หน้า case, work/README.md, `$titleTag` ใน build ตัด "Mick")
- ไม่มีลิงก์เสีย ไม่มีข้อความ i18n ว่าง

### ค้างรอข้อมูลจากผู้ใช้
1. **Resume PDF เวอร์ชันใหม่** — ไฟล์อยู่ที่ `assets/Yuttana-Pati-Resume.pdf` (ใช้งานได้แล้วบนเว็บจริง ลิงก์จาก header ทุกหน้า + Contact; เปิดแท็บใหม่) แต่เนื้อหายังเป็นชุดเก่า ผู้ใช้จะแก้แล้วส่งไฟล์ใหม่มา — **วางทับชื่อเดิมได้เลย ไม่ต้องแก้โค้ด** จุดที่แจ้งผู้ใช้ไว้:
   - มีเบอร์โทรส่วนตัว (เว็บไม่มี) — แนะนำเอาออกในเวอร์ชันที่ขึ้นเว็บ
   - Summary ยังเขียน "3+ years" (เว็บเป็น 4+)
   - LinkedIn ใน PDF เป็น `linkedin.com/in/yuttana-phati` แต่เว็บใช้ `…/yuttana-phati-5566042b5`
   - Portfolio ใน PDF ชี้ Figma ยังไม่มีลิงก์เว็บนี้
   - ข้อความ Experience ยังเก่า: "UI Designer" ที่ Yes Web, "DR.in (medical app)", ไม่มี MorPrompt, Education 2017–2022
   - ก่อนเผยแพร่ไฟล์ใหม่ อ่านไฟล์ทั้งหมดก่อนทุกครั้ง
2. Screenshot จริงของแต่ละ case — ตอนนี้เป็นกล่องเทา "Screen N" รวม **19 ช่อง**: government 3, platform 3, ev-charger 6, custom-dashboard 3, JST (ใน modal) 4 — และข้อมูลจริงของ More Projects 6 รายการ (ดูด้านบน)
3. (ไม่ด่วน) ปีของงาน JST Group — ตอนนี้ใช้ Timeline แทนได้แล้ว

### Build (เมื่อแก้ `content/cases.csv`)

```bash
powershell -ExecutionPolicy Bypass -File tools/build-cases.ps1
```

---

## 5. อ้างอิงดีไซน์ — chonladda-portfolio.framer.website

ผู้ใช้ใช้ https://chonladda-portfolio.framer.website/ เป็นแรงบันดาลใจ (Framer, minimal, การ์ดเทา `#f7f7f7`, ชิป pill)
**ใช้เป็นแรงบันดาลใจเชิงโครงสร้างเท่านั้น ห้ามลอกข้อความ/เลย์เอาต์ของเขา**

### ทำเสร็จแล้ว (push แล้ว)
- หน้า case ทั้ง 4 ใช้โครงแบบหน้า ooca case ของเขา (`css/case-page.css`)
- modal More Projects ใช้ดีไซน์เดียวกับหน้า case (JST เป็น case เต็มใน modal)
- Toolbox เป็นชิป icon + หัว section มาตรฐาน
- การ์ดโปรเจกต์: meta + บรรทัดผลลัพธ์ — ผู้ใช้เลือกให้**อยู่บนรูปและขึ้นตอน hover** (เคยลองวางใต้รูปแบบของเขาแล้ว ผู้ใช้ไม่เอา)
- Experience: ระยะเวลา + ประเภทงาน + Education
- About: pretitle, ชิป LinkedIn, ป้ายสถานที่แทนป้าย "4+" (จากการเทียบ section About me ของเขา — ไม่เอา: เปลี่ยนหัวข้อเป็น "Hi, I'm…", ย่อ bio, ลดตัวเลขเหลือ 2)
- Resume: ลิงก์ใน header ทุกหน้า + ปุ่มใน Contact (ผู้ใช้บอกว่า 3 จุดเยอะเกิน — **อย่าเพิ่มจุดอื่นอีก** เช่น About/Experience/Hero)

### ไอเดียที่ยังไม่ได้ทำ (รอผู้ใช้เลือก)
| # | งาน | หมายเหตุ |
|---|---|---|
| 1 | **CTA ที่สอง + แถบโลโก้ลูกค้าใน Hero** | ปุ่มรอง (LinkedIn / View work) + โลโก้สีเทา (กรมทรัพยากรน้ำบาดาล, JST, Ananda/Gulf/CHPP ที่ NDA อนุญาตแล้ว) — **ต้องถามเรื่องสิทธิ์ใช้โลโก้ + ไฟล์โลโก้** |
| 2 | **ปุ่ม "Get in touch" ถาวรใน nav** | header เต็มแล้ว (มี Resume เพิ่ม, เหลือ ~6px ที่ 1265px) — ถ้าจะเพิ่มต้องขยับ `HEADER_BURGER_MAX` + @media 1260px ขึ้นอีก หรือเอาลิงก์อื่นออก |
| 3 | **Footer: availability + socials** | เพิ่ม "Available for: Freelance & Full-time" + Behance/Dribbble (**ถามว่ามี account ไหน**) |
| 4 | **การ์ด bento แบบภาพบน-ข้อความล่าง** (จากหน้า About ของเขา) | ถ้าอยากย่อ Services/Toolbox ให้กระชับ — ยังไม่จำเป็น |
| 5 | **บรรทัดผลลัพธ์บนการ์ด More Projects** | ตอนนี้มีแค่ meta + ชื่อ ต้องร่างจากข้อมูลจริงให้ผู้ใช้ตรวจก่อน |

**ไม่แนะนำ** (คุยกับผู้ใช้แล้ว): เปลี่ยน Process เป็นการ์ด 3 ใบ, เปลี่ยนเป็นขาว-ดำล้วน, แยกหน้า About, เปลี่ยน bullet ที่มีตัวเลขเป็นย่อหน้า, เปลี่ยน Cases เป็นคอลัมน์เดียว

ทุกข้อที่เพิ่ม copy ต้องมีทั้ง EN และ TH ใน `js/i18n.js` (หรือใน CSV สำหรับการ์ด case)

---

## 6. ข้อสังเกตที่เจอระหว่างทาง (ยังไม่แก้)

- **Browser pane ของ Claude วาดหน้าจอไม่ได้บ่อยมาก** (screenshot ขาว/timeout) — ตรวจด้วย iframe same-origin ใน `javascript_tool` วัด `getBoundingClientRect` / computed style แทน และบอกผู้ใช้ตรงๆ ว่าภาพจริงยังไม่ได้เห็น; `resize_window` preset mobile จำลอง `hover: none` ได้และมักแคปหน้าจอได้
- **ตรวจหลายขนาดจอเสมอ** โดยเฉพาะจอกว้าง 2560px — บั๊กวงกลมของแถบ navy โผล่เฉพาะจอกว้าง (1440 ไม่เห็น)
- เชลล์ Bash ในบาง session หา `git`/`grep` ไม่เจอ (PATH) — ใช้ PowerShell หรือ Grep tool แทน; git push ใน PowerShell 5 คืน exit code 255 เพราะ stderr แต่ push สำเร็จ (เช็กด้วย `git status -sb`)
- Preview server: `.claude/launch.json` ตั้ง `autoPort: true` — ถ้า 8123 ถูกใช้อยู่ (serve.ps1 ค้าง หรือเพิ่งปิดแล้วเปิดใหม่) จะได้ port สุ่มแทน ผู้ใช้เคยถามว่าทำไม URL เปลี่ยน — บอก URL ที่ได้จริงทุกครั้ง
- เช็กไฟล์ resume บนเว็บจริง: `Invoke-WebRequest https://yuttana-portfolio.vercel.app/assets/Yuttana-Pati-Resume.pdf -Method Head` ต้องได้ 200 `application/pdf`
- เช็ก redirect เว็บจริง: `Invoke-WebRequest https://yuttana-portfolio.vercel.app/index.html -MaximumRedirection 0` ต้องได้ 308
- ลำดับแถวใน `content/cases.csv` ไม่ตรงกับลำดับการ์ดหน้า Home — ไม่มีผล เพราะ NEXT chain เขียนมือหมดแล้ว และ `cases-index.js` อ้างอิงตาม slug
