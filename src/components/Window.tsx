
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  className?: string;
}

const Window: React.FC<WindowProps> = ({
  title,
  isOpen,
  onClose,
  children,
  initialPosition = { x: 100, y: 100 },
  className,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
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
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={cn("window absolute z-10", className)}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "600px",
        maxHeight: "80vh",
      }}
    >
      <div className="window-header" onMouseDown={handleMouseDown}>
        <h3 className="text-xs">{title}</h3>
        <button onClick={onClose} className="focus:outline-none">
          <X size={16} />
        </button>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
};

export default Window;
