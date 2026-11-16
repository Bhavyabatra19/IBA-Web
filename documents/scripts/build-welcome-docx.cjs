/**
 * Builds the Word welcome-letter templates, one per tier, into documents/word/.
 *
 *   node documents/scripts/build-welcome-docx.cjs
 *
 * Needs the `docx` package (npm i docx). Tier names, prices, partners and
 * benefits come from documents/assets/tiers.js, so the letters stay in step
 * with the invoice, the printed letter and the brochures.
 *
 * Made for email: simple formatting that survives being pasted into Gmail or
 * Outlook, Arial (Questrial is not installed on most recipients' machines),
 * and every value to fill in as a [bracketed placeholder] highlighted in
 * yellow, so nothing is missed before sending.
 */
const fs = require('fs')
const path = require('path')
const {
  Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType, LevelFormat,
  BorderStyle, TabStopType, Footer, ExternalHyperlink,
} = require('docx')

const ROOT = path.join(__dirname, '..')
global.window = {}
require(path.join(ROOT, 'assets/tiers.js'))
const W3C = global.window.W3C

const RED = 'D71920'
const INK = '0E0E0E'
const MUTED = '5C5C5C'
const FONT = 'Arial'

const W3_LOGO = fs.readFileSync(path.join(ROOT, 'assets/web3-corridor-square.jpg'))
const IBA_LOGO = fs.readFileSync(path.join(ROOT, 'assets/iba-logo-small.png'))

/* a run of text; segments are strings, { ph } placeholders, { b } bold,
   { red } red text, { link, text } hyperlinks */
const runs = (parts, base = {}) =>
  parts.map((p) => {
    if (typeof p === 'string') return new TextRun({ text: p, ...base })
    if (p.ph) return new TextRun({ text: `[${p.ph}]`, highlight: 'yellow', ...base })
    if (p.b) return new TextRun({ text: p.b, bold: true, ...base })
    if (p.red) return new TextRun({ text: p.red, color: RED, ...base })
    if (p.link)
      return new ExternalHyperlink({ link: p.link, children: [new TextRun({ text: p.text, color: RED, underline: {}, ...base })] })
    return new TextRun({ text: String(p), ...base })
  })

const para = (parts, opts = {}) =>
  new Paragraph({ spacing: { after: 160, line: 300 }, ...opts, children: runs(parts, opts.run) })

const bullet = (parts) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 100, line: 280 }, children: runs(parts) })
const step = (parts) => new Paragraph({ numbering: { reference: 'steps', level: 0 }, spacing: { after: 120, line: 280 }, children: runs(parts) })

function letter(key) {
  const t = W3C.tiers[key]
  const xch = key === 'xchange'
  const prog = xch ? 'Indo–UAE Startup Xchange' : 'Web360 Club'
  const price = `US$${t.price.toLocaleString('en-US')}`

  const children = [
    /* logos: Web3 Corridor left, IBA right */
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: 9026 }],
      spacing: { after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: RED, space: 8 } },
      children: [
        new ImageRun({ type: 'jpg', data: W3_LOGO, transformation: { width: 64, height: 64 }, altText: { title: 'Web3 Corridor', description: 'Web3 Corridor logo', name: 'Web3 Corridor' } }),
        new TextRun({ text: '\tAn initiative by  ', size: 14, color: MUTED, characterSpacing: 30 }),
        new ImageRun({ type: 'png', data: IBA_LOGO, transformation: { width: 78, height: 65 }, altText: { title: 'India Blockchain Alliance', description: 'India Blockchain Alliance logo', name: 'IBA' } }),
      ],
    }),
    para([{ ph: 'Date' }], { spacing: { before: 240, after: 240 } }),
    para([{ ph: 'First name' }, ' ', { ph: 'Last name' }, ', ', { ph: 'Title' }], { spacing: { after: 0 } }),
    para([{ ph: 'Company name' }], { spacing: { after: 0 } }),
    para([{ ph: 'City, Country' }], { spacing: { after: 320 } }),

    para(['Dear ', { ph: 'First name' }, ',']),
    para([
      `It was a pleasure speaking with you again today. As discussed, we will lock in your ${t.name} membership dues of `,
      { b: `${price} per year` },
      '. ',
      { ph: 'Company name' },
      ' will make the first payment of ',
      { ph: 'amount' },
      ' on ',
      { ph: 'date' },
      ', and the balance is payable in ',
      { ph: 'number' },
      ' further instalments of ',
      { ph: 'amount' },
      ' on ',
      { ph: 'dates' },
      ', as set out in your invoice.',
    ]),

    para([{ b: 'Welcome to the Web3 Corridor!' }], { spacing: { before: 200, after: 80 }, run: { size: 32 } }),
    para(['We’re excited to have ', { ph: 'Company name' }, ` join as a ${t.name.toUpperCase()} MEMBER.`], {
      run: { size: 26, color: RED },
      spacing: { after: 240 },
    }),

    /* membership summary */
    para([{ b: 'Your membership' }], { spacing: { after: 80 } }),
    para(['Programme: ', { b: prog }], { spacing: { after: 40 } }),
    para(['Membership: ', { b: `${t.name} · ${t.sub}` }], { spacing: { after: 40 } }),
    para(['Term: ', { ph: 'start date' }, ' to ', { ph: 'end date' }], { spacing: { after: 40 } }),
    para(['Annual dues: ', { b: price }, ' plus applicable taxes'], { spacing: { after: 40 } }),
    ...(t.servicePartners ? [para(['Service partners: ', { b: t.servicePartners }], { spacing: { after: 40 } })] : []),
    para(['Member ID: ', { ph: 'Member ID' }], { spacing: { after: 240 } }),

    /* every benefit the tier includes, in full: each letter stands on its
       own and never refers to another tier (by request, 11-16-2026) */
    para([{ b: 'Your benefits in full' }], { run: { size: 26 }, spacing: { before: 120, after: 80 } }),
    para([`As a ${t.name} member you have access to all ${W3C.countFor(key)} benefits below, for the full term of your membership.`], { spacing: { after: 160 } }),
    ...W3C.benefitsFor(key).flatMap((g) => [
      new Paragraph({
        keepNext: true,
        spacing: { before: 200, after: 80 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 2 } },
        children: [
          new TextRun({ text: g.name.toUpperCase(), color: RED, size: 17, characterSpacing: 30 }),
          new TextRun({ text: `   ${g.items.length} ${g.items.length === 1 ? 'benefit' : 'benefits'}`, color: MUTED, size: 15 }),
        ],
      }),
      ...g.items.map((b) => bullet([{ b: b.t }, ...(b.tag ? [{ red: ` (${b.tag})` }] : []), ` — ${b.d}`])),
    ]),
    para([''], { spacing: { after: 120 } }),

    para([{ b: 'To complete your onboarding, please take the following steps:' }], { spacing: { before: 200, after: 120 } }),
    step([{ b: 'Complete your member onboarding. ' }, 'Fill in the onboarding form so we can set up your membership, verify your organisation (KYC/KYB) and create your member directory profile: ', { ph: 'onboarding form link' }]),
    step([{ b: 'Sign your Membership Agreement. ' }, 'Please sign and return the Web3 Corridor Membership Agreement to ', { link: 'mailto:hello@indiablockchainalliance.org', text: 'hello@indiablockchainalliance.org' }, '.']),
    step([{ b: 'Complete your first dues payment — ' }, { ph: 'amount' }, { b: '. ' }, 'Your invoice and payment instructions are attached. Dues are collected by our billing partner, Northstar Tecq; please quote your invoice number as the reference. Online payment link: ', { ph: 'payment link' }]),
    xch
      ? step([{ b: 'Choose your track. ' }, 'Confirm whether you are taking the India → UAE or UAE → India track, so we can line up your compliance clinics and first introductions.'])
      : step([{ b: 'Set up IBA SafeVault. ' }, `Once onboarding is approved you will receive SafeVault access for your corporate documents and data room, and your official ${t.name} member badge.`]),
    step([{ b: xch ? 'Meet your corridor concierge. ' : 'Your welcome call. ' }, 'Your corridor concierge, ', { ph: 'name' }, `, will be in touch within ${'two'} working days to schedule ${xch ? 'your sprint kick-off' : 'a welcome call'}, map your goals for the year and line up your first introductions${xch ? '' : ' and roundtable invitations'}.`]),

    para(['We’re excited to welcome ', { ph: 'Company name' }, ' to the Web3 Corridor family, and we look forward to building with you across India, the UAE and beyond.'], { spacing: { before: 240 } }),
    para(['Warm regards,'], { spacing: { before: 240, after: 360 } }),

    /* signature, modelled on the IBA email signature */
    new Paragraph({
      spacing: { after: 0 },
      border: { left: { style: BorderStyle.SINGLE, size: 18, color: RED, space: 10 } },
      indent: { left: 200 },
      children: [new TextRun({ text: 'Raj Kapoor', size: 28, font: FONT, color: INK })],
    }),
    new Paragraph({
      spacing: { after: 0 },
      border: { left: { style: BorderStyle.SINGLE, size: 18, color: RED, space: 10 } },
      indent: { left: 200 },
      children: runs(['Founder  |  ', { b: 'India Blockchain Alliance' }, ' · ', { red: 'Web3 Corridor' }], { size: 19 }),
    }),
    new Paragraph({
      spacing: { after: 0 },
      border: { left: { style: BorderStyle.SINGLE, size: 18, color: RED, space: 10 } },
      indent: { left: 200 },
      children: runs([{ b: 'E: ' }, 'hello@indiablockchainalliance.org   ', { b: 'W: ' }, 'indiablockchainalliance.org'], { size: 18, color: MUTED }),
    }),
    new Paragraph({
      spacing: { after: 320 },
      border: { left: { style: BorderStyle.SINGLE, size: 18, color: RED, space: 10 } },
      indent: { left: 200 },
      children: runs([{ b: 'P: ' }, { ph: 'phone' }, '   ', { b: 'in: ' }, 'linkedin.com/company/indiablockchain'], { size: 18, color: MUTED }),
    }),

    para([
      { b: 'PS — ' },
      'We will send a short membership announcement and LinkedIn spotlight for your approval. If you have brand assets (logo, a one-line description and a link), reply with them and we will add ',
      { ph: 'Company name' },
      ' to the member directory and Web3 Corridor promotions.',
    ], { run: { size: 19, color: MUTED } }),
  ]

  return new Document({
    creator: 'India Blockchain Alliance',
    title: `Web3 Corridor welcome letter — ${t.name}`,
    description: `Welcome letter template for ${t.name} members of the Web3 Corridor`,
    styles: { default: { document: { run: { font: FONT, size: 21, color: INK } } } },
    numbering: {
      config: [
        { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '■', alignment: AlignmentType.LEFT, style: { run: { color: RED, size: 14 }, paragraph: { indent: { left: 400, hanging: 280 } } } }] },
        { reference: 'steps', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { run: { color: RED, bold: true }, paragraph: { indent: { left: 400, hanging: 340 } } } }] },
      ],
    },
    sections: [
      {
        properties: { page: { margin: { top: 1000, bottom: 1000, left: 1300, right: 1300 } } },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'E2DFDD', space: 6 } },
                children: runs([{ red: '■ ' }, { b: 'Web3 Corridor' }, ' · An initiative by India Blockchain Alliance. Membership billing and payments: Northstar Tecq.'], { size: 15, color: MUTED }),
              }),
            ],
          }),
        },
        children,
      },
    ],
  })
}

const OUT = path.join(ROOT, 'word')
fs.mkdirSync(OUT, { recursive: true })
const FILES = { club: 'club-class', premier: 'premier-class', gold: 'gold-class', xchange: 'gold-xchange' }
;(async () => {
  for (const [key, slug] of Object.entries(FILES)) {
    const file = path.join(OUT, `welcome-letter-${slug}.docx`)
    fs.writeFileSync(file, await Packer.toBuffer(letter(key)))
    console.log('wrote', path.relative(process.cwd(), file))
  }
})()
