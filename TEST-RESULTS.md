# Test results

## Static checks

- Source files present: PASS — `index.html`, `styles.css`, `app.js`.
- No runtime dependencies or API keys: PASS — app uses browser APIs only.
- Safety boundary visible: PASS — UI states local-only storage and no send/payment/account features.
- User content escaped before invoice-card rendering: PASS — `escape()` uses a detached text node.
- Imported records normalized and validated: PASS — imported fields are constrained, statuses are allow-listed, and malformed records are skipped with a visible count.
- Required flow present: PASS — add, edit, delete, priority queue, draft tones, copy-only, mark paid/paused, local persistence, JSON export/import, reset, demo data.

## Browser smoke-test protocol

Run in a clean browser profile or private window:

1. Open `index.html` and confirm the page loads without a login.
2. Load demo data. Confirm overdue, due-today, upcoming, and paid examples appear.
3. Add three anonymized invoices with different due dates. Confirm the queue puts overdue before due-today before upcoming.
4. Open a draft, switch through Friendly, Direct, and Firm but professional, edit the text, and use Copy draft. Confirm the UI says nothing was sent.
5. Mark an invoice paid. Confirm it leaves the Open view and appears in Paid.
6. Pause and reopen an invoice.
7. Reload the page. Confirm records remain in the same browser.
8. Export JSON, reset the workspace, import the export, and confirm records return.
9. Import malformed JSON and confirm the app reports failure without replacing records. Array-shaped records with invalid amount/date/order are rejected and counted as skipped.
10. Enter a `<script>` string as a client label and confirm it renders as text rather than executing.
11. Use Tab, Enter, and visible focus outlines through the add and draft flow.
12. Inspect the browser console and network panel for unexpected errors or external requests.

## Known limitation

The prototype is intentionally a static client-side app. Automated browser execution, cross-browser testing, user research, and commercial validation remain separate work. The app does not send reminders, sync data, or calculate late fees, interest, taxes, or legal collection actions.
