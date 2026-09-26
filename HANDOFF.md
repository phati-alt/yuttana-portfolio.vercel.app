# Handoff — webport-portfolio

เอกสารส่งต่องานสำหรับ Claude Code บนเครื่องอื่น อ่านไฟล์นี้ก่อนเริ่มงาน
เขียนเมื่อ 2026-09-26 (ล่าสุดที่ commit `9689146`)

> ไฟล์นี้รวม "ความรู้ที่ไม่อยู่ในโค้ด" ไว้ด้วย เพราะ memory ของ Claude บนเครื่องเดิม
> ไม่ได้ติดมากับ repo — ส่วน "กฎการทำงาน" ด้านล่างสำคัญที่สุด

---

## 1. โปรเจกต์นี้คืออะไร

พอร์ตโฟลิโอส่วนตัวของ **Mick Yuttana Pati** — UX/UI & Product Designer (Bangkok)
เว็บจริงที่ deploy อยู่ → **push ขึ้น `main` = ขึ้นเว็บจริงทันที**

- Repo: `https://github.com/phati-alt/webport-portfolio`
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
| `css/style.css` | layout + components ของทั้งเว็บ (~2000 บรรทัด) |
| `css/insight-panels.css` | design language ร่วมของหน้า case (prefix `ip-`) |
| `js/main.js` | animation + interaction ทั้งหมด (`init*` functions, เรียกใน `boot()`) |
| `js/i18n.js` | copy ทั้งเว็บ EN/TH (`data-i18n="key"`) — ห้ามใส่ copy เฉพาะ case ที่นี่ |
| `js/cases-index.js` | **GENERATED** — label ของการ์ด case บนหน้า Home |
| `content/cases.csv` | แหล่งข้อมูล copy ของ case (slug, key, en, th) |
| `tools/build-cases.ps1` | สร้าง `cases-index.js` (และหน้า case ที่ไม่ใช่ bespoke) จาก CSV |
| `work/<slug>/` | หน้า case study แต่ละตัว (index.html, data.js, assets/) |
| `work/more-projects/` | หน้า More Projects — hand-written, มี filter + modal แบบ editorial |
| `work/README.md` | คู่มือ pipeline ของ case (**บางส่วนล้าสมัย** ดูข้อ 4) |
| `design.md` | design system อ้างอิง (Visa) ที่ tokens ดึงสีมาใช้ |
| `design with agent/` | concept พอร์ตอีกแบบ (แยกขาด ไม่ share อะไรกับเว็บหลัก) |

### Section บนหน้า Home (ตามลำดับ)

1. **Header** — โลโก้ avatar + nav capsule (Work/About/Services/Process/Experience/Contact) + ปุ่มภาษา + theme toggle
2. **Banner (hero)** — wordmark ใหญ่ "Mick UX/UI Designer", eyebrow "Available for freelance work", CTA "Get in touch" ปุ่มเดียว, วง scroll-down
3. **Intro** — manifesto, reveal ทีละบรรทัดตาม scroll
4. **Cases** (`#work`) — การ์ด 5 ใบ เลื่อนแนวนอนแบบ sticky + scrub (`initCasesScroll`)
5. **Band** (พื้น navy `#020f27`) — About (รูป, 3+ years, checklist, Download Resume, ตัวเลข 4 ช่อง) + Services stack cards 5 ใบ
6. **Process** (`#process`) — rail 4 ขั้น Discover→Define→Design→Deliver + flow notes + ลูกศรวนกลับ
7. **Marquee** — Toolbox เป็นข้อความล้วนคั่น ✦ สองแถววิ่งสวนกัน
8. **Experience** — timeline แนวตั้ง 3 ตำแหน่ง
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
3. **Modal ว่างเปล่าหลังคลิก** (More Projects) = paint lag ของ pane ไม่ใช่ bug — เช็กด้วย `get_page_text` ก่อน
4. **เนื้อหาต้องเป็นของจริง** ห้ามแต่งตัวเลข/research ขึ้นเอง
   ส่วนที่ source เขียนว่า "✨ แนะนำเพิ่ม" หรือ "estimated" = ยังไม่ยืนยัน อย่าเผยแพร่เป็นข้อเท็จจริง
5. ถ้าไม่แน่ใจ **ถามผู้ใช้ก่อน** (ผู้ใช้ตอบเป็นภาษาไทย)

---

## 4. สถานะปัจจุบัน

- Case บนหน้า Home 5 ตัว (ลำดับ): `government-project`, `platform`, `ev-charger`, `custom-dashboard`, `wordpress-website` (= JST Group, slug เดิม)
- **ทั้ง 5 หน้า case ตอนนี้เป็น bespoke** (อยู่ใน `$customSlugs` ของ `build-cases.ps1`)
  → แก้ `work/<slug>/index.html` และ `data.js` ตรงๆ ได้, build จะไม่เขียนทับ
  → แต่ build ยังสร้าง `js/cases-index.js` (label การ์ดหน้า Home) จาก CSV อยู่
  → `work/README.md` ยังเขียนว่ามีแค่ government-project ที่เป็น bespoke — **ล้าสมัย**
- ทุก case ใช้ layout Insight Panel ร่วมกัน (`css/insight-panels.css`); platform กับ ev-charger มี `case.css` ของตัวเองเพิ่ม
- เนื้อหาทั้ง 5 case เป็นของจริงแล้ว; ยกเว้น Reflection ของ custom-dashboard (draft ใน comment)
- **ยังไม่ยืนยัน**: `timeline` ของ government-project, ev-charger, custom-dashboard (ยืนยันแล้วแค่ platform 2023–present และ JST < 1 เดือน)
- More Projects: 8 รายการ ส่วนใหญ่ยังเป็น mockup (ของจริง: Facility Management Platform และ DR.in for Doctor)
  custom-dashboard กับ project gateway/device alerting **ไม่ใช่งานซ้ำ** — ผู้ใช้ยืนยันแล้ว ไม่ต้องถามอีก
- Next-project chain: หน้า bespoke เขียน NEXT card เอง ต้องตรงกับลำดับการ์ดหน้า Home

### Build (เมื่อแก้ `content/cases.csv`)

```bash
powershell -ExecutionPolicy Bypass -File tools/build-cases.ps1
```

---

## 5. งานถัดไป — ไอเดียจากการเทียบกับ chonladda-portfolio.framer.website

ผู้ใช้ให้เทียบกับ https://chonladda-portfolio.framer.website/ (เทมเพลต Framer, minimal ขาว-ดำ,
Inter Display 56px/700, การ์ดเทา `#f7f7f7` ไม่มีเส้นขอบ, ปุ่ม pill)
ข้อสรุป: **ไม่เปลี่ยนสไตล์ทั้งหน้า** ของเรามีเอกลักษณ์และเนื้อหาลึกกว่า — หยิบแค่บางจุด
ใช้เป็นแรงบันดาลใจเชิงโครงสร้างเท่านั้น ห้ามลอกข้อความ/เลย์เอาต์ของเขา

**ยังไม่ได้ลงมือทำข้อไหนเลย — รอผู้ใช้เลือกว่าจะเริ่มข้อไหน**

| # | งาน | รายละเอียด | ไฟล์ที่เกี่ยว |
|---|---|---|---|
| 1 ⭐ | **Meta tags + outcome ใต้การ์ด case** | ตอนนี้การ์ดมีแค่ category + title. เพิ่มแถว tags (เช่น `Live Product • GovTech • UX/UI`) และประโยคผลลัพธ์ 1 บรรทัด ให้ recruiter รู้ผลโดยไม่ต้องคลิก. เพิ่ม key `tags`, `cardSummary` ใน CSV → ต้องแก้ `build-cases.ps1` ให้ส่ง key ใหม่เข้า `cases-index.js` + เพิ่ม `data-case-field` ในการ์ด + CSS. **copy ต้องมาจากผู้ใช้ / ข้อมูลจริงใน CSV** | `content/cases.csv`, `tools/build-cases.ps1`, `index.html` (#casesGrid), `css/style.css`, `js/i18n.js` ~บรรทัด 394 (ที่เติม `data-case-field` จาก `CASES_INDEX`) |
| 2 | **CTA ที่สอง + แถบโลโก้ลูกค้าใน Hero** | ปุ่มรอง เช่น LinkedIn หรือ View work ข้าง "Get in touch" + แถวโลโก้สีเทา (กรมทรัพยากรน้ำบาดาล, JST, Ananda/Gulf/CHPP ที่ NDA อนุญาตแล้ว ฯลฯ). **ถามผู้ใช้เรื่องสิทธิ์ใช้โลโก้ + ไฟล์โลโก้** | `index.html` (.banner__foot), `css/style.css`, `js/i18n.js` |
| 3 | **ปุ่ม "Get in touch" ถาวรใน nav** | เปลี่ยน/เพิ่ม Contact เป็นปุ่ม pill สี primary. ระวัง layout header แคบ (ดูข้อ 6) | `index.html` (header), `css/style.css` |
| 4 | **ไอคอนในชิป Toolbox** | marquee ตอนนี้เป็นข้อความล้วน → ชิป pill + ไอคอน/โลโก้เครื่องมือ | `index.html` (.marquee-section), `css/style.css` |
| 5 | **Footer: availability + socials** | เพิ่ม "Available for: Freelance & Full-time" + Behance/Dribbble ถ้ามี (**ถามผู้ใช้ว่ามี account ไหน**) | `index.html` (footer), `js/i18n.js` |

**ไม่แนะนำ**: เปลี่ยน Process เป็นการ์ด 3 ใบ (ของเราลึกกว่า), เปลี่ยนเป็นขาว-ดำล้วน, ย่อ About

ทุกข้อที่เพิ่ม copy ต้องมีทั้ง EN และ TH ใน `js/i18n.js`

---

## 6. ข้อสังเกตที่เจอระหว่างทาง (ยังไม่แก้)

- ที่ viewport กว้าง ~800px ชื่อ "Mick Yuttana" ใน header ถูก nav ทับเหลือ "Mick Y" — เห็นใน screenshot ครั้งเดียว ยังไม่ได้เช็ก breakpoint อื่น
- `work/README.md` ต้องอัปเดตเรื่อง bespoke pages (ข้อ 4)
