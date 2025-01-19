"use client";

import { useState } from 'react';

const FAQAccordion = () => {
  const [open, setOpen] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpen(open === index ? null : index);
  };

  const faqs = [
    { question : "How to post a job?", answer: "On your navigation bar, click on 'Post a job'..." },
    { question: "next question", answer: "bla bla bla..." },
    { question: "Other question", answer: "Lorem ipsum..." },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index}>
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left font-medium hover:text-orange-500"
          >
            {faq.question}
          </button>
          {open === index && <p className=" mt-2 text-gray-600">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
