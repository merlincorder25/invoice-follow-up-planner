# Prototype plan

## Selected opportunity

Invoice Radar: a browser-only invoice follow-up planner for solo service businesses and micro-agencies with a small number of open invoices.

## Customer and problem

Target customer: an owner-operator who tracks invoices in memory, email, or a spreadsheet. Specific problem: they know money is outstanding but lack a dependable way to decide what needs attention next and how to begin a professional follow-up.

## Smallest useful version

Add a small invoice list, rank open items by urgency, generate editable reminder drafts, and let the user mark outcomes. Data stays in the browser and no message is sent.

## Necessary functionality

- Add, edit, delete, pause, reopen, and mark paid.
- Capture client label, reference, amount, issue date, due date, status, and note.
- Calculate overdue, due-today, and upcoming states and sort the open queue.
- Generate Friendly, Direct, and Firm-but-professional editable drafts.
- Copy drafts without sending.
- Persist locally and support JSON export/import/reset.
- Provide demo data and explicit safety boundaries.

## Explicitly excluded

Accounts, cloud sync, email/SMS delivery, payment processing, bank/accounting integrations, push notifications, late fees, interest, legal/collections advice, customer contact, and personal data.

## Assumptions to test

1. Owner-operators experience payment follow-up often enough to revisit a tool.
2. A ranked action queue is more useful than a generic spreadsheet or calendar reminder.
3. Manual entry of a small invoice list is acceptable for a first experience.
4. Editable drafts reduce the effort of follow-up without creating risky overconfidence.
5. A browser-local workflow is trusted for a prototype.

## Acceptance criteria

A clean-session user can load without login, add invoices with different due dates, see accurate priority, create/edit/copy all three tones without external communication, mark paid/paused, reload and retain local data, export/reset/re-import JSON, and use the core flow with keyboard navigation.

## Evidence boundary

The Federal Reserve's 2024 Report on Payments supports the general problem signal: customer payments are the primary source of small-business cash, roughly four of five small firms face payment-related challenges, and slow-paying customers are a reported challenge for professional services, real estate, and manufacturing. This does not validate the specific segment, interface, retention, or willingness to pay.
