# n8n Workflow Setup

## Prerequisites
- Free n8n cloud account (n8n.io)
- Claude API key (console.anthropic.com) — starts with `sk-ant-`
- Google Sheet ID (from google_sheets_setup.md)
- Slack webhook URL (optional — for Tier A alerts)

---

## Step 1 — Create n8n account

1. Go to [n8n.io](https://n8n.io) → click **Get started for free**
2. Sign up with your Google account
3. You will land on the n8n dashboard

---

## Step 2 — Import the workflow

1. Click **+ New Workflow** on the dashboard
2. Click the **⋯** (three dots) menu in the top right
3. Select **Import from JSON**
4. Open `n8n_workflow.json` from this repo, copy all its contents
5. Paste into the import box → click **Import**
6. You should see the full workflow appear with 10 nodes

---

## Step 3 — Connect Google Sheets

1. Click on the **Read Raw Contacts** node
2. Under Credential, click **Create new credential**
3. Click **Sign in with Google** → authorise access
4. Replace `YOUR_GOOGLE_SHEET_ID` with your actual Sheet ID
5. Repeat for **Write to Enriched Sheet** and **Mark Raw Row Done** nodes (same credential, same Sheet ID)

---

## Step 4 — Add Claude API Key (IMPORTANT — do this exactly)

> The previous version used "Header Auth" credentials which caused the error:
> `Header name must be a valid HTTP token ["Header Auth"]`
> The fixed version passes the key directly as a header inside the node — no credentials needed.

1. Click on the **Claude AI — Generate Messages** node
2. Click on the **Headers** section — you will see 3 headers already set:
   - `x-api-key` → `PASTE_YOUR_CLAUDE_API_KEY_HERE`
   - `anthropic-version` → `2023-06-01`
   - `content-type` → `application/json`
3. Click the `x-api-key` value field
4. Delete `PASTE_YOUR_CLAUDE_API_KEY_HERE`
5. Paste your actual Claude API key (starts with `sk-ant-...`)
6. Click **Save** — do NOT create any credential, just paste directly into the field

---

## Step 5 — Add Slack webhook (optional)

1. Go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App → From scratch**
2. Name it `GTM Alerts`, select your workspace
3. Go to **Incoming Webhooks** → toggle ON → **Add New Webhook to Workspace**
4. Choose your `#gtm-leadership` channel → copy the webhook URL
5. In n8n, click the **Slack Alert — Tier A** node
6. Replace `YOUR_SLACK_WEBHOOK_URL` with the URL you copied

---

## Step 6 — Test with one contact

1. Click **Execute Workflow** (play button, top right) to run manually once
2. It will process up to 50 unenriched contacts from the Raw sheet
3. Check your **Enriched** tab in Google Sheets — rows should appear
4. Check Slack for any Tier A alerts

---

## Step 7 — Activate for daily runs

1. Click **Save** (top right)
2. Toggle the **Active** switch ON (top right)
3. Workflow now runs every weekday at 9am automatically
4. All 200 contacts enriched across 4 days (50/day)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Header name must be a valid HTTP token` | Use updated `n8n_workflow.json` — paste API key directly into the `x-api-key` header field, not via credentials |
| Google Sheets 401 error | Re-authenticate the Google Sheets credential |
| Wrong Sheet ID | Copy only the string between `/d/` and `/edit` in your Sheet URL |
| Claude API 401 error | Double-check the key starts with `sk-ant-` and is pasted in the `x-api-key` header field |
| No Slack messages | Verify webhook URL is correct, check that Tier A contacts are in the current batch |
| Workflow not triggering | Check the Active toggle is ON, cron is `0 9 * * 1-5` |
| Duplicate rows in Enriched sheet | Raw sheet `Enriched` column marks YES when done — those rows are skipped |
