# Google Sheets Setup

## Step 1 — Create the spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **Blank spreadsheet**
3. Name it: `TechSparks 2024 GTM`

---

## Step 2 — Set up the Raw tab

1. Click the tab at the bottom named `Sheet1`, rename it to **Raw**
2. Go to **File → Import → Upload**
3. Upload your `TechSparks2024_Enriched_Outreach_List.csv`
4. Select **Replace current sheet** → click **Import data**
5. Add one new column at the end, header: **Enriched** (leave all values blank — n8n writes YES here when done)

Your Raw tab should have these columns:
```
No | Full Name | Title | Company | Category | Sector | City | Email_Verified | 
Email_Confidence | Alternate_Email | Phone_Available | LinkedIn_Profile | 
Company_Website | Company_Size | Funding_Stage | Last_Funding_Amount | 
Total_Funding | GTM_Persona | Outreach_Priority | Personalization_Hook | Tags | Enriched
```

---

## Step 3 — Set up the Enriched tab

1. Click the **+** button at the bottom to add a new tab
2. Rename it to **Enriched**
3. In row 1, add these headers manually:

| Column | Header |
|--------|--------|
| A | Full Name |
| B | Email |
| C | Company |
| D | Title |
| E | Sector |
| F | ICP Score |
| G | Tier |
| H | Route |
| I | Hook |
| J | Pre-Event LinkedIn |
| K | During Event |
| L | Post-Event Email |
| M | Enriched At |

---

## Step 4 — Copy your Sheet ID

Your Sheet ID is the long string in the URL between `/d/` and `/edit`:

```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_IS_HERE/edit#gid=0
```

Copy this ID — you will paste it into n8n in the next step.

---

## Step 5 — Connect to n8n

In **every Google Sheets node** in n8n, replace:
```
YOUR_GOOGLE_SHEET_ID
```
with your actual Sheet ID (the string you copied above).
