import React from 'react';
import { Award, Monitor, Users, Shield } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    { icon: <Award size={32} className="text-blue-600" />, title: "Academic Excellence", desc: "Rigorous curriculum designed for success." },
    { icon: <Monitor size={32} className="text-teal-600" />, title: "Smart Learning Tools", desc: "Interactive digital classrooms." },
    { icon: <Users size={32} className="text-purple-600" />, title: "Expert Teachers", desc: "Qualified and passionate educators." },
    { icon: <Shield size={32} className="text-orange-600" />, title: "Safe Campus", desc: "Secure and supportive environment." }
  ];

  return (
    <section className="px-8 py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group">
            <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;