// src/pages/api/_Proj.js
import mongoose from 'mongoose';
import { connectToDatabase } from './_connect';

const ProjSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire.'],
    trim: true,
    maxlength: [100, 'Le titre ne doit pas dépasser 100 caractères.'],
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire.'],
    trim: true,
  },
  technologies: {
    type: [String], // Tableau de technologies (ex: ["React", "Node.js"])
    default: [],
  },
  type: {
    type: String,
    enum: ['personnel', 'professionnel', 'académique', 'open-source'],
    default: 'personnel',
  },
  github: {
    type: String, // URL du dépôt GitHub
    trim: true,
    validate: {
      validator: (v) => /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+/.test(v),
      message: 'L\'URL GitHub doit être valide (ex: https://github.com/utilisateur/depot).',
    },
  },
  website: {
    type: String, // URL du site web (optionnel)
    trim: true,
    validate: {
      validator: (v) => !v || /^https?:\/\/.+/.test(v),
      message: 'L\'URL du site web doit être valide (ex: https://exemple.com).',
    },
  },
  lvl: {
    type: Number,
    min: [1, 'Le niveau minimum est 1.'],
    max: [5, 'Le niveau maximum est 5.'],
    required: [true, 'Le niveau est obligatoire.'],
  },
}, {
  timestamps: true,
});

// Index pour optimiser les requêtes par type et niveau
ProjSchema.index({ type: 1, lvl: 1 });

let Proj;
try {
  await connectToDatabase();
  Proj = mongoose.models.Proj || mongoose.model('Proj', ProjSchema);
} catch (err) {
  console.error('Erreur lors de l\'initialisation du modèle Proj:', err);
  throw err;
}

export default Proj;