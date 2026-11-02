/* The /advisors demo. Made-up clients only: nothing here comes from a client system.
   Copied from Marketing/Advisor Funnel/vsl-deck (data.js + app.js), with onRender and onAction hooks. */
/* Dummy data only. Every person and firm here is invented; nothing comes from a client system. */
const CONFIG = {
  firm: "Cornerstone",
  discoveryCap: 4,          // practices a month, shown on the CTA. Set to your real capacity.
  discoveryHours: "about 5 hours",
  anchorPrice: null,        // e.g. "R20 000". Null shows no figure. Only set what you would genuinely charge.
};

const TEAM = [
  { id: "np", name: "Nadia Pretorius", short: "Nadia", job: "Principal advisor", preset: "Owner" },
  { id: "tm", name: "Thandi Mokoena", short: "Thandi", job: "Advisor", preset: "Advisor" },
  { id: "sd", name: "Sipho Dlamini", short: "Sipho", job: "Paraplanner", preset: "Administrator" },
  { id: "ka", name: "Kayla Adams", short: "Kayla", job: "Client administrator", preset: "Administrator" },
  { id: "rv", name: "Ruan Viljoen", short: "Ruan", job: "Client administrator", preset: "Administrator" },
  { id: "zn", name: "Zanele Ndlovu", short: "Zanele", job: "Compliance officer", preset: "Compliance" },
];
const who = (id) => TEAM.find((t) => t.id === id) || { name: "-", short: "-" };
const initials = (n) => n.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

const COMPLIANCE_DOCS = [
  ["Letter of Introduction", "Introduces the firm and the service offered to the client."],
  ["Service Level Agreement", "Sets out what the firm commits to deliver and how."],
  ["Letter of Consent", "Client's consent for the firm to act and to hold their information."],
  ["Advisor appointment", "Formal appointment of the advisor by the client."],
  ["Investment risk assessment", "The client's risk profile for investment recommendations."],
  ["Ease-FICA check", "Electronic FICA verification run for this client."],
  ["TFS check", "Targeted Financial Sanctions screening."],
  ["Financial Needs Analysis", "Suitability analysis of the client's needs (FAIS s8)."],
  ["Investment mandate", "Agreed discretionary mandate and risk band."],
  ["Authorisation letter - Glacier", "Authorises the firm to act with a specific product provider."],
];
const FOLDERS = ["Compliance", "Emails", "Estate", "Financials", "Investments", "Meeting Records", "Portfolio Schedules", "Proposals", "Tax"];

function idDoc(type) { return type === "Trust" ? "Trust deed / registration" : type === "Company" ? "Registration / incorporation" : "ID document"; }

function client(id, name, type, opts = {}) {
  const c = { id, name, type, group: opts.group || null, owner: opts.owner || "np", recorded: opts.recorded || "ka",
    status: opts.status || "Active", ref: opts.ref, sub: opts.sub, persons: opts.persons || [], lite: !!opts.lite,
    notes: opts.notes || [], files: {}, phone: opts.phone || "+27 82 555 01" + String(10 + id.length * 7).slice(0, 2), email: opts.email || name.split(",")[0].toLowerCase().replace(/[^a-z]/g, "") + "@example.co.za" };
  const fica = [];
  const add = (doc, person, role) => fica.push({ id: id + "-f" + fica.length, doc, person: person || null, role: role || null, status: "ok", by: c.recorded, date: "14 Aug 2026" });
  add(idDoc(type));
  if (!c.lite) { add("Proof of address"); add("Proof of banking"); add("Proof of tax"); }
  c.persons.forEach((p) => {
    if (p.role === "Beneficiary") add("ID document", p.name, p.role);
    else if (p.role !== "Spouse") { add("ID document", p.name, p.role); add("Proof of address", p.name, p.role); add("Proof of tax", p.name, p.role); }
  });
  c.fica = fica;
  (opts.gaps || []).forEach(([doc, person, status]) => {
    const r = fica.find((f) => f.doc === doc && (f.person || null) === (person || null));
    if (r) { r.status = status; if (status === "missing") { r.by = null; r.date = null; } }
  });
  c.comp = COMPLIANCE_DOCS.map(([doc, desc], i) => ({ id: id + "-c" + i, doc, desc, status: "done", by: c.recorded, date: "14 Aug 2026" }));
  (opts.compGaps || []).forEach((doc) => { const r = c.comp.find((x) => x.doc === doc); if (r) { r.status = "pending"; r.by = null; r.date = null; } });
  FOLDERS.forEach((f) => (c.files[f] = []));
  c.files.Compliance = [
    { name: "Letter of Introduction - signed.pdf", ver: 1, by: c.recorded, date: "14 Aug 2026" },
    { name: "Financial Needs Analysis 2026.pdf", ver: 2, by: "sd", date: "02 Sep 2026" },
  ];
  c.files.Investments = [
    { name: "Glacier statement Sep 2026.pdf", ver: 1, by: "ka", date: "03 Oct 2026" },
    { name: "Allan Gray quarterly Sep 2026.pdf", ver: 1, by: "ka", date: "06 Oct 2026" },
  ];
  c.files["Portfolio Schedules"] = [{ name: "Composite schedule Oct 2026.xlsx", ver: 4, by: "sd", date: "22 Oct 2026" }];
  c.files["Meeting Records"] = [{ name: "Review meeting notes 12 Mar 2026.docx", ver: 1, by: c.owner, date: "12 Mar 2026" }];
  c.files.Tax = [{ name: "IT3(b) 2026.pdf", ver: 1, by: "ka", date: "21 Jul 2026" }];
  return c;
}

function freshState() {
  const clients = [
    client("c1", "Van der Merwe, Pieter", "Individual", { group: "Van der Merwe", ref: "ID 6708...", sub: "Age 59, 3 investments", notes: [{ by: "np", date: "12 Mar 2026", text: "Review held. Wants to discuss drawdown again at the next review." }] }),
    client("c2", "Van der Merwe Family Trust", "Trust", { group: "Van der Merwe", ref: "IT 1490/2019", sub: "2 trustees, 1 beneficiary", recorded: "rv",
      persons: [{ name: "Pieter van der Merwe", role: "Trustee" }, { name: "Elsa van der Merwe", role: "Trustee" }, { name: "Liam van der Merwe", role: "Beneficiary" }],
      gaps: [["Proof of address", null, "expired"], ["Proof of tax", "Elsa van der Merwe", "missing"], ["ID document", "Liam van der Merwe", "missing"]], compGaps: ["Investment mandate"] }),
    client("c3", "Protea Ridge Holdings (Pty) Ltd", "Company", { group: "Protea Ridge", owner: "tm", ref: "Reg 2016/114447/07", sub: "2 directors", recorded: "rv",
      persons: [{ name: "Themba Khumalo", role: "Director" }, { name: "Marike Joubert", role: "Director" }],
      gaps: [["Proof of banking", null, "missing"], ["Proof of address", "Marike Joubert", "missing"], ["Proof of tax", "Marike Joubert", "missing"]] }),
    client("c4", "Mokoena, Lerato", "Individual", { ref: "ID 7102...", sub: "Age 55, retirement in progress" }),
    client("c5", "Naidoo, Priya", "Individual", { owner: "tm", ref: "ID 8209...", sub: "Age 44, living annuity", gaps: [["Proof of address", null, "expired"]] }),
    client("c6", "Steyn, Johan", "Individual", { ref: "ID 5504...", sub: "Age 72, 2 investments" }),
    client("c7", "Khumalo, Themba", "Individual", { group: "Protea Ridge", owner: "tm", ref: "ID 7711...", sub: "Director, Protea Ridge" }),
    client("c8", "Fourie, Annelie", "Individual", { owner: "tm", ref: "ID 6711...", sub: "Medical aid only", lite: true }),
    client("c9", "Daniels, Ruth", "Individual", { ref: "ID 9003...", sub: "Onboarding", status: "Onboarding", gaps: [["Proof of banking", null, "missing"], ["Proof of tax", null, "missing"]], compGaps: ["Financial Needs Analysis", "Investment risk assessment", "Service Level Agreement"] }),
    client("c10", "Kloof Street Property Trust", "Trust", { owner: "tm", ref: "IT 0521/2012", sub: "1 trustee", persons: [{ name: "Grant Whitfield", role: "Trustee" }], gaps: [["Trust deed / registration", null, "missing"]] }),
    client("c11", "Botha, Hennie", "Individual", { ref: "ID 6103...", sub: "Age 65, 1 investment" }),
    client("c12", "Sithole, Ayanda", "Individual", { owner: "tm", ref: "ID 8507...", sub: "Age 41, 2 investments", gaps: [["Proof of address", null, "expired"], ["Proof of banking", null, "expired"]] }),
  ];

  const SUB_STEPS = () => [
    { name: "Client instruction captured", who: "ka", fields: [
      { k: "provider", label: "Product provider", col: "Product Provider", t: "text", v: "Glacier" },
      { k: "type", label: "Type of investment", col: "Type", t: "select", v: "Living annuity", opts: ["Living annuity", "Unit trust", "Endowment", "Retirement annuity", "Tax-free savings"] },
      { k: "amount", label: "Amount", col: "Amount", t: "money", v: 1250000 },
      { k: "source", label: "Source of funds", col: "Source of Funds", t: "select", v: "Retirement benefit", opts: ["Retirement benefit", "Savings", "Sale of property", "Inheritance"] },
      { k: "inline", label: "In line with knowledge of client", col: "In Line", t: "yn", v: "Yes" },
      { k: "unusual", label: "Unusual transaction", col: "Unusual", t: "yn", v: "No" },
      { k: "pep", label: "PEP", col: "PEP", t: "yn", v: "No" },
      { k: "adv", label: "Financial advisor", col: "Financial Advisor", t: "staff", v: "np" },
      { k: "rec", label: "Recorded by", col: "Recorded By", t: "staff", v: "ka" } ] },
    { name: "Quotes obtained", who: "sd", fields: [{ k: "quotes", label: "Comparison quotes obtained", col: "Comparison Quotes", t: "yn", v: "Yes" }] },
    { name: "Mandate and risk checked", who: "sd", fields: [{ k: "mandate", label: "Mandate vs portfolio risk", col: "Mandate vs Risk", t: "select", v: "In line", opts: ["In line", "Mandate updated"] }] },
    { name: "Signed quotes returned", who: "ka", fields: [{ k: "signed", label: "Signed quotes on file", col: "Signed Quotes", t: "yn", v: "Yes" }] },
    { name: "Fees recorded", who: "ka", fields: [
      { k: "ifee", label: "Initial fees", col: "Initial Fees", t: "pct", v: "1.5%" }, { k: "afee", label: "Annual fees", col: "Annual Fees", t: "pct", v: "1.0%" } ] },
    { name: "Submitted to the product house", who: "ka", fields: [] },
    { name: "Confirmation received", who: "ka", fields: [{ k: "conf", label: "Confirmation reference", t: "text", v: "GLA-448120" }] },
    { name: "Filed", who: "rv", fields: [] },
    { name: "Compliance sign-off", who: "zn", fields: [] },
  ];
  const named = (names, whoList) => names.map((name, i) => ({ name, who: whoList[i % whoList.length], fields: [] }));

  const mk = (id, type, clientId, owner, steps, at, opts = {}) => ({
    id, type, clientId, owner, started: opts.started || "27 Oct 2026",
    steps: steps.map((s, i) => ({ ...s, state: i < at ? "done" : i === at ? (opts.state || "progress") : "blocked", due: i === at ? opts.due || "4 Nov 2026" : null, overdue: i === at && !!opts.overdue, assignee: i === at && opts.state === "ready" ? null : s.who, doneBy: i < at ? s.who : null })),
  });

  const processes = [
    mk("p1", "Subscription", "c4", "np", SUB_STEPS().map((s, i) => (i === 0 ? { ...s, who: "np" } : s)), 0, { due: "3 Nov 2026", started: "2 Nov 2026" }),
    mk("p2", "Switch", "c1", "np", named(["Client instruction captured", "Mandate risk checked", "Updated mandate signed", "Switch form signed", "Submitted to the product house", "Confirmation received", "Filed"], ["ka", "sd", "ka"]), 2, { state: "hold", due: "With the client", started: "21 Oct 2026" }),
    mk("p3", "Client Onboarding", "c9", "np", named(["Introductory meeting", "Letter of introduction signed", "FICA documents collected", "Financial needs analysis", "Risk profile agreed", "Service level agreement signed", "Mandate signed", "Client record created", "Compliance sign-off"], ["np", "ka", "ka", "sd"]), 2, { due: "29 Oct 2026", overdue: true, started: "13 Oct 2026" }),
    mk("p4", "Annual Client Review", "c5", "tm", named(["Book the review meeting", "Review held"], ["ka", "tm"]), 0, { state: "ready", due: "7 Nov 2026" }),
    mk("p5", "Redemption", "c6", "np", named(["Client instruction captured", "Banking details verified", "Tax directive", "Redemption form signed", "Submitted to the product house", "Payment received by the client", "Filed", "Compliance sign-off"], ["ka", "sd"]), 2, { due: "5 Nov 2026" }),
    mk("p6", "Subscription", "c11", "np", SUB_STEPS(), 4, { due: "2 Nov 2026", started: "19 Oct 2026" }),
    mk("p7", "Annual Income Review", "c12", "tm", named(["Check the drawdown", "Client informed"], ["sd", "tm"]), 0, { due: "12 Nov 2026" }),
    mk("p8", "Annual Client Review", "c1", "np", named(["Book the review meeting", "Review held"], ["np", "np"]), 0, { due: "30 Oct 2026", overdue: true }),
  ];

  const row = (client, date, vals, status, ownerId) => ({ client, date, vals, status, sheet: "Subscription", ownerId });
  const tracking = [
    row("Botha, Hennie", "19 Oct 2026", { "Product Provider": "Allan Gray", Type: "Unit trust", Amount: 480000, "Source of Funds": "Savings", "In Line": "Yes", Unusual: "No", PEP: "No", "Comparison Quotes": "Yes", "Mandate vs Risk": "In line", "Signed Quotes": "Yes", "Financial Advisor": "Nadia Pretorius", "Recorded By": "Kayla Adams" }, "In progress", "np"),
    row("Steyn, Johan", "02 Oct 2026", { "Product Provider": "Ninety One", Type: "Endowment", Amount: 750000, "Source of Funds": "Sale of property", "In Line": "Yes", Unusual: "No", PEP: "No", "Comparison Quotes": "Yes", "Mandate vs Risk": "In line", "Signed Quotes": "Yes", "Initial Fees": "1.0%", "Annual Fees": "0.75%", "Financial Advisor": "Nadia Pretorius", "Recorded By": "Kayla Adams" }, "Complete", "np"),
    row("Sithole, Ayanda", "24 Sep 2026", { "Product Provider": "Glacier", Type: "Retirement annuity", Amount: 320000, "Source of Funds": "Savings", "In Line": "Yes", Unusual: "No", PEP: "No", "Comparison Quotes": "Yes", "Mandate vs Risk": "In line", "Signed Quotes": "Yes", "Initial Fees": "1.5%", "Annual Fees": "1.0%", "Financial Advisor": "Thandi Mokoena", "Recorded By": "Ruan Viljoen" }, "Complete", "tm"),
    row("Khumalo, Themba", "11 Sep 2026", { "Product Provider": "Allan Gray", Type: "Tax-free savings", Amount: 36000, "Source of Funds": "Savings", "In Line": "Yes", Unusual: "No", PEP: "No", "Comparison Quotes": "Yes", "Mandate vs Risk": "In line", "Signed Quotes": "Yes", "Initial Fees": "0.0%", "Annual Fees": "0.75%", "Financial Advisor": "Thandi Mokoena", "Recorded By": "Ruan Viljoen" }, "Complete", "tm"),
    row("Van der Merwe, Pieter", "28 Aug 2026", { "Product Provider": "Glacier", Type: "Living annuity", Amount: 2100000, "Source of Funds": "Retirement benefit", "In Line": "Yes", Unusual: "No", PEP: "No", "Comparison Quotes": "Yes", "Mandate vs Risk": "Mandate updated", "Signed Quotes": "Yes", "Initial Fees": "1.5%", "Annual Fees": "1.0%", "Financial Advisor": "Nadia Pretorius", "Recorded By": "Kayla Adams" }, "Complete", "np"),
    row("Naidoo, Priya", "14 Aug 2026", { "Product Provider": "Ninety One", Type: "Unit trust", Amount: 150000, "Source of Funds": "Savings", "In Line": "Yes", Unusual: "No", PEP: "No", "Comparison Quotes": "Yes", "Mandate vs Risk": "In line", "Signed Quotes": "Yes", "Initial Fees": "1.0%", "Annual Fees": "1.0%", "Financial Advisor": "Thandi Mokoena", "Recorded By": "Ruan Viljoen" }, "Complete", "tm"),
  ];
  const switches = [
    { client: "Van der Merwe, Pieter", date: "21 Oct 2026", provider: "Glacier", from: "Ninety One Opportunity", to: "Glacier Money Market", value: 300000, reason: "Income for the next 24 months", adv: "Nadia Pretorius", status: "On hold" },
    { client: "Naidoo, Priya", date: "08 Sep 2026", provider: "Allan Gray", from: "Balanced Fund", to: "Stable Fund", value: 220000, reason: "Lower risk ahead of property purchase", adv: "Thandi Mokoena", status: "Complete" },
  ];
  const redemptions = [
    { client: "Steyn, Johan", date: "27 Oct 2026", provider: "Allan Gray", amount: 180000, kind: "Partial", directive: "Pending", adv: "Nadia Pretorius", status: "In progress" },
    { client: "Fourie, Annelie", date: "03 Sep 2026", provider: "Ninety One", amount: 60000, kind: "Partial", directive: "Not required", adv: "Thandi Mokoena", status: "Complete" },
  ];

  const audit = [
    { who: "zn", when: "Today, 08:41", what: "Signed off compliance", on: "Steyn, Johan: Subscription" },
    { who: "ka", when: "Today, 08:12", what: "Attached Proof of address", on: "Mokoena, Lerato" },
    { who: "sd", when: "Yesterday, 16:50", what: "Recorded fees", on: "Botha, Hennie: Subscription" },
    { who: "np", when: "Yesterday, 15:22", what: "Changed permissions for Ruan Viljoen", on: "Settings" },
    { who: "rv", when: "Yesterday, 11:05", what: "Sent signature request", on: "Kloof Street Property Trust" },
    { who: "tm", when: "30 Oct, 14:18", what: "Marked Investment mandate as done", on: "Sithole, Ayanda" },
    { who: "ka", when: "30 Oct, 09:47", what: "Replaced document, version 2 kept", on: "Van der Merwe, Pieter" },
    { who: "zn", when: "29 Oct, 17:02", what: "Changed validity of Proof of address to 90 days", on: "Settings" },
  ];

  const signatures = [
    { client: "Kloof Street Property Trust", doc: "Service Level Agreement", signers: [["Grant Whitfield", "viewed"]], status: "Waiting", sent: "1 Nov 2026" },
    { client: "Van der Merwe, Pieter", doc: "Updated investment mandate", signers: [["Pieter van der Merwe", "sent"]], status: "Waiting", sent: "28 Oct 2026" },
    { client: "Protea Ridge Holdings (Pty) Ltd", doc: "Letter of Consent", signers: [["Themba Khumalo", "signed"], ["Marike Joubert", "viewed"]], status: "Waiting", sent: "27 Oct 2026" },
    { client: "Botha, Hennie", doc: "Signed quote: Allan Gray", signers: [["Hennie Botha", "signed"]], status: "Complete", sent: "22 Oct 2026" },
    { client: "Mokoena, Lerato", doc: "Letter of Introduction", signers: [["Lerato Mokoena", "signed"]], status: "Complete", sent: "16 Oct 2026" },
  ];

  const emails = [
    { to: "Pieter van der Merwe", subject: "Your updated mandate is ready to sign", kind: "Signature request", when: "28 Oct 2026", status: "Delivered" },
    { to: "Grant Whitfield", subject: "Service Level Agreement for signature", kind: "Signature request", when: "1 Nov 2026", status: "Opened" },
    { to: "Ruth Daniels", subject: "Documents we need from you", kind: "Information request", when: "26 Oct 2026", status: "Delivered" },
    { to: "Ruth Daniels", subject: "Reminder: documents we need from you", kind: "Information request", when: "29 Oct 2026", status: "Delivered" },
  ];

  const requests = [
    { id: "r1", clientId: "c9", title: "Documents we need from you", docs: ["Proof of banking", "Proof of tax"], status: "Sent", sent: "26 Oct 2026", reminder: "Reminded 29 Oct" },
  ];

  return { clients, processes, tracking, switches, redemptions, audit, signatures, emails, requests,
    catalogue: [
      { doc: "ID document", kind: "FICA", valid: "Never expires", req: true, chase: true },
      { doc: "Proof of address", kind: "FICA", valid: "90 days", req: true, chase: true },
      { doc: "Proof of banking", kind: "FICA", valid: "Never expires", req: true, chase: true },
      { doc: "Proof of tax", kind: "FICA", valid: "365 days", req: true, chase: true },
      ...COMPLIANCE_DOCS.map(([doc]) => ({ doc: doc.replace(" - Glacier", ""), kind: "Compliance", valid: doc.includes("FICA") || doc === "TFS check" ? "365 days" : "Never expires", req: true, chase: true })),
    ],
    perms: [
      { key: "Clients", desc: "See and edit client records", grid: { Owner: 1, Advisor: 1, Administrator: 1, Compliance: 1 } },
      { key: "Sensitive numbers", desc: "See full ID, tax and bank numbers", sens: 1, grid: { Owner: 1, Advisor: 1, Administrator: 0, Compliance: 1 } },
      { key: "Client health", desc: "See health and medical information", sens: 1, grid: { Owner: 1, Advisor: 1, Administrator: 0, Compliance: 0 } },
      { key: "Anyone's processes", desc: "Act on steps assigned to someone else", grid: { Owner: 1, Advisor: 0, Administrator: 0, Compliance: 1 } },
      { key: "Tracking schedule", desc: "See the schedule and export it", grid: { Owner: 1, Advisor: 1, Administrator: 1, Compliance: 1 } },
      { key: "Production and fees", desc: "See amounts and fees across advisors", sens: 1, grid: { Owner: 1, Advisor: 0, Administrator: 0, Compliance: 1 } },
      { key: "Document catalogue", desc: "Change which documents are required", grid: { Owner: 1, Advisor: 0, Administrator: 0, Compliance: 1 } },
      { key: "Team and permissions", desc: "Invite people, change access", sens: 1, grid: { Owner: 1, Advisor: 0, Administrator: 0, Compliance: 0 } },
    ],
    portfolio: {
      dates: ["Mar 18", "Mar 19", "Mar 20", "Mar 21", "Mar 22", "Mar 23", "Mar 24", "Mar 25", "Mar 26", "Oct 26"],
      series: [
        { name: "Retirement", color: "#2F5FA8", v: [1.82, 1.97, 1.71, 2.21, 2.34, 2.41, 2.63, 2.86, 3.08, 3.21] },
        { name: "Discretionary", color: "#8A8A1A", v: [0.94, 1.02, 0.88, 1.16, 1.24, 1.31, 1.45, 1.58, 1.71, 1.84] },
        { name: "Tax-free", color: "#96357A", v: [0.04, 0.08, 0.1, 0.17, 0.21, 0.26, 0.31, 0.36, 0.42, 0.46] },
        { name: "Offshore", color: "#C25E24", v: [0.72, 0.85, 0.93, 1.12, 1.27, 1.31, 1.52, 1.72, 2.01, 2.14] },
      ],
      schedule: [
        { sec: "Retirement", items: [["Glacier Living Annuity", "Coronation Strategic Income", 1040000, 1062400], ["Glacier Living Annuity", "Ninety One Opportunity", 1320000, 1368210], ["Glacier Living Annuity", "PSG Balanced", 720000, 779390]] },
        { sec: "Discretionary", items: [["Allan Gray Unit Trust", "Allan Gray Balanced", 1020000, 1096540], ["Allan Gray Unit Trust", "Allan Gray Equity", 690000, 743460]] },
        { sec: "Tax-free", items: [["Allan Gray TFSA", "Allan Gray Tax-Free Balanced", 420000, 460000]] },
        { sec: "Offshore", items: [["Ninety One Global", "Global Franchise", 1180000, 1228700], ["Ninety One Global", "Global Strategic Equity", 830000, 911300]] },
      ],
    },
    newId: 100,
  };
}

/* The demo OS: one state, many live screens. Change something on one screen and every other screen shows it. */
let S = freshState();
const INST = [];
const ic = (n, cls = "") => `<i class="ph ph-${n} ${cls}"></i>`;
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const rand = (n) => "R " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const cl = (id) => S.clients.find((c) => c.id === id);
const log = (what, on, by = "np") => S.audit.unshift({ who: by, when: "Just now", what, on });

function mount(el, route) {
  const i = { el, route, f: {}, g: "", modal: null, toast: null, back: [] };
  INST.push(i);
  el.classList.add("os");
  el.addEventListener("click", (e) => onClick(i, e));
  el.addEventListener("input", (e) => onInput(i, e));
  return i;
}
function go(i, route) { i.route = route; i.f = {}; i.g = ""; i.modal = null; render(i); const m = i.el.querySelector(".main"); if (m) m.scrollTop = 0; }
function toast(i, text) { i.toast = text; clearTimeout(i.tt); render(i); i.tt = setTimeout(() => { i.toast = null; render(i); }, 3600); }
function refresh(except) { INST.forEach((x) => { if (x === except || x.el.closest(".n.on") || !x.el.closest(".n")) render(x); else x.dirty = true; }); }

function render(i) {
  const m = i.el.querySelector(".main"); const top = m ? m.scrollTop : 0;
  const sh = i.el.querySelector(".sheet"); const shL = sh ? sh.scrollLeft : 0;
  const a = document.activeElement; const key = a && i.el.contains(a) ? a.getAttribute("data-bind") : null; const pos = key && a.selectionStart;
  i.el.innerHTML = shell(i);
  const m2 = i.el.querySelector(".main"); if (m2) m2.scrollTop = top;
  const sh2 = i.el.querySelector(".sheet"); if (sh2) sh2.scrollLeft = shL;
  if (key) { const n = i.el.querySelector(`[data-bind="${key}"]`); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (_) {} } }
  i.dirty = false;
  if (i.onRender) i.onRender(i);
}

/* ---------- rollups (one function per signal, so no two screens can disagree) ---------- */
function ficaSum(c) { const r = c.fica.filter((f) => f.status !== "na"); return { missing: r.filter((f) => f.status === "missing").length, expired: r.filter((f) => f.status === "expired").length, total: r.length }; }
function ficaBadge(c) {
  const s = ficaSum(c);
  if (s.missing) return `<span class="pill bad">${ic("x-circle")}${s.missing} missing</span>`;
  if (s.expired) return `<span class="pill warn">${ic("warning")}${s.expired} expired</span>`;
  return `<span class="pill ok">${ic("check-circle")}Complete</span>`;
}
function compPending(c) { return c.comp.filter((x) => x.status === "pending" || x.status === "expired").length; }
function gaps(c) {
  const out = [];
  c.fica.forEach((f) => { if (f.status === "missing" || f.status === "expired") out.push({ kind: "FICA", tone: f.status === "missing" ? "bad" : "warn", label: f.doc + (f.person ? ` (${f.role.toLowerCase()}: ${shortName(f.person)})` : ""), doc: f.doc, id: f.id }); });
  c.comp.forEach((x) => { if (x.status === "pending" || x.status === "expired") out.push({ kind: "Compliance", tone: x.status === "pending" ? "bad" : "warn", label: x.doc, doc: x.doc, id: x.id }); });
  return out.sort((a, b) => (a.tone === b.tone ? 0 : a.tone === "bad" ? -1 : 1));
}
const shortName = (n) => { const p = n.split(" "); return p[0][0] + " " + p.slice(1).join(" "); };
const gapCount = () => S.clients.reduce((n, c) => n + gaps(c).length, 0);
const curStep = (p) => p.steps.find((s) => ["progress", "ready", "hold"].includes(s.state));
const openTasks = () => S.processes.map((p) => ({ p, s: curStep(p) })).filter((t) => t.s);
const overdue = () => openTasks().filter((t) => t.s.overdue && t.s.state !== "hold").length;
const stepPill = (s) => s.state === "done" ? `<span class="pill ok">Done</span>` : s.state === "hold" ? `<span class="pill warn">On hold</span>` : s.state === "ready" ? `<span class="pill ac">Ready</span>` : s.state === "progress" ? (s.overdue ? `<span class="pill bad">Overdue</span>` : `<span class="pill neu">In progress</span>`) : `<span class="pill neu">Blocked</span>`;
const sigWaiting = () => S.signatures.filter((s) => s.status === "Waiting").length;

/* ---------- shell ---------- */
const NAV = [["tasks", "list-checks", "Tasks", () => overdue()], ["clients", "users-three", "Clients"], ["contacts", "address-book", "Contacts"], ["missing", "warning-circle", "Missing Docs", () => gapCount()], ["signatures", "pen-nib", "Signatures", () => sigWaiting()], ["emails", "envelope-simple", "Emails"], ["tracking", "table", "Tracking schedule"]];
const NAV2 = [["types", "flow-arrow", "Process types"], ["audit", "clock-counter-clockwise", "Audit Log"], ["docs", "book-open", "Documentation"], ["settings", "gear-six", "Settings"]];
function shell(i) {
  const r = i.route.split("/");
  const navBtn = ([k, icn, label, cnt]) => {
    const c = cnt ? cnt() : 0; const on = r[0] === k || (k === "clients" && ["record", "onboard", "import"].includes(r[0])) || (k === "tasks" && r[0] === "process");
    return `<button class="nav ${on ? "on" : ""}" data-a="nav" data-to="${k}">${ic(icn)}${label}${c ? `<em>${c}</em>` : ""}</button>`;
  };
  const q = i.g.trim().toLowerCase();
  const hits = q ? S.clients.filter((c) => c.name.toLowerCase().includes(q) || c.ref.toLowerCase().includes(q) || c.persons.some((p) => p.name.toLowerCase().includes(q))).slice(0, 6) : [];
  return `<header class="top">
    <div class="logo" data-a="nav" data-to="clients"><img src="/brand/cornerstone-mark.svg" alt="">${CONFIG.firm}</div>
    <div class="gsearch">${ic("magnifying-glass")}<input data-bind="g" value="${esc(i.g)}" placeholder="Search clients, contacts, ID or reg number..." />
      ${hits.length ? `<div class="sugg">${hits.map((c) => `<button data-a="open" data-id="${c.id}"><span class="ty ${c.type}">${c.type}</span><span><b style="font-weight:700">${esc(c.name)}</b><br><small style="color:var(--muted)">${esc(c.ref)}${c.persons.length ? " · " + c.persons.map((p) => p.name).join(", ") : ""}</small></span></button>`).join("")}</div>` : ""}</div>
    <div class="demo-tag">Example system. Made-up clients.</div>
    <div class="me"><span class="av">NP</span>Nadia Pretorius</div>
  </header>
  <div class="body">
    <aside class="side">
      <div class="gl">Workspace</div>${NAV.map(navBtn).join("")}
      <div style="flex:1"></div>
      <div class="gl">Admin</div>${NAV2.map(navBtn).join("")}
      <div class="firm"><span class="av">${CONFIG.firm[0]}</span><span>${CONFIG.firm}<small>${TEAM.length} staff</small></span></div>
    </aside>
    <main class="main">${page(i, r)}</main>
  </div>
  ${i.modal ? modal(i) : ""}
  ${i.toast ? `<div class="toast">${ic("check-circle")}<span>${i.toast}</span></div>` : ""}`;
}
function page(i, r) {
  switch (r[0]) {
    case "clients": return pgClients(i);
    case "record": return pgRecord(i, r[1], r[2] || "overview");
    case "tasks": return pgTasks(i);
    case "process": return pgProcess(i, r[1]);
    case "contacts": return pgContacts(i);
    case "missing": return pgMissing(i);
    case "signatures": return pgSignatures(i);
    case "emails": return pgEmails(i);
    case "tracking": return pgTracking(i);
    case "types": return pgTypes(i, r[1]);
    case "audit": return pgAudit(i);
    case "docs": return pgDocs(i);
    case "settings": return pgSettings(i, r[1] || "team");
    case "onboard": return pgOnboard(i);
    case "import": return pgImport(i);
    case "agent": return pgAgent(i);
  }
  return "";
}
const pageHead = (t, sub, right = "") => `<div class="phd"><div><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ""}</div><div class="sp"></div>${right}</div>`;

/* ---------- clients ---------- */
function pgClients(i) {
  const q = (i.f.q || "").toLowerCase(); const t = i.f.type || ""; const fc = i.f.fica || "";
  const list = S.clients.filter((c) => (!q || c.name.toLowerCase().includes(q) || c.ref.toLowerCase().includes(q) || c.persons.some((p) => p.name.toLowerCase().includes(q)) || (c.group || "").toLowerCase().includes(q)) && (!t || c.type === t) && (!fc || (fc === "gaps" ? ficaSum(c).missing + ficaSum(c).expired > 0 : ficaSum(c).missing + ficaSum(c).expired === 0)));
  return pageHead("Clients", "Every client file, searchable across name, ID, registration and linked people.", `<button class="btn sec" data-a="nav" data-to="import">${ic("upload-simple")}Import</button><button class="btn pri" data-a="nav" data-to="onboard">${ic("plus")}Onboard client</button>`) +
  `<div class="tb"><input class="field" style="flex:1" data-bind="f.q" value="${esc(i.f.q || "")}" placeholder="Filter by name, ID / reg / tax number, contact or group..." />
    <select class="field" data-bind="f.type"><option value="">All types</option>${["Individual", "Trust", "Company"].map((x) => `<option ${t === x ? "selected" : ""}>${x}</option>`).join("")}</select>
    <select class="field" data-bind="f.fica"><option value="">Any FICA</option><option value="gaps" ${fc === "gaps" ? "selected" : ""}>Has gaps</option><option value="ok" ${fc === "ok" ? "selected" : ""}>Complete</option></select>
    <span class="count">${list.length} clients</span></div>
  <div class="panel"><table><thead><tr><th>Name</th><th>Type</th><th>Group</th><th>Owner</th><th>FICA</th><th>Status</th></tr></thead><tbody>
  ${list.map((c) => `<tr class="click" data-a="open" data-id="${c.id}"><td><b class="nm">${esc(c.name)}</b><small>${esc(c.ref)} · ${esc(c.sub)}</small></td><td><span class="ty ${c.type}">${c.type}</span></td><td>${c.group ? `<a>${esc(c.group)}</a>` : "-"}</td><td>${who(c.owner).short}</td><td>${ficaBadge(c)}</td><td><span class="dot ${c.status === "Active" || c.status === "Onboarding" ? "" : "off"}"></span>${c.status}</td></tr>`).join("")}
  </tbody></table></div>`;
}

/* ---------- record ---------- */
const TABS = [["overview", "squares-four", "Overview"], ["processes", "flow-arrow", "Processes"], ["fica", "shield-check", "FICA"], ["compliance", "clipboard-text", "Compliance"], ["portfolio", "chart-line-up", "Portfolio"], ["requests", "paper-plane-tilt", "Requests"], ["contacts", "address-book", "Contacts"], ["documents", "folder", "Documents"], ["notes", "note", "Notes"]];
function pgRecord(i, id, tab) {
  const c = cl(id); if (!c) return "";
  const s = ficaSum(c); const pc = compPending(c);
  const bodies = { overview: tOverview, processes: tProcesses, fica: tFica, compliance: tCompliance, portfolio: tPortfolio, requests: tRequests, contacts: tContacts, documents: tDocuments, notes: tNotes };
  return `<div class="rhead"><div class="rtitle"><button class="back" data-a="nav" data-to="clients">${ic("arrow-left")}Clients</button><span class="name">${esc(c.name)}</span><span class="ty ${c.type}">${c.type}</span><div style="flex:1"></div>${ficaBadge(c)}<button class="btn acc sm" data-a="reqOpen" data-id="${c.id}">${ic("paper-plane-tilt")}Request from client</button></div>
    <div class="rmeta"><span>Group: <b>${c.group || "-"}</b></span><span>Owner: <b>${who(c.owner).name}</b></span><span>Recorded by: <b>${who(c.recorded).name}</b></span><span>${esc(c.ref)}</span><span>Status: <b>${c.status}</b></span></div></div>
  <div class="tabs">${TABS.map(([k, ico, l]) => { const n = k === "fica" ? s.missing + s.expired : k === "compliance" ? pc : 0; return `<button class="tab ${tab === k ? "on" : ""}" data-a="tab" data-id="${c.id}" data-tab="${k}">${ic(ico)}${l}${n ? `<em>${n}</em>` : ""}</button>`; }).join("")}</div>
  ${bodies[tab](i, c)}`;
}
function tOverview(i, c) {
  const ps = S.processes.filter((p) => p.clientId === c.id);
  const g = gaps(c);
  return `<div class="grid2"><div class="panel pad"><h4 class="ptitle">Details</h4><div class="kv"><span>Email</span><b style="font-weight:600">${esc(c.email)}</b><span>Phone</span><b style="font-weight:600">${esc(c.phone)}</b><span>Tax number</span><b style="font-weight:600">••••${c.id.length}417</b><span>Bank account</span><b style="font-weight:600">••••${c.id.length}902</b><span>Linked people</span><b style="font-weight:600">${c.persons.map((p) => p.name).join(", ") || "-"}</b></div></div>
    <div class="panel pad"><h4 class="ptitle">What's outstanding</h4>${g.length ? `<div class="chips">${g.map(chip).join("")}</div>` : `<span class="pill ok">${ic("check-circle")}Nothing outstanding</span>`}
      <h4 class="ptitle" style="margin-top:14px">Open work</h4>${ps.length ? ps.map((p) => { const s = curStep(p); return `<div style="display:flex;gap:8px;align-items:center;padding:4px 0"><a data-a="openP" data-id="${p.id}" style="font-weight:600">${p.type}</a><span class="sm-m">${s ? s.name : "Complete"}</span><span style="flex:1"></span>${s ? stepPill(s) : ""}</div>`; }).join("") : `<span class="sm-m">No open processes.</span>`}</div></div>
    <div class="panel pad" style="margin-top:13px"><h4 class="ptitle">Timeline</h4>${S.audit.filter((a) => a.on.startsWith(c.name)).slice(0, 4).map((a) => `<div style="padding:3px 0"><b style="font-weight:600">${who(a.who).short}</b> ${esc(a.what)} <span class="sm-m">· ${a.when}</span></div>`).join("") || `<span class="sm-m">Client file created 14 Aug 2026 by ${who(c.recorded).short}.</span>`}</div>`;
}
const chip = (g) => `<span class="pill ${g.tone} ${g.kind === "FICA" ? "sq" : ""}">${ic(g.tone === "bad" ? "x-circle" : "warning")}${esc(g.label)}</span>`;
function tProcesses(i, c) {
  const ps = S.processes.filter((p) => p.clientId === c.id);
  return `<div class="tb"><div class="sm-m">The same work as Tasks, seen from this client.</div><span style="flex:1"></span><button class="btn pri sm" data-a="pStart" data-id="${c.id}">${ic("plus")}Start a process</button></div>
  <div class="panel"><table><thead><tr><th>Process</th><th>Current step</th><th>Assigned to</th><th>Progress</th><th>State</th></tr></thead><tbody>${ps.map((p) => { const s = curStep(p); const dn = p.steps.filter((x) => x.state === "done").length; return `<tr class="click" data-a="openP" data-id="${p.id}"><td><b class="nm">${p.type}</b><small>Started ${p.started}</small></td><td>${s ? s.name : "All steps done"}</td><td>${s && s.assignee ? who(s.assignee).short : "-"}</td><td class="tnum">${dn} of ${p.steps.length}</td><td>${s ? stepPill(s) : `<span class="pill ok">Complete</span>`}</td></tr>`; }).join("") || `<tr><td colspan="5" class="sm-m">No processes yet.</td></tr>`}</tbody></table></div>`;
}
function ficaRow(c, f) {
  const st = { ok: ["is-ok", "ok", "check", "Held"], missing: ["is-bad", "bad", "x", "Missing"], expired: ["is-warn", "warn", "warning", "Expired"], na: ["is-na", "neu", "minus", "N/A"] }[f.status];
  return `<div class="chk ${st[0]}"><span class="ci ${st[1]}">${ic(st[2])}</span><div><div class="t">${esc(f.doc)}</div><div class="m">${f.by ? `${f.status === "expired" ? "Lapsed. Last captured" : "Captured"} by ${who(f.by).short}, ${f.date}` : "Not on file"}</div></div><span class="sp"></span>
    <span class="pill ${st[1]}">${st[3]}</span>${f.status === "missing" || f.status === "expired" ? `<button class="btn acc sm" data-a="attach" data-c="${c.id}" data-id="${f.id}">${ic("paperclip")}Attach</button><button class="btn sec sm" data-a="ficaNa" data-c="${c.id}" data-id="${f.id}">N/A</button>` : `<button class="btn sec sm" data-a="viewF" data-c="${c.id}">View</button>`}</div>`;
}
function tFica(i, c) {
  const ent = c.fica.filter((f) => !f.person); const ppl = [...new Set(c.fica.filter((f) => f.person).map((f) => f.person))];
  return `<div class="sh">The client</div>${ent.map((f) => ficaRow(c, f)).join("")}${ppl.map((p) => { const rows = c.fica.filter((f) => f.person === p); return `<div class="sh">${esc(p)} · ${rows[0].role}</div>${rows.map((f) => ficaRow(c, f)).join("")}`; }).join("")}`;
}
function tCompliance(i, c) {
  const left = compPending(c);
  return `<div class="tb"><span class="pill ${left ? "warn" : "ok"}">${left ? left + " to do" : "All done"}</span><span class="sm-m">Attaching a file records the evidence and files it into the client's documents.</span></div>` +
  c.comp.map((x) => { const st = { done: ["is-ok", "ok", "check", "Done"], pending: ["is-warn", "warn", "circle-dashed", "To do"], expired: ["is-warn", "warn", "warning", "Expired"], na: ["is-na", "neu", "minus", "N/A"] }[x.status]; return `<div class="chk ${st[0]}"><span class="ci ${st[1]}">${ic(st[2])}</span><div><div class="t">${esc(x.doc)}</div><div class="m">${esc(x.desc)}${x.by ? ` Recorded by ${who(x.by).short}, ${x.date}.` : ""}</div></div><span class="sp"></span><span class="pill ${st[1]}">${st[3]}</span>${x.status === "pending" ? `<button class="btn acc sm" data-a="compDone" data-c="${c.id}" data-id="${x.id}">${ic("paperclip")}Attach</button><button class="btn sec sm" data-a="compNa" data-c="${c.id}" data-id="${x.id}">N/A</button>` : ""}</div>`; }).join("");
}
function tContacts(i, c) {
  return c.persons.length ? `<div class="panel"><table><thead><tr><th>Person</th><th>Role</th><th>FICA</th></tr></thead><tbody>${c.persons.map((p) => { const rows = c.fica.filter((f) => f.person === p.name); const bad = rows.filter((f) => f.status !== "ok").length; return `<tr><td><b class="nm">${esc(p.name)}</b><small>Stored once. Linked wherever they appear.</small></td><td>${p.role}</td><td>${!rows.length ? "-" : bad ? `<span class="pill bad">${bad} outstanding</span>` : `<span class="pill ok">Complete</span>`}</td></tr>`; }).join("")}</tbody></table></div>` : `<div class="panel win"><p class="sm-m">No linked people on this client.</p></div>`;
}
function tDocuments(i, c) {
  const f = i.f.folder || "Compliance"; const files = c.files[f] || [];
  return `<div class="panel" style="display:grid;grid-template-columns:230px 1fr"><div class="tree">${FOLDERS.map((x) => `<button class="${x === f ? "on" : ""}" data-a="folder" data-f="${x}">${ic(x === f ? "folder-open" : "folder")}${x}<small>${(c.files[x] || []).length || ""}</small></button>`).join("")}</div>
  <div><table><thead><tr><th>${esc(f)}</th><th>Version</th><th>Added by</th><th>Date</th></tr></thead><tbody>${files.map((d) => `<tr><td>${ic("file-text")} ${esc(d.name)}</td><td class="tnum">v${d.ver}${d.ver > 1 ? ` <small>· earlier kept</small>` : ""}</td><td>${who(d.by).short}</td><td>${d.date}</td></tr>`).join("") || `<tr><td colspan="4" class="sm-m">Nothing filed here yet.</td></tr>`}</tbody></table></div></div>`;
}
function tNotes(i, c) {
  return `<div class="panel pad"><div class="tb"><input class="field" style="flex:1" data-bind="f.note" value="${esc(i.f.note || "")}" placeholder="Add a note..." /><button class="btn pri" data-a="noteAdd" data-id="${c.id}">Save note</button></div>${c.notes.map((n) => `<div style="padding:8px 0;border-top:1px solid var(--line)"><b style="font-weight:600">${who(n.by).short}</b> <span class="sm-m">${n.date}</span><br>${esc(n.text)}</div>`).join("") || `<span class="sm-m">No notes yet.</span>`}</div>`;
}
function tRequests(i, c) {
  const rs = S.requests.filter((r) => r.clientId === c.id);
  return `<div class="tb"><span class="sm-m">A secure link for the client to send their details and documents. Nothing reaches the record until someone accepts it.</span><span style="flex:1"></span><button class="btn acc sm" data-a="reqOpen" data-id="${c.id}">${ic("paper-plane-tilt")}Request from client</button></div>
  <div class="panel"><table><thead><tr><th>Request</th><th>Asking for</th><th>Sent</th><th>State</th><th></th></tr></thead><tbody>${rs.map((r) => `<tr><td><b class="nm">${esc(r.title)}</b></td><td>${r.docs.join(", ")}</td><td>${r.sent}<br><small>${r.reminder || ""}</small></td><td><span class="pill ${r.status === "Ready to review" ? "ac" : r.status === "Accepted" ? "ok" : "neu"}">${r.status}</span></td><td>${r.status === "Ready to review" ? `<button class="btn acc sm" data-a="reqReview" data-id="${r.id}">Review</button>` : r.status === "Sent" ? `<button class="btn sec sm" data-a="reqClient" data-id="${r.id}">See client view</button>` : ""}</td></tr>`).join("") || `<tr><td colspan="5" class="sm-m">No requests yet.</td></tr>`}</tbody></table></div>`;
}
function tPortfolio(i, c) {
  if (c.id !== "c1") return `<div class="panel win"><p class="sm-m">Open <b>Van der Merwe, Pieter</b> to see a portfolio on this demo.</p><button class="btn sec" data-a="open" data-id="c1">Open it</button></div>`;
  const P = S.portfolio; const view = i.f.pv || "overview"; const seg = i.f.range || "all";
  const n = P.dates.length; const from = seg === "all" ? 0 : seg === "5" ? n - 6 : n - 4;
  const dates = P.dates.slice(from); const ser = P.series.map((s) => ({ ...s, v: s.v.slice(from) }));
  const tot = P.series.reduce((a, s) => a + s.v[n - 1], 0); const prev = P.series.reduce((a, s) => a + s.v[n - 2], 0);
  const net = 4.32; const growth = tot - net;
  const top = `<div class="tb"><div class="seg"><button class="${view === "overview" ? "on" : ""}" data-a="pv" data-v="overview">Overview</button><button class="${view === "schedule" ? "on" : ""}" data-a="pv" data-v="schedule">Schedule</button></div><span style="flex:1"></span><span class="ex">Being built</span> <span class="sm-m">6 products on 3 platforms · Valued 22 Oct 2026</span></div>`;
  if (view === "schedule") {
    let sum = 0; const rows = P.schedule.map((sec) => { const a = sec.items.reduce((x, r) => x + r[2], 0); const b = sec.items.reduce((x, r) => x + r[3], 0); sum += b; return `<tr class="grp"><td colspan="2">${sec.sec}</td><td class="r tnum">${rand(a)}</td><td class="r tnum">${rand(b)}</td><td class="r tnum">${((b / a - 1) * 100).toFixed(1).replace(".", ",")}%</td></tr>` + sec.items.map((r) => `<tr><td>${esc(r[1])}</td><td class="sm-m">${esc(r[0])}</td><td class="r tnum">${rand(r[2])}</td><td class="r tnum">${rand(r[3])}</td><td class="r tnum">${((r[3] / r[2] - 1) * 100).toFixed(1).replace(".", ",")}%</td></tr>`).join(""); }).join("");
    return top + `<div class="panel"><table><thead><tr><th>Fund</th><th>Product</th><th class="r">12 Mar 2026</th><th class="r">22 Oct 2026</th><th class="r">Change</th></tr></thead><tbody>${rows}<tr class="grp"><td colspan="3">Total</td><td class="r tnum">${rand(sum)}</td><td></td></tr></tbody></table></div>`;
  }
  const W = 660, H = 210; const maxV = Math.max(...dates.map((_, k) => ser.reduce((a, s) => a + s.v[k], 0))) * 1.08;
  const X = (k) => 36 + (k / (dates.length - 1)) * (W - 72); const Y = (v) => H - 22 - (v / maxV) * (H - 34);
  let base = dates.map(() => 0);
  const areas = ser.map((s) => { const up = s.v.map((v, k) => base[k] + v); const d = `M${up.map((v, k) => `${X(k).toFixed(1)},${Y(v).toFixed(1)}`).join("L")}L${base.map((v, k) => `${X(k).toFixed(1)},${Y(v).toFixed(1)}`).reverse().join("L")}Z`; base = up; return `<path d="${d}" fill="${s.color}" opacity=".92"/>`; }).join("");
  const grid = [0, 0.5, 1].map((t) => { const v = maxV * t; return `<line x1="36" x2="${W - 14}" y1="${Y(v)}" y2="${Y(v)}" stroke="#BFBFB7"/><text x="30" y="${Y(v) + 4}" text-anchor="end" font-size="10" fill="#5E5D56">${v.toFixed(0)}m</text>`; }).join("");
  const xl = dates.map((d, k) => `<text x="${X(k)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="#5E5D56">${d}</text>`).join("");
  let acc = 0; const stops = P.series.map((s) => { const a = acc; acc += (s.v[n - 1] / tot) * 360; return `${s.color} ${a}deg ${acc}deg`; }).join(",");
  return top + `<div class="panel kpis"><div class="kpi big"><small>Total portfolio value</small><b>R ${tot.toFixed(2).replace(".", ",")}m</b><small style="color:var(--ok);font-weight:600">+R ${((tot - prev) * 1000).toFixed(0)}k since the last review</small></div><div class="kpi"><small>Net invested</small><b>R ${net.toFixed(2).replace(".", ",")}m</b></div><div class="kpi"><small>Growth after fees</small><b>+R ${growth.toFixed(2).replace(".", ",")}m</b></div><div class="kpi"><small>Return a year</small><b>9,4%</b></div><div class="kpi"><small>Income, 12 months</small><b>R 261k</b></div></div>
  <div style="display:grid;grid-template-columns:1fr 280px;gap:13px"><div class="panel pad"><div style="display:flex;align-items:center;margin-bottom:6px"><h4 class="ptitle" style="margin:0">Value over time</h4><span style="flex:1"></span><div class="seg">${[["all", "All"], ["5", "5 years"], ["3", "3 years"]].map(([k, l]) => `<button class="${seg === k ? "on" : ""}" data-a="range" data-v="${k}">${l}</button>`).join("")}</div></div><svg viewBox="0 0 ${W} ${H}" style="width:100%;display:block">${grid}${areas}${xl}</svg><div class="lgd">${P.series.map((s) => `<span><i style="background:${s.color}"></i>${s.name}</span>`).join("")}</div></div>
  <div class="panel pad"><h4 class="ptitle">Where it sits</h4><div style="display:flex;justify-content:center;margin:6px 0 10px"><div class="donut" style="background:conic-gradient(${stops})"><span>R ${tot.toFixed(1).replace(".", ",")}m</span></div></div>${P.series.map((s) => `<div style="display:flex;justify-content:space-between;font-size:12.5px;padding:2px 0"><span><i style="display:inline-block;width:9px;height:9px;border-radius:2px;margin-right:6px;background:${s.color}"></i>${s.name}</span><b class="tnum" style="font-weight:600">${Math.round((s.v[n - 1] / tot) * 100)}%</b></div>`).join("")}</div></div>`;
}

/* ---------- tasks + processes ---------- */
function pgTasks(i) {
  const scope = i.f.scope || "mine";
  const list = openTasks().filter((t) => scope === "all" || t.s.assignee === "np" || (scope === "mine" && !t.s.assignee));
  const sorted = list.sort((a, b) => (b.s.overdue ? 1 : 0) - (a.s.overdue ? 1 : 0));
  return pageHead("Tasks", "Every step waiting on you. The list the team opens every morning.", `<div class="seg"><button class="${scope === "mine" ? "on" : ""}" data-a="scope" data-v="mine">Mine and unclaimed</button><button class="${scope === "all" ? "on" : ""}" data-a="scope" data-v="all">Whole team</button></div>`) +
  `<div class="stats"><div class="stat"><span class="si bad">${ic("alarm")}</span><div><b>${overdue()}</b><small>overdue</small></div></div><div class="stat"><span class="si ac">${ic("hand-grabbing")}</span><div><b>${openTasks().filter((t) => t.s.state === "ready").length}</b><small>unclaimed</small></div></div><div class="stat"><span class="si warn">${ic("pause-circle")}</span><div><b>${openTasks().filter((t) => t.s.state === "hold").length}</b><small>with someone outside</small></div></div><div class="stat"><span class="si ok">${ic("list-checks")}</span><div><b>${openTasks().length}</b><small>open across the firm</small></div></div></div>
  <div class="panel"><table><thead><tr><th>Step</th><th>Client</th><th>Process</th><th>Assigned to</th><th>Due</th><th>State</th></tr></thead><tbody>${sorted.map(({ p, s }) => `<tr class="click" data-a="openP" data-id="${p.id}"><td><b class="nm">${s.name}</b></td><td>${esc(cl(p.clientId).name)}</td><td>${p.type}</td><td>${s.assignee ? who(s.assignee).short : `<span class="sm-m">Nobody yet</span>`}</td><td>${s.due || "-"}</td><td>${stepPill(s)}</td></tr>`).join("")}</tbody></table></div>`;
}
function pgProcess(i, id) {
  const p = S.processes.find((x) => x.id === id); if (!p) return ""; const c = cl(p.clientId); const cur = curStep(p);
  const sel = i.f.step != null ? p.steps[+i.f.step] : cur || p.steps[p.steps.length - 1];
  const fld = (f, idx, editable) => {
    const b = editable ? "" : "disabled";
    if (f.t === "yn") return `<label>${f.label}<div class="yn">${["Yes", "No"].map((y) => `<button class="${f.v === y ? "on" : ""}" ${b} data-a="fv" data-p="${p.id}" data-k="${f.k}" data-v="${y}">${y}</button>`).join("")}</div></label>`;
    if (f.t === "select") return `<label>${f.label}<select class="field" ${b} data-field="${p.id}:${f.k}">${f.opts.map((o) => `<option ${o === f.v ? "selected" : ""}>${o}</option>`).join("")}</select></label>`;
    if (f.t === "staff") return `<label>${f.label}<select class="field" ${b} data-field="${p.id}:${f.k}">${TEAM.map((t) => `<option value="${t.id}" ${t.id === f.v ? "selected" : ""}>${t.name}</option>`).join("")}</select></label>`;
    return `<label>${f.label}<input class="field" ${b} data-field="${p.id}:${f.k}" value="${esc(f.t === "money" ? rand(f.v) : f.v)}"/></label>`;
  };
  const isCur = sel === cur;
  return `<div class="tb" style="margin-bottom:9px"><button class="back" data-a="open" data-id="${c.id}" data-tab="processes">${ic("arrow-left")}${esc(c.name)}</button></div>
  ${pageHead(p.type, `${esc(c.name)} · Owner ${who(p.owner).name} · Started ${p.started}`, cur ? stepPill(cur) : `<span class="pill ok">Complete</span>`)}
  <div style="display:grid;grid-template-columns:300px 1fr;gap:13px"><div class="panel">${p.steps.map((s, k) => `<button class="pstep ${s === sel ? "cur" : ""} ${s.state === "done" ? "done" : ""} ${["progress", "ready", "hold"].includes(s.state) ? "prog" : ""} ${s.state === "blocked" ? "block" : ""}" data-a="pickStep" data-v="${k}"><span class="sn">${s.state === "done" ? ic("check") : k + 1}</span><span class="nm">${s.name}</span></button>`).join("")}</div>
  <div class="panel pad"><div style="display:flex;align-items:center;gap:9px;margin-bottom:11px"><h4 class="ptitle" style="margin:0;font-size:17px">${sel.name}</h4>${stepPill(sel)}<span style="flex:1"></span>${isCur && sel.state !== "ready" ? `<span class="sm-m">Assigned to</span><select class="field" style="height:29px" data-assign="${p.id}">${TEAM.map((t) => `<option value="${t.id}" ${t.id === sel.assignee ? "selected" : ""}>${t.name}</option>`).join("")}</select>` : ""}</div>
    ${sel.fields.length ? `<div class="form">${sel.fields.map((f, k) => fld(f, k, isCur)).join("")}</div>${sel.fields.some((f) => f.col) ? `<p class="sm-m" style="margin:11px 0 0">${ic("table")} These answers fill the tracking schedule. Nobody types it twice.</p>` : ""}` : `<p class="sm-m" style="margin:0">${sel.state === "done" ? `Completed by ${who(sel.doneBy).short}.` : sel.state === "blocked" ? "Waiting on an earlier step. It opens by itself the moment that step is finished." : sel.state === "hold" ? "Sitting with someone outside the firm. The clock is stopped." : "Tick this off when it's done, and the next step opens for the next person."}</p>`}
    <div style="display:flex;gap:8px;margin-top:14px">${isCur && sel.state === "ready" ? `<button class="btn acc" data-a="pickup" data-id="${p.id}">${ic("hand-grabbing")}Pick this up</button>` : ""}${isCur && sel.state !== "ready" ? `<button class="btn acc" data-a="complete" data-id="${p.id}">${ic("check")}Complete step</button>` : ""}${isCur && sel.state === "progress" ? `<button class="btn sec" data-a="hold" data-id="${p.id}">${ic("pause")}Put on hold</button>` : ""}${isCur && sel.state === "hold" ? `<button class="btn sec" data-a="resume" data-id="${p.id}">Resume</button>` : ""}</div></div></div>`;
}

/* ---------- contacts, missing, signatures, emails ---------- */
function pgContacts(i) {
  const q = (i.f.q || "").toLowerCase(); const ppl = [];
  S.clients.forEach((c) => c.persons.forEach((p) => { const e = ppl.find((x) => x.name === p.name); if (e) e.links.push(`${p.role}, ${c.name}`); else ppl.push({ name: p.name, links: [`${p.role}, ${c.name}`], cid: c.id }); }));
  const list = ppl.filter((p) => !q || p.name.toLowerCase().includes(q));
  return pageHead("Contacts", "One person, stored once, linked to every client they touch.") + `<div class="tb"><input class="field" style="flex:1" data-bind="f.q" value="${esc(i.f.q || "")}" placeholder="Filter by name..."/><span class="count">${list.length} people</span></div><div class="panel"><table><thead><tr><th>Person</th><th>Linked to</th></tr></thead><tbody>${list.map((p) => `<tr class="click" data-a="open" data-id="${p.cid}" data-tab="contacts"><td><b class="nm">${esc(p.name)}</b></td><td>${p.links.map(esc).join(" · ")}</td></tr>`).join("")}</tbody></table></div>`;
}
function pgMissing(i) {
  const cat = i.f.cat || ""; const owner = i.f.owner || "";
  const rows = S.clients.map((c) => ({ c, g: gaps(c).filter((g) => !cat || g.kind === cat) })).filter((r) => r.g.length && (!owner || r.c.owner === owner)).sort((a, b) => a.c.name.localeCompare(b.c.name));
  const all = rows.flatMap((r) => r.g); const miss = all.filter((g) => g.tone === "bad").length; const exp = all.length - miss;
  return pageHead("Missing Docs", "What are we missing, right now, across the whole firm?") +
  `<div class="stats"><div class="stat"><span class="si bad">${ic("file-x")}</span><div><b>${miss}</b><small>documents missing</small></div></div><div class="stat"><span class="si warn">${ic("clock-countdown")}</span><div><b>${exp}</b><small>documents expired</small></div></div><div class="stat"><span class="si ac">${ic("users-three")}</span><div><b>${rows.length}</b><small>clients with gaps</small></div></div></div>
  <div class="tb"><select class="field" data-bind="f.cat"><option value="">All documents</option><option ${cat === "FICA" ? "selected" : ""}>FICA</option><option ${cat === "Compliance" ? "selected" : ""}>Compliance</option></select><select class="field" data-bind="f.owner"><option value="">All owners</option>${TEAM.slice(0, 2).map((t) => `<option value="${t.id}" ${owner === t.id ? "selected" : ""}>${t.name}</option>`).join("")}</select></div>
  ${rows.length ? `<div class="panel"><table><thead><tr><th style="width:250px">Client</th><th style="width:90px">Owner</th><th>What's outstanding</th></tr></thead><tbody>${rows.map((r) => `<tr class="click" data-a="open" data-id="${r.c.id}" data-tab="${r.g.every((g) => g.kind === "Compliance") ? "compliance" : "fica"}"><td><b class="nm">${esc(r.c.name)}</b><span class="ty ${r.c.type}">${r.c.type}</span></td><td>${who(r.c.owner).short}</td><td><div class="chips">${r.g.map(chip).join("")}</div></td></tr>`).join("")}</tbody></table></div>` : `<div class="panel win">${ic("seal-check")}<h3 style="margin-top:8px">Nothing missing</h3><p class="sm-m">Every required document is on file.</p></div>`}`;
}
function pgSignatures(i) {
  const tone = { signed: "ok", viewed: "ac", sent: "neu" };
  return pageHead("Signatures", "Send a document for signing from inside the client file. The signed copy files itself.") + `<div class="panel"><table><thead><tr><th>Client</th><th>Document</th><th>Signers</th><th>Sent</th><th>State</th></tr></thead><tbody>${S.signatures.map((s) => `<tr><td><b class="nm">${esc(s.client)}</b></td><td>${esc(s.doc)}</td><td><div class="chips">${s.signers.map(([n, st]) => `<span class="pill ${tone[st]}">${esc(n)}: ${st}</span>`).join("")}</div></td><td>${s.sent}</td><td><span class="pill ${s.status === "Complete" ? "ok" : "warn"}">${s.status}</span></td></tr>`).join("")}</tbody></table></div>`;
}
function pgEmails(i) {
  return pageHead("Emails", "Everything the system sent, to whom, and what happened to it.") + `<div class="panel"><table><thead><tr><th>To</th><th>Subject</th><th>Kind</th><th>Sent</th><th>State</th></tr></thead><tbody>${S.emails.map((e) => `<tr><td><b class="nm">${esc(e.to)}</b></td><td>${esc(e.subject)}</td><td>${e.kind}</td><td>${e.when}</td><td><span class="pill ${e.status === "Opened" ? "ac" : "ok"}">${e.status}</span></td></tr>`).join("")}</tbody></table></div>`;
}

/* ---------- tracking schedule ---------- */
const SUB_COLS = ["Product Provider", "Type", "Amount", "Source of Funds", "In Line", "Unusual", "PEP", "Comparison Quotes", "Mandate vs Risk", "Signed Quotes", "Initial Fees", "Annual Fees", "Financial Advisor", "Recorded By"];
function pgTracking(i) {
  const sheet = i.f.sheet || "Subscription"; const view = i.f.tview || "sheet";
  const sw = `<div class="tb"><select class="field" data-bind="f.sheet">${["Subscription", "Switch", "Redemption"].map((x) => `<option ${sheet === x ? "selected" : ""}>${x}</option>`).join("")}</select><div class="seg"><button class="${view === "sheet" ? "on" : ""}" data-a="tview" data-v="sheet">The sheet</button><button class="${view === "sum" ? "on" : ""}" data-a="tview" data-v="sum">Production summary</button></div><span style="flex:1"></span><button class="btn sec sm" data-a="export">${ic("download-simple")}Export to Excel</button></div>`;
  const hd = pageHead("Tracking schedule", "It builds itself from the work. Nobody types this sheet.");
  if (view === "sum") {
    const by = TEAM.slice(0, 2).map((t) => { const rows = S.tracking.filter((r) => r.vals["Financial Advisor"] === t.name); const total = rows.reduce((a, r) => a + (r.vals.Amount || 0), 0); return { t, total, n: rows.length, target: t.id === "np" ? 6000000 : 2500000 }; });
    return hd + sw + `<div class="stats">${by.map((b) => `<div class="stat"><span class="av">${initials(b.t.name)}</span><div><b>${rand(b.total)}</b><small>${b.t.short}, ${b.n} transactions</small></div></div>`).join("")}</div><div class="panel"><table class="keep"><thead><tr><th>Advisor</th><th class="r">New money, this financial year</th><th class="r">Target</th><th>Progress</th><th class="r">%</th></tr></thead><tbody>${by.map((b) => `<tr><td><b class="nm">${b.t.name}</b></td><td class="r tnum">${rand(b.total)}</td><td class="r tnum">${rand(b.target)}</td><td><div class="barw"><span style="width:${Math.min(100, (b.total / b.target) * 100)}%"></span></div></td><td class="r tnum">${Math.round((b.total / b.target) * 100)}%</td></tr>`).join("")}</tbody></table></div>`;
  }
  if (sheet === "Switch") return hd + sw + `<div class="sheet"><table><thead><tr><th>Client</th><th>Date</th><th>Provider</th><th>From Fund</th><th>To Fund</th><th>Switch Value</th><th>Reason</th><th>Advisor</th><th>Status</th></tr></thead><tbody>${S.switches.map((r) => `<tr><td><b class="nm">${r.client}</b></td><td>${r.date}</td><td>${r.provider}</td><td>${r.from}</td><td>${r.to}</td><td class="tnum">${rand(r.value)}</td><td>${r.reason}</td><td>${r.adv}</td><td>${r.status}</td></tr>`).join("")}</tbody></table></div>`;
  if (sheet === "Redemption") return hd + sw + `<div class="sheet"><table><thead><tr><th>Client</th><th>Date</th><th>Provider</th><th>Amount</th><th>Full or Partial</th><th>Tax Directive</th><th>Advisor</th><th>Status</th></tr></thead><tbody>${S.redemptions.map((r) => `<tr><td><b class="nm">${r.client}</b></td><td>${r.date}</td><td>${r.provider}</td><td class="tnum">${rand(r.amount)}</td><td>${r.kind}</td><td>${r.directive}</td><td>${r.adv}</td><td>${r.status}</td></tr>`).join("")}</tbody></table></div>`;
  return hd + sw + `<div class="sheet"><table><thead><tr><th>Client</th><th>Date</th>${SUB_COLS.map((c) => `<th>${c}</th>`).join("")}<th>Status</th></tr></thead><tbody>${S.tracking.map((r) => `<tr class="${r.fresh ? "fresh" : ""}"><td><b class="nm">${esc(r.client)}</b></td><td>${r.date}</td>${SUB_COLS.map((c) => { const v = r.vals[c]; return `<td class="${c === "Amount" ? "tnum" : ""}">${v == null ? `<span class="nil">-</span>` : c === "Amount" ? rand(v) : esc(v)}</td>`; }).join("")}<td><span class="pill ${r.status === "Complete" ? "ok" : "neu"}">${r.status}</span></td></tr>`).join("")}</tbody></table></div>`;
}

/* ---------- process types ---------- */
const CHAINS = [["Onboarding sign-off", "starts an annual review"], ["A living annuity subscription", "suggests a yearly income review"], ["A month after a redemption pays out", "review the client"], ["An annual review", "books the next one"]];
function pgTypes(i, sel) {
  const types = [...new Set(S.processes.map((p) => p.type))]; const t = sel || "Subscription"; const p = S.processes.find((x) => x.type === t);
  return pageHead("Process types", "How your firm does each thing. Set once, in your words, and changed whenever you like.") +
  `<div style="display:grid;grid-template-columns:230px 1fr 290px;gap:13px"><div class="panel">${types.map((x) => `<button class="pstep ${x === t ? "cur" : ""}" data-a="nav" data-to="types/${x}"><span class="nm">${x}</span></button>`).join("")}</div>
  <div class="panel"><table><thead><tr><th>Step</th><th>Default person</th><th>Fills in schedule columns</th></tr></thead><tbody>${p.steps.map((s, k) => `<tr><td><b class="nm">${k + 1}. ${s.name}</b></td><td>${who(s.who).short}</td><td>${s.fields.filter((f) => f.col).map((f) => `<span class="pill ac" style="margin:1px">${f.col}</span>`).join("") || `<span class="sm-m">-</span>`}</td></tr>`).join("")}</tbody></table></div>
  <div class="panel pad"><h4 class="ptitle">What starts itself</h4>${CHAINS.map(([a, b]) => `<div style="padding:7px 0;border-top:1px solid var(--line);font-size:12.5px">${ic("lightning")} <b style="font-weight:600">${a}</b> ${b}.</div>`).join("")}</div></div>`;
}
function pgAudit(i) {
  const q = (i.f.q || "").toLowerCase(); const list = S.audit.filter((a) => !q || (a.what + a.on + who(a.who).name).toLowerCase().includes(q));
  return pageHead("Audit Log", "Who did what, and when. Nobody can edit it.") + `<div class="tb"><input class="field" style="flex:1" data-bind="f.q" value="${esc(i.f.q || "")}" placeholder="Filter by person, client or action..."/><span class="count">${list.length} entries</span></div><div class="panel"><table><thead><tr><th>When</th><th>Who</th><th>What</th><th>On</th></tr></thead><tbody>${list.map((a) => `<tr class="${a.when === "Just now" ? "fresh" : ""}"><td style="white-space:nowrap">${a.when}</td><td><span class="av" style="width:22px;height:22px;font-size:9px;margin-right:6px">${initials(who(a.who).name)}</span>${who(a.who).name}</td><td>${esc(a.what)}</td><td>${esc(a.on)}</td></tr>`).join("")}</tbody></table></div>`;
}
function pgDocs(i) {
  const ch = [["Start here", "What the system is, the map of every screen, and the words we use for things."], ["Clients", "Finding a client, filtering, and what the badges mean."], ["The client record", "Every tab of the file, and who can see what."], ["FICA", "What each client and each trustee or director needs on file."], ["Processes and tasks", "How a step becomes yours, and what on hold does to the clock."], ["Missing Docs", "The firm-wide gaps, and how to clear them."], ["Client requests", "Sending a secure link, and reviewing what comes back."], ["Settings and the team", "People, permissions and the document catalogue."]];
  return pageHead("Documentation", "The manual for your system, written for your team, inside the system.") + `<div class="grid2">${ch.map(([a, b]) => `<div class="panel pad"><h4 class="ptitle">${ic("book-open-text")} ${a}</h4><span class="sm-m">${b}</span></div>`).join("")}</div>`;
}

/* ---------- settings ---------- */
function pgSettings(i, tab) {
  const tabs = [["team", "People"], ["perms", "Permissions"], ["catalogue", "Documents"], ["data", "Your data"]];
  const bar = `<div class="tabs">${tabs.map(([k, l]) => `<button class="tab ${tab === k ? "on" : ""}" data-a="nav" data-to="settings/${k}">${l}</button>`).join("")}</div>`;
  let body = "";
  if (tab === "team") body = `<div class="panel"><table><thead><tr><th>Person</th><th>Job</th><th>Preset</th><th>Open work</th></tr></thead><tbody>${TEAM.map((t) => `<tr class="click" data-a="nav" data-to="settings/perms"><td><span class="av" style="margin-right:8px">${initials(t.name)}</span><b style="font-weight:700;color:var(--text)">${t.name}</b></td><td>${t.job}</td><td><span class="pill neu">${t.preset}</span></td><td class="tnum">${openTasks().filter((x) => x.s.assignee === t.id).length}</td></tr>`).join("")}</tbody></table></div>`;
  if (tab === "perms") { const ps = ["Owner", "Advisor", "Administrator", "Compliance"]; body = `<div class="panel"><table class="perms"><thead><tr><th>Permission</th>${ps.map((p) => `<th style="text-align:center">${p}</th>`).join("")}</tr></thead><tbody>${S.perms.map((r, k) => `<tr><td><b class="nm">${r.key} ${r.sens ? `<span class="pill warn" style="height:17px;font-size:9.5px">${ic("shield-warning")}Sensitive</span>` : ""}</b><small>${r.desc}</small></td>${ps.map((p) => `<td style="text-align:center"><button data-a="perm" data-k="${k}" data-p="${p}" aria-label="Toggle"><span class="sw ${r.grid[p] ? "on" : ""}"></span></button></td>`).join("")}</tr>`).join("")}</tbody></table></div>`; }
  if (tab === "catalogue") body = `<div class="panel"><table><thead><tr><th>Document</th><th>Kind</th><th>Stays valid for</th><th style="text-align:center">Required</th><th style="text-align:center">Chase on Missing Docs</th></tr></thead><tbody>${S.catalogue.map((r, k) => `<tr><td><b class="nm">${r.doc}</b></td><td>${r.kind}</td><td>${r.valid}</td><td style="text-align:center"><button data-a="cat" data-k="${k}" data-f="req"><span class="sw ${r.req ? "on" : ""}"></span></button></td><td style="text-align:center"><button data-a="cat" data-k="${k}" data-f="chase"><span class="sw ${r.chase ? "on" : ""}"></span></button></td></tr>`).join("")}</tbody></table></div>`;
  if (tab === "data") body = `<div class="grid2">${[["cloud-check", "In your accounts", "The database, the hosting and the code repository sit in accounts in your firm's name."], ["globe-hemisphere-west", "Where it is held", "Ireland, under GDPR. POPIA s72 covers the transfer."], ["trash-simple", "Nothing is destroyed", "Removing something hides it. Records stay for the FICA retention period, five years."], ["download-simple", "Take it with you", "A full export of your database, whenever you ask."]].map(([a, b, c]) => `<div class="panel pad"><h4 class="ptitle">${ic(a)} ${b}</h4><span>${c}</span></div>`).join("")}</div>`;
  return pageHead("Settings", "How your firm is set up. You control it.") + bar + body;
}

/* ---------- onboarding wizard ---------- */
function pgOnboard(i) {
  const w = (i.w = i.w || { step: 0, type: "Individual", name: "Dube, Nomsa", persons: [], fica: {}, comp: {} });
  const names = ["Client", "People", "FICA", "Compliance", "Review"];
  const steps = `<div class="wsteps">${names.map((n, k) => `<div class="ws ${k === w.step ? "on" : k < w.step ? "dn" : ""}"><b>${k < w.step ? ic("check") : k + 1}</b>${n}</div>`).join("")}</div>`;
  const fdocs = [idDoc(w.type), "Proof of address", "Proof of banking", "Proof of tax"]; const cdocs = COMPLIANCE_DOCS.slice(0, 5).map((d) => d[0]);
  let b = "";
  if (w.step === 0) b = `<h4 class="ptitle">What kind of client is this?</h4><div class="tiles">${[["Individual", "user"], ["Trust", "tree-structure"], ["Company", "buildings"]].map(([t, ico]) => `<button class="tile ${w.type === t ? "on" : ""}" data-a="wType" data-v="${t}">${ic(ico)}<b>${t}</b></button>`).join("")}</div><div class="form" style="margin-top:13px"><label>Name<input class="field" data-bind="w.name" value="${esc(w.name)}"/></label><label>Owner<select class="field"><option>Nadia Pretorius</option><option>Thandi Mokoena</option></select></label></div>`;
  if (w.step === 1) b = `<h4 class="ptitle">Who is connected to this client?</h4><p class="sm-m" style="margin:0 0 9px">Each person is stored once, and gets their own FICA checklist.</p>${w.persons.map((p) => `<div class="chk"><span class="ci ac">${ic("user")}</span><div class="t">${esc(p.name)}</div><span class="sp"></span><span class="pill neu">${p.role}</span></div>`).join("")}<div class="tb" style="margin-top:9px"><input class="field" style="flex:1" data-bind="w.pn" value="${esc(w.pn ?? (w.type === "Individual" ? "Sam Dube" : "Sam Dube"))}"/><select class="field" data-bind="w.pr">${["Spouse", "Trustee", "Director", "Beneficiary"].map((r) => `<option ${w.pr === r ? "selected" : ""}>${r}</option>`).join("")}</select><button class="btn sec" data-a="wAddP">${ic("plus")}Add person</button></div>`;
  if (w.step === 2) b = `<h4 class="ptitle">FICA documents</h4>${fdocs.map((d) => { const on = w.fica[d]; return `<div class="chk ${on ? "is-ok" : "is-bad"}"><span class="ci ${on ? "ok" : "bad"}">${ic(on ? "check" : "x")}</span><div class="t">${d}</div><span class="sp"></span>${on ? `<span class="pill ok">Held</span>` : `<button class="btn acc sm" data-a="wFica" data-v="${d}">${ic("paperclip")}Attach</button>`}</div>`; }).join("")}`;
  if (w.step === 3) b = `<h4 class="ptitle">Take-on checklist</h4>${cdocs.map((d) => { const on = w.comp[d]; return `<div class="chk ${on ? "is-ok" : "is-warn"}"><span class="ci ${on ? "ok" : "warn"}">${ic(on ? "check" : "circle-dashed")}</span><div class="t">${d}</div><span class="sp"></span>${on ? `<span class="pill ok">Done</span>` : `<button class="btn sec sm" data-a="wComp" data-v="${d}">Mark done</button>`}</div>`; }).join("")}`;
  if (w.step === 4) { const fh = fdocs.filter((d) => w.fica[d]).length; const ch = cdocs.filter((d) => w.comp[d]).length; b = `<h4 class="ptitle">Ready to activate ${esc(w.name)}</h4><div class="kv" style="margin-bottom:9px"><span>Type</span><b style="font-weight:600">${w.type}</b><span>People</span><b style="font-weight:600">${w.persons.map((p) => p.name).join(", ") || "None"}</b><span>FICA</span><b style="font-weight:600">${fh} of ${fdocs.length} held</b><span>Take-on</span><b style="font-weight:600">${ch} of ${cdocs.length} done</b></div><p class="sm-m" style="margin:0">Anything still outstanding goes straight onto Missing Docs. Nobody has to remember it.</p>`; }
  return pageHead("Onboard a client", "Everything saves as you go.") + `<div class="wiz">${steps}<div class="panel pad">${b}</div><div class="wfoot"><button class="btn sec" ${w.step ? "" : "disabled"} data-a="wBack">Back</button>${w.step < 4 ? `<button class="btn pri" data-a="wNext">${w.step === 0 ? "Create and continue" : "Continue"}${ic("arrow-right")}</button>` : `<button class="btn acc" data-a="wFinish">${ic("check")}Finish and activate</button>`}</div></div>`;
}

/* ---------- import ---------- */
function pgImport(i) {
  const s = i.f.st || 0;
  const map = [["Client Name", "Name"], ["ID / Reg No", "ID or registration number"], ["E-mail", "Email"], ["Cell", "Phone"], ["Advisor", "Owner"], ["FICA date", "FICA: proof of address date"]];
  const rows = [["Hartley, Grace", "ID 7304...", "New", "ok"], ["Mthembu, Sizwe", "ID 8011...", "New", "ok"], ["Cape Vines Trust", "IT 2231/2017", "New", "ok"], ["Van der Merwe, Pieter", "ID 6708...", "Already a client, skipped", "warn"]];
  const steps = `<div class="wsteps">${["Upload", "Match columns", "Review", "Done"].map((n, k) => `<div class="ws ${k === s ? "on" : k < s ? "dn" : ""}"><b>${k < s ? ic("check") : k + 1}</b>${n}</div>`).join("")}</div>`;
  let b = "";
  if (s === 0) b = `<div class="chk"><span class="ci ac">${ic("microsoft-excel-logo")}</span><div><div class="t">Client list 2026 FINAL v3.xlsx</div><div class="m">4 clients, 6 columns</div></div><span class="sp"></span><button class="btn acc" data-a="impNext">Use this file</button></div>`;
  if (s === 1) b = `<h4 class="ptitle">We matched your columns. Change any that are wrong.</h4><table><thead><tr><th>Your spreadsheet</th><th>Goes into</th></tr></thead><tbody>${map.map(([a, c]) => `<tr><td>${a}</td><td><span class="pill ac">${ic("check")}${c}</span></td></tr>`).join("")}</tbody></table>`;
  if (s === 2) b = `<h4 class="ptitle">Nothing is written until you say so.</h4><table><thead><tr><th>Client</th><th>Reference</th><th>Result</th></tr></thead><tbody>${rows.map(([a, c, d, t]) => `<tr><td><b class="nm">${a}</b></td><td>${c}</td><td><span class="pill ${t}">${d}</span></td></tr>`).join("")}</tbody></table>`;
  if (s === 3) b = `<div class="win">${ic("seal-check")}<h3 style="margin-top:8px">3 clients imported</h3><p class="sm-m">1 skipped because they were already on file.</p><button class="btn pri" data-a="nav" data-to="clients">See clients</button></div>`;
  const foot = s === 1 || s === 2 ? `<div class="wfoot"><button class="btn sec" data-a="impBack">Back</button><button class="btn pri" data-a="${s === 2 ? "impRun" : "impNext"}">${s === 2 ? "Import 3 clients" : "Continue"}</button></div>` : "";
  return pageHead("Import clients", "Your spreadsheets come with you.") + `<div class="wiz">${steps}<div class="panel pad">${b}</div>${foot}</div>`;
}

/* ---------- the agent (an example, not live software) ---------- */
function pgAgent(i) {
  const a = (i.ag = i.ag || { msgs: [], draft: null, busy: false, sent: false });
  const cli = cl("c2");
  return pageHead("Assistant", `An example of what we build once the foundation is in. It works from the same records, and a person approves.`, `<span class="ex">Example</span>`) +
  `<div class="agent"><div class="panel chat"><div class="msgs">${a.msgs.length ? a.msgs.map((m) => m.t === "tool" ? `<div class="tool">${ic("circle-notch")}${esc(m.x)}</div>` : `<div class="msg ${m.t}">${m.x}</div>`).join("") : `<p class="sm-m" style="margin:0">Ask it about a client, or for something to be prepared. Pick one below.</p>`}</div>
    <div class="suggs"><button class="btn sec sm" ${a.busy ? "disabled" : ""} data-a="ag1">What's outstanding on the Van der Merwe trust? Chase it.</button><button class="btn sec sm" ${a.busy ? "disabled" : ""} data-a="ag2">Get me ready for Pieter's review.</button></div></div>
  <div class="panel pad" style="overflow:auto">${a.draft ? `<h4 class="ptitle">${a.sent ? "Sent" : "Waiting for your approval"}</h4><span class="pill ${a.sent ? "ok" : "warn"}">${a.sent ? "Approved by Nadia" : "Nothing goes out until you approve"}</span><div class="sh">Request to ${esc(cli.persons[0].name)}</div><div class="chips" style="margin-bottom:9px">${a.draft.map((d) => `<span class="pill neu">${esc(d)}</span>`).join("")}</div><div class="sm-m" style="margin-bottom:11px">Secure link, reminder after 3 days, and answers wait for your team to accept.</div>${a.sent ? "" : `<button class="btn acc" data-a="agApprove">${ic("check")}Approve and send</button>`}` : `<h4 class="ptitle">Drafts</h4><span class="sm-m">Anything it prepares waits here for a person.</span>`}</div></div>`;
}
function agRun(i, user, seq, done) {
  const a = i.ag; a.busy = true; a.msgs.push({ t: "u", x: user }); render(i);
  seq.forEach((m, k) => setTimeout(() => { a.msgs.push(m); render(i); const box = i.el.querySelector(".msgs"); if (box) box.scrollTop = box.scrollHeight; if (k === seq.length - 1) { a.busy = false; if (done) done(); render(i); } }, 750 * (k + 1)));
}

/* ---------- modals ---------- */
function modal(i) {
  const m = i.modal; let inner = "";
  if (m.k === "req") {
    const c = cl(m.id); const opts = gaps(c);
    if (m.stage === 0) inner = `<h3>Request from ${esc(c.name)}</h3><p class="sm-m" style="margin:3px 0 11px">Every document this client still owes is already ticked.</p>${opts.length ? opts.map((g, k) => `<label class="chk" style="cursor:pointer;margin-bottom:5px"><input type="checkbox" checked disabled/><div class="t">${esc(g.label)}</div><span class="sp"></span><span class="pill ${g.tone}">${g.kind}</span></label>`).join("") : `<div class="chk is-ok"><div class="t">Nothing outstanding on this client.</div></div>`}<div class="sm-m" style="margin-top:8px">${ic("clock")} Reminds them automatically after 3 days.</div><div class="wfoot"><button class="btn sec" data-a="mClose">Cancel</button><button class="btn acc" ${opts.length ? "" : "disabled"} data-a="reqSend" data-id="${c.id}">${ic("paper-plane-tilt")}Create and email</button></div>`;
  }
  if (m.k === "client") {
    const r = S.requests.find((x) => x.id === m.id); const c = cl(r.clientId);
    inner = `<div style="display:flex;gap:22px;align-items:center"><div class="phone"><div class="ph-top">${CONFIG.firm.toUpperCase()}</div><div class="ph-in"><b style="font-weight:700;font-size:14px;color:var(--text)">${esc(r.title)}</b><p style="margin:4px 0 8px;color:var(--muted)">Hi ${esc(c.name.split(",")[1] || c.persons[0]?.name || "there")}. A few things we need from you.</p>${r.docs.map((d) => `<div class="up">${ic(m.done ? "check-circle" : "camera")}${esc(d)}</div>`).join("")}<button class="btn acc sm" style="width:100%;justify-content:center;margin-top:10px" data-a="reqSubmit" data-id="${r.id}">Submit</button></div></div>
    <div><h3>What your client sees</h3><p style="margin:7px 0">A secure link, on their phone. No login. They can take a photo of a document. Answers save as they type.</p><p class="sm-m" style="margin:0 0 12px">Press Submit on the phone to play the client's side.</p><button class="btn sec" data-a="mClose">Close</button></div></div>`;
  }
  if (m.k === "review") {
    const r = S.requests.find((x) => x.id === m.id);
    inner = `<h3>Review what came back</h3><p class="sm-m" style="margin:3px 0 11px">Files wait here. Nothing reaches the client's record until you accept it.</p>${r.docs.map((d) => `<div class="chk"><span class="ci ac">${ic("file-text")}</span><div class="t">${esc(d)}</div><span class="sp"></span><span class="pill ac">Waiting</span></div>`).join("")}<div class="wfoot"><button class="btn sec" data-a="mClose">Later</button><button class="btn acc" data-a="reqAccept" data-id="${r.id}">${ic("check")}Accept all</button></div>`;
  }
  if (m.k === "start") {
    const c = cl(m.id);
    inner = `<h3>Start a process for ${esc(c.name)}</h3><p class="sm-m" style="margin:3px 0 11px">Every step is created at once, and the first one lands on the right person's list.</p><div class="tiles">${[["Annual Client Review", "calendar-check"], ["Annual Income Review", "percent"]].map(([t, ico]) => `<button class="tile" data-a="pStartGo" data-id="${c.id}" data-t="${t}">${ic(ico)}<b>${t}</b></button>`).join("")}</div><div class="wfoot"><button class="btn sec" data-a="mClose">Cancel</button></div>`;
  }
  return `<div class="ov" data-a="ovClose"><div class="dlg" data-stop="1">${inner}</div></div>`;
}

/* ---------- actions ---------- */
const A = {
  nav: (i, d) => go(i, d.to),
  open: (i, d) => go(i, `record/${d.id}/${d.tab || "overview"}`),
  openP: (i, d) => go(i, `process/${d.id}`),
  tab: (i, d) => { const f = i.f; i.route = `record/${d.id}/${d.tab}`; i.f = {}; render(i); },
  scope: (i, d) => { i.f.scope = d.v; render(i); },
  tview: (i, d) => { i.f.tview = d.v; render(i); },
  folder: (i, d) => { i.f.folder = d.f; render(i); },
  pv: (i, d) => { i.f.pv = d.v; render(i); },
  range: (i, d) => { i.f.range = d.v; render(i); },
  pickStep: (i, d) => { i.f.step = d.v; render(i); },
  export: (i) => toast(i, "Exported in your original column order."),
  viewF: (i, d) => { i.f.folder = "Compliance"; i.route = `record/${d.c}/documents`; render(i); },
  mClose: (i) => { i.modal = null; render(i); },
  ovClose: (i, d, e) => { if (e.target.classList.contains("ov")) { i.modal = null; render(i); } },
  attach: (i, d) => { const c = cl(d.c); const f = c.fica.find((x) => x.id === d.id); f.status = "ok"; f.by = "np"; f.date = "Today"; c.files.Compliance.unshift({ name: `${f.doc}${f.person ? " - " + f.person : ""}.pdf`, ver: 1, by: "np", date: "Today" }); log(`Attached ${f.doc}${f.person ? " for " + f.person : ""}`, c.name); toast(i, `${f.doc} held, filed into Compliance, and off Missing Docs.`); refresh(i); },
  ficaNa: (i, d) => { const c = cl(d.c); const f = c.fica.find((x) => x.id === d.id); f.status = "na"; f.by = "np"; f.date = "Today"; log(`Marked ${f.doc} not applicable`, c.name); refresh(i); render(i); },
  compDone: (i, d) => { const c = cl(d.c); const x = c.comp.find((y) => y.id === d.id); x.status = "done"; x.by = "np"; x.date = "Today"; c.files.Compliance.unshift({ name: `${x.doc}.pdf`, ver: 1, by: "np", date: "Today" }); log(`Attached ${x.doc}`, c.name); toast(i, `${x.doc} recorded and filed.`); refresh(i); },
  compNa: (i, d) => { const c = cl(d.c); const x = c.comp.find((y) => y.id === d.id); x.status = "na"; x.by = "np"; x.date = "Today"; log(`Marked ${x.doc} not applicable`, c.name); refresh(i); render(i); },
  noteAdd: (i, d) => { const c = cl(d.id); if (!i.f.note) return; c.notes.unshift({ by: "np", date: "Today", text: i.f.note }); log("Added a note", c.name); i.f.note = ""; refresh(i); render(i); },
  reqOpen: (i, d) => { i.modal = { k: "req", id: d.id, stage: 0 }; render(i); },
  reqSend: (i, d) => { const c = cl(d.id); const r = { id: "r" + S.newId++, clientId: c.id, title: "Documents we need from you", docs: gaps(c).map((g) => g.label), status: "Sent", sent: "Today", reminder: "Reminder set for 3 days" }; S.requests.unshift(r); S.emails.unshift({ to: c.persons[0]?.name || c.name, subject: r.title, kind: "Information request", when: "Today", status: "Delivered" }); log("Sent information request", c.name); i.route = `record/${c.id}/requests`; i.modal = { k: "client", id: r.id }; refresh(i); render(i); },
  reqClient: (i, d) => { i.modal = { k: "client", id: d.id }; render(i); },
  reqSubmit: (i, d) => { const r = S.requests.find((x) => x.id === d.id); r.status = "Ready to review"; i.modal = null; S.audit.unshift({ who: "np", when: "Just now", what: "Client replied to request", on: cl(r.clientId).name }); toast(i, "Client replied. Ready to review."); refresh(i); },
  reqReview: (i, d) => { i.modal = { k: "review", id: d.id }; render(i); },
  reqAccept: (i, d) => { const r = S.requests.find((x) => x.id === d.id); const c = cl(r.clientId); gaps(c).forEach((g) => { if (r.docs.includes(g.label)) { const f = c.fica.find((x) => x.id === g.id) || c.comp.find((x) => x.id === g.id); f.status = f.id.includes("-c") ? "done" : "ok"; f.by = "np"; f.date = "Today"; c.files.Compliance.unshift({ name: g.label + ".pdf", ver: 1, by: "np", date: "Today" }); } }); r.status = "Accepted"; i.modal = null; log("Accepted documents from the client", c.name); toast(i, "Filed, ticked off and gone from Missing Docs."); refresh(i); },
  fv: (i, d) => { const f = S.processes.find((p) => p.id === d.p).steps.flatMap((s) => s.fields).find((x) => x.k === d.k); f.v = d.v; render(i); },
  pickup: (i, d) => { const p = S.processes.find((x) => x.id === d.id); const s = curStep(p); s.assignee = "np"; s.state = "progress"; log(`Picked up ${s.name}`, `${cl(p.clientId).name}: ${p.type}`); refresh(i); render(i); },
  hold: (i, d) => { const p = S.processes.find((x) => x.id === d.id); const s = curStep(p); s.state = "hold"; s.overdue = false; log(`Put ${s.name} on hold`, `${cl(p.clientId).name}: ${p.type}`); refresh(i); render(i); },
  resume: (i, d) => { const p = S.processes.find((x) => x.id === d.id); curStep(p).state = "progress"; refresh(i); render(i); },
  complete: (i, d) => completeStep(i, d.id),
  pStart: (i, d) => { i.modal = { k: "start", id: d.id }; render(i); },
  pStartGo: (i, d) => { const c = cl(d.id); const names = d.t === "Annual Client Review" ? ["Book the review meeting", "Review held"] : ["Check the drawdown", "Client informed"]; const p = { id: "p" + S.newId++, type: d.t, clientId: c.id, owner: "np", started: "Today", steps: names.map((n, k) => ({ name: n, who: "np", fields: [], state: k ? "blocked" : "progress", assignee: "np", due: k ? null : "In 7 days", doneBy: null })) }; S.processes.push(p); log(`Started ${d.t}`, c.name); i.modal = null; i.f = {}; i.route = `process/${p.id}`; refresh(i); render(i); },
  perm: (i, d) => { const r = S.perms[+d.k]; r.grid[d.p] = r.grid[d.p] ? 0 : 1; log(`${r.grid[d.p] ? "Gave" : "Took"} ${r.key} ${r.grid[d.p] ? "to" : "from"} ${d.p} preset`, "Settings"); toast(i, "Saved, and written to the audit log."); refresh(i); },
  cat: (i, d) => { const r = S.catalogue[+d.k]; r[d.f] = !r[d.f]; log(`Changed ${d.f === "req" ? "Required" : "Chased"} on ${r.doc}`, "Settings"); refresh(i); render(i); },
  wType: (i, d) => { i.w.type = d.v; render(i); },
  wNext: (i) => { i.w.step++; render(i); },
  wBack: (i) => { i.w.step--; render(i); },
  wAddP: (i) => { const w = i.w; const n = (w.pn ?? "Sam Dube").trim(); if (!n) return; w.persons.push({ name: n, role: w.pr || "Spouse" }); w.pn = ""; render(i); },
  wFica: (i, d) => { i.w.fica[d.v] = true; render(i); },
  wComp: (i, d) => { i.w.comp[d.v] = true; render(i); },
  wFinish: (i) => {
    const w = i.w; const id = "c" + S.newId++; const c = client(id, w.name, w.type, { ref: w.type === "Individual" ? "ID 8806..." : "New", sub: "Just onboarded", recorded: "np", persons: w.persons });
    c.fica.forEach((f) => { if (!f.person && !w.fica[f.doc]) { f.status = "missing"; f.by = null; f.date = null; } if (f.person) { f.status = "missing"; f.by = null; f.date = null; } });
    c.comp.forEach((x, k) => { if (!w.comp[x.doc]) { x.status = "pending"; x.by = null; x.date = null; } });
    S.clients.push(c); S.clients.sort((a, b) => a.name.localeCompare(b.name)); log("Onboarded and activated", c.name);
    i.w = null; i.route = `record/${id}/overview`; i.f = {}; toast(i, "Client live. Everything outstanding is already on Missing Docs."); refresh(i);
  },
  impNext: (i) => { i.f.st = (i.f.st || 0) + 1; render(i); },
  impBack: (i) => { i.f.st--; render(i); },
  impRun: (i) => { [["Hartley, Grace", "Individual", "ID 7304..."], ["Mthembu, Sizwe", "Individual", "ID 8011..."], ["Cape Vines Trust", "Trust", "IT 2231/2017"]].forEach(([n, t, r]) => { if (!S.clients.some((c) => c.name === n)) S.clients.push(client("c" + S.newId++, n, t, { ref: r, sub: "Imported", recorded: "np" })); }); S.clients.sort((a, b) => a.name.localeCompare(b.name)); log("Imported 3 clients from a spreadsheet", "Clients"); i.f.st = 3; refresh(i); render(i); },
  ag1: (i) => { const c = cl("c2"); const g = gaps(c); const list = g.length ? g.map((x) => `<li>${esc(x.label)}</li>`).join("") : "<li>Nothing</li>"; agRun(i, "What's outstanding on the Van der Merwe trust? Chase it.", [{ t: "tool", x: "Opened Van der Merwe Family Trust" }, { t: "tool", x: "Read the FICA and compliance checklists" }, { t: "a", x: `${g.length} things are outstanding:<ul style="margin:5px 0 5px 18px;padding:0">${list}</ul>I've drafted a request to Pieter with those ticked. It's waiting for you on the right.` }], () => { i.ag.draft = g.map((x) => x.label); i.ag.sent = false; }); },
  ag2: (i) => { const c = cl("c1"); const ps = S.processes.filter((p) => p.clientId === "c1" && curStep(p)); agRun(i, "Get me ready for Pieter's review.", [{ t: "tool", x: "Opened Van der Merwe, Pieter" }, { t: "tool", x: "Read the portfolio, open work and notes" }, { t: "a", x: `<b>Portfolio:</b> R 7,65m, up R 430k since the March review.<br><b>Open work:</b> ${ps.map((p) => `${p.type} (${curStep(p).name})`).join(", ")}.<br><b>From your last note:</b> ${esc(c.notes[0]?.text || "None")}` }]); },
  agApprove: (i) => { const c = cl("c2"); const r = { id: "r" + S.newId++, clientId: c.id, title: "Documents we need from you", docs: i.ag.draft, status: "Sent", sent: "Today", reminder: "Reminder set for 3 days" }; S.requests.unshift(r); log("Approved a request drafted by the assistant", c.name); i.ag.sent = true; toast(i, "Sent. It's on the client's Requests tab and in the audit log."); refresh(i); },
};
function completeStep(i, id) {
  const p = S.processes.find((x) => x.id === id); const s = curStep(p); const c = cl(p.clientId);
  s.state = "done"; s.doneBy = s.assignee || "np"; s.overdue = false;
  log(`Completed ${s.name}`, `${c.name}: ${p.type}`, "np");
  if (p.type === "Subscription") {
    let r = S.tracking.find((x) => x.client === c.name && x.status !== "Complete");
    const isNew = !r;
    if (!r) { r = { client: c.name, date: "2 Nov 2026", vals: {}, status: "In progress", sheet: "Subscription", fresh: true }; S.tracking.unshift(r); } else r.fresh = false;
    s.fields.filter((f) => f.col).forEach((f) => (r.vals[f.col] = f.t === "staff" ? who(f.v).name : f.v));
    if (s.fields.some((f) => f.col)) { r.fresh = true; setTimeout(() => { r.fresh = false; }, 3000); }
    if (s === p.steps[p.steps.length - 1]) r.status = "Complete";
    if (isNew) log("Tracking schedule row created", `${c.name}: ${p.type}`, "np");
  }
  const k = p.steps.indexOf(s); const n = p.steps[k + 1];
  if (n) { n.state = "progress"; n.assignee = n.who; n.due = "In 3 days"; i.f.step = null; toast(i, s.fields.some((f) => f.col) ? `Tracking schedule updated. "${n.name}" is now on ${who(n.who).short}'s list.` : `"${n.name}" is now on ${who(n.who).short}'s list.`); }
  else {
    let t = `${p.type} complete.`;
    if (p.type === "Client Onboarding" || p.type === "Annual Client Review") { const np = { id: "p" + S.newId++, type: "Annual Client Review", clientId: c.id, owner: p.owner, started: "Today", steps: ["Book the review meeting", "Review held"].map((nm, q) => ({ name: nm, who: p.owner, fields: [], state: q ? "blocked" : "progress", assignee: p.owner, due: q ? null : "In 12 months", doneBy: null })) }; S.processes.push(np); t += " The next annual review has been booked in."; log("Next annual review started itself", c.name); }
    toast(i, t);
  }
  refresh(i);
}
function onClick(i, e) {
  const el = e.target.closest("[data-a]");
  if (!el) return;
  if (el.disabled) return;
  if (el.closest("[data-stop]") && el.classList.contains("ov")) return;
  e.stopPropagation();
  const fn = A[el.dataset.a]; if (fn) { fn(i, el.dataset, e); if (i.onAction) i.onAction(el.dataset.a); }
}
function onInput(i, e) {
  const t = e.target;
  if (t.dataset.field) { const [pid, k] = t.dataset.field.split(":"); const f = S.processes.find((p) => p.id === pid).steps.flatMap((s) => s.fields).find((x) => x.k === k); if (f.t === "money") f.v = +t.value.replace(/\D/g, "") || 0; else f.v = t.value; return; }
  if (t.dataset.assign) { const p = S.processes.find((x) => x.id === t.dataset.assign); const s = curStep(p); s.assignee = t.value; log(`Handed ${s.name} to ${who(t.value).short}`, `${cl(p.clientId).name}: ${p.type}`); toast(i, `Handed to ${who(t.value).short}. History stays on the client.`); refresh(i); return; }
  const b = t.dataset.bind; if (!b) return;
  if (b === "g") i.g = t.value;
  else if (b.startsWith("f.")) i.f[b.slice(2)] = t.value;
  else if (b.startsWith("w.")) i.w[b.slice(2)] = t.value;
  render(i);
}
function resetDemo() { S = freshState(); INST.forEach((x) => { x.w = null; x.ag = null; x.modal = null; x.toast = null; x.f = {}; x.route = x.home; render(x); }); }

export { mount, render, go };
