/**
 * Word (.docx) versions of the two roadmaps, landscape A4:
 *   documents/members/fluid-equity/Roadmap - Fluid Equity - Club Class 2026-27.docx
 *   documents/partners/the-circle-linkk/Partnership Roadmap - The Circle and LINKK Global 2026-27 (internal).docx
 *
 *   node documents/scripts/build-roadmaps-docx.cjs      (needs `npm i docx`)
 *
 * The text matches the HTML/PDF versions (roadmap.html in each folder);
 * change both together.
 */
const fs = require('fs')
const path = require('path')
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, PageOrientation,
  TabStopType, Footer, PageBreak, VerticalAlign, PageNumber,
} = require('docx')

const ROOT = path.join(__dirname, '..')
const RED = 'D71920', INK = '0E0E0E', MUTED = '5C5C5C', LINE = 'E2DFDD', ALT = 'F5F3F2', SOFT = 'FDEAEA', BLACK = '111111', ONBLACK = 'B3B3B3'
const FONT = 'Arial'
const W = 15398 // A4 landscape width minus 0.5" margins, in DXA

const W3 = fs.readFileSync(path.join(ROOT, 'assets/web3-corridor-square.jpg'))
const IBA = fs.readFileSync(path.join(ROOT, 'assets/iba-logo-small.png'))

/* ---- building blocks ------------------------------------------------ */
const run = (text, o = {}) => new TextRun({ text, font: FONT, ...o })
const P = (parts, o = {}) =>
  new Paragraph({
    spacing: { after: o.after ?? 80, before: o.before ?? 0, line: o.line ?? 264 },
    alignment: o.align,
    numbering: o.bullet ? { reference: 'sq', level: 0 } : o.num ? { reference: o.num, level: 0 } : undefined,
    keepNext: o.keepNext,
    children: (Array.isArray(parts) ? parts : [parts]).map((x) => (typeof x === 'string' ? run(x, { size: o.size ?? 18, color: o.color ?? INK, bold: o.bold }) : x)),
  })
const eyebrow = (t) => P([run(t.toUpperCase(), { size: 15, color: RED, characterSpacing: 40 })], { after: 40 })
const title = (t) => P([run(t, { size: 40, color: INK })], { after: 80 })
const lede = (t) => P(t, { size: 19, color: MUTED, after: 200 })
const label = (t, color = MUTED) => P([run(t.toUpperCase(), { size: 13, color, characterSpacing: 30 })], { after: 40 })
const bullet = (t, o = {}) => P(t, { bullet: true, size: o.size ?? 16, color: o.color ?? INK, after: 40 })
const pageBreak = () => new Paragraph({ children: [new PageBreak()] })

const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
const thin = (c = LINE) => ({ style: BorderStyle.SINGLE, size: 4, color: c })
const borders = (c = LINE) => ({ top: thin(c), bottom: thin(c), left: thin(c), right: thin(c) })

/* a cell: children are paragraphs; fill is a hex colour */
const cell = (children, width, o = {}) =>
  new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    margins: { top: o.pad ?? 100, bottom: o.pad ?? 100, left: 140, right: 140 },
    borders: o.borders ?? borders(),
    verticalAlign: o.valign,
    columnSpan: o.span,
    children: children.length ? children : [P('')],
  })
const table = (widths, rows) =>
  new Table({ width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths, rows: rows.map((cells) => new TableRow({ cantSplit: true, children: cells })) })
/* split a total width into columns by weights */
const cols = (weights, total = W) => {
  const sum = weights.reduce((a, b) => a + b, 0)
  const out = weights.map((w) => Math.floor((total * w) / sum))
  out[out.length - 1] += total - out.reduce((a, b) => a + b, 0)
  return out
}
const spacer = (after = 160) => new Paragraph({ spacing: { after }, children: [] })

const masthead = (sub) =>
  table([W], [[cell([
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: W - 300 }],
      children: [
        new ImageRun({ type: 'jpg', data: W3, transformation: { width: 44, height: 44 }, altText: { title: 'Web3 Corridor', description: 'Web3 Corridor logo', name: 'w3' } }),
        run('   WEB3 CORRIDOR', { size: 24, color: 'FFFFFF', characterSpacing: 40 }),
        run(sub ? `   ${sub}` : '', { size: 14, color: ONBLACK, characterSpacing: 30 }),
        run('\tAN INITIATIVE BY   ', { size: 13, color: ONBLACK, characterSpacing: 30 }),
        new ImageRun({ type: 'png', data: IBA, transformation: { width: 52, height: 43 }, altText: { title: 'India Blockchain Alliance', description: 'IBA logo', name: 'iba' } }),
      ],
    }),
  ], W, { fill: BLACK, pad: 120, borders: { top: NONE, left: NONE, right: NONE, bottom: { style: BorderStyle.SINGLE, size: 24, color: RED } } })]])

const footer = (text) =>
  new Footer({
    children: [
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 4 } },
        tabStops: [{ type: TabStopType.RIGHT, position: W }],
        children: [
          run('■ ', { size: 14, color: RED }),
          run('Web3 Corridor', { size: 14, color: INK, bold: true }),
          run(` · ${text}`, { size: 14, color: MUTED }),
          run('\tPAGE ', { size: 13, color: MUTED, characterSpacing: 30 }),
          new TextRun({ children: [PageNumber.CURRENT], size: 13, color: MUTED, font: FONT }),
          run(' / ', { size: 13, color: MUTED }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 13, color: MUTED, font: FONT }),
        ],
      }),
    ],
  })

/* a section header block used at the top of every page */
const pageHead = (sub, eb, t, l) => [masthead(sub), spacer(200), eyebrow(eb), title(t), ...(l ? [lede(l)] : [])]

const doc = (titleText, foot, children) =>
  new Document({
    creator: 'India Blockchain Alliance',
    title: titleText,
    styles: { default: { document: { run: { font: FONT, size: 18, color: INK } } } },
    numbering: {
      config: [
        { reference: 'sq', levels: [{ level: 0, format: LevelFormat.BULLET, text: '■', alignment: AlignmentType.LEFT, style: { run: { color: RED, size: 12 }, paragraph: { indent: { left: 260, hanging: 200 } } } }] },
        ...['n1', 'n2', 'n3', 'n4', 'n5'].map((r) => ({ reference: r, levels: [{ level: 0, format: LevelFormat.DECIMAL_ZERO, text: '%1', alignment: AlignmentType.LEFT, style: { run: { color: RED }, paragraph: { indent: { left: 420, hanging: 420 } } } }] })),
      ],
    },
    sections: [
      {
        properties: { page: { size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE }, margin: { top: 600, bottom: 700, left: 720, right: 720, footer: 300 } } },
        footers: { default: footer(foot) },
        children,
      },
    ],
  })

/* cells with a heading line and bullets */
const headCell = (when, name, width, fill, o = {}) =>
  cell([label(when, o.whenColor ?? ONBLACK), P([run(name, { size: 24, color: 'FFFFFF' })], { after: 0 })], width, { fill, borders: borders(fill) })
const listCell = (intro, items, width, o = {}) =>
  cell([...(intro ? [P(intro, { size: 16, color: MUTED, after: 80 })] : []), ...items.map((x) => bullet(x))], width, o)
const gateCell = (name, text, width) =>
  cell([label(name, RED), P(text, { size: 16, after: 0 })], width, { borders: borders(INK) })
const owner = (t) => P([run(t, { size: 14, color: t.includes('IBA') ? 'A50E14' : MUTED, characterSpacing: 20 })], { after: 0 })

/* ======================================================================
   1 · FLUID EQUITY ROADMAP
   ====================================================================== */
function fluid() {
  const c = []
  const SUB = 'MEMBER ROADMAP'

  /* page 1: today and the goals */
  c.push(...pageHead(SUB, 'Fluid Equity · Club Class · 1 Dec 2026 – 30 Nov 2027', 'The rent should leave something behind.',
    'A 12-month Club Class roadmap for Fluid Equity, built around where the company is today: the model designed, counsel engaged, the pilot fund forming and the first building ahead.'))
  const [a, b] = cols([1.5, 1])
  c.push(table([a, b], [[
    cell([
      label('Fluid Equity today'),
      P([run('Fluid Equity builds '), run('rent-to-equity structures', { color: RED }), run(' for housing. Investors (Class A) buy the building with no bank loan and are paid first, when the building earns it. Residents (Class B) pay ordinary rent and build a '), run('capped stake of up to a quarter of the home', { color: RED }), run(', without a down payment or a mortgage. The stake is recorded, and it is not a coin.')].map((r) => r), { size: 19, after: 160 }),
      table(cols([1, 1, 1], a - 300), [[
        ...[['Fluid Equity', 'Core. No loan: part of the rent becomes a share of the home.'], ['Fluid Edge', 'Buildings that already have a mortgage. The lender is paid first.'], ['Fluid Entry', 'Public and authority housing. A credit, not a share.']].map(([n, d], i, arr) =>
          cell([P(n, { size: 19, after: 40 }), P(d, { size: 15, color: MUTED, after: 0 })], cols([1, 1, 1], a - 300)[i], { borders: { top: thin(INK), bottom: NONE, left: i ? thin() : NONE, right: NONE } })),
      ]]),
    ], a, { borders: { top: NONE, bottom: NONE, left: NONE, right: NONE } }),
    cell([
      ...[['Base', 'Vergennes, Vermont · eastern US pilot'], ['Stage', 'Legal first: counsel engaged, no building bought yet'], ['Capital', 'Pilot fund; Class A investors at 6%, paid when the building earns it'], ['Team', 'Andrew Lee and Peter Stevens, co-founders · Britt Crompton, CMO · Anthony Craig, blockchain educator']].flatMap(([l, v]) => [label(l), P(v, { size: 17, after: 120 })]),
    ], b, { fill: ALT, borders: borders(ALT) }),
  ]]))
  c.push(spacer(200), label('Three goals for the year · proposed, to confirm on the welcome call'))
  const g3 = cols([1, 1, 1])
  c.push(table(g3, [[
    ...[['01', 'Pilot fund investor-ready', "Deck, business plan, model and data room that answer a Class A investor's questions first time."],
      ['02', 'First-building plan set', 'Pilot market, building criteria and the order for Fluid Equity, Edge and Entry, with the regulatory steps mapped alongside counsel.'],
      ['03', 'Partners and profile', "Investors, building owners, housing authorities and technology, legal and compliance partners met through the corridor; the story told across IBA's channels."]].map(([n, t, d], i) =>
      cell([P([run(n, { size: 32, color: RED })], { after: 60 }), P(t, { size: 21, after: 60 }), P(d, { size: 16, color: MUTED, after: 0 })], g3[i])),
  ]]))
  c.push(pageBreak())

  /* page 2: The Circle pathway */
  c.push(...pageHead('', 'Your pathway · through IBA and The Circle', 'Where Club Class leads',
    "Club Class includes The Circle's Global Member programme. As Fluid Equity grows, IBA can refer it to The Circle's next levels. Each level has its own criteria; the gates in this roadmap build the evidence for the next one."))
  const q4 = cols([1, 1, 1, 1])
  const Y = '● ', PR = '◐ ', N = '○ '
  const mark = (m, t) => P([run(m, { color: m === N ? '8A8A8A' : RED, size: 16 }), run(t, { size: 16 })], { after: 50 })
  const rungs = [
    { tag: 'You are here', name: 'Global Member', sub: 'Included in Club Class', fill: RED, intro: 'Early-stage founders joining an international ecosystem before they need more intensive support.', lab: 'Includes', items: ['The ecosystem, events, workshops and roundtables', 'Directories, resources, KPI frameworks, data-room guidance', 'Up to 4 hours of mentorship a month', 'One podcast recording'] },
    { tag: 'Next · target year one', name: 'Startup Member', sub: 'Annual · by referral', intro: 'Strategic guidance to accelerate growth, sharpen commercial positioning and prepare for fundraising.', lab: 'What it takes · our early view', marks: [[Y, 'Defined business model: Class A / Class B'], [Y, 'Founders and core team in place'], [Y, 'Clear objective: the pilot fund'], [PR, 'Service ready for market: legal work under way'], [N, 'Early validation: the first building']] },
    { tag: 'Later · when the pilot runs', name: 'Seed Accelerator', sub: '3 months · selective', intro: 'Structured execution for high-potential startups with early traction, preparing a round.', lab: 'What it takes · our early view', marks: [[N, 'MVP launched, with initial traction'], [PR, 'Recurring revenue, or a clear path: rent'], [PR, 'A round of US$100K–1M: to confirm'], [PR, 'GCC focus or international scalability'], [PR, 'Team able to join weekly KPI reviews']] },
    { tag: 'Beyond year one', name: 'Series A Accelerator', sub: '4 months · selective', intro: 'For revenue-generating companies preparing institutional fundraising and international expansion.', lab: 'What it takes', items: ['Established revenue and demonstrated traction', 'Credible unit economics', 'A round of US$500K–3M', 'A defined expansion strategy'] },
  ]
  c.push(table(q4, [
    rungs.map((r, i) => cell([label(r.tag, r.fill ? 'FFE1E2' : RED), P([run(r.name, { size: 24, color: r.fill ? 'FFFFFF' : INK })], { after: 20 }), P([run(r.sub, { size: 15, color: r.fill ? 'FFE1E2' : MUTED })], { after: 0 })], q4[i], { fill: r.fill ?? ALT, borders: borders(r.fill ?? LINE) })),
    rungs.map((r, i) => cell([P(r.intro, { size: 16, color: MUTED, after: 100 }), label(r.lab, INK), ...(r.marks ? r.marks.map(([m, t]) => mark(m, t)) : r.items.map((x) => bullet(x)))], q4[i])),
  ]))
  c.push(spacer(120), P([run(Y, { color: RED }), run('In place     '), run(PR, { color: RED }), run('In progress or to confirm     '), run(N, { color: '8A8A8A' }), run('Not yet')], { size: 15, color: MUTED }))
  c.push(P("Early view from Fluid Equity's public information. The Circle assesses every application individually; admission to the accelerators is selective, and introductions or fundraising outcomes are not guaranteed.", { size: 15, color: MUTED }))
  c.push(pageBreak())

  /* page 3: the year at a glance */
  c.push(...pageHead('', 'The year at a glance', 'Four stages, four gates, one pathway',
    'Membership is a journey, not a static subscription: every stage is gated, and every gate is earned. Each quarter closes with a gate we review together before the next stage opens.'))
  const Q = [
    ['Q1 · Dec 2026 – Feb 2027', 'Foundation & Baseline', 'Get set up and verified, and agree where the pilot stands today.', ['Club Badge, verifiable vault and directory listing', 'Baseline on the KPI framework: pilot fund, building pipeline, legal milestones', 'Goals for the year confirmed', 'GTM blueprint kick-off: pilot market and product order', 'Regulatory mentoring on the Class A / Class B model, alongside counsel', 'Pilot-fund deck review 1'], 'Gate 1 · Corridor-ready', 'Verified profile live, baseline and goals agreed, GTM blueprint draft in hand.'],
    ['Q2 · Mar – May 2027', 'Pilot Strategy', 'Turn the model into a pilot plan: where, which building, in what order.', ['GTM blueprint completed: pilot market, first-building criteria, sequence for Equity, Edge and Entry', 'Business plan review: the pilot-fund model', 'Regulatory mentoring: the resident stake and its record', 'Partner map: owners, housing authorities, technology, legal and compliance', 'Roundtables and member roundups'], 'Gate 2 · Pilot plan set', 'Blueprint signed off; first-building criteria and regulatory steps clear; evidence mapped to Startup Member criteria.'],
    ['Q3 · Jun – Aug 2027', 'Fund Readiness & Story', 'Make the pilot fund investor-ready and tell the rent-to-equity story.', ['Growth advisory: deck and plan reviews, tailored funding preparation', 'Data room completed in the vault, using the data-room guidance', 'Podcast recording: the rent-to-equity story (optional distribution through The Block channels and newsletter, at extra cost)', 'Media promotion: podcast, live TV, crypto news media', 'Investor and industry networking sessions'], 'Gate 3 · Fund-ready', 'Final deck, model and data room ready; if the pilot is validated, IBA refers Fluid Equity to The Circle for Startup Member.'],
    ['Q4 · Sep – Nov 2027', 'Partners & Momentum', 'Put Fluid Equity in front of the corridor and move toward the first building.', ['Showcase at community events and curated roundtables', 'Dubai co-hosted event, at member pricing', 'Follow-up on investor and partner conversations', 'Preferential pricing on any Corridor services needed', 'Year-end review against the Q1 baseline'], 'Gate 4 · Year one complete', 'Goals reviewed; year-two path chosen: Club Class, Startup Member, or Seed Accelerator once its criteria are met.'],
  ]
  c.push(table(q4, [
    Q.map((q, i) => headCell(q[0], q[1], q4[i], i ? BLACK : RED, { whenColor: i ? ONBLACK : 'FFE1E2' })),
    Q.map((q, i) => listCell(q[2], q[3], q4[i])),
    Q.map((q, i) => gateCell(q[4], q[5], q4[i])),
  ]))
  c.push(spacer(120), P([run('ALL YEAR   ', { size: 13, color: MUTED, characterSpacing: 30 }), run('Up to 4 hours of mentorship a month', { size: 16 }), run(' (12 hours a quarter) · startup resources, KPI frameworks, playbooks and templates · member roundups · startup, investor and mentor directories · preferential pricing on Web3 Corridor services and products', { size: 16, color: MUTED })]))
  c.push(pageBreak())

  /* page 4: Q1 fortnight by fortnight */
  c.push(...pageHead('', 'Quarter one in detail · 1 Dec 2026 – 28 Feb 2027', 'Q1: Foundation & Baseline, fortnight by fortnight',
    'Four workstreams run side by side. December is lighter, around the year-end holidays; the heavy lifting is in January and February.'))
  const gw = [2700, ...cols([1, 1, 1, 1, 1, 1], W - 2700)]
  const hdr = ['Workstream', '1–14 Dec', '15–31 Dec', '1–15 Jan', '16–31 Jan', '1–14 Feb', '15–28 Feb']
  const I = (t) => ({ t, k: 'i' }), F = (t) => ({ t, k: 'f' }), G = (t) => ({ t, k: 'g' })
  const grid = [
    [['Onboarding & access', 'Badge · vault · directories'], I('Agreement signed; onboarding form; welcome call'), I('Club Badge issued; vault and directory listing set up'), F('Pilot deck, model and structure summary in the vault'), F('Directory profile complete'), null, null],
    [['Baseline & goals', 'KPI frameworks · playbooks'], I('Mentorship 1: the three goals'), F('KPI baseline: fund, pipeline, legal milestones'), I('Goals and KPIs agreed'), null, null, F('KPI check against baseline')],
    [['Pilot strategy', 'GTM blueprint · regulatory · growth advisory'], null, null, I('Mentorship 2: GTM kick-off, pilot market and product order'), I("Regulatory mentoring: Class A / Class B model, with counsel's view"), I('Mentorship 3: pilot-fund deck review 1'), F('GTM blueprint draft v1')],
    [['Network & visibility', 'Events · roundtables · LinkedIn'], null, F('Brand assets and story for the spotlight'), I('IBA LinkedIn spotlight: the mission'), I('First community event or workshop'), I('First curated roundtable'), G('Gate 1 review')],
  ]
  const FILL = { i: SOFT, f: ALT, g: BLACK }
  c.push(table(gw, [
    hdr.map((h, i) => cell([label(h, i ? RED : MUTED)], gw[i], { borders: { top: NONE, left: NONE, right: NONE, bottom: thin(INK) } })),
    ...grid.map((r) => r.map((v, i) => {
      if (i === 0) return cell([P(v[0], { size: 17, after: 20 }), P(v[1], { size: 13, color: MUTED, after: 0 })], gw[0])
      if (!v) return cell([], gw[i])
      return cell([P(v.t, { size: 15, color: v.k === 'g' ? 'FFFFFF' : INK, after: 0 })], gw[i], { fill: FILL[v.k] })
    })),
  ]))
  c.push(spacer(200), label('Mentorship hours in Q1 · up to 12', INK))
  const h3 = cols([1, 1, 1])
  c.push(table(h3, [[['December · 4 h', 'Welcome; the three goals; KPI baseline walk-through'], ['January · 4 h', 'GTM blueprint kick-off; regulatory mentoring on the resident stake'], ['February · 4 h', 'Pilot-fund deck review 1; Gate 1 review']].map(([t, d], i) => cell([P([run(t, { size: 20, color: RED })], { after: 40 }), P(d, { size: 15, color: MUTED, after: 0 })], h3[i]))]))
  c.push(spacer(100), P([run('  Session or milestone with IBA  ', { size: 15, shading: { type: ShadingType.CLEAR, color: 'auto', fill: SOFT } }), run('     '), run('  Work by Fluid Equity  ', { size: 15, shading: { type: ShadingType.CLEAR, color: 'auto', fill: ALT } }), run('     '), run('  Gate review  ', { size: 15, color: 'FFFFFF', shading: { type: ShadingType.CLEAR, color: 'auto', fill: BLACK } })]))
  c.push(pageBreak())

  /* page 5: Q1 actions, gate */
  c.push(...pageHead('', 'Quarter one in detail', 'Q1 actions, owners and the gate'))
  const acts = [
    ['Sign the Membership Agreement and complete the onboarding form', '5 Dec', 'Fluid Equity'],
    ['Welcome call: introductions, ways of working, mentorship schedule', 'Week of 7 Dec', 'IBA · FE'],
    ['Issue the official Club Badge; set up the verifiable vault and directory listing', '14 Dec', 'IBA'],
    ['Mentorship 1: the three goals; share the KPI framework and playbooks', '18 Dec', 'IBA'],
    ['Send logo, one-line description and link for the LinkedIn spotlight', '22 Dec', 'Fluid Equity'],
    ['KPI baseline (pilot fund, building pipeline, legal milestones); load the pilot deck, model and structure summary to the vault', '10 Jan', 'Fluid Equity'],
    ['Agree the three goals and the KPIs that track them', '15 Jan', 'IBA · FE'],
    ['Publish the LinkedIn spotlight on the mission, cleared with Fluid Equity', '15 Jan', 'IBA'],
    ['Mentorship 2: GTM kick-off; regulatory mentoring on the Class A / Class B model', '31 Jan', 'IBA'],
    ['Attend a community event; shortlist investors, owners and partners from the directories', '31 Jan', 'Fluid Equity'],
    ['Mentorship 3: pilot-fund deck review 1 (growth advisory)', '14 Feb', 'IBA'],
    ['Join the first curated roundtable', '14 Feb', 'Fluid Equity'],
    ['Draft GTM blueprint v1: pilot market, first-building criteria, product order; record readiness against The Circle criteria', '21 Feb', 'Fluid Equity'],
    ['Gate 1 review and Q2 plan', '28 Feb', 'IBA · FE'],
  ]
  const aw = [500, W - 500 - 1600 - 1700, 1600, 1700]
  const rowB = { top: NONE, left: NONE, right: NONE, bottom: thin() }
  const actsTable = table(aw, [
    ['', 'Action', 'By', 'Owner'].map((h, i) => cell([label(h)], aw[i], { pad: 60, borders: { top: NONE, left: NONE, right: NONE, bottom: thin(INK) } })),
    ...acts.map((r, k) => [
      cell([P([run(String(k + 1).padStart(2, '0'), { color: RED, size: 15 })], { after: 0 })], aw[0], { pad: 50, borders: rowB }),
      cell([P(r[0], { size: 15, after: 0 })], aw[1], { pad: 50, borders: rowB }),
      cell([P(r[1], { size: 15, after: 0 })], aw[2], { pad: 50, borders: rowB }),
      cell([owner(r[2])], aw[3], { pad: 50, borders: rowB }),
    ]),
  ])
  const gate1 = ['Club Badge issued; directory profile live', 'Pilot deck, model and structure summary in the vault', 'KPI baseline recorded', 'Three goals and their KPIs agreed', 'GTM blueprint v1 drafted', 'Pilot-fund deck reviewed once, actions noted', 'Readiness against The Circle criteria recorded', 'One community event and one roundtable attended', 'LinkedIn spotlight published']
  c.push(actsTable, spacer(160))
  const [L, R2] = cols([1.1, 1])
  c.push(table([L, R2], [[
    cell([P([run('Gate 1 \u00b7 Corridor-ready', { size: 21, color: 'FFFFFF' })], { after: 60 }), P([run('Reviewed together on 28 Feb. Q2 opens when these are in place:', { size: 15, color: ONBLACK })], { after: 80 }), ...gate1.map((g) => P([run(g, { size: 15, color: 'FFFFFF' })], { bullet: true, after: 30 }))], L, { fill: BLACK, borders: borders(BLACK) }),
    cell([P([run('A note on promotion', { size: 20 })], { after: 60 }), P("IBA's spotlight, podcast and media promotion tell Fluid Equity's mission and model. They do not promote the pilot fund or any investment. Fluid Equity clears investor-facing wording with its counsel first. IBA's mentoring is not legal or investment advice; counsel leads on the legal work.", { size: 15, color: MUTED, after: 0 })], R2),
  ]]))
  c.push(pageBreak())

  /* page 6: how to proceed */
  c.push(...pageHead('', 'How to proceed', 'Getting started: the next two weeks'))
  const p3 = cols([1, 1, 1])
  const colBlock = (h, items, numRef) => [
    P([run(h, { size: 22 })], { after: 80 }),
    ...items.map(([t, d]) => P([run(t, { size: 17 }), run(`  ${d}`, { size: 15, color: MUTED })], numRef ? { num: numRef, after: 80 } : { bullet: true, after: 80 })),
  ]
  c.push(table(p3, [[
    cell(colBlock('Before 1 December', [['Send the welcome pack', 'Welcome letter, invoice and this roadmap to Fluid Equity.'], ['Name the leads on both sides', 'One IBA lead, and one Fluid Equity lead (for example Andrew Lee, who runs operations and partnerships), to own the roadmap and the gates.'], ['Share the onboarding form and Membership Agreement', 'So both are complete by 5 December.'], ['Book the welcome call', 'Week of 7 December, with the co-founders.']], 'n1'), p3[0], { borders: { top: thin(INK), bottom: NONE, left: NONE, right: NONE } }),
    cell(colBlock('On the welcome call', [['Walk through this roadmap', 'Confirm the three goals, the four stages, the Gate 1 criteria and the pathway through The Circle.'], ["Book Q1's three mentorship blocks", 'December, January and February, four hours each.'], ['Agree how we work', 'A short monthly check-in inside the mentorship hours; email updates between.'], ['Hand over the starter kit', 'KPI framework, playbooks, templates and the data-room checklist.']], 'n2'), p3[1], { borders: { top: thin(INK), bottom: NONE, left: NONE, right: NONE } }),
    cell(colBlock('What we need from Fluid Equity', [['Lead and billing contacts', 'Name, title, email and billing address.'], ['Documents for the vault', 'Pilot-fund deck, financial model, the Class A / Class B structure summary, and what counsel can share.'], ['Spotlight material', 'Logo, a one-line description and the mission in a sentence: “The rent should leave something behind.”'], ['Where the pilot stands', 'Fund target and progress, buildings under review, legal milestones: the starting point for the baseline.']]), p3[2], { borders: { top: thin(INK), bottom: NONE, left: NONE, right: NONE } }),
  ]]))
  c.push(spacer(200), table([W], [[cell([P([run('How the gates work. ', { size: 17, bold: true }), run("At the end of each quarter we review the gate together. When its criteria are met, the next stage opens; if something is outstanding, we agree what closes it and carry it into the next quarter's first weeks. The gates keep the year moving at Fluid Equity's pace: legal first, no rushing the foundation.", { size: 17 })], { after: 0 })], W, { fill: ALT, borders: { top: NONE, bottom: NONE, right: NONE, left: { style: BorderStyle.SINGLE, size: 24, color: RED } } })]]))

  return doc('Fluid Equity · Club Class roadmap 2026–27', 'Fluid Equity · Club Class roadmap · Prepared 18 Nov 2026', c)
}

/* ======================================================================
   2 · PARTNERSHIP ROADMAP (internal)
   ====================================================================== */
function partner() {
  const c = []
  const SUB = 'PARTNERSHIP ROADMAP · INTERNAL'

  /* page 1: two tracks */
  c.push(...pageHead(SUB, 'IBA × The Circle × LINKK Global · Dec 2026 – Nov 2027 · internal', 'Partnership roadmap: the year at a glance',
    'Two tracks run together. The Circle gives IBA members a pathway from Global Member to the accelerators. LINKK Global opens international ecosystem development: partners, India–UAE/GCC market entry, investors, joint programmes and venture building.'))
  const tw = [2600, ...cols([1, 1, 1, 1], W - 2600)]
  const qs = [['Q1 · Dec – Feb', 'Set up'], ['Q2 · Mar – May', 'Launch'], ['Q3 · Jun – Aug', 'Scale'], ['Q4 · Sep – Nov', 'Review & renew']]
  const circle = [['Agree referral terms and process', 'Club Class confirmed as Global Member', 'Triage guide and co-branded one-pager', 'First referrals screened, starting with current members'], ['Referral route live from /membership', 'First Startup Member referrals', 'IBA members at Circle events and roundtables', 'First joint founder roundtable'], ['Seed Accelerator shortlist: GCC-focused, internationally scalable', 'Podcast features for IBA founders', 'Members move up as they meet criteria'], ['Referrals, admissions and feedback reviewed', 'Terms renewed or adjusted', 'Year-two referral plan']]
  const linkk = [['Review LINKK; choose two or three first areas', 'IBA joins as ecosystem partner', 'Leads named on both sides'], ['First India → UAE market-entry session', 'Introductions to selected accelerators and incubators', 'Exchange lists of India–UAE startups'], ['Investor and corporate matching pilot', 'Joint content: venture building, GTM, capital readiness, expansion', 'Venture-building referrals, case by case'], ['Outcomes reviewed', 'Joint initiatives with IBA-connected accelerators and incubators', 'Year-two programme agreed']]
  const gates = ['Agreements and process in place', 'First referrals made; first joint session delivered', 'Pipeline flowing both ways', 'Results reviewed; year-two scope agreed']
  const trackCell = (t, s) => cell([P(t, { size: 20, after: 20 }), P(s, { size: 14, color: MUTED, after: 0 })], tw[0])
  c.push(table(tw, [
    [cell([], tw[0], { borders: { top: NONE, left: NONE, right: NONE, bottom: NONE } }), ...qs.map((q, i) => headCell(q[0], q[1], tw[i + 1], i ? BLACK : RED, { whenColor: i ? ONBLACK : 'FFE1E2' }))],
    [trackCell('The Circle', 'Membership pathway'), ...circle.map((items, i) => listCell('', items, tw[i + 1]))],
    [trackCell('LINKK Global', 'Ecosystem collaboration'), ...linkk.map((items, i) => listCell('', items, tw[i + 1]))],
    [cell([label('Gate', RED)], tw[0], { fill: ALT }), ...gates.map((g, i) => cell([P(g, { size: 16, after: 0 })], tw[i + 1], { fill: ALT }))],
  ]))
  c.push(pageBreak())

  /* page 2: The Circle levels and triage */
  c.push(...pageHead('', 'Track 1 · The Circle', 'Which members to refer where',
    "The Circle reviews every application and recommends the level. IBA's job is a good first sort, and an honest promise: admission to the accelerators is selective, and introductions or fundraising outcomes are not guaranteed."))
  const lw = cols([1.25, 1.35, 2.2, 2.2, 1.15])
  const lv = [
    ['Global Member', 'US$990 / year', 'Idea-stage, pre-seed and early-stage founders joining an ecosystem', 'Ecosystem, events, directories, resources; up to 4 h mentorship a month; one podcast recording (distribution +US$300)', 'A clear concept, product or service, and founders actively building. No revenue or fundraising minimum', 'Included in Club Class (US$2,500)'],
    ['Startup Member', 'US$4,990 / year', 'Past the idea; needs strategy to grow, position and prepare to raise', 'Strategic, GTM and marketing advisory; investor readiness; curated introductions; up to 12 h mentorship a month; two Circle events; a featured podcast episode', 'A product, MVP or service ready for market; early validation, customers or pilots; a defined business model; a team that can execute; a clear growth or fundraising goal', 'Referral'],
    ['Seed Accelerator', 'US$9,900 / 3 months', 'High-potential startups with early traction preparing a round', 'Weekly strategy and KPI sessions; growth roadmap; operational support; deck, model and data-room review; fundraising strategy; investor and family-office introductions', 'An MVP with traction; recurring revenue or a clear path; a round of US$100K–1M; GCC focus or international scalability; a committed team', 'Referral · selective'],
    ['Series A Accelerator', 'US$19,900 / 4 months', 'Revenue-generating companies preparing institutional capital and expansion', 'Fundraising strategy; weekly founder and KPI sessions; VC preparation; executive positioning; market-entry planning; corporate and institutional introductions', 'Established revenue and traction; credible unit economics; a round of US$500K–3M; a defined expansion strategy; an experienced leadership team', 'Referral · selective'],
  ]
  const rb = { top: NONE, left: NONE, right: NONE, bottom: thin() }
  c.push(table(lw, [
    ["Level · The Circle's price", 'For', 'Key inclusions', 'Refer when the member has', 'Through IBA'].map((h, i) => cell([label(h)], lw[i], { pad: 60, borders: { top: NONE, left: NONE, right: NONE, bottom: thin(INK) } })),
    ...lv.map((r) => [
      cell([P(r[0], { size: 19, after: 20 }), P(r[1], { size: 15, color: MUTED, after: 0 })], lw[0], { borders: rb }),
      ...[2, 3, 4].map((k, j) => cell([P(r[k], { size: 15, color: MUTED, after: 0 })], lw[j + 1], { borders: rb })),
      cell([P(r[5], { size: 15, color: r[5].startsWith('Included') ? RED : INK, after: 0 })], lw[4], { borders: rb }),
    ]),
  ]))
  c.push(spacer(160))
  const b2 = cols([1.6, 1])
  c.push(table(b2, [[
    cell([P([run('What The Circle assesses', { size: 20 })], { after: 60 }), P('Company stage and business model · product and commercial traction · revenue, growth potential and scalability · team experience and execution capacity · fundraising objectives and investor readiness · geographic focus and international potential · the support the company actually needs', { size: 15, color: MUTED, after: 0 })], b2[0]),
    cell([P([run('The Web3 Corridor fit', { size: 20 })], { after: 60 }), P("The Seed Accelerator asks for a GCC focus or international scalability. India–UAE corridor startups fit that by design, which makes them IBA's strongest accelerator referrals.", { size: 15, color: MUTED, after: 0 })], b2[1]),
  ]]))
  c.push(pageBreak())

  /* page 3: LINKK */
  c.push(...pageHead('', 'Track 2 · LINKK Global, by Limitless Capital', 'Five areas, in the order we suggest',
    'LINKK combines an international venture ecosystem with hands-on venture building. LINKK proposed five areas. We suggest starting with the three that fit the Web3 Corridor directly, and adding the other two once the first are working.'))
  const kw = cols([1.6, 2.6, 2.1, 0.9])
  const areas = [
    ['A · International ecosystem partnership', 'IBA joins LINKK as an ecosystem partner; connections to accelerators, incubators, innovation hubs and venture organisations abroad', 'Partner onboarding; a list of the organisations IBA most wants to meet', 'Start · Q1', true],
    ['B · India–UAE / GCC market expansion', "The Web3 Corridor's core: Indian startups into the UAE and GCC, and UAE or international companies into India", 'One joint market-entry session, India → UAE, with founders from both networks', 'Start · Q1–Q2', true],
    ['D · Joint programmes, events and knowledge', 'Online sessions, founder roundtables and workshops; shared content on venture building, GTM, capital readiness and expansion', 'A joint calendar: one online session a quarter, starting Q2', 'Start · Q2', true],
    ['C · Investor and corporate connections', 'Matching startups to specific investor or corporate interests, with materials prepared before any approach', 'A matching pilot on a short list of corridor startups', 'Next · Q3', false],
    ['E · Venture building support', "LINKK's hands-on services for IBA startups needing operational support; possible dedicated programmes for selected groups", 'Refer case by case; consider a dedicated programme for year two', 'Later · Q3–Q4', false],
  ]
  c.push(table(kw, [
    ['Area', 'What it means for IBA', 'First concrete step', 'When'].map((h, i) => cell([label(h)], kw[i], { pad: 60, borders: { top: NONE, left: NONE, right: NONE, bottom: thin(INK) } })),
    ...areas.map((r) => [
      cell([P(r[0], { size: 18, after: 0 })], kw[0], { borders: rb }),
      cell([P(r[1], { size: 15, color: MUTED, after: 0 })], kw[1], { borders: rb }),
      cell([P(r[2], { size: 15, color: MUTED, after: 0 })], kw[2], { borders: rb }),
      cell([P(r[3], { size: 15, color: r[4] ? RED : MUTED, after: 0 })], kw[3], { borders: rb }),
    ]),
  ]))
  c.push(spacer(200), table([W], [[cell([P([run('Two-way by design. ', { size: 17, bold: true }), run('LINKK proposes a collaboration where both ecosystems benefit. In practice that means IBA brings corridor startups, Indian market access and its councils; LINKK brings international venture organisations, GCC partners and venture-building capacity. Each initiative should name what each side gives and gets.', { size: 17 })], { after: 0 })], W, { fill: ALT, borders: { top: NONE, bottom: NONE, right: NONE, left: { style: BorderStyle.SINGLE, size: 24, color: RED } } })]]))
  c.push(pageBreak())

  /* page 4: Q1 actions */
  c.push(...pageHead('', 'Quarter one in detail · 1 Dec 2026 – 28 Feb 2027', 'Q1: Set up, step by step'))
  const qa = [
    ['Reply to The Circle and LINKK: thanks, questions, and a call to agree next steps (draft on the next page)', 'Both', '25 Nov', 'IBA'],
    ['Read The Circle deck; list questions on terms, process and how members are introduced', 'The Circle', '30 Nov', 'IBA'],
    ['Review LINKK (site, introduction video); confirm the first areas: A, B and D', 'LINKK', '5 Dec', 'IBA'],
    ['Partner call: referral terms, process and reporting with The Circle; scope with LINKK', 'Both', '12 Dec', 'IBA · Partners'],
    ['Agree commercial terms for referrals beyond Global Member, in writing', 'The Circle', '15 Jan', 'IBA · Circle'],
    ["Write the triage guide (page 2) into IBA's enquiry handling; add consent to share member details", 'The Circle', '22 Jan', 'IBA'],
    ['Co-branded one-pager: the pathway from Club Class to the accelerators, with the no-guarantee wording', 'The Circle', '31 Jan', 'IBA · Circle'],
    ['Join LINKK as ecosystem partner; name leads; list the organisations IBA wants to meet', 'LINKK', '31 Jan', 'IBA · LINKK'],
    ['Screen current members against the criteria; first referrals to The Circle', 'The Circle', '14 Feb', 'IBA'],
    ['Plan the first India → UAE market-entry session for Q2: date, format, founders from both sides', 'LINKK', '21 Feb', 'IBA · LINKK'],
    ['Gate review: agreements and process in place; Q2 plan', 'Both', '28 Feb', 'IBA'],
  ]
  const aw2 = [600, W - 600 - 1900 - 1500 - 2000, 1900, 1500, 2000]
  c.push(table(aw2, [
    ['', 'Action', 'Track', 'By', 'Owner'].map((h, i) => cell([label(h)], aw2[i], { pad: 60, borders: { top: NONE, left: NONE, right: NONE, bottom: thin(INK) } })),
    ...qa.map((r, k) => [
      cell([P([run(String(k + 1).padStart(2, '0'), { color: RED, size: 16 })], { after: 0 })], aw2[0], { pad: 70, borders: rb }),
      cell([P(r[0], { size: 16, after: 0 })], aw2[1], { pad: 70, borders: rb }),
      cell([P(r[1], { size: 15, color: MUTED, after: 0 })], aw2[2], { pad: 70, borders: rb }),
      cell([P(r[2], { size: 16, after: 0 })], aw2[3], { pad: 70, borders: rb }),
      cell([owner(r[3])], aw2[4], { pad: 70, borders: rb }),
    ]),
  ]))
  c.push(pageBreak())

  /* page 5: decisions, reply, KPIs */
  c.push(...pageHead('', 'How to proceed', 'Decisions for IBA, and the reply'))
  const d2 = cols([1.15, 1])
  const decisions = [
    ['Commercial terms', 'Referral fee or revenue share on Startup Member and accelerator referrals. Club Class already bundles Global Member (US$990) inside US$2,500.'],
    ['How the levels are presented', 'The Circle says it is now part of IBA’s membership offering. Show the levels as “the IBA pathway, with The Circle”, or as The Circle’s own programmes?'],
    ['Member data and consent', 'Referrals share company details. Add consent to the enquiry and brochure forms before the first referral.'],
    ['Promises', 'Every referral and every page says it plainly: admission is selective; introductions and fundraising outcomes are not guaranteed.'],
    ['LINKK scope', 'Confirm A, B and D first; agree whether ecosystem partnership carries any cost or commitment.'],
  ]
  const reply = [
    [null, "Thank you for the detailed overview of The Circle's programmes and the introduction to LINKK Global."],
    ['The Circle. ', 'The levels and criteria are clear, and we will use them to refer members. Our Club Class already includes Global Member. Before the first referrals to Startup Member and the accelerators, we would like to agree the referral process, how outcomes are reported back to us, and the commercial terms. Could you also confirm the brand use on co-branded material? It is IBA, India Blockchain Alliance.'],
    ['LINKK Global. ', 'We would like to start with three areas: the ecosystem partnership (A), India–UAE/GCC market expansion (B) and joint sessions and roundtables (D), with a first India → UAE market-entry session in Q2. Investor and corporate connections (C) and venture building (E) could follow once those are running.'],
    [null, 'Could we set a call in the week of 7 December to agree next steps?'],
  ]
  c.push(table(d2, [[
    cell([
      P([run('Decide before the partner call', { size: 22 })], { after: 80 }),
      ...decisions.map(([t, d]) => P([run(t, { size: 17 }), run(`  ${d}`, { size: 15, color: MUTED })], { num: 'n3', after: 80 })),
      P('Note: the email says “IAB” throughout. Ask that partner materials use IBA, India Blockchain Alliance.', { size: 14, color: MUTED, before: 80 }),
    ], d2[0], { borders: { top: thin(INK), bottom: NONE, left: NONE, right: NONE } }),
    cell([
      P([run('Suggested reply', { size: 22 })], { after: 80 }),
      ...reply.map(([b, t]) => P([...(b ? [run(b, { size: 16, color: RED })] : []), run(t, { size: 16 })], { after: 100 })),
    ], d2[1]),
  ]]))
  c.push(spacer(160), label('Track all year · targets to set on the partner call'))
  const k6 = cols([1, 1, 1, 1, 1, 1])
  c.push(table(k6, [[['Referrals', 'by level'], ['Admissions', 'by level'], ['Members moving up', 'a level'], ['Joint sessions', 'delivered'], ['Corridor startups', 'supported India ↔ UAE'], ['Introductions', 'investor, corporate, ecosystem']].map(([t, s], i) => cell([P(t, { size: 18, after: 20 }), P(s, { size: 14, color: MUTED, after: 0 })], k6[i]))]))

  return doc('IBA partnership roadmap: The Circle and LINKK Global 2026–27 (internal)', 'Partnership roadmap · Internal: contains partner pricing', c)
}

;(async () => {
  const out = [
    [fluid(), 'members/fluid-equity/Roadmap - Fluid Equity - Club Class 2026-27.docx'],
    [partner(), 'partners/the-circle-linkk/Partnership Roadmap - The Circle and LINKK Global 2026-27 (internal).docx'],
  ]
  for (const [d, rel] of out) {
    const file = path.join(ROOT, rel)
    fs.writeFileSync(file, await Packer.toBuffer(d))
    console.log('wrote', path.relative(process.cwd(), file))
  }
})()
