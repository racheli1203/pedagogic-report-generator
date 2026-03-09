/**
 * app.js — Application Logic
 * Project 4: Pedagogical Report Generator
 *
 * Responsibilities: stepper navigation, UI rendering, user interactions.
 * All data is read from DB (assets/js/data/db.js) — no hardcoded content here.
 */

'use strict';

// ── State ──────────────────────────────────────────────────────────────────

let currentStep      = 1;
let selectedTemplate = null;
let pdfUploaded      = false;

// ── Template Selection ─────────────────────────────────────────────────────

function onTemplateChange() {
  const templateId = document.getElementById('template-select').value;

  if (!templateId) {
    document.getElementById('questionnaire-area').style.display = 'none';
    document.getElementById('step1-btn-area').style.display = 'none';
    selectedTemplate = null;
    return;
  }

  const template = DB.getTemplate(templateId);
  selectedTemplate = templateId;

  document.getElementById('questionnaire-title').textContent =
    `שאלון — ${template.name}`;
  document.getElementById('questionnaire-fields').innerHTML =
    renderFieldsGrid(template.fields);
  document.getElementById('questionnaire-area').style.display = 'block';
  document.getElementById('step1-btn-area').style.display = 'block';
  document.getElementById('draft-textarea').value = template.draft;
}

function renderFieldsGrid(fields) {
  const rows = fields.map(f => `
    <div class="fields-grid__label">${escapeHtml(f.label)}</div>
    <div class="fields-grid__value">${escapeHtml(f.value)}</div>
  `).join('');
  return `<div class="fields-grid">${rows}</div>`;
}

// ── Stepper Navigation ─────────────────────────────────────────────────────

function goToStep(stepNumber) {
  if (stepNumber === 2 && !selectedTemplate) {
    showToast('יש לבחור תבנית לפני המשך');
    return;
  }

  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('is-active'));
  document.getElementById(`step-${stepNumber}`).classList.add('is-active');

  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    const circle    = indicator.querySelector('.stepper__circle');
    indicator.classList.remove('is-active', 'is-completed');
    if (i < stepNumber) {
      indicator.classList.add('is-completed');
      circle.textContent = '✓';
    } else if (i === stepNumber) {
      indicator.classList.add('is-active');
      circle.textContent = i;
    } else {
      circle.textContent = i;
    }
  }

  currentStep = stepNumber;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── PDF Upload Simulation ──────────────────────────────────────────────────

function simulatePdfUpload() {
  pdfUploaded = true;

  const btn = document.getElementById('upload-btn');
  btn.classList.add('uploaded');
  btn.onclick = null;
  document.getElementById('upload-icon').textContent = '✅';
  document.getElementById('upload-text').textContent = 'המסמך הועלה בהצלחה — דוח בית_ספר.pdf';

  document.getElementById('teacher-narrative-area').style.display = 'block';
  document.getElementById('teacher-narrative-text').textContent = DB.pdfNarrative;

  showToast('המסמך הועלה בהצלחה');
}

// ── Export Actions ─────────────────────────────────────────────────────────

function copyText() {
  const draft = document.getElementById('draft-textarea').value;
  if (!draft.trim()) { showToast('אין טקסט להעתקה'); return; }

  navigator.clipboard.writeText(draft)
    .then(() => showToast('הטקסט הועתק ללוח'))
    .catch(() => {
      // Fallback for environments without clipboard API
      const ta = document.createElement('textarea');
      ta.value = draft;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('הטקסט הועתק ללוח');
    });
}

function exportWord() {
  showToast('מייצא קובץ Word... (סימולציה)');
}

// ── Reset ──────────────────────────────────────────────────────────────────

function resetApp() {
  selectedTemplate = null;
  pdfUploaded      = false;
  currentStep      = 1;

  document.getElementById('template-select').value = '';
  document.getElementById('questionnaire-area').style.display = 'none';
  document.getElementById('step1-btn-area').style.display = 'none';
  document.getElementById('questionnaire-fields').innerHTML = '';

  const uploadBtn = document.getElementById('upload-btn');
  uploadBtn.classList.remove('uploaded');
  uploadBtn.onclick = simulatePdfUpload;
  document.getElementById('upload-icon').textContent = '📎';
  document.getElementById('upload-text').textContent = 'העלאת מסמך PDF (אופציונלי)';
  document.getElementById('teacher-narrative-area').style.display = 'none';
  document.getElementById('draft-textarea').value = '';

  goToStep(1);
}

// ── Toast Notification ─────────────────────────────────────────────────────

let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── Utils ──────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
