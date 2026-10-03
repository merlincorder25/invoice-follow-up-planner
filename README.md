# Invoice Follow-up Planner

A small, browser-only prototype for solo service businesses and micro-agencies. It helps a user decide what to follow up next without sending messages or connecting to any account.

## Run

Open `index.html` directly in a modern browser, or serve this folder with any static host. There is no build step, backend, authentication, payment processing, external dependency, or external runtime request.

## Included loop

- Load three anonymized demo invoices.
- Add, edit, delete, pause, reopen, and mark invoices paid.
- See open balance and a priority queue: overdue, due today, then upcoming.
- Select an invoice and generate editable Friendly, Direct, or Firm reminder text.
- Copy the draft only. Nothing is sent.
- Persist the list and edited drafts in localStorage.
- Export the list to JSON, import a compatible JSON file, or reset local data.

The prototype accepts client label, reference, amount, issue date, due date, status, and notes. Data is kept in the current browser and is not encrypted. Use anonymized examples, not real personal information.

## Evidence boundary

This is a problem-indicated prototype, not proof of market demand. Research starting points supplied for the opportunity:

- Federal Reserve, 2024 Report on Payments: https://www.fedsmallbusiness.org/reports/survey/2024/2024-report-on-payments
- GOV.UK, Prompt Payment and Cash Flow Review: https://www.gov.uk/government/publications/publication-of-the-prompt-payment-and-cash-flow-review

No unsupported percentages are used. Email/SMS, payments, accounting integrations, login, cloud sync, notifications, and legal/tax advice are intentionally out of scope.

See `TEST-RESULTS.md` for the verification record.
