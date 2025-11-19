import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Music } from 'lucide-react';

const AudioPlayer = ({ setPage }) => {
  const [fileData, setFileData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const db = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    initDB();
  }, []);

  const initDB = () => {
    const request = indexedDB.open('DesktopDB', 1);

    request.onerror = () => console.error('Database error');

    request.onsuccess = (e) => {
      db.current = e.target.result;
      loadFile();
    };

    request.onupgradeneeded = (e) => {
      const database = e.target.result;
      if (!database.objectStoreNames.contains('items')) {
        const objectStore = database.createObjectStore('items', { keyPath: 'id' });
        objectStore.createIndex('type', 'type', { unique: false });
        objectStore.createIndex('path', 'path', { unique: false });
      }
    };
  };

  const loadFile = () => {
    const currentFile = localStorage.getItem('currentFile');
    if(currentFile.startsWith('/')) {
      setFileData({ content: currentFile })
      return
    }
    
    if (!currentFile) {
      setPage('');
      return;
    }

    const transaction = db.current.transaction(['items'], 'readonly');
    const objectStore = transaction.objectStore('items');
    const request = objectStore.getAll();

    request.onsuccess = (e) => {
      const allItems = e.target.result;
      const file = allItems.find(item => {
        const filePath = `${item.path}/${item.name}`;
        return filePath === currentFile && item.type === 'audio';
      });

      if (file) {
        setFileData(file);
      } else {
        setPage('');
      }
    };
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressValue =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressValue);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const newTime =
        (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  if (!fileData) {
    return (
      <div className="fixed inset-0 bg-neutral-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 w-full h-full flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center p-6 rounded-2xl bg-neutral-800 shadow-xl w-[90%] max-w-md">
        <div className="flex items-center justify-center mb-4 text-blue-400">
          <Music size={48} />
        </div>
        <h2 className="text-lg font-semibold mb-2">{fileData.name}</h2>
        <audio
          ref={audioRef}
          src={fileData.content}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          className="w-full my-3 accent-blue-500 cursor-pointer"
        />
        <div className="flex items-center justify-center gap-6 mt-2">
          <button onClick={togglePlay} className="hover:text-blue-400 transition">
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </button>
          <button onClick={restartAudio} className="hover:text-green-400 transition">
            <RotateCcw size={26} />
          </button>
          <button onClick={toggleMute} className="hover:text-yellow-400 transition">
            {isMuted ? <VolumeX size={26} /> : <Volume2 size={26} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;