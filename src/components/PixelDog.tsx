
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
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  // Calculate movement speed based on animation speed
  const getMovementSpeed = () => {
    switch(animationSpeed) {
      case "slow": return 1;
      case "fast": return 4;
      default: return 2;
    }
  };
  
  // Update container size on mount and resize
  useEffect(() => {
    const updateContainerSize = () => {
      const container = containerRef.current?.parentElement;
      if (container) {
        setContainerSize({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };
    
    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [scale]);
  
  // Set new random target position every 6 seconds
  useEffect(() => {
    if (isBeingDragged || containerSize.width === 0) return;
    
    const interval = setInterval(() => {
      // Calculate safe area boundaries (avoid edges and taskbar)
      const maxX = containerSize.width - 70;
      const maxY = containerSize.height - 120;
      
      // Generate random position within boundaries
      const newX = Math.max(70, Math.floor(Math.random() * maxX));
      const newY = Math.max(100, Math.floor(Math.random() * maxY));
      
      setTargetPosition({ x: newX, y: newY });
      setFlipped(newX < position.x);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [position, isBeingDragged, containerSize]);
  
  // Move toward target position if not being dragged
  useEffect(() => {
    if (isBeingDragged || containerSize.width === 0) return;
    
    const moveInterval = setInterval(() => {
      setPosition(current => {
        const dx = targetPosition.x - current.x;
        const dy = targetPosition.y - current.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        // If very close to target, snap to it
        if (distance < 2) {
          return targetPosition;
        }
        
        // Move towards target at appropriate speed
        const moveX = dx / distance * getMovementSpeed();
        const moveY = dy / distance * getMovementSpeed();
        
        return {
          x: current.x + moveX,
          y: current.y + moveY
        };
      });
    }, 16); // ~60fps for smoother animation
    
    return () => clearInterval(moveInterval);
  }, [targetPosition, isBeingDragged, animationSpeed, containerSize]);
  
  // Check if dog is on taskbar
  useEffect(() => {
    if (containerSize.height === 0) return;
    
    const taskbarY = containerSize.height - 48; // Taskbar height is typically 48px
    
    if (position.y > taskbarY - 20 && !isOnTaskbar) {
      setIsOnTaskbar(true);
      showDogMessage("Woof! The taskbar is fun!");
    } else if (position.y <= taskbarY - 20 && isOnTaskbar) {
      setIsOnTaskbar(false);
    }
  }, [position, containerSize]);
  
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
    
    if (containerSize.width === 0) return;
    
    // Calculate new position with boundary constraints
    const newX = Math.max(0, Math.min(containerSize.width - 60, position.x + info.offset.x));
    const newY = Math.max(0, Math.min(containerSize.height - 60, position.y + info.offset.y));
    
    // Update position
    setPosition({ x: newX, y: newY });
    
    // Also update target position to match current
    setTargetPosition({ x: newX, y: newY });
    
    // Check if dropped on taskbar
    const taskbarY = containerSize.height - 48;
    if (newY > taskbarY - 20) {
      showDogMessage("Woof! I like it down here!");
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
        scale: scale / 100
      }}
      drag
      dragMomentum={false}
      dragTransition={{ power: 0, timeConstant: 0 }} // Instant response to drag
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
