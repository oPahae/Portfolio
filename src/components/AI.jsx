import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { socials, achievements, SKILLS, feedbacks, projects } from "../utils/constants";

const AI = ({ __SPEECH__ }) => {
  const [question, setQuestion] = useState('');
  const [questionSent, setQuestionSent] = useState('');
  const [response, setResponse] = useState("Bonjour ! Je suis l'assistant IA de Bahaa-eddine. Posez-moi des questions sur son parcours, ses compétences, ses projets ou ses réalisations.");
  const [isLoading, setIsLoading] = useState(false);
  const sendRef = useRef(null);

  useEffect(() => {
    if (__SPEECH__) {
      if (__SPEECH__.includes('envo'))
        sendRef.current.click();
      else
        setQuestion(__SPEECH__);
    }
  }, [__SPEECH__]);

  const buildContext = useCallback(() => {
    return `Tu es l'assistant IA personnel du siteweb officiel de Bahaa-eddine Lamrissi. Voici les informations le concernant :
      PARCOURS ACADÉMIQUE:
      ${achievements.map(a => `- ${a.title[0]} à ${a.company_name} (${a.date}): ${a.points.map((p, i) => `${p}: ${a.credential[i]}`).join(', ')}`).join('\n')}
      COMPÉTENCES TECHNIQUES:
      ${Object.values(SKILLS).map(s => `- ${s.label}: ${s.shortDescription}`).join('\n')}
      PROJETS:
      ${projects.map(p => `- ${p.title} (${p.type}, créé le ${p.createdAt}): ${p.description}. Technologies: ${p.technologies.join(', ')}${p.website ? `. Site: ${p.website}` : ''}`).join('\n')}
      RÉSEAUX SOCIAUX:
      ${socials.map(s => `- ${s.name}: ${s.url}`).join('\n')}
      Stage: un seul à l'académie Nobough (stage de deux mois)
      Siteweb: https://pahae.vercel.app
      Réponds de manière concise, professionnelle et en français. Si on te pose une question sur Bahaa-eddine, utilise ces informations pour répondre avec précision.
    `;
  }, []);

  const getGeminiResponse = useCallback(async (msg) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://pahae-utils.vercel.app/api/responseAI?data=${buildContext()}&prompt=User Question: ${msg}`);
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error('Error getting Gemini response:', err);
      setResponse("Désolé, une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }, [buildContext]);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    const msgToSend = question;
    setQuestionSent(msgToSend);
    setQuestion('');
    setResponse('');
    getGeminiResponse(msgToSend);
  }, [question, isLoading, getGeminiResponse]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  }, [handleSendMessage]);

  const currentTime = useMemo(() => {
    return new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  return (
    <div className="h-screen md:h-fit text-white flex items-center justify-center px-6 pt-12 pb-8 relative overflow-hidden bg-black/80 backdrop-blur-3xl">
      <div className="w-full z-10">
        <div className="relative">
          <div className="px-6 h-fit flex flex-col">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                disabled={isLoading}
                className="w-full flex-grow px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
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
            <div className="flex-grow overflow-y-auto mt-8 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
              {questionSent && (
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-40"></div>
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <User className="w-5 h-5 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                  <div className="max-w-[75%] rounded-2xl p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {questionSent}
                    </p>
                    <span className="text-xs opacity-60 mt-2 block">
                      {currentTime}
                    </span>
                  </div>
                </div>
              )}
              {response && (
                <div className="flex items-start gap-3 flex-row">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-40"></div>
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <Bot className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>
                  </div>
                  <div className="max-w-[75%] rounded-2xl p-4 bg-gray-800/50 text-gray-200">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {response}
                    </p>
                    <span className="text-xs opacity-60 mt-2 block">
                      {currentTime}
                    </span>
                  </div>
                </div>
              )}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-40"></div>
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;

