import Proj from './_Proj';
import { connectToDatabase } from './_connect';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  try {
    await connectToDatabase();
    const proj = new Proj(req.body);
    await proj.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}