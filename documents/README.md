# Web3 Corridor membership documents

Branded A4 templates for Web3 Corridor membership: an initiative by India
Blockchain Alliance, with membership billing and payments through
**Northstar Tecq**. They follow the IBA Brand Guidelines (`src/brandbook.css`):
Questrial, IBA Red `#D71920`, Black `#111111`, flat colour and square corners.
The Web3 Corridor mark and the IBA logo appear on every page.

This folder sits outside `public/`, so none of it is deployed to the website.

| File | What it is |
| --- | --- |
| `invoice.html` | Page 1: tax invoice issued by Northstar Tecq. Page 2: payment instructions (NEFT/RTGS/IMPS, SWIFT wire, UPI, card link, and an optional digital-asset block). |
| `partner-invoice.html` | Partner invoice from Northstar Tecq: the partner's name and details, the services, the revenue share % and the taxes are all left blank, as lines to fill in. On screen, typing a revenue base and a share % calculates the amount, the taxes (from the rate), the total and the amount in words. Page 2 is the payment instructions. The blank template is in `pdf/partner-invoice-template.pdf`. |
| `word/partner-invoice-template.docx` | The partner invoice as an editable Word file: the partner's details, services, revenue share %, taxes and totals are empty cells to type into. Fill it in Word or Google Docs, then File > Save as PDF. Rebuild with `node documents/scripts/build-partner-invoice-docx.cjs`. An online editor that downloads the PDF is published as a private claude.ai artifact (Partner Invoice Editor). |
| `welcome-letter.html` | Personalised welcome letter: dues, instalments, the tier's inclusions, onboarding steps and the founder's signature. |
| `membership-benefits.html` | Membership level benefits: Club, Premier and Gold Class with prices and service partners, the partner benefits, Gold Xchange and the full comparison matrix. Untick “Show prices” for a version that matches the website. |
| `word/welcome-letter-<tier>.docx` | Word welcome letter for each tier (Club, Premier, Gold, Gold Xchange), to paste into an email. Every value to fill in is a yellow-highlighted `[placeholder]`. Rebuild with `node documents/scripts/build-welcome-docx.cjs` (needs `npm i docx`). |
| `pdf/welcome-letter-<tier>-fill-in.pdf` | The printed welcome letter for each tier, with underlined blanks to fill in by hand (name, company, dates, amounts, member number). The tier's price is printed. To make one yourself, open `welcome-letter.html` and tick “Blank lines to fill by hand”, or add `?blanks=1` to the URL. |
| `email-signature.html` | Email signature in the same style. Copy and paste it into Gmail or Outlook. |
| `pdf/` | Blank PDF exports of each template. |
| `assets/tiers.js` | Tier data. Benefit text comes from `src/components/CorridorPlans.jsx`; prices and service partners come from the IBA Membership Matrix (“updated matrix” sheet, 13 Nov). If either source changes, update this file to match. |

## Every document stands on its own

A member or prospect only ever receives the brochure and letter for their own tier. So each one lists every benefit that tier includes, in full, with a description. None of them refers to another tier (no "everything in Club Class, plus…").

The full list lives in `assets/tiers.js`: `W3C.groups` holds the Web360 Club benefits and marks which tiers include each one, `W3C.xgroups` holds Gold Xchange, and `W3C.benefitsFor(tier)` returns one tier's complete list. The brochures, the HTML letter and the Word letters all read from it. Club has 13 benefits, Premier 25, Gold 31 and Gold Xchange 10. TheBlock Connect benefits are Gold Class only; TheCircle Global Member benefits come with every Web360 Club tier.

`membership-benefits.html` is the one exception. It is a side-by-side comparison of the tiers.

## Prices (from the IBA Membership Matrix, US$ per year)

Club Class $2,500 · Premier Class $5,000 · Gold Class $10,000 · Gold Xchange $15,000.
Partner memberships on their own: TheCircle $1,000 · TheBlock $6,000.
The invoice and the welcome letter fill these in from the plan you choose. You can still overwrite them for a negotiated rate or another currency. Instalments are split into whole dollars, with any remainder on the first payment, so the invoice and the letter always agree.

## How to use

1. Open the HTML file in Chrome.
2. Use the toolbar to pick the plan, currency, tax mode and number of
   instalments. Then click any tinted text to edit it. On the invoice, totals,
   GST, the amount in words and the instalment split all recalculate as you type.
3. Click **Print / Save PDF**. Choose A4, set margins to **None**, and turn
   **Background graphics** on.

You can pre-fill the invoice from the URL:
`invoice.html?tier=gold&amount=250000&cur=INR&tax=inter&inst=3`.
The options are `tier` = club | premier | gold | xchange, `tax` = intra | inter | export,
and `crypto=1` shows the digital-asset block.

## Still to fill in (Northstar Tecq details)

These are left as `[placeholders]` because they are not in the repository:

- The Northstar Tecq logo. For now there is a typographic wordmark in `invoice.html`.
  Replace the `.ns` block with an `<img>` once you have the logo file.
- Legal name, registered address, GSTIN, PAN, state code and billing email
- Bank details: account number, IFSC, SWIFT, branch address, intermediary bank
- UPI ID, payment link, and the LUT ARN for zero-rated exports
- The onboarding form link, the concierge name and the founder's phone number

SAC `9983` is set as a default. Confirm it with your CA.
