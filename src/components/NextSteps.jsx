import React from 'react';
import Section from './Section';
import Heading from './Heading';

const NextSteps = () => {
  const steps = [
    {
      id: 1,
      title: 'Initial Consultation',
      text: "After receiving your service request, we’ll schedule a meeting to discuss your vision and project requirements in detail.",
    },
    {
      id: 2,
      title: 'Proposal Presentation',
      text: "We will develop a tailored proposal outlining the project scope, timeline, and cost, and present it for your review and approval.",
    },
    {
      id: 3,
      title: 'Contract Agreement',
      text: "Once you approve the proposal, we’ll provide a detailed contract. This ensures clarity and sets expectations for both parties.",
    },
    {
      id: 4,
      title: 'Project Kickoff',
      text: "With the contract signed, we’ll kick off the project, keeping you informed with regular updates and maintaining the highest level of professionalism throughout.",
    },
  ];

  return (
    <Section id="next-steps">
      <div className="container mx-auto px-5 sm:px-0 relative flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-16">
        <Heading 
            title="Next Steps."
            tag="What you should expect after approaching us"
          />
        </div>
        <div className="lg:w-1/2">
          <div className="relative flex flex-col space-y-10">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex items-start pl-16">
                <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 bg-gray-900 border-2 border-gray-700 text-white font-bold rounded-full">
                  {index + 1}
                </div>
                <div className=" max-w-md">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-400">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NextSteps;
