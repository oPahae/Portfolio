// src/pages/api/_Doc.js
import mongoose from 'mongoose';

const DocSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  provider: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  type: { type: String, required: true },
  date: { type: Date, default: Date.now },
  file: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    data: { type: String, required: true },
    size: { type: Number },
  },
}, { timestamps: true });

// Index pour optimiser les requêtes par type
DocSchema.index({ type: 1 });

// Eviter de recréer le modèle
const Doc = mongoose.models.Doc || mongoose.model('Doc', DocSchema);

export default Doc;