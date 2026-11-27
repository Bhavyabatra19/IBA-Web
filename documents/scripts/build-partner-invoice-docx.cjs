/**
 * Partner invoice as an editable Word file (A4 portrait):
 *   documents/word/partner-invoice-template.docx
 *
 *   node documents/scripts/build-partner-invoice-docx.cjs   (needs `npm i docx`)
 *
 * Same content as documents/partner-invoice.html: the partner's name and
 * details, services, revenue share % and taxes are empty cells to type into.
 * Edit in Word or Google Docs, then File > Save as PDF.
 */
const fs = require('fs')
const path = require('path')
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, TabStopType,
  Footer, PageBreak, PageNumber, VerticalAlign, LineRuleType,
} = require('docx')

const ROOT = path.join(__dirname, '..')
const RED = 'D71920', INK = '0E0E0E', MUTED = '5C5C5C', LINE = 'E2DFDD', ALT = 'F5F3F2', BLACK = '111111', ONBLACK = 'B3B3B3'
const FONT = 'Arial'
const W = 10466 // A4 portrait width minus 0.5" margins, DXA

const W3 = fs.readFileSync(path.join(ROOT, 'assets/web3-corridor-square.jpg'))
const IBA = fs.readFileSync(path.join(ROOT, 'assets/iba-logo-small.png'))

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size ?? 18, color: o.color ?? INK, bold: o.bold, characterSpacing: o.sp })
const P = (parts, o = {}) =>
  new Paragraph({
    alignment: o.align,
    spacing: { after: o.after ?? 60, before: o.before ?? 0, line: 264, lineRule: LineRuleType.AUTO },
    numbering: o.num ? { reference: 'terms', level: 0 } : undefined,
    children: (Array.isArray(parts) ? parts : [parts]).map((x) => (typeof x === 'string' ? run(x, o) : x)),
  })
const label = (t, color = MUTED) => P([run(t.toUpperCase(), { size: 13, color, sp: 30 })], { after: 30 })
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
const thin = (c = LINE, s = 4) => ({ style: BorderStyle.SINGLE, size: s, color: c })
const noB = { top: NONE, bottom: NONE, left: NONE, right: NONE }
const lineB = { top: NONE, left: NONE, right: NONE, bottom: thin(INK, 6) } // a line to write on
const cell = (children, width, o = {}) =>
  new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    margins: { top: o.pad ?? 80, bottom: o.pad ?? 80, left: o.lr ?? 100, right: o.lr ?? 100 },
    borders: o.borders ?? noB,
    verticalAlign: o.valign ?? VerticalAlign.BOTTOM,
    columnSpan: o.span,
    children: children.length ? children : [P('', { after: 0 })],
  })
const table = (widths, rows) =>
  new Table({ width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths, rows: rows.map((cells) => new TableRow({ children: cells })) })
const spacer = (after = 160) => new Paragraph({ spacing: { after }, children: [] })
/* an empty field: a cell with a line under it and a small caption */
const field = (caption, width, o = {}) => cell([P('', { after: 0, size: 19, align: o.align })], width, { borders: lineB, pad: o.pad ?? 60 })
const caption = (t, width) => cell([P([run(t.toUpperCase(), { size: 11, color: '8A8A8A', sp: 20 })], { after: 0 })], width, { pad: 20, valign: VerticalAlign.TOP })

const masthead = () =>
  table([W], [[cell([
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: W - 250 }],
      children: [
        new ImageRun({ type: 'jpg', data: W3, transformation: { width: 44, height: 44 }, altText: { title: 'Web3 Corridor', description: 'Web3 Corridor logo', name: 'w3' } }),
        run('   WEB3 CORRIDOR', { size: 24, color: 'FFFFFF', sp: 40 }),
        run('   PARTNER BILLING', { size: 13, color: ONBLACK, sp: 30 }),
        run('\tAN INITIATIVE BY   ', { size: 12, color: ONBLACK, sp: 30 }),
        new ImageRun({ type: 'png', data: IBA, transformation: { width: 52, height: 43 }, altText: { title: 'India Blockchain Alliance', description: 'IBA logo', name: 'iba' } }),
      ],
    }),
  ], W, { fill: BLACK, pad: 120, valign: VerticalAlign.CENTER, borders: { top: NONE, left: NONE, right: NONE, bottom: { style: BorderStyle.SINGLE, size: 24, color: RED } } })]])

const footer = new Footer({
  children: [new Paragraph({
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 4 } },
    tabStops: [{ type: TabStopType.RIGHT, position: W }],
    children: [
      run('■ ', { size: 13, color: RED }), run('Web3 Corridor', { size: 13, bold: true }),
      run(' · An initiative by India Blockchain Alliance. Partner billing and payments are handled by Northstar Tecq.', { size: 13, color: MUTED }),
      run('\tPAGE ', { size: 12, color: MUTED, sp: 30 }), new TextRun({ children: [PageNumber.CURRENT], size: 12, color: MUTED, font: FONT }),
      run(' / ', { size: 12, color: MUTED }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 12, color: MUTED, font: FONT }),
    ],
  })],
})

const c = []

/* ---- page 1 · the invoice ------------------------------------------ */
c.push(masthead(), spacer(140))
const [hl, hr] = [5600, W - 5600]
const metaW = [1900, hr - 1900]
const metaRows = ['Invoice no.', 'Invoice date', 'Due date', 'Partner ID', 'Period covered'].map((l) => [
  cell([P([run(l.toUpperCase(), { size: 12, color: MUTED, sp: 30 })], { after: 0, align: AlignmentType.RIGHT })], metaW[0], { pad: 70 }),
  field('', metaW[1]),
])
c.push(table([hl, hr], [[
  cell([label('Tax invoice · Partner revenue share', RED), P([run('Partner Invoice', { size: 44 })], { after: 0 })], hl, { valign: VerticalAlign.BOTTOM }),
  cell([table(metaW, metaRows)], hr, { lr: 0 }),
]]))
c.push(spacer(120))

/* parties */
const pw = [W / 2, W / 2]
const toFields = ['Partner name', 'Contact name, title', 'Address', 'City, country', 'Tax registration (GSTIN / TRN / VAT)', 'Email']
const toTable = table([pw[1] - 240], toFields.flatMap((f) => [[field(f, pw[1] - 240)], [caption(f, pw[1] - 240)]]))
c.push(table(pw, [[
  cell([
    label('Billed by · payee'),
    P([run('✦ ', { size: 22, color: RED }), run('NORTHSTAR TECQ', { size: 24, sp: 40 })], { after: 20 }),
    P([run('BILLING PARTNER · WEB3 CORRIDOR', { size: 11, color: MUTED, sp: 40 })], { after: 140 }),
    P('Northstar Tecq [legal entity name]', { size: 20, after: 60 }),
    P('[Registered office address line 1]', { size: 17, after: 20 }),
    P('[City, State, PIN] · India', { size: 17, after: 60 }),
    P([run('GSTIN ', { size: 16, color: MUTED }), run('[GSTIN]', { size: 16 }), run(' · PAN ', { size: 16, color: MUTED }), run('[PAN]', { size: 16 })], { after: 20 }),
    P([run('State ', { size: 16, color: MUTED }), run('[State, code]', { size: 16 })], { after: 20 }),
    P('[billing email] · [phone]', { size: 16, color: MUTED, after: 0 }),
  ], pw[0], { valign: VerticalAlign.TOP, pad: 160, lr: 200, borders: { top: thin(), bottom: thin(), left: thin(), right: thin() } }),
  cell([label('Billed to · partner'), toTable], pw[1], { valign: VerticalAlign.TOP, pad: 160, lr: 120, borders: { top: thin(), bottom: thin(), left: thin(), right: thin() } }),
]]))
c.push(spacer(120))

/* line items: services, revenue base, share % and amount are blank */
const iw = [500, 5066, 1700, 1500, 1700]
const head = ['#', 'Services / programme', 'Revenue base', 'Revenue share %', 'Amount'].map((h, i) =>
  cell([P([run(h.toUpperCase(), { size: 12, color: 'FFFFFF', sp: 30 })], { after: 0, align: i >= 2 ? AlignmentType.RIGHT : undefined })], iw[i], { fill: INK, pad: 110, valign: VerticalAlign.CENTER }))
const itemRow = (n) => [
  cell([P(String(n), { size: 17, after: 0 })], iw[0], { pad: 110 }),
  ...[1, 2, 3, 4].map((i) => cell([P('', { after: 0, size: 18, align: i >= 2 ? AlignmentType.RIGHT : undefined })], iw[i], { pad: 110, lr: 120, borders: lineB })),
]
c.push(table(iw, [head, itemRow(1), itemRow(2), itemRow(3), itemRow(4)]))
c.push(spacer(120))

/* amount in words, agreement date | totals */
const [sl, sr] = [5900, W - 5900]
const tw = [1700, sr - 1700]
const totals = table(tw, [
  [cell([P('Subtotal', { size: 19, after: 0 })], tw[0], { pad: 140 }), field('', tw[1])],
  [cell([P('Taxes', { size: 19, after: 0 })], tw[0], { pad: 140 }), field('', tw[1])],
  [cell([], tw[0], { pad: 0 }), caption('Tax type and rate', tw[1])],
  [cell([], tw[0], { pad: 140 }), field('', tw[1])],
  [cell([], tw[0], { pad: 0 }), caption('Tax amount', tw[1])],
  [cell([P([run('Total due', { size: 24 })], { after: 0 })], tw[0], { pad: 100, borders: { top: thin(INK, 12), bottom: NONE, left: NONE, right: NONE } }),
   cell([P('', { after: 0, size: 24, align: AlignmentType.RIGHT })], tw[1], { pad: 100, borders: { top: thin(INK, 12), bottom: thin(INK, 6), left: NONE, right: NONE } })],
])
const leftW = sl - 300
c.push(table([sl, sr], [[
  cell([
    label('Amount in words'),
    table([leftW], [[field('', leftW)]]),
    spacer(200),
    P('Revenue share as agreed in the Partner Agreement dated', { size: 16, color: MUTED, after: 0 }),
    table([leftW], [[field('', leftW)], [caption('Agreement date', leftW)]]),
    P('on the revenue base for the period covered.', { size: 16, color: MUTED, before: 60, after: 0 }),
  ], sl, { valign: VerticalAlign.TOP, lr: 0 }),
  cell([totals], sr, { valign: VerticalAlign.TOP, lr: 0 }),
]]))
c.push(spacer(140))

/* terms and signature */
c.push(table([6600, W - 6600], [[
  cell([
    label('Terms'),
    P('Payable within [30] days of the invoice date, by the methods on page 2, quoting the invoice number as the payment reference.', { num: true, size: 15, color: MUTED, after: 40 }),
    P('The revenue share is calculated on the revenue base for the period covered, at the rate set in the Partner Agreement.', { num: true, size: 15, color: MUTED, after: 40 }),
    P('All sending-bank and intermediary charges are borne by the payer. Taxes apply as shown and as required by law.', { num: true, size: 15, color: MUTED, after: 0 }),
  ], 6600, { valign: VerticalAlign.TOP, lr: 0 }),
  cell([
    spacer(300),
    P([run('For Northstar Tecq', { size: 17 })], { align: AlignmentType.RIGHT, after: 0 }),
    P([run('Authorised signatory', { size: 15, color: MUTED })], { align: AlignmentType.RIGHT, after: 0 }),
  ], W - 6600, { valign: VerticalAlign.BOTTOM, borders: { top: NONE, left: NONE, right: NONE, bottom: NONE } }),
]]))

/* ---- page 2 · payment instructions ---------------------------------- */
const c1 = c.splice(0)
c.push(masthead(), spacer(240))
c.push(P([run('PARTNER PAYMENTS', { size: 15, color: RED, sp: 40 })], { align: AlignmentType.CENTER, after: 40 }))
c.push(P([run('Payment Instructions', { size: 40 })], { align: AlignmentType.CENTER, after: 80 }))
c.push(P('Thank you for partnering with the Web3 Corridor. Below are the approved methods for remitting your partner payments to our billing partner, Northstar Tecq.', { size: 18, color: MUTED, align: AlignmentType.CENTER, after: 240 }))
const bw = [W / 2 - 120, 240, W / 2 - 120]
const bank = (titleText, rows) =>
  cell([
    table([bw[0]], [[cell([P([run(titleText.toUpperCase(), { size: 14, color: 'FFFFFF', sp: 40 })], { align: AlignmentType.CENTER, after: 0 })], bw[0], { fill: BLACK, pad: 110, valign: VerticalAlign.CENTER })]]),
    ...rows.flatMap(([l, v]) => [P([run(l.toUpperCase(), { size: 11, color: MUTED, sp: 30 })], { before: 100, after: 10 }), P(v, { size: 17, after: 0 })]),
  ], bw[0], { valign: VerticalAlign.TOP, lr: 0, pad: 0, borders: { top: NONE, left: NONE, right: NONE, bottom: NONE } })
c.push(table(bw, [[
  bank('Domestic transfer · NEFT / RTGS / IMPS', [['Beneficiary', 'NORTHSTAR TECQ [LEGAL NAME AS ON ACCOUNT]'], ['Bank', '[Bank name]'], ['Account number', '[Account number]'], ['Account type', 'Current'], ['IFSC', '[IFSC]'], ['Branch', '[Branch, city]'], ['Payment reference', '[Invoice no.] · [Partner name]']]),
  cell([], bw[1]),
  bank('International wire · SWIFT', [['Beneficiary', 'NORTHSTAR TECQ [LEGAL NAME AS ON ACCOUNT]'], ['Bank', '[Bank name]'], ['SWIFT / BIC', '[SWIFT code]'], ['Account number', '[Account number] · IFSC [IFSC]'], ['Bank address', '[Branch address, city, India]'], ['Beneficiary address', '[Registered office address, India]'], ['Intermediary bank (opt.) · reference', '[Intermediary SWIFT] · Ref: [Invoice no.]']]),
]]))
c.push(spacer(260))
c.push(table([W], [[cell([P([run('Please note: ', { size: 16, bold: true }), run('choose the charge option “OUR” on international wires so that all sending-bank and intermediary fees are paid by the sender and the full invoiced amount is received. Purpose of remittance: partner revenue share / business support services. After transferring, reply with the UTR or SWIFT reference number and the invoice number.', { size: 16 })], { after: 0 })], W, { fill: ALT, pad: 160, lr: 200, valign: VerticalAlign.CENTER, borders: { top: NONE, bottom: NONE, right: NONE, left: { style: BorderStyle.SINGLE, size: 24, color: RED } } })]]))
c.push(spacer(200))
c.push(table([W / 2, W / 2], [[
  cell([P([run('UPI (India)', { size: 20, color: RED })], { align: AlignmentType.CENTER, after: 40 }), P('[upi-id@bank]', { size: 17, align: AlignmentType.CENTER, after: 40 }), P('Add the invoice number in the remarks.', { size: 14, color: MUTED, align: AlignmentType.CENTER, after: 0 })], W / 2, { valign: VerticalAlign.TOP, pad: 160, borders: { top: thin(), bottom: thin(), left: thin(), right: thin() } }),
  cell([P([run('Card / payment link', { size: 20, color: RED })], { align: AlignmentType.CENTER, after: 40 }), P('[secure payment link]', { size: 17, align: AlignmentType.CENTER, after: 40 }), P('Gateway charges, if any, are shown at checkout.', { size: 14, color: MUTED, align: AlignmentType.CENTER, after: 0 })], W / 2, { valign: VerticalAlign.TOP, pad: 160, borders: { top: thin(), bottom: thin(), left: thin(), right: thin() } }),
]]))
c.push(spacer(260))
c.push(P([run('Northstar Tecq', { size: 15, bold: true }), run(' · billing partner for the Web3 Corridor · [Registered office address, City, State, PIN, India] · [billing email] · GSTIN [GSTIN]', { size: 15, color: MUTED })], { after: 80 }))
c.push(P('Payment is confirmed to you by email once received, with a receipt quoting the invoice number. For your security, Northstar Tecq and IBA will never ask for passwords, OTPs, private keys or online-banking credentials, and will never change bank details by email. To verify these instructions before sending funds, contact hello@indiablockchainalliance.org.', { size: 15, color: MUTED, after: 0 }))

const doc = new Document({
  creator: 'India Blockchain Alliance',
  title: 'Web3 Corridor partner invoice',
  styles: { default: { document: { run: { font: FONT, size: 18, color: INK } } } },
  numbering: { config: [{ reference: 'terms', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { run: { size: 15, color: MUTED }, paragraph: { indent: { left: 300, hanging: 300 } } } }] }] },
  /* two sections, so the payment page starts on a new page without an empty
     page-break paragraph spilling a blank page when page 1 is full */
  sections: [c1, c].map((children) => ({ properties: { page: { margin: { top: 600, bottom: 700, left: 720, right: 720, footer: 300 } } }, footers: { default: footer }, children })),
})

;(async () => {
  const out = path.join(ROOT, 'word', 'partner-invoice-template.docx')
  fs.writeFileSync(out, await Packer.toBuffer(doc))
  console.log('wrote', path.relative(process.cwd(), out))
})()
