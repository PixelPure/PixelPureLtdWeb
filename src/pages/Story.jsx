import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Section from "../components/Section";

const GraduationIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9L12 5l9 4-9 4-9-4Z" />
    <path d="M7 11.5V15c0 2 2.5 3.5 5 3.5s5-1.5 5-3.5v-3.5" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3 5 6v6c0 4.5 3.5 7.5 7 9 3.5-1.5 7-4.5 7-9V6l-7-3Z" />
    <path d="M10 12h4" />
    <path d="M12 10v4" />
  </svg>
);

const CardIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <path d="M2.5 11h19" />
    <path d="M7 15h3" />
  </svg>
);

const RocketIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2c3 1.5 6 5 6 9 0 6-6 9-6 9s-6-3-6-9c0-4 3-7.5 6-9Z" />
    <circle cx="12" cy="10" r="2" />
    <path d="M9 22s.5-3 3-3 3 3 3 3" />
  </svg>
);

const SparkIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4v4" />
    <path d="M12 16v4" />
    <path d="M4 12h4" />
    <path d="M16 12h4" />
    <path d="m7 7 2.5 2.5" />
    <path d="M14.5 14.5 17 17" />
    <path d="m7 17 2.5-2.5" />
    <path d="M14.5 9.5 17 7" />
  </svg>
);

const iconMap = [GraduationIcon, ShieldIcon, CardIcon, RocketIcon, SparkIcon];

const timelineMilestones = [
  {
    date: "2019-2022",
    title: "Foundations at Nottingham",
    description:
      "Built live brain data visualisation tools and a time-rewind puzzle game, learning how to architect systems that have to work in real time.",
    Icon: iconMap[0],
  },
  {
    date: "2022-2023",
    title: "Enterprise at Sophos",
    description:
      "Modernised build pipelines and CI for large-scale security software, and learned what production-ready truly means for thousands of customers.",
    Icon: iconMap[1],
  },
  {
    date: "2023",
    title: "Toronto & Digital Receipts",
    description:
      "Led backend for a Visa/Mastercard-integrated digital receipts platform that reached the penultimate accelerator round, building fast under real constraints.",
    Icon: iconMap[2],
  },
  {
    date: "2023-Now",
    title: "Launching Pixel Pure",
    description:
      "Started Pixel Pure and shipped 15+ production-grade sites and apps across e-commerce, logistics, hospitality, and education.",
    Icon: iconMap[3],
  },
  {
    date: "2024-Now",
    title: "AI, Search & Teaching",
    description:
      "Architected AI-powered car search at Carmigos and taught algorithms, Python, C++, ML, and Unreal Engine -- keeping engineering sharp and explanations clear.",
    Icon: iconMap[4],
  },
];

const Story = () => {
  const timelineSectionRef = useRef(null);
  const cardContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState(
    () => timelineMilestones.map(() => false)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [nodeOffsets, setNodeOffsets] = useState(
    () => timelineMilestones.map(() => 0)
  );
  const [columnHeight, setColumnHeight] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setReduceMotion(event.matches);

    setReduceMotion(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleScroll = () => {
      if (!timelineSectionRef.current) return;

      const rect = timelineSectionRef.current.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const startOffset = windowHeight * 0.2;
      const totalScrollable = rect.height + startOffset;
      const rawProgress = (startOffset - rect.top) / totalScrollable;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clamped);

      const viewportCenter = windowHeight / 2;
      let nextActive = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          nextActive = index;
        }
      });

      setActiveIndex(nextActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateMeasurements = () => {
      if (!cardContainerRef.current) return;

      const containerRect = cardContainerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top + window.scrollY;
      const offsets = cardRefs.current.map((card) => {
        if (!card) return 0;
        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top + window.scrollY;
        return cardTop - containerTop + cardRect.height / 2;
      });

      setNodeOffsets(offsets);
      setColumnHeight(containerRect.height);
    };

    const handleResize = () => {
      window.requestAnimationFrame(updateMeasurements);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => {
              if (prev[index]) return prev;
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const progressHeight = Math.min(Math.max(progress, 0), 1) * columnHeight;

  return (
    <>
      <Section className="pt-16 lg:pt-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="tagline text-color-1">Our Story</p>
            <h1 className="h1">
              From late-night side projects to a studio built for shipping real
              products
            </h1>
            <p className="body-2 text-lg text-n-2">
              Pixel Pure wasn't born from a love for pretty websites. It came
              from seeing ambitious brands held back by clunky, outdated digital
              systems -- and wanting to build something better.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/contact">Work with us</Button>
              <Link
                to="/designers"
                className="text-sm font-semibold text-n-1 transition-colors hover:text-color-1"
              >
                View our work
              </Link>
            </div>
          </div>
          <div className="relative h-[20rem] overflow-hidden rounded-[2rem] border border-n-6/60 bg-gradient-to-br from-n-9/60 via-n-7/40 to-n-10/50 p-8 shadow-[0_20px_60px_rgba(8,7,17,0.65)] lg:h-full">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-color-1/25 via-color-5/20 to-color-3/30" />
            <div className="relative flex h-full items-center justify-center">
              <div
                className={`h-56 w-56 rounded-full bg-gradient-to-br from-color-1/40 via-color-5/40 to-color-3/40 ${
                  reduceMotion ? "" : "floating-slow"
                }`}
              />
              <div
                className={`absolute h-72 w-72 rounded-full border border-color-1/30 ${
                  reduceMotion ? "" : "orbit-slower"
                }`}
              />
              <div
                className={`absolute h-6 w-6 rounded-full bg-color-1/60 ${
                  reduceMotion ? "" : "glow-pulse"
                }`}
                style={{ top: "20%", left: "18%" }}
              />
              <div
                className="absolute h-3 w-3 rounded-full bg-color-5/70"
                style={{ bottom: "18%", right: "25%" }}
              />
              <div className="absolute inset-x-0 bottom-6 flex justify-between text-xs uppercase tracking-[0.2em] text-n-3/70">
                <span>Build</span>
                <span>Ship</span>
                <span>Refine</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container">
          <h2 className="h2 text-center">
            Why I started Pixel Pure
          </h2>
          <div className="mx-auto mt-6 max-w-4xl space-y-6 text-lg leading-8 text-n-2">
            <p>
              I'm Vik, the founder of Pixel Pure. I didn't start this studio
              because I liked websites. I started it because I kept seeing the
              same pattern: ambitious people with serious businesses trying to
              operate on clunky, outdated digital systems that held them back.
            </p>
            <p>
              While I was studying Computer Science at the University of
              Nottingham, I spent most of my time building things that had to
              work in the real world -- from visualising live brain signal data
              for researchers, to designing a time-rewind game engine in Unity,
              to engineering an autonomous flash-deal detection agent that
              actually beat traditional heuristics in production-like tests.
              Those projects taught me two things: details matter, and shipping
              consistently is a superpower.
            </p>
            <p>
              I took that mindset into industry during my year-long software
              engineering internship at Sophos, where I worked on enterprise-scale
              security software. There, I learned how to modernise critical build
              pipelines, make CI/CD reliable, and design systems that thousands
              of customers depend on every day. It raised my quality bar
              permanently -- good enough stopped being an option.
            </p>
            <p>
              On my year abroad at the University of Toronto, I led backend and
              architecture for a digital receipts platform that integrated
              directly with Visa and Mastercard APIs and made it to the final
              round of an accelerator. We were building under real constraints,
              talking to users, and iterating fast. That's when it clicked: I
              didn't just want to write code -- I wanted to help people turn ideas
              into functioning, sustainable products.
            </p>
            <p>
              Pixel Pure started in 2023 as my way of doing exactly that. What
              began as a small development studio has now delivered 15+
              production-grade websites and apps across e-commerce, logistics,
              hospitality, and education -- including platforms like LiquidTable,
              a restaurant booking system built in Flutter with Stripe payments
              and real-time bookings, and prompto.today, a viral AI guessing game
              that scaled to thousands of players.
            </p>
            <p>
              Alongside building Pixel Pure, I've led technical search and
              ranking work at Carmigos, architecting AI-powered natural-language
              car search, and taught algorithms, Python, C++, machine learning,
              and Unreal Engine as a programming and AI tutor. Teaching forces
              you to make complex systems simple -- something we bring into every
              client conversation and every UX decision we make.
            </p>
            <p>
              Today, Pixel Pure is the intersection of all of that experience:
              enterprise-grade engineering discipline from cybersecurity, product
              thinking from startup accelerators and academic projects, clear
              communication from teaching, and a genuine obsession with clean,
              modern design and delightful interactions.
            </p>
            <p>
              If you work with us, you're not just getting a website or an app.
              You're getting a small, focused engineering and design team that
              treats your project like a product we're proud to ship, maintain,
              and grow with you.
            </p>
          </div>
        </div>
      </Section>

      <Section crosses id="timeline">
        <div
          className="container space-y-6"
          ref={timelineSectionRef}
        >
          <div className="space-y-4 text-center lg:text-left">
            <p className="tagline text-color-3">Career timeline</p>
            <h2 className="h2">The journey so far</h2>
            <p className="body-2 max-w-3xl text-n-2">
              Every chapter of my career feeds into how we build at Pixel Pure --
              from academic research and cybersecurity to startups, AI, and
              teaching.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(10rem,15rem)_1fr] lg:gap-12">
            <div className="relative hidden lg:block" aria-hidden>
              <div
                className="sticky top-[7rem]"
                style={{ height: columnHeight || 400 }}
              >
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-n-6/70" />
                <div
                  className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-color-1 via-color-5 to-color-3"
                  style={{ height: `${progressHeight}px` }}
                />
                {nodeOffsets.map((offset, index) => (
                  <div
                    key={timelineMilestones[index].title}
                    className="absolute -translate-x-1/2"
                    style={{
                      left: "50%",
                      top: Math.max(offset - 8, 0),
                    }}
                  >
                    <div
                      className={`h-4 w-4 rounded-full border transition-all duration-300 ${
                        index <= activeIndex
                          ? "border-color-1 bg-color-1/60 shadow-[0_0_15px_rgba(172,106,255,0.45)]"
                          : "border-n-6 bg-n-8"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={cardContainerRef}
              className="relative space-y-8 lg:space-y-10"
            >
              <div className="absolute left-4 top-0 bottom-0 w-px bg-n-6/60 lg:hidden" />
              <div
                className="absolute left-4 top-0 w-px bg-gradient-to-b from-color-1 via-color-5 to-color-3 lg:hidden"
                style={{ height: `${progressHeight}px` }}
              />

              {timelineMilestones.map(({ date, title, description, Icon }, index) => {
                const isActive = index === activeIndex;
                const isVisible = visibleCards[index] || reduceMotion;

                return (
                  <article
                    key={title}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    data-index={index}
                    className={`relative rounded-[1.5rem] border border-n-6/70 bg-n-8/70 p-6 pl-12 shadow-[0_20px_50px_rgba(10,8,20,0.45)] transition-all duration-500 will-change-transform hover:-translate-y-1 hover:border-color-1/60 hover:shadow-[0_25px_60px_rgba(172,106,255,0.25)] lg:p-8 lg:pl-14 ${
                      isActive
                        ? "border-color-1/60 shadow-[0_25px_70px_rgba(172,106,255,0.35)] scale-[1.02]"
                        : ""
                    } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{
                      transitionDelay: reduceMotion ? "0ms" : `${index * 90}ms`,
                    }}
                  >
                    <div className="absolute left-4 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-n-6 bg-n-9 lg:left-6">
                      <Icon />
                    </div>
                    <p className="text-xs font-code uppercase tracking-[0.2em] text-color-1">
                      {date}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-n-1">
                      {title}
                    </h3>
                    <p className="mt-3 text-base text-n-2">{description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] border border-n-6/70 bg-gradient-to-br from-n-7/70 via-n-9/60 to-n-10/60 p-10 text-center shadow-[0_40px_90px_rgba(10,8,20,0.6)] lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-color-1/10 via-transparent to-color-3/20" />
            <div className="relative space-y-6">
              <p className="tagline text-color-4">Build the future</p>
              <h2 className="h2">Build your next chapter with us</h2>
              <p className="body-2 text-n-2">
                If you want a team that treats your idea like a product, not a
                task, Pixel Pure was built for you. Let's turn your vision into
                something real and ready to grow.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button href="/contact">Book a call</Button>
                <Link
                  to="/designers"
                  className="text-sm font-semibold text-n-1 transition-colors hover:text-color-1"
                >
                  See what we've built
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Story;

