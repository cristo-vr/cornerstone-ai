# Cornerstone Website Repositioning — FSP Operations Accelerator

## Context

Cornerstone is repositioning from targeting **founder-led agencies** (general automation services) to targeting **mid-size FSP owners/managing directors** (10-50 advisors) with a structured operational automation offer called the **FSP Operations Accelerator**. The core framework automates three pillars: Acquisition, Service & Retention, and Visibility.

The visual branding (dark theme, gold accent, Inter font, Framer Motion animations, layout patterns) stays **completely unchanged**. This is purely a copy and content repositioning.

**Key decisions:**
- Market: Global/industry-generic (no country-specific regulatory references like POPIA/FAIS)
- Case studies: Keep existing 6 case studies as-is
- Brand name: Keep "Cornerstone AI"

**Reference document:** See `Operating Accelerator.md` in this same folder for the full internal offer playbook. That document is context only — it should NOT be reproduced verbatim on the website.

---

## Files to Modify (13 files)

| File | Change Type |
|------|------------|
| `app/layout.tsx` | Metadata only |
| `components/layout/Navbar.tsx` | Nav link labels + CTA text |
| `components/sections/Hero.tsx` | Full copy replacement |
| `components/sections/Problem.tsx` | Full copy replacement |
| `components/sections/GrowthSimulator.tsx` | Reframe metrics + copy for FSP context |
| `components/sections/Solution.tsx` | Expand from 2 tabs → 3 pillars + all new copy |
| `components/sections/Process.tsx` | New phase content aligned to Discovery/Development/Adoption |
| `components/sections/ContactSection.tsx` | Headline + subtitle |
| `components/ui/ContactForm.tsx` | FSP-relevant fields + labels |
| `components/ui/ContactModal.tsx` | Headline + subtitle |
| `components/sections/Work.tsx` | Section title + subtitle only (case studies stay) |
| `components/sections/Footer.tsx` | Brand statement + nav links + copyright year |
| `app/page.tsx` | No structural changes needed (section order stays) |

**Files with zero changes:** `globals.css`, `tailwind.config.ts`, `Button.tsx`, `types.ts`, `next.config.ts`, `package.json`

---

## Section-by-Section Changes

### 1. Metadata — `app/layout.tsx`

```
title: "Cornerstone AI | FSP Operations Accelerator"
description: "We automate the three operational pillars every insurance FSP runs on — Acquisition, Service & Retention, and Visibility. Built for FSPs with 10-50 advisors."
```

---

### 2. Navbar — `components/layout/Navbar.tsx`

**Nav links change:**
| Current | New |
|---------|-----|
| Method → `#method` | Pillars → `#pillars` |
| Process → `#process` | Process → `#process` (no change) |
| Work → `#work` | Results → `#results` |

**CTA button:** "Inquire" → "Book Discovery"
**Mobile CTA:** "Inquire →" → "Book Discovery →"
**Logo:** stays "CORNERSTONE"

---

### 3. Hero — `components/sections/Hero.tsx`

All copy replaced. Layout/animations identical.

| Element | Current | New |
|---------|---------|-----|
| Tagline | "We engineer capacity for founder-led agencies" | "The FSP Operations Accelerator" |
| H1 line 1 | "HANDLE 2x THE RETAINERS." | "RUN 50 ADVISORS." |
| H1 line 2 | "WITH THE SAME TEAM." | "LIKE YOU RUN 10." |
| Gradient text | "THAT'S CAPACITY." | "THAT'S LEVERAGE." |
| Subtext | "No more theoreticals. Straightforward strategy, Tangible impact." | "Your FSP has outgrown spreadsheets." + muted: "We build the operational backbone to match your ambition." |
| CTA | "See If We Can Help" | "Book Your Discovery" |

---

### 4. Problem — `components/sections/Problem.tsx`

Reframed from "The Capacity Ceiling" (agency scaling dilemma) to "The Operations Trap" (FSP operational pain).

**Section title:** "The `Capacity Ceiling`" → "The `Operations Trap`" (red highlight stays)

**Intro paragraph:**
> Current: "You are running a founder-led agency. You have the vision, and the clients who love you. But your operations are fragile."
>
> New: "You built an FSP that wins business. Your advisors are good. Your clients trust you. **But behind the scenes, it's held together with spreadsheets and willpower.**"

**Dilemma bridge line (NEW — add between intro and cards):**

Add a new line/element between the intro paragraph and the two cards that explicitly frames them as the only two options the FSP owner currently has. This makes it immediately clear the cards are a lose-lose dilemma, not outcomes:

> "Right now, you're stuck with two options — and neither one works:"

This should be styled as a distinct text element (e.g. `text-foreground font-medium text-lg mt-8 mb-6`) to visually separate the problem setup from the dilemma cards below. It acts as a bridge that says "here are your choices" so the reader understands the cards are Option A and Option B.

**Card 1 (Option A):**
| | Current | New |
|--|---------|-----|
| Title | "Sell More" | "Grow the Book" |
| Subtitle | *(none)* | Add small "Option A" label above the title in muted mono text |
| Body | Agency burnout framing | "Sign more clients and your admin team drowns. Policies slip through the cracks, onboarding backs up, and your best advisors spend half their day chasing paperwork instead of writing business." |
| Hover label | "Burnout Risk" | "Compliance Risk" |

**Card 2 (Option B):**
| | Current | New |
|--|---------|-----|
| Title | "Hire More" | "Hire More Admin" |
| Subtitle | *(none)* | Add small "Option B" label above the title in muted mono text |
| Body | Agency margin framing | "Throw bodies at the problem and your margins vanish. You end up managing people who manage spreadsheets. The data is still fragmented — just spread across more desks." |
| Hover label | "Margin Compression" | "Margin Erosion" |

**Symptom box:**
> Current: "You find yourself 'throttling' your own growth..."
>
> New: "You find yourself *capping* your advisor count. You stop recruiting because onboarding one more person might break what barely works."

**Reality box (bridge to Growth Simulator):**
> Current: "You don't need more talent yet. You need Capacity."
>
> New: "You don't need more admin staff. **You need operational infrastructure.** See what that looks like below."

The "See what that looks like below" line connects the Problem section to the Growth Simulator that follows immediately after, framing it as the third option / the way out.

Icons stay: `Users`, `TrendingDown`, `AlertTriangle`, `Zap`

---

### 5. Growth Simulator — `components/sections/GrowthSimulator.tsx`

Reframed from agency clients → FSP advisors. Same interactive concept and layout.

**Copy changes:**
| Element | Current | New |
|---------|---------|-----|
| Title | "The **Leverage** Game" | "The **Scaling** Reality" |
| Description | "scale with Capacity vs. Bodies" / "agencies break because revenue tracks linearly with headcount" | "grow your FSP with systems vs. spreadsheets" / "Most FSPs break because every new advisor adds admin load that scales linearly. **Operational infrastructure breaks that equation.**" |
| Add button | "Sign New Client (Try Me)" | "Onboard New Advisor (Try Me)" |
| FAB button | "Sign Client" | "Add Advisor" |
| Top card title | "Standard Agency" | "Spreadsheet FSP" |
| Top card tag | "Linear Scaling" | "Manual Scaling" |
| Bottom card title | "Cornerstone Model" | "Cornerstone FSP" |
| Bottom card tag | "Operational Leverage" | "Systems-Driven" |

**Metric reframe:**

| Metric | Current (Agency) | New (FSP) |
|--------|-----------------|-----------|
| Row 1 | Team Size (circle icons) | Admin Headcount (circle icons) |
| Row 2 | Profit Margin (bar) | Data Integrity (bar) |
| Row 3 | Stress (bar) | Owner Hours on Ops (bar) |

**New simulation logic:**
```ts
const calculateMetrics = (isCornerstone: boolean) => {
  const adminStaff = isCornerstone
    ? 1
    : Math.ceil(advisors / 4) + 1;
  const dataIntegrity = isCornerstone
    ? Math.min(85 + (advisors * 1), 99)
    : Math.max(80 - (advisors * 4), 15);
  const ownerHoursOnOps = isCornerstone
    ? Math.min(10 + (advisors * 0.5), 15)
    : Math.min(10 + (advisors * 3), 60);
  return { adminStaff, dataIntegrity, ownerHoursOnOps };
};
```

**Metric labels for Spreadsheet FSP:**
- Admin Headcount: circles (neutral), label "Admin Headcount"
- Data Integrity: bar, sub-label "Degrading"
- Owner Hours on Ops: bar with stress gradient, label "Owner Hours on Ops/wk"

**Metric labels for Cornerstone FSP:**
- Admin Headcount: circles (primary), automation badge: "+ Automated Workflows"
- Data Integrity: bar, sub-label "Locked In" (primary color)
- Owner Hours on Ops: bar (primary/40), stays flat

**Variable renames:** `clients` → `advisors`, `maxClients` → `maxAdvisors`, `addClient` → `addAdvisor`, `standard` → `spreadsheet`, `cornerstone` → stays

---

### 6. Solution → Pillars — `components/sections/Solution.tsx`

**Most significant structural change.** Expands from 2 scroll-spy tabs to 3 (the three pillars).

**Section id:** `"method"` → `"pillars"`

**Main headline:**
> Current: "The best automation in the world is worthless if your team hates using it."
>
> New: "Every FSP runs on three pillars. **We automate all three.**"

**Left sticky tabs (3 instead of 2):**

| Tab | Title | Subtitle |
|-----|-------|----------|
| 1 | Acquisition | Getting Clients |
| 2 | Service & Retention | Keeping Clients |
| 3 | Visibility | Knowing Everything |

Add a third connector line and tab indicator following the existing pattern. Scroll spy logic adds a third section check:
```ts
if (rect3.top < window.innerHeight / 2) setActiveTab(2);
else if (rect2.top < window.innerHeight / 2) setActiveTab(1);
else setActiveTab(0);
```

**Right column content blocks:**

**Pillar 1 — Acquisition** (`id="solution-tab-1"`)
- Badge: "Pillar 01" (gold — bg-primary/10 text-primary)
- H3: "New business without the bottleneck."
- Body: "Your advisors should be advising, not chasing paperwork. We build the systems that capture leads, qualify prospects, and route them to the right advisor — automatically. **From first enquiry to signed mandate, every step is tracked.**"
- Two feature cards (grid-cols-2):
  - Card 1: `UserPlus` icon → "Lead Capture & Routing"
  - Card 2: `FileCheck` icon → "Pipeline Automation"

**Pillar 2 — Service & Retention** (`id="solution-tab-2"`)
- Badge: "Pillar 02" (blue — bg-blue-500/10 text-blue-400)
- H3: "Clients stay because the experience is effortless."
- Body: "Policy renewals, claims follow-ups, annual reviews. The work that keeps an FSP alive is repetitive and exact — the perfect candidate for automation. **Your team focuses on the relationship. The system handles the rhythm.**"
- Feature card (single, like current "Verified Architecture"):
  - `RefreshCw` icon → "Retention Engine" / "Renewals. Reviews. Follow-ups. On autopilot."

**Pillar 3 — Visibility** (`id="solution-tab-3"`) — NEW
- Badge: "Pillar 03" (emerald — bg-emerald-500/10 text-emerald-400)
- H3: "You can't manage what you can't measure."
- Body: "How many policies lapsed this month? Which advisor hasn't followed up on their pipeline? Most FSP owners can't answer without digging through five systems. **We give you a single source of truth. Real-time. No digging.**"
- Feature card (single):
  - `BarChart3` icon → "Operations Dashboard" / "One screen. Every metric. Updated live."

**Footer statement:**
> Current: "If your team doesn't feel relief the day we launch, we failed."
>
> New: "We stay until your team prefers the new way. **That's when we know it works.**"

**New imports needed:** `UserPlus`, `FileCheck`, `RefreshCw`, `BarChart3` (replacing `Heart`, `Cpu`; keep `Zap` for potential reuse or remove if unused)

---

### 7. Process — `components/sections/Process.tsx`

Copy rewrite to align with Discovery → Development → Adoption phases.

**Section headline:**
> Current: "Zero Fluff. Maximum Velocity."
>
> New: "Zero Disruption. **Maximum Adoption.**"

**Subtitle:**
> Current: "No 200-slide presentations. Just deployed code and measurable efficiency gains."
>
> New: "Your team keeps working. We build around them. Systems go live one at a time."

**Phase 01:**
- Title: "The Blueprint" → "Discovery"
- Duration: "In and Out. 5 Days." → "5 Days. In and Out."
- Body: "We embed with your team for one week. We map every process across Acquisition, Service, and Visibility — where the hours disappear, where data leaks, where the bottlenecks hide. You get a concrete execution plan: what we'll build, in what order, and the exact hours your team will recover. **You see the full picture before you spend a cent on the build.**"

**Phase 02:**
- Title: "The Build" → "Development"
- Duration: "We Build It" → "6 Weeks. Stacked Live."
- Body: "We build your systems one pillar at a time. Each module goes live the moment it's ready — your team starts using it immediately. No six-month 'big bang' launch. No surprises. **Every system is yours. Built on your existing tools. Nothing rented.**"

**Phase 03:**
- Title: "The Handover" → "Adoption"
- Duration: "Adoption is the Only Metric" → "Until It Sticks."
- Body: "The best system is worthless if your team opens the spreadsheet out of habit. We train every user, handle the edge cases, and stay until the new way is the default way. **We measure adoption, not delivery. If your team isn't using it confidently, we're not done.**"

---

### 8. Contact Section — `components/sections/ContactSection.tsx`

**H2:** "Unlock Your Capacity" → "Start Your **Discovery**" (Discovery in primary color)

**Subtitle:**
> Current: "Fill out the form below. We'll analyze your current setup and identify exactly where automation can unlock more capacity."
>
> New: "Tell us about your FSP. We'll identify where your operations are leaking time and show you exactly how to fix it."

---

### 9. Contact Form — `components/ui/ContactForm.tsx`

**Field changes:**

| Row | Current | New |
|-----|---------|-----|
| 1 | Full Name + Role | Full Name + Role (placeholder: "Owner / Managing Director") |
| 2 | Email + Phone | Email + Phone (no change) |
| 3 | Business Name + Website | **FSP Name** + Website |
| 4 | Team Size + Revenue | **Number of Advisors** + **Admin / Support Staff** |
| 5 | Limiting Processes | **Biggest operational pain point** |
| 6 | Anything Else | Anything Else (no change) |

**Form state:**
```ts
{
  fullName: '',
  role: '',
  email: '',
  phone: '',
  fspName: '',        // was businessName
  website: '',
  advisorCount: '10-20',  // was teamSize
  adminCount: '1-2',      // was revenue
  biggestPain: '',         // was limitingProcesses
  anythingElse: ''
}
```

**Advisor Count options:** "Under 10", "10-20", "20-35", "35-50", "50+"
**Admin Staff options:** "1-2", "3-5", "6-10", "10+"

**Labels:**
- "Business Name *" → "FSP Name *"
- Placeholder: "Acme Corp" → "Your FSP Name"
- "How big is your team currently?" → "Number of Advisors *"
- "What is your monthly revenue?" → "Admin / Support Staff *"
- "Describe some processes that you feel are limiting capacity:" → "What is your biggest operational headache right now? *"
- Placeholder: "e.g. Manual data entry, repetitive reporting, client onboarding..." → "e.g. Policy renewals are manual, lead data sits in multiple systems, no visibility on advisor pipeline..."

**Submit button:** "Submit Application" → "Request Discovery"
**Submitting text:** "Submitting..." (no change)

**Success state:**
- H3: "Application Received" → "Discovery Request Received"
- P: "...get back to you within 24 hours." → "We'll review your FSP details and respond within 24 hours to schedule your Discovery week."

> **Note:** The Make.com webhook payload shape will change (different field keys). The webhook automation will need updating separately to handle the new field names.

---

### 10. Contact Modal — `components/ui/ContactModal.tsx`

- H2: "Unlock Your Capacity" → "Book Your Discovery"
- P: "Tell us about your operations. We'll identify where you can scale." → "Tell us about your FSP. We'll identify where your operations are leaking time and show you the fix."

---

### 11. Work/Results — `components/sections/Work.tsx`

**Section id:** `"work"` → `"results"`

**Title:** "Selected Works" → "Proven Results"

**Subtitle:**
> Current: "Real problems. Engineered solutions. Measurable wins. Click on any card to see the breakdown of how we solved it."
>
> New: "Real operations. Engineered solutions. Measurable wins. Click any card to see the full breakdown."

**Case studies:** Keep all 6 existing case studies exactly as they are.

**Modal CTA button:** "Reach Out" → "Book Discovery"

---

### 12. Footer — `components/sections/Footer.tsx`

**Brand statement:**
> Current: "Building the foundation for the next generation of enterprise. We turn chaos into structure through intelligent automation."
>
> New: "The operational backbone for growing FSPs. We automate Acquisition, Service, and Visibility so your team can focus on the business."

**CTA button:** "Start The Conversation" → "Book Your Discovery"

**Sitemap links:**
| Current | New |
|---------|-----|
| Home → # | Home → # |
| Methodology → #method | Pillars → #pillars |
| Case Studies → #work | Results → #results |
| Process → #process | Process → #process |

**Copyright:** "© 2024 Cornerstone AI" → "© 2026 Cornerstone AI"

---

## Implementation Sequence

**Phase 1 — Foundation (no visual impact)**
1. `app/layout.tsx` — metadata
2. `components/layout/Navbar.tsx` — nav links + CTA
3. `components/sections/Footer.tsx` — brand statement + links + copyright

**Phase 2 — Above the fold**
4. `components/sections/Hero.tsx` — full copy replacement
5. `components/sections/Problem.tsx` — full copy replacement

**Phase 3 — Interactive section**
6. `components/sections/GrowthSimulator.tsx` — reframe metrics, rename variables, new simulation logic, new copy

**Phase 4 — Core framework (most complex)**
7. `components/sections/Solution.tsx` — expand to 3 pillars, add third tab + scroll spy section, new icons, all new copy

**Phase 5 — Process & contact**
8. `components/sections/Process.tsx` — new phase content
9. `components/ui/ContactForm.tsx` — new form fields + state
10. `components/sections/ContactSection.tsx` — new headline
11. `components/ui/ContactModal.tsx` — new headline

**Phase 6 — Results section**
12. `components/sections/Work.tsx` — section id, title, subtitle, modal CTA only

---

## Risk Areas

1. **Solution.tsx 3-tab expansion** — Most complex change. Adding a third scroll-spy section needs careful scroll position tuning so all three tabs activate correctly. The sticky left panel needs to fit three tabs without feeling cramped.

2. **GrowthSimulator metric refactoring** — The simulation logic changes entirely (new formulas, new variable names, new metric types). The visual bars and team-size circles render different data. Mobile FAB scroll detection should not be touched.

3. **ContactForm payload shape change** — The webhook URL stays the same but field keys change (`fspName`, `advisorCount`, `adminCount`, `biggestPain` instead of `businessName`, `teamSize`, `revenue`, `limitingProcesses`). The Make.com webhook will need separate updating to handle new keys.

4. **Section ID changes** — `#method` → `#pillars` and `#work` → `#results`. All internal links (Navbar, Footer, any anchor references) must update in tandem.

5. **New icon imports** — `UserPlus`, `FileCheck`, `RefreshCw`, `BarChart3` needed in Solution.tsx. These are standard lucide-react icons and should be available in the installed version.

---

## Verification

After implementation, verify by:
1. `npm run build` — confirm static export builds without errors
2. `npm run dev` — visual check of every section in browser
3. Test all anchor links (#pillars, #process, #results) navigate to correct sections
4. Test Growth Simulator: click "Onboard New Advisor" repeatedly to max, verify both panels update correctly, test Reset, test mobile FAB behavior
5. Test Solution scroll spy: scroll through all three pillars and verify left tabs highlight correctly
6. Test contact form submission (both inline and modal): verify all new fields render, required validation works, Turnstile loads, submission succeeds
7. Test mobile responsive layout on all sections (especially the 3-tab Solution section)
8. Verify no hardcoded agency-specific language remains (search for "agency", "retainer", "founder-led")
