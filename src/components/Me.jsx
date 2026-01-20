import { Users, Smartphone, Globe, MapPin, GraduationCap } from 'lucide-react';
import { socials } from '@/utils/constants';

const Me = () => {
  return (
    <div className="bg-black/80 backdrop-blur-sm w-full h-full text-white flex items-center justify-center relative">
      <div className="w-full h-full relative z-10">
        <div className="relative overflow-hidden rounded-3xl p-[2px]">
          <div className="rounded-3xl p-8 sm:p-12 lg:p-16 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center -translate-y-6">
              {/* Image Section */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-40"></div>
                  <img
                    src="/me.jpg"
                    alt="LAMRISSI Bahaa-eddine"
                    className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl border-4 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px] transform transition-transform duration-300 hover:scale-105"
                    style={{ borderRadius: '1.5rem' }}
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-500 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
                    LAMRISSI Bahaa-eddine
                  </h1>
                  <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"></div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                    <span className="text-md">Étudiant en Master Systèmes Informatiques & Réseaux</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="text-md">FST Settat, Maroc</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  Passionné par le développement web et mobile, je crée des expériences
                  digitales modernes et performantes. Mon expertise couvre la conception
                  d'applications web innovantes et d'applications mobiles intuitives,
                  en utilisant les technologies les plus récentes.
                </p>

                {/* Passions */}
                {/* <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transform transition-transform duration-300 hover:scale-105">
                    <Globe className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">Développement Web</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transform transition-transform duration-300 hover:scale-105">
                    <Smartphone className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">Développement Mobile</span>
                  </div>
                </div> */}

                {/* Social Media */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Réseaux Sociaux</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 text-sm font-medium ${social.hover} hover:text-white transition-all duration-300 transform hover:scale-105`}
                      >
                        <social.icon className="w-4 h-4" />
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;