import Doc from './_Doc';
import { connectToDatabase } from './_connect';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb', // augmente à 10 Mo
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  try {
    await connectToDatabase();

    const { title, provider, description, type, file } = req.body;
    if (!file || !file.data) {
      return res.status(400).json({ error: 'Fichier manquant ou invalide.' });
    }

    // Stocke directement la chaîne Base64 dans MongoDB
    const doc = new Doc({
      title,
      provider,
      description,
      type,
      file: {
        name: file.name,
        type: file.type,
        data: file.data, // Chaîne Base64 complète (ex: "data:application/pdf;base64,JVBERi0xLjQK...")
        size: file.data.length, // Optionnel: taille de la chaîne (pour référence)
      },
    });

    await doc.save();
    res.status(201).json({ success: true, docId: doc._id });
  } catch (err) {
    console.error('Erreur lors de l\'ajout du document:', err);
    res.status(500).json({ error: err.message });
  }
}