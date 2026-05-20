'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import CourseCard from './CourseCard'

const CURRICULA = [
  {
    id: 'cbse',
    label: 'CBSE',
    fullName: 'Central Board of Secondary Education',
    emoji: '🏛️',
    description: 'National curriculum followed across India, known for its structured syllabus and competitive exam alignment.',
    courses: [
      {
        id: 'cbse-2-4',
        title: 'Grades 2–4 (All Subjects)',
        category: 'Primary · CBSE',
        description: 'Comprehensive foundational learning covering all subjects.',
        monthlyFee: 2000,
        imageUrl: '/images/courses/math.jpg',
        popular: false,
      },
      {
        id: 'cbse-5-6',
        title: 'Grades 5–6 (All Subjects)',
        category: 'Middle · CBSE',
        description: 'Core subject development aligned with CBSE curriculum.',
        monthlyFee: 2500,
        imageUrl: '/images/courses/science.jpg',
        popular: false,
      },
      {
        id: 'cbse-7',
        title: 'Grade 7 (All Subjects)',
        category: 'Middle · CBSE',
        description: 'Preparation for higher classes with all major subjects.',
        monthlyFee: 3500,
        imageUrl: '/images/courses/pcm.jpg',
        popular: true,
      },
      {
        id: 'cbse-8',
        title: 'Grade 8 (Math, Science, Social)',
        category: 'Middle · CBSE',
        description: 'Focus on Mathematics, Science, and Social Studies.',
        monthlyFee: 3500,
        imageUrl: '/images/courses/pcb.jpg',
        popular: false,
      },
      {
        id: 'cbse-9',
        title: 'Grade 9 (Math, Physics, Chemistry)',
        category: 'Secondary · CBSE',
        description: 'Specialized focus on PCM for Class 9 students.',
        monthlyFee: 5000,
        imageUrl: '/images/courses/math.jpg',
        popular: true,
      },
      {
        id: 'cbse-10',
        title: 'Grade 10 (Math, Physics, Chemistry)',
        category: 'Secondary · CBSE',
        description: 'Board exam preparation for Mathematics, Physics, and Chemistry.',
        monthlyFee: 5000,
        imageUrl: '/images/courses/science.jpg',
        popular: false,
      },
    ],
  },
  {
    id: 'icse',
    label: 'ICSE',
    fullName: 'Indian Certificate of Secondary Education',
    emoji: '📘',
    description: 'English-focused curriculum known for analytical depth, literature, and comprehensive subject coverage.',
    courses: [
      {
        id: 'icse-2-4',
        title: 'Grades 2–4 (All Subjects)',
        category: 'Primary · ICSE',
        description: 'Strong foundational learning with ICSE standards.',
        monthlyFee: 3000,
        imageUrl: '/images/courses/english.jpg',
        popular: false,
      },
      {
        id: 'icse-5-6',
        title: 'Grades 5–6 (All Subjects)',
        category: 'Middle · ICSE',
        description: 'In-depth conceptual learning across all subjects.',
        monthlyFee: 3500,
        imageUrl: '/images/courses/science.jpg',
        popular: false,
      },
      {
        id: 'icse-7',
        title: 'Grade 7 (Math & Science)',
        category: 'Middle · ICSE',
        description: 'Analytical focus on Math and Science.',
        monthlyFee: 4500,
        imageUrl: '/images/courses/math.jpg',
        popular: false,
      },
      {
        id: 'icse-8',
        title: 'Grade 8 (Math & Science)',
        category: 'Middle · ICSE',
        description: 'Preparation for higher analytical concepts.',
        monthlyFee: 5000,
        imageUrl: '/images/courses/science.jpg',
        popular: true,
      },
      {
        id: 'icse-9',
        title: 'Grade 9 (Math & Science)',
        category: 'Secondary · ICSE',
        description: 'Rigorous focus on core subjects.',
        monthlyFee: 5000,
        imageUrl: '/images/courses/math.jpg',
        popular: false,
      },
      {
        id: 'icse-10',
        title: 'Grade 10 (Math & Physics)',
        category: 'Secondary · ICSE',
        description: 'ICSE board exam preparation.',
        monthlyFee: 5000,
        imageUrl: '/images/courses/science.jpg',
        popular: false,
      },
    ],
  },
  {
    id: 'ssc',
    label: 'SSC',
    fullName: 'Secondary School Certificate — Telangana State Board',
    emoji: '🎓',
    description: 'Telangana State Board syllabus for Grades 6 to 10, aligned with local board exams and EAMCET foundation.',
    courses: [
      {
        id: 'ssc-2-4',
        title: 'Grades 2–4 (All Subjects)',
        category: 'Primary · SSC',
        description: 'Foundational concepts for Telangana State Board.',
        monthlyFee: 2000,
        imageUrl: '/images/courses/math.jpg',
        popular: false,
      },
      {
        id: 'ssc-5-6',
        title: 'Grades 5–6 (All Subjects)',
        category: 'Middle · SSC',
        description: 'Core subject mastery for state board curriculum.',
        monthlyFee: 2500,
        imageUrl: '/images/courses/science.jpg',
        popular: false,
      },
      {
        id: 'ssc-7',
        title: 'Grade 7 (All Subjects)',
        category: 'Middle · SSC',
        description: 'Complete curriculum coverage for Class 7.',
        monthlyFee: 3000,
        imageUrl: '/images/courses/biology.jpg',
        popular: false,
      },
      {
        id: 'ssc-8',
        title: 'Grade 8 (Math, Science, Social)',
        category: 'Middle · SSC',
        description: 'Focused learning on essential subjects.',
        monthlyFee: 3500,
        imageUrl: '/images/courses/social.jpg',
        popular: true,
      },
      {
        id: 'ssc-9',
        title: 'Grade 9 (Math, Physics, Chemistry)',
        category: 'Secondary · SSC',
        description: 'Targeted state board preparation.',
        monthlyFee: 4000,
        imageUrl: '/images/courses/math.jpg',
        popular: false,
      },
      {
        id: 'ssc-10',
        title: 'Grade 10 (Math, Physics, Chemistry)',
        category: 'Secondary · SSC',
        description: 'SSC board exam intensive coaching.',
        monthlyFee: 5000,
        imageUrl: '/images/courses/science.jpg',
        popular: false,
      },
    ],
  },
  {
    id: 'ib',
    label: 'IB',
    fullName: 'International Baccalaureate',
    emoji: '🌐',
    description: 'Globally recognized curriculum focusing on critical thinking, research, and international standards.',
    courses: [
      {
        id: 'ib-2-4',
        title: 'Grades 2–4 (All Subjects)',
        category: 'Primary · IB',
        description: 'Inquiry-based learning for early years.',
        monthlyFee: 3000,
        imageUrl: '/images/courses/math.jpg',
        popular: false,
      },
      {
        id: 'ib-2-6',
        title: 'Grades 2–6 (All Subjects)',
        category: 'Middle Years · IB',
        description: 'Holistic development across all subjects.',
        monthlyFee: 4000,
        imageUrl: '/images/courses/science.jpg',
        popular: false,
      },
      {
        id: 'ib-7',
        title: 'Grade 7 (Math & Science)',
        category: 'Middle Years · IB',
        description: 'Conceptual focus on Mathematics and Science.',
        monthlyFee: 4000,
        imageUrl: '/images/courses/chemistry.jpg',
        popular: false,
      },
      {
        id: 'ib-8',
        title: 'Grade 8 (Math & Science)',
        category: 'Middle Years · IB',
        description: 'Advanced MYP concepts in Math and Science.',
        monthlyFee: 5000,
        imageUrl: '/images/courses/math.jpg',
        popular: true,
      },
      {
        id: 'ib-9-10',
        title: 'Grades 9–10 (Math & Physics)',
        category: 'Secondary · IB',
        description: 'Rigorous preparation for IB diploma track.',
        monthlyFee: 6000,
        imageUrl: '/images/courses/science.jpg',
        popular: false,
      },
    ],
  },
]

export default function CurriculumSection() {
  const [activeCurriculum, setActiveCurriculum] = useState('cbse')
  const activeIndex = CURRICULA.findIndex(c => c.id === activeCurriculum)
  const activeCurriculumData = CURRICULA[activeIndex]

  return (
    <section className="bg-gradient-to-br from-[#111C4E] via-[#162152] to-[#0A1A12] py-[80px] px-[28px] relative overflow-hidden">
      {/* Decorative gradient orb for blending */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DD68C]/5 blur-[120px] rounded-full pointer-events-none" />
      <style>{`
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes infoEnter {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {/* Section Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#3DD68C]"></div>
        <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium tracking-[0.12em] uppercase text-[#3DD68C]">
          OUR CURRICULA
        </span>
      </div>
      
      <h2 className="font-['Tenor_Sans'] text-[clamp(28px,4vw,42px)] font-normal text-white tracking-[0.06em] text-center mb-3 text-glow">
        Boards & Curricula We Teach
      </h2>
      
      <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#B8C0E0] leading-[1.8] text-center max-w-[520px] mx-auto mb-12">
        Click on any curriculum board to explore the courses and programmes we offer under it.
      </p>

      {/* Board Selector */}
      <div className="flex gap-3 glass-panel rounded-[20px] p-2 w-fit mx-auto mb-10 relative">
        <div 
          className="absolute inset-y-2 bg-[#3DD68C] rounded-xl z-10 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_rgba(61,214,140,0.4)]"
          style={{ 
            width: 'calc(25% - 4px)',
            transform: `translateX(calc(${activeIndex} * (100% + 5.33px)))`
          }}
        />
        {CURRICULA.map((curriculum, index) => (
          <button
            key={curriculum.id}
            onClick={() => setActiveCurriculum(curriculum.id)}
            className={cn(
              "font-['Plus_Jakarta_Sans'] text-sm font-medium px-6 py-2.5 rounded-[14px] border-none cursor-pointer relative z-20 transition-colors duration-300 flex items-center gap-2",
              activeCurriculum === curriculum.id ? "text-[#111C4E]" : "text-[#B8C0E0] bg-transparent"
            )}
          >
            <span className="text-base">{curriculum.emoji}</span>
            {curriculum.label}
          </button>
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* Active Curriculum Info Strip */}
        <div 
          key={`info-${activeCurriculum}`}
          className="glass-panel rounded-2xl p-5 md:px-6 md:py-5 mb-8 flex items-center gap-4"
          style={{ animation: 'infoEnter 0.35s ease-out forwards' }}
        >
          <div className="w-14 h-14 rounded-full bg-[#3DD68C]/10 flex items-center justify-center text-[28px] shrink-0">
            {activeCurriculumData.emoji}
          </div>
          <div>
            <h3 className="font-['Tenor_Sans'] text-lg text-white tracking-[0.05em] mb-1">
              {activeCurriculumData.fullName}
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#B8C0E0] leading-[1.6]">
              {activeCurriculumData.description}
            </p>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div 
          key={`grid-${activeCurriculum}`} 
          className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 w-full"
        >
          {activeCurriculumData.courses.map((course, index) => (
            <div 
              key={course.id}
              style={{ 
                animation: 'cardEnter 350ms cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: `${index * 60}ms`
              }}
            >
              <CourseCard
                title={course.title}
                category={course.category}
                description={course.description}
                monthlyFee={course.monthlyFee}
                popular={course.popular}
                imageUrl={course.imageUrl}
                onEnroll={() => {}}
              />
            </div>
          ))}
        </div>
        
        {/* Bottom Row */}
        <div className="mt-12 flex justify-center items-center font-['Plus_Jakarta_Sans'] text-sm">
          <span className="text-[#B8C0E0]">Can&apos;t find your board or subject?</span>
          <button className="text-[#3DD68C] font-medium border-b border-[#3DD68C]/40 pb-[2px] ml-2 cursor-pointer transition-colors duration-300 hover:border-[#3DD68C]">
            Contact us for a custom schedule &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
