
import React from "react";
import { Code, ExternalLink, Github } from "lucide-react";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Personal Website",
      description: "A pixelated desktop-themed personal website showcasing my skills and interests.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      link: "#",
      github: "#",
    },
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform with user authentication and payment processing.",
      tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      link: "#",
      github: "#",
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for tracking social media performance across platforms.",
      tech: ["React", "D3.js", "Firebase"],
      link: "#",
      github: "#",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center">
          <Code className="text-desktop-accent mr-2" size={20} />
          <h2 className="text-lg font-bold text-white">My Projects</h2>
        </div>
        <p className="text-white/70 text-sm">
          <span className="multilingual">
            <span className="kr">개발자</span>{" "}
            <span className="jp">開発者</span>{" "}
            <span className="ar">مطوّر</span>{" "}
          </span>
          Soon.
        </p>
      </div>
       {/* This is a comment in JSX 
      <div className="grid gap-4">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="border border-desktop-border rounded-md p-4 bg-desktop-dark/40 hover:bg-desktop-window/50 transition-colors"
          >
            <h3 className="text-desktop-accent font-medium mb-2">{project.title}</h3>
            <p className="text-white/70 text-sm mb-3">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="text-xs bg-desktop-accent/20 text-desktop-accent px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-3 text-xs">
              <a 
                href={project.link} 
                className="text-desktop-highlight flex items-center hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={12} className="mr-1" />
                View Project
              </a>
              <a 
                href={project.github} 
                className="text-desktop-highlight flex items-center hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={12} className="mr-1" />
                Source Code
              </a>
            </div>
          
          </div>
        ))}
      </div>
      */}
    </div>
  );
};

export default Projects;
