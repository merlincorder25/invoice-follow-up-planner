(() => {
  'use strict';
  const KEY = 'invoice-planner-v1';
  const state = { invoices: [], selected: null, tone: 'friendly', filter: 'all' };
  const $ = (s) => document.querySelector(s);
  const money = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });
  const pad = (n) => String(n).padStart(2, '0');
  const dateString = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => dateString(new Date());
  const daysFromNow = (n) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + n); return dateString(d); };
  const dateValue = (s) => { const p = String(s || '').split('-').map(Number); return p.length === 3 && p.every(Number.isFinite) ? new Date(p[0], p[1] - 1, p[2]) : null; };
  const readableDate = (s) => { const d = dateValue(s); return d ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'no date'; };
  const id = () => `i-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const escape = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const statusOk = (s) => ['open', 'paid', 'paused'].includes(s) ? s : 'open';

  function clean(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const amount = Number(raw.amount);
    if (!String(raw.client || '').trim() || !String(raw.reference || '').trim() || !Number.isFinite(amount) || amount < 0) return null;
    return { id: String(raw.id || id()), client: String(raw.client).trim().slice(0, 80), reference: String(raw.reference).trim().slice(0, 40), amount, issued: String(raw.issued || today()), due: String(raw.due || today()), status: statusOk(raw.status), notes: String(raw.notes || '').slice(0, 400), drafts: raw.drafts && typeof raw.drafts === 'object' ? raw.drafts : {} };
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state.invoices)); }
  function load() { try { const data = JSON.parse(localStorage.getItem(KEY) || '[]'); state.invoices = Array.isArray(data) ? data.map(clean).filter(Boolean) : []; } catch { state.invoices = []; } }
  function classify(i) {
    if (i.status === 'paid') return { key:'paid', label:'Paid', rank:4 };
    if (i.status === 'paused') return { key:'paused', label:'Paused', rank:3 };
    if (i.due < today()) return { key:'overdue', label:`Overdue · ${Math.max(1, Math.round((dateValue(today()) - dateValue(i.due)) / 86400000))}d`, rank:0 };
    if (i.due === today()) return { key:'due', label:'Due today', rank:1 };
    return { key:'upcoming', label:`Due ${readableDate(i.due)}`, rank:2 };
  }
  function message(text, error = false) { const el = $('#message'); el.textContent = text; el.className = `message${error ? ' error' : ''}`; el.hidden = false; clearTimeout(message.timer); message.timer = setTimeout(() => { el.hidden = true; }, 4200); }
  function render() { renderMetrics(); renderList(); renderDraft(); document.querySelectorAll('.filter').forEach((b) => b.classList.toggle('active', b.dataset.filter === state.filter)); }
  function renderMetrics() { const open = state.invoices.filter((i) => i.status === 'open'); $('#balance').textContent = money.format(open.reduce((sum, i) => sum + i.amount, 0)); $('#attention').textContent = String(open.filter((i) => ['overdue', 'due'].includes(classify(i).key)).length); $('#count').textContent = String(state.invoices.length); }
  function visible() { return state.invoices.filter((i) => state.filter === 'all' || (state.filter === 'open' && i.status === 'open') || (state.filter === 'attention' && ['overdue', 'due'].includes(classify(i).key))).sort((a, b) => classify(a).rank - classify(b).rank || a.due.localeCompare(b.due)); }
  function renderList() {
    const list = $('#invoice-list'); const items = visible();
    if (!items.length) { list.innerHTML = `<div class="empty"><span aria-hidden="true">☼</span><p>${state.invoices.length ? 'No invoices match this view.' : 'Add an invoice or load demo data to begin.'}</p></div>`; return; }
    list.innerHTML = items.map((i) => { const c = classify(i); const chosen = i.id === state.selected ? ' selected' : ''; return `<article class="card ${c.key}${chosen}"><div class="card-top"><div><span class="card-name">${escape(i.client)}</span><span class="ref">${escape(i.reference)}</span><span class="badge ${c.key}">${escape(c.label)}</span></div><span class="amount">${money.format(i.amount)}</span></div><div class="meta">Due ${escape(readableDate(i.due))}${i.notes ? ` · ${escape(i.notes)}` : ''}</div><div class="card-actions"><button class="mini" data-action="draft" data-id="${escape(i.id)}" type="button">Draft reminder</button>${i.status !== 'paid' ? `<button class="mini" data-action="paid" data-id="${escape(i.id)}" type="button">Mark paid</button>` : ''}${i.status === 'open' ? `<button class="mini" data-action="paused" data-id="${escape(i.id)}" type="button">Pause</button>` : i.status === 'paused' ? `<button class="mini" data-action="reopen" data-id="${escape(i.id)}" type="button">Reopen</button>` : ''}<button class="mini" data-action="edit" data-id="${escape(i.id)}" type="button">Edit</button><button class="mini" data-action="delete" data-id="${escape(i.id)}" type="button">Delete</button></div></article>`; }).join('');
  }
  function draftText(i, tone) {
    const opening = `Hi ${i.client},`;
    const detail = `I’m following up on ${i.reference} for ${money.format(i.amount)}, due ${readableDate(i.due)}.`;
    if (tone === 'direct') return `${opening}\n\n${detail}\n\nCould you confirm when payment is scheduled?\n\nThanks,`;
    if (tone === 'firm') return `${opening}\n\n${detail}\n\nPlease arrange payment or let me know today if there is an issue I should address.\n\nRegards,`;
    return `${opening}\n\nJust checking in on ${i.reference} for ${money.format(i.amount)}, due ${readableDate(i.due)}.\n\nCould you let me know when you expect to take care of it? Happy to answer any questions.\n\nThanks,`;
  }
  function renderDraft() {
    const i = state.invoices.find((item) => item.id === state.selected); if (!i) { $('#draft-empty').hidden = false; $('#draft-area').hidden = true; return; }
    $('#draft-empty').hidden = true; $('#draft-area').hidden = false; const c = classify(i); $('#selected').innerHTML = `<strong>${escape(i.client)} · ${escape(i.reference)}</strong><span>${money.format(i.amount)} · ${escape(c.label)}</span>`;
    document.querySelectorAll('.tone').forEach((b) => { const active = b.dataset.tone === state.tone; b.classList.toggle('active', active); b.setAttribute('aria-selected', String(active)); });
    $('#draft').value = i.drafts[state.tone] || draftText(i, state.tone);
  }
  function clearForm() { $('#invoice-form').reset(); $('#invoice-id').value = ''; $('#issued').value = today(); $('#due').value = daysFromNow(14); $('#status').value = 'open'; $('#form-title').textContent = 'Add invoice'; $('#save').textContent = 'Save invoice'; $('#cancel').hidden = true; }
  function edit(i) { $('#invoice-id').value = i.id; $('#client').value = i.client; $('#reference').value = i.reference; $('#amount').value = i.amount; $('#issued').value = i.issued; $('#due').value = i.due; $('#status').value = i.status; $('#notes').value = i.notes; $('#form-title').textContent = 'Edit invoice'; $('#save').textContent = 'Update invoice'; $('#cancel').hidden = false; $('#client').focus(); }
  function demo() { return [{ client:'Northstar Studio', reference:'NS-104', amount:1850, issued:daysFromNow(-32), due:daysFromNow(-2), notes:'First reminder is ready.' }, { client:'Juniper Works', reference:'JW-219', amount:920, issued:daysFromNow(-10), due:today(), notes:'Confirm the billing contact.' }, { client:'Mosaic & Co.', reference:'MC-087', amount:2400, issued:daysFromNow(-4), due:daysFromNow(12), notes:'Upcoming; no action yet.' }].map(clean); }
  function submit(e) { e.preventDefault(); const item = clean({ id:$('#invoice-id').value || id(), client:$('#client').value, reference:$('#reference').value, amount:$('#amount').value, issued:$('#issued').value, due:$('#due').value, status:$('#status').value, notes:$('#notes').value }); if (!item) return message('Enter a client, reference, and non-negative amount.', true); const at = state.invoices.findIndex((i) => i.id === item.id); if (at >= 0) { item.drafts = state.invoices[at].drafts; state.invoices[at] = item; message('Invoice updated.'); } else { state.invoices.push(item); state.selected = item.id; message('Invoice added.'); } save(); clearForm(); render(); }
  function exportData() { const blob = new Blob([JSON.stringify({ invoices:state.invoices }, null, 2)], { type:'application/json' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'invoice-planner.json'; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 500); message('JSON export downloaded.'); }
  function importData(file) { if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const parsed = JSON.parse(reader.result); const raw = Array.isArray(parsed) ? parsed : parsed.invoices; if (!Array.isArray(raw)) throw Error('shape'); const items = raw.map(clean).filter(Boolean); if (raw.length && !items.length) throw Error('records'); state.invoices = items; state.selected = items[0]?.id || null; save(); render(); message(`Imported ${items.length} invoice${items.length === 1 ? '' : 's'}.`); } catch { message('Import failed. Choose a planner JSON export.', true); } $('#import-file').value = ''; }; reader.readAsText(file); }
  $('#invoice-form').addEventListener('submit', submit); $('#cancel').addEventListener('click', clearForm); $('#demo').addEventListener('click', () => { if (state.invoices.length && !confirm('Replace current invoices with demo data?')) return; state.invoices = demo(); state.selected = state.invoices[0].id; save(); render(); message('Demo data loaded.'); }); $('#reset').addEventListener('click', () => { if (!confirm('Clear all local invoices?')) return; state.invoices = []; state.selected = null; localStorage.removeItem(KEY); clearForm(); render(); message('Planner reset.'); }); $('#export').addEventListener('click', exportData); $('#import-button').addEventListener('click', () => $('#import-file').click()); $('#import-file').addEventListener('change', (e) => importData(e.target.files[0])); $('#invoice-list').addEventListener('click', (e) => { const b = e.target.closest('[data-action]'); if (!b) return; const i = state.invoices.find((x) => x.id === b.dataset.id); if (!i) return; const a = b.dataset.action; if (a === 'draft') { state.selected = i.id; render(); } else if (a === 'edit') edit(i); else if (a === 'delete' && confirm(`Delete ${i.reference}?`)) { state.invoices = state.invoices.filter((x) => x.id !== i.id); if (state.selected === i.id) state.selected = null; save(); render(); message('Invoice deleted.'); } else if (a === 'paid') { i.status = 'paid'; save(); render(); message(`${i.reference} marked paid.`); } else if (a === 'paused') { i.status = 'paused'; save(); render(); message(`${i.reference} paused.`); } else if (a === 'reopen') { i.status = 'open'; save(); render(); message(`${i.reference} reopened.`); } });
  document.querySelectorAll('.filter').forEach((b) => b.addEventListener('click', () => { state.filter = b.dataset.filter; render(); })); document.querySelectorAll('.tone').forEach((b) => b.addEventListener('click', () => { state.tone = b.dataset.tone; renderDraft(); })); $('#draft').addEventListener('input', (e) => { const i = state.invoices.find((x) => x.id === state.selected); if (i) { i.drafts[state.tone] = e.target.value; save(); } }); $('#copy').addEventListener('click', async () => { const text = $('#draft').value; let ok = false; try { await navigator.clipboard.writeText(text); ok = true; } catch { $('#draft').focus(); $('#draft').select(); try { ok = document.execCommand('copy'); } catch {} } $('#copy-result').textContent = ok ? 'Copied to clipboard.' : 'Select the text and copy manually.'; setTimeout(() => { $('#copy-result').textContent = ''; }, 3500); });
  load(); if (state.invoices[0]) state.selected = state.invoices[0].id; clearForm(); render();
})();
