import React, { useState, useEffect, useRef } from 'react';
import { X, Save, FileText, Minimize2, Maximize2 } from 'lucide-react';

const File = ({ setPage }) => {
  const [fileData, setFileData] = useState(null);
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const db = useRef(null);
  const textareaRef = useRef(null);

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
        if (item.type === 'file') {
          const filePath = `${item.path}/${item.name}`;
          return filePath === currentFile;
        }
        return false;
      });

      if (file) {
        setFileData(file);
        setContent(file.content || '');
      } else {
        setPage('');
      }
    };
  };

  const saveFile = () => {
    if (!fileData) return;

    const updatedFile = { ...fileData, content };

    const transaction = db.current.transaction(['items'], 'readwrite');
    const objectStore = transaction.objectStore('items');
    objectStore.put(updatedFile);

    transaction.oncomplete = () => {
      setSaved(true);
      setFileData(updatedFile);
    };
    window.location.reload();
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setSaved(false);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveFile();
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
    <div className="bg-black flex flex-col w-full h-full">
      <div className="bg-black border-b border-gray-800 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-purple-400" />
          <div>
            <h1 className="text-white font-semibold text-sm">{fileData.name}</h1>
            <p className="text-gray-400 text-xs">{fileData.path}</p>
          </div>
          {!saved && (
            <span className="text-orange-400 text-xs font-medium">● Non enregistré</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={saveFile}
            disabled={saved}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${saved
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">Enregistrer</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-black overflow-hidden">
        <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Lignes: {content.split('\n').length}</span>
            <span>•</span>
            <span>Caractères: {content.length}</span>
          </div>

          <div className="text-xs text-gray-500">
            Ctrl+S pour enregistrer
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <div className={`h-full bg-black rounded-lg border border-gray-800 shadow-2xl overflow-hidden ${isMaximized ? '' : 'max-w-5xl mx-auto'
            }`}>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              placeholder="Commencez à écrire..."
              className="w-full h-full bg-transparent text-gray-100 p-6 resize-none outline-none font-mono text-sm leading-relaxed placeholder-gray-600"
              style={{
                caretColor: '#60a5fa'
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-black border-t border-gray-800 px-4 py-2">
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-500">
            Éditeur de texte • Mode sombre
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500">UTF-8</span>
            <span className={`font-medium ${saved ? 'text-green-400' : 'text-orange-400'}`}>
              {saved ? '✓ Enregistré' : '○ Modifications non enregistrées'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default File;