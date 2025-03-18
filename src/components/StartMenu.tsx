
import React, { useState } from "react";
import { User, Code, Image, Music, Cat, Coffee, Info, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StartMenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onOpenWindow }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const handleItemClick = (id: string) => {
    onOpenWindow(id);
    onClose();
  };
  
  const menuItems: StartMenuItem[] = [
    {
      id: "aboutMe",
      icon: <User size={16} />,
      label: "About Me",
      onClick: () => handleItemClick("aboutMe"),
    },
    {
      id: "projects",
      icon: <Code size={16} />,
      label: "Projects",
      onClick: () => handleItemClick("projects"),
    },
    /*
    {
      id: "travel",
      icon: <Image size={16} />,
      label: "Travel",
      onClick: () => handleItemClick("travel"),
    },
    {
      id: "music",
      icon: <Music size={16} />,
      label: "Music",
      onClick: () => handleItemClick("music"),
    },
    {
      id: "cats",
      icon: <Cat size={16} />,
      label: "Cats",
      onClick: () => handleItemClick("cats"),
    },
    {
      id: "coffee",
      icon: <Coffee size={16} />,
      label: "Coffee",
      onClick: () => handleItemClick("coffee"),
    },
    {
      id: "about",
      icon: <Info size={16} />,
      label: "About This Site",
      onClick: () => handleItemClick("about"),
    },
        */
  ];
  
  // Different language versions of menu items
  const getTranslation = (id: string) => {
    switch (id) {
      case "aboutMe":
        return Math.random() < 0.33 ? "自己紹介" : Math.random() < 0.5 ? "소개" : "عني";
      case "projects":
        return Math.random() < 0.33 ? "プロジェクト" : Math.random() < 0.5 ? "프로젝트" : "مشاريع";
      case "travel":
        return Math.random() < 0.33 ? "旅行" : Math.random() < 0.5 ? "여행" : "سفر";
      case "music":
        return Math.random() < 0.33 ? "音楽" : Math.random() < 0.5 ? "음악" : "موسيقى";
      case "cats":
        return Math.random() < 0.33 ? "猫" : Math.random() < 0.5 ? "고양이" : "قطط";
      case "coffee":
        return Math.random() < 0.33 ? "コーヒー" : Math.random() < 0.5 ? "커피" : "قهوة";
      case "about":
        return Math.random() < 0.33 ? "サイトについて" : Math.random() < 0.5 ? "사이트 정보" : "حول الموقع";
      default:
        return "";
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute bottom-12 left-0 w-64 bg-desktop-window border border-desktop-border shadow-lg rounded-t-md overflow-hidden z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 bg-desktop-accent font-pixel text-xs text-white">
              Momo.OS
            </div>
            <div className="py-2">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex items-center px-4 py-2 hover:bg-desktop-accent/20 cursor-pointer-pixelated transition-colors"
                  onClick={item.onClick}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-desktop-accent mr-3">{item.icon}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={hoveredItem === item.id ? "translated" : "original"}
                      className="text-white text-sm"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {hoveredItem === item.id ? getTranslation(item.id) : item.label}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div
              className="flex items-center p-3 bg-desktop-border/50 text-white/80 text-xs hover:bg-desktop-accent/20 cursor-pointer-pixelated"
              onClick={onClose}
            >
              <LogOut size={16} className="mr-2" />
              Close Menu
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StartMenu;
