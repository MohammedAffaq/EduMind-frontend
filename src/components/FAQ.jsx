import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = ({ className = "bg-white" }) => {
  const faqs = [
    {
      question: "What is the admission process?",
      answer: "Our admission process involves filling out an online application form, followed by an entrance test and an interview with the principal. Please visit our Admissions page for detailed steps and deadlines."
    },
    {
      question: "What are the school timings?",
      answer: "School timings are from 8:00 AM to 2:30 PM for all classes. The administrative office is open from 7:30 AM to 4:00 PM on weekdays."
    },
    {
      question: "Is transportation facility available?",
      answer: "Yes, we provide safe and reliable bus transportation covering major routes across the city. All buses are equipped with GPS tracking for real-time monitoring."
    },
    {
      question: "What is the student-teacher ratio?",
      answer: "We maintain a healthy student-teacher ratio of 25:1 to ensure personalized attention and effective learning for every student."
    },
    {
      question: "Do you offer extracurricular activities?",
      answer: "Absolutely! We offer a wide range of activities including sports, music, dance, art, robotics, and debate clubs to foster holistic development."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={`py-20 ${className}`} id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Find answers to common questions about our school.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 bg-white text-gray-700 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;