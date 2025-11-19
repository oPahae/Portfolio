import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronRight } from 'lucide-react';
import { systemInfo } from '@/utils/apps';

export default function WindowsShutdown() {
  const router = useRouter();
  const [phase, setPhase] = useState('shutdown'); // shutdown, off, bios
  const [showFormatConfirm, setShowFormatConfirm] = useState(false);
  const [shutdownProgress, setShutdownProgress] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [msg, setMsg] = useState('');
  const bootOptions = [
    {
      id: 'normal',
      label: 'Démarrage Normal',
      description: 'Démarrer le système d\'exploitation',
      action: () => router.push('/'),
      color: 'border-blue-500'
    },
    {
      id: 'bios',
      label: 'Configuration du BIOS',
      description: 'Accéder aux paramètres système',
      action: () => setPhase('bios'),
      color: 'border-gray-500'
    },
    {
      id: 'safe',
      label: 'Mode Sans Échec',
      description: 'Démarrer avec pilotes minimaux',
      action: () => router.push('/?mode=safe'),
      color: 'border-yellow-500'
    },
    {
      id: 'format',
      label: 'Formatage du Disque',
      description: 'Effacer toutes les données',
      action: () => setShowFormatConfirm(true),
      color: 'border-red-500'
    }
  ];

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {

        case "F1":
          e.preventDefault();
          setMsg("Aide BIOS : Utilisez les flèches pour naviguer.\nF10 pour sauvegarder et quitter.");
          break;

        case "F5":
          e.preventDefault();
          setMsg("Valeurs précédentes restaurées.");
          break;

        case "F6":
          e.preventDefault();
          setMsg("Valeurs optimisées chargées.");
          break;

        case "F10":
          e.preventDefault();
          setPhase("off");
          break;

        case "F2":
          e.preventDefault();
          setPhase("bios");
          break;

        case "F12":
          e.preventDefault();
          router.push('/');
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'shutdown') {
      // Animation de progression de l'extinction
      const interval = setInterval(() => {
        setShutdownProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('off'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleFormat = () => {
    // Suppression de IndexedDB
    if (window.indexedDB) {
      indexedDB.databases().then(databases => {
        databases.forEach(db => {
          if (db.name) indexedDB.deleteDatabase(db.name);
        });
      });
    }

    // Suppression des items localStorage spécifiques
    localStorage.removeItem('currentFile');
    localStorage.removeItem('currentFolder');

    setShowFormatConfirm(false);
  };

  if (phase === 'bios') {
    return (
      <div className="fixed inset-0 bg-blue-900 text-white font-mono text-sm overflow-auto">
        <div className="p-6">
          <div className="border-2 border-white p-4 mb-4">
            <h1 className="text-2xl mb-4 text-center">AMERICAN MEGATRENDS</h1>
            <p className="text-center text-xs mb-6">{systemInfo.bios}</p>
            {msg && <span className="text-center text-xs font-bold font-mono text-red-600 mb-6">{msg}</span>}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="bg-white text-blue-900 px-2 py-1 mb-2">MAIN</h2>
              <div className="space-y-1 pl-4">
                <p>BIOS Version: {systemInfo.biosVersion}</p>
                <p>Build Date: {systemInfo.buildDate}</p>
                <p>Processor: {systemInfo.processor.split('@')[0].trim()}</p>
                <p>Speed: {systemInfo.processor.split('@')[1].trim()}</p>
                <p>Total Memory: {systemInfo.installedRom}</p>
                <p>System Date: {new Date().toLocaleDateString()}</p>
                <p>System Time: {new Date().toLocaleTimeString()}</p>
              </div>

              <h2 className="bg-white text-blue-900 px-2 py-1 mb-2 mt-4">BOOT</h2>
              <div className="space-y-1 pl-4">
                <p>Boot Option #1: [Windows Boot Manager]</p>
                <p>Boot Option #2: [UEFI: USB Device]</p>
                <p>Boot Option #3: [Network Boot]</p>
              </div>
            </div>

            <div>
              <h2 className="bg-white text-blue-900 px-2 py-1 mb-2">ADVANCED</h2>
              <div className="space-y-1 pl-4">
                <p>CPU Configuration</p>
                <p className="pl-4">Virtualization: [Enabled]</p>
                <p className="pl-4">Hyper-Threading: [Enabled]</p>
                <p>SATA Configuration: [AHCI Mode]</p>
                <p>USB Configuration: [Enabled]</p>
                <p>Network Stack: [Enabled]</p>
              </div>

              <h2 className="bg-white text-blue-900 px-2 py-1 mb-2 mt-4">SECURITY</h2>
              <div className="space-y-1 pl-4">
                <p>Administrator Password: [Not Installed]</p>
                <p>User Password: [Not Installed]</p>
                <p>Secure Boot: [Disabled]</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t-2 border-white pt-4">
            <div className="flex justify-between text-xs">
              <span>F1: Help</span>
              <span>F5: Previous Values</span>
              <span>F6: Optimized Defaults</span>
              <span>F10: Save & Exit</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setPhase('off')}
              className="bg-white text-blue-900 px-6 py-2 font-bold hover:bg-gray-200 transition"
            >
              ← Retour au menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'off') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="w-full max-w-3xl overflow-y-scroll">
            {/* Header */}
            <div className="mb-8 border-b border-gray-700 pb-6">
              <p className="text-sm text-gray-500 font-mono ml-6">
                Version 2.4.1 | Appuyez sur Entrée pour sélectionner
              </p>
            </div>

            {/* Boot Options */}
            <div className="space-y-3 mb-8">
              {bootOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={option.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-4 border-l-4 transition-all duration-200 ${selectedIndex === index
                    ? `${option.color} bg-gray-800 shadow-lg`
                    : 'border-transparent bg-gray-850 hover:bg-gray-800'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        {selectedIndex === index && (
                          <ChevronRight className="w-4 h-4 text-blue-400" />
                        )}
                        <h3 className="text-lg font-mono text-gray-200">
                          {option.label}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 font-mono ml-7">
                        {option.description}
                      </p>
                    </div>
                    <div className="text-gray-600 font-mono text-xs">
                      [{index + 1}]
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer Info */}
            <div className="border-t border-gray-800 pt-4">
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-600">
                <div>
                  <span className="text-gray-500">F2</span> BIOS Setup
                </div>
                <div>
                  <span className="text-gray-500">F12</span> Network Boot
                </div>
              </div>
            </div>

            {/* Format Confirmation Modal */}
            {showFormatConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
                <div className="bg-gray-800 border border-red-500 p-6 max-w-md w-full">
                  <h2 className="text-xl font-mono text-red-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚠</span> AVERTISSEMENT CRITIQUE
                  </h2>
                  <p className="text-gray-300 font-mono text-sm mb-6">
                    Cette action effacera TOUTES les données du système de manière
                    irréversible. Voulez-vous continuer ?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        alert('Formatage annulé');
                        setShowFormatConfirm(false);
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 font-mono text-sm transition"
                    >
                      ANNULER [ESC]
                    </button>
                    <button
                      onClick={() => {
                        alert('Formatage du système...');
                        setShowFormatConfirm(false);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 font-mono text-sm transition"
                    >
                      CONFIRMER [ENTER]
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showFormatConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-black p-8 rounded-lg max-w-md border-2 border-red-500">
              <h2 className="text-red-500 text-2xl font-bold mb-4">⚠️ ATTENTION</h2>
              <p className="text-white mb-6">
                Vous êtes sur le point de formater complètement le système.
                Toutes les données seront supprimées définitivement.
              </p>
              <p className="text-yellow-400 mb-6 font-semibold">
                Cette action est irréversible !
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleFormat}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold transition"
                >
                  Confirmer le formatage
                </button>
                <button
                  onClick={() => setShowFormatConfirm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded font-bold transition"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="logo.png"
            alt="Windows Logo"
            className="w-32 h-32 mx-auto animate-pulse"
          />
        </div>

        <h1 className="text-white text-3xl font-light mb-8">Arrêt en cours</h1>

        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div className="mt-8 w-64 mx-auto">
          <div className="bg-white bg-opacity-30 h-1 rounded-full overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${shutdownProgress}%` }}
            ></div>
          </div>
        </div>

        <p className="text-white text-sm mt-4 opacity-75">
          Ne pas éteindre votre ordinateur
        </p>
      </div>
    </div>
  );
}