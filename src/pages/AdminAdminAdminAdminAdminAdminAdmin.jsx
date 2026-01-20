import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Admin() {
  // États pour les formulaires et données
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [docForm, setDocForm] = useState({
    title: '',
    provider: '',
    description: '',
    file: null,
    type: 'CV',
  });
  const [projForm, setProjForm] = useState({
    title: 'a',
    description: 'a',
    technologies: '',
    type: 'personnel',
    github: '',
    website: '',
    lvl: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Récupérer les messages au chargement
  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/getMsgs');
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages || []);
      } else {
        setErrorMsg(data.error || 'Échec de la récupération des messages.');
      }
    } catch (err) {
      setErrorMsg('Erreur réseau. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion des formulaires
  const handleDocSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const file = docForm.file;
      if (!file) {
        setErrorMsg('Veuillez sélectionner un fichier.');
        setIsLoading(false);
        return;
      }

      // Conversion en Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64String = reader.result; // Garde le préfixe "data:..." pour faciliter le décodage côté client plus tard

        const response = await fetch('/api/addDoc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...docForm,
            file: {
              name: file.name,
              type: file.type,
              data: base64String, // Stocke la chaîne complète (ex: "data:application/pdf;base64,JVBERi0xLjQK...")
            },
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setSuccessMsg('Document ajouté avec succès !');
          setDocForm({ title: '', provider: '', description: '', file: null, type: 'CV' });
        } else {
          setErrorMsg(data.error || 'Échec de l\'ajout du document.');
        }
        setIsLoading(false);
      };

      reader.onerror = () => {
        setErrorMsg('Erreur lors de la lecture du fichier.');
        setIsLoading(false);
      };
    } catch (err) {
      setErrorMsg('Erreur réseau. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  const handleProjSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/addProj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projForm,
          technologies: projForm.technologies.split(',').map((tech) => tech.trim()),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Projet ajouté avec succès !');
        setProjForm({
          title: '',
          description: '',
          technologies: '',
          type: 'personnel',
          github: '',
          website: '',
          lvl: 1,
        });
      } else {
        setErrorMsg(data.error || 'Échec de l\'ajout du projet.');
      }
    } catch (err) {
      setErrorMsg('Erreur réseau. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mise à jour des states
  const handleDocChange = (e) => {
    const { name, value, files } = e.target;
    setDocForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleProjChange = (e) => {
    const { name, value } = e.target;
    setProjForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Head>
        <title>Admin Panel | Portfolio</title>
        <meta name="description" content="Gestion des documents, projets et messages" />
      </Head>

      <div className="min-h-screen bg-black text-white p-6 md:p-10">
        {/* Titre */}
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">Tableau de bord Admin</h1>

        {/* Onglets */}
        <div className="flex mb-6 border-b border-gray-700">
          {['messages', 'ajout-doc', 'ajout-proj'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === tab
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-gray-200'
                }`}
            >
              {tab === 'messages' && 'Messages'}
              {tab === 'ajout-doc' && 'Ajouter un Document'}
              {tab === 'ajout-proj' && 'Ajouter un Projet'}
            </button>
          ))}
        </div>

        {/* Contenu dynamique */}
        <div className="rounded-lg p-6 shadow-lg">
          {successMsg && (
            <div className="mb-4 p-3 bg-green-900 text-green-200 rounded">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-900 text-red-200 rounded">
              {errorMsg}
            </div>
          )}

          {/* Onglet Messages */}
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Messages reçus</h2>
              {isLoading ? (
                <p className="text-gray-400">Chargement...</p>
              ) : messages.length === 0 ? (
                <p className="text-gray-400">Aucun message.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Nom</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Email</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Contenu</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {messages.map((msg, index) => (
                        <tr key={index} className={!msg.isRead ? 'bg-gray-800' : ''}>
                          <td className="px-4 py-3 whitespace-nowrap">{msg.fullname}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-blue-400">{msg.email}</td>
                          <td className="px-4 py-3 max-w-xs truncate">{msg.content}</td>
                          <td className="px-4 py-3 text-sm text-gray-400">
                            {new Date(msg.createdAt).toLocaleString('fr-FR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Onglet Ajout Document */}
          {activeTab === 'ajout-doc' && (
            <form onSubmit={handleDocSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Ajouter un document</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Titre *</label>
                <input
                  type="text"
                  name="title"
                  value={docForm.title}
                  onChange={handleDocChange}
                  required
                  className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fournisseur *</label>
                <input
                  type="text"
                  name="provider"
                  value={docForm.provider}
                  onChange={handleDocChange}
                  required
                  className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={docForm.description}
                  onChange={handleDocChange}
                  className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type *</label>
                <select
                  name="type"
                  value={docForm.type}
                  onChange={handleDocChange}
                  className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  {['CV', 'université', 'auto-formation', 'sport', 'autre'].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fichier *</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleDocChange}
                  required
                  className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 rounded font-medium transition-colors ${isLoading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {isLoading ? 'Envoi...' : 'Ajouter'}
              </button>
            </form>
          )}

          {/* Onglet Ajout Projet */}
          {activeTab === 'ajout-proj' && (
            <form onSubmit={handleProjSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Ajouter un projet</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Titre *</label>
                <input
                  type="text"
                  name="title"
                  value={projForm.title}
                  onChange={handleProjChange}
                  required
                  className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  value={projForm.description}
                  onChange={handleProjChange}
                  required
                  className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Technologies (séparées par des virgules)</label>
                <input
                  type="text"
                  name="technologies"
                  value={projForm.technologies}
                  onChange={handleProjChange}
                  className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: React, Next.js, MongoDB"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    value={projForm.type}
                    onChange={handleProjChange}
                    className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    {['personnel', 'professionnel', 'académique', 'open-source'].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Niveau (1-5) *</label>
                  <input
                    type="number"
                    name="lvl"
                    min="1"
                    max="5"
                    value={projForm.lvl}
                    onChange={handleProjChange}
                    required
                    className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Lien GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={projForm.github}
                    onChange={handleProjChange}
                    className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Site web</label>
                  <input
                    type="url"
                    name="website"
                    value={projForm.website}
                    onChange={handleProjChange}
                    className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="https://exemple.com"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 rounded font-medium transition-colors ${isLoading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {isLoading ? 'Envoi...' : 'Ajouter'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
