import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Section from "./Section";
import Heading from "./Heading";
import { Gradient } from "./design/Services";
import mandesigning from "../assets/mandesigning2.png";
import {VideoChatMessage} from "./design/Services"; // Ensure correct import path

const Contact = () => {
  const form = useRef();
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isVideoChatVisible, setIsVideoChatVisible] = useState(false);

  const services = ["Web Design", "App Development", "Digital Consulting", "Logo and Branding", "Hire our Developers"];
  const budgets = ["£100 - £500", "£500 - £1000", "£1000 - £5000", "£5000+"];

  useEffect(() => {
    // Validate form
    setIsFormValid(
      selectedServices.length > 0 &&
      selectedBudget !== '' &&
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      message !== ''
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
    setSelectedBudget((prev) => (prev === budget ? '' : budget));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_8zincml', 'template_x6j9ygi', form.current, 'QsOCvke8aqE6lD2Nk')
      .then(
        () => {
          console.log('SUCCESS!');
          setIsPopupVisible(true);
          setIsVideoChatVisible(true);
          // Clear form fields
          setSelectedServices([]);
          setSelectedBudget('');
          setFirstName('');
          setLastName('');
          setEmail('');
          setMessage('');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <Section id="contact">
      <div className="container relative">
        <div className={isPopupVisible ? 'blur-sm' : ''}>
          <Heading
            title="Get in touch with our team"
            text="Send us a message using the contact form below, with a detailed description of your vision. After sending, our team will get back to you within 2 business days."
          />

          <div className="relative">
            <div className="relative z-1 grid gap-5 lg:grid-cols-2">
              <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden p-8 bg-n-7 text-white">
                <h4 className="h4 mb-4">Request Our Services</h4>
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-n-3 mb-2">Select Service</p>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceClick(service)}
                          className={`px-4 py-2 rounded ${selectedServices.includes(service) ? 'bg-white text-black' : 'bg-gray-800 text-n-3'}`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-n-3 mb-2">Estimated Budget</p>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => handleBudgetClick(budget)}
                          className={`px-4 py-2 rounded ${selectedBudget === budget ? 'bg-white text-black' : 'bg-gray-800 text-n-3'}`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-n-3 mb-2">Your Details</p>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <input
                      type="text"
                      name="first_name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="flex-1 px-4 py-3 rounded bg-n-7 text-n-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="flex-1 px-4 py-3 rounded bg-n-7 text-n-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded bg-n-7 text-n-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 mb-4"
                  />
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message"
                    className="w-full h-32 px-4 py-3 rounded bg-n-7 text-n-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                  <input type="hidden" name="services" value={selectedServices.join(', ')} />
                  <input type="hidden" name="budget" value={selectedBudget} />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                    <p className="text-sm">
                      Hate contact forms?{' '}
                      <a href="mailto:pixelpureinfo@gmail.com" className="underline">
                        pixelpureinfo@gmail.com
                      </a>
                    </p>
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`px-6 py-2 sm:py-3 rounded shadow transition-colors ${isFormValid ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                    >
                      Send message →
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
                <div className="py-12 px-4 xl:px-8">
                  <h4 className="h4 mb-4">Contact us</h4>
                  <p className="body-2 mb-[2rem] text-n-3">
                    Email: pixelpureinfo@gmail.com
                  </p>
                  <p className="body-2 mb-[2rem] text-n-3">
                    Phone: +44 7984 093945
                  </p>
                </div>

                <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                  <img
                    src={mandesigning}
                    className="w-full h-full object-cover"
                    width={520}
                    height={400}
                    alt="Scary robot"
                  />

                  {isVideoChatVisible && <VideoChatMessage />}
                </div>
              </div>
            </div>

            <Gradient />
          </div>
        </div>
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-n-7 text-white p-8 rounded-lg border border-white">
              <h3 className="text-xl font-bold mb-4">Your message has successfully been delivered</h3>
              <p>Our team will get back to you promptly to schedule a meeting or call. Expect a reply within 2 business days!</p>
              <button
                onClick={() => setIsPopupVisible(false)}
                className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Contact;
