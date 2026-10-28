/**
 * The /advisors application questions, as data.
 *
 * DRAFT: not yet confirmed by Cristo. Change wording, options, order or gates
 * here and nothing else: the page renders its steps from this list and the
 * script reads the gates from it.
 *
 * Step 1 (name and email) is fixed and lives in the page. These follow it, so
 * the first entry here is step 2.
 *
 * `disqualify` on an option is the client-side gate only: it picks the next
 * screen. Mason re-runs the gates server side and its answer is the one stored.
 * `flag` marks an answer worth seeing in the panel; it never gates.
 */

export type DisqualifyReason = "role" | "no_admin" | "households";

export interface Option {
  value: string;
  label: string;
  disqualify?: DisqualifyReason;
  flag?: string;
}

export interface Question {
  /** The answer key sent to Mason. */
  key: string;
  kind: "single" | "multi";
  /** Single choice: advance on click. Off for the last step, which has a button. */
  auto?: boolean;
  question: string;
  helper?: string;
  options: Option[];
  /** Multi: the minimum picks before Continue works. */
  min?: number;
  /** Label for the step's own button when it isn't auto. */
  button?: string;
}

export const QUESTIONS: Question[] = [
  {
    key: "role",
    kind: "single",
    auto: true,
    question: "What's your role in the practice?",
    options: [
      { value: "advisor", label: "Advisor, with my own book" },
      { value: "owner", label: "Owner or MD" },
      { value: "admin", label: "Admin or support", disqualify: "role" },
      { value: "other", label: "Something else", disqualify: "role" },
    ],
  },
  {
    key: "admin_staff",
    kind: "single",
    auto: true,
    question: "How many admin or support people work on your clients?",
    options: [
      { value: "0", label: "None", disqualify: "no_admin" },
      { value: "1", label: "1" },
      { value: "2-5", label: "2 to 5" },
      { value: "6-12", label: "6 to 12" },
      { value: "13+", label: "13 or more" },
    ],
  },
  {
    key: "households",
    kind: "single",
    auto: true,
    question: "Roughly how many client households do you look after?",
    options: [
      { value: "u100", label: "Under 100", disqualify: "households" },
      { value: "100-199", label: "100 to 199" },
      { value: "200-399", label: "200 to 399" },
      { value: "400+", label: "400 or more" },
    ],
  },
  {
    key: "decides",
    kind: "single",
    auto: true,
    question: "Who decides on changes to how the practice runs?",
    options: [
      { value: "me", label: "I do" },
      { value: "partner", label: "Me and a partner", flag: "partner" },
      { value: "firm", label: "The firm or compliance", flag: "firm" },
    ],
  },
  {
    key: "breaks",
    kind: "multi",
    question: "What breaks most often right now?",
    helper: "Pick all that apply.",
    min: 1,
    button: "Continue",
    options: [
      { value: "roa_schedule", label: "The ROA and the tracking schedule" },
      { value: "chasing_docs", label: "Chasing clients for documents" },
      { value: "team_asks", label: "The team asking me where things are" },
      { value: "compliance_sheet", label: "The compliance spreadsheet" },
      { value: "history_in_heads", label: "Client history that lives in people's heads" },
      { value: "checking_late", label: "Checking the team's work at 10 PM" },
    ],
  },
  {
    key: "timing",
    kind: "single",
    auto: false,
    question: "When do you want this sorted?",
    button: "See available times",
    options: [
      { value: "now", label: "Now" },
      { value: "months", label: "In the next few months" },
      { value: "exploring", label: "I'm exploring", flag: "exploring" },
    ],
  },
];

/** Total steps shown in "Step n of N": name and email, then the questions. */
export const TOTAL_STEPS = 1 + QUESTIONS.length;

/** The thank-you line for each way out. */
export const DISQUALIFY_COPY: Record<DisqualifyReason, string> = {
  role: "We work with the advisor who runs the book. If that's someone you work with, send them this page.",
  no_admin:
    "We build around a team, and right now the work runs through you alone. Once someone joins you, we'd like to hear from you.",
  households:
    "What we build pays off on a bigger book than yours today. Once the book grows, we'd like to hear from you.",
};

/** The first disqualifying answer, if any. Client side only. */
export function gate(answers: Record<string, string | string[]>): DisqualifyReason | null {
  for (const q of QUESTIONS) {
    if (q.kind !== "single") continue;
    const v = answers[q.key];
    const opt = q.options.find((o) => o.value === v);
    if (opt?.disqualify) return opt.disqualify;
  }
  return null;
}

/** "Role: Owner or MD" lines for the booking's context note. */
export function summarise(answers: Record<string, string | string[]>): string {
  const lines: string[] = [];
  for (const q of QUESTIONS) {
    const v = answers[q.key];
    if (v == null || (Array.isArray(v) && !v.length)) continue;
    const vals = Array.isArray(v) ? v : [v];
    const labels = vals.map((x) => q.options.find((o) => o.value === x)?.label ?? x);
    lines.push(`${q.question} ${labels.join("; ")}`);
  }
  return lines.join("\n");
}
