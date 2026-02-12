import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Calendar, Users, CreditCard, Download, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../components/Footer';

const AdmissionsPage = () => {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);

  const steps = [
    {
      title: "Online Registration",
      description: "Complete the online application form available on our website. Ensure all details are accurate and upload the required documents (birth certificate, previous report cards, etc.).",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "Document Verification",
      description: "Our admissions office will review your application and documents. You will receive a confirmation email within 2-3 working days regarding the status of your application.",
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Entrance Assessment",
      description: "For students seeking admission from Class 1 onwards, a written assessment will be conducted to gauge their proficiency in English, Mathematics, and Science.",
      icon: Calendar,
      color: "bg-purple-500"
    },
    {
      title: "Parent Interaction",
      description: "Shortlisted candidates and their parents will be invited for an interaction with the Principal or Head of Admissions to align on educational goals.",
      icon: Users,
      color: "bg-orange-500"
    },
    {
      title: "Fee Payment & Enrollment",
      description: "Once the admission is granted, parents are required to pay the admission fee within the stipulated time to secure the seat.",
      icon: CreditCard,
      color: "bg-teal-500"
    }
  ];

  const forms = [
    { name: "Admission Application Form 2026-27", size: "1.5 MB" },
    { name: "Medical Health Record Form", size: "0.8 MB" },
    { name: "School Transport Registration Form", size: "1.2 MB" },
    { name: "Transfer Certificate Request", size: "0.5 MB" }
  ];

  const faqs = [
    {
      question: "When does the admission process start?",
      answer: "Admissions for the upcoming academic year typically open in October. We recommend applying early as seats are limited."
    },
    {
      question: "What is the age criteria for Class 1 admission?",
      answer: "The child must have completed 6 years of age as of June 1st of the academic year for admission into Class 1."
    },
    {
      question: "Is there an entrance test for Kindergarten?",
      answer: "No, there is no formal written test for Kindergarten. We have a friendly interaction session with the child and parents."
    },
    {
      question: "Can I apply for admission mid-session?",
      answer: "Mid-session admissions are subject to the availability of seats in the respective class. Please contact the admissions office for current status."
    },
    {
      question: "What documents are required for registration?",
      answer: "You will need the child's birth certificate, passport-size photographs, previous year's report card (if applicable), and address proof."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-indigo-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                <img 
                  src="/assets/logo.png" 
                  alt="EduMind Logo" 
                  className="w-12 h-12 object-contain" 
                />
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                  EduMind
                </span>
              </div>
            </div>
            <button 
                onClick={() => navigate('/signup')}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30"
            >
                Apply Now
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
              alt="Admissions" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Admissions</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Join our community of learners. Your journey to excellence starts here.
            </p>
          </div>
        </section>

        {/* Admission Process Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Admission Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We have designed a simple and transparent admission process to ensure a smooth experience for parents and students.
              </p>
            </div>

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg mb-6 transition-transform transform group-hover:scale-110 ${step.color}`}>
                                <step.icon size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>

        {/* Downloadable Forms */}
        <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Downloadable Forms</h2>
                    <p className="text-gray-600">Access important forms and documents for the admission process.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {forms.map((form, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{form.name}</h4>
                                    <p className="text-xs text-gray-500">{form.size} • PDF</p>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                                <Download size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">Common queries regarding admissions.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center transition-colors focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                {activeFAQ === index ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                            {activeFAQ === index && (
                                <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200 text-sm leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdmissionsPage;