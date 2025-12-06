import React from "react";
import Section from "./Section";

const steps = [
  {
    id: 1,
    title: "Initial consultation",
    text: "We learn about your product, target users, and success metrics so we can recommend an approach that actually supports the wider business.",
  },
  {
    id: 2,
    title: "Proposal & timeline",
    text: "You receive a written plan covering deliverables, phases, budget, and availability. We iterate quickly until it feels right.",
  },
  {
    id: 3,
    title: "Align & sign",
    text: "Once the scope is approved we lock in start dates, align on collaboration tools, and make sure key stakeholders are looped in.",
  },
  {
    id: 4,
    title: "Project kickoff",
    text: "Design, engineering, and QA spin up in parallel with weekly check-ins, async Loom updates, and a clear release schedule.",
  },
];

const NextSteps = () => {
  return (
    <Section id="next-steps" className="pt-0">
      <div className="container space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="tagline text-color-2">Next steps</p>
          <h2 className="h2">What happens after you reach out</h2>
          <p className="body-2 text-n-3">
            No black boxes. You will always know what we&apos;re building, why,
            and how it ladders back to the results you care about.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <article
              key={step.id}
              className="relative overflow-hidden rounded-[1.75rem] border border-n-6/60 bg-n-8/80 p-6 shadow-[0_25px_70px_rgba(8,7,17,0.45)]"
            >
              <div className="flex items-center gap-3 text-xs font-code uppercase tracking-[0.3em] text-n-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-n-6 text-base font-semibold text-n-1">
                  {index + 1}
                </span>
                Step {index + 1}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-n-1">
                {step.title}
              </h3>
              <p className="mt-3 text-n-3">{step.text}</p>
              <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-color-1/15 blur-3xl" />
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default NextSteps;
