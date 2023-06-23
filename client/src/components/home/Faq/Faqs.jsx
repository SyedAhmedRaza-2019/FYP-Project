import React, { useState } from 'react';
import Heading from '../../common/Heading';
import Back from '../../common/Back';

const Faqs = () => {
  const faqData = [
    {
      id: 1,
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.',
    },
    {
      id: 2,
      question: 'What are the benefits of using React?',
      answer:
        'React allows developers to build reusable UI components, and it has a virtual DOM that makes rendering faster and more efficient.',
    },
    {
      id: 3,
      question: 'How do I install React?',
      answer: 'You can install React by running `npm install react` or `yarn add react`.',
    },
    {
      id: 4,
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.',
    },
    {
      id: 5,
      question: 'What are the benefits of using React?',
      answer:
        'React allows developers to build reusable UI components, and it has a virtual DOM that makes rendering faster and more efficient.',
    },
    {
      id: 6,
      question: 'How do I install React?',
      answer: 'You can install React by running `npm install react` or `yarn add react`.',
    },

  ];

  const [expanded, setExpanded] = useState(null); // Use null instead of an empty array

  const toggleExpanded = (id) => {
    if (expanded === id) {
      setExpanded(null); // Close the question if already expanded
    } else {
      setExpanded(id); // Open the selected question
    }
  };

  return (
    <div className="flexx p-20 flex-col md:flex-row">
      <div className="w-full md:w-full sm:w-full text-center">
       
       {/* <Back name="abc" title="xfh" />  */}
        <Heading title="Any Questions?" subtitle="We got you." />
      </div>
      <div className="w-3/4 max-w-2xl mx-auto p-12">
        <h2 className="md:text-2xl text-xl font-bold mb-10">Frequently Asked Questions</h2>
        <ul>
          {faqData.map(({ id, question, answer }) => (
            <li key={id} className="mb-4">
              <button
                onClick={() => toggleExpanded(id)}
                className="flex justify-between items-center w-full p-4 bg-gray-200 text-left hover:bg-gray-300 transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <span>{question}</span>
                {expanded === id ? ( // Check if the current question is expanded
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              {expanded === id && ( // Render the answer if the current question is expanded
                <div className="bg-gray-100 p-4 mt-2 rounded-md">
                  <p className="text-gray-700">{answer}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faqs;
