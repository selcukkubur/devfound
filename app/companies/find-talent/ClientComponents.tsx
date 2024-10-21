'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const AnimatedCircle = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    setPosition({
      top: Math.random() * 100,
      left: Math.random() * 100,
    })
  }, [])

  return (
    <div
      className="absolute rounded-full bg-white shadow-lg w-12 h-12 overflow-hidden animate-float"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        animationDelay: `${index * 0.5}s`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        className="rounded-full"
      />
    </div>
  )
}

export const AnimatedCircles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(10)].map((_, i) => (
      <AnimatedCircle
        key={i}
        src={`https://i.pravatar.cc/150?img=${i + 11}`}
        alt={`Profile ${i + 1}`}
        index={i}
      />
    ))}
  </div>
)

export const ClientSideStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  `}</style>
)
