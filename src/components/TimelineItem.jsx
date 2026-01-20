import { motion } from "framer-motion";

const TimelineItem = ({ achievement, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex items-start ${isLeft ? "justify-end pr-[52%]" : "justify-start pl-[52%]"} sm:pr-[55%] sm:pl-[55%]`}
    >
      {/* Ligne de connexion */}
      <div
        className={`absolute top-8 ${isLeft ? "right-1/2" : "left-1/2"} w-5 h-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full border-4 border-gray-900 shadow-lg`}
      ></div>

      {/* Contenu */}
      <div className="bg-[#0f0f1a]/90 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-purple-500/20 max-w-[400px]">
        <div className="flex items-center gap-4 mb-3">
          <img
            src={achievement.icon}
            alt={achievement.company_name}
            className="w-12 h-12 object-cover rounded-full border-2 border-purple-400 shadow-md"
          />
          <div>
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
              {Array.isArray(achievement.title)
                ? achievement.title.join(" • ")
                : achievement.title}
            </h3>
            <p className="text-gray-400 text-sm">{achievement.company_name}</p>
            <p className="text-gray-500 text-xs italic">{achievement.date || "En cours..."}</p>
          </div>
        </div>

        <ul className="mt-3 list-disc list-inside text-gray-300 text-sm space-y-2">
          {achievement.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        {achievement.credential?.length > 0 && (
          <div className="mt-4">
            {achievement.credential.map((cred, i) => (
              <a
                key={i}
                href={cred}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold transform transition-transform hover:scale-105 hover:shadow-lg"
              >
                Voir le certificat
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TimelineItem;
