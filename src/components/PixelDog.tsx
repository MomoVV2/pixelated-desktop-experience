
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

interface PixelDogProps {
  className?: string;
  scale?: number;
  colorScheme?: string;
  animationSpeed?: "slow" | "normal" | "fast";
}

const messages = [
  "Woof! Let's play!",
  "I love walks!",
  "Got treats?",
  "Squirrel!",
  "Ball! Ball! Ball!",
  "Pet me please!",
  "안녕하세요!",
  "こんにちは!",
  "مرحبا!",
  "Ruff ruff!",
  "Drag me around!",
  "Ouch! That hurt!",
  "The taskbar is comfy!",
  "Digital bones please!",
  "I'm a good boy!",
];

const PixelDog: React.FC<PixelDogProps> = ({ 
  className, 
  scale = 100,
  colorScheme = "momo",
  animationSpeed = "normal"
}) => {
  const [position, setPosition] = useState<Position>({ x: 200, y: 350 });
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 200, y: 350 });
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [isOnTaskbar, setIsOnTaskbar] = useState(false);
  const [dogColor, setDogColor] = useState("yellow-400");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate movement speed based on animation speed
  const getMovementSpeed = () => {
    switch(animationSpeed) {
      case "slow": return 1;
      case "fast": return 4;
      default: return 2;
    }
  };
  
  // Set new random target position every 6 seconds
  useEffect(() => {
    if (isBeingDragged) return;
    
    const interval = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current.parentElement;
        if (container) {
          const maxX = container.clientWidth - 50;
          // Don't go too low to avoid the taskbar
          const maxY = container.clientHeight - 150;
          
          const newX = Math.max(50, Math.floor(Math.random() * maxX));
          const newY = Math.max(100, Math.floor(Math.random() * maxY));
          
          setTargetPosition({ x: newX, y: newY });
          setFlipped(newX < position.x);
        }
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [position, isBeingDragged]);
  
  // Move toward target position if not being dragged
  useEffect(() => {
    if (isBeingDragged) return;
    
    const moveInterval = setInterval(() => {
      setPosition(current => {
        const dx = targetPosition.x - current.x;
        const dy = targetPosition.y - current.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < 2) {
          return targetPosition;
        }
        
        const moveX = dx / distance * getMovementSpeed();
        const moveY = dy / distance * getMovementSpeed();
        
        return {
          x: current.x + moveX,
          y: current.y + moveY
        };
      });
    }, 50);
    
    return () => clearInterval(moveInterval);
  }, [targetPosition, isBeingDragged, animationSpeed]);
  
  // Check if dog is on taskbar
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current.parentElement;
      if (container) {
        const taskbarY = container.clientHeight - 48;
        if (position.y > taskbarY - 20 && !isOnTaskbar) {
          setIsOnTaskbar(true);
          showDogMessage("Woof! The taskbar is fun!");
        } else if (position.y <= taskbarY - 20 && isOnTaskbar) {
          setIsOnTaskbar(false);
        }
      }
    }
  }, [position]);
  
  // Show random messages periodically if not being dragged
  useEffect(() => {
    if (isBeingDragged) return;
    
    const messageInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showDogMessage(randomMessage);
      }
    }, 10000);
    
    return () => clearInterval(messageInterval);
  }, [isBeingDragged]);
  
  const showDogMessage = (msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  
  const handleDogClick = () => {
    if (!isBeingDragged) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      showDogMessage(randomMessage);
    }
  };
  
  const handleDragStart = () => {
    setIsBeingDragged(true);
  };
  
  const handleDragEnd = (event: any, info: any) => {
    setIsBeingDragged(false);
    
    // Update position based on drag
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    });
    
    // Also update target position to match current
    setTargetPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    });
    
    // Check if dropped on taskbar
    if (containerRef.current) {
      const container = containerRef.current.parentElement;
      if (container) {
        const taskbarY = container.clientHeight - 48;
        if (position.y + info.offset.y > taskbarY - 20) {
          showDogMessage("Woof! I like it down here!");
        }
      }
    }
  };
  
  const handleColorChange = () => {
    const colors = ["yellow-400", "brown-400", "gray-400", "white", "black", "desktop-accent"];
    const currentIndex = colors.indexOf(dogColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setDogColor(colors[nextIndex]);
    showDogMessage("New fur color!");
  };
  
  // Get dog face based on color scheme
  const getDogFace = () => {
    if (colorScheme === "neon") {
      return "ʕ•ᴥ•ʔ";
    } else if (colorScheme === "pastel") {
      return "U・ᴥ・U";
    } else if (colorScheme === "monochrome") {
      return "ʕ•_•ʔ";
    } else {
      return "ʕ•ᴥ•ʔ";
    }
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className={cn("absolute z-30 cursor-pointer-pixelated", className)}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: "transform 0.3s ease-out",
        scale: scale / 100
      }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleDogClick}
    >
      <div 
        className="w-14 h-12 relative image-pixelate"
        style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}
      >
        {/* Pixel Dog Image */}
        <div 
          className={`w-14 h-12 bg-desktop-dark rounded-sm overflow-hidden border-2 flex items-center justify-center ${
            isOnTaskbar ? "border-green-400" : `border-${dogColor}`
          }`}
          onDoubleClick={handleColorChange}
        >
          <div className={`text-${dogColor} font-pixel text-xs`}>{getDogFace()}</div>
        </div>
        
        {/* Message Bubble */}
        {showMessage && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-max max-w-32 p-2 bg-desktop-window border border-desktop-border rounded-md text-xs text-white animate-fade-in whitespace-nowrap">
            {message}
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-desktop-window"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PixelDog;
