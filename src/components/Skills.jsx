import { Sparkles } from 'lucide-react';
import { SKILLS } from '../utils/constants';

const Skills = () => {
  const skillsArray = Object.values(SKILLS);

  return (
    <div className="min-h-screen bg-black/80 backdrop-blur-sm text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
            Compétences Techniques
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mx-auto"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Les technologies et outils que je maîtrise pour créer des solutions innovantes
          </p>
        </div>

        {/* Skills Grid - Fluid & 3D */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skillsArray.map((skill, index) => (
            <div 
              key={skill.id} 
              className="group relative"
              style={{
                animation: `float ${3 + (index % 3)}s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ backgroundColor: skill.color }}
              ></div>
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:rotate-2 cursor-pointer"
                   style={{
                     boxShadow: `0 20px 60px -15px ${skill.color}30`,
                     transformStyle: 'preserve-3d'
                   }}>
                
                {/* Icon Container */}
                <div className="relative mb-4 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
                     style={{ transformStyle: 'preserve-3d' }}>
                  <div 
                    className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                    style={{ backgroundColor: skill.color }}
                  ></div>
                  <div 
                    className="relative w-full aspect-square rounded-2xl flex items-center justify-center p-4 bg-gradient-to-br from-white/5 to-white/0"
                    style={{ 
                      border: `2px solid ${skill.color}60`,
                      boxShadow: `inset 0 2px 10px ${skill.color}20`
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Skill Name */}
                <h3 className="text-white font-bold text-center text-sm mb-2 line-clamp-1">
                  {skill.name}
                </h3>

                {/* Label Badge */}
                <div className="flex items-center justify-center gap-1.5 mb-3">
                  <Sparkles className="w-3 h-3" style={{ color: skill.color }} />
                  <span 
                    className="text-xs font-semibold"
                    style={{ color: skill.color }}
                  >
                    {skill.label}
                  </span>
                </div>

                {/* Description - appears on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-black/95 backdrop-blur-xl rounded-3xl p-4 flex flex-col justify-center items-center text-center"
                     style={{ transform: 'translateZ(20px)' }}>
                  <Sparkles className="w-6 h-6 mb-2" style={{ color: skill.color }} />
                  <h3 className="text-white font-bold text-sm mb-2">{skill.name}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    {skill.shortDescription}
                  </p>
                  <div className="mt-3 px-3 py-1 rounded-full text-xs font-semibold"
                       style={{ 
                         backgroundColor: `${skill.color}20`,
                         color: skill.color,
                         border: `1px solid ${skill.color}40`
                       }}>
                    {skill.label}
                  </div>
                </div>

                {/* Corner Accent */}
                <div 
                  className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl opacity-20"
                  style={{ 
                    background: `linear-gradient(135deg, ${skill.color}, transparent)`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Skills;