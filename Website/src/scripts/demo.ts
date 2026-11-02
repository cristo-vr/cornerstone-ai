/**
 * /advisors/demo: mounts the example system, runs the three guided tasks, and records how far
 * people get. Only names are sent (tracking contract §5): a screen, an action, a task. Nothing
 * typed into the demo ever leaves the browser.
 */
// @ts-expect-error plain JS, copied from the deck
import { go, mount, render } from "../demo/demo-app.js";
import { FUNNEL } from "../lib/advisors-config";
import { flush, setFunnel, setLeadId, store, track } from "./funnel-client";

setFunnel(FUNNEL);

// Someone who already filled in the form keeps their lead id, so this shows on their journey.
try {
  const saved = JSON.parse(store.get("cs_adv_lead") ?? "null") as { id?: string } | null;
  if (saved?.id) setLeadId(saved.id);
} catch {
  /* no saved lead */
}

interface Task {
  key: "attach" | "complete" | "tracking";
  label: string;
  hint: string;
  start: string;
}

const TASKS: Task[] = [
  { key: "attach", label: "Attach a missing document", hint: "Tap a client, then press Attach. Watch Missing Docs drop.", start: "missing" },
  { key: "complete", label: "Complete a step", hint: "Press Complete step. The next step goes to the next person.", start: "process/p1" },
  { key: "tracking", label: "See the new tracking row", hint: "Nobody typed it. It came from the step you just finished.", start: "tracking" },
];

/** The actions worth counting, under plain names. Opening and closing things isn't an action. */
const ACTIONS: Record<string, string> = {
  attach: "Attached a document",
  ficaNa: "Marked a document N/A",
  compDone: "Completed a compliance item",
  compNa: "Marked a compliance item N/A",
  noteAdd: "Added a note",
  reqSend: "Sent a client request",
  reqSubmit: "Submitted as the client",
  reqAccept: "Accepted a client's documents",
  pickup: "Picked up a step",
  hold: "Put a step on hold",
  resume: "Resumed a step",
  complete: "Completed a step",
  pStartGo: "Started a process",
  perm: "Changed a permission",
  cat: "Changed the document catalogue",
  wFinish: "Onboarded a client",
  impRun: "Imported a spreadsheet",
  ag1: "Asked the assistant to chase documents",
  ag2: "Asked the assistant for review prep",
  agApprove: "Approved the assistant's draft",
  export: "Exported the tracking schedule",
};

/** Strips made-up record ids, so screens group: record/c10/fica reads record/fica. */
const screenOf = (route: string): string => {
  const [a, b, c] = route.split("/");
  if (a === "record") return `record/${c ?? "overview"}`;
  if (a === "process") return "process";
  return b && a === "settings" ? `settings/${b}` : a;
};

const host = document.getElementById("demo-os") as HTMLElement;
const list = document.getElementById("dm-tasks") as HTMLElement;
const end = document.getElementById("dm-end") as HTMLElement;
const done = new Set<string>();
const startedAt = Date.now();
let lastScreen = "";

function drawGuide() {
  const cur = TASKS.find((t) => !done.has(t.key));
  list.hidden = !cur;
  end.hidden = !!cur;
  list.innerHTML = TASKS.map((t, n) => {
    const isDone = done.has(t.key);
    const isCur = t === cur;
    return `<li class="dm-task ${isDone ? "done" : isCur ? "cur" : ""}">
      <span class="tk">${isDone ? '<i class="ph ph-check"></i>' : n + 1}</span>
      <span class="txt"><b>${t.label}</b><small>${t.hint}</small></span>
      <button type="button" class="dm-show" data-show="${t.key}">Show me</button>
    </li>`;
  }).join("");
}

function finishTask(key: Task["key"]) {
  if (done.has(key)) return;
  done.add(key);
  track("demo_task", { task: key, n: done.size });
  drawGuide();
}

const inst = mount(host, "clients");
inst.home = "clients";

inst.onRender = (i: { route: string }) => {
  const screen = screenOf(i.route);
  if (screen === lastScreen) return;
  lastScreen = screen;
  track("demo_screen", { route: screen });
  // The row only means something once they've finished the step that makes it.
  if (screen === "tracking" && done.has("complete")) finishTask("tracking");
};

inst.onAction = (name: string) => {
  const word = ACTIONS[name];
  if (word) track("demo_action", { action: word });
  if (name === "attach") finishTask("attach");
  if (name === "complete") finishTask("complete");
};

list.addEventListener("click", (e) => {
  const key = (e.target as HTMLElement).closest<HTMLElement>("[data-show]")?.dataset.show;
  const task = TASKS.find((t) => t.key === key);
  if (!task) return;
  go(inst, task.start);
  // On a phone the button can sit below the fold.
  if (task.key === "complete") host.querySelector('[data-a="complete"]')?.scrollIntoView({ block: "center" });
});

document.getElementById("dm-again")?.addEventListener("click", () => {
  (document.querySelector(".dm-guide") as HTMLElement).hidden = true;
});

const params = new URLSearchParams(location.search);
track("demo_open", { from: params.get("from") ?? "direct" });
render(inst);
drawGuide();

// Phones often never fire pagehide, so leaving also counts when the page is hidden.
// The report keeps the latest per visitor, so sending it more than once is safe.
function leave() {
  track("demo_leave", { route: lastScreen, secs: Math.round((Date.now() - startedAt) / 1000), tasks: done.size });
  flush();
}
addEventListener("pagehide", leave);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") leave();
});
