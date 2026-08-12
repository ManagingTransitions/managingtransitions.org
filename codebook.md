# Codebook

**Fifteen Weeks: what UK international NGOs write down when they hand their work over**
Matt Thomson, Managing Transitions, September 2026.
Published under CC BY 4.0.

---

## What is being coded

Each organisation's own published documents, read for what they commit to when they describe a restructuring, closure or transition. Not what the organisation did. What it wrote down.

Documents in scope, per organisation:

- the most recent annual report and accounts, and earlier years where the transition spans them
- any published strategy, operating model or transition document
- the organisation's own statements, press releases and website copy
- Charter for Change and Pledge for Change signatory returns where held

Trade press was used only to locate documents and to confirm that an event occurred. No score above zero rests on journalism.

---

## Evidence standard

Every score above zero requires a quotation from the organisation's own document, with a source and a section or page reference. No quotation means the code scores zero.

Where a document could not be obtained at all, the code is recorded as **not applicable** (blank in the CSV) rather than scored zero. This is why the reduction domain has twenty observations and the other three have twenty-three. A blank means "not established here". A zero means "read the document, it is not in there".

---

## The thirteen codes

### Domain A — Reduction

What the organisation says is going.

| Code | Question | Scale |
|---|---|---|
| **A1** | Is the headcount change quantified in the organisation's own document? | 0 / 1 |
| **A2** | Is there a financial figure for the saving, deficit, restructuring cost or quantified funding loss? | 0 / 1 |
| **A3** | Is a completion date given, naming a month, quarter or year? | 0 / 1 |

`Reduction % = sum(A) / 3 × 100`

### Domain B — Transfer

What the organisation says is moving, to whom, with what, and by when.

| Code | Question | Scale |
|---|---|---|
| **B1** | Are the transferred functions named? | 0 none · 1 general categories · 2 itemised functions (contracting, grant management, monitoring, safeguarding, finance, technical assurance) |
| **B2** | Are the receiving partners identified? | 0 not mentioned · 1 generic · 2 named organisations, or a defined class with stated selection criteria |
| **B3** | Is the resourcing going to partners quantified? | 0 / 1 |
| **B4** | Is there a transfer timetable distinct from the redundancy or closure timetable? | 0 / 1 |

`Transfer % = sum(B) / 6 × 100`

### Domain C — Residual

What is kept, and what is left behind.

| Code | Question | Scale |
|---|---|---|
| **C1** | Is the retained role stated? | 0 / 1 |
| **C2** | How many residual liabilities are addressed? | 0 to 6 |
| **C3** | Is decision-making authority distinguished from delivery? | 0 / 1 |

C2 counts across six liabilities, one point each:

1. employment and staff transfer
2. safeguarding
3. in-country legal entity and registration
4. assets and equipment
5. data and records
6. donor contract novation

Routine reporting unconnected to the transition does not count. A safeguarding policy statement in the governance section scores nothing; a statement about what happens to safeguarding responsibility on handover scores one.

`Residual % = (C1 + C2/6 + C3) / 3 × 100`

### Domain D — Accountability

Whether anyone could tell if it worked.

| Code | Question | Scale |
|---|---|---|
| **D1** | Are there success measures specific to the transition, with a baseline or target? | 0 / 1 |
| **D2** | Is a review or reporting point stated? | 0 / 1 |
| **D3** | Is the organisation's own public localisation commitment referenced in the transition material? | 0 / 1, blank where no commitment is held |

General programme indicators score zero on D1. A count of children reached says nothing about whether a handover held.

`Accountability % = mean of the scored D codes × 100`

---

## Two contestable rules

Both were set before coding and applied to every organisation. Both suppress scores that a permissive reading would allow, and both are stated here so that anyone can recode against the opposite rule.

**Dates for developing a strategy are not dates for moving a function.** Where a document gives a timetable for producing a future strategy rather than for transferring work, B4 is not met.

**A commitment named elsewhere in the report is not a commitment referenced in the transition.** Where an organisation names Charter for Change, Pledge for Change or its own localisation strategy in a partnerships section, but not in the material describing its restructuring, D3 is not met. Three organisations would score on a permissive reading: Concern Worldwide, Oxfam GB and World Vision UK.

---

## Reliability

Five organisations were coded twice: once through automated retrieval, once from source text after the documents were obtained directly. The two rounds agreed on 50 of 65 codes, or 77 per cent, against an 80 per cent threshold set in advance. **The method failed its own test.**

Eleven of the fifteen disagreements are attributable to documents the first round could not read, or to the wrong legal entity being read. The remaining four are figures held in notes the first pass had not reached. None arose from two readers interpreting the same sentence differently.

Access, not judgement, is the binding constraint on this method.

---

## Fields in the CSV

| Field | Meaning |
|---|---|
| `organisation` | Legal or commonly used entity name as coded |
| `short_name` | Label used in the figures |
| `A1`–`D3` | Raw code scores. Blank = not applicable, document not obtained |
| `reduction_pct`, `transfer_pct`, `residual_pct`, `accountability_pct` | Domain scores, 0–100 |
| `dedicated_document` | Whether a standalone transition or partnership document was published |
| `group` | `announced` (restructuring publicly reported) or `comparison` (localisation commitment held, nothing reported) |
| `coding_confidence` | `medium-high` or `low`. Low means retrieval was limited |
| `note` | One line on what the entry turns on |
| `correction_note` | Populated after publication where an organisation corrected the record. Blank means no correction received |
| `correction_date` | Date a correction was applied |

---

## Known limits

Three organisations should be revisited rather than relied on:

- **Oxfam GB.** The annual report covering the restructure was not published at the time of coding.
- **Mercy Corps Europe.** The financial review sits in a Companies House filing that could not be obtained.
- **VSO.** Four annual reports contain no account of the country withdrawals reported elsewhere. That silence is robust across all four documents. What it is silence about is not established here.

**Crown Agents** has three separate entities in liquidation. The entity coded is the one filing under the Crown Agents name with no post-2022 accounts.

This dataset measures what organisations published, in documents written for other purposes, some months after the events they describe. It does not measure whether transitions were handled well, whether power moved, or whether partners were satisfied.

---

## Corrections

Every organisation was sent its coded row and given four weeks to correct the record before publication. Corrections received are marked in the `correction_note` and `correction_date` columns.

Corrections after publication are logged in `CORRECTIONS.md` in this folder and applied to the CSV, with the date of the change. Write to matt@managingtransitions.org.

---

## Citation

Thomson, M. (2026) *Fifteen Weeks: what UK international NGOs write down when they hand their work over.* Managing Transitions, Bristol. Dataset published under CC BY 4.0.
