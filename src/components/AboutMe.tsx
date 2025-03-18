
import React from "react";
import { User, Mail, MapPin, Code, Music, Coffee } from "lucide-react";

const AboutMe: React.FC = () => {
  return (
    <div className="space-y-6 text-white">
      <div className="space-y-2">
        <div className="flex items-center">
          <User className="text-desktop-accent mr-2" size={20} />
          <h2 className="text-lg font-bold">About Me</h2>
        </div>
        <p className="text-white/70 text-sm">
          <span className="multilingual">
            <span className="kr">안녕하세요</span>{" "}
            <span className="jp">こんにちは</span>{" "}
            <span className="ar">مرحباً</span>{" "}
          </span>
          Hello! I'm a developer with diverse interests and multicultural background
        </p>
      </div>

      <div className="grid gap-4">
        <div className="flex items-start">
          <MapPin className="text-desktop-accent mr-3 mt-1" size={16} />
          <div>
            <h3 className="font-medium">Location</h3>
            <p className="text-white/70 text-sm">Seoul enthusiast</p>
          </div>
        </div>

        <div className="flex items-start">
          <Mail className="text-desktop-accent mr-3 mt-1" size={16} />
          <div>
            <h3 className="font-medium">Contact</h3>
            <p className="text-white/70 text-sm">developer@example.com</p>
          </div>
        </div>

        <div className="flex items-start">
          <Code className="text-desktop-accent mr-3 mt-1" size={16} />
          <div>
            <h3 className="font-medium">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {["JavaScript", "TypeScript", "React", "Node.js", "HTML/CSS"].map((skill, idx) => (
                <span 
                  key={idx} 
                  className="text-xs bg-desktop-accent/20 text-desktop-accent px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <Music className="text-desktop-accent mr-3 mt-1" size={16} />
          <div>
            <h3 className="font-medium">Music Taste</h3>
            <p className="text-white/70 text-sm">Jazz, K-pop, Fuji Kaze, Tabber, Iwamizu</p>
          </div>
        </div>

        <div className="flex items-start">
          <Coffee className="text-desktop-accent mr-3 mt-1" size={16} />
          <div>
            <h3 className="font-medium">Interests</h3>
            <p className="text-white/70 text-sm">Coffee, Cats, Travel, Fashion (Ader Error, Maison Kitsune)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
