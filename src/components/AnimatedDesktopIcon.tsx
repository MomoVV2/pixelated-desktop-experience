
import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
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
  "Customize": {
    jp: "カスタマイズ",
    kr: "사용자 지정",
    ar: "تخصيص",
  },
  "Github": {
    jp: "ギットハブ",
    kr: "깃허브",
    ar: "جيثب",
  },
  "LinkedIn": {
    jp: "リンクトイン",
    kr: "링크드인",
    ar: "لينكد إن",
  },
  "Twitter": {
    jp: "ツイッター",
    kr: "트위터",
    ar: "تويتر",
  },
  "Instagram": {
    jp: "インスタグラム",
    kr: "인스타그램",
    ar: "انستاغرام",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
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
  }, []);
  
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
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    if (containerSize.width === 0) return;
    
    // Calculate new position with boundary constraints
    const iconWidth = 100; // Approximate width of the icon
    const iconHeight = 100; // Approximate height of the icon
    
    const newX = Math.max(0, Math.min(containerSize.width - iconWidth, position.x + info.offset.x));
    const newY = Math.max(0, Math.min(containerSize.height - iconHeight - 48, position.y + info.offset.y)); // Subtract taskbar height
    
    // Update position
    onPositionChange({ x: newX, y: newY });
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "desktop-icon",
        isActive && "active",
        isDragging && "opacity-70",
        className
      )}
      style={{ 
        position: "absolute", 
        left: position.x, 
        top: position.y,
        touchAction: "none" // Improve touch dragging
      }}
      drag
      dragMomentum={false}
      dragTransition={{ power: 0, timeConstant: 0 }} // Instant response to drag
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
