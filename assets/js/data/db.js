/**
 * db.js — Mock Data Access Layer
 * Project 4: Pedagogical Report Generator
 *
 * Simulates a database of report templates and supporting content.
 * In production this would be replaced by API calls to a real backend.
 *
 * Usage:
 *   DB.getTemplate('A')        → single template record
 *   DB.getAllTemplates()        → array of all templates
 *   DB.getTemplateList()        → [{ id, name }] for dropdown rendering
 */

'use strict';

const DB = Object.freeze({

  // ── Template Records ───────────────────────────────────────────────────────
  // Each record mirrors a database row: id, category, display name,
  // structured fields (questionnaire), and the generated draft text.

  templates: {

    A: {
      id: 'A',
      category: 'parent_communication',
      name: 'מכתב עדכון להורים',
      fields: [
        { key: 'student_name',  label: 'שם תלמיד',       value: 'יוסף מזרחי' },
        { key: 'class',         label: 'כיתה',            value: 'ח-1' },
        { key: 'strengths',     label: 'נקודות חוזק',     value: 'מעורבות גבוהה בספורט ואומנות, קשרים חברתיים טובים' },
        { key: 'challenges',    label: 'אתגרים',           value: 'קשיי קשב בשיעורים תיאורטיים, איחורים בהגשת מטלות' },
        { key: 'actions_taken', label: 'פעולות שננקטו',   value: 'שיחה עם יועצת, פגישת הורים ב-10.6.2025' },
        { key: 'recommendations', label: 'המלצות',        value: 'מעקב שבועי, תמיכה בשיעורי בית' },
      ],
      draft:
`מכתב עדכון להורים — יוסף מזרחי, כיתה ח-1.
יוסף מפגין מעורבות גבוהה בתחומי הספורט והאומנות וקשרים חברתיים טובים עם בני כיתתו. עם זאת, קיימים קשיי קשב בשיעורים תיאורטיים ואיחורים בהגשת מטלות. קיימנו שיחה עם היועצת ופגישת הורים ב-10.6.2025. אנו ממליצים על מעקב שבועי ותמיכה בשיעורי הבית.
בברכה,
[שם המורה]`,
    },

    B: {
      id: 'B',
      category: 'internal_summary',
      name: 'סיכום פדגוגי פנימי',
      fields: [
        { key: 'student_name',     label: 'שם תלמיד',        value: 'נועה ביטון' },
        { key: 'class',            label: 'כיתה',             value: 'ט-2' },
        { key: 'situation',        label: 'תיאור מצב',        value: 'קשיים בהבנת החומר בעברית ובמתמטיקה, רמת מוטיבציה נמוכה' },
        { key: 'actions_taken',    label: 'פעולות שננקטו',    value: 'פגישת הורים, הפניה לשיעורי חיזוק' },
        { key: 'next_recommendation', label: 'המלצה הבאה',   value: 'בחינת זכאות לתמיכה נוספת' },
        { key: 'involved_parties', label: 'גורמים מעורבים',  value: 'מורה מקצועית, יועצת חינוכית' },
      ],
      draft:
`סיכום פדגוגי פנימי — נועה ביטון, כיתה ט-2.
נועה חווה קשיים בהבנת החומר בעברית ובמתמטיקה ומפגינה רמת מוטיבציה נמוכה. נערכה פגישת הורים והיא הופנתה לשיעורי חיזוק. מומלץ לבחון זכאות לתמיכה נוספת. מסמך זה מיועד לשימוש פנימי בלבד.`,
    },

    C: {
      id: 'C',
      category: 'counselor_referral',
      name: 'הפניה ליועץ',
      fields: [
        { key: 'student_name',     label: 'שם תלמיד',        value: 'אדם פרץ' },
        { key: 'class',            label: 'כיתה',             value: 'ח-2' },
        { key: 'referral_reason',  label: 'סיבת הפניה',       value: 'שינוי התנהגותי פתאומי, נסיגה חברתית, קשיי שינה לפי דיווח הורים' },
        { key: 'urgency',          label: 'דחיפות',           value: 'גבוהה' },
        { key: 'prior_actions',    label: 'פעולות קודמות',    value: 'שיחה עם מחנך בלבד' },
      ],
      draft:
`הפניה ליועץ החינוכי — אדם פרץ, כיתה ח-2.
מופנה לטיפול דחוף עקב שינוי התנהגותי פתאומי הכולל נסיגה חברתית וקשיי שינה לפי דיווח ההורים. עד כה התקיימה שיחה עם המחנך בלבד. נדרש מעקב מקצועי בהקדם האפשרי.`,
    },

    D: {
      id: 'D',
      category: 'excellence',
      name: 'מכתב הצטיינות',
      fields: [
        { key: 'student_name',     label: 'שם תלמיד',       value: 'שירה גולן' },
        { key: 'class',            label: 'כיתה',            value: 'ח-2' },
        { key: 'achievements',     label: 'הישגים',          value: 'ממוצע ציונים 95, השתתפות פעילה, ייצגה את הכיתה בתחרות מדע' },
        { key: 'notable_traits',   label: 'תכונות בולטות',  value: 'אחריות, מנהיגות, סיוע לחברים' },
      ],
      draft:
`משפחת גולן היקרה,
אנו שמחים לציין את הישגיה המרשימים של שירה במהלך הסמסטר הנוכחי. לשירה ממוצע ציונים של 95, נוכחות מלאה, וייצגה את כיתתה בתחרות מדע בית-ספרית. אנו גאים בה ומעודדים אותה להמשיך בדרך זו.

בברכה,
[שם המורה]`,
    },

    E: {
      id: 'E',
      category: 'behavioral_intervention',
      name: 'תוכנית התערבות התנהגותית',
      fields: [
        { key: 'student_name',     label: 'שם תלמיד',        value: 'משה כהן' },
        { key: 'class',            label: 'כיתה',             value: 'ח-1' },
        { key: 'behavior',         label: 'תיאור ההתנהגות',   value: 'הפרעות חוזרות בכיתה, קונפליקטים עם תלמידים אחרים' },
        { key: 'triggers',         label: 'טריגרים שזוהו',    value: 'שיעורי מתמטיקה, שעות אחר הצהריים' },
        { key: 'goals',            label: 'מטרות',            value: 'הפחתת אירועי ההפרעה ב-50% תוך חודש' },
        { key: 'strategies',       label: 'אסטרטגיות',        value: 'ישיבה בחזית, הפסקות קצרות, חיזוק חיובי' },
        { key: 'involved_parties', label: 'גורמים מעורבים',   value: 'מחנך, יועץ, הורים' },
      ],
      draft:
`תוכנית התערבות התנהגותית — משה כהן, כיתה ח-1.
זוהו הפרעות חוזרות בכיתה, בעיקר בשיעורי מתמטיקה. מטרת התוכנית היא הפחתת אירועי ההפרעה ב-50% תוך חודש. האסטרטגיות כוללות שינוי מיקום הישיבה, הפסקות קצרות וחיזוק חיובי.
גורמים מעורבים: מחנך, יועץ והורים.`,
    },

  },

  // ── Supporting Content ─────────────────────────────────────────────────────

  /** Pre-prepared AI narrative injected after PDF upload simulation */
  pdfNarrative:
    'מתוך הדוח שהועלה: יוסף הראה שיפור בציוני עברית (מ-65 ל-74) בסמסטר האחרון. עם זאת, נרשמו 4 היעדרויות במאי. המורים מציינים פוטנציאל גבוה שטרם מומש במלואו.',

  // ── Query Methods ──────────────────────────────────────────────────────────

  /** Returns a single template record by id, or null if not found */
  getTemplate(id) {
    return this.templates[id] ?? null;
  },

  /** Returns all template records as an array */
  getAllTemplates() {
    return Object.values(this.templates);
  },

  /** Returns a lightweight list of { id, name } for populating dropdowns */
  getTemplateList() {
    return Object.values(this.templates).map(({ id, name }) => ({ id, name }));
  },

});
