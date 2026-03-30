# ⚡ TechSparks 2024 — GTM Automation

AI-powered workflow turning 200 real TechSparks 2024 attendees into a personalized, multi-channel outreach pipeline. Built entirely with free tools.

## What This Does

1. **ICP Scores all 200 contacts** (0–100) using: outreach priority, category signals (Founder/Investor/Speaker), funding stage maturity, email confidence, personalization hook presence
2. **Routes leads** into 3 tiers automatically — 101 Tier A · 65 Tier B · 34 Tier C
3. **Generates AI-personalized outreach** (Claude) for 3 phases per contact, using each person's real personalization hook:
   - 📅 Pre-event LinkedIn connection request
   - 🎯 During-event conversation opener
   - 📬 Post-event follow-up email (with subject line)
4. **n8n daily workflow** automates scoring → routing → message generation → Google Sheets output → Slack alert for Tier A

## Contact Breakdown

| Metric | Count |
|--------|-------|
| Total contacts | 200 |
| Speaker / Founder | 64 |
| Investor | 36 |
| Featured Founder | 18 |
| **Tier A (ICP ≥ 80)** | **101** |
| **Tier B (ICP 55–79)** | **65** |
| **Tier C (ICP < 55)** | **34** |
| High email confidence | ~60% |

## Files

```
techsparks-gtm-2024/
├── TechSparks_GTM_2024.jsx       ← Working prototype (run in Claude.ai Artifacts)
├── contacts_scored_2024.json     ← All 200 contacts with ICP scores + tiers
├── TechSparks2024_Enriched_Outreach_List.csv  ← Original input
└── README_2024.md
```

## ICP Scoring Formula

| Signal | Points |
|--------|--------|
| Outreach Priority = High | +40 |
| Outreach Priority = Medium | +25 |
| Category includes Founder | +20 |
| Category includes Investor | +18 |
| Category includes Speaker | +12 |
| Category includes Featured | +8 |
| Funding: Listed / Late Stage | +14–15 |
| Funding: VC Fund | +13 |
| Funding: Growth / Scale | +10–12 |
| Email Confidence = High | +8 |
| Email Confidence = Medium | +4 |
| Has Personalization Hook | +5 |

**Tier thresholds:** A ≥ 80 · B ≥ 55 · C < 55

## Lead Routing Rules

```
Tier A (ICP ≥ 80) — 101 contacts:
  → Slack alert to #gtm-leadership-queue
  → AE sends personalized email within 24hrs
  → Senior exec sends LinkedIn connection note

Tier B (55–79) — 65 contacts:
  → SDR 3-touch email sequence
    Day 1: Personalized intro (use hook)
    Day 3: Value-add insight relevant to their sector
    Day 7: Soft YC intro offer

Tier C (< 55) — 34 contacts:
  → Monthly newsletter nurture
  → Promoted to Tier B if they engage
```

## Messaging Strategy by Persona

| Persona Group | Angle |
|---------------|-------|
| Unicorn Founders | Data automation + competitive benchmarking at scale |
| VCs / Investors | Portfolio intelligence + market signal generation |
| Policy / Gov | DPI + ecosystem data infrastructure |
| Enterprise CTOs | AI transformation + pricing intelligence |
| D2C / FMCG Founders | Assortment insights + consumer data |

All messages close with:
> *"Once you find this relevant, I'd be happy to introduce you to a YC-backed company that solves exactly this."*

## Tools Used (All Free)

| Tool | Purpose |
|------|---------|
| **Claude API** | AI message generation using real personalization hooks |
| **n8n** (free cloud) | Daily automation workflow |
| **Google Sheets** | Contact database + enriched output store |
| **Slack** | Tier A high-priority alerts |

## Failure Handling

| Scenario | Response |
|----------|---------|
| Missing personalization hook (1 contact) | Falls back to title + company for context |
| Low email confidence | Flag for manual verification before send |
| Duplicate names | Match on Email_Verified as primary key |
| AI message too generic | Regenerate — Claude uses hook for specificity |
| Scale to 2,000 | n8n batch 50/day + OpenRouter free models |

## What We Did NOT Automate

- **LinkedIn sending** — copy from prototype, paste manually (30s/contact)
- **Email delivery** — Gmail for Tier A, Brevo for Tier B bulk
- **Re-enrichment** — CSV already has verified emails, funding data, hooks
- **Auto-send** — human review before every send = hallucination safeguard

---
*Assignment: AI / GTM Automation Exercise — TechSparks 2024*
