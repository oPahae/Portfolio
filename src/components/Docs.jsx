import { useState, useEffect } from 'react';
import { FileText, Download, Award, BookOpen, Trophy, Calendar, Building2 } from 'lucide-react';

const Docs = ({ documents }) => {
  const [activeCategory, setActiveCategory] = useState('universitaires');

  const categories = [
    { id: 'universitaires', name: 'Universitaires', icon: Award, gradient: 'from-pink-500 to-purple-500' },
    { id: 'autoFormations', name: 'Auto-formations', icon: BookOpen, gradient: 'from-purple-500 to-cyan-500' },
    { id: 'sports', name: 'Sports', icon: Trophy, gradient: 'from-cyan-500 to-pink-500' }
  ];

  const handleDownload = (doc) => {
    const link = document.createElement('a');
    link.href = doc.file; // La chaîne Base64 complète est déjà au bon format
    link.download = `${doc.title.replace(/\s+/g, '_')}.pdf`; // Remplace les espaces par des underscores
    link.click();
  };

  return (
    <div className="min-h-screen bg-black/80 backdrop-blur-sm text-white flex items-center justify-center md:px-6 md:py-20 relative overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        <div className="relative overflow-hidden rounded-3xl p-[2px]">
          <div className="rounded-3xl px-8 sm:px-12 lg:px-16">
            {/* Header */}
            <div className="space-y-4 mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
                Mes Documents
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"></div>
            </div>

            {/* CV Section - Featured */}
            {documents.cv && (
              <div className="mb-12">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px] transform transition-transform duration-300 hover:scale-[1.02]">
                  <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex flex-col md:flex-row items-start gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                            <FileText className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div className="space-y-2 flex-1">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white">{documents.cv.title}</h3>
                          <p className="text-gray-300 text-lg">{documents.cv.description}</p>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{new Date(documents.cv.date).toLocaleDateString('FR-fr')}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(documents.cv)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50"
                      >
                        <Download className="w-5 h-5" />
                        Télécharger
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                        : 'bg-gray-900 text-gray-300 hover:text-white'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents[activeCategory].length > 0 ? (
                documents[activeCategory].map((doc, index) => (
                  <div
                    key={doc._id || index}
                    className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-3xl p-[2px] transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6">
                      <div className="space-y-4">
                        {/* Document Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" />
                              </div>
                            </div>
                            <div className="space-y-1 flex-1">
                              <h3 className="text-xl font-bold text-white">{doc.title}</h3>
                              <div className="flex items-center gap-2 text-gray-400">
                                <Building2 className="w-4 h-4" />
                                <span className="text-sm">{doc.provider}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Description */}
                        <p className="text-gray-300 text-sm leading-relaxed">{doc.description}</p>
                        {/* Footer */}
                        <div className="flex flex-col-reverse md:flex-row gap-2 items-center justify-between pt-4 border-t border-gray-700">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{new Date(doc.date).toLocaleDateString('FR-fr')}</span>
                          </div>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold transform transition-all duration-300 hover:scale-105"
                          >
                            <Download className="w-4 h-4" />
                            Télécharger
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-400 py-12">
                  Aucun document trouvé dans cette catégorie.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;

