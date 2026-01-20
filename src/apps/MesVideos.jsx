import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Home, Folder as FolderIcon, LayoutGrid, List, Plus, Trash2, FolderOpen, FileText } from 'lucide-react';

const MesVideos = ({ setPage }) => {
  const _FOLDER_ = 'mes_videos';
  const _TYPE_ = 'video';
  const _PATH_ = 'C:/Users/pahae/desktop/Mes Vidéos';

  const [currentPath, setCurrentPath] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const backRef = useRef(null);
  const folderRef = useRef(null);

  useEffect(() => {
    setItems([
      {
        id: 1,
        name: "Me in AOT's world",
        type: _TYPE_,
        url: "https://res.cloudinary.com/dojxqpgai/video/upload/v1768945867/Me_in_AOTs_world_iii425.mp4"
      },
      {
        id: 2,
        name: "PFE_Soutenance",
        type: _TYPE_,
        url: "https://res.cloudinary.com/dojxqpgai/video/upload/v1768945704/PFE_Soutenance_i5pkrn.mp4"
      },
      {
        id: 3,
        name: "ألم يان للذين ءامنوا",
        type: _TYPE_,
        url: "https://res.cloudinary.com/dojxqpgai/video/upload/v1768945383/%D8%A3%D9%84%D9%85_%D9%8A%D8%A7%D9%86_%D9%84%D9%84%D8%B0%D9%8A%D9%86_%D8%A1%D8%A7%D9%85%D9%86%D9%88%D8%A7_lsl2jr.mp4"
      },
    ]);
    
    setCurrentPath(_PATH_);

    if (history.length === 0 || history[historyIndex] !== _PATH_) {
      const newHistory = [...history.slice(0, historyIndex + 1), _PATH_];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, []);

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
    localStorage.setItem('currentFile', item.url);
    if (item.type === 'file') setPage('File');
    if (item.type === 'image') setPage('Image Viewer');
    if (item.type === 'video') setPage('Video Player');
    if (item.type === 'audio') setPage('Audio Player');
    if (item.type === 'pdf') setPage('PDF Reader');
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

  const getPathParts = () => {
    return currentPath.split('/').filter(p => p);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        if (backRef.current) backRef.current.click();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('click', handleKey);
    }
  }, []);

  return (
    <div className='w-full h-full bg-black text-white flex flex-col'>
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
      >
        <div className={viewMode === 'grid' ? 'grid grid-cols-6 gap-4' : 'flex flex-col gap-1'}>
          {items.map(item => (
            <div
              key={item.id}
              draggable
              onClick={(e) => {
                e.stopPropagation();
                handleItemClick(item, e);
              }}
              onDoubleClick={() => handleItemDoubleClick(item)}
              className={`
                                ${viewMode === 'grid'
                  ? 'flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer hover:bg-[#151515] transition-colors'
                  : 'flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-[#151515] transition-colors'
                }
                                ${selectedItems.includes(item.id) ? 'bg-[#1a3a52]' : ''}
                            `}
            >
              <img src={`/mes_videos/${item.name.split('.')[0]}.png`} size={viewMode === 'grid' ? 48 : 24} className='text-blue-400 w-20' />
              <span className={`${viewMode === 'grid' ? 'text-sm text-center' : 'text-sm'} break-words`}>
                {item.name.split('.')[0]}
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
    </div>
  );
}

export default MesVideos;
