# Invoice Radar

Invoice Radar is a browser-only prototype for solo service businesses and micro-agencies that need a clearer next action on unpaid invoices.

## The opportunity

The selected opportunity is a narrow invoice follow-up planner: add a small list of invoices, see which open item deserves attention, and create an editable reminder draft without sending anything.

This is a problem-indicated prototype, not proof of market demand. The Federal Reserve's 2024 Report on Payments says customer payments are the primary source of cash available to small businesses, that roughly four in five small firms face payments-related challenges, and that slow-paying customers are a reported challenge for professional services, real estate, and manufacturing. Source: [Federal Reserve Small Business Credit Survey](https://www.fedsmallbusiness.org/reports/survey/2024/2024-report-on-payments).

## Run it

Open `index.html` in a browser, or serve this folder with any static HTTP server. No build step or package installation is required.

## Prototype flow

1. Load the anonymized demo data or add an invoice.
2. Review the queue, sorted overdue first, then due today, then upcoming.
3. Open a draft in Friendly, Direct, or Firm but professional tone.
4. Edit and copy the draft into the user's normal communication channel. The prototype never sends it.
5. Mark the invoice paid or paused.
6. Export/import JSON or rely on browser-local persistence.

## Boundaries

- No login, account, backend, cloud sync, payment processing, bank connection, email/SMS integration, or external message sending.
- Data is stored in the current browser's local storage. Use anonymized examples for the prototype.
- It is not accounting, tax, legal, collections, or financial advice.
- No customer interviews or willingness-to-pay evidence is included; those are next validation steps.

## Acceptance criteria

A clean-session tester should be able to load without login, add invoices with different dates, see correct priority states, create/edit/copy each tone, mark an invoice paid, reload and retain data, export/reset/re-import JSON, and complete the core flow with keyboard navigation.

See `TEST-RESULTS.md` for the verification record.
