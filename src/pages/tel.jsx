import { useRouter } from 'next/router';
import { Monitor, Smartphone } from 'lucide-react';

export default function MobileWarning() {
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
        {/* Icône et titre avec gradient */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-4 rounded-full">
              <Monitor className="w-12 h-12 text-black" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Expérience optimale sur PC
          </h1>
        </div>

        {/* Message d'avertissement */}
        <div className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800">
          <p className="text-gray-300 text-center leading-relaxed">
            Ce site simule un système d'exploitation complet et nécessite un écran plus grand pour une expérience optimale.
          </p>
          
          <p className="text-gray-400 text-sm text-center">
            Nous vous recommandons d'ouvrir ce site depuis un ordinateur pour profiter pleinement de toutes les fonctionnalités.
          </p>
        </div>

        {/* Screenshot */}
        <div className="relative rounded-lg overflow-hidden border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
          <div className="bg-black rounded-lg overflow-hidden">
            <img 
              src="/screenshot.png" 
              alt="Aperçu du site sur PC" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="space-y-3">
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-black font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            D'accord, je comprends
          </button>
          
          <button
            onClick={handleSimpleVersion}
            className="w-full bg-zinc-900 text-gray-300 font-medium py-4 px-6 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Smartphone className="w-5 h-5" />
            <span>Afficher une version mobile simple</span>
          </button>
        </div>

        {/* Note supplémentaire */}
        <p className="text-gray-500 text-xs text-center">
          La version mobile simplifiée offre des fonctionnalités limitées
        </p>
      </div>
    </div>
  );
}