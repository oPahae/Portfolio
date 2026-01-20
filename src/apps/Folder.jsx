import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Home, Folder as FolderIcon, LayoutGrid, List, Plus, Trash2, FolderOpen, FileText, Edit } from 'lucide-react';

const Folder = ({ page, setPage }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [itemContextMenu, setItemContextMenu] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [renamingItemId, setRenamingItemId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const db = useRef(null);
  const backRef = useRef(null);
  const folderRef = useRef(null);

  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    const path = localStorage.getItem('currentFolder');
    if (path) {
      setCurrentPath(path);
      if (history.length === 0 || history[historyIndex] !== path) {
        const newHistory = [...history.slice(0, historyIndex + 1), path];
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
        if (item.type === 'folder') {
          return item.ppath === (currentPath || localStorage.getItem('currentFolder'));
        }
        else return item.path === (currentPath || localStorage.getItem('currentFolder'));
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

    const getRequest = objectStore.get(id);
    getRequest.onsuccess = (e) => {
      const item = e.target.result;
      if (!item) return;

      const getAllRequest = objectStore.getAll();
      getAllRequest.onsuccess = (event) => {
        const allItems = event.target.result;

        let toMove = new Set();
        let queue = [];

        toMove.add(item.id);
        if (item.type === 'folder') queue.push(item.path);

        while (queue.length > 0) {
          const parentPath = queue.shift();

          const children = allItems.filter(
            (child) =>
              (child.ppath && child.ppath === parentPath) ||
              (child.path && child.path === parentPath)
          );

          for (const child of children) {
            if (!toMove.has(child.id)) {
              toMove.add(child.id);
              if (child.type === 'folder') queue.push(child.path);
            }
          }
        }

        const BIN_PATH = 'C:/Users/pahae/bin';
        const originalParent = item.ppath;

        toMove.forEach((moveId) => {
          const childReq = objectStore.get(moveId);
          childReq.onsuccess = (ev) => {
            const child = ev.target.result;
            if (!child) return;

            // Calcul du chemin relatif par rapport au dossier supprimé
            let relativePath = '';
            if (child.path && originalParent && child.path.startsWith(originalParent)) {
              relativePath = child.path.slice(originalParent.length);
              if (relativePath.startsWith('/')) relativePath = relativePath.slice(1);
            }

            // Nouveau chemin dans la corbeille
            const newPath = `${BIN_PATH}/${relativePath}`;
            const newParent = newPath.substring(0, newPath.lastIndexOf('/')) || BIN_PATH;

            child.path = newPath;
            child.ppath = newParent;

            objectStore.put(child);
          };
        });

        // Mettre à jour la vue locale
        setItems((prev) => prev.filter((i) => !toMove.has(i.id)));
        setSelectedItems((prev) => prev.filter((sid) => !toMove.has(sid)));
      };
    };
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

  const createFile = () => {
    const name = getNextFileName('Nouveau document texte');
    const newFile = {
      id: `file_${Date.now()}`,
      type: 'file',
      name,
      path: currentPath,
      content: '',
      icon: '/app_icons/file.png'
    };

    saveItem(newFile);
    setItems([...items, newFile]);
    setContextMenu(null);
  };

  const createFolder = () => {
    const name = getNextFileName('Nouveau dossier');
    const newFolder = {
      id: `folder_${Date.now()}`,
      type: 'folder',
      name,
      path: `${currentPath}/${name}`,
      ppath: currentPath,
      icon: '📁'
    };

    saveItem(newFolder);
    setItems([...items, newFolder]);
    setContextMenu(null);
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
    if (item.type === 'folder') {
      navigateToFolder(item.path);
    }
    else {
      localStorage.setItem('currentFile', `${item.path}/${item.name}`);
      if (item.type === 'file') setPage('File');
      if (item.type === 'image') setPage('Image Viewer');
      if (item.type === 'video') setPage('Video Player');
      if (item.type === 'audio') setPage('Audio Player');
      if (item.type === 'pdf') setPage('PDF Reader');
    }
  };

  const handleDelete = (item) => {
    deleteItem(item.id);
    setItems(items.filter(i => i.id !== item.id));
    setSelectedItems(selectedItems.filter(id => id !== item.id));
    setItemContextMenu(null);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (e.target === folderRef.current || e.target.closest('.folder-content')) {
      setContextMenu({ x: e.clientX, y: e.clientY });
      setItemContextMenu(null);
    }
  };

  const handleItemContextMenu = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setItemContextMenu({ x: e.clientX, y: e.clientY, item });
    setContextMenu(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const content = event.target.result || '';
          let type = 'file';
          if (file.type.startsWith('image/')) type = 'image';
          else if (file.type.startsWith('video/')) type = 'video';
          else if (file.type.startsWith('audio/')) type = 'audio';
          else if (file.type === 'application/pdf') type = 'pdf';

          const newFile = {
            id: `${type}_${Date.now()}_${file.name}`,
            type,
            name: file.name,
            path: currentPath,
            content,
            icon: getTypeIcon({ content, type })
          };

          saveItem(newFile);
          setItems((prev) => [...prev, newFile]);
        };

        if (file.type.startsWith('text/') || file.type === '') reader.readAsText(file);
        else reader.readAsDataURL(file);
      });

      return;
    }

    const data = e.dataTransfer.getData('text/plain');
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
          path: `${currentPath}/${droppedItem.name}`,
        };
        saveItem(updatedItem);
        setItems([...items, updatedItem]);
      }
    } catch (error) {
      console.error('Erreur lors du drop JSON:', error, data);
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
    setItemContextMenu(null);
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

  const getPathParts = () => {
    return currentPath.split('/').filter(p => p);
  };

  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null);
      setItemContextMenu(null);
    };
    const handleKey = (e) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        if (backRef.current) backRef.current.click();
      }
      // if (e.key === 'Delete' && selectedItems.length > 0) {
      //   selectedItems.forEach(id => {
      //     const item = items.find(i => i.id === id);
      //     if (item && item.type !== 'app') {
      //       handleDelete(item);
      //     } else if (item && item.type === 'app') {
      //       alert('Vous avez besoin de droits administrateur pour supprimer cette application');
      //     }
      //   });
      // }
      // if (e.key === 'F2' && selectedItems.length > 0) {
      //   selectedItems.forEach(id => {
      //     const item = items.find(i => i.id === id);
      //     if (item && item.type !== 'app') {
      //       handleItemRename(item);
      //     } else if (item && item.type === 'app') {
      //       alert('Vous avez besoin de droits administrateur pour modifier cette application');
      //     }
      //   });
      // }
      // if (e.key === 'Enter' && selectedItems.length > 0) {
      //   selectedItems.forEach(id => {
      //     const item = items.find(i => i.id === id);
      //     handleItemClick(item);
      //   });
      // }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKey);
    }
  }, []);

  const handleItemRename = (item) => {
    if (item.type === 'app'|| item.type === 'myfolder') {
      alert("Vous avez besoin de droits administrateur pour renommer cette application");
      return;
    }
    setRenamingItemId(item.id);
    setRenameValue(item.name);
    setItemContextMenu(null);
  };

  const finishRename = (item) => {
    const newName = renameValue.trim();
    if (!newName || newName === item.name) {
      setRenamingItemId(null);
      return;
    }

    const oldPath = item.path;
    const newPath = `C:/Users/pahae/desktop/${newName}`;

    const updatedItem = { ...item, name: newName, path: item.type === 'folder' ? newPath : oldPath };
    saveItem(updatedItem);

    if (item.type === 'folder') {
      const transaction = db.current.transaction(['items'], 'readwrite');
      const objectStore = transaction.objectStore('items');
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = (e) => {
        const allItems = e.target.result;

        const childrenToUpdate = allItems.filter(
          (child) =>
            child.ppath?.startsWith(oldPath) ||
            child.path?.startsWith(oldPath)
        );

        childrenToUpdate.forEach((child) => {
          const updatedChild = { ...child };

          if (updatedChild.path && updatedChild.path.startsWith(oldPath)) {
            updatedChild.path = updatedChild.path.replace(oldPath, newPath);
          }
          if (updatedChild.ppath && updatedChild.ppath.startsWith(oldPath)) {
            updatedChild.ppath = updatedChild.ppath.replace(oldPath, newPath);
          }

          objectStore.put(updatedChild);
        });

        setItems((prevItems) =>
          prevItems.map((i) => {
            if (i.id === item.id) return updatedItem;
            const match = childrenToUpdate.find((c) => c.id === i.id);
            return match ? { ...i, path: match.path, ppath: match.ppath } : i;
          })
        );
      };
    } else {
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? updatedItem : i))
      );
    }

    setRenamingItemId(null);
    setRenameValue('');
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
    <div className='w-full h-full bg-black text-white flex flex-col' onClick={() => { setContextMenu(null); setItemContextMenu(null) }}>
      <div className='bg-black border-b border-gray-700 px-4 py-3 flex items-center gap-3'>
        <button
          onClick={goBack}
          ref={backRef}
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
          onClick={() => navigateToFolder("C:/Users/pahae/desktop")}
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
                {renamingItemId === item.id ? (
                  <textarea
                    value={renameValue}
                    autoFocus
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => finishRename(item)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        finishRename(item);
                      }
                      if (e.key === 'Escape') {
                        e.preventDefault();
                        setRenamingItemId(null);
                      }
                    }}
                    className="text-white font-semibold text-center px-1 w-full"
                  />
                ) : (
                  item.name.length > 13 ? item.name.slice(0, 9) + '...' : item.name
                )}
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

      {contextMenu && (
        <div
          className='fixed bg-[#151515] border border-[#252525] rounded-lg shadow-2xl py-2 z-50 min-w-[200px]'
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='px-4 py-2 hover:bg-purple-700 cursor-pointer flex items-center gap-3' onClick={createFile}>
            <FileText size={16} />
            <span>Nouveau fichier</span>
          </div>
          <div className='px-4 py-2 hover:bg-purple-700 cursor-pointer flex items-center gap-3' onClick={createFolder}>
            <FolderIcon size={16} />
            <span>Nouveau dossier</span>
          </div>
        </div>
      )}

      {itemContextMenu && (
        <div
          className='fixed bg-[#151515] border border-[#252525] rounded-lg shadow-2xl py-2 z-50 min-w-[200px]'
          style={{ left: `${itemContextMenu.x}px`, top: `${itemContextMenu.y}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='px-4 py-2 hover:bg-purple-700 cursor-pointer flex items-center gap-3'
            onClick={() => handleItemDoubleClick(itemContextMenu.item)}
          >
            <FolderOpen size={16} />
            <span>Ouvrir</span>
          </div>
          <div
            className='px-4 py-2 hover:bg-purple-700 cursor-pointer flex items-center gap-3'
            onClick={() => handleItemRename(itemContextMenu.item)}
          >
            <Edit size={16} />
            <span>Renommer</span>
          </div>
          <div
            className='px-4 py-2 hover:bg-red-900 hover:bg-opacity-20 cursor-pointer flex items-center gap-3 text-red-400'
            onClick={() => handleDelete(itemContextMenu.item)}
          >
            <Trash2 size={16} />
            <span>Supprimer</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
