import React, { useState, useEffect } from 'react';
import { Monitor, Cpu, HardDrive, MemoryStick, Shield, Globe } from 'lucide-react';
import { systemInfo } from '@/utils/apps';

export default function PropriétésPCOutilisateur() {
  const [utilisationRam, setUtilisationRam] = useState(65);
  const [utilisationCpu, setUtilisationCpu] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setUtilisationRam(Math.floor(Math.random() * 30) + 60);
      setUtilisationCpu(Math.floor(Math.random() * 40) + 30);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="p-8 w-full">
        {/* Section Édition Windows */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-800 rounded-lg flex items-center justify-center shadow-lg">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1">{systemInfo.edition}</h1>
              <p className="text-sm text-zinc-400">Version {systemInfo.version} (Build OS {systemInfo.build})</p>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mb-4">{systemInfo.experience}</p>
        </div>
        <div className="h-px bg-zinc-800 mb-8"></div>

        {/* Section Processeur */}
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-3">
            <Cpu className="w-5 h-5 text-pink-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-zinc-400 mb-1">Processeur</p>
              <p className="text-white font-medium">{systemInfo.processor}</p>
              <p className="text-sm text-zinc-500 mt-1">{systemInfo.cores}</p>
            </div>
          </div>
          {/* Barre d'utilisation du CPU */}
          <div className="ml-8 mt-3">
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>Utilisation CPU</span>
              <span>{utilisationCpu}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-600 to-pink-500 transition-all duration-500"
                style={{ width: `${utilisationCpu}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Section RAM */}
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-3">
            <MemoryStick className="w-5 h-5 text-pink-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-zinc-400 mb-1">RAM installée</p>
              <p className="text-white font-medium">{systemInfo.installedRam} ({systemInfo.usableRam} utilisable)</p>
            </div>
          </div>
          {/* Barre d'utilisation de la RAM */}
          <div className="ml-8 mt-3">
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>Utilisation mémoire</span>
              <span>{utilisationRam}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-500 transition-all duration-500"
                style={{ width: `${utilisationRam}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Type de système */}
        <div className="mb-6 flex items-start gap-3">
          <HardDrive className="w-5 h-5 text-pink-500 mt-1" />
          <div>
            <p className="text-sm text-zinc-400 mb-1">Type de système</p>
            <p className="text-white font-medium">{systemInfo.systemType}</p>
          </div>
        </div>

        {/* Stylo et écran tactile */}
        <div className="mb-8 flex items-start gap-3">
          <Monitor className="w-5 h-5 text-pink-500 mt-1" />
          <div>
            <p className="text-sm text-zinc-400 mb-1">Stylo et écran tactile</p>
            <p className="text-white font-medium">{systemInfo.penAndTouch}</p>
          </div>
        </div>

        <div className="h-px bg-zinc-800 mb-8"></div>

        {/* Section Nom de l'ordinateur */}
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-pink-500" />
            Nom de l'ordinateur, domaine et paramètres de groupe de travail
          </h2>
          <div className="ml-7 space-y-4">
            <div>
              <p className="text-sm text-zinc-400">Nom de l'ordinateur :</p>
              <p className="text-white font-medium">{systemInfo.computerName}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Nom complet de l'ordinateur :</p>
              <p className="text-white font-medium">{systemInfo.fullComputerName}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Groupe de travail :</p>
              <p className="text-white font-medium">{systemInfo.workgroup}</p>
            </div>
          </div>
          <button
            onClick={() => alert('Vous devez avoir les droits d\'administrateur pour pouvoir exécuter cette action')}
            className="ml-7 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded transition-colors border border-zinc-700"
          >
            Changer les paramètres
          </button>
        </div>

        <div className="h-px bg-zinc-800 my-8"></div>

        {/* Activation de Windows */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Activation de {systemInfo.edition}
          </h2>
          <div className="ml-7 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-white font-medium">{systemInfo.edition} est activé</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">ID du produit :</p>
              <p className="text-white font-mono text-sm">{systemInfo.productId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}