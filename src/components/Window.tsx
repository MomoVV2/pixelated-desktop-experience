
import React, { useState, useRef, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousPosition, setPreviousPosition] = useState(initialPosition);
  const [previousSize, setPreviousSize] = useState({ width: 600, height: 400 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (windowRef.current && !isMaximized) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
    
    if (onClick) {
      onClick();
    }
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
      <div 
        className="window-header" 
        onMouseDown={handleMouseDown}
        onDoubleClick={handleMaximize}
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
      </div>
      <div className="window-content">{children}</div>
    </motion.div>
  );
};

export default Window;
