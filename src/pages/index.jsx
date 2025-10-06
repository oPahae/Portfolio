import React, { useEffect, useState } from 'react';
import { Me, Achievements, Computer, Contact, Feedbacks, Projects, Skills, Stars, Docs, AI, PFE } from "../utils/exporter";
import { X, Folder } from "lucide-react"
import Taskbar from "../windows/Taskbar"
import Folders from "../windows/Folders"
import Terminal from "../windows/Terminal"
import { useRouter } from 'next/router';

const Index = () => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const closeApp = (e) => {
      if (e.key === "Escape") {
        setPage(0)
      }
    }
    window.addEventListener("keydown", closeApp)
    return () => window.removeEventListener("keydown", closeApp)
  }, [])

  const getPageName = (id) => {
    let name = ""
    switch (id) {
      case 0: name = "Terminal"; break;
      case 1: name = "Me"; break;
      case 2: name = "Parcours"; break;
      case 3: name = "Skills"; break;
      case 4: name = "Documents"; break;
      case 5: name = "Projets"; break;
      case 6: name = "Avis"; break;
      case 7: name = "Contact"; break;
      case 8: name = "Pahae's AI"; break;
      case 9: name = "Vidéo de mon PFE"; break;
    }
    return name
  }

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
        console.log(data.documents)
      } catch (err) {
        alert(err.message);
        console.error('Erreur:', err);
      }
    };
    
    fetchDocuments();
  }, []);
  
  //////////////////////////////////////////////////

  return (
    <div className="h-screen">
      <Stars />
      <Folders page={page} setPage={setPage} />
      <Taskbar page={page} setPage={setPage} />

      {page != 0 &&
        <main className='fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-xs z-40'>
          <div className='w-4/5 h-fit max-h-full p-0 flex flex-col justify-start'>

            <header className='w-full h-8 bg-black flex justify-between items-center'>
              <p className='font-bold text-white'>{getPageName(page)}</p>
              <div className='w-8 h-8 flex justify-center items-center text-white font-extrabold cursor-pointer bg-gradient-to-b from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 duration-200 rounded-md' onClick={() => setPage(0)}>
                <X size={18} />
              </div>
            </header>

            <section className='overflow-y-scroll'>
              {page === -1 && <Terminal page={page} setPage={setPage} />}
              {page === 1 && <Me />}
              {page === 2 && <div className='bg-black'><Achievements /></div>}
              {page === 3 && <Skills />}
              {page === 4 && <Docs documents={documents} />}
              {page === 5 && <Projects />}
              {page === 6 && <Feedbacks />}
              {page === 7 && <Contact />}
              {page === 8 && <AI />}
              {page === 9 && <PFE />}
            </section>

          </div>
        </main>
      }
    </div>
  )
}


export default Index;

