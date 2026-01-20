import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';

import { X, Minus, Maximize2 } from "lucide-react";

import {
  Me, Achievements, Contact, Feedbacks, Projects, Skills, Stars, Docs, AI, PFE,
  Bin, Chrome, Folder, File, ImageViewer, VideoPlayer, AudioPlayer, PDFReader, Paint, ThisPC,
  MesVideos, MesImages, MesAudios,
  InfiniteZoom, Pointer, LittleAlchemy, Universe,
  Taskbar, Desktop, Terminal,
} from "../utils/exporter";
import { voiceCommands as commands } from '@/utils/constants';

const WindowHeader = React.memo(({ page, maximized, onMinimize, onMaximize, onClose }) => (
  <header className='w-full h-12 bg-gradient-to-r from-black via-black to-black backdrop-blur-xl border-b border-gray-700/50 flex flex-row-reverse justify-between items-center px-1 shadow-lg'>
    <div className='flex items-center gap-1'>
      <button
        className='w-11 h-11 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded group'
        onClick={onMinimize}
        title="Minimize"
        aria-label="Minimize window"
      >
        <Minus size={16} className='group-hover:scale-110 transition-transform' />
      </button>

      <button
        className='w-11 h-11 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded group'
        title="Maximize"
        onClick={onMaximize}
        aria-label="Maximize window"
      >
        <Maximize2 size={16} className='group-hover:scale-110 transition-transform' />
      </button>

      <button
        className='w-11 h-11 flex justify-center items-center text-gray-300 hover:text-white hover:bg-red-600/90 transition-all duration-200 rounded-tr-lg group'
        onClick={onClose}
        title="Close"
        aria-label="Close window"
      >
        <X size={18} className='group-hover:scale-110 transition-transform' />
      </button>
    </div>

    <div className='flex items-center gap-3 ml-4'>
      <div className='w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md'>
        <div className='w-3 h-3 rounded-sm bg-white/90'></div>
      </div>
      <p className='font-semibold text-gray-100 text-sm tracking-wide'>
        {page}
      </p>
    </div>
  </header>
));
WindowHeader.displayName = 'WindowHeader';

const WindowContent = React.memo(({ page, documents, setPage, __SPEECH__ }) => {

  const componentMap = useMemo(() => ({
    'Me': <Me />,
    'Achievements': <Achievements />,
    'Skills': <Skills />,
    'Docs': <Docs documents={documents} />,
    'Projects': <Projects />,
    'Feedbacks': <Feedbacks />,
    'Contact': <Contact />,
    'Pahae AI': <AI __SPEECH__={__SPEECH__} />,
    'PFE': <PFE />,
    'Bin': <Bin setPage={setPage} />,
    'Chrome': <Chrome />,
    'Folder': <Folder setPage={setPage} />,
    'File': <File setPage={setPage} />,
    'Image Viewer': <ImageViewer setPage={setPage} />,
    'Video Player': <VideoPlayer setPage={setPage} />,
    'Audio Player': <AudioPlayer setPage={setPage} />,
    'PDF Reader': <PDFReader setPage={setPage} />,
    'Paint': <Paint />,
    'This PC': <ThisPC />,
    'Infinite Zoom': <InfiniteZoom />,
    'Pointer': <Pointer />,
    'Little Alchemy': <LittleAlchemy />,
    'Universe': <Universe />,
    'Mes Vidéos': <MesVideos setPage={setPage} />,
    'Mes Images': <MesImages setPage={setPage} />,
    'Mes Audios': <MesAudios setPage={setPage} />,
    'Terminal': <Terminal page={page} setPage={setPage} />
  }), [documents, setPage, __SPEECH__, page]);

  return (
    <section className='overflow-y-scroll app relative w-full h-screen'>
      <div className='relative z-10 w-full h-full'>
        {componentMap[page] || null}
      </div>
    </section>
  );
});
WindowContent.displayName = 'WindowContent';

const useTabsStorage = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const tabsStorage = localStorage.getItem('tabs');
    if (tabsStorage) setTabs(tabsStorage.split(';').filter(Boolean));
  }, []);

  useEffect(() => {
    if (tabs.length > 0) {
      localStorage.setItem('tabs', tabs.join(';'));
    }
  }, [tabs]);

  return [tabs, setTabs];
};

const useMobileRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(userAgent);
    if (isMobile) {
      router.replace("/tel");
    }
  }, [router]);
};

const useDocuments = () => {
  const [documents, setDocuments] = useState({
    cv: null,
    universitaires: [],
    autoFormations: [],
    sports: []
  });

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/getDocs');
        if (!response.ok) {
          throw new Error('Échec de la récupération des documents');
        }
        const data = await response.json();
        setDocuments(data.documents);
      } catch (err) {
        console.error('Erreur lors de la récupération des documents:', err);
      }
    };

    fetchDocuments();
  }, []);

  return documents;
};

const useWebGLRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let hasWebGL = false;

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

      hasWebGL = !!(gl && gl instanceof WebGLRenderingContext);
    } catch {
      hasWebGL = false;
    }

    if (!hasWebGL) {
      router.replace("/badHardware");
    }
  }, [router]);
};

const useVoiceCommands = (__SPEECH__, setPage) => {
  useEffect(() => {
    if (!__SPEECH__) return;

    const voice = __SPEECH__.toLowerCase();

    for (const cmd of commands) {
      if (cmd.words.some(w => voice.includes(w))) {
        setPage(cmd.page);
        break;
      }
    }
  }, [__SPEECH__, setPage]);
};

const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        callback();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
};

const Index = ({ __SPEECH__, $__SPEECH__ }) => {
  const [page, setPage] = useState('');
  const [tabs, setTabs] = useTabsStorage();
  const [maximized, setMaximized] = useState(false);

  const documents = useDocuments();
  useMobileRedirect();
  useWebGLRedirect();
  useVoiceCommands(__SPEECH__, setPage);

  const handleClosePage = useCallback(() => {
    setPage('');
  }, []);

  useEscapeKey(handleClosePage);

  const handleMaximize = useCallback(() => {
    setMaximized(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    const newTabs = tabs.filter(t => t !== page);
    setTabs(newTabs);
    setPage(newTabs[newTabs.length - 1] || '');
  }, [tabs, page, setTabs]);

  const handleBackdropClick = useCallback(() => {
    setPage('');
  }, []);

  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl");
      setCanRender3D(!!gl);
    } catch {
      setCanRender3D(false);
    }
  }, []);

  return (
    <div className="h-screen">
      {canRender3D && <Stars />}
      <Desktop page={page} setPage={setPage} __SPEECH__={__SPEECH__} />
      <Taskbar
        page={page}
        setPage={setPage}
        __SPEECH__={__SPEECH__}
        $__SPEECH__={$__SPEECH__}
        tabs={tabs}
        setTabs={setTabs}
      />

      {page && (
        <main
          className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 backdrop-blur-sm cursor-pointer'
          onClick={handleBackdropClick}
        >
          <div
            className={`${maximized ? 'w-full h-[calc(100%-3rem)] -translate-y-[2.1rem]' : 'w-4/5 h-fit max-h-[85%] mb-14'} 
              transition-[transform,opacity] duration-200 ease-in-out cursor-auto
              flex flex-col justify-start shadow-2xl rounded-lg overflow-hidden border-2 border-gray-700/50 backdrop-blur-md bg-gradient-to-b from-gray-900/95 to-black/95`}
            style={{
              transform: maximized ? 'scale(1)' : 'scale(0.98)',
              opacity: maximized ? 1 : 0.98,
            }}
            onClick={handleContentClick}
          >
            <WindowHeader
              page={page}
              maximized={maximized}
              onMinimize={handleClosePage}
              onMaximize={handleMaximize}
              onClose={handleClose}
            />

            <WindowContent
              page={page}
              documents={documents}
              setPage={setPage}
              __SPEECH__={__SPEECH__}
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default Index;