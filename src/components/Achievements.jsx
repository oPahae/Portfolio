import React from "react";
import { motion } from "framer-motion";
import { achievements } from "../utils/constants";

const Achievement = ({ achievement, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative mb-8 md:mb-16 flex items-center w-full"
    >
      {/* Layout pour desktop */}
      <div className="hidden md:flex items-start w-full">
        {isLeft ? (
          <>
            {/* Contenu à gauche */}
            <div className="w-5/12 pr-8">
              <div
                className="relative p-6 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
                  backdropFilter: "blur(16px)",
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3)) 1",
                  borderRadius: "1.5rem",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Arrow pointing right */}
                <div
                  className="absolute top-8 -right-2 w-0 h-0"
                  style={{
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "10px solid rgba(168, 85, 247, 0.4)",
                  }}
                />
                
                <div className="flex flex-col items-start">
                  <h3 className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-2xl font-bold mb-2">
                    {Array.isArray(achievement.title)
                      ? achievement.title.map((t, i) => <div key={i}>{t}</div>)
                      : achievement.title}
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mb-5"></div>
                  <span className="text-white font-semibold mb-4">{achievement.company_name}</span>
                  <ul className="space-y-3 text-left">
                    {achievement.points.map((point, idx) => (
                      <li key={idx} className="text-gray-300 text-base pl-1 tracking-wide leading-relaxed list-disc ml-5">
                        {point}
                        {achievement.credential && achievement.credential[idx] && (
                          <div className="my-2">
                            <span
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                              {achievement.credential[idx]}
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Icône centrale */}
            <div className="w-2/12 flex justify-center relative z-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #a855f7, #06b6d4)",
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
                }}
              >
                <img
                  src={achievement.icon}
                  alt={achievement.company_name}
                  className="w-10 h-10 object-contain rounded-full"
                />
              </div>
            </div>

            {/* Date à droite */}
            <div className="w-5/12 translate-y-4">
              <span className="text-gray-300 text-lg font-medium">{achievement.date || "En cours..."}</span>
            </div>
          </>
        ) : (
          <>
            {/* Date à gauche */}
            <div className="w-5/12 translate-y-4 text-right">
              <span className="text-gray-300 text-lg font-medium">{achievement.date || "En cours..."}</span>
            </div>

            {/* Icône centrale */}
            <div className="w-2/12 flex justify-center relative z-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #a855f7, #06b6d4)",
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
                }}
              >
                <img
                  src={achievement.icon}
                  alt={achievement.company_name}
                  className="w-10 h-10 object-contain rounded-full"
                />
              </div>
            </div>

            {/* Contenu à droite */}
            <div className="w-5/12 pl-8">
              <div
                className="relative p-6 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
                  backdropFilter: "blur(16px)",
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3)) 1",
                  borderRadius: "1.5rem",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Arrow pointing left */}
                <div
                  className="absolute top-8 -left-2 w-0 h-0"
                  style={{
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "10px solid rgba(168, 85, 247, 0.4)",
                  }}
                />
                
                <div>
                  <h3 className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-2xl font-bold mb-2">
                    {Array.isArray(achievement.title)
                      ? achievement.title.map((t, i) => <div key={i}>{t}</div>)
                      : achievement.title}
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mb-5"></div>
                  <span className="text-white font-semibold mb-4 block">{achievement.company_name}</span>
                  <ul className="space-y-3">
                    {achievement.points.map((point, idx) => (
                      <li key={idx} className="text-gray-300 text-base pl-1 tracking-wide leading-relaxed list-disc ml-5">
                        {point}
                        {achievement.credential && achievement.credential[idx] && (
                          <div className="my-2">
                            <span
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                              {achievement.credential[idx]}
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Layout mobile */}
      <div className="md:hidden flex w-full">
        {/* Ligne verticale et icône */}
        <div className="flex flex-col items-center mr-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #ec4899, #a855f7, #06b6d4)",
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
            }}
          >
            <img
              src={achievement.icon}
              alt={achievement.company_name}
              className="w-7 h-7 object-contain rounded-full"
            />
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 pb-8">
          <span className="text-gray-300 text-sm font-medium mb-2 block">{achievement.date || "En cours..."}</span>
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
              backdropFilter: "blur(16px)",
              border: "2px solid transparent",
              borderImage: "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3)) 1",
              borderRadius: "1rem",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            <h3 className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-xl font-bold mb-2">
              {Array.isArray(achievement.title)
                ? achievement.title.map((t, i) => <div key={i}>{t}</div>)
                : achievement.title}
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mb-4"></div>
            <span className="text-white font-semibold mb-3 block text-sm">{achievement.company_name}</span>
            <ul className="space-y-2">
              {achievement.points.map((point, idx) => (
                <li key={idx} className="text-gray-300 text-sm pl-1 tracking-wide leading-relaxed list-disc ml-4">
                  {point}
                  {achievement.credential && achievement.credential[idx] && (
                    <div className="my-2">
                      <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        {achievement.credential[idx]}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <div className="bg-black/80 backdrop-blur-sm min-h-screen py-20 px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text mb-4">
            Mon Parcours Académique
          </h2>
          <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
            Mes études et mes qualifications
          </p>
        </motion.div>

        {/* Ligne verticale centrale pour desktop */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 opacity-30"></div>
          
          {/* Ligne verticale pour mobile */}
          <div className="md:hidden absolute left-6 w-0.5 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 opacity-30"></div>

          {achievements.map((achievement, index) => (
            <Achievement key={index} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
