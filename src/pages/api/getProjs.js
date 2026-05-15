import path from 'path';
import fs from 'fs';
import Doc from './_Doc';
import { connectToDatabase } from './_connect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    await connectToDatabase();

    // Récupérer tous les documents SAUF le CV
    const docs = await Doc.find({
      type: { $ne: 'CV' }
    }).sort({ date: -1 });

    // Chemin du CV dans /public/mes_docs
    const cvPath = path.join(process.cwd(), 'public', 'mes_docs', 'cv.pdf');

    let cvBase64 = null;

    // Vérifier si le fichier existe
    if (fs.existsSync(cvPath)) {
      const fileBuffer = fs.readFileSync(cvPath);

      // Convertir en Base64 compatible frontend
      cvBase64 = `data:application/pdf;base64,${fileBuffer.toString('base64')}`;
    }

    // Organiser les documents
    const organizedDocs = {
      cv: cvBase64
        ? {
            title: 'CV',
            description: 'Curriculum Vitae',
            date: new Date(),
            file: cvBase64,
            _id: 'local-cv'
          }
        : null,

      universitaires: [],
      autoFormations: [],
      sports: []
    };

    docs.forEach(doc => {
      if (doc.type === 'université') {
        organizedDocs.universitaires.push({
          title: doc.title,
          provider: doc.provider,
          description: doc.description,
          date: doc.date,
          file: doc.file.data,
          _id: doc._id
        });
      } else if (doc.type === 'auto-formation') {
        organizedDocs.autoFormations.push({
          title: doc.title,
          provider: doc.provider,
          description: doc.description,
          date: doc.date,
          file: doc.file.data,
          _id: doc._id
        });
      } else if (doc.type === 'sport') {
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

    res.status(200).json({
      success: true,
      documents: organizedDocs
    });

  } catch (err) {
    console.error('Erreur lors de la récupération des documents:', err);

    res.status(500).json({
      error: 'Erreur serveur lors de la récupération des documents'
    });
  }
}