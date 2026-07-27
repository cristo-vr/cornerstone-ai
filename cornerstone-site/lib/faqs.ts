/**
 * Plain data module, deliberately not a client component: JsonLd renders on the
 * server, and a named export re-exported from a "use client" file arrives there
 * as a client-reference proxy rather than the array itself.
 */
export const faqs = [
  {
    question: "What is an operating system, in plain terms?",
    answer:
      "The way work actually moves through your business: how a client gets onboarded, how projects get tracked, how invoices go out, how nothing slips. Every business already has one. In most, it's the founder's memory plus a group chat plus five tools that don't talk. We build you a real one, so the work runs through the system instead of through you.",
  },
  {
    question: "Is this just a chatbot that knows my company?",
    answer:
      "No. A chatbot answers questions. This does the work. It runs real tasks across your tools, on a loop, without you prompting it, and your whole team uses it. The one rule built in from day one: routine work runs on its own, but anything leaving your business, money or a message to a client, waits for a human yes.",
  },
  {
    question: "Which tools does it work with?",
    answer:
      "The ones you already use. Email, WhatsApp, Xero or your bookkeeping tool, spreadsheets, your client list, your project board. Online store, booking calendar, warehouse system: same story. We map your exact stack in week one and tell you then if something can't connect, before anything is built.",
  },
  {
    question: "How much of my time does this take?",
    answer:
      "A workshop in week one, then roughly an hour a week with your team. One hour together, not one hour per person. We build embedded, so you see it working as it goes in rather than waiting eight weeks for a reveal.",
  },
  {
    question: "My team isn't technical. Will they actually use it?",
    answer:
      "The usual reason a new system dies is that it was built for a generic company and the team has to bend around how it thinks work should happen. This is the opposite: every piece is built for your team, around the way they already work, connected to the tools they already use. It goes in live, one piece at a time, with training every week, so by week eight they're running on it rather than figuring it out.",
  },
  {
    question: "We handle sensitive information. Patients, legal files, payroll. Still fine?",
    answer:
      "Yes, and that changes how we build, not whether we can. Regulated information gets stricter rules: tighter access, human sign-off on anything that touches it, and we build to your industry's requirements rather than around them. On the first call we'll walk you through exactly how, for your specific rules.",
  },
  {
    question: "Who fixes it if something breaks in month three?",
    answer:
      "If you're on the optional retainer, we do, as part of it. If you're not, your team uses the documentation from the handover, or you call us in for the fix. Either way you're never locked out of your own system: it runs on your accounts and your team holds the keys.",
  },
  {
    question: "What if it doesn't work?",
    answer:
      "You decide at the end of week eight. Keep the system, or hand it back and we refund the build in full. Handing it back means we disconnect the layer; your tools, your data and your accounts stay exactly as they were. The risk of the build sits with us, not you.",
  },
];
