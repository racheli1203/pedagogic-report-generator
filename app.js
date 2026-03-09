/**
 * app.js — Pedagogical Report Generator
 * Project 4 of 6 | Demo only — no server, no auth, no real PDF parsing
 * All logic follows CLAUDE.md specifications
 */

'use strict';

// ============================================================
// TEMPLATES DATA
// Source: CLAUDE.md Section 7 — all 5 templates with mock data
// ============================================================

const TEMPLATES = {
  A: {
    name: 'מכתב עדכון להורים',
    fields: [
      { label: 'שם תלמיד',     value: 'יוסף מזרחי' },
      { label: 'כיתה',          value: 'ח-1' },
      { label: 'נקודות חוזק',   value: 'מעורבות גבוהה בספורט ואומנות, קשרים חברתיים טובים' },
      { label: 'אתגרים',        value: 'קשיי קשב בשיעורים תיאורטיים, איחורים בהגשת מטלות' },
      { label: 'פעולות שננקטו', value: 'שיחה עם יועצת, פגישת הורים ב-10.6.2025' },
      { label: 'המלצות',        value: 'מעקב שבועי, תמיכה בשיעורי בית' },
    ],
    draft:
`מכתב עדכון להורים — יוסף מזרחי, כיתה ח-1.
יוסף מפגין מעורבות גבוהה בתחומי הספורט והאומנות וקשרים חברתיים טובים עם בני כיתתו. עם זאת, קיימים קשיי קשב בשיעורים תיאורטיים ואיחורים בהגשת מטלות. קיימנו שיחה עם היועצת ופגישת הורים ב-10.6.2025. אנו ממליצים על מעקב שבועי ותמיכה בשיעורי הבית.
בברכה,
[שם המורה]`,
  },

  B: {
    name: 'סיכום פדגוגי פנימי',
    fields: [
      { label: 'שם תלמיד',        value: 'נועה ביטון' },
      { label: 'כיתה',             value: 'ט-2' },
      { label: 'תיאור מצב',        value: 'קשיים בהבנת החומר בעברית ובמתמטיקה, רמת מוטיבציה נמוכה' },
      { label: 'פעולות שננקטו',    value: 'פגישת הורים, הפניה לשיעורי חיזוק' },
      { label: 'המלצה הבאה',       value: 'בחינת זכאות לתמיכה נוספת' },
      { label: 'גורמים מעורבים',   value: 'מורה מקצועית, יועצת חינוכית' },
    ],
    draft:
`סיכום פדגוגי פנימי — נועה ביטון, כיתה ט-2.
נועה חווה קשיים בהבנת החומר בעברית ובמתמטיקה ומפגינה רמת מוטיבציה נמוכה. נערכה פגישת הורים והיא הופנתה לשיעורי חיזוק. מומלץ לבחון זכאות לתמיכה נוספת. מסמך זה מיועד לשימוש פנימי בלבד.`,
  },

  C: {
    name: 'הפניה ליועץ',
    fields: [
      { label: 'שם תלמיד',        value: 'אדם פרץ' },
      { label: 'כיתה',             value: 'ח-2' },
      { label: 'סיבת הפניה',       value: 'שינוי התנהגותי פתאומי, נסיגה חברתית, קשיי שינה לפי דיווח הורים' },
      { label: 'דחיפות',           value: 'גבוהה' },
      { label: 'פעולות קודמות',    value: 'שיחה עם מחנך בלבד' },
    ],
    draft:
`הפניה ליועץ החינוכי — אדם פרץ, כיתה ח-2.
מופנה לטיפול דחוף עקב שינוי התנהגותי פתאומי הכולל נסיגה חברתית וקשיי שינה לפי דיווח ההורים. עד כה התקיימה שיחה עם המחנך בלבד. נדרש מעקב מקצועי בהקדם האפשרי.`,
  },

  D: {
    name: 'מכתב הצטיינות',
    fields: [
      { label: 'שם תלמיד',      value: 'שירה גולן' },
      { label: 'כיתה',           value: 'ח-2' },
      { label: 'הישגים',         value: 'ממוצע ציונים 95, השתתפות פעילה, ייצגה את הכיתה בתחרות מדע' },
      { label: 'תכונות בולטות', value: 'אחריות, מנהיגות, סיוע לחברים' },
    ],
    draft:
`משפחת גולן היקרה,
אנו שמחים לציין את הישגיה המרשימים של שירה במהלך הסמסטר הנוכחי. לשירה ממוצע ציונים של 95, נוכחות מלאה, וייצגה את כיתתה בתחרות מדע בית-ספרית. אנו גאים בה ומעודדים אותה להמשיך בדרך זו.

בברכה,
[שם המורה]`,
  },

  E: {
    name: 'תוכנית התערבות התנהגותית',
    fields: [
      { label: 'שם תלמיד',        value: 'משה כהן' },
      { label: 'כיתה',             value: 'ח-1' },
      { label: 'תיאור ההתנהגות',   value: 'הפרעות חוזרות בכיתה, קונפליקטים עם תלמידים אחרים' },
      { label: 'טריגרים שזוהו',    value: 'שיעורי מתמטיקה, שעות אחר הצהריים' },
      { label: 'מטרות',            value: 'הפחתת אירועי ההפרעה ב-50% תוך חודש' },
      { label: 'אסטרטגיות',        value: 'ישיבה בחזית, הפסקות קצרות, חיזוק חיובי' },
      { label: 'גורמים מעורבים',   value: 'מחנך, יועץ, הורים' },
    ],
    draft:
`תוכנית התערבות התנהגותית — משה כהן, כיתה ח-1.
זוהו הפרעות חוזרות בכיתה, בעיקר בשיעורי מתמטיקה. מטרת התוכנית היא הפחתת אירועי ההפרעה ב-50% תוך חודש. האסטרטגיות כוללות שינוי מיקום הישיבה, הפסקות קצרות וחיזוק חיובי.
גורמים מעורבים: מחנך, יועץ והורים.`,
  },
};

// PDF simulation text (CLAUDE.md Section 8)
const PDF_NARRATIVE =
  'מתוך הדוח שהועלה: יוסף הראה שיפור בציוני עברית (מ-65 ל-74) בסמסטר האחרון. עם זאת, נרשמו 4 היעדרויות במאי. המורים מציינים פוטנציאל גבוה שטרם מומש במלואו.';

// ============================================================
// STATE
// ============================================================

let currentStep = 1;
let selectedTemplate = null;
let pdfUploaded = false;

// ============================================================
// TEMPLATE CHANGE HANDLER
// ============================================================

function onTemplateChange() {
  const select = document.getElementById('template-select');
  const templateKey = select.value;

  if (!templateKey) {
    document.getElementById('questionnaire-area').style.display = 'none';
    document.getElementById('step1-btn-area').style.display = 'none';
    selectedTemplate = null;
    return;
  }

  selectedTemplate = templateKey;
  const template = TEMPLATES[templateKey];

  // Render questionnaire title
  document.getElementById('questionnaire-title').textContent =
    `שאלון — ${template.name}`;

  // Render fields
  const fieldsEl = document.getElementById('questionnaire-fields');
  fieldsEl.innerHTML = renderFieldsGrid(template.fields);

  // Show questionnaire and button
  document.getElementById('questionnaire-area').style.display = 'block';
  document.getElementById('step1-btn-area').style.display = 'block';

  // Pre-fill draft textarea for Step 2
  document.getElementById('draft-textarea').value = template.draft;
}

// Build the fields grid HTML
function renderFieldsGrid(fields) {
  return `<div class="fields-grid">
    ${fields.map(f => `
      <div class="fields-grid__label">${escapeHtml(f.label)}</div>
      <div class="fields-grid__value">${escapeHtml(f.value)}</div>
    `).join('')}
  </div>`;
}

// ============================================================
// STEPPER NAVIGATION
// ============================================================

function goToStep(stepNumber) {
  // Validation: must have a template selected before leaving Step 1
  if (stepNumber === 2 && !selectedTemplate) {
    showToast('יש לבחור תבנית לפני המשך');
    return;
  }

  // Hide all steps
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('is-active'));
  // Show target step
  document.getElementById(`step-${stepNumber}`).classList.add('is-active');

  // Update stepper indicators
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    indicator.classList.remove('is-active', 'is-completed');
    if (i < stepNumber) {
      indicator.classList.add('is-completed');
      indicator.querySelector('.stepper__circle').textContent = '✓';
    } else if (i === stepNumber) {
      indicator.classList.add('is-active');
      indicator.querySelector('.stepper__circle').textContent = i;
    } else {
      indicator.querySelector('.stepper__circle').textContent = i;
    }
  }

  currentStep = stepNumber;

  // Scroll to top of content
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// PDF UPLOAD SIMULATION
// ============================================================

function simulatePdfUpload() {
  pdfUploaded = true;

  // Update button appearance
  const btn = document.getElementById('upload-btn');
  btn.classList.add('uploaded');
  document.getElementById('upload-icon').textContent = '✅';
  document.getElementById('upload-text').textContent = 'המסמך הועלה בהצלחה — דוח בית_ספר.pdf';
  btn.onclick = null; // prevent re-uploading

  // Show Teacher Narrative
  document.getElementById('teacher-narrative-area').style.display = 'block';
  document.getElementById('teacher-narrative-text').textContent = PDF_NARRATIVE;

  showToast('המסמך הועלה בהצלחה');
}

// ============================================================
// EXPORT ACTIONS
// ============================================================

function copyText() {
  const draft = document.getElementById('draft-textarea').value;
  if (!draft.trim()) {
    showToast('אין טקסט להעתקה');
    return;
  }
  navigator.clipboard.writeText(draft)
    .then(() => showToast('הטקסט הועתק ללוח'))
    .catch(() => {
      // Fallback for environments without clipboard API
      const ta = document.createElement('textarea');
      ta.value = draft;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('הטקסט הועתק ללוח');
    });
}

function exportWord() {
  // Demo simulation — no real file generation
  showToast('מייצא קובץ Word... (סימולציה)');
}

// ============================================================
// RESET
// ============================================================

function resetApp() {
  // Reset state
  selectedTemplate = null;
  pdfUploaded = false;
  currentStep = 1;

  // Reset template dropdown
  document.getElementById('template-select').value = '';

  // Reset questionnaire area
  document.getElementById('questionnaire-area').style.display = 'none';
  document.getElementById('step1-btn-area').style.display = 'none';
  document.getElementById('questionnaire-fields').innerHTML = '';

  // Reset Step 2
  const uploadBtn = document.getElementById('upload-btn');
  uploadBtn.classList.remove('uploaded');
  document.getElementById('upload-icon').textContent = '📎';
  document.getElementById('upload-text').textContent = 'העלאת מסמך PDF (אופציונלי)';
  uploadBtn.onclick = simulatePdfUpload;
  document.getElementById('teacher-narrative-area').style.display = 'none';
  document.getElementById('draft-textarea').value = '';

  // Go back to Step 1
  goToStep(1);
}

// ============================================================
// TOAST NOTIFICATION
// ============================================================

let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ============================================================
// UTILS
// ============================================================

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
