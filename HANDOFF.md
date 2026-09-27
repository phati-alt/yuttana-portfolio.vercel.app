# Handoff — yuttana-portfolio

เอกสารส่งต่องานสำหรับ Claude Code บนเครื่องอื่น อ่านไฟล์นี้ก่อนเริ่มงาน
อัปเดตล่าสุด 2026-09-27 (ล่าสุดที่ commit `e8eeabd` — push ขึ้น GitHub แล้ว)

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
| `css/case-page.css` | **ดีไซน์หน้า case ปัจจุบัน** (prefix `gp-`) ใช้โดย government-project, platform, ev-charger, custom-dashboard และ modal ของ More Projects |
| `css/insight-panels.css` | ดีไซน์หน้า case แบบเก่า (prefix `ip-`) — **เหลือใช้แค่ `work/wordpress-website/`** (หน้าเต็มของ JST) |
| `js/main.js` | animation + interaction ทั้งหมด (`init*` functions, เรียกใน `boot()`) |
| `js/i18n.js` | copy ทั้งเว็บ EN/TH (`data-i18n="key"`) — ห้ามใส่ copy เฉพาะ case ที่นี่ |
| `js/cases-index.js` | **GENERATED** — label ของการ์ด case บนหน้า Home |
| `content/cases.csv` | แหล่งข้อมูล copy ของ case (slug, key, en, th) — รวม `cardMeta` / `cardOutcome` ที่การ์ดหน้า Home ใช้ |
| `tools/build-cases.ps1` | สร้าง `cases-index.js` (และหน้า case ที่ไม่ใช่ bespoke) จาก CSV |
| `work/<slug>/` | หน้า case study แต่ละตัว (index.html, data.js, assets/) |
| `work/more-projects/` | หน้า More Projects — hand-written, มี filter (Platform/Mobile/Dashboard/Website) + modal ที่ใช้ดีไซน์เดียวกับหน้า case |
| `work/README.md` | คู่มือ case pages: bespoke ทั้ง 5, build ทำอะไรบ้าง, วิธีเพิ่ม/ลบ case, NEXT chain |
| `design.md` | design system อ้างอิง (Visa) ที่ tokens ดึงสีมาใช้ |
| `.vercelignore` | ไฟล์ dev-only ที่ไม่ deploy ขึ้นเว็บจริง (HANDOFF, design.md, content/, tools/, _template ฯลฯ) — **ถ้าเพิ่มไฟล์ที่เว็บต้องโหลดจริงในโฟลเดอร์เหล่านี้ ต้องเอาออกจากลิสต์ก่อน** |

### Section บนหน้า Home (ตามลำดับ)

1. **Header** — โลโก้ avatar + nav capsule (Work/About/Services/Process/Experience/Contact) + ปุ่มภาษา + theme toggle; ต่ำกว่า 1120px เป็นเมนู burger (`HEADER_BURGER_MAX` ใน main.js)
2. **Banner (hero)** — wordmark ใหญ่ "Mick UX/UI Designer", eyebrow "Available for freelance work", CTA "Get in touch" ปุ่มเดียว, วง scroll-down
3. **Intro** — manifesto, reveal ทีละบรรทัดตาม scroll
4. **Cases** (`#work`) — การ์ด **4 ใบ** + การ์ด "View more projects" เลื่อนแนวนอนแบบ sticky + scrub (`initCasesScroll`)
   - รูป cover **4:3 (640 × 480)**
   - ข้อความ (meta / ชื่อ / บรรทัดผลลัพธ์) **อยู่บนรูป ขึ้นตอน hover** — บนจอสัมผัส (`hover: none`) ย้ายไป**ใต้รูป**แสดงตลอด
   - ข้อความมาจาก `cardMeta` / `title` / `cardOutcome` ใน CSV → build → `js/cases-index.js`
5. **Band** (พื้น navy `#020f27`, dark mode `#1a1f72`) เปิดด้วยวงกลม iris (`.band__circle`)
   - About: รูป, ป้าย **4+**, checklist, Download Resume, ตัวเลข 4 ช่อง (4+, 40%, 15+, +30%)
   - Services "From strategy to handover": stack cards 5 ใบ (sticky) — **สีเดียวกันหมด** กรมท่าสว่างกว่าแถบหนึ่งระดับ ตัวขาว เลขฟ้าอ่อน กว้างสูงสุด 1120px
   - `.band` ใช้ `clip-path: inset(-400vw 0 0 0)` ตัดวงกลมเฉพาะขอบล่าง — **ห้ามเปลี่ยนเป็น `overflow: clip/hidden`** (วงกลมด้านบนวาดอยู่เหนือกรอบ .band เพราะ margin collapse → จะหายทั้งวง และ hidden ทำ sticky พัง)
6. **Process** (`#process`) — rail 4 ขั้น Discover→Define→Design→Deliver + flow notes + ลูกศรวนกลับ
7. **Toolbox** — หัว section แบบเดียวกับ Process (pretitle / "Tools I work with" / คำอธิบาย) + **ชิป icon 2 แถว** วิ่งสวนกัน 40px/s กลับทิศตาม scroll
   - icon: SVG sprite ใน index.html (Simple Icons CC0 + Lucide สำหรับ FigJam, Adobe XD, Slack, Design Systems, Usability Testing)
8. **Experience & Education** — timeline 4 จุด: 3 งาน (ระยะเวลาคำนวณอัตโนมัติด้วย `initJobDurations` จาก `data-start`/`data-end` + ประเภทงาน) + ป.ตรี Computer Science ม.พะเยา 2017–2022; มีปุ่ม Download Resume ในหัว section
9. **Contact** — อีเมล, ที่อยู่, LinkedIn
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

- **Case บนหน้า Home 4 ตัว** (ลำดับ): `government-project`, `platform`, `ev-charger`, `custom-dashboard`
- **JST Group (`wordpress-website`) ย้ายไป More Projects แล้ว** เป็น entry `jst-group` (group `website`)
  - **หน้าเต็มยังอยู่** ที่ `work/wordpress-website/` (ผู้ใช้เลือกให้เก็บไว้) — modal มีปุ่ม "View case study" ผ่านฟิลด์ `caseUrl` ใน `work/more-projects/data.js`
  - หน้านี้ยังใช้ดีไซน์เก่า `insight-panels.css` และ NEXT card ชี้ไป government-project
- **ทั้ง 5 หน้า case เป็น bespoke** (อยู่ใน `$customSlugs` ของ `build-cases.ps1`) → แก้ `work/<slug>/index.html` และ `data.js` ตรงๆ ได้ แต่ build ยังสร้าง `js/cases-index.js` จาก CSV
- **ดีไซน์หน้า case**: 4 หน้าบน Home ใช้ `css/case-page.css` (`.gp-*`) — คอลัมน์ 960px, การ์ดเทาแบน, สีเน้นเดียว
  - สีเน้น default = น้ำเงินอ่อนของเว็บ; government-project override เป็นฟ้าน้ำใน `case.css` ของตัวเอง
  - platform มี `case.css` สำหรับ user types / framework / business impact
- NEXT chain (เขียนมือ ต้องตรงกับลำดับการ์ดหน้า Home): government-project → platform → ev-charger → custom-dashboard → government-project
- เนื้อหาทั้ง 4 case เป็นของจริง; ยกเว้น Reflection ของ custom-dashboard (draft ใน comment)
- **ยังไม่ยืนยัน**: `timeline` ของ government-project, ev-charger, custom-dashboard (ยืนยันแล้วแค่ platform 2023–present และ JST < 1 เดือน)
- **More Projects: 9 รายการ จริง 3** (Facility Management Platform, DR.in for Doctor, JST Group) — **ยัง mockup 6**: `gateway-alerting`, `forest-permit`, `water-quality-aot`, `vaccine-record`, `purchase-request`, `num-eiang` (ดู `audit: 'mockup'` ใน `work/more-projects/data.js`) รอข้อมูลจริงจากผู้ใช้ทีละอัน (title/role/year/platform/problem/process/quote/solution/stat1+label/stat2+label ทั้ง EN และ TH)
  - custom-dashboard กับ gateway/device alerting **ไม่ใช่งานซ้ำ** — ผู้ใช้ยืนยันแล้ว ไม่ต้องถามอีก
  - การ์ด More Projects ขนาดเท่าการ์ดหน้า Home (640 × 480) และ hover แบบเดียวกัน
- **Screenshot จริงของ case pages ยังไม่มี** — gallery ในหน้า case ยังเป็นกล่องเทา "Screen 1/2/3..." (caption เขียนรอไว้แล้วในแต่ละ `data.js`) รอไฟล์รูปจริงที่ `work/<slug>/assets/screen-N.png` แล้วแทน `.media-block` ด้วย `<img>`
- เมื่อ More Projects ครบ real ทั้งหมด ให้ลบระบบ audit-badge ทิ้ง (ตอนนี้ยังมีจุดสี + แถบ "X of 9 still mockup" ท้ายหน้า More Projects)

### ค้างรอข้อมูลจากผู้ใช้
1. **ปีของงาน JST Group** — ช่อง Year ใน modal ยังเป็น `'—'` (`jst-group` → `year` ใน `work/more-projects/data.js` ทั้ง en/th)
2. **ไฟล์ PDF resume** — ปุ่ม Download Resume ทั้ง 2 ปุ่ม (`[data-resume-btn]`) ตอนนี้แค่ `alert(misc.resumeAlert)` ซึ่งขึ้นบนเว็บจริงด้วย ได้ไฟล์แล้วให้ใส่ใน `assets/` แล้วเปลี่ยน `initResumeBtn` ใน main.js เป็นลิงก์ดาวน์โหลด
3. Screenshot จริงของแต่ละ case และข้อมูลจริงของ More Projects 6 รายการ (ดูด้านบน)

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
- modal More Projects ใช้ดีไซน์เดียวกับหน้า case
- Toolbox เป็นชิป icon + หัว section มาตรฐาน
- การ์ดโปรเจกต์: meta + บรรทัดผลลัพธ์ — ผู้ใช้เลือกให้**อยู่บนรูปและขึ้นตอน hover** (เคยลองวางใต้รูปแบบของเขาแล้ว ผู้ใช้ไม่เอา)
- Experience: ระยะเวลา + ประเภทงาน + Education + ปุ่ม Resume

### ไอเดียที่ยังไม่ได้ทำ (รอผู้ใช้เลือก)
| # | งาน | หมายเหตุ |
|---|---|---|
| 1 | **CTA ที่สอง + แถบโลโก้ลูกค้าใน Hero** | ปุ่มรอง (LinkedIn / View work) + โลโก้สีเทา (กรมทรัพยากรน้ำบาดาล, JST, Ananda/Gulf/CHPP ที่ NDA อนุญาตแล้ว) — **ต้องถามเรื่องสิทธิ์ใช้โลโก้ + ไฟล์โลโก้** |
| 2 | **ปุ่ม "Get in touch" ถาวรใน nav** | ระวัง header แคบ: capsule เหลือระยะแค่ ~7px ที่ 1121px — ถ้า nav กว้างขึ้นต้องขยับ `HEADER_BURGER_MAX` (main.js) + @media 1120px ใน style.css ตาม |
| 3 | **Footer: availability + socials** | เพิ่ม "Available for: Freelance & Full-time" + Behance/Dribbble (**ถามว่ามี account ไหน**) |
| 4 | **การ์ด bento แบบภาพบน-ข้อความล่าง** (จากหน้า About ของเขา) | ถ้าอยากย่อ Services/Toolbox ให้กระชับ — ยังไม่จำเป็น |
| 5 | **บรรทัดผลลัพธ์บนการ์ด More Projects** | ตอนนี้มีแค่ meta + ชื่อ ต้องร่างจากข้อมูลจริงให้ผู้ใช้ตรวจก่อน |

**ไม่แนะนำ** (คุยกับผู้ใช้แล้ว): เปลี่ยน Process เป็นการ์ด 3 ใบ, เปลี่ยนเป็นขาว-ดำล้วน, แยกหน้า About, เปลี่ยน bullet ที่มีตัวเลขเป็นย่อหน้า, เปลี่ยน Cases เป็นคอลัมน์เดียว

ทุกข้อที่เพิ่ม copy ต้องมีทั้ง EN และ TH ใน `js/i18n.js` (หรือใน CSV สำหรับการ์ด case)

---

## 6. ข้อสังเกตที่เจอระหว่างทาง (ยังไม่แก้)

- **Browser pane ของ Claude วาดหน้าจอไม่ได้บ่อยมาก** (screenshot ขาว/timeout) — ตรวจด้วย iframe same-origin ใน `javascript_tool` วัด `getBoundingClientRect` / computed style แทน และบอกผู้ใช้ตรงๆ ว่าภาพจริงยังไม่ได้เห็น; `resize_window` preset mobile จำลอง `hover: none` ได้และมักแคปหน้าจอได้
- **ตรวจหลายขนาดจอเสมอ** โดยเฉพาะจอกว้าง 2560px — บั๊กวงกลมของแถบ navy โผล่เฉพาะจอกว้าง (1440 ไม่เห็น)
- คอมเมนต์ล้าสมัยในโค้ด (ไม่กระทบเว็บ): หัวไฟล์ `work/more-projects/index.html` และคอมเมนต์การ์ด "More projects" ใน `index.html` ยังบอกว่าเป็น "simple image gallery" (จริงๆ เป็น grid + modal แล้ว); `work/README.md` ยังไม่พูดถึง `css/case-page.css` และการย้าย JST
- ลำดับแถวใน `content/cases.csv` ไม่ตรงกับลำดับการ์ดหน้า Home — ไม่มีผล เพราะ NEXT chain เขียนมือหมดแล้ว และ `cases-index.js` อ้างอิงตาม slug
- `<title>` ที่ build script สร้าง (`$titleTag` ใน build-cases.ps1) ยังใส่ "Mick Yuttana" — ไม่มีผลตอนนี้ เพราะทุกหน้าเป็น bespoke ไม่ถูก generate
