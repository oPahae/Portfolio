import { useRouter } from 'next/router';
import { TriangleAlert, Cpu, MonitorSmartphone } from 'lucide-react';

export default function HardwareWarning() {
  const router = useRouter();

  const handleSimpleVersion = () => {
    router.push('/tel2');
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">

        {/* Icône + titre */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-4 rounded-full">
              <TriangleAlert className="w-12 h-12 text-black" />
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Appareil non compatible
          </h1>
        </div>

        {/* Message principal */}
        <div className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800">
          <p className="text-gray-300 text-center leading-relaxed">
            Votre appareil ne dispose pas des capacités matérielles nécessaires pour exécuter cette expérience.
          </p>

          <div className="flex items-start gap-3 text-gray-400 text-sm">
            <Cpu className="w-5 h-5 mt-0.5 text-red-400" />
            <p>
              Certaines fonctionnalités avancées (animations 3D, rendu graphique, effets temps réel)
              nécessitent un support <span className="text-gray-300 font-medium">WebGL / GPU</span>
              qui n’est pas disponible ou insuffisant sur votre machine.
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative rounded-lg overflow-hidden border-2 border-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-[2px]">
          <div className="bg-black rounded-lg overflow-hidden">
            <img
              src="/screenshot.png"
              alt="Aperçu de la version complète sur PC performant"
              className="w-full h-auto opacity-90"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleSimpleVersion}
            className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-black font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
          >
            <MonitorSmartphone className="w-5 h-5" />
            <span>Accéder à la version simplifiée</span>
          </button>

          <button
            onClick={handleClose}
            className="w-full bg-zinc-900 text-gray-300 font-medium py-4 px-6 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors duration-200"
          >
            Retour
          </button>
        </div>

        {/* Note */}
        <p className="text-gray-500 text-xs text-center">
          La version simplifiée est optimisée pour les appareils à faible performance
          et désactive les fonctionnalités gourmandes en ressources.
        </p>
      </div>
    </div>
  );
}