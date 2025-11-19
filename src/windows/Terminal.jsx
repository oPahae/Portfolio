import { useState, useRef, useEffect } from 'react';
import { socials, achievements, SKILLS } from '../utils/constants';

const Terminal = ({ page, setPage, get }) => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Terminal PAHAE v1.0.0 - Tapez "help" pour voir les commandes disponibles' },
    { type: 'warning', content: '⚠️ Terminal verrouillé. Utilisez "sudo pahae -u root -p" pour déverrouiller' }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Scroll automatique optimisé
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  // Suggestions de commandes
  useEffect(() => {
    if (!currentCommand.trim()) {
      setSuggestions([]);
      return;
    }

    const allCommands = [
      'help',
      'sudo pahae -u root -p',
      ...(isUnlocked ? [
        'sudo whoami',
        'sudo whoami -s',
        'sudo path',
        'sudo path -p',
        'sudo skills',
        'sudo docs',
        'sudo projects',
        'sudo feedbacks',
        'sudo contact',
        'sudo exit',
        'clear',
        'cls',
        'ping pahae'
      ] : [])
    ];

    const filtered = allCommands.filter(cmd =>
      cmd.toLowerCase().includes(currentCommand.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 3));
  }, [currentCommand, isUnlocked]);

  const commands = {
    help: () => ({
      type: 'output',
      content: (
        <div className="space-y-2">
          <div className="text-cyan-400 font-semibold mb-3">Commandes disponibles:</div>
          <div className="ml-4 space-y-1">
            <div><span className="text-green-400">help</span> - Affiche cette aide</div>
            <div><span className="text-green-400">sudo pahae -u root -p</span> - Déverrouille le terminal</div>
            {isUnlocked && (
              <>
                <div><span className="text-green-400">sudo whoami</span> - Affiche les informations personnelles</div>
                <div><span className="text-green-400">sudo whoami -s</span> - Affiche les réseaux sociaux</div>
                <div><span className="text-green-400">sudo path</span> - Affiche le parcours académique</div>
                <div><span className="text-green-400">sudo path -p</span> - Affiche le parcours (version courte)</div>
                <div><span className="text-green-400">sudo skills</span> - Affiche les compétences techniques</div>
                <div><span className="text-green-400">sudo docs</span> - Accéder à la documentation</div>
                <div><span className="text-green-400">sudo projects</span> - Voir les projets</div>
                <div><span className="text-green-400">sudo feedbacks</span> - Voir les retours</div>
                <div><span className="text-green-400">sudo contact</span> - Page de contact</div>
                <div><span className="text-green-400">sudo exit</span> - Retour à l'accueil</div>
                <div><span className="text-green-400">clear</span> / <span className="text-green-400">cls</span> - Efface le terminal</div>
                <div><span className="text-green-400">ping pahae</span> - Vérifie la connexion</div>
              </>
            )}
          </div>
          <div className="text-yellow-400 mt-3 text-sm">💡 Utilisez les flèches ↑↓ pour naviguer dans l'historique</div>
        </div>
      )
    }),
    'sudo pahae -u root -p': () => {
      setIsUnlocked(true);
      return {
        type: 'success',
        content: '✓ Terminal déverrouillé avec succès. Vous avez maintenant accès à toutes les commandes.'
      };
    },
    'sudo whoami': () => ({
      type: 'output',
      content: (
        <div className="space-y-2">
          <div className="text-cyan-400 font-bold text-lg">LAMRISSI Bahaa-eddine</div>
          <div className="text-gray-300">📚 Étudiant en Master Systèmes Informatiques & Réseaux</div>
          <div className="text-gray-300">🏫 FST Settat, Maroc</div>
        </div>
      )
    }),
    'sudo whoami -s': () => ({
      type: 'output',
      content: (
        <div className="space-y-3">
          <div className="text-cyan-400 font-semibold mb-2">Réseaux sociaux:</div>
          {socials.map((social, index) => (
            <div key={index} className="ml-4 flex items-center gap-3">
              <social.icon className="text-green-400"></social.icon>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {social.name}
              </a>
            </div>
          ))}
        </div>
      )
    }),
    'sudo path': () => ({
      type: 'output',
      content: (
        <div className="space-y-4">
          <div className="text-cyan-400 font-semibold mb-3">Parcours académique:</div>
          {achievements.map((achievement, index) => (
            <div key={index} className="ml-4 border-l-2 border-cyan-500 pl-4 pb-4">
              <div className="text-green-400 font-semibold">{achievement.title.join(', ')}</div>
              <div className="text-gray-300">{achievement.company_name}</div>
              <div className="text-yellow-400 text-sm">{achievement.date}</div>
              <div className="mt-2 space-y-1">
                {achievement.points.map((point, idx) => (
                  <div key={idx} className="text-gray-400 text-sm">
                    • {point}: <span className="text-green-400">{achievement.credential[idx]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    }),
    'sudo path -p': () => ({
      type: 'output',
      content: (
        <div className="space-y-2">
          <div className="text-cyan-400 font-semibold mb-2">Parcours (version courte):</div>
          {achievements.map((achievement, index) => (
            <div key={index} className="ml-4">
              <span className="text-green-400">{achievement.title.join(', ')}</span>
              <span className="text-gray-400"> - {achievement.company_name}</span>
              <span className="text-yellow-400 text-sm"> ({achievement.date})</span>
            </div>
          ))}
        </div>
      )
    }),
    'sudo skills': () => ({
      type: 'output',
      content: (
        <div className="space-y-3">
          <div className="text-cyan-400 font-semibold mb-3">Compétences techniques:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.values(SKILLS).map((skill) => (
              <div key={skill.id} className="flex items-start gap-3 bg-gray-800/50 p-3 rounded border border-gray-700">
                <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
                <div className="flex-1">
                  <div className="text-green-400 font-semibold">{skill.label}</div>
                  <div className="text-gray-400 text-sm">{skill.shortDescription}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }),
    'sudo docs': () => {
      setPage('Docs');
      return { type: 'success', content: '→ Navigation vers la documentation...' };
    },
    'sudo projects': () => {
      setPage('Projects');
      return { type: 'success', content: '→ Navigation vers les projets...' };
    },
    'sudo feedbacks': () => {
      setPage('Feedbacks');
      return { type: 'success', content: '→ Navigation vers les retours...' };
    },
    'sudo contact': () => {
      setPage('Contact');
      return { type: 'success', content: '→ Navigation vers le contact...' };
    },
    'sudo exit': () => {
      setPage('');
      return { type: 'success', content: '→ Retour à l\'accueil...' };
    },
    clear: () => {
      setHistory([
        { type: 'system', content: 'Terminal PAHAE v1.0.0 - Tapez "help" pour voir les commandes disponibles' },
        { type: 'success', content: '✓ Terminal effacé avec succès.' }
      ]);
      return null;
    },
    cls: () => {
      setHistory([
        { type: 'system', content: 'Terminal PAHAE v1.0.0 - Tapez "help" pour voir les commandes disponibles' },
        { type: 'success', content: '✓ Terminal effacé avec succès.' }
      ]);
      return null;
    },
    'ping pahae': () => {
      window.open('https://www.linkedin.com/in/bahaa-eddine-lamrissi-81366528a?originalSubdomain=ma', '_blank');
      return {
        type: 'success',
        content: '🔗 Redirection vers LinkedIn... (nouvel onglet)'
      };
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();

    // Ajouter la commande à l'historique visuel
    setHistory(prev => [...prev, { type: 'command', content: trimmedCmd }]);

    // Ajouter à l'historique des commandes
    if (trimmedCmd) {
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistoryIndex(-1);
    }

    // Commandes toujours disponibles
    if (trimmedCmd === 'help' || trimmedCmd === '') {
      if (trimmedCmd === 'help') {
        setHistory(prev => [...prev, commands.help()]);
      }
      return;
    }

    if (trimmedCmd === 'sudo pahae -u root -p') {
      setHistory(prev => [...prev, commands['sudo pahae -u root -p']()]);
      return;
    }

    if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setHistory(prev => {
        const newHistory = commands[trimmedCmd]();
        return newHistory ? [...prev, newHistory] : prev;
      });
      return;
    }

    if (trimmedCmd === 'ping pahae') {
      setHistory(prev => [...prev, commands['ping pahae']()]);
      return;
    }

    // Vérifier si le terminal est déverrouillé pour les autres commandes
    if (!isUnlocked) {
      setHistory(prev => [...prev, {
        type: 'error',
        content: '✗ Terminal verrouillé. Utilisez "sudo pahae -u root -p" pour déverrouiller.'
      }]);
      return;
    }

    // Exécuter les commandes
    if (commands[trimmedCmd]) {
      const response = commands[trimmedCmd]();
      if (response) {
        setHistory(prev => [...prev, response]);
      }
    } else {
      setHistory(prev => [...prev, {
        type: 'error',
        content: `✗ Commande non reconnue: "${trimmedCmd}". Tapez "help" pour voir les commandes disponibles.`
      }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
      setSuggestions([]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentCommand(suggestions[0]);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCurrentCommand(suggestion);
    setSuggestions([]);
    inputRef.current.focus();
  };

  const getLineClass = (type) => {
    switch (type) {
      case 'command': return 'text-white';
      case 'output': return 'text-gray-300';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'system': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-full h-full bg-black rounded-lg shadow-2xl overflow-hidden border-2 border-white">
      {/* Terminal Header */}
      <div className="bg-black px-4 py-2 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-gray-400 text-sm font-mono">
          Terminal PAHAE {isUnlocked ? '🔓' : '🔒'}
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="p-4 h-[calc(100%-3rem)] overflow-y-auto font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div key={index} className={`mb-2 ${getLineClass(line.type)}`}>
            {line.type === 'command' && (
              <span className="text-green-400">pahae@terminal:~$ </span>
            )}
            {typeof line.content === 'string' ? line.content : line.content}
          </div>
        ))}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="ml-8 mb-2 text-gray-400 text-xs">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer hover:text-white"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {/* Input Line */}
        <div className="flex items-center">
          <span className="text-green-400 mr-2">pahae@terminal:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white caret-white"
            autoFocus
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;