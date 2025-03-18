import React, { useState, useRef, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, PanInfo } from "framer-motion";

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  className?: string;
  onClick?: () => void;
}

const Window: React.FC<WindowProps> = ({
  title,
  isOpen,
  onClose,
  children,
  initialPosition = { x: 100, y: 100 },
  className,
  onClick,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousPosition, setPreviousPosition] = useState(initialPosition);
  const [previousSize, setPreviousSize] = useState({ width: 600, height: 400 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMaximized) {
      const newX = Math.max(0, Math.min(window.innerWidth - 200, position.x + info.delta.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 100, position.y + info.delta.y));
      
      setPosition({
        x: newX,
        y: newY
      });
    }
  };
  
  const handleDragStart = () => {
    setIsDragging(true);
    if (onClick) {
      onClick();
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };
  
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isMaximized) {
      setPreviousPosition({ ...position });
      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        setPreviousSize({ width: rect.width, height: rect.height });
      }
    }
    
    setIsMaximized(!isMaximized);
  };

  if (!isOpen) return null;
  
  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      className={cn("window absolute", className)}
      style={{
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 0 : `${position.y}px`,
        width: isMaximized ? "100%" : undefined,
        height: isMaximized ? "calc(100vh - 48px)" : undefined,
        maxHeight: isMaximized ? "calc(100vh - 48px)" : "80vh",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <motion.div 
        className="window-header" 
        onDoubleClick={handleMaximize}
        drag={!isMaximized}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragListener={!isMaximized}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <h3 className="text-xs">{title}</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleMinimize} 
            className="focus:outline-none hover:bg-white/10 p-0.5 rounded"
          >
            <Minus size={12} />
          </button>
          <button 
            onClick={handleMaximize} 
            className="focus:outline-none hover:bg-white/10 p-0.5 rounded"
          >
            <Square size={12} />
          </button>
          <button 
            onClick={onClose} 
            className="focus:outline-none hover:bg-red-500/80 p-0.5 rounded"
          >
            <X size={12} />
          </button>
        </div>
      </motion.div>
      <div className="window-content">{children}</div>
    </motion.div>
  );
};

export default Window;
