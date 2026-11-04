import { useRouter } from 'next/router';
import { Monitor, Smartphone } from 'lucide-react';

export default function MobileWarning() {
  const router = useRouter();

  const handleSimpleVersion = () => {
    router.push('/portfolio');
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Icon and title with gradient */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-4 rounded-full">
              <Monitor className="w-12 h-12 text-black" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Optimal Experience on PC
          </h1>
        </div>

        {/* Warning message */}
        <div className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800">
          <p className="text-gray-300 text-center leading-relaxed">
            This site simulates a complete operating system and requires a larger screen for an optimal experience.
          </p>
          
          <p className="text-gray-400 text-sm text-center">
            We recommend opening this site from a computer to fully enjoy all its features.
          </p>
        </div>

        {/* Screenshot */}
        <div className="relative rounded-lg overflow-hidden border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
          <div className="bg-black rounded-lg overflow-hidden">
            <img 
              src="/screenshot.png" 
              alt="Preview of the site on PC" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-black font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            Okay, I understand
          </button>
          
          <button
            onClick={handleSimpleVersion}
            className="w-full bg-zinc-900 text-gray-300 font-medium py-4 px-6 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Smartphone className="w-5 h-5" />
            <span>View a simple mobile version</span>
          </button>
        </div>

        {/* Additional note */}
        <p className="text-gray-500 text-xs text-center">
          The simplified mobile version offers limited features
        </p>
      </div>
    </div>
  );
}