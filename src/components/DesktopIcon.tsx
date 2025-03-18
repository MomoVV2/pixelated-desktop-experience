
import React from "react";
import { cn } from "@/lib/utils";

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  name,
  icon,
  onClick,
  isActive = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "desktop-icon",
        isActive && "active",
        className
      )}
      onClick={onClick}
    >
      <div className="desktop-icon-img">{icon}</div>
      <div className="desktop-icon-text">{name}</div>
    </div>
  );
};

export default DesktopIcon;
