
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedDesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  className?: string;
}

// Different language translations
const translations: { [key: string]: { jp: string; kr: string; ar: string } } = {
  "Projects": {
    jp: "プロジェクト",
    kr: "프로젝트",
    ar: "مشاريع",
  },
  "About Me": {
    jp: "自己紹介",
    kr: "소개",
    ar: "عني",
  },
  "Travel": {
    jp: "旅行",
    kr: "여행",
    ar: "سفر",
  },
  "Music": {
    jp: "音楽",
    kr: "음악",
    ar: "موسيقى",
  },
  "Cats": {
    jp: "猫",
    kr: "고양이",
    ar: "قطط",
  },
  "Coffee": {
    jp: "コーヒー",
    kr: "커피",
    ar: "قهوة",
  },
};

const AnimatedDesktopIcon: React.FC<AnimatedDesktopIconProps> = ({
  name,
  icon,
  onClick,
  isActive = false,
  position,
  onPositionChange,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [displayName, setDisplayName] = useState(name);
  const [displayType, setDisplayType] = useState<'en' | 'jp' | 'kr' | 'ar'>('en');
  
  // Change text on hover
  const handleHover = () => {
    setIsHovered(true);
    const randomLang = Math.floor(Math.random() * 3);
    
    if (translations[name]) {
      if (randomLang === 0) {
        setDisplayName(translations[name].jp);
        setDisplayType('jp');
      } else if (randomLang === 1) {
        setDisplayName(translations[name].kr);
        setDisplayType('kr');
      } else {
        setDisplayName(translations[name].ar);
        setDisplayType('ar');
      }
    }
  };
  
  const handleHoverEnd = () => {
    setIsHovered(false);
    setDisplayName(name);
    setDisplayType('en');
  };
  
  return (
    <motion.div
      className={cn(
        "desktop-icon",
        isActive && "active",
        isDragging && "opacity-70",
        className
      )}
      initial={{ position: "absolute", left: position.x, top: position.y }}
      style={{ position: "absolute", left: position.x, top: position.y }}
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        onPositionChange({
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        });
      }}
      onClick={() => {
        if (!isDragging) onClick();
      }}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
    >
      <motion.div 
        className="desktop-icon-img"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayType}
          className={cn(
            "desktop-icon-text",
            displayType === 'jp' && "font-japanese",
            displayType === 'kr' && "font-korean",
            displayType === 'ar' && "font-arabic"
          )}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {displayName}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedDesktopIcon;
