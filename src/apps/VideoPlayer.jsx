import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

const VideoViewer = ({ setPage }) => {
  const [fileData, setFileData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const db = useRef(null);

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
    if(currentFile.startsWith('/')) { // _MINE_
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
        return filePath === currentFile && item.type === 'video';
      });

      if (file) {
        setFileData(file);
      } else {
        setPage('');
      }
    };
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!fileData) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="bg-black w-full h-full flex flex-col items-center justify-center">
      <video
        ref={videoRef}
        src={fileData.content}
        className="max-h-[75vh] max-w-[95vw] rounded-2xl shadow-lg"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls={false}
      />
      <div className="fixed bottom-8 flex items-center gap-6 mt-4 bg-neutral-900/80 px-6 py-3 rounded-full shadow-xl">
        <button onClick={togglePlay} className="text-white hover:text-blue-400 transition">
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button onClick={restartVideo} className="text-white hover:text-green-400 transition">
          <RotateCcw size={26} />
        </button>
        <button onClick={toggleMute} className="text-white hover:text-yellow-400 transition">
          {isMuted ? <VolumeX size={26} /> : <Volume2 size={26} />}
        </button>
      </div>
    </div>
  );
};

export default VideoViewer;