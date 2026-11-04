import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import { focusRing } from '../lib/classes';

const suggestions = [
  'What is his academic background?',
  'What projects did he complete during internships?',
  'Which backend technologies does he master?',
];

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const endRef = useRef(null);
  const controllerRef = useRef(null);
  const popupRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
}, [open])

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        if (buttonRef.current) buttonRef.current.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ block: 'end' });
  }, [messages, loading]);

  useEffect(() => () => {
    if (controllerRef.current) controllerRef.current.abort();
  }, []);

  const ask = async (text) => {
    const question = text.trim();
    if (!question || loading) return;
    setMessages((current) => [...current, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Error');
      setMessages((current) => [...current, { role: 'assistant', text: payload.answer }]);
    } catch (error) {
      if (error.name === 'AbortError') return;
      setMessages((current) => [
        ...current,
        {
          role: 'error',
          text: error.message && error.message !== 'Failed to fetch' ? error.message : 'Something went wrong. Please try again in a moment.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="fenetreAssistant"
        className={`fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-violet-400 px-5 text-sm font-medium text-white transition-colors hover:bg-violet-400 dark:bg-violet-500 dark:text-paper-dark dark:hover:bg-violet-400 ${focusRing}`}
      >
        {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
        {open ? 'Close' : 'Ask a question'}
      </button>

      {open ? (
        <section
          ref={popupRef}
          id="fenetreAssistant"
          role="dialog"
          aria-label="Portfolio AI assistant"
          className="fixed inset-x-3 bottom-20 z-50 flex h-[min(34rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-xl border border-line bg-white/20 backdrop-blur-sm shadow-lg dark:border-line-dark sm:inset-x-auto sm:right-5 sm:w-[24rem]"
        >
          <header className="border-b border-line px-5 py-4 dark:border-line-dark">
            <h2 className="font-display text-lg font-semibold">AI Assistant</h2>
            <p className="text-sm text-muted dark:text-muted-dark">
              Ask a question about Bahaa-eddine: background, projects, skills, documents.
            </p>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4" aria-live="polite">
            {messages.length === 0 ? (
              <ul className="space-y-2">
                {suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => ask(suggestion)}
                      className={`w-full rounded-lg border border-line px-3 py-2 text-left text-sm transition-colors hover:border-violet-400 dark:border-line-dark dark:hover:border-violet-500 ${focusRing}`}
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto bg-ink text-paper dark:bg-ink-dark dark:text-paper-dark'
                    : message.role === 'error'
                      ? 'border border-red-700 text-red-800 dark:border-red-400 dark:text-red-300'
                      : 'bg-paper dark:bg-paper-dark'
                }`}
              >
                {message.text}
              </div>
            ))}
            {loading ? (
              <p className="text-sm text-muted dark:text-muted-dark" role="status">
                Generating response…
              </p>
            ) : null}
            <div ref={endRef} />
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3 dark:border-line-dark">
            <label htmlFor="questionAssistant" className="sr-only">
              Your question
            </label>
            <input
              id="questionAssistant"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={400}
              placeholder="Your question"
              autoComplete="off"
              className={`min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-2 text-sm placeholder:text-muted dark:border-line-dark dark:bg-paper-dark dark:placeholder:text-muted-dark ${focusRing}`}
            />
            <button
              type="submit"
              disabled={loading || input.trim() === ''}
              aria-label="Send the question"
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-violet-400 disabled:opacity-40 dark:bg-ink-dark dark:text-paper-dark dark:hover:bg-violet-400 ${focusRing}`}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
