import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, Play, Folder, Wifi, Battery, Power, Settings, User, WifiOff, Router } from 'lucide-react';
import { apps, games } from '@/utils/apps';
import { useRouter } from 'next/router';
import { desktopApps, desktopFolders, apps as tempApps, games as tempGames } from '@/utils/apps';

const Windows = ({ page, setPage, __SPEECH__, $__SPEECH__, tabs, setTabs }) => {
  const router = useRouter();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showGamesMenu, setShowGamesMenu] = useState(false);
  const [batterieLvl, setBatterieLvl] = useState(0);
  const [chargingStat, setChargingStat] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);
  const startMenuRef = useRef(null);
  const startButtonRef = useRef(null);

  useEffect(() => {
    setShowStartMenu(['start', 'démarrer', 'démarrage', 'applications'].some(key => __SPEECH__.toLowerCase().includes(key)));
    if (__SPEECH__.includes('arrête')) setSpeechActive(false);
  }, [__SPEECH__]);

  useEffect(() => {
    if (page === '' || tabs.includes(page)) return;
    if (tabs.length > 5) setTabs(tabs.slice(1));
    setTabs([...tabs, page]);
  }, [page]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Ce navigateur ne supporte pas le webservice 'webkitSpeechRecognition', essayez avec Chrome ou Edge...");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "fr-FR";

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      $__SPEECH__(transcript.trim());
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
    };

    if (speechActive) {
      try {
        recognition.start();
      } catch (e) {
        console.warn("Recognition already started");
      }
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [speechActive]);

  useEffect(() => {
    let batteryRef;
    navigator.getBattery().then(battery => {
      batteryRef = battery;
      const updateLevel = () => setBatterieLvl(Math.round(battery.level * 100));
      const updateCharging = () => setChargingStat(battery.charging);
      updateLevel();
      updateCharging();
      battery.addEventListener('levelchange', updateLevel);
      battery.addEventListener('chargingchange', updateCharging);
    });

    return () => {
      if (batteryRef) {
        batteryRef.removeEventListener('levelchange', () => setBatterieLvl(Math.round(batteryRef.level * 100)));
        batteryRef.removeEventListener('chargingchange', () => setChargingStat(batteryRef.charging));
      }
    };
  }, []);

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startMenuRef.current && !startMenuRef.current.contains(event.target) &&
        startButtonRef.current && !startButtonRef.current.contains(event.target)
      ) {
        setShowStartMenu(false);
        setShowGamesMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center px-3 shadow-2xl z-50">
      <div className="relative">
        <button
          ref={startButtonRef}
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center hover:from-blue-400 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
        >
          <img src="/logo.png" className="w-12 h-12" />
        </button>

        {showStartMenu && (
          <div ref={startMenuRef} className="absolute bottom-14 left-0 w-[340px] h-[420px] bg-black/90 backdrop-blur-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex h-full animate-slideUp">
              <div className="w-12 bg-[#0f0f0f] flex flex-col items-center py-4 gap-4 border-r border-white/10">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-all">
                  <User onClick={() => {
                    setPage('Me');
                    setShowStartMenu(false);
                    setShowGamesMenu(false);
                  }}
                    className="w-5 h-5 text-white"
                  />
                </button>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-all">
                  <Folder onClick={() => {
                    setPage('Folder');
                    setShowStartMenu(false);
                  }}
                    className="w-5 h-5 text-white"
                  />
                </button>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-all">
                  <Settings onClick={() => {
                    setPage('This PC');
                    setShowStartMenu(false);
                  }}
                    className="w-5 h-5 text-white"
                  />
                </button>
                <div className="flex-1"></div>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-red-500/20 rounded transition-all group">
                  <Power onClick={() => router.push('____Shutdown')} className="w-5 h-5 text-white group-hover:text-red-500" />
                </button>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6">
                  <div className="mb-6">
                    <h3 className="text-white text-xs font-semibold mb-3 opacity-60">All apps</h3>
                    <div className="space-y-1">
                      {apps.map((app, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setPage(app.id)
                            setShowStartMenu(false);
                          }}
                          className="w-full flex items-center px-3 py-2 hover:bg-white/10 rounded transition-all group"
                        >
                          <img src={app.icon} alt={app.name} className="w-8 h-8 mr-3" />
                          <span className="text-white text-sm">{app.name}</span>
                        </button>
                      ))}

                      <div className="relative">
                        <button
                          onClick={() => setShowGamesMenu(!showGamesMenu)}
                          className="w-full flex items-center px-3 py-2 hover:bg-white/10 rounded transition-all group"
                        >
                          <div className="w-8 h-8 mr-3 rounded flex items-center justify-center">
                            <img src="/app_icons/games.png" className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-white text-sm">Games</span>
                          <span className="ml-auto text-white text-xs">›</span>
                        </button>

                        {showGamesMenu && (
                          <div className="w-full border-l-2 border-gray-400 rounded shadow-2xl p-2 mt-2">
                            {games.map((game, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setPage(game.id);
                                  setShowStartMenu(false);
                                  setShowGamesMenu(false);
                                }}
                                className="w-full flex items-center px-3 py-2 hover:bg-white/10 transition-all"
                              >
                                <img src={game.icon} alt={game.name} className="w-6 h-6 mr-3" />
                                <span className="text-white text-sm">{game.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-white text-xs font-semibold mb-3 opacity-60">Pinned</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {apps.slice(0, 4).map((app, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setPage(app.id)
                            setShowStartMenu(false);
                          }}
                          className="flex flex-col items-center p-3 hover:bg-white/10 rounded transition-all group"
                        >
                          <img src={app.icon} alt={app.name} className="w-12 h-12 mb-2" />
                          <span className="text-white text-xs text-center">{app.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-xs font-semibold mb-3 opacity-60">Recommended</h3>
                    <div className="space-y-2">
                      {apps.slice(4, 8).map((app, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setPage(app.id)
                            setShowStartMenu(false);
                          }}
                          className="w-full flex items-center px-3 py-2 hover:bg-white/10 rounded transition-all"
                        >
                          <img src={app.icon} alt={app.name} className="w-8 h-8 mr-3" />
                          <div className="flex-1 text-left">
                            <div className="text-white text-sm">{app.name}</div>
                            <div className="text-white/50 text-xs">Recently added</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-px h-8 bg-white/20 mx-3"></div>

      <div className='flex justify-center items-center'>
        <div className={`${speechActive ? 'bg-red-600 animate-ping' : 'bg-gray-300'} rounded-full w-6 h-6 cursor-pointer`} onClick={() => setSpeechActive(p => !p)} />
          {speechActive && <span className='text-red-500 font-bold'>En train d'écouter...</span>}
      </div>

      <div className="w-px h-8 bg-white/20 mx-3"></div>

      <div className="flex items-center gap-2 flex-1">
        {/* <button
          onClick={() => { setPage('Terminal'); setShowStartMenu(false); }}
          className="w-fit flex items-center pr-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center mr-3 transition-transform duration-200 shadow-lg">
            <Terminal className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-white font-medium">Terminal</span>
        </button> */}
        {tabs.map(tab => (
          <button
            onClick={() => setPage(tab)}
            className={`h-12 px-4 rounded-xl flex items-center gap-3 transition-all duration-200 ${page === tab ? 'bg-white/20 shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
          >
            <img src={[...desktopApps, ...desktopFolders, ...tempApps, ...tempGames].find(i => i.name === tab)?.icon || ''} className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">{tab}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 mr-3">
        <div className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer">
          {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
        </div>
        <div className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer">
          <Battery className="w-5 h-5" />
          {chargingStat && <Zap size={10} />}
          <span className="text-sm">{batterieLvl}%</span>
        </div>
        <div className="text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer">
          <div className="text-sm font-medium">{time}</div>
          <div className="text-xs opacity-70">{date}</div>
        </div>
        <button
          onClick={() => setPage('')}
          className="w-2 h-12 bg-white/20 hover:bg-white/40 rounded transition-all duration-200 ml-2"
          title="Afficher le bureau"
        />
      </div>
    </div>
  );
};

export default Windows;
