import React from 'react'
import NumberFlow from '@number-flow/react'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CourseCardProps {
  title: string
  category: string
  description: string
  monthlyFee: number
  popular: boolean
  imageUrl: string
  onEnroll: () => void
}

export default function CourseCard({
  title,
  category,
  description,
  monthlyFee,
  popular,
  imageUrl,
  onEnroll,
}: CourseCardProps) {


  return (
    <div className="group relative glass-panel rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:border-[#3DD68C]/50 hover:-translate-y-2 hover-glow flex flex-col h-full">
      
      {/* Image container */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1B2A6B] to-[#243380]">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {popular && (
          <div className="absolute top-[10px] left-[10px] bg-[#3DD68C] text-[#111C4E] text-[10px] font-semibold tracking-[0.06em] uppercase px-2.5 py-1 rounded-full z-10">
            Popular
          </div>
        )}
        
        <button 
          className="absolute top-[10px] right-[10px] w-8 h-8 rounded-full bg-[#111C4E]/70 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
        >
          <Bookmark size={16} />
        </button>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="font-['Tenor_Sans'] text-base tracking-[0.04em] text-white mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </div>
        
        <div className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#3DD68C] font-medium tracking-[0.06em] mb-2">
          {category}
        </div>
        
        <div className="font-['Plus_Jakarta_Sans'] text-xs text-[#B8C0E0] leading-[1.6] mb-[14px] flex-grow">
          {description}
        </div>
        
        <div className="flex items-center justify-between mb-4 mt-auto">
          {/* Price display */}
          <div className="flex items-baseline gap-1">
            <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#B8C0E0]">₹</span>
            <NumberFlow 
              value={monthlyFee} 
              className="font-['Tenor_Sans'] text-[22px] text-white"
            />
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#B8C0E0]">
              /month
            </span>
          </div>
        </div>
        
        {/* Enroll button */}
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onEnroll()
          }}
          className="w-full bg-[#3DD68C]/10 border border-[#3DD68C]/25 text-[#3DD68C] rounded-[10px] p-2.5 font-['Plus_Jakarta_Sans'] text-[13px] font-medium transition-all duration-300 ease-in hover:bg-[#3DD68C] hover:text-[#111C4E] button-shine"
        >
          Enroll in this Course &rarr;
        </button>
      </div>
    </div>
  )
}
