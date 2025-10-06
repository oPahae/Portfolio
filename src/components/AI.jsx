import { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { socials, achievements, SKILLS, feedbacks, projects } from "../utils/constants";

const AI = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'gemini',
      content: "Bonjour ! Je suis l'assistant IA de Bahaa-eddine. Posez-moi des questions sur son parcours, ses compétences, ses projets ou ses réalisations !",
      created_At: new Date().toISOString(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buildContext = () => {
    return `Tu es l'assistant IA personnel de Bahaa-eddine Lamrissi. Voici les informations le concernant :

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
Réponds de manière concise, professionnelle et en français. Si on te pose une question sur Bahaa-eddine, utilise ces informations pour répondre avec précision.`;
  };

  const getGeminiResponse = async (msg) => {
    setIsLoading(true);
    try {
      const contextualPrompt = `${buildContext()}\n\nQuestion de l'utilisateur: ${msg}`;
      
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDwVqL80ycP0sMykaPmeq_u7OdCJw35Otc`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: contextualPrompt }],
              },
            ],
          }),
        }
      );
      
      const gemini = await res.json();
      const rawText = gemini?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (rawText) {
        const geminiResponse = {
          sender: 'gemini',
          content: rawText,
          created_At: new Date().toISOString(),
        };
        setMessages(prevMessages => [...prevMessages, geminiResponse]);
      } else {
        throw new Error('No response from Gemini');
      }
    } catch (err) {
      console.error('Error getting Gemini response:', err);
      const errorResponse = {
        sender: 'gemini',
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        created_At: new Date().toISOString(),
      };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    const userMessage = {
      sender: 'user',
      content: newMessage,
      created_At: new Date().toISOString(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    const msgToSend = newMessage;
    setNewMessage('');
    
    getGeminiResponse(msgToSend);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
            Assistant IA
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mx-auto"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Posez vos questions sur mon parcours, mes compétences et mes projets
          </p>
        </div>

        {/* Chat Container */}
        <div className="relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-3xl p-[2px]">
          <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-6 h-[600px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-40"></div>
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        {message.sender === 'user' ? (
                          <User className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <Bot className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white'
                        : 'bg-gray-800/50 text-gray-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <span className="text-xs opacity-60 mt-2 block">
                      {new Date(message.created_At).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Loading Indicator */}
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
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                disabled={isLoading}
                className="flex-grow px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isLoading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;