# CLAUDE.md — AI Instruction File
# Project 4: Pedagogical Report Generator

> This file is automatically loaded by Claude Code at the start of every conversation.
> Before performing any task, read this entire file. Every decision must comply with the rules below.

---

## 1. PROJECT IDENTITY

- **Project Name:** Pedagogical Report Generator (Project 4 of 6)
- **Purpose:** Demo only — show the process of filling a questionnaire, uploading a PDF (simulation), and receiving a report draft for 5 templates.
- **Language:** Hebrew (RTL)
- **Audience:** Educational staff (teachers, counselors)

### What is NOT built in this demo:
- ❌ Real PDF parsing
- ❌ Sending to server or saving data
- ❌ Authentication (no Auth0 or any login)

---

## 2. TECH STACK

- **HTML5** — single `index.html` file
- **CSS3** — `style.css` (no CSS framework)
- **Vanilla JavaScript** — `app.js` (no framework, no npm, no build step)
- **Google Fonts** — Heebo (imported in HTML `<head>`)
- **No dependencies** — open `index.html` directly in browser

---

## 3. FILE STRUCTURE

```
index.html    — Full app UI (3-step stepper)
style.css     — Design system styles
app.js        — All JavaScript logic
CLAUDE.md     — This file
```

---

## 4. DESIGN SYSTEM

### Color Palette

| Token           | HEX       | Usage                              |
|-----------------|-----------|------------------------------------|
| Primary Dark    | #0D1B2A   | Header, sidebar, main buttons      |
| Primary         | #1B2A3B   | Panels, card backgrounds           |
| Primary Light   | #2E4057   | Hover states, borders              |
| Background      | #F4F6F8   | General page background            |
| Surface         | #FFFFFF   | Card and content background        |
| Success         | #2E7D32   | Low risk, positive KPI             |
| Warning         | #E65100   | Medium risk, warning               |
| Danger          | #C62828   | High risk, negative                |
| Info            | #1565C0   | Messages, tooltips                 |
| Text Primary    | #0D1B2A   | Main text, headings                |
| Text Secondary  | #4A5568   | Descriptions                       |
| Text Disabled   | #A0AEC0   | Placeholder, disabled              |
| Text On Dark    | #FFFFFF   | Text on dark backgrounds           |

### Typography

Font: `Heebo` from Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;900&display=swap" rel="stylesheet">
```

| Name    | Size  | Weight | Usage               |
|---------|-------|--------|---------------------|
| Display | 32px  | 900    | Main page title     |
| H1      | 24px  | 700    | Screen titles       |
| H2      | 20px  | 700    | Section titles      |
| H3      | 16px  | 500    | Card titles         |
| Body    | 14px  | 400    | Regular text        |
| Small   | 12px  | 400    | Labels and notes    |

`font-family: 'Heebo', sans-serif;`

### Spacing Scale

| Name | Value | Usage                  |
|------|-------|------------------------|
| xs   | 4px   | Small inner spacing    |
| sm   | 8px   | Between elements       |
| md   | 16px  | Card padding           |
| lg   | 24px  | Section spacing        |
| xl   | 40px  | Large area spacing     |

### Layout

- Max width: **1280px**, centered
- Page padding: **24px**
- Grid: 1 col mobile / 2 col tablet / 3 col desktop

### Components

#### Header (same across all 6 projects)
- Right side: Logo + System Name
- Left side: User Name + Role
- Background: `#0D1B2A`
- Text: `#FFFFFF`

#### Card
```css
background: #FFFFFF;
border: 1px solid #E2E8F0;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(13,27,42,0.08);
padding: 20px;
```
Hover:
```css
box-shadow: 0 4px 16px rgba(13,27,42,0.14);
```

#### Primary Button
```css
background: #0D1B2A;
height: 64px;
color: #FFFFFF;
font-family: Heebo;
font-weight: 700;
font-size: 18px;
padding: 0 24px;
```

#### Secondary Button
```css
background: #0D1B2A;
color: #FFFFFF;
font-weight: 500;
font-size: 14px;
border-radius: 8px;
padding: 10px 20px;
```
Hover: `background: #1B2A3B`

#### Status Badge
```css
border-radius: 20px;
padding: 4px 12px;
font-size: 12px;
font-weight: 500;
```
| Status  | Background | Text    |
|---------|------------|---------|
| Success | #E8F5E9    | #2E7D32 |
| Warning | #FFF3E0    | #E65100 |
| Danger  | #FFEBEE    | #C62828 |

#### AI Insights Box
```css
background: #F0F4F8;
border-right: 4px solid #0D1B2A;  /* RTL — use border-right */
border-radius: 8px;
padding: 16px 20px;
```
Title: 14px Heebo 700, color #0D1B2A
Content: 14px Heebo 400, color #4A5568

---

## 5. RTL RULES (MANDATORY)

Every HTML file must have:
```html
<html dir="rtl" lang="he">
```

CSS defaults:
```css
body {
  direction: rtl;
  text-align: right;
  font-family: 'Heebo', sans-serif;
}
```

- Use `border-right` (not `border-left`) for highlight/accent borders
- Flexbox: `flex-direction: row` — browser flips automatically for RTL
- Directional icons (→ ←) must be mirrored for RTL
- Use logical CSS properties or explicitly set for RTL context

---

## 6. SCREEN FLOW (3-STEP STEPPER)

### Step 1 — Select Template and Fill Questionnaire
- Dropdown to select one of 5 templates (A–E)
- Selecting a template changes both the questionnaire fields AND the draft preview
- A "Continue to Step 2 →" button

### Step 2 — Upload PDF and Edit Draft
- Optional PDF upload button (simulation only — no real parsing)
- After upload simulation: show Teacher Narrative text box with pre-filled AI text
- Large editable textarea showing the draft report (pre-filled based on selected template)
- "Continue to Approval →" button

### Step 3 — Export and Approval
- ✅ Success icon
- Text: "הדו"ח נוצר בהצלחה. זכור — עליך לעיין בדו"ח ולאשר את תוכנו לפני שליחה."
- Export buttons:
  - "העתק טקסט" (Copy Text) — copies draft to clipboard
  - "ייצא כקובץ Word" (Export as Word File) — simulation only
- "צור דו"ח חדש" (Create New Report) button — resets to Step 1

---

## 7. TEMPLATES (Mock Data)

### Template A — מכתב עדכון להורים (Parent Update Letter)

**Questionnaire fields:**
| Field | Value |
|-------|-------|
| שם תלמיד | יוסף מזרחי |
| כיתה | ח-1 |
| נקודות חוזק | מעורבות גבוהה בספורט ואומנות, קשרים חברתיים טובים |
| אתגרים | קשיי קשב בשיעורים תיאורטיים, איחורים בהגשת מטלות |
| פעולות שננקטו | שיחה עם יועצת, פגישת הורים ב-10.6.2025 |
| המלצות | מעקב שבועי, תמיכה בשיעורי בית |

**Draft output:**
```
מכתב עדכון להורים — יוסף מזרחי, כיתה ח-1.
יוסף מפגין מעורבות גבוהה בתחומי הספורט והאומנות וקשרים חברתיים טובים עם בני כיתתו. עם זאת, קיימים קשיי קשב בשיעורים תיאורטיים ואיחורים בהגשת מטלות. קיימנו שיחה עם היועצת ופגישת הורים ב-10.6.2025. אנו ממליצים על מעקב שבועי ותמיכה בשיעורי הבית.
בברכה,
[שם המורה]
```

---

### Template B — סיכום פדגוגי פנימי (Internal Pedagogical Summary)

**Questionnaire fields:**
| Field | Value |
|-------|-------|
| שם תלמיד | נועה ביטון |
| כיתה | ט-2 |
| תיאור מצב | קשיים בהבנת החומר בעברית ובמתמטיקה, רמת מוטיבציה נמוכה |
| פעולות שננקטו | פגישת הורים, הפניה לשיעורי חיזוק |
| המלצה הבאה | בחינת זכאות לתמיכה נוספת |
| גורמים מעורבים | מורה מקצועית, יועצת חינוכית |

**Draft output:**
```
סיכום פדגוגי פנימי — נועה ביטון, כיתה ט-2.
נועה חווה קשיים בהבנת החומר בעברית ובמתמטיקה ומפגינה רמת מוטיבציה נמוכה. נערכה פגישת הורים והיא הופנתה לשיעורי חיזוק. מומלץ לבחון זכאות לתמיכה נוספת. מסמך זה מיועד לשימוש פנימי בלבד.
```

---

### Template C — הפניה ליועץ (Referral to Counselor)

**Questionnaire fields:**
| Field | Value |
|-------|-------|
| שם תלמיד | אדם פרץ |
| כיתה | ח-2 |
| סיבת הפניה | שינוי התנהגותי פתאומי, נסיגה חברתית, קשיי שינה לפי דיווח הורים |
| דחיפות | גבוהה |
| פעולות קודמות | שיחה עם מחנך בלבד |

**Draft output:**
```
הפניה ליועץ החינוכי — אדם פרץ, כיתה ח-2.
מופנה לטיפול דחוף עקב שינוי התנהגותי פתאומי הכולל נסיגה חברתית וקשיי שינה לפי דיווח ההורים. עד כה התקיימה שיחה עם המחנך בלבד. נדרש מעקב מקצועי בהקדם האפשרי.
```

---

### Template D — מכתב הצטיינות (Excellence Letter)

**Questionnaire fields:**
| Field | Value |
|-------|-------|
| שם תלמיד | שירה גולן |
| כיתה | ח-2 |
| הישגים | ממוצע ציונים 95, השתתפות פעילה, ייצגה את הכיתה בתחרות מדע |
| תכונות בולטות | אחריות, מנהיגות, סיוע לחברים |

**Draft output:**
```
משפחת גולן היקרה,
אנו שמחים לציין את הישגיה המרשימים של שירה במהלך הסמסטר הנוכחי. לשירה ממוצע ציונים של 95, נוכחות מלאה, וייצגה את כיתתה בתחרות מדע בית-ספרית. אנו גאים בה ומעודדים אותה להמשיך בדרך זו.

בברכה,
[שם המורה]
```

---

### Template E — תוכנית התערבות התנהגותית (BIP)

**Questionnaire fields:**
| Field | Value |
|-------|-------|
| שם תלמיד | משה כהן |
| כיתה | ח-1 |
| תיאור ההתנהגות | הפרעות חוזרות בכיתה, קונפליקטים עם תלמידים אחרים |
| טריגרים שזוהו | שיעורי מתמטיקה, שעות אחר הצהריים |
| מטרות | הפחתת אירועי ההפרעה ב-50% תוך חודש |
| אסטרטגיות | ישיבה בחזית, הפסקות קצרות, חיזוק חיובי |
| גורמים מעורבים | מחנך, יועץ, הורים |

**Draft output:**
```
תוכנית התערבות התנהגותית — משה כהן, כיתה ח-1.
זוהו הפרעות חוזרות בכיתה, בעיקר בשיעורי מתמטיקה. מטרת התוכנית היא הפחתת אירועי ההפרעה ב-50% תוך חודש. האסטרטגיות כוללות שינוי מיקום הישיבה, הפסקות קצרות וחיזוק חיובי.
גורמים מעורבים: מחנך, יועץ והורים.
```

---

## 8. PDF UPLOAD SIMULATION

When the user clicks "Upload PDF Document", show this pre-filled text in the "Teacher Narrative" box:

```
מתוך הדוח שהועלה: יוסף הראה שיפור בציוני עברית (מ-65 ל-74) בסמסטר האחרון. עם זאת, נרשמו 4 היעדרויות במאי. המורים מציינים פוטנציאל גבוה שטרם מומש במלואו.
```

---

## 9. PRE-SUBMISSION CHECKLIST

Before declaring any work complete, verify all of the following:

- [ ] Heebo font is imported and active (`<link>` tag in `<head>`)
- [ ] Header and main buttons use **Primary Dark #0D1B2A**
- [ ] All cards have `border-radius: 12px` and correct `box-shadow`
- [ ] Status badges use only the defined color tokens
- [ ] `dir="rtl"` is defined at the **root `<html>` level**
- [ ] `lang="he"` is defined at the **root `<html>` level**
- [ ] Charts (if any) use the unified color palette
- [ ] Header is identical in structure to the other projects in the system
- [ ] No real server calls, no auth, no real PDF parsing
- [ ] All 5 templates render correctly from the dropdown
- [ ] AI Insights Box uses `border-right` (not `border-left`)

---

## 10. NOTES FOR AI

- This is a **demo** — prefer visual completeness over technical depth
- Every text string in the UI must be in **Hebrew**
- The app must work by simply opening `index.html` in a browser — no server needed
- When in doubt about a design decision, follow the design system exactly
- Do not add features beyond what is specified in this file
