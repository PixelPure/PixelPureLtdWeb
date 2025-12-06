import Section from "../components/Section";
import Button from "../components/Button";
import { pricing } from "../constants";

const scopePillars = [
  {
    title: "Strategy before screens",
    text: "Every engagement starts with a collaborative workshop so we can align on goals, KPIs, and technical constraints before we open Figma or VS Code.",
  },
  {
    title: "Shipping with discipline",
    text: "We build in weekly milestones, async Loom updates, and ruthless QA so you can see work in progress without chasing status.",
  },
  {
    title: "Transparent ownership",
    text: "You own every asset, repository, and deployment pipeline. We document everything so your team can keep building when we hand off.",
  },
];

const addons = [
  {
    title: "Growth & care retainer",
    text: "Rolling block of design + engineering hours for experimentation, CRO, and roadmap work once the initial build ships.",
    bullets: ["Monthly planning call", "Async task board + reporting", "Pause or scale with 14 days notice"],
  },
  {
    title: "Launch support",
    text: "Hands-on help across analytics, CMS population, and team enablement so your launch week is smooth.",
    bullets: ["Analytics + tag manager setup", "Team training + playbooks", "Priority bug fixes for 30 days"],
  },
  {
    title: "Fractional AI partner",
    text: "For teams that want ongoing automation roadmap support, we offer a retained AI partner embedded in your ops.",
    bullets: ["Experiment backlog + ROI tracking", "Model + vendor evaluations", "Guardrails, monitoring, and governance"],
  },
];

const PricingPage = () => {
  return (
    <>
      <Section className="pt-16 lg:pt-24">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="tagline text-color-1">Pricing & Engagements</p>
            <h1 className="h1">
              Transparent pricing built for teams that need to actually ship.
            </h1>
            <p className="body-2 text-n-2">
              We scope every project around measurable outcomes, not vague hour
              buckets. Below are the core ways teams work with Pixel Pure. Each
              engagement includes product strategy, design, engineering, QA, and
              a tight communication cadence.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/contact">Book a call</Button>
              <Button href="/contact#next-steps" className="sm:ml-2" white>
                See next steps
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-n-6/60 bg-gradient-to-br from-n-9/80 via-n-10/70 to-n-8/70 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-color-1/15 via-transparent to-color-5/20" />
            <div className="relative space-y-6">
              <p className="tagline text-color-4">Every engagement includes</p>
              <ul className="space-y-4 text-sm text-n-1">
                <li className="rounded-2xl border border-n-6/60 bg-n-9/60 p-4">
                  Weekly working sessions + async Loom walkthroughs so you never
                  wonder where things stand.
                </li>
                <li className="rounded-2xl border border-n-6/60 bg-n-9/60 p-4">
                  Dedicated Notion/Linear board for scope, decisions, and source
                  of truth documentation.
                </li>
                <li className="rounded-2xl border border-n-6/60 bg-n-9/60 p-4">
                  Deployment + analytics support so you launch with confidence
                  and insight.
                </li>
              </ul>
              <p className="text-xs uppercase tracking-[0.3em] text-n-3">
                Avg. project availability
              </p>
              <p className="text-xl font-semibold text-n-1">
                Booking new work for Jan 2026 (rush slots available on request)
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="container space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="tagline text-color-3">Pricing overview</p>
            <h2 className="h2">Pick the track that matches your roadmap.</h2>
            <p className="body-2 text-n-3">
              These ranges cover the majority of builds we’ve shipped. Exact
              pricing depends on scope, integrations, and timelines — we’ll lock
              that in after a 45-minute scoping call.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {pricing.map((plan) => {
              const showCurrency = plan.showCurrency ?? true;
              const showPlus = plan.showPlus ?? true;

              return (
                <article
                  key={plan.id}
                  className={`relative flex h-full flex-col rounded-[2rem] border p-6 lg:p-8 ${
                    plan.highlight
                      ? "border-color-1/60 bg-n-9/80 shadow-[0_35px_110px_rgba(172,106,255,0.25)]"
                      : "border-n-6/80 bg-n-8/80 shadow-[0_25px_80px_rgba(8,7,17,0.45)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.4em] text-n-3">
                    <span>{plan.badge || "Engagement"}</span>
                    <span>{plan.timeline || "Custom timeline"}</span>
                  </div>
                  <h3 className="mt-4 text-[1.9rem] font-semibold text-n-1">
                    {plan.title}
                  </h3>
                  <p className="body-2 mt-3 text-n-3">{plan.description}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    {plan.price && (
                      <>
                        {showCurrency && (
                          <span className="text-base font-semibold text-n-3">
                            From £
                          </span>
                        )}
                        <span className="text-4xl font-semibold text-n-1">
                          {plan.price}
                        </span>
                        {showPlus && (
                          <span className="text-base font-semibold text-n-3">
                            +
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  {plan.bestFor && (
                    <p className="mt-2 text-sm text-n-3">{plan.bestFor}</p>
                  )}

                  <ul className="mt-6 space-y-4 border-t border-n-6/60 pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="text-sm text-n-1">
                        • {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl border border-n-6/60 bg-n-9/60 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-n-3">
                      Deliverables
                    </p>
                    <p className="mt-2 text-sm text-n-1">{plan.deliverables}</p>
                    {plan.support && (
                      <p className="mt-3 text-xs text-n-3">
                        Support: {plan.support}
                      </p>
                    )}
                  </div>

                  <Button
                    href="/contact"
                    className="mt-8 w-full justify-center"
                    white={!plan.highlight}
                  >
                    {plan.ctaLabel || "Book a discovery call"}
                  </Button>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="tagline text-color-5">How we scope</p>
            <h2 className="h2">Built for ambitious but lean teams.</h2>
            <p className="body-2 text-n-3">
              We combine enterprise engineering discipline with startup pace. No
              bloated decks—just a clear path to shipping and iterating.
            </p>
            <div className="space-y-4">
              {scopePillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-n-6/60 bg-n-9/60 p-5 shadow-[0_15px_50px_rgba(8,7,17,0.4)]"
                >
                  <h3 className="text-xl font-semibold text-n-1">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-n-3">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="tagline text-color-2">Add-ons & retainers</p>
              <p className="body-2 text-n-3">
                Layer these on when you need ongoing firepower after we launch
                the first milestone.
              </p>
            </div>
            <div className="space-y-4">
              {addons.map((addon) => (
                <div
                  key={addon.title}
                  className="rounded-[1.75rem] border border-n-6/60 bg-n-8/80 p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-n-1">
                      {addon.title}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.3em] text-n-3">
                      Optional
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-n-3">{addon.text}</p>
                  <ul className="mt-4 space-y-2 text-sm text-n-1">
                    {addon.bullets.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-n-6/60 bg-gradient-to-br from-n-7/80 via-n-9/70 to-n-10/70 px-8 py-12 text-center lg:px-16">
            <div className="absolute inset-0 bg-gradient-to-br from-color-1/15 via-transparent to-color-4/20" />
            <div className="relative space-y-6">
              <p className="tagline text-color-4">Ready when you are</p>
              <h2 className="h2">Let’s map out your build together.</h2>
              <p className="body-2 text-n-2">
                Whether you need a single killer landing page, a full-stack
                platform, or AI automation woven into your ops, Pixel Pure slots
                in as a true product partner.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button href="/contact" white>
                  Book a discovery call
                </Button>
                <Button href="/story">See how we work</Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

    </>
  );
};

export default PricingPage;
