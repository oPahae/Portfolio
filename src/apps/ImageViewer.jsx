import React, { useState, useEffect, useRef } from 'react';

const ImageViewer = ({ setPage }) => {
  const [fileData, setFileData] = useState(null);
  const db = useRef(null);

  useEffect(() => {
    initDB();
  }, []);

  const initDB = async () => {
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
        return filePath === currentFile && item.type === 'image';
      });

      if (file) {
        setFileData(file);
      } else {
        setPage('');
      }
    };
  };

  if (!fileData) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="bg-black flex flex-col w-full h-full items-center justify-center">
      <img className="max-h-full max-w-full object-contain" src={fileData.content} alt={fileData.name} />
    </div>
  );
};

export default ImageViewer;