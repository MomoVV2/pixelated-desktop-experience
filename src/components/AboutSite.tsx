
import React from "react";
import { Code, Cpu, Palette, Smile } from "lucide-react";

const AboutSite: React.FC = () => {
  return (
    <div className="space-y-6 text-white">
      <div className="space-y-2">
        <div className="flex items-center">
          <Cpu className="text-desktop-accent mr-2" size={20} />
          <h2 className="text-lg font-bold">About This Site</h2>
        </div>
        <p className="text-white/70 text-sm">
          Welcome to my interactive pixelated desktop experience - a fusion of nostalgia and modern web development.
        </p>
      </div>

      <div className="grid gap-5">
        <div className="flex items-start">
          <Code className="text-desktop-accent mr-3 mt-1" size={16} />
          <div>
            <h3 className="font-medium">Tech Stack</h3>
            <p className="text-white/70 text-sm mt-1">
              Built with React, TypeScript, Tailwind CSS, and Framer Motion. This site features draggable elements, 
              animated components, and multilingual support.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Palette className="text-desktop-accent mr-3 mt-1" size={16} />
          <div>
            <h3 className="font-medium">Design Inspiration</h3>
            <p className="text-white/70 text-sm mt-1">
              Inspired by retro operating systems, pixel art, and the fashion aesthetics of brands like Ader Error and 
              Maison Kitsune. The Seoul-themed background reflects my favorite city.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Smile className="text-desktop-accent mr-3 mt-1" size={16} />
          <div>
            <h3 className="font-medium">Interactive Features</h3>
            <ul className="text-white/70 text-sm mt-1 space-y-1 list-disc list-inside">
              <li>Draggable desktop icons</li>
              <li>Multilingual text transitions on hover</li>
              <li>Pixel pet cat with random messages</li>
              <li>Windows-style start menu</li>
              <li>Draggable windows to arrange your view</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3 border border-desktop-border bg-desktop-dark/50 rounded-md">
          <p className="text-desktop-accent/80 text-xs italic">
            "The best interfaces are the ones that blend nostalgia with modern functionality."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSite;
