/* Each entry's `audit` says whether its copy is real:
     'real'   — the user's own material; shown on the page.
     'mockup' — ⚠ placeholder copy written from what the screenshot
                appears to show; roles, years, clients, platforms and
                EVERY NUMBER are invented. initMoreProjects() removes these
                cards from the page, so they never reach a visitor. Replace
                the copy with what actually happened, then flip to 'real'
                (and drop [hidden] from the card in index.html) to publish.

   Unlike the case folders next to this one, this file is NOT generated —
   there is no CSV behind it. Edit it directly.

   Fields mirror content/cases.csv so the modal reads like a short case
   page: summary is the standfirst, then problem / process (+ quote) /
   solution, and two stats. One entry per image in assets/, keyed by the
   file's base name, with the same fields in en and th.

   `group` (top level, not translated — it's a machine value, not
   copy) is which filter button on the gallery page shows this card:
   'platform', 'mobile', 'dashboard' or 'website'. It's a broader grouping than
   the `category` text shown on the card itself, so a project can read
   as "IoT Monitoring" on its label while filtering under "Product
   Platform". Add a fourth group here and a matching button in
   index.html's .mp-filter to introduce a new one. */
window.MORE_PROJECTS = {
  'facility-management': {
    audit: 'real',
    group: 'platform',
    en: {
      category: 'Product Platform',
      title: 'Facility Management Platform',
      summary: 'Asset tracking, work orders, maintenance and inventory in one platform — with forms the teams using it can shape themselves.',
      role: 'UX/UI Designer',
      year: '2023',
      platform: 'Web platform + mobile',
      problem: 'Poor usability, dense data displays and a confusing work order flow held technicians up — the people the system existed for were the ones it slowed down most. And the legacy system could not scale: every new client requirement pushed against what it could take.',
      process: 'I worked with the Product Owner from feature ideation rather than receiving a finished brief, turning client requirements into workflows instead of screens — which meant pushing back on some and proposing alternatives. The design system was built alongside the developers rather than handed to them, with the same names for the same things on both sides.',
      quote: 'Enterprise users open this every day. Efficiency beats wow — every click has to earn its place.',
      solution: 'The work order flow became guided steps, so a technician always knows the stage they are at and what comes next. Data tables were rebuilt around a real hierarchy, with filter, sort and search behaving as one thing. And admins now build their own fields per job type instead of filing a request every time.',
      stat1: '−50%',
      stat1Label: 'Time to create a work order',
      stat2: '70%',
      stat2Label: 'Component reusability'
    },
    th: {
      category: 'แพลตฟอร์มผลิตภัณฑ์',
      title: 'แพลตฟอร์มบริหารจัดการอาคารและสถานที่',
      summary: 'รวมการติดตามทรัพย์สิน ใบสั่งงาน งานซ่อมบำรุง และคลังอะไหล่ไว้ในแพลตฟอร์มเดียว พร้อมฟอร์มที่ทีมผู้ใช้ปรับเองได้',
      role: 'UX/UI Designer',
      year: '2566',
      platform: 'แพลตฟอร์มเว็บ + มือถือ',
      problem: 'ใช้งานยาก ข้อมูลแน่นอ่านไม่ออก และ Work Order Flow ที่สับสน ทำให้ช่างเทคนิคติดขัด คนที่ระบบมีไว้เพื่อเขากลับเป็นคนที่ถูกถ่วงมากที่สุด อีกทั้งระบบเดิมขยายต่อไม่ได้ ทุก Requirement ใหม่จากลูกค้าล้วนชนเพดานของมัน',
      process: 'ผมทำงานกับ Product Owner ตั้งแต่ขั้นคิดฟีเจอร์ ไม่ใช่รอรับ Brief ที่เสร็จแล้ว แปลง Requirement ของลูกค้าให้เป็น Workflow ไม่ใช่หน้าจอ ซึ่งหมายถึงการโต้แย้งบางข้อและเสนอทางเลือกอื่น ส่วน Design System สร้างไปพร้อมกับ Developer ไม่ใช่ทำเสร็จแล้วส่งให้ โดยใช้ชื่อเดียวกันเรียกของสิ่งเดียวกันทั้งสองฝั่ง',
      quote: 'ผู้ใช้ Enterprise เปิดระบบนี้ทุกวัน ประสิทธิภาพสำคัญกว่าความว้าว ทุกคลิกต้องมีเหตุผลรองรับ',
      solution: 'Work Order Flow กลายเป็นขั้นตอนที่นำทาง ช่างรู้เสมอว่าอยู่ขั้นไหนและต้องทำอะไรต่อ ตารางข้อมูลถูกสร้างใหม่บนลำดับชั้นที่ชัด โดยให้ตัวกรอง การเรียง และการค้นหาทำงานเป็นเรื่องเดียวกัน ส่วนผู้ดูแลระบบสร้างฟิลด์เองได้ตามประเภทงาน แทนที่จะต้องยื่นเรื่องทุกครั้ง',
      stat1: '−50%',
      stat1Label: 'เวลาสร้างใบสั่งงาน',
      stat2: '70%',
      stat2Label: 'การนำ Component กลับมาใช้ซ้ำ'
    }
  },

  'gateway-alerting': {
    audit: 'mockup',   /* TEMPORARY: flip to 'real' once this entry's copy is verified */
    group: 'platform',
    en: {
      category: 'IoT Monitoring',
      title: 'Gateway and device alerting dashboard',
      summary: 'One operations view for a fleet of gateways and sensors, readable from a control-room monitor and still usable on a tablet mid-walkthrough.',
      role: 'UX/UI Designer',
      year: '2023',
      platform: 'Web, tablet, mobile',
      problem: 'Alerts arrived as a flat list with no indication of severity or which device raised them, so triage meant opening records one at a time to find out whether anything mattered.',
      process: 'I put the counts that answer "is anything wrong right now" at the top, and rebuilt the alert row to carry its device, threshold and timestamp inline. For smaller screens the columns drop by priority instead of reflowing into cards, because a card list cannot be scanned the way a table can.',
      quote: 'A table you can scan beats a card list you have to read.',
      solution: 'The same layout holds on a control-room monitor, a tablet on a walkthrough and a phone, without a separate mobile design to keep in sync.',
      stat1: '3 breakpoints',
      stat1Label: 'One layout, no separate mobile build',
      stat2: 'Inline detail',
      stat2Label: 'Device and threshold on the alert row'
    },
    th: {
      category: 'ระบบติดตาม IoT',
      title: 'แดชบอร์ดแจ้งเตือนเกตเวย์และอุปกรณ์',
      summary: 'หน้าจอเดียวสำหรับดูแลเกตเวย์และเซนเซอร์จำนวนมาก อ่านได้จากจอห้องควบคุม และยังใช้บนแท็บเล็ตตอนเดินตรวจได้',
      role: 'UX/UI Designer',
      year: '2566',
      platform: 'เว็บ, แท็บเล็ต, มือถือ',
      problem: 'การแจ้งเตือนมาเป็นรายการเรียงยาวโดยไม่บอกระดับความรุนแรงหรืออุปกรณ์ต้นทาง การคัดกรองจึงต้องเปิดดูทีละรายการเพื่อดูว่าเรื่องไหนสำคัญจริง',
      process: 'ผมย้ายตัวเลขที่ตอบคำถาม "ตอนนี้มีอะไรผิดปกติไหม" ขึ้นไปบนสุด และออกแบบแถวแจ้งเตือนใหม่ให้บอกอุปกรณ์ ค่าเกณฑ์ และเวลาในแถวเดียว ส่วนจอเล็กจะตัดคอลัมน์ตามลำดับความสำคัญ แทนที่จะยุบเป็นการ์ด เพราะการ์ดกวาดตาอ่านไม่ได้เหมือนตาราง',
      quote: 'ตารางที่กวาดตาอ่านได้ ดีกว่าการ์ดที่ต้องไล่อ่านทีละใบ',
      solution: 'เลย์เอาต์ชุดเดียวใช้ได้ทั้งบนจอห้องควบคุม แท็บเล็ตตอนเดินตรวจ และมือถือ โดยไม่ต้องมีดีไซน์มือถือแยกให้ต้องคอยดูแลให้ตรงกัน',
      stat1: '3 Breakpoint',
      stat1Label: 'เลย์เอาต์เดียว ไม่ต้องทำมือถือแยก',
      stat2: 'ข้อมูลในแถว',
      stat2Label: 'อุปกรณ์และค่าเกณฑ์อยู่ในแถวแจ้งเตือน'
    }
  },

  'forest-permit': {
    audit: 'mockup',   /* TEMPORARY: flip to 'real' once this entry's copy is verified */
    group: 'platform',
    en: {
      category: 'Government Service',
      title: 'Permit application system for the Royal Forest Department',
      summary: 'A multi-step permit workflow where each requirement is its own reviewable section, so an officer can see at a glance what is still missing.',
      role: 'UX/UI Designer',
      year: '2023',
      platform: 'Web',
      problem: 'A permit arrived as one long submission that had to be read end to end before anyone could tell whether it was complete, and location was typed in as coordinates — the single most common reason an application came back rejected.',
      process: 'I broke the application into sections that can each be reviewed and returned on their own, and replaced the coordinate field with a map. Applicants place a point; officers see the same point rather than a number they have to trust.',
      quote: 'Nobody should have to read a whole application to find the one field that is wrong.',
      solution: 'Reviewers work section by section and send back only the part that needs fixing, instead of returning the whole submission with a note attached.',
      stat1: 'Map input',
      stat1Label: 'Replaced typed coordinates',
      stat2: 'Section review',
      stat2Label: 'Return one part, not the whole form'
    },
    th: {
      category: 'บริการภาครัฐ',
      title: 'ระบบยื่นคำขออนุญาตของกรมป่าไม้',
      summary: 'ระบบยื่นคำขอแบบหลายขั้นตอน ที่แยกแต่ละข้อกำหนดเป็นส่วนตรวจได้อิสระ เจ้าหน้าที่จึงเห็นได้ทันทีว่ายังขาดอะไร',
      role: 'UX/UI Designer',
      year: '2566',
      platform: 'เว็บ',
      problem: 'คำขอมาเป็นเอกสารยาวชุดเดียวที่ต้องอ่านตั้งแต่ต้นจนจบก่อนจะรู้ว่าครบหรือไม่ และตำแหน่งที่ตั้งต้องพิมพ์เป็นพิกัดเอง ซึ่งเป็นสาเหตุอันดับหนึ่งที่ทำให้คำขอถูกตีกลับ',
      process: 'ผมแยกคำขอออกเป็นส่วน ๆ ที่ตรวจและส่งกลับได้ทีละส่วน และเปลี่ยนช่องกรอกพิกัดเป็นแผนที่ ผู้ยื่นปักหมุด เจ้าหน้าที่เห็นหมุดเดียวกัน ไม่ใช่ตัวเลขที่ต้องเชื่อว่าถูก',
      quote: 'ไม่ควรมีใครต้องอ่านคำขอทั้งฉบับ เพียงเพื่อหาช่องเดียวที่กรอกผิด',
      solution: 'เจ้าหน้าที่ตรวจทีละส่วนและส่งกลับเฉพาะส่วนที่ต้องแก้ แทนที่จะตีกลับทั้งฉบับพร้อมหมายเหตุแนบท้าย',
      stat1: 'เลือกจากแผนที่',
      stat1Label: 'แทนการพิมพ์พิกัดเอง',
      stat2: 'ตรวจรายส่วน',
      stat2Label: 'ส่งกลับเฉพาะส่วนที่ต้องแก้'
    }
  },

  'water-quality-aot': {
    audit: 'mockup',   /* TEMPORARY: flip to 'real' once this entry's copy is verified */
    group: 'dashboard',
    en: {
      category: 'Environmental Dashboard',
      title: 'Water quality monitoring for Airports of Thailand',
      summary: 'Three headline numbers above the detail, so the daily check is one glance rather than a report to read.',
      role: 'UX/UI Designer',
      year: '2022',
      platform: 'Web',
      problem: 'Water-treatment readings from across airport facilities were published as full tables. Answering "is anything out of spec today" meant reading every row, every morning.',
      process: 'I separated the daily question from the underlying data: total readings, in-spec ratio and units needing attention as three figures at the top, with the tables kept underneath for when someone needs to look closer.',
      quote: 'The question every morning was never "what are all the numbers".',
      solution: 'The morning check became a glance at three figures. The tables stayed exactly as complete as before, just no longer the first thing anyone had to deal with.',
      stat1: '3 figures',
      stat1Label: 'Answer the daily check at a glance',
      stat2: 'Full tables',
      stat2Label: 'Kept underneath, nothing removed'
    },
    th: {
      category: 'แดชบอร์ดสิ่งแวดล้อม',
      title: 'ระบบติดตามคุณภาพน้ำ ท่าอากาศยานไทย (AOT)',
      summary: 'ตัวเลขสำคัญสามค่าอยู่เหนือรายละเอียด การตรวจประจำวันจึงใช้การมองครั้งเดียว ไม่ต้องไล่อ่านรายงาน',
      role: 'UX/UI Designer',
      year: '2565',
      platform: 'เว็บ',
      problem: 'ค่าที่วัดได้จากระบบบำบัดน้ำทั่วพื้นที่ท่าอากาศยานถูกแสดงเป็นตารางเต็ม การจะตอบว่า "วันนี้มีค่าไหนหลุดเกณฑ์ไหม" ต้องไล่อ่านทุกแถว ทุกเช้า',
      process: 'ผมแยกคำถามประจำวันออกจากข้อมูลดิบ — จำนวนการตรวจวัด สัดส่วนที่อยู่ในเกณฑ์ และจุดที่ต้องเข้าดูแล เป็นตัวเลขสามค่าไว้ด้านบน ส่วนตารางยังอยู่ด้านล่างสำหรับตอนที่ต้องดูละเอียด',
      quote: 'คำถามทุกเช้าไม่เคยเป็น "ตัวเลขทั้งหมดเป็นเท่าไร"',
      solution: 'การตรวจตอนเช้าเหลือแค่มองตัวเลขสามค่า ส่วนตารางยังครบเหมือนเดิมทุกประการ เพียงแต่ไม่ใช่สิ่งแรกที่ทุกคนต้องเจออีกต่อไป',
      stat1: '3 ตัวเลข',
      stat1Label: 'ตอบการตรวจประจำวันในครั้งเดียว',
      stat2: 'ตารางเต็ม',
      stat2Label: 'ยังอยู่ด้านล่าง ไม่ได้ตัดอะไรทิ้ง'
    }
  },

  'vaccine-record': {
    audit: 'mockup',   /* TEMPORARY: flip to 'real' once this entry's copy is verified */
    group: 'mobile',
    en: {
      category: 'Health App',
      title: 'Vaccination and health record companion',
      summary: 'A record list a parent can scan without opening anything, because each card carries its own status colour.',
      role: 'UI Designer',
      year: '2022',
      platform: 'iOS + Android',
      problem: 'Vaccination history was a plain chronological list. Whether a dose was upcoming, done or overdue only became clear after tapping into the record.',
      process: 'I moved status onto the card itself as colour and label, and ordered the list by what needs attention next rather than strictly by date.',
      quote: 'People open this app to ask one question: what is due next.',
      solution: 'The list answers the question on its own. Opening a record became something you do to see detail, not to find out where you stand.',
      stat1: 'At a glance',
      stat1Label: 'Status on the card, not behind a tap',
      stat2: 'Sorted by due',
      stat2Label: 'Not strictly chronological'
    },
    th: {
      category: 'แอปสุขภาพ',
      title: 'แอปบันทึกวัคซีนและประวัติสุขภาพ',
      summary: 'รายการที่ผู้ปกครองกวาดตาดูได้เลยโดยไม่ต้องกดเข้าไป เพราะการ์ดแต่ละใบมีสีบอกสถานะในตัว',
      role: 'UI Designer',
      year: '2565',
      platform: 'iOS + Android',
      problem: 'ประวัติการฉีดวัคซีนเป็นรายการเรียงตามวันที่ธรรมดา จะรู้ว่าเข็มไหนถึงกำหนด ฉีดแล้ว หรือเลยกำหนด ต้องกดเข้าไปดูในรายการก่อน',
      process: 'ผมย้ายสถานะขึ้นมาไว้บนการ์ดในรูปของสีและป้ายกำกับ และเรียงรายการตามสิ่งที่ต้องจัดการก่อน แทนที่จะเรียงตามวันที่อย่างเดียว',
      quote: 'คนเปิดแอปนี้ขึ้นมาถามคำถามเดียว — รายการถัดไปคืออะไร',
      solution: 'รายการตอบคำถามนั้นได้ด้วยตัวเอง การกดเข้าไปดูกลายเป็นเรื่องของการดูรายละเอียด ไม่ใช่การหาว่าตอนนี้อยู่ตรงไหนแล้ว',
      stat1: 'เห็นในครั้งเดียว',
      stat1Label: 'สถานะอยู่บนการ์ด ไม่ได้ซ่อนหลังการกด',
      stat2: 'เรียงตามกำหนด',
      stat2Label: 'ไม่ได้เรียงตามวันที่อย่างเดียว'
    }
  },

  'purchase-request': {
    audit: 'mockup',   /* TEMPORARY: flip to 'real' once this entry's copy is verified */
    group: 'mobile',
    en: {
      category: 'Procurement App',
      title: 'Purchase request tracking on mobile',
      summary: 'Requester, department, PO number and time on one card — the four things people were actually searching for.',
      role: 'UX/UI Designer',
      year: '2024',
      platform: 'iOS + Android',
      problem: 'The mobile list mirrored the desktop table column for column, so the fields people scanned for were spread across a row that never fit, and filters sat behind a menu.',
      process: 'I watched what people searched by and cut the card down to those four fields. Filters moved to the top of the list, because narrowing is the first action on this screen every single time.',
      quote: 'Filtering was not a feature here — it was step one, every time.',
      solution: 'A card that carries what people look for, and filters where the hand already is. Everything else moved into the detail view where there is room for it.',
      stat1: '4 fields',
      stat1Label: 'What people actually searched by',
      stat2: 'Filters first',
      stat2Label: 'Top of the list, not behind a menu'
    },
    th: {
      category: 'แอปงานจัดซื้อ',
      title: 'ติดตามคำขอจัดซื้อบนมือถือ',
      summary: 'ผู้ขอ หน่วยงาน เลขที่ PO และเวลา อยู่ในการ์ดเดียว — สี่อย่างที่คนค้นหาจริง ๆ',
      role: 'UX/UI Designer',
      year: '2567',
      platform: 'iOS + Android',
      problem: 'รายการบนมือถือลอกคอลัมน์มาจากตารางบนเดสก์ท็อปทั้งชุด ฟิลด์ที่คนกวาดตาหาจึงกระจายอยู่ในแถวที่ไม่เคยแสดงได้ครบ และตัวกรองก็ถูกซ่อนอยู่ในเมนู',
      process: 'ผมดูว่าคนค้นหาด้วยอะไรจริง ๆ แล้วตัดการ์ดให้เหลือสี่ฟิลด์นั้น ส่วนตัวกรองย้ายขึ้นมาบนสุดของรายการ เพราะการกรองคือสิ่งแรกที่ทุกคนทำในหน้านี้ ทุกครั้ง',
      quote: 'การกรองไม่ใช่ฟีเจอร์เสริมในหน้านี้ — มันคือขั้นตอนแรก ทุกครั้ง',
      solution: 'การ์ดที่มีสิ่งที่คนมองหา และตัวกรองอยู่ตรงที่มืออยู่แล้ว ส่วนข้อมูลที่เหลือย้ายไปหน้ารายละเอียดซึ่งมีพื้นที่พอ',
      stat1: '4 ฟิลด์',
      stat1Label: 'สิ่งที่คนใช้ค้นหาจริง',
      stat2: 'ตัวกรองมาก่อน',
      stat2Label: 'อยู่บนสุด ไม่ได้ซ่อนในเมนู'
    }
  },

  'num-eiang': {
    audit: 'mockup',   /* TEMPORARY: flip to 'real' once this entry's copy is verified */
    group: 'mobile',
    en: {
      category: 'Lifestyle App',
      title: 'Num Eiang — Chinese auspicious date calendar',
      summary: 'A red-and-gold almanac language, kept ornamental enough to feel right and plain enough to still read a date.',
      role: 'UI Designer',
      year: '2022',
      platform: 'iOS + Android',
      problem: 'Traditional almanac layouts are dense with ornament, and early drafts inherited enough of it that the date itself — the reason anyone opens a calendar — stopped being the first thing you saw.',
      process: 'I kept the red-and-gold palette and the motifs, but confined them to backgrounds and headers so type could stay plain where it carries information. The auspicious-date picker moved to its own tab rather than layering onto the calendar.',
      quote: 'Keep the ornament. Just not on top of the date.',
      solution: 'The home screen reads as a calendar first and an almanac second, and picking an auspicious date is a deliberate trip to its own tab instead of a second layer competing for the same screen.',
      stat1: '2 surfaces',
      stat1Label: 'Calendar and picker kept separate',
      stat2: 'Ornament framed',
      stat2Label: 'Backgrounds and headers only'
    },
    th: {
      category: 'แอปไลฟ์สไตล์',
      title: 'นำเอียง — ปฏิทินฤกษ์มงคลจีน',
      summary: 'ภาษาภาพแบบปฏิทินจีนโทนแดง-ทอง ที่ยังมีลวดลายพอให้ได้อารมณ์ แต่เรียบพอที่จะอ่านวันที่ออก',
      role: 'UI Designer',
      year: '2565',
      platform: 'iOS + Android',
      problem: 'ปฏิทินจีนแบบดั้งเดิมมีลวดลายหนาแน่น และแบบร่างช่วงแรกรับมาเยอะพอที่ทำให้ "วันที่" ซึ่งเป็นเหตุผลที่คนเปิดปฏิทิน ไม่ใช่สิ่งแรกที่ตาเห็นอีกต่อไป',
      process: 'ผมเก็บโทนแดง-ทองและลวดลายไว้ แต่จำกัดให้อยู่แค่พื้นหลังและหัวข้อ เพื่อให้ตัวอักษรส่วนที่ทำหน้าที่ให้ข้อมูลยังเรียบอยู่ ส่วนหน้าเลือกฤกษ์ย้ายไปเป็นแท็บของตัวเอง แทนที่จะซ้อนทับลงบนปฏิทิน',
      quote: 'เก็บลวดลายไว้ได้ แค่อย่าวางทับบนวันที่',
      solution: 'หน้าแรกอ่านได้ว่าเป็นปฏิทินก่อน แล้วค่อยเป็นปฏิทินฤกษ์ และการเลือกฤกษ์กลายเป็นการตั้งใจไปที่แท็บของมัน ไม่ใช่อีกชั้นที่มาแย่งพื้นที่หน้าจอเดียวกัน',
      stat1: '2 หน้าจอ',
      stat1Label: 'แยกปฏิทินกับหน้าเลือกฤกษ์',
      stat2: 'คุมลวดลาย',
      stat2Label: 'อยู่แค่พื้นหลังและหัวข้อ'
    }
  },

  'drin-doctor': {
    audit: 'real',
    group: 'mobile',
    en: {
      category: 'Mobile Application',
      title: 'DR.in for Doctor',
      summary: 'A digital health platform putting teleconsultation and e-prescription in reach online, at minimal cost.',
      role: 'UI Designer (Internship)',
      year: '2021–2022',
      platform: 'Mobile — iOS and Android',
      problem: 'Medical data and e-prescription workflows are inherently dense and complex. The challenge was displaying that information architecture without overwhelming the people using it — healthcare professionals and patients alike.',
      process: 'The brief and wireframes came from the senior UX team, and the first job was understanding the user flow and the business logic behind them before drawing anything. The hardest part was the domain itself: I had to learn how prescribing actually works before the screens could be right rather than merely tidy.',
      quote: 'In a medical interface, accuracy and safety come before aesthetics — a screen that looks calm but reads wrong is the worse outcome.',
      solution: 'The visual direction had to read as trustworthy without turning clinical. Complex data was grouped so a prescription could be checked at a glance rather than parsed, and every foundational screen — Login and Settings included — was held to the same rules as the core flow.',
      stat1: '20+',
      stat1Label: 'Screens designed',
      stat2: '5',
      stat2Label: 'Core flows delivered'
    },
    th: {
      category: 'แอปพลิเคชันมือถือ',
      title: 'DR.in for Doctor',
      summary: 'แพลตฟอร์มสุขภาพดิจิทัลที่ให้บริการปรึกษาแพทย์และสั่งยาออนไลน์ เข้าถึงได้ครบและค่าใช้จ่ายต่ำ',
      role: 'UI Designer (ฝึกงาน)',
      year: '2564–2565',
      platform: 'มือถือ — iOS และ Android',
      problem: 'ข้อมูลทางการแพทย์และขั้นตอนการสั่งยาออนไลน์ซับซ้อนในตัวเอง ความท้าทายคือจะแสดงโครงสร้างข้อมูลจำนวนมากนี้อย่างไรโดยไม่ทำให้ผู้ใช้ทั้งบุคลากรทางการแพทย์และผู้ป่วยรู้สึกล้น',
      process: 'Brief และ Wireframe มาจากทีม Senior UX งานแรกคือทำความเข้าใจ User Flow และ Business Logic เบื้องหลังก่อนจะเริ่มออกแบบ ส่วนที่ยากที่สุดคือตัวโดเมนเอง ผมต้องเรียนรู้ว่าการสั่งยาจริงทำงานอย่างไร ก่อนที่หน้าจอจะถูกต้อง ไม่ใช่แค่ดูเรียบร้อย',
      quote: 'ในงานออกแบบทางการแพทย์ ความถูกต้องและความปลอดภัยมาก่อนความสวยงาม หน้าจอที่ดูสงบแต่อ่านแล้วเข้าใจผิด คือผลลัพธ์ที่แย่กว่า',
      solution: 'Visual Direction ต้องให้ความรู้สึกน่าเชื่อถือโดยไม่แข็งจนเกินไป ข้อมูลที่ซับซ้อนถูกจัดกลุ่มให้ตรวจใบสั่งยาได้ในสายตาเดียว ไม่ต้องไล่อ่าน และหน้าจอพื้นฐานทุกหน้า รวมถึง Login และ Settings ยึดกฎเดียวกับ Core Flow',
      stat1: '20+',
      stat1Label: 'หน้าจอที่ออกแบบ',
      stat2: '5',
      stat2Label: 'Core Flow ที่ส่งมอบ'
    }
  },

  /* Full case study, shown in the modal. Moved here from the former
     work/wordpress-website/ page (deleted at the user's request — the
     modal is now the only place it lives). Every string is that page's
     own data.js text, verbatim; only the key names changed to the modal's.
     No `year` on purpose: the source only says "under 1 month", so the
     Year cell stays hidden and Timeline shows instead. */
  'jst-group': {
    audit: 'real',
    group: 'website',
    en: {
      category: 'Website',
      title: 'JST Group',
      summary: 'A corporate website redesign with a recruitment section added - so a candidate can see the open roles and knows where to go, rather than hunting for the way in.',
      role: 'UX/UI Designer — solo, design and prototype',
      timeline: 'Under 1 month',
      platform: 'Corporate website — desktop, tablet, mobile',
      tools: 'Figma',
      client: 'JST Group',
      contextText: 'A corporate site redesign covering four main pages across three breakpoints, plus an interactive prototype - designed end to end by one person inside a month. Delivered at the design and prototype stage; the project did not enter development during the period I was responsible for it.',
      problem: 'One site, two audiences who want opposite things — and a month to make both of them feel it was built for them.',
      prob1Title: 'The Brief',
      prob1Text: 'JST Group wanted their corporate site redesigned with a recruitment section added. Two things had to hold: the site had to read as a credible organisation, and a visitor had to see the open roles and know where to go to apply or leave their portfolio.',
      prob2Title: 'The Constraint',
      prob2Text: 'Four pages, three breakpoints and a prototype, designed alone in under a month. Deciding what to spend the time on was part of the design work, not something separate from it.',
      goalTitle: 'The Goal',
      goalText: 'Make the organisation read as credible, and make the way in obvious — for the client looking for a service and the candidate looking for a role alike, without either walking through the other\'s content.',
      process: 'The brief came in clear, and with a month and no one else on it, the leverage was in structure rather than exploration: separate the two audiences at navigation level, then build one set of patterns — section header, service card, statistic block, CTA band — and run every page off them. An interactive prototype came with the handover, because the brief was about where the entrances are, and that is a question static screens answer badly.',
      quote: 'The brief was about entrances — where do I click. Static screens answer that badly; a prototype answers it in one session.',
      solution: 'The site had to serve two people arriving for opposite reasons, inside a month, built by one person. Every decision below follows from those two facts.',
      sol1Title: 'Two audiences, kept apart',
      sol1Text: 'Corporate clients and job candidates arrive wanting different things. Their entrances are separated at navigation level, so neither has to walk through the other\'s content to reach their own.',
      sol2Title: 'Jobs seen, not searched for',
      sol2Text: 'Featured jobs sit on the homepage and the recruitment page with a filter, rather than behind a submenu. A candidate does not have to look for them.',
      sol3Title: 'Two ways to apply',
      sol3Text: 'Someone who found the right role and someone interested in the company but not in any listed role need different entrances. Having both means the second group is not lost.',
      sol4Title: 'Credibility you can point at',
      sol4Text: 'B2B trust is built from things that can be checked, so statistics, certifications, a client testimonial and the full service list sit where a visitor passes them.',
      sol5Title: 'One pattern set, reused',
      sol5Text: 'With under a month and no one else on it, every page runs off the same section header, service card, statistic block and CTA band. Consistency came from the system, and new pages cost less than the first one.',
      dec1Title: 'Red, black and white',
      dec1Why: 'Carried from JST\'s existing brand identity — direct and confident, which suits an industrial business.',
      dec2Title: 'A hexagon motif',
      dec2Why: 'One repeating shape across the site gives it something to be remembered by, and the geometry sits naturally beside engineering work.',
      dec3Title: 'Photographs, not illustration',
      dec3Why: 'HR and industrial businesses sell credibility. People at work photograph as real in a way drawings do not.',
      dec4Title: 'Statistics set large',
      dec4Why: 'A figure reads faster than a paragraph. Scale is communicated in seconds rather than sentences.',
      dec5Title: 'A CTA band closing every page',
      dec5Why: 'Nobody should reach the bottom of a page with nowhere to go next.',
      resultsText: 'Delivered as design and an interactive prototype. The project did not go into development during the period I was responsible for it, so there are no production figures to report — the numbers below are the scope that was delivered.',
      stat1: '4',
      stat1Label: 'Pages designed',
      stat2: '3',
      stat2Label: 'Device breakpoints',
      stat3: '1',
      stat3Label: 'Interactive prototype',
      stat4: '1',
      stat4Label: 'Designer, end to end',
      showcase1Caption: 'Homepage — hero, statistics, services, featured jobs and news',
      showcase2Caption: 'Recruitment — services, HR solutions, process, testimonials and FAQ',
      showcase3Caption: 'HR Solutions — the service list and what the organisation brings to it',
      showcase4Caption: 'Job Search — filter by role, location and type, on tablet and mobile',
      reflect1Title: 'A corporate site rarely has one audience',
      reflect1Text: 'I had thought of corporate work as an organisation presenting itself. Adding recruitment showed that one site can owe something to two groups with nothing in common — and that this belongs in the structure, not in a later fix.',
      reflect2Title: 'A prototype is a way of speaking',
      reflect2Text: 'Letting people click through settled where do I press and what comes next in one session — far faster than describing it, and it is not a bonus deliverable.',
      reflect3Title: 'Alone and on a deadline, choosing is the work',
      reflect3Text: 'Four pages across three breakpoints in under a month forced an early decision about where the effort went. Investing in a reusable pattern set rather than designing each page separately is systems thinking before there is a design system to call it that.',
      reflect4Title: 'Brand and usability both have to win',
      reflect4Text: 'Clients in this space weigh how the company looks as heavily as how the site works. The job is finding where the two agree, not picking one.'
    },
    th: {
      category: 'เว็บไซต์',
      title: 'JST Group',
      summary: 'รีดีไซน์เว็บไซต์องค์กร พร้อมเพิ่มส่วน Recruitment เข้ามา ให้ผู้สมัครเห็นตำแหน่งงานว่างและรู้ว่าต้องเข้าจุดไหน แทนที่จะต้องไล่หาทางเข้าเอง',
      role: 'UX/UI Designer — ทำคนเดียว ทั้งออกแบบและ Prototype',
      timeline: 'ภายใน 1 เดือน',
      platform: 'เว็บไซต์องค์กร — เดสก์ท็อป แท็บเล็ต มือถือ',
      tools: 'Figma',
      client: 'JST Group',
      contextText: 'รีดีไซน์เว็บไซต์องค์กร ครอบคลุม 4 หน้าหลัก บน 3 ขนาดหน้าจอ พร้อม Interactive Prototype ออกแบบทั้งหมดคนเดียวภายในหนึ่งเดือน ส่งมอบในขั้น Design และ Prototype โปรเจกต์ไม่ได้เข้าสู่ขั้นพัฒนาในช่วงที่ผมรับผิดชอบ',
      problem: 'เว็บเดียว ผู้ใช้สองกลุ่มที่ต้องการคนละอย่าง และมีเวลาหนึ่งเดือนให้ทั้งคู่รู้สึกว่าเว็บนี้ทำมาเพื่อเขา',
      prob1Title: 'โจทย์',
      prob1Text: 'JST Group ต้องการรีดีไซน์เว็บไซต์องค์กร โดยเพิ่มส่วน Recruitment เข้ามาใหม่ โจทย์หลักมีสองข้อ — เว็บต้องสื่อสารความน่าเชื่อถือขององค์กรได้ และผู้ใช้ต้องเห็นตำแหน่งงานที่ว่าง พร้อมรู้ว่าต้องเข้าจุดไหนหากจะสมัครงานหรือฝากผลงาน',
      prob2Title: 'ข้อจำกัด',
      prob2Text: '4 หน้า 3 ขนาดหน้าจอ และ Prototype ออกแบบคนเดียวภายในไม่ถึงหนึ่งเดือน การตัดสินใจว่าจะลงแรงตรงไหนจึงเป็นส่วนหนึ่งของงานออกแบบ ไม่ใช่เรื่องแยกต่างหาก',
      goalTitle: 'เป้าหมาย',
      goalText: 'ทำให้องค์กรอ่านออกว่าน่าเชื่อถือ และทำให้ทางเข้าชัดเจน ทั้งสำหรับลูกค้าที่มองหาบริการ และผู้สมัครที่มองหาตำแหน่งงาน โดยไม่มีใครต้องเดินผ่านเนื้อหาของอีกฝ่าย',
      process: 'โจทย์จากลูกค้าชัดอยู่แล้ว และด้วยเวลาหนึ่งเดือนโดยไม่มีคนอื่นในทีม จุดที่ได้ผลที่สุดคือโครงสร้าง ไม่ใช่การทดลอง — แยกผู้ใช้สองกลุ่มตั้งแต่ระดับ Navigation แล้วสร้าง Pattern กลางชุดเดียว ทั้ง Section Header, Service Card, Statistic Block และ CTA Band แล้วให้ทุกหน้าเดินจากชุดนั้น พร้อมส่งมอบ Interactive Prototype ไปด้วย เพราะโจทย์คือเรื่องทางเข้าอยู่ตรงไหน ซึ่งเป็นคำถามที่ภาพนิ่งตอบได้ไม่ดี',
      quote: 'โจทย์คือเรื่องทางเข้า — ต้องกดตรงไหน ภาพนิ่งตอบคำถามนี้ได้ไม่ดี แต่ Prototype ตอบได้จบในรอบเดียว',
      solution: 'เว็บนี้ต้องรับใช้คนสองกลุ่มที่เข้ามาด้วยเหตุผลตรงข้ามกัน ภายในหนึ่งเดือน และสร้างโดยคนคนเดียว ทุกการตัดสินใจด้านล่างมาจากข้อเท็จจริงสองข้อนี้',
      sol1Title: 'แยกผู้ใช้สองกลุ่มไม่ให้ทับกัน',
      sol1Text: 'ลูกค้าองค์กรกับผู้สมัครงานเข้ามาด้วยเป้าหมายคนละอย่าง ทางเข้าของทั้งสองกลุ่มจึงถูกแยกตั้งแต่ระดับ Navigation ไม่มีใครต้องเดินผ่านเนื้อหาของอีกฝ่ายเพื่อไปถึงส่วนของตัวเอง',
      sol2Title: 'เห็นตำแหน่งงาน ไม่ใช่ต้องไปหา',
      sol2Text: 'Featured Jobs อยู่บนหน้าหลักและหน้า Recruitment พร้อมตัวกรอง แทนที่จะซ่อนไว้หลังเมนูย่อย ผู้สมัครจึงไม่ต้องค้นหา',
      sol3Title: 'ทางเข้าสมัครงานสองแบบ',
      sol3Text: 'คนที่เจอตำแหน่งตรงใจแล้ว กับคนที่สนใจองค์กรแต่ยังไม่มีตำแหน่งที่ตรง ต้องการทางเข้าคนละแบบ การมีทั้งสองทางทำให้ไม่เสียกลุ่มที่สองไป',
      sol4Title: 'ความน่าเชื่อถือที่ชี้ให้ดูได้',
      sol4Text: 'ความน่าเชื่อถือแบบ B2B สร้างจากสิ่งที่ตรวจสอบได้ ตัวเลของค์กร ใบรับรอง คำรับรองจากลูกค้า และรายการบริการทั้งหมด จึงวางอยู่ในจุดที่ผู้เข้าชมต้องผ่านสายตา',
      sol5Title: 'ชุด Pattern เดียว ใช้ซ้ำทั้งเว็บ',
      sol5Text: 'ด้วยเวลาไม่ถึงเดือนและไม่มีคนอื่นในทีม ทุกหน้าจึงเดินจาก Section Header, Service Card, Statistic Block และ CTA Band ชุดเดียวกัน ความสม่ำเสมอมาจากตัวระบบเอง และหน้าใหม่แต่ละหน้าใช้แรงน้อยกว่าหน้าแรก',
      dec1Title: 'แดง ดำ ขาว',
      dec1Why: 'ต่อยอดจาก Brand Identity เดิมของ JST ตรงไปตรงมาและมั่นใจ เหมาะกับธุรกิจสายอุตสาหกรรม',
      dec2Title: 'ลวดลายหกเหลี่ยม',
      dec2Why: 'รูปทรงเดียวที่ซ้ำทั้งเว็บ ทำให้มีภาพจำ และเรขาคณิตแบบนี้อยู่ข้างงานวิศวกรรมได้อย่างเป็นธรรมชาติ',
      dec3Title: 'ภาพถ่ายจริง ไม่ใช่ภาพวาด',
      dec3Why: 'ธุรกิจ HR และอุตสาหกรรมขายความน่าเชื่อถือ ภาพคนทำงานจริงให้ความรู้สึกจริงในแบบที่ภาพวาดให้ไม่ได้',
      dec4Title: 'ตัวเลขตั้งขนาดใหญ่',
      dec4Why: 'ตัวเลขอ่านเร็วกว่าย่อหน้า ขนาดขององค์กรจึงสื่อได้ในไม่กี่วินาที แทนที่จะต้องอ่านเป็นประโยค',
      dec5Title: 'ปิดทุกหน้าด้วย CTA Band',
      dec5Why: 'ไม่ควรมีใครเลื่อนถึงล่างสุดของหน้าแล้วไม่มีทางไปต่อ',
      resultsText: 'ส่งมอบเป็นงานออกแบบและ Interactive Prototype โปรเจกต์ไม่ได้เข้าสู่ขั้นพัฒนาในช่วงที่ผมรับผิดชอบ จึงไม่มีตัวเลขจากการใช้งานจริงให้รายงาน ตัวเลขด้านล่างคือขอบเขตงานที่ส่งมอบ',
      stat1: '4',
      stat1Label: 'หน้าที่ออกแบบ',
      stat2: '3',
      stat2Label: 'ขนาดหน้าจอที่รองรับ',
      stat3: '1',
      stat3Label: 'Interactive Prototype',
      stat4: '1',
      stat4Label: 'ผู้ออกแบบ ตั้งแต่ต้นจนจบ',
      showcase1Caption: 'หน้าหลัก — Hero ตัวเลของค์กร บริการ ตำแหน่งงานเด่น และข่าวสาร',
      showcase2Caption: 'Recruitment — บริการ HR Solutions ขั้นตอน คำรับรอง และคำถามที่พบบ่อย',
      showcase3Caption: 'HR Solutions — รายการบริการ และสิ่งที่องค์กรมีให้',
      showcase4Caption: 'ค้นหางาน — กรองตามตำแหน่ง สถานที่ และประเภทงาน บนแท็บเล็ตและมือถือ',
      reflect1Title: 'เว็บองค์กรมักมีผู้ใช้มากกว่าหนึ่งกลุ่ม',
      reflect1Text: 'ผมเคยมองงานเว็บองค์กรว่าเป็นการนำเสนอองค์กรฝ่ายเดียว การมี Recruitment เข้ามาทำให้เห็นว่าเว็บเดียวอาจต้องรับใช้คนสองกลุ่มที่ไม่มีอะไรร่วมกันเลย และเรื่องนี้ควรอยู่ในโครงสร้าง ไม่ใช่มาแก้ทีหลัง',
      reflect2Title: 'Prototype คือเครื่องมือสื่อสาร',
      reflect2Text: 'การให้คนได้คลิกเล่นจริง ทำให้คำถามว่ากดตรงไหนและหน้าถัดไปเป็นยังไง จบได้ในรอบเดียว เร็วกว่าการอธิบายมาก และมันไม่ใช่ของแถม',
      reflect3Title: 'ทำคนเดียวในเวลาจำกัด การเลือกคืองาน',
      reflect3Text: '4 หน้า 3 ขนาดจอ ในเวลาไม่ถึงเดือน บังคับให้ต้องตัดสินใจแต่เนิ่น ๆ ว่าจะลงแรงตรงไหน การลงทุนกับชุด Pattern ที่ใช้ซ้ำได้ แทนการออกแบบทีละหน้าแยกกัน คือการคิดเชิงระบบ ก่อนที่จะมีสิ่งที่เรียกว่า Design System เสียอีก',
      reflect4Title: 'แบรนด์กับการใช้งานต้องได้ทั้งคู่',
      reflect4Text: 'ลูกค้ากลุ่มนี้ให้น้ำหนักกับภาพลักษณ์ไม่น้อยกว่าการใช้งานง่าย งานคือการหาจุดที่ทั้งสองอย่างไปด้วยกันได้ ไม่ใช่การเลือกอย่างใดอย่างหนึ่ง'
    }
  }
};
