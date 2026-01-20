import Doc from './_Doc';
import { connectToDatabase } from './_connect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    await connectToDatabase();

    // Récupérer tous les documents
    const docs = await Doc.find().sort({ date: -1 });

    // Organiser les documents par catégorie
    const organizedDocs = {
      cv: null,
      universitaires: [],
      autoFormations: [],
      sports: []
    };

    docs.forEach(doc => {
      if (doc.type === 'CV') {
        organizedDocs.cv = {
          title: doc.title,
          description: doc.description,
          date: doc.date,
          file: doc.file.data, // La chaîne Base64 complète
          _id: doc._id
        };
      } else if (doc.type === 'université') {
        organizedDocs.universitaires.push({
          title: doc.title,
          provider: doc.provider,
          description: doc.description,
          date: doc.date,
          file: doc.file.data,
          _id: doc._id
        });
      } else if (doc.type === 'auto-formation') { // Auto-formations
        organizedDocs.autoFormations.push({
          title: doc.title,
          provider: doc.provider,
          description: doc.description,
          date: doc.date,
          file: doc.file.data,
          _id: doc._id
        });
      } else if (doc.type === 'sport') { // Sports
        organizedDocs.sports.push({
          title: doc.title,
          provider: doc.provider,
          description: doc.description,
          date: doc.date,
          file: doc.file.data,
          _id: doc._id
        });
      }
    });

    res.status(200).json({ success: true, documents: organizedDocs });
  } catch (err) {
    console.error('Erreur lors de la récupération des documents:', err);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des documents' });
  }
}