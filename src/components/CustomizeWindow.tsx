
import React, { useState } from "react";
import { Palette, Sliders, Layout, RefreshCw, Check } from "lucide-react";
import { motion } from "framer-motion";

interface CustomizeWindowProps {
  onApplyChanges: (settings: CustomSettings) => void;
  currentSettings: CustomSettings;
}

export interface CustomSettings {
  scale: number;
  colorScheme: "momo" | "neon" | "pastel" | "monochrome";
  animationSpeed: "slow" | "normal" | "fast";
  layout: "default" | "centered" | "minimal";
}

const CustomizeWindow: React.FC<CustomizeWindowProps> = ({
  onApplyChanges,
  currentSettings,
}) => {
  const [settings, setSettings] = useState<CustomSettings>(currentSettings);
  
  const colorSchemes = [
    { id: "momo", name: "Momo", accentColor: "#BB9AF7", borderColor: "#2D2D3F" },
    { id: "neon", name: "Neon", accentColor: "#39ff14", borderColor: "#2D3F3D" },
    { id: "pastel", name: "Pastel", accentColor: "#FFB6C1", borderColor: "#3F2D3D" },
    { id: "monochrome", name: "Monochrome", accentColor: "#FFFFFF", borderColor: "#3F3F3F" },
  ];
  
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, scale: Number(e.target.value) });
  };
  
  const handleColorSchemeChange = (scheme: "momo" | "neon" | "pastel" | "monochrome") => {
    setSettings({ ...settings, colorScheme: scheme });
  };
  
  const handleAnimationSpeedChange = (speed: "slow" | "normal" | "fast") => {
    setSettings({ ...settings, animationSpeed: speed });
  };
  
  const handleLayoutChange = (layout: "default" | "centered" | "minimal") => {
    setSettings({ ...settings, layout: layout });
  };
  
  const handleApply = () => {
    onApplyChanges(settings);
  };
  
  return (
    <div className="space-y-6 text-white">
      <div className="space-y-2">
        <div className="flex items-center">
          <Palette className="text-desktop-accent mr-2" size={20} />
          <h2 className="text-lg font-bold">Customize Interface</h2>
        </div>
        <p className="text-white/70 text-sm">
          Personalize your desktop experience with these settings.
        </p>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center">
            <Layout className="text-desktop-accent mr-2" size={16} />
            <h3 className="font-medium">Interface Scale ({settings.scale}%)</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs">100%</span>
            <input
              type="range"
              min="100"
              max="200"
              step="10"
              value={settings.scale}
              onChange={handleScaleChange}
              className="flex-1 h-2 bg-desktop-border rounded-lg appearance-none cursor-pointer-pixelated"
            />
            <span className="text-xs">200%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Palette className="text-desktop-accent mr-2" size={16} />
            <h3 className="font-medium">Color Scheme</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {colorSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className={`p-2 border rounded-md cursor-pointer-pixelated transition-colors ${
                  settings.colorScheme === scheme.id
                    ? "border-desktop-accent bg-desktop-accent/20"
                    : "border-desktop-border bg-desktop-dark/50 hover:bg-desktop-border/20"
                }`}
                style={{ borderColor: settings.colorScheme === scheme.id ? scheme.accentColor : undefined }}
                onClick={() => handleColorSchemeChange(scheme.id as any)}
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: scheme.accentColor }}
                  ></div>
                  <span className="text-sm">{scheme.name}</span>
                  {settings.colorScheme === scheme.id && (
                    <Check size={14} className="ml-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <RefreshCw className="text-desktop-accent mr-2" size={16} />
            <h3 className="font-medium">Animation Speed</h3>
          </div>
          <div className="flex space-x-2">
            {["slow", "normal", "fast"].map((speed) => (
              <button
                key={speed}
                className={`px-3 py-1 rounded-md text-sm capitalize transition-colors ${
                  settings.animationSpeed === speed
                    ? "bg-desktop-accent text-white"
                    : "bg-desktop-border/50 text-white/70 hover:bg-desktop-border/80"
                }`}
                onClick={() => handleAnimationSpeedChange(speed as any)}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Sliders className="text-desktop-accent mr-2" size={16} />
            <h3 className="font-medium">Layout</h3>
          </div>
          <div className="flex space-x-2">
            {["default", "centered", "minimal"].map((layout) => (
              <button
                key={layout}
                className={`px-3 py-1 rounded-md text-sm capitalize transition-colors ${
                  settings.layout === layout
                    ? "bg-desktop-accent text-white"
                    : "bg-desktop-border/50 text-white/70 hover:bg-desktop-border/80"
                }`}
                onClick={() => handleLayoutChange(layout as any)}
              >
                {layout}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <motion.button
        className="w-full py-2 bg-desktop-accent rounded-md font-medium text-white"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleApply}
      >
        Apply Changes
      </motion.button>
    </div>
  );
};

export default CustomizeWindow;
