import React, { useEffect, useState } from 'react';
import { X, Minus, Maximize2 } from "lucide-react"
import { useRouter } from 'next/router';

import {
  Me, Achievements, Contact, Feedbacks, Projects, Skills, Stars, Docs, AI, PFE,
  Bin, Chrome, Folder, File, ImageViewer, VideoPlayer, AudioPlayer, PDFReader, Paint, ThisPC,
  MesVideos, MesImages, MesAudios,
  InfiniteZoom, Pointer, LittleAlchemy, Universe,
  Taskbar, Desktop, Terminal,
} from "../utils/exporter";

const Index = () => {
  const [page, setPage] = useState('');

  // useEffect(() => alert(page), [page]);

  useEffect(() => {
    const closeApp = (e) => {
      if (e.key === "Escape") {
        setPage('')
      }
    }
    window.addEventListener("keydown", closeApp)
    return () => window.removeEventListener("keydown", closeApp)
  }, [])

  const router = useRouter()
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(userAgent)
    if (isMobile)
      router.replace("/tel");
  }, [router])

  //////////////////////////////////////////////////

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
        console.error(err.message);
        console.error('Erreur:', err);
      }
    };

    fetchDocuments();
  }, []);

  const [maximized, setMaximized] = useState(false);

  //////////////////////////////////////////////////

  return (
    <div className="h-screen">
      {/* <iframe src="https://stars.chromeexperiments.com" className='w-full h-full' /> */}
      <Stars />
      <Desktop page={page} setPage={setPage} />
      <Taskbar page={page} setPage={setPage} />

      {page != 0 &&
        <main className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 backdrop-blur-sm cursor-pointer' onClick={() => setPage('')}>
          <div
            className={`${maximized ? 'w-full h-[calc(100%-3rem)] -translate-y-[2.1rem]' : 'w-4/5 h-fit max-h-[85%] mb-14'} 
              transition-[transform,opacity] duration-200 ease-in-out cursor-auto
              flex flex-col justify-start shadow-2xl rounded-lg overflow-hidden border-2 border-gray-700/50 backdrop-blur-md bg-gradient-to-b from-gray-900/95 to-black/95`}
            style={{
              transform: maximized ? 'scale(1)' : 'scale(0.98)',
              opacity: maximized ? 1 : 0.98,
            }}
            onClick={e => e.stopPropagation()}
          >

            <header className='w-full h-12 bg-gradient-to-r from-black via-black to-black backdrop-blur-xl border-b border-gray-700/50 flex flex-row-reverse justify-between items-center px-1 shadow-lg'>
              <div className='flex items-center gap-1'>
                <button
                  className='w-11 h-11 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded group'
                  title="Minimize"
                >
                  <Minus size={16} className='group-hover:scale-110 transition-transform' />
                </button>

                <button
                  className='w-11 h-11 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded group'
                  title="Maximize"
                  onClick={() => setMaximized(e => !e)}
                >
                  <Maximize2 size={16} className='group-hover:scale-110 transition-transform' />
                </button>

                <button
                  className='w-11 h-11 flex justify-center items-center text-gray-300 hover:text-white hover:bg-red-600/90 transition-all duration-200 rounded-tr-lg group'
                  onClick={() => setPage('')}
                  title="Close"
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

            <section className='overflow-y-scroll app relative w-full h-screen'>
              <div className='relative z-10 w-full h-full'>
                {/* Components */}
                {page === 'Me' && <Me />}
                {page === 'Achievements' && <Achievements />}
                {page === 'Skills' && <Skills />}
                {page === 'Docs' && <Docs documents={documents} />}
                {page === 'Projects' && <Projects />}
                {page === 'Feedbacks' && <Feedbacks />}
                {page === 'Contact' && <Contact />}
                {page === 'Pahae AI' && <AI />}
                {page === 'PFE' && <PFE />}

                {/* Apps */}
                {page === 'Bin' && <Bin setPage={setPage} />}
                {page === 'Chrome' && <Chrome />}
                {page === 'Folder' && <Folder setPage={setPage} />}
                {page === 'File' && <File setPage={setPage} />}
                {page === 'Image Viewer' && <ImageViewer setPage={setPage} />}
                {page === 'Video Player' && <VideoPlayer setPage={setPage} />}
                {page === 'Audio Player' && <AudioPlayer setPage={setPage} />}
                {page === 'PDF Reader' && <PDFReader setPage={setPage} />}
                {page === 'Paint' && <Paint />}
                {page === 'This PC' && <ThisPC />}

                {/* Games */}
                {page === 'Infinite Zoom' && <InfiniteZoom />}
                {page === 'Pointer' && <Pointer />}
                {page === 'Little Alchemy' && <LittleAlchemy />}
                {page === 'Universe' && <Universe />}

                {/* Mine */}
                {page === 'Mes Vidéos' && <MesVideos setPage={setPage} />}
                {page === 'Mes Images' && <MesImages setPage={setPage} />}
                {page === 'Mes Audios' && <MesAudios setPage={setPage} />}

                {/* windows */}
                {page === 'Terminal' && <Terminal page={page} setPage={setPage} />}
              </div >
            </section >

          </div >
        </main >
      }
    </div >
  )
}

export default Index;