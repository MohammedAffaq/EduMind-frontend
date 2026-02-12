import React from 'react';

const HeroIllustration = () => {
  return (
    <svg viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="900" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dx="2" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="1600" height="900" fill="url(#bgGradient)" />
      
      {/* Decorative Elements (Abstract Nature/School) */}
      <circle cx="1400" cy="850" r="300" fill="#D1FAE5" opacity="0.6" />
      <circle cx="900" cy="900" r="250" fill="#FEF3C7" opacity="0.5" />
      <path d="M100,100 Q150,50 200,100 T300,100" stroke="#BAE6FD" strokeWidth="4" fill="none" opacity="0.5" />
      <path d="M1400,150 Q1450,100 1500,150 T1600,150" stroke="#BAE6FD" strokeWidth="4" fill="none" opacity="0.5" />
      
      {/* Floating Icons (Subtle) */}
      <g opacity="0.3" fill="#60A5FA">
        <circle cx="200" cy="200" r="10" />
        <rect x="150" y="500" width="15" height="15" rx="2" transform="rotate(15 157 507)" />
        <path d="M1500 300 L1510 320 L1490 320 Z" transform="rotate(-10 1500 310)" />
      </g>

      {/* --- CHARACTERS GROUP (Right Side) --- */}
      <g transform="translate(800, 180)">
        
        {/* Student 1 (Back Left - Boy, Blue Uniform) */}
        <g transform="translate(0, 120)">
           {/* Backpack */}
           <path d="M20,60 Q-5,80 5,140 L75,140 Q85,80 60,60" fill="#93C5FD" />
           {/* Legs */}
           <path d="M30,280 L30,380" stroke="#1E3A8A" strokeWidth="12" strokeLinecap="round" />
           <path d="M60,280 L60,380" stroke="#1E3A8A" strokeWidth="12" strokeLinecap="round" />
           {/* Body */}
           <path d="M20,80 L70,80 L80,280 L10,280 Z" fill="#3B82F6" />
           {/* Head */}
           <circle cx="45" cy="50" r="32" fill="#FDE68A" />
           <path d="M15,40 Q10,10 45,5 Q80,10 75,40" fill="#1F2937" /> {/* Hair */}
           {/* Waving Arm */}
           <path d="M70,90 Q100,50 110,20" stroke="#FDE68A" strokeWidth="10" strokeLinecap="round" />
           <circle cx="110" cy="20" r="8" fill="#FDE68A" />
        </g>

        {/* Student 2 (Back Right - Girl, Yellow Uniform) */}
        <g transform="translate(480, 130)">
           {/* Backpack */}
           <path d="M20,60 Q-5,80 5,140 L75,140 Q85,80 60,60" fill="#FCA5A5" />
           {/* Legs */}
           <path d="M30,280 L30,380" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
           <path d="M60,280 L60,380" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
           {/* Body */}
           <path d="M20,80 L70,80 L85,280 L5,280 Z" fill="#FBBF24" />
           {/* Head */}
           <circle cx="45" cy="50" r="32" fill="#FDE68A" />
           <path d="M10,50 Q10,10 45,10 Q80,10 80,50 L80,80 Q45,90 10,80 Z" fill="#4B5563" /> {/* Hair */}
           {/* Raised Hand */}
           <path d="M20,90 Q-10,40 0,10" stroke="#FDE68A" strokeWidth="10" strokeLinecap="round" />
           <circle cx="0" cy="10" r="8" fill="#FDE68A" />
        </g>

        {/* TEACHER (Center - Female) */}
        <g transform="translate(220, 50)" filter="url(#softShadow)">
          {/* Legs */}
           <path d="M60,400 L60,550" stroke="#374151" strokeWidth="16" strokeLinecap="round" />
           <path d="M100,400 L100,550" stroke="#374151" strokeWidth="16" strokeLinecap="round" />
          
          {/* Dress */}
           <path d="M40,120 L120,120 L140,420 L20,420 Z" fill="#2DD4BF" />
          
          {/* Head */}
           <circle cx="80" cy="70" r="45" fill="#FDE68A" />
           <path d="M35,70 Q30,10 80,10 Q130,10 125,70 L125,110 Q80,120 35,110 Z" fill="#1F2937" /> {/* Hair */}
          {/* Face Details */}
           <path d="M70,85 Q80,95 90,85" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none" />
          
          {/* Arms holding book */}
           <path d="M40,150 Q10,220 50,240" stroke="#FDE68A" strokeWidth="14" strokeLinecap="round" />
           <path d="M120,150 Q150,220 110,240" stroke="#FDE68A" strokeWidth="14" strokeLinecap="round" />
          
          {/* Open Book */}
           <g transform="translate(50, 220)">
             <path d="M0,10 Q30,25 60,10 L60,50 Q30,65 0,50 Z" fill="#FFFFFF" />
             <path d="M60,10 Q90,25 120,10 L120,50 Q90,65 60,50 Z" fill="#E5E7EB" />
             <line x1="60" y1="10" x2="60" y2="50" stroke="#D1D5DB" strokeWidth="2" />
          </g>
        </g>

        {/* Student 3 (Front Left - Girl, Red Uniform) */}
        <g transform="translate(80, 250)">
           {/* Legs */}
           <path d="M30,250 L30,350" stroke="#7F1D1D" strokeWidth="12" strokeLinecap="round" />
           <path d="M60,250 L60,350" stroke="#7F1D1D" strokeWidth="12" strokeLinecap="round" />
           {/* Body */}
           <path d="M20,70 L70,70 L85,250 L5,250 Z" fill="#F87171" />
           {/* Head */}
           <circle cx="45" cy="45" r="30" fill="#FDE68A" />
           <path d="M15,45 Q10,5 45,5 Q80,5 75,45 L75,70 Q45,80 15,70 Z" fill="#000" /> {/* Hair */}
           {/* Backpack Straps */}
           <path d="M25,70 L25,120" stroke="#B91C1C" strokeWidth="6" strokeLinecap="round" />
           <path d="M65,70 L65,120" stroke="#B91C1C" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* Student 4 (Front Right - Boy, Pastel Green Uniform) */}
        <g transform="translate(400, 250)">
           {/* Legs */}
           <path d="M30,250 L30,350" stroke="#065F46" strokeWidth="12" strokeLinecap="round" />
           <path d="M60,250 L60,350" stroke="#065F46" strokeWidth="12" strokeLinecap="round" />
           {/* Body */}
           <path d="M20,70 L70,70 L80,250 L10,250 Z" fill="#86EFAC" />
           {/* Head */}
           <circle cx="45" cy="45" r="30" fill="#FDE68A" />
           <path d="M15,40 Q45,10 75,40" fill="#000" /> {/* Hair */}
           {/* Waving */}
           <path d="M70,80 L95,40" stroke="#86EFAC" strokeWidth="10" strokeLinecap="round" />
           <circle cx="95" cy="40" r="8" fill="#FDE68A" />
        </g>

        {/* Student 5 (Front Center - Girl, Pastel Purple) */}
        <g transform="translate(250, 280)">
           {/* Legs */}
           <path d="M30,220 L30,320" stroke="#4C1D95" strokeWidth="12" strokeLinecap="round" />
           <path d="M60,220 L60,320" stroke="#4C1D95" strokeWidth="12" strokeLinecap="round" />
           {/* Body */}
           <path d="M20,70 L70,70 L85,220 L5,220 Z" fill="#C4B5FD" />
           {/* Head */}
           <circle cx="45" cy="45" r="30" fill="#FDE68A" />
           <path d="M10,45 Q10,10 45,10 Q80,10 80,45 L80,80" fill="#4B5563" /> {/* Hair */}
        </g>

      </g>
    </svg>
  );
};

export default HeroIllustration;