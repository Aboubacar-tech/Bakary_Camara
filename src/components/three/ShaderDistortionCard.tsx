import React, { useRef, useState } from 'react';

interface ShaderDistortionCardProps {
  className?: string;
  children: React.ReactNode;
  accentColor?: string;
  intensity?: number;
}

export const ShaderDistortionCard: React.FC<ShaderDistortionCardProps> = ({
  className = '',
  children,
  accentColor = '#f59e0b'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group transition-all duration-300 ${className}`}
      style={{
        backgroundImage: isHovered
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${accentColor}18 0%, transparent 65%)`
          : undefined
      }}
    >
      {/* Interactive mouse-following luminous aura */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-[inherit]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, ${accentColor}1f, transparent 70%)`
        }}
        aria-hidden="true"
      />

      {/* Subtle border reflection highlight on hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 border"
        style={{
          opacity: isHovered ? 0.7 : 0,
          borderColor: accentColor,
          maskImage: `radial-gradient(220px circle at ${mousePos.x}% ${mousePos.y}%, black, transparent)`
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
