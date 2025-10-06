import React from 'react'
import { X, Folder } from "lucide-react"

const Folders = ({ page, setPage }) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full flex flex-row justify-evenly items-center flex-wrap text-white font-bold p-8'>
            {[
                { id: 1, title: 'Moi', icon: '/icons/me.png' },
                { id: 2, title: 'Parcours', icon: '/icons/path.png' },
                { id: 3, title: 'Skills', icon: '/icons/skills.png' },
                { id: 4, title: 'Documents', icon: '/icons/docs.png' },
                { id: 5, title: 'Projets', icon: '/icons/projects.png' },
                { id: 6, title: 'Avis', icon: '/icons/feedbacks.png' },
                { id: 7, title: 'Contact', icon: '/icons/contact.png' },
            ].map(folder => (
                <div key={folder}
                    className='flex justify-center items-center flex-col gap-1 w-fit h-fit cursor-pointer'
                    onClick={() => setPage(folder.id)}
                >
                    <img src={folder.icon} alt={folder.title} className="w-16 h-16 shadow-xl hover:-translate-y-3 duration-200" />
                    <p>{folder.title}</p>
                </div>
            ))}
        </div>
    )
}

export default Folders
