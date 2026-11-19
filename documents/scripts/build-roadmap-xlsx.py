"""
Internal management tracker for the 2026-27 roadmaps:
  Fluid Equity (Club Class member roadmap) and the IBA partnership roadmap
  (The Circle and LINKK Global).

  python3 documents/scripts/build-roadmap-xlsx.py
  -> documents/internal/IBA Roadmap Tracker 2026-27 (internal).xlsx

Task text, dates and gates match the roadmap documents in
documents/members/fluid-equity and documents/partners/the-circle-linkk.
Contains partner pricing: internal only.
"""
from datetime import date
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule, CellIsRule
from openpyxl.utils import get_column_letter
from openpyxl.comments import Comment

OUT = Path(__file__).resolve().parent.parent / 'internal' / 'IBA Roadmap Tracker 2026-27 (internal).xlsx'

RED, INK, MUTED, LINE, ALT, SOFT, BLACK = 'D71920', '0E0E0E', '5C5C5C', 'E2DFDD', 'F5F3F2', 'FDEAEA', '111111'
F = 'Arial'
font = lambda **k: Font(name=F, size=k.pop('size', 10), **k)
fill = lambda c: PatternFill('solid', start_color=c, end_color=c)
thin = Side(style='thin', color=LINE)
box = Border(top=thin, bottom=thin, left=thin, right=thin)
wrap = Alignment(wrap_text=True, vertical='top')
INPUT = fill('FFF2CC')  # cells to fill in

wb = Workbook()

def banner(ws, title, sub, width):
    ws.sheet_view.showGridLines = False
    ws['A1'] = 'WEB3 CORRIDOR · AN INITIATIVE BY INDIA BLOCKCHAIN ALLIANCE'
    ws['A1'].font = font(size=8, color='B3B3B3', bold=True)
    ws['A2'] = title
    ws['A2'].font = font(size=16, color='FFFFFF')
    ws['A3'] = sub
    ws['A3'].font = font(size=9, color='B3B3B3')
    for r in (1, 2, 3):
        for c in range(1, width + 1):
            ws.cell(r, c).fill = fill(BLACK)
    for c in range(1, width + 1):
        ws.cell(4, c).fill = fill(RED)
    ws.row_dimensions[4].height = 4
    ws.row_dimensions[2].height = 24

def header(ws, row, names, widths):
    for i, (n, w) in enumerate(zip(names, widths), start=1):
        c = ws.cell(row, i, n)
        c.font = font(size=9, bold=True, color='FFFFFF')
        c.fill = fill(INK)
        c.alignment = Alignment(wrap_text=True, vertical='center')
        c.border = box
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[row].height = 30

def body(ws, r, c, v, **k):
    cell = ws.cell(r, c, v)
    cell.font = font(color=k.get('color', INK), bold=k.get('bold', False))
    cell.alignment = wrap
    cell.border = box
    if k.get('fmt'):
        cell.number_format = k['fmt']
    if k.get('fill'):
        cell.fill = k['fill']
    return cell

D = lambda m, d: date(2026 if m == 12 or m == 11 else 2027, m, d)
Q = {'Q1': (date(2026, 12, 1), date(2027, 2, 28)), 'Q2': (date(2027, 3, 1), date(2027, 5, 31)),
     'Q3': (date(2027, 6, 1), date(2027, 8, 31)), 'Q4': (date(2027, 9, 1), date(2027, 11, 30))}

# ---------------------------------------------------------------- tasks
# (programme, quarter, workstream, task, owner, start, due, gate)
T = []
FE, CI, LK, BO = 'Fluid Equity', 'The Circle', 'LINKK Global', 'Partnerships (both)'
fe_q1 = [
    ('Onboarding & access', 'Sign the Membership Agreement and complete the onboarding form', 'Fluid Equity', D(12, 1), D(12, 5)),
    ('Onboarding & access', 'Welcome call: introductions, ways of working, mentorship schedule', 'IBA + Fluid Equity', D(12, 7), D(12, 11)),
    ('Onboarding & access', 'Issue the official Club Badge; set up the verifiable vault and directory listing', 'IBA', D(12, 7), D(12, 14)),
    ('Baseline & goals', 'Mentorship 1: the three goals; share the KPI framework and playbooks', 'IBA', D(12, 14), D(12, 18)),
    ('Network & visibility', 'Send logo, one-line description and link for the LinkedIn spotlight', 'Fluid Equity', D(12, 15), D(12, 22)),
    ('Baseline & goals', 'KPI baseline (pilot fund, building pipeline, legal milestones); load the pilot deck, model and structure summary to the vault', 'Fluid Equity', D(12, 15), D(1, 10)),
    ('Baseline & goals', 'Agree the three goals and the KPIs that track them', 'IBA + Fluid Equity', D(1, 4), D(1, 15)),
    ('Network & visibility', 'Publish the LinkedIn spotlight on the mission, cleared with Fluid Equity', 'IBA', D(1, 4), D(1, 15)),
    ('Pilot strategy', 'Mentorship 2: GTM kick-off; regulatory mentoring on the Class A / Class B model', 'IBA', D(1, 4), D(1, 31)),
    ('Network & visibility', 'Attend a community event; shortlist investors, owners and partners from the directories', 'Fluid Equity', D(1, 16), D(1, 31)),
    ('Pilot strategy', 'Mentorship 3: pilot-fund deck review 1 (growth advisory)', 'IBA', D(2, 1), D(2, 14)),
    ('Network & visibility', 'Join the first curated roundtable', 'Fluid Equity', D(2, 1), D(2, 14)),
    ('Pilot strategy', 'Draft GTM blueprint v1: pilot market, first-building criteria, product order; record readiness against The Circle criteria', 'Fluid Equity', D(2, 1), D(2, 21)),
    ('Gate review', 'Gate 1 review and Q2 plan', 'IBA + Fluid Equity', D(2, 22), D(2, 28)),
]
for ws_, t, o, s, d in fe_q1:
    T.append((FE, 'Q1', ws_, t, o, s, d, 'FE Gate 1'))
fe_later = {
    'Q2': [('Pilot strategy', 'GTM blueprint completed: pilot market, first-building criteria, sequence for Equity, Edge and Entry', 'Fluid Equity'),
           ('Pilot strategy', 'Business plan review: the pilot-fund model', 'IBA'),
           ('Pilot strategy', 'Regulatory mentoring: the resident stake and its record', 'IBA'),
           ('Network & visibility', 'Partner map: owners, housing authorities, technology, legal and compliance', 'Fluid Equity'),
           ('Network & visibility', 'Roundtables and member roundups', 'Fluid Equity'),
           ('Pathway', 'Map evidence to The Circle Startup Member criteria', 'IBA + Fluid Equity'),
           ('Gate review', 'Gate 2 review: pilot plan set', 'IBA + Fluid Equity')],
    'Q3': [('Fund readiness', 'Growth advisory: deck and plan reviews, tailored funding preparation', 'IBA'),
           ('Fund readiness', 'Data room completed in the vault, using the data-room guidance', 'Fluid Equity'),
           ('Network & visibility', 'Podcast recording: the rent-to-equity story (optional distribution through The Block, extra cost)', 'IBA'),
           ('Network & visibility', 'Media promotion: podcast, live TV, crypto news media (mission only, not the fund)', 'IBA'),
           ('Network & visibility', 'Investor and industry networking sessions', 'Fluid Equity'),
           ('Pathway', 'If the pilot is validated: refer Fluid Equity to The Circle for Startup Member', 'IBA'),
           ('Gate review', 'Gate 3 review: fund-ready', 'IBA + Fluid Equity')],
    'Q4': [('Network & visibility', 'Showcase at community events and curated roundtables', 'Fluid Equity'),
           ('Network & visibility', 'Dubai co-hosted event, at member pricing', 'Fluid Equity'),
           ('Network & visibility', 'Follow-up on investor and partner conversations', 'Fluid Equity'),
           ('Baseline & goals', 'Year-end review against the Q1 baseline', 'IBA + Fluid Equity'),
           ('Pathway', 'Choose the year-two path: Club Class, Startup Member, or Seed Accelerator once criteria are met', 'IBA + Fluid Equity'),
           ('Gate review', 'Gate 4 review: year one complete', 'IBA + Fluid Equity')],
}
for q, rows in fe_later.items():
    s, e = Q[q]
    for ws_, t, o in rows:
        T.append((FE, q, ws_, t, o, s, e, f'FE Gate {q[1]}'))

pa_q1 = [
    (BO, 'Set up', 'Reply to The Circle and LINKK: thanks, questions, and a call to agree next steps', 'IBA', date(2026, 11, 19), date(2026, 11, 25)),
    (CI, 'Set up', 'Read The Circle deck; list questions on terms, process and how members are introduced', 'IBA', date(2026, 11, 19), date(2026, 11, 30)),
    (LK, 'Set up', 'Review LINKK (site, introduction video); confirm the first areas: A, B and D', 'IBA', date(2026, 11, 26), D(12, 5)),
    (BO, 'Set up', 'Partner call: referral terms, process and reporting with The Circle; scope with LINKK', 'IBA + partners', D(12, 7), D(12, 12)),
    (CI, 'Commercial', 'Agree commercial terms for referrals beyond Global Member, in writing', 'IBA + The Circle', D(12, 12), D(1, 15)),
    (CI, 'Process', "Write the triage guide into IBA's enquiry handling; add consent to share member details", 'IBA', D(1, 4), D(1, 22)),
    (CI, 'Communications', 'Co-branded one-pager: the pathway from Club Class to the accelerators, with the no-guarantee wording', 'IBA + The Circle', D(1, 11), D(1, 31)),
    (LK, 'Set up', 'Join LINKK as ecosystem partner; name leads; list the organisations IBA wants to meet', 'IBA + LINKK', D(1, 4), D(1, 31)),
    (CI, 'Referrals', 'Screen current members against the criteria; first referrals to The Circle', 'IBA', D(2, 1), D(2, 14)),
    (LK, 'Programmes', 'Plan the first India → UAE market-entry session for Q2: date, format, founders from both sides', 'IBA + LINKK', D(2, 1), D(2, 21)),
    (BO, 'Gate review', 'Gate review: agreements and process in place; Q2 plan', 'IBA', D(2, 22), D(2, 28)),
]
for p, ws_, t, o, s, d in pa_q1:
    T.append((p, 'Q1', ws_, t, o, s, d, 'Partner Gate 1'))
pa_later = {
    'Q2': [(CI, 'Referrals', 'Referral route live from /membership', 'IBA'), (CI, 'Referrals', 'First Startup Member referrals', 'IBA'),
           (CI, 'Programmes', 'IBA members at Circle events and roundtables', 'IBA + The Circle'), (CI, 'Programmes', 'First joint founder roundtable', 'IBA + The Circle'),
           (LK, 'Programmes', 'First India → UAE market-entry session', 'IBA + LINKK'), (LK, 'Ecosystem', 'Introductions to selected accelerators and incubators', 'LINKK'),
           (LK, 'Ecosystem', 'Exchange lists of India–UAE startups', 'IBA + LINKK'), (BO, 'Gate review', 'Gate 2 review: first referrals made; first joint session delivered', 'IBA')],
    'Q3': [(CI, 'Referrals', 'Seed Accelerator shortlist: GCC-focused, internationally scalable', 'IBA'), (CI, 'Communications', 'Podcast features for IBA founders', 'IBA + The Circle'),
           (CI, 'Referrals', 'Members move up as they meet criteria', 'IBA'), (LK, 'Investors', 'Investor and corporate matching pilot (area C)', 'IBA + LINKK'),
           (LK, 'Programmes', 'Joint content: venture building, GTM, capital readiness, expansion', 'IBA + LINKK'), (LK, 'Venture building', 'Venture-building referrals, case by case (area E)', 'IBA'),
           (BO, 'Gate review', 'Gate 3 review: pipeline flowing both ways', 'IBA')],
    'Q4': [(CI, 'Review', 'Referrals, admissions and feedback reviewed', 'IBA'), (CI, 'Commercial', 'Terms renewed or adjusted', 'IBA + The Circle'),
           (CI, 'Review', 'Year-two referral plan', 'IBA'), (LK, 'Review', 'Outcomes reviewed', 'IBA + LINKK'),
           (LK, 'Programmes', 'Joint initiatives with IBA-connected accelerators and incubators', 'IBA + LINKK'), (LK, 'Review', 'Year-two programme agreed', 'IBA + LINKK'),
           (BO, 'Gate review', 'Gate 4 review: results reviewed; year-two scope agreed', 'IBA')],
}
for q, rows in pa_later.items():
    s, e = Q[q]
    for p, ws_, t, o in rows:
        T.append((p, q, ws_, t, o, s, e, f'Partner Gate {q[1]}'))

PROGRAMMES = [FE, CI, LK, BO]
STATUSES = ['Not started', 'In progress', 'Done', 'Blocked']
NT = len(T)
LAST = 5 + NT + 40  # room to add rows

# ---------------------------------------------------------------- sheet: Tasks
ws = wb.active
ws.title = 'Tasks'
cols = ['ID', 'Programme', 'Quarter', 'Workstream', 'Task', 'Owner', 'Start', 'Due', 'Gate', 'Status', 'Notes', 'Days to due', 'Overdue?']
widths = [8, 18, 8, 18, 62, 18, 11, 11, 15, 13, 30, 10, 10]
banner(ws, 'Roadmap tasks 2026–27', 'Fluid Equity · The Circle · LINKK Global · update Status and Notes; add rows below the last task', len(cols))
header(ws, 5, cols, widths)
for i, (p, q, w_, t, o, s, d, g) in enumerate(T):
    r = 6 + i
    pre = {FE: 'FE', CI: 'CI', LK: 'LK', BO: 'PB'}[p]
    body(ws, r, 1, f'{pre}-{i + 1:03d}', color=MUTED)
    body(ws, r, 2, p)
    body(ws, r, 3, q)
    body(ws, r, 4, w_)
    body(ws, r, 5, t)
    body(ws, r, 6, o)
    body(ws, r, 7, s, fmt='dd mmm yy')
    body(ws, r, 8, d, fmt='dd mmm yy')
    body(ws, r, 9, g, color=MUTED)
    body(ws, r, 10, 'Not started', fill=INPUT)
    body(ws, r, 11, None, fill=INPUT)
    body(ws, r, 12, f'=IF(OR(J{r}="Done",H{r}=""),"",H{r}-TODAY())', fmt='0;-0;0')
    body(ws, r, 13, f'=IF(AND(J{r}<>"Done",H{r}<>"",H{r}<TODAY()),"Overdue","")', color=RED)
ws.freeze_panes = 'C6'
ws.auto_filter.ref = f'A5:M{5 + NT}'
dv = DataValidation(type='list', formula1='"' + ','.join(STATUSES) + '"', allow_blank=True)
ws.add_data_validation(dv)
dv.add(f'J6:J{LAST}')
dvp = DataValidation(type='list', formula1='"' + ','.join(PROGRAMMES) + '"', allow_blank=True)
ws.add_data_validation(dvp)
dvp.add(f'B6:B{LAST}')
dvq = DataValidation(type='list', formula1='"Q1,Q2,Q3,Q4"', allow_blank=True)
ws.add_data_validation(dvq)
dvq.add(f'C6:C{LAST}')
rng = f'A6:M{LAST}'
ws.conditional_formatting.add(rng, FormulaRule(formula=['$J6="Done"'], fill=fill('E7F4EC'), font=Font(name=F, color='1F7A3D')))
ws.conditional_formatting.add(rng, FormulaRule(formula=['$J6="Blocked"'], fill=fill(SOFT)))
ws.conditional_formatting.add(rng, FormulaRule(formula=['$M6="Overdue"'], font=Font(name=F, color=RED, bold=True)))
ws.conditional_formatting.add(rng, FormulaRule(formula=['$J6="In progress"'], fill=fill('FFF8E1')))
ws['E5'].comment = Comment('Task text matches the roadmap documents (Fluid Equity roadmap; partnership roadmap). Q2–Q4 items are due at quarter end until dated.', 'IBA')

# ---------------------------------------------------------------- sheet: Gates
wg = wb.create_sheet('Gates')
GATES = [
    ('FE Gate 1', FE, 'Corridor-ready', date(2027, 2, 28), ['Club Badge issued; directory profile live', 'Pilot deck, model and structure summary in the vault', 'KPI baseline recorded', 'Three goals and their KPIs agreed', 'GTM blueprint v1 drafted', 'Pilot-fund deck reviewed once, actions noted', 'Readiness against The Circle criteria recorded', 'One community event and one roundtable attended', 'LinkedIn spotlight published']),
    ('FE Gate 2', FE, 'Pilot plan set', date(2027, 5, 31), ['GTM blueprint signed off', 'First-building criteria clear', 'Regulatory steps clear, with counsel', 'Evidence mapped to Startup Member criteria']),
    ('FE Gate 3', FE, 'Fund-ready', date(2027, 8, 31), ['Final pilot-fund deck', 'Final financial model', 'Data room complete in the vault', 'Referral to The Circle for Startup Member, if the pilot is validated']),
    ('FE Gate 4', FE, 'Year one complete', date(2027, 11, 30), ['Results reviewed against the three goals', 'Year-two path chosen']),
    ('Partner Gate 1', BO, 'Agreements and process in place', date(2027, 2, 28), ['Commercial terms with The Circle agreed in writing', 'Triage guide in enquiry handling; consent added', 'Co-branded one-pager approved', 'IBA joined LINKK as ecosystem partner; leads named', 'First referrals made to The Circle']),
    ('Partner Gate 2', BO, 'First referrals made; first joint session delivered', date(2027, 5, 31), ['Referral route live from /membership', 'First Startup Member referrals', 'First India → UAE market-entry session delivered']),
    ('Partner Gate 3', BO, 'Pipeline flowing both ways', date(2027, 8, 31), ['Seed Accelerator shortlist referred', 'Investor and corporate matching pilot running', 'Joint content published']),
    ('Partner Gate 4', BO, 'Results reviewed; year-two scope agreed', date(2027, 11, 30), ['Referral and admission results reviewed', 'Terms renewed or adjusted', 'Year-two programme agreed with LINKK']),
]
gcols = ['Gate', 'Programme', 'Gate name', 'Review date', 'Criterion', 'Met?', 'Evidence / notes']
banner(wg, 'Gates and criteria', 'Mark each criterion Yes when met; the Dashboard shows each gate’s progress', len(gcols))
header(wg, 5, gcols, [15, 18, 30, 12, 60, 8, 40])
r = 6
for gid, prog, name, when, crit in GATES:
    for cr in crit:
        body(wg, r, 1, gid, bold=True)
        body(wg, r, 2, prog)
        body(wg, r, 3, name)
        body(wg, r, 4, when, fmt='dd mmm yy')
        body(wg, r, 5, cr)
        body(wg, r, 6, 'No', fill=INPUT)
        body(wg, r, 7, None, fill=INPUT)
        r += 1
GLAST = r - 1
dvy = DataValidation(type='list', formula1='"Yes,No"', allow_blank=True)
wg.add_data_validation(dvy)
dvy.add(f'F6:F{GLAST + 30}')
wg.conditional_formatting.add(f'A6:G{GLAST + 30}', FormulaRule(formula=['$F6="Yes"'], fill=fill('E7F4EC')))
wg.freeze_panes = 'A6'
wg.auto_filter.ref = f'A5:G{GLAST}'

# ---------------------------------------------------------------- sheet: Mentorship log (Fluid Equity)
wm = wb.create_sheet('FE Mentorship')
mcols = ['Month', 'Hours used', 'Cap (hours)', 'Remaining', 'Cumulative used', 'Sessions / topics']
banner(wm, 'Fluid Equity · mentorship hours', 'Club Class includes up to 4 hours of mentorship a month. Enter hours used each month.', len(mcols))
header(wm, 5, mcols, [12, 12, 12, 12, 16, 60])
months = [date(2026, 12, 1)] + [date(2027, m, 1) for m in range(1, 12)]
plan = {0: 'Welcome; the three goals; KPI baseline walk-through', 1: 'GTM blueprint kick-off; regulatory mentoring on the resident stake', 2: 'Pilot-fund deck review 1; Gate 1 review'}
wm['H5'] = 'Monthly cap (hours)'
wm['H5'].font = font(bold=True)
wm['I5'] = 4
wm['I5'].font = font(color='0000FF')
wm['I5'].fill = INPUT
wm['I5'].comment = Comment('Club Class: up to 4 hours of mentorship per month (IBA Club Class inclusions, 18 Nov 2026).', 'IBA')
wm.column_dimensions['H'].width = 20
for i, m in enumerate(months):
    r = 6 + i
    body(wm, r, 1, m, fmt='mmm yyyy')
    body(wm, r, 2, None, fill=INPUT, fmt='0.0')
    body(wm, r, 3, '=$I$5', fmt='0.0')
    body(wm, r, 4, f'=C{r}-N(B{r})', fmt='0.0;[Red]-0.0;0.0')
    body(wm, r, 5, f'=SUM($B$6:B{r})', fmt='0.0')
    body(wm, r, 6, plan.get(i, ''), fill=INPUT)
tr = 6 + len(months)
body(wm, tr, 1, 'Year', bold=True)
body(wm, tr, 2, f'=SUM(B6:B{tr - 1})', bold=True, fmt='0.0')
body(wm, tr, 3, f'=SUM(C6:C{tr - 1})', bold=True, fmt='0.0')
body(wm, tr, 4, f'=C{tr}-B{tr}', bold=True, fmt='0.0')
wm.conditional_formatting.add(f'B6:B{tr - 1}', CellIsRule(operator='greaterThan', formula=['$I$5'], font=Font(name=F, color=RED, bold=True)))
wm.freeze_panes = 'A6'

# ---------------------------------------------------------------- sheet: KPIs
wk = wb.create_sheet('KPIs')
kcols = ['Programme', 'KPI', 'Q1 target', 'Q1 actual', 'Q2 target', 'Q2 actual', 'Q3 target', 'Q3 actual', 'Q4 target', 'Q4 actual', 'Year target', 'Year actual', 'Notes']
banner(wk, 'KPIs', 'Targets to set on the partner call and the Fluid Equity welcome call. Year columns add the quarters.', len(kcols))
header(wk, 5, kcols, [18, 40] + [10] * 10 + [36])
KP = [(CI, 'Referrals to The Circle (all levels)'), (CI, 'Startup Member referrals'), (CI, 'Accelerator referrals'), (CI, 'Admissions by The Circle'), (CI, 'IBA members moving up a level'),
      (LK, 'Joint sessions delivered'), (LK, 'Corridor startups supported India ↔ UAE'), (LK, 'Introductions: investor, corporate, ecosystem'),
      (FE, 'Mentorship hours used'), (FE, 'Community events attended'), (FE, 'Roundtables attended'), (FE, 'Investor and partner conversations')]
for i, (p, k) in enumerate(KP):
    r = 6 + i
    body(wk, r, 1, p)
    body(wk, r, 2, k)
    for c in range(3, 11):
        body(wk, r, c, None, fill=INPUT, fmt='0')
    body(wk, r, 11, f'=IF(COUNT(C{r},E{r},G{r},I{r})=0,"",SUM(C{r},E{r},G{r},I{r}))', fmt='0')
    body(wk, r, 12, f'=IF(COUNT(D{r},F{r},H{r},J{r})=0,"",SUM(D{r},F{r},H{r},J{r}))', fmt='0')
    body(wk, r, 13, None, fill=INPUT)
fe_hours_row = 6 + KP.index((FE, 'Mentorship hours used'))
for qi, col in enumerate(['D', 'F', 'H', 'J']):
    a, b = 6 + qi * 3, 8 + qi * 3
    wk[f'{col}{fe_hours_row}'] = f"=SUM('FE Mentorship'!B{a}:B{b})"
    wk[f'{col}{fe_hours_row}'].font = font(color='008000')
    wk[f'{col}{fe_hours_row}'].fill = PatternFill()
    wk[f'{col}{fe_hours_row}'].number_format = '0.0'
for qi, col in enumerate(['C', 'E', 'G', 'I']):
    wk[f'{col}{fe_hours_row}'] = "='FE Mentorship'!$I$5*3"
    wk[f'{col}{fe_hours_row}'].font = font(color='008000')
    wk[f'{col}{fe_hours_row}'].fill = PatternFill()
wk[f'M{fe_hours_row}'] = 'Linked: target is the cap (3 months × monthly cap); actual from FE Mentorship'
wk.freeze_panes = 'C6'

# ---------------------------------------------------------------- sheet: Decisions
wd = wb.create_sheet('Decisions')
dcols = ['#', 'Decision', 'Context', 'Owner', 'Needed by', 'Status', 'Decision taken']
banner(wd, 'Open decisions', 'Decide before the partner call (week of 7 Dec) unless dated otherwise', len(dcols))
header(wd, 5, dcols, [5, 30, 62, 12, 12, 13, 40])
DEC = [('Commercial terms with The Circle', 'Referral fee or revenue share on Startup Member and accelerator referrals. Club Class already bundles Global Member (US$990) inside US$2,500.'),
       ('How The Circle levels are presented', 'The Circle says it is part of IBA’s membership offering: present as “the IBA pathway, with The Circle”, or as The Circle’s own programmes?'),
       ('Member data and consent', 'Referrals share company details. Add consent to the enquiry and brochure forms before the first referral.'),
       ('Promises in all referral material', 'Admission is selective; introductions and fundraising outcomes are not guaranteed.'),
       ('LINKK scope', 'Confirm areas A, B and D first; agree whether ecosystem partnership carries any cost or commitment.'),
       ('Partner brand use', 'The Circle’s email says “IAB”. Partner materials to use IBA, India Blockchain Alliance.'),
       ('Fluid Equity details', 'Contact person, billing address and the agreed payment arrangement for the invoice and welcome letter.')]
for i, (dname, ctx) in enumerate(DEC):
    r = 6 + i
    body(wd, r, 1, i + 1, color=MUTED)
    body(wd, r, 2, dname, bold=True)
    body(wd, r, 3, ctx, color=MUTED)
    body(wd, r, 4, 'IBA', fill=INPUT)
    body(wd, r, 5, date(2026, 12, 7) if i < 6 else date(2026, 11, 30), fmt='dd mmm yy', fill=INPUT)
    body(wd, r, 6, 'Open', fill=INPUT)
    body(wd, r, 7, None, fill=INPUT)
dvd = DataValidation(type='list', formula1='"Open,Decided,Parked"', allow_blank=True)
wd.add_data_validation(dvd)
dvd.add('F6:F60')
wd.conditional_formatting.add('A6:G60', FormulaRule(formula=['$F6="Decided"'], fill=fill('E7F4EC')))

# ---------------------------------------------------------------- sheet: The Circle levels
wc = wb.create_sheet('Circle levels')
ccols = ['Level', 'Price (US$)', 'Term', 'For', 'Key inclusions', 'Refer when the member has', 'Through IBA']
banner(wc, 'The Circle · levels and referral criteria', 'From The Circle’s email, 18 Nov 2026. Internal: contains partner pricing.', len(ccols))
header(wc, 5, ccols, [20, 12, 12, 34, 50, 50, 22])
LV = [('Global Member', 990, '1 year', 'Idea-stage, pre-seed and early-stage founders joining an ecosystem', 'Ecosystem, events, directories, resources; up to 4 h mentorship a month; one podcast recording (distribution +US$300)', 'A clear concept, product or service; founders actively building; no revenue or fundraising minimum', 'Included in Club Class (US$2,500)'),
      ('Startup Member', 4990, '1 year', 'Past the idea; needs strategy to grow, position and prepare to raise', 'Strategic, GTM and marketing advisory; investor readiness; curated introductions; up to 12 h mentorship a month; two Circle events; a featured podcast episode', 'Product, MVP or service ready for market; early validation, customers or pilots; defined business model; team that can execute; clear growth or fundraising goal', 'Referral'),
      ('Seed Accelerator', 9900, '3 months', 'High-potential startups with early traction preparing a round', 'Weekly strategy and KPI sessions; growth roadmap; operational support; deck, model and data-room review; fundraising strategy; investor and family-office introductions', 'MVP with traction; recurring revenue or a clear path; round of US$100K–1M; GCC focus or international scalability; committed team', 'Referral · selective'),
      ('Series A Accelerator', 19900, '4 months', 'Revenue-generating companies preparing institutional capital and expansion', 'Fundraising strategy; weekly founder and KPI sessions; VC preparation; executive positioning; market-entry planning; corporate and institutional introductions', 'Established revenue and traction; credible unit economics; round of US$500K–3M; defined expansion strategy; experienced leadership team', 'Referral · selective')]
for i, row in enumerate(LV):
    for c, v in enumerate(row, start=1):
        body(wc, 6 + i, c, v, fmt='$#,##0' if c == 2 else None, bold=(c == 1), color=('0000FF' if c == 2 else INK))
wc['B5'].comment = Comment('Source: The Circle, email to IBA, 18 Nov 2026. Admission to the accelerators is selective; outcomes not guaranteed.', 'IBA')
wc.freeze_panes = 'B6'

# ---------------------------------------------------------------- sheet: LINKK areas
wl = wb.create_sheet('LINKK areas')
lcols = ['Area', 'What it means for IBA', 'First concrete step', 'Priority', 'When', 'Status', 'Notes']
banner(wl, 'LINKK Global · five areas', 'From LINKK’s proposal, 18 Nov 2026. Suggested order: A, B, D first; C next; E later.', len(lcols))
header(wl, 5, lcols, [38, 50, 44, 10, 12, 13, 30])
AR = [('A · International ecosystem partnership', 'IBA joins LINKK as an ecosystem partner; connections to accelerators, incubators, innovation hubs and venture organisations abroad', 'Partner onboarding; a list of the organisations IBA most wants to meet', 'Start', 'Q1'),
      ('B · India–UAE / GCC market expansion', 'Indian startups into the UAE and GCC, and UAE or international companies into India', 'One joint market-entry session, India → UAE, with founders from both networks', 'Start', 'Q1–Q2'),
      ('D · Joint programmes, events and knowledge', 'Online sessions, founder roundtables and workshops; shared content on venture building, GTM, capital readiness and expansion', 'A joint calendar: one online session a quarter, starting Q2', 'Start', 'Q2'),
      ('C · Investor and corporate connections', 'Matching startups to specific investor or corporate interests, with materials prepared before any approach', 'A matching pilot on a short list of corridor startups', 'Next', 'Q3'),
      ('E · Venture building support', 'LINKK’s hands-on services for IBA startups needing operational support; possible dedicated programmes', 'Refer case by case; consider a dedicated programme for year two', 'Later', 'Q3–Q4')]
for i, row in enumerate(AR):
    r = 6 + i
    for c, v in enumerate(row, start=1):
        body(wl, r, c, v, bold=(c == 1), color=(RED if c == 4 and v == 'Start' else INK))
    body(wl, r, 6, 'Not started', fill=INPUT)
    body(wl, r, 7, None, fill=INPUT)
dvl = DataValidation(type='list', formula1='"' + ','.join(STATUSES) + '"', allow_blank=True)
wl.add_data_validation(dvl)
dvl.add('F6:F20')

# ---------------------------------------------------------------- sheet: Dashboard (first)
wdb = wb.create_sheet('Dashboard', 0)
banner(wdb, 'Roadmap dashboard 2026–27 · internal', 'Live from the Tasks, Gates and Decisions sheets. Fluid Equity: 1 Dec 2026 – 30 Nov 2027.', 9)
for c, w in zip('ABCDEFGHI', [26, 12, 12, 12, 12, 12, 12, 12, 12]):
    wdb.column_dimensions[c].width = w
TK = f"Tasks!$B$6:$B${LAST}"
TQ = f"Tasks!$C$6:$C${LAST}"
TS = f"Tasks!$J$6:$J${LAST}"
TO = f"Tasks!$M$6:$M${LAST}"
TT = f"Tasks!$E$6:$E${LAST}"

wdb['A6'] = 'Today'
wdb['A6'].font = font(bold=True)
wdb['B6'] = '=TODAY()'
wdb['B6'].number_format = 'dd mmm yyyy'
wdb['B6'].font = font()

header(wdb, 8, ['By programme', 'Tasks', 'Not started', 'In progress', 'Done', 'Blocked', 'Overdue', '% done', ''], [26, 12, 12, 12, 12, 12, 12, 12, 12])
for i, p in enumerate(PROGRAMMES + ['All']):
    r = 9 + i
    crit = f'{TK},"{p}"' if p != 'All' else f'{TT},"<>"'
    body(wdb, r, 1, p, bold=(p == 'All'))
    body(wdb, r, 2, f'=COUNTIFS({crit})' if p != 'All' else f'=COUNTA({TT})')
    for j, s in enumerate(STATUSES):
        body(wdb, r, 3 + j, f'=COUNTIFS({crit},{TS},"{s}")')
    body(wdb, r, 7, f'=COUNTIFS({crit},{TO},"Overdue")', color=RED)
    body(wdb, r, 8, f'=IF(B{r}=0,0,E{r}/B{r})', fmt='0%')

header(wdb, 15, ['By quarter', 'Tasks', 'Not started', 'In progress', 'Done', 'Blocked', 'Overdue', '% done', ''], [26, 12, 12, 12, 12, 12, 12, 12, 12])
for i, q in enumerate(['Q1', 'Q2', 'Q3', 'Q4']):
    r = 16 + i
    body(wdb, r, 1, f'{q} · {Q[q][0]:%b %Y} – {Q[q][1]:%b %Y}')
    body(wdb, r, 2, f'=COUNTIFS({TQ},"{q}")')
    for j, s in enumerate(STATUSES):
        body(wdb, r, 3 + j, f'=COUNTIFS({TQ},"{q}",{TS},"{s}")')
    body(wdb, r, 7, f'=COUNTIFS({TQ},"{q}",{TO},"Overdue")', color=RED)
    body(wdb, r, 8, f'=IF(B{r}=0,0,E{r}/B{r})', fmt='0%')

header(wdb, 21, ['Gates', 'Review date', 'Criteria', 'Met', '% met', 'Status', '', '', ''], [26, 12, 12, 12, 12, 12, 12, 12, 12])
GG = f"Gates!$A$6:$A${GLAST + 30}"
GM = f"Gates!$F$6:$F${GLAST + 30}"
for i, (gid, prog, name, when, crit) in enumerate(GATES):
    r = 22 + i
    body(wdb, r, 1, f'{gid} · {name}')
    body(wdb, r, 2, when, fmt='dd mmm yy')
    body(wdb, r, 3, f'=COUNTIFS({GG},"{gid}")')
    body(wdb, r, 4, f'=COUNTIFS({GG},"{gid}",{GM},"Yes")')
    body(wdb, r, 5, f'=IF(C{r}=0,0,D{r}/C{r})', fmt='0%')
    body(wdb, r, 6, f'=IF(E{r}=1,"Passed",IF(B{r}<TODAY(),"Overdue",IF(D{r}>0,"In progress","Open")))')
wdb.conditional_formatting.add('F22:F29', CellIsRule(operator='equal', formula=['"Passed"'], fill=fill('E7F4EC'), font=Font(name=F, color='1F7A3D', bold=True)))
wdb.conditional_formatting.add('F22:F29', CellIsRule(operator='equal', formula=['"Overdue"'], font=Font(name=F, color=RED, bold=True)))
wdb.conditional_formatting.add('G9:G19', CellIsRule(operator='greaterThan', formula=['0'], font=Font(name=F, color=RED, bold=True), fill=fill(SOFT)))

r = 31
header(wdb, r, ['Other', 'Value', '', '', '', '', '', '', ''], [26, 12, 12, 12, 12, 12, 12, 12, 12])
body(wdb, r + 1, 1, 'Open decisions')
body(wdb, r + 1, 2, '=COUNTIFS(Decisions!$F$6:$F$60,"Open")', color=RED)
body(wdb, r + 2, 1, 'FE mentorship hours used (year)')
body(wdb, r + 2, 2, f"='FE Mentorship'!B{tr}", color='008000', fmt='0.0')
body(wdb, r + 3, 1, 'FE mentorship hours available (year)')
body(wdb, r + 3, 2, f"='FE Mentorship'!C{tr}", color='008000', fmt='0.0')
body(wdb, r + 4, 1, 'Next 14 days: tasks due')
body(wdb, r + 4, 2, f'=COUNTIFS(Tasks!$H$6:$H${LAST},">="&TODAY(),Tasks!$H$6:$H${LAST},"<="&TODAY()+14,{TS},"<>Done")')

# legend
r = 38
wdb.cell(r, 1, 'How to use').font = font(bold=True, size=11)
legend = [('Yellow cells', 'are inputs: Status, Notes, Met?, hours used, KPI targets and actuals, decisions.'),
          ('Tasks', 'Change Status from the dropdown. Add new tasks in the empty rows below the list; the dashboard counts them.'),
          ('Gates', 'Mark each criterion Yes when met; a gate shows Passed at 100%.'),
          ('Dates', 'Q1 tasks are dated from the roadmaps; Q2–Q4 tasks are due at quarter end until you set a date.'),
          ('Internal', 'The Circle levels sheet contains partner pricing. Do not share outside IBA.')]
for i, (k, v) in enumerate(legend):
    body(wdb, r + 1 + i, 1, k, bold=True, fill=INPUT if i == 0 else None)
    wdb.merge_cells(start_row=r + 1 + i, start_column=2, end_row=r + 1 + i, end_column=9)
    c = wdb.cell(r + 1 + i, 2, v)
    c.font = font(color=MUTED)
    c.alignment = Alignment(wrap_text=True, vertical='top')
wdb.freeze_panes = 'A5'

for sh in wb.worksheets:
    sh.sheet_properties.tabColor = RED if sh.title == 'Dashboard' else ('111111' if sh.title in ('Tasks', 'Gates') else 'B3B3B3')
    sh.page_setup.orientation = 'landscape'
    sh.page_setup.fitToWidth = 1
    sh.page_setup.fitToHeight = 0
    sh.sheet_properties.pageSetUpPr.fitToPage = True

OUT.parent.mkdir(parents=True, exist_ok=True)
wb.save(OUT)
print(OUT, NT, 'tasks')
