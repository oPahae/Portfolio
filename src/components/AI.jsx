import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { Bot, Send, User, Sparkles } from 'lucide-react'
import { socials, achievements, SKILLS, projects } from "../utils/constants"

const AI = ({ __SPEECH__ }) => {
  const [question, setQuestion] = useState('')
  const [questionSent, setQuestionSent] = useState('')
  const [response, setResponse] = useState("Bonjour ! Je suis l'assistant IA de Bahaa-eddine. Posez-moi des questions sur son parcours, ses compétences, ses projets ou ses réalisations.")
  const [isLoading, setIsLoading] = useState(false)
  const sendRef = useRef(null)

  useEffect(() => {
    if (__SPEECH__) {
      if (__SPEECH__.toLowerCase().includes('envo')) {
        sendRef.current?.click()
      } else {
        setQuestion(__SPEECH__)
      }
    }
  }, [__SPEECH__])

  const buildContext = useCallback(() => {
    return `
Tu es l'assistant IA personnel du site officiel de Bahaa-eddine Lamrissi.

Voici les informations concernant son parcours :

PARCOURS ACADÉMIQUE :
${achievements.map(a => `
- ${a.title} à ${a.company_name}
  Filière : ${a.filliere}
  Date : ${a.date || 'En cours'}
  Résultats :
  ${a.points.map(p => `  - ${p.semester} : ${p.credential}`).join('\n')}
`).join('\n')}

COMPÉTENCES TECHNIQUES :
${Object.values(SKILLS).map(s =>
  `- ${s.label} : ${s.shortDescription}`
).join('\n')}

PROJETS :
${projects.map(p => `
- ${p.title}
  Type : ${p.type}
  Description : ${p.description}
  Technologies : ${p.technologies.join(', ')}
  Date de création : ${p.createdAt}
  ${p.github ? `GitHub : ${p.github}` : ''}
  ${p.website ? `Site web : ${p.website}` : ''}
`).join('\n')}

RÉSEAUX SOCIAUX :
${socials.map(s => `- ${s.name} : ${s.url}`).join('\n')}

EXPÉRIENCES PROFESSIONNELLES :
- Stage de deux mois à Nobough Academy.
- Stage à l'Université Internationale Centrale (UIC), Casablanca.

SITE WEB :
https://pahae.vercel.app

CONSIGNES :
- Réponds exclusivement en français.
- Adopte un ton professionnel, naturel et concis.
- Utilise les informations fournies pour répondre précisément.
- Ne fabrique aucune information.
- Si une information n'est pas disponible, indique-le clairement.
- Pour les questions concernant les projets, présente leurs technologies et leurs objectifs.
- Pour les questions académiques, respecte les résultats et les dates indiqués.
`
  }, [])

  const getGeminiResponse = useCallback(async (msg) => {
    setIsLoading(true)

    try {
      const params = new URLSearchParams({
        data: buildContext(),
        prompt: `User Question: ${msg}`
      })

      const res = await fetch(
        `https://pahae-utils.vercel.app/api/responseAI?${params.toString()}`
      )

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`)
      }

      const data = await res.json()

      if (!data.response) {
        throw new Error('Réponse IA invalide')
      }

      setResponse(data.response)

    } catch (err) {
      console.error('Error getting Gemini response:', err)
      setResponse("Désolé, une erreur s'est produite. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }, [buildContext])

  const handleSendMessage = useCallback((e) => {
    e.preventDefault()

    if (!question.trim() || isLoading) return

    const msgToSend = question.trim()

    setQuestionSent(msgToSend)
    setQuestion('')
    setResponse('')

    getGeminiResponse(msgToSend)
  }, [question, isLoading, getGeminiResponse])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }, [handleSendMessage])

  const currentTime = useMemo(() => {
    return new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }, [])

  return (
    <div className="h-full text-gray-900 flex items-center justify-center px-6 pt-12 pb-8 relative overflow-hidden bg-white/80 backdrop-blur-3xl">
      <div className="w-full z-10">
        <div className="relative">
          <div className="px-6 h-fit flex flex-col">

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                disabled={isLoading}
                className="w-full flex-grow px-4 py-3 rounded-xl bg-white/80 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 shadow-sm"
              />

              <button
                ref={sendRef}
                onClick={handleSendMessage}
                disabled={!question.trim() || isLoading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto mt-8 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">

              {/* User message */}
              {questionSent && (
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-40" />

                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <User className="w-5 h-5 text-cyan-500" />
                      </div>
                    </div>
                  </div>

                  <div className="max-w-[75%] rounded-2xl p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {questionSent}
                    </p>

                    <span className="text-xs text-white/80 mt-2 block">
                      {currentTime}
                    </span>
                  </div>
                </div>
              )}

              {/* AI response */}
              {response && (
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-40" />

                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Bot className="w-5 h-5 text-purple-500" />
                      </div>
                    </div>
                  </div>

                  <div className="max-w-[75%] rounded-2xl p-4 bg-gray-100/90 border border-gray-200 text-gray-700 shadow-sm">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {response}
                    </p>

                    <span className="text-xs text-gray-500 mt-2 block">
                      {currentTime}
                    </span>
                  </div>
                </div>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-40" />

                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100/90 border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />

                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />

                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AI