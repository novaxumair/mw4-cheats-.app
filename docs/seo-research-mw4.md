# MW4 Cheat — SERP & outreach research (handoff)

Research was done with web search for clusters such as “MW4 cheats PC”, “Modern Warfare 4 aimbot”, “RICOCHET MW4”. Use this as positioning and outreach planning—not as copied on-page copy.

## Competitors & SERP landscape

| Domain / surface | Content type | Takeaway |
| ---------------- | ------------ | -------- |
| [cheatsmw4.net](https://cheatsmw4.net/) | Commercial cheat marketing + forum-style Q&A | Feature-heavy landing pages; competes on module lists and loader/setup messaging. |
| [modernwarfarecheats.com](https://modernwarfarecheats.com/) | Commercial MW cheat hub + forum archive | Broad SKU coverage (loader, spoofer, cosmetics); status/loader narrative is prominent. |
| [reddit.com/r/mw4](https://www.reddit.com/r/mw4/) | Community discussion (mixed MW era) | High engagement on anti-cheat and “hackers on PC” threads; good for *awareness* and Reddit-specific content, not for direct commercial mirroring. |
| YouTube / Twitch | Video reviews & ban stories | “Patch day” and “banned?” queries often land here; supporting video or transcript-style blog posts can earn informational traffic. |
| Generic FPS cheat forums | Threads + vendor lists | Often thin or spammy; prefer **editorial** depth (RICOhet, HWID, honest risk) over keyword stuffing. |

**Reference structure (no prose copying):** [aion2cheats.org](https://aion2cheats.org/) is a useful structural example—clear hub, product cards, and blog silos—adapt topics to MW4/PC tactical FPS.

## Keyword clusters & URL mapping

Primary keyword focus is **one per URL** to limit cannibalization. Secondary terms support context in headings and internal links.

| URL path | Primary keyword | Secondary / supporting terms |
| -------- | --------------- | ----------------------------- |
| `/` | mw4 cheats pc | modern warfare 4 cheats, private suite, ricochet |
| `/products/mw4-cheats/` | mw4 cheat products | four products, checkout, hwid spoofer |
| `/products/mw4-cheats/mw4-private-suite/` | mw4 private cheat | aimbot mw4, esp mw4, loader |
| `/products/mw4-cheats/hwid-spoofer/` | mw4 hwid spoofer | hardware ban, hwid reset |
| `/products/mw4-cheats/game-accounts/` | mw4 game accounts | account workspace, ugc |
| `/products/mw4-cheats/skin-changer/` | mw4 skin changer | camo unlock, gunsmith preview |
| `/blog/` | mw4 cheat guides | setup, patch, features |
| `/faq/` | mw4 cheat faq | enforcement, checkout, loader |
| `/forum/` | mw4 forum | q&a, guides (informational) |

Blog posts in `src/data/blog/posts.ts` each target a distinct slug (35 articles) with tags (Guides, Setup, Features, Updates, Troubleshooting, Safety) to separate informational vs transactional intent.

## Backlink prospects (spreadsheet-style)

| Site / property | URL (type) | Category | Relevance | Suggested angle | Destination URL | Anchor concept |
| --------------- | ---------- | -------- | --------- | ----------------- | --------------- | -------------- |
| r/mw4 | reddit.com/r/mw4 (community) | Community | Medium | Comment or post linking *patch safety* guide | `/blog/` or specific post | “RICOCHET patch checklist” |
| Tactical FPS YouTube channel | (search: MW4 PC setup) | Video | High if aligned | Offer guest script on loader/OS prep | `/faq/` or blog loader post | “PC setup before third-party tools” |
| Indie gaming blog | contact form | Editorial | Medium | Guest post on **honest** risk/disclosure | `/about/` | “What mw4cheat.app publishes” |
| PC hardware forum | GPU/driver threads | Tech | Medium | Sidebar or signature after contributing | `/blog/` hardware post | “Driver stability for MW4” |
| Discord / community (non-spam) | invite-only servers | Community | Variable | Share *one* deep guide if rules allow | Specific blog slug | Natural mention |

Exclude obvious PBNs, comment spam, and bulk directory dumps.

## Follow-up outreach (non-responders)

Use after one week with no reply:

> Subject: Following up — MW4 PC guide for [Site name]
>
> Hi [Name],
>
> I reached out last week about a short tactical-FPS piece on patch-day preparation and RICOCHET context for PC players. If timing was bad, no worries—happy to send a one-page outline instead of a full draft.
>
> Either way, thanks for the work you put into [specific post or channel topic].
>
> Best,  
> [Your name]

---

*Last updated: deployment handoff for mw4cheat.app.*
