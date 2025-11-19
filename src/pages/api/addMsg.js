import Msg from './_Msg';
import { connectToDatabase } from './_connect';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    await connectToDatabase();

    const { name, email, message } = req.body;

    // Validation des champs
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Tous les champs sont obligatoires'
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Adresse email invalide'
      });
    }

    // Création du nouveau message
    const newMsg = new Msg({
      fullname: name,
      email: email,
      content: message
    });

    // Sauvegarde dans la base de données
    await newMsg.save();

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès!'
    });

  } catch (err) {
    console.error('Erreur lors de l\'envoi du message:', err);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de l\'envoi du message',
      details: err.message
    });
  }
}