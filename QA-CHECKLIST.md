# Independent QA checklist

This checklist is for an independent reviewer, separate from the builder's static checks.

- [ ] Clean session loads without login or prior data.
- [ ] Demo data makes the priority order obvious.
- [ ] Add/edit/delete work for valid records.
- [ ] Invalid and reversed dates are rejected.
- [ ] Open, paid, and paused filters work.
- [ ] Overdue, today, upcoming labels match the current date.
- [ ] Reminder drafts change across all three tones and remain editable.
- [ ] Copy is local-only; no send, payment, auth, or external route exists.
- [ ] Paid and paused transitions update the queue.
- [ ] Reload persists local data in the same browser.
- [ ] Export/reset/import round trip works; malformed import is safe.
- [ ] User-entered HTML is rendered as text.
- [ ] Keyboard focus and mobile layout are usable.
- [ ] Console and network inspection show no obvious errors or unintended requests.

Verdict: record PASS, FAIL, or INCONCLUSIVE for each item with observed evidence. Do not treat the builder's checklist as proof.
