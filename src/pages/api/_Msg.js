// src/pages/api/_Msg.js
import mongoose from 'mongoose';
import { connectToDatabase } from './_connect';

const MsgSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Le nom complet est obligatoire.'],
    trim: true,
    maxlength: [100, 'Le nom ne doit pas dépasser 100 caractères.'],
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire.'],
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'L\'email doit être valide.',
    },
  },
  content: {
    type: String,
    required: [true, 'Le contenu du message est obligatoire.'],
    trim: true,
    maxlength: [2000, 'Le message ne doit pas dépasser 2000 caractères.'],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index pour optimiser les requêtes par email et statut de lecture
MsgSchema.index({ email: 1, isRead: 1 });

let Msg;
try {
  await connectToDatabase();
  Msg = mongoose.models.Msg || mongoose.model('Msg', MsgSchema);
} catch (err) {
  console.error('Erreur lors de l\'initialisation du modèle Msg:', err);
  throw err;
}

export default Msg;