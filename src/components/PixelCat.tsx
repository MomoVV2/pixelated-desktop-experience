
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

interface PixelCatProps {
  className?: string;
}

const messages = [
  "Meow! Need coffee?",
  "Coding time!",
  "Seoul is beautiful!",
  "I love jazz too!",
  "K-pop is life!",
  "Click on some folders!",
  "안녕하세요!",
  "こんにちは!",
  "مرحبا!",
  "Pet me!",
];

const PixelCat: React.FC<PixelCatProps> = ({ className }) => {
  const [position, setPosition] = useState<Position>({ x: 100, y: 300 });
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 100, y: 300 });
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [flipped, setFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set new random target position every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current.parentElement;
        if (container) {
          const maxX = container.clientWidth - 50;
          const maxY = container.clientHeight - 150;
          
          const newX = Math.max(50, Math.floor(Math.random() * maxX));
          const newY = Math.max(100, Math.floor(Math.random() * maxY));
          
          setTargetPosition({ x: newX, y: newY });
          setFlipped(newX < position.x);
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [position]);
  
  // Move toward target position
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(current => {
        const dx = targetPosition.x - current.x;
        const dy = targetPosition.y - current.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < 2) {
          return targetPosition;
        }
        
        const moveX = dx / distance * 2;
        const moveY = dy / distance * 2;
        
        return {
          x: current.x + moveX,
          y: current.y + moveY
        };
      });
    }, 50);
    
    return () => clearInterval(moveInterval);
  }, [targetPosition]);
  
  // Show random messages periodically
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMessage);
        setShowMessage(true);
        
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    }, 8000);
    
    return () => clearInterval(messageInterval);
  }, []);
  
  const handleCatClick = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn("absolute z-30 cursor-pointer-pixelated", className)}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: "transform 0.3s ease-out"
      }}
      onClick={handleCatClick}
    >
      <div 
        className="w-12 h-12 relative image-pixelate"
        style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}
      >
        {/* Pixel Cat Image */}
        <div className="w-12 h-12 bg-desktop-dark rounded-sm overflow-hidden border-2 border-desktop-accent flex items-center justify-center">
          <div className="text-desktop-accent font-pixel text-xs">^•ﻌ•^</div>
        </div>
        
        {/* Message Bubble */}
        {showMessage && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-max max-w-32 p-2 bg-desktop-window border border-desktop-border rounded-md text-xs text-white animate-fade-in whitespace-nowrap">
            {message}
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-desktop-window"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PixelCat;
