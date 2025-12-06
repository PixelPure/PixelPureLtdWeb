import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Section from "./Section";
import Button from "./Button";
import { Gradient, VideoChatMessage } from "./design/Services";
import mandesigning from "../assets/mandesigning2.png";

const services = [
  "Web Design",
  "App Development",
  "Digital Consultancy",
  "Logo & Branding",
  "Dedicated Developers",
];

const budgets = ["£100 - £500", "£500 - £1000", "£1000 - £5000", "£5000+"];

const Contact = () => {
  const form = useRef(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isVideoChatVisible, setIsVideoChatVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_zs1k4zc";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_x6j9ygi";
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "QsOCvke8aqE6lD2Nk";

  useEffect(() => {
    setIsFormValid(
      selectedServices.length > 0 &&
        selectedBudget !== "" &&
        firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        email.trim() !== "" &&
        message.trim() !== ""
    );
  }, [selectedServices, selectedBudget, firstName, lastName, email, message]);

  const handleServiceClick = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleBudgetClick = (budget) => {
    setSelectedBudget((prev) => (prev === budget ? "" : budget));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.current) return;

    if (!serviceId || !templateId || !publicKey) {
      setFormError("Contact form is temporarily unavailable. Please email info@pixelpure.co.uk.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          setIsPopupVisible(true);
          setIsVideoChatVisible(true);
          setSelectedServices([]);
          setSelectedBudget("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log("FAILED...", error.text);
          setFormError(
            error?.text === "Account not found"
              ? "Email service is not configured yet. Please reach us at info@pixelpure.co.uk."
              : "We couldn\\'t send your message just now. Please try again or email info@pixelpure.co.uk."
          );
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Section id="contact" className="pt-16 lg:pt-20">
      <div className="container relative">
        <div className="relative z-1 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] xl:gap-16">
          <div>
            <div className="max-w-2xl space-y-4">
              <p className="tagline text-color-4">Contact</p>
              <h2 className="h2">Let&rsquo;s build your next launch</h2>
              <p className="body-2 text-n-3">
                Tell us what you are building, who it&rsquo;s for, and the timeline
                you are aiming for. We respond to every enquiry within two
                business days with a plan of attack and a proposed slot in our
                production calendar.
              </p>
            </div>

            <form
              ref={form}
              onSubmit={sendEmail}
              className="mt-10 space-y-8 rounded-[2rem] border border-n-6/60 bg-n-8/80 p-6 shadow-[0_30px_90px_rgba(8,7,17,0.65)] lg:p-8"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-n-3">
                  Select services
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {services.map((service) => {
                    const isActive = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceClick(service)}
                        aria-pressed={isActive}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? "border-color-1 bg-color-1/10 text-n-1 shadow-[0_0_25px_rgba(172,106,255,0.35)]"
                            : "border-n-6/80 text-n-3 hover:border-n-4"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-n-3">
                  Estimated budget
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {budgets.map((budget) => {
                    const isActive = selectedBudget === budget;
                    return (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => handleBudgetClick(budget)}
                        aria-pressed={isActive}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? "border-color-1 bg-color-1/10 text-n-1 shadow-[0_0_25px_rgba(172,106,255,0.35)]"
                            : "border-n-6/80 text-n-3 hover:border-n-4"
                        }`}
                      >
                        {budget}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="text-sm font-medium text-n-3"
                  >
                    First name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-n-6 bg-n-9 px-4 py-3 text-n-1 transition focus:border-color-1 focus:outline-none focus:ring-1 focus:ring-color-1"
                    placeholder="Jacob"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="text-sm font-medium text-n-3"
                  >
                    Last name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-n-6 bg-n-9 px-4 py-3 text-n-1 transition focus:border-color-1 focus:outline-none focus:ring-1 focus:ring-color-1"
                    placeholder="Watfa"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-n-3"
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-n-6 bg-n-9 px-4 py-3 text-n-1 transition focus:border-color-1 focus:outline-none focus:ring-1 focus:ring-color-1"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="timeline"
                    className="text-sm font-medium text-n-3"
                  >
                    Timeline
                  </label>
                  <input
                    id="timeline"
                    name="timeline"
                    type="text"
                    placeholder="When do you want to launch?"
                    className="mt-2 w-full rounded-xl border border-n-6 bg-n-9 px-4 py-3 text-n-1 transition focus:border-color-1 focus:outline-none focus:ring-1 focus:ring-color-1"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-n-3"
                >
                  Project overview
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-n-6 bg-n-9 px-4 py-3 text-n-1 transition focus:border-color-1 focus:outline-none focus:ring-1 focus:ring-color-1"
                  placeholder="Share context, goals, tech stack, or any references."
                />
              </div>

              <input
                type="hidden"
                name="services"
                value={selectedServices.join(", ")}
              />
              <input type="hidden" name="budget" value={selectedBudget} />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-n-3">
                    Prefer email?{" "}
                    <a
                      href="mailto:info@pixelpure.co.uk"
                      className="text-n-1 underline decoration-color-1/60 underline-offset-4 transition-colors hover:text-color-1"
                    >
                      info@pixelpure.co.uk
                    </a>
                  </p>
                  {formError && (
                    <p className="text-sm text-color-3">{formError}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  white
                  disabled={!isFormValid || isSubmitting}
                  className="w-full justify-center sm:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send message →"}
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-n-6/60 bg-gradient-to-br from-n-9/70 via-n-8/60 to-n-10/70 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-color-1/10 via-transparent to-color-3/20" />
              <div className="relative space-y-6">
                <p className="tagline text-color-3">Contact details</p>
                <div className="space-y-4 text-n-1">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-n-3">
                      Email
                    </p>
                    <a
                      href="mailto:info@pixelpure.co.uk"
                      className="text-xl font-semibold text-n-1 transition-colors hover:text-color-1"
                    >
                      info@pixelpure.co.uk
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-n-3">
                      Phone / WhatsApp
                    </p>
                    <a
                      href="tel:+447984093945"
                      className="text-xl font-semibold text-n-1 transition-colors hover:text-color-1"
                    >
                      +44 7984 093945
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-n-3">
                      Based in
                    </p>
                    <p className="text-xl font-semibold text-n-1">
                      UK & Toronto
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 border-t border-n-6/60 pt-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-n-6/60 bg-n-9/70 p-4 text-sm text-n-3">
                    Response time
                    <p className="mt-2 text-lg font-semibold text-n-1">
                      <span className="text-color-4">≤</span> 2 business days
                    </p>
                  </div>
                  <div className="rounded-2xl border border-n-6/60 bg-n-9/70 p-4 text-sm text-n-3">
                    Current focus
                    <p className="mt-2 text-lg font-semibold text-n-1">
                      Websites, product strategy, AI tooling
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-n-6/60 bg-n-9/80">
              <img
                src={mandesigning}
                alt="Pixel Pure studio shot"
                className="h-full w-full object-cover"
                width={520}
                height={400}
                loading="lazy"
              />
              {isVideoChatVisible && <VideoChatMessage />}
            </div>
          </div>
        </div>

        <Gradient />
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-n-8/80 px-5">
          <div className="w-full max-w-lg rounded-[2rem] border border-color-1/40 bg-n-9/95 p-8 text-center shadow-[0_30px_90px_rgba(8,7,17,0.75)]">
            <p className="tagline text-color-1">Message received</p>
              <h3 className="mt-4 text-2xl font-semibold text-n-1">
                You&rsquo;re in the queue
              </h3>
              <p className="mt-3 text-n-3">
                Thanks for reaching out. We&rsquo;ll review your project and reply
              within two business days with next steps and available kickoff
              dates.
            </p>
            <Button
              className="mt-8 w-full justify-center"
              onClick={() => setIsPopupVisible(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Contact;
