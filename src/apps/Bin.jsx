import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Home, Folder as FolderIcon, File, LayoutGrid, List, Plus, Trash2, FolderOpen, FileText } from 'lucide-react';

const Bin = ({ page, setPage }) => {
  const [currentPath, setCurrentPath] = useState('C:/Users/pahae/bin');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemContextMenu, setItemContextMenu] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const db = useRef(null);
  const folderRef = useRef(null);

  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    if (currentPath) {
      if (history.length === 0 || history[historyIndex] !== currentPath) {
        const newHistory = [...history.slice(0, historyIndex + 1), currentPath];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  }, []);

  useEffect(() => {
    if (db.current && currentPath) {
      loadItems();
    }
  }, [currentPath]);

  const initDB = async () => {
    const request = indexedDB.open('DesktopDB', 1);

    request.onerror = () => console.error('Database error');

    request.onsuccess = (e) => {
      db.current = e.target.result;
      const path = localStorage.getItem('currentFolder');
      if (path) loadItems();
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

  const loadItems = () => {
    const transaction = db.current.transaction(['items'], 'readonly');
    const objectStore = transaction.objectStore('items');
    const request = objectStore.getAll();

    request.onsuccess = (e) => {
      const allItems = e.target.result;
      const folderItems = allItems.filter(item => {
        if (item.type === 'folder') return item.ppath === currentPath;
        else return item.ppath === currentPath;
      });
      setItems(folderItems);
    };
  };

  const saveItem = (item) => {
    const transaction = db.current.transaction(['items'], 'readwrite');
    const objectStore = transaction.objectStore('items');
    objectStore.put(item);
  };

  const deleteItem = (id) => {
    const transaction = db.current.transaction(['items'], 'readwrite');
    const objectStore = transaction.objectStore('items');
    objectStore.delete(id);
  };

  const getNextFileName = (baseName) => {
    const existing = items.filter(i => i.name && i.name.startsWith(baseName));
    if (existing.length === 0) return baseName;

    let counter = 1;
    while (existing.some(i => i.name === `${baseName} (${counter})`)) {
      counter++;
    }
    return `${baseName} (${counter})`;
  };

  const handleItemClick = (item, e) => {
    if (e.ctrlKey) {
      if (selectedItems.includes(item.id)) {
        setSelectedItems(selectedItems.filter(id => id !== item.id));
      } else {
        setSelectedItems([...selectedItems, item.id]);
      }
    } else {
      setSelectedItems([item.id]);
    }
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'file') {
      localStorage.setItem('currentFile', `${item.path}/${item.name}`);
      setPage('File');
    } else if (item.type === 'folder') {
      navigateToFolder(item.path);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleItemContextMenu = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setItemContextMenu({ x: e.clientX, y: e.clientY, item });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    console.log(data)

    try {
      const droppedItem = JSON.parse(data);

      if (droppedItem.type === 'file') {
        const updatedItem = { ...droppedItem, path: currentPath };
        saveItem(updatedItem);
        setItems([...items, updatedItem]);
      } else if (droppedItem.type === 'folder') {
        const updatedItem = {
          ...droppedItem,
          ppath: currentPath,
          path: `${currentPath}/${droppedItem.name}`
        };
        saveItem(updatedItem);
        setItems([...items, updatedItem]);
      }
    } catch (error) {
      console.error('Error dropping item:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const navigateToFolder = (path) => {
    setCurrentPath(path);
    localStorage.setItem('currentFolder', path);
    const newHistory = [...history.slice(0, historyIndex + 1), path];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const path = history[newIndex];
      setCurrentPath(path);
      localStorage.setItem('currentFolder', path);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const path = history[newIndex];
      setCurrentPath(path);
      localStorage.setItem('currentFolder', path);
    }
  };

  const goToParent = () => {
    const parts = currentPath.split('/');
    if (parts.length > 1) {
      parts.pop();
      const parentPath = parts.join('/');
      navigateToFolder(parentPath);
    }
  };

  const getPathParts = () => {
    return currentPath.split('/').filter(p => p);
  };

  useEffect(() => {
    const handleClick = () => {
      setItemContextMenu(null);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const restoreItem = (item) => {
    const transaction = db.current.transaction(['items'], 'readwrite');
    const objectStore = transaction.objectStore('items');
    if (item.type === 'folder') {
      item.ppath = 'C:/Users/pahae/desktop';
      item.path = `${item.ppath}/${item.name}`;
    }
    else item.path = 'C:/Users/pahae/desktop';
    objectStore.put(item);
    setItems(prevItems => prevItems.filter(i => i.id !== item.id));
    setItemContextMenu(null);
  };

  const handleDelete = (item) => {
    const transaction = db.current.transaction(['items'], 'readwrite');
    const objectStore = transaction.objectStore('items');
    objectStore.delete(item.id);

    setItems(prevItems => prevItems.filter(i => i.id !== item.id));
    setSelectedItems(selectedItems.filter(id => id !== item.id));
    setItemContextMenu(null);
  };

  const getTypeIcon = (item) => {
    let icon = "";
    switch (item.type) {
      case 'folder': icon = "/app_icons/folder.png"; break;
      case 'file': icon = "/app_icons/file.png"; break;
      case 'image': icon = item.content; break;
      case 'video': icon = "/app_icons/video.png"; break;
      case 'audio': icon = "/app_icons/audio.png"; break;
    }
    return icon;
  }

  return (
    <div className='w-full h-full bg-black text-white flex flex-col' onClick={() => setItemContextMenu(null)}>
      <div className='bg-black border-b border-gray-700 px-4 py-3 flex items-center gap-3'>
        <button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className='p-2 rounded hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className='p-2 rounded hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
        >
          <ChevronRight size={20} />
        </button>
        <button
          onClick={goToParent}
          className='p-2 rounded hover:bg-purple-700 transition-colors'
        >
          <Home size={20} />
        </button>

        <div className='flex-1 bg-[#0a0a0a] rounded px-4 py-2 flex items-center gap-2 border border-[#252525]'>
          <FolderOpen size={16} className='text-blue-400' />
          <div className='flex items-center gap-1 text-sm'>
            {getPathParts().map((part, index) => (
              <React.Fragment key={index}>
                <span
                  className='hover:text-blue-400 cursor-pointer transition-colors'
                  onClick={() => {
                    const path = getPathParts().slice(0, index + 1).join('/');
                    navigateToFolder(path);
                  }}
                >
                  {part}
                </span>
                {index < getPathParts().length - 1 && (
                  <span className='text-[#555]'>/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className='p-2 rounded hover:bg-purple-700 transition-colors'
        >
          {viewMode === 'list' ? <LayoutGrid size={20} /> : <List size={20} />}
        </button>
      </div>

      <div
        ref={folderRef}
        className='flex-1 overflow-auto folder-content p-6'
        onContextMenu={handleContextMenu}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => setSelectedItems([])}
      >
        <div className={viewMode === 'grid' ? 'grid grid-cols-6 gap-4' : 'flex flex-col gap-1'}>
          {items.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={(e) => {
                e.stopPropagation();
                handleItemClick(item, e);
              }}
              onDoubleClick={() => handleItemDoubleClick(item)}
              onContextMenu={(e) => handleItemContextMenu(e, item)}
              className={`
                                ${viewMode === 'grid'
                  ? 'flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer hover:bg-[#151515] transition-colors'
                  : 'flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-[#151515] transition-colors'
                }
                                ${selectedItems.includes(item.id) ? 'bg-[#1a3a52]' : ''}
                            `}
            >
              <img src={getTypeIcon(item)} size={viewMode === 'grid' ? 48 : 24} className='text-blue-400 w-14 h-14' />
              <span className={`${viewMode === 'grid' ? 'text-sm text-center' : 'text-sm'} break-words`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full text-[#555]'>
            <FolderOpen size={64} className='mb-4' />
            <p className='text-lg'>Ce dossier est vide</p>
          </div>
        )}
      </div>

      {itemContextMenu && (
        <div
          className='fixed bg-[#151515] border border-[#252525] rounded-lg shadow-2xl py-2 z-50 min-w-[200px]'
          style={{ left: `${itemContextMenu.x}px`, top: `${itemContextMenu.y}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='px-4 py-2 hover:bg-green-900 hover:bg-opacity-20 cursor-pointer flex items-center gap-3 text-green-400'
            onClick={() => restoreItem(itemContextMenu.item)}
          >
            <FolderOpen size={16} />
            <span>Restaurer</span>
          </div>
          <div
            className='px-4 py-2 hover:bg-red-900 hover:bg-opacity-20 cursor-pointer flex items-center gap-3 text-red-400'
            onClick={() => handleDelete(itemContextMenu.item)}
          >
            <Trash2 size={16} />
            <span>Supprimer définitivement</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default Bin;
