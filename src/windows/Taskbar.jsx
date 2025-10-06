import React, { useState, useEffect } from 'react';
import { Terminal, Zap, Play, Folder, Wifi, Battery } from 'lucide-react';

const Windows = ({ page, setPage }) => {
  const [showStartMenu, setShowStartMenu] = useState(false);

  const folders = [
    { id: 1, name: 'Me', icon: Folder, color: 'from-blue-400 to-blue-600' },
    { id: 2, name: 'Parcours', icon: Folder, color: 'from-purple-400 to-purple-600' },
    { id: 3, name: 'Skills', icon: Folder, color: 'from-green-400 to-green-600' },
    { id: 4, name: 'Documents', icon: Folder, color: 'from-orange-400 to-orange-600' },
    { id: 5, name: 'Projets', icon: Folder, color: 'from-pink-400 to-pink-600' },
    { id: 6, name: 'Avis', icon: Folder, color: 'from-red-400 to-red-600' },
    { id: 7, name: 'Contact', icon: Folder, color: 'from-amber-400 to-amber-600' },
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const [time, setTime] = useState(getCurrentTime());
  const [date, setDate] = useState(getCurrentDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
      setDate(getCurrentDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getActiveApp = () => {
    if (page === -1) return { name: 'Terminal', icon: Terminal };
    if (page === 0) return null;
    const folder = folders.find(f => f.id === page);
    return folder ? { name: folder.name, icon: folder.icon } : null;
  };

  const activeApp = getActiveApp();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center px-3 shadow-2xl z-50">

      {/* Start Button */}
      <div className="relative">
        <button
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center hover:from-blue-400 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
        >
          {/* <div className="w-6 h-6 grid grid-cols-2 gap-1">
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
          </div> */}
          <img src="/logo.png" className="w-12 h-12" />
        </button>

        {/* Start Menu */}
        {showStartMenu && (
          <div className="absolute bottom-20 left-0 w-96 bg-black/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-slideUp">
            <style>{`
              @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
              .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
            `}</style>
            <div className="p-6">
              <h3 className="text-white text-xl font-semibold mb-4">Applications</h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {folders.map(folder => {
                  const Icon = folder.icon;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => {
                        setPage(folder.id);
                        setShowStartMenu(false);
                      }}
                      className="flex flex-col items-center p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${folder.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-white text-xs text-center">{folder.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Terminal */}
              <button
                onClick={() => { setPage(-1); setShowStartMenu(false); }}
                className="w-full flex items-center p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                  <Terminal className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-white font-medium">Terminal</span>
              </button>

              {/* Pahae's AI */}
              <button
                onClick={() => { setPage(8); setShowStartMenu(false); }}
                className="w-full flex items-center p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group mt-2"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tl from-indigo-600 to-indigo-400 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium">Pahae's AI</span>
              </button>

              {/* Vidéo de mon PFE */}
              <button
                onClick={() => { setPage(9); setShowStartMenu(false); }}
                className="w-full flex items-center p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group mt-2"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tl from-red-600 to-red-400 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium">Vidéo de mon PFE</span>
              </button>

            </div>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="w-px h-8 bg-white/20 mx-3"></div>

      {/* Active Apps */}
      <div className="flex items-center gap-2 flex-1">
        <button
          onClick={() => { setPage(-1); setShowStartMenu(false); }}
          className="w-fit flex items-center p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200 shadow-lg">
            <Terminal className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-white font-medium">Terminal</span>
        </button>
        {activeApp && (
          <button
            onClick={() => {
              if (page === -1) setPage(-1);
              else {
                const folder = folders.find(f => f.id === page);
                if (folder) setPage(folder.id);
              }
            }}
            className={`h-12 px-4 rounded-xl flex items-center gap-3 transition-all duration-200 ${page !== 0 ? 'bg-white/20 shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
          >
            <activeApp.icon className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">{activeApp.name}</span>
          </button>
        )}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4 mr-3">
        <div className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer">
          <Wifi className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer">
          <Battery className="w-5 h-5" />
          <span className="text-sm">87%</span>
        </div>
        <div className="text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer">
          <div className="text-sm font-medium">{time}</div>
          <div className="text-xs opacity-70">{date}</div>
        </div>
        <button
          onClick={() => setPage(0)}
          className="w-2 h-12 bg-white/20 hover:bg-white/40 rounded transition-all duration-200 ml-2"
          title="Afficher le bureau"
        />
      </div>
    </div>
  );
};


export default Windows;

