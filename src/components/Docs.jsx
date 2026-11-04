import { useState } from 'react'
import {
  FileText,
  Download,
  Award,
  BookOpen,
  Trophy,
  Calendar,
  Building2,
  GraduationCap,
  Stamp,
  FileCheck2
} from 'lucide-react'

import { documents } from '@/utils/constants'

const Docs = () => {
  const [activeCategory, setActiveCategory] = useState('diplome')

  const categories = [
    {
      id: 'diplome',
      name: 'Degrees',
      icon: Award,
      gradient: 'from-pink-500 to-purple-500'
    },
    {
      id: 'releve',
      name: 'Transcripts',
      icon: BookOpen,
      gradient: 'from-purple-500 to-cyan-500'
    },
    {
      id: 'certificat',
      name: 'Certificates',
      icon: Trophy,
      gradient: 'from-cyan-500 to-pink-500'
    },
    {
      id: 'stage',
      name: 'Internships',
      icon: FileText,
      gradient: 'from-orange-500 to-pink-500'
    }
  ]

  const cv = documents.find(doc => doc.type === 'cv')

  const filteredDocuments = documents.filter(
    doc => doc.type === activeCategory
  )

  const handleDownload = (doc) => {
    const link = document.createElement('a')
    link.href = doc.file
    link.download = `${doc.title.replace(/\s+/g, '_')}.pdf`
    link.click()
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-20 text-slate-800 sm:px-6">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-pink-200/40 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-200/40 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/40 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
            <FileCheck2 size={16} />
            Professional Portfolio
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            My Professional
            <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Documents
            </span>
          </h1>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Find my degrees, transcripts, certifications, and internship
            certificates gathered in a single document collection.
          </p>
        </div>

        {/* CV */}
        {cv && (
          <div className="mb-20">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-pink-500 to-purple-500" />
              <h2 className="text-2xl font-bold text-slate-900">
                Curriculum Vitae
              </h2>
            </div>

            <div className="group relative mx-auto max-w-4xl">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-20 blur-lg transition duration-500 group-hover:opacity-40" />

              <div className="relative grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-[1fr_260px]">

                {/* CV Paper */}
                <div className="relative p-7 text-slate-800 sm:p-10">

                  <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-600">
                        Professional Document
                      </span>
                      <p className="mt-1 text-xs text-slate-400">
                        Portfolio / Curriculum Vitae
                      </p>
                    </div>

                    <FileText className="h-9 w-9 text-purple-500" />
                  </div>

                  <div className="mb-8">
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                      {cv.title}
                    </h3>

                    <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />

                    <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                      {cv.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 border-t border-slate-200 pt-5 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <Calendar size={15} className="text-purple-500" />
                      {formatDate(cv.date)}
                    </span>

                    <span className="flex items-center gap-2">
                      <Stamp size={15} className="text-purple-500" />
                      Official Document
                    </span>
                  </div>

                  <div className="absolute bottom-5 right-7 select-none text-5xl font-black text-slate-100">
                    CV
                  </div>
                </div>

                {/* Download Panel */}
                <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-600 p-8 text-center text-white">

                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/10">
                    <FileText size={40} />
                  </div>

                  <h3 className="text-xl font-bold">
                    My CV
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/85">
                    Discover my academic and professional background.
                  </p>

                  <button
                    onClick={() => handleDownload(cv)}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-purple-700 transition-all duration-300 hover:-translate-y-1 hover:bg-purple-50"
                  >
                    <Download size={18} />
                    Download PDF
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mb-10">

          <div className="mb-5 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-500 to-cyan-500" />
            <h2 className="text-2xl font-bold text-slate-900">
              My Library
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map(category => {
              const Icon = category.icon
              const isActive = activeCategory === category.id

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 ${
                    isActive
                      ? `border-transparent bg-gradient-to-r ${category.gradient} text-white`
                      : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-600'
                  }`}
                >
                  <Icon size={19} />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Documents */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc, index) => (
              <div
                key={doc.id ?? doc._id ?? index}
                className="group relative pt-3 transition-all duration-500 hover:-translate-y-3"
              >

                {/* Second Paper */}
                <div className="absolute inset-x-3 bottom-0 top-5 rotate-3 rounded-xl border border-slate-200 bg-white transition-transform duration-500 group-hover:rotate-6" />

                {/* Main Paper */}
                <div className="relative flex min-h-[390px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-all duration-500 group-hover:border-purple-200">

                  {/* Paper Header */}
                  <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-4">

                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                        <FileText size={18} />
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Official Document
                      </span>
                    </div>

                    <span className="rounded-md bg-purple-50 px-2 py-1 text-[10px] font-bold uppercase text-purple-700">
                      PDF
                    </span>
                  </div>

                  {/* Paper Body */}
                  <div className="flex flex-1 flex-col py-6">

                    <div className="mb-5 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-100 bg-gradient-to-br from-pink-50 to-purple-50">
                        <GraduationCap size={30} className="text-purple-600" />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl font-extrabold leading-snug text-slate-800">
                        {doc.title}
                      </h3>

                      <div className="mx-auto my-4 h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

                      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
                        <Building2 size={15} className="shrink-0 text-purple-500" />
                        <span>{doc.provider}</span>
                      </div>
                    </div>

                    <p className="mt-5 text-center text-sm leading-6 text-slate-500">
                      {doc.description}
                    </p>
                  </div>

                  {/* Paper Footer */}
                  <div className="mt-auto flex items-center justify-between border-t border-dashed border-slate-200 pt-4">

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <Calendar size={14} className="text-purple-500" />
                      {formatDate(doc.date)}
                    </div>

                    <button
                      onClick={() => handleDownload(doc)}
                      aria-label={`Download ${doc.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300 hover:scale-110 hover:from-purple-600 hover:to-cyan-600"
                    >
                      <Download size={18} />
                    </button>
                  </div>

                  {/* Paper Corner */}
                  <div className="absolute right-0 top-0 h-10 w-10 overflow-hidden">
                    <div className="absolute -right-5 -top-5 h-10 w-10 rotate-45 bg-gradient-to-br from-pink-400 to-purple-500" />
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-slate-200 bg-white py-20 text-center">

              <FileText size={40} className="mx-auto mb-4 text-slate-300" />

              <p className="text-lg font-semibold text-slate-700">
                No documents found
              </p>

              <p className="mt-2 text-sm text-slate-400">
                This category does not contain any documents yet.
              </p>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-20 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400" />

          <Stamp size={18} className="text-purple-500" />

          <span className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
            Personal Collection
          </span>

          <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400" />
        </div>

      </div>
    </section>
  )
}

export default Docs