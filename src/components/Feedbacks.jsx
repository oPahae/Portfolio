import { Quote, Linkedin } from 'lucide-react';
import { feedbacks } from "../utils/constants";

const Feedbacks = () => {
  return (
    <div className="bg-black/80 backdrop-blur-sm min-h-screen text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
            Témoignages
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mx-auto"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ce que les professionnels disent de leur expérience de collaboration avec moi
          </p>
        </div>

        {/* Feedbacks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-3xl p-[2px]">
              <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-6 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-purple-400" />
                </div>

                {/* Feedback Text */}
                <p className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">
                  "{feedback.text}"
                </p>

                {/* Author Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-40"></div>
                      <img
                        src={feedback.image}
                        alt={feedback.name}
                        className="relative w-14 h-14 object-cover rounded-full border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white font-semibold text-lg">{feedback.name}</h3>
                      <p className="text-gray-400 text-sm">{feedback.description}</p>
                    </div>
                  </div>

                  {/* LinkedIn Button */}
                  <a
                    href={feedback.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <Linkedin className="w-4 h-4" />
                    Voir le profil
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;