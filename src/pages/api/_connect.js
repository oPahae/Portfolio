// src/pages/api/_connect.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // URL de votre cluster MongoDB Atlas

if (!MONGODB_URI) {
  throw new Error('La variable d\'environnement MONGODB_URI est manquante.');
}

/**
 * Cache de la connexion pour éviter les reconnexions inutiles.
 * @type {mongoose.Connection|null}
 */
let cached = global.mongoose || { conn: null, promise: null };

/**
 * Établit une connexion à MongoDB Atlas.
 * @returns {Promise<mongoose.Connection>} La connexion MongoDB.
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ Connexion à MongoDB Atlas établie avec succès.');
        return mongoose;
      })
      .catch((err) => {
        console.error('❌ Échec de la connexion à MongoDB Atlas:', err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}