import Msg from './_Msg';
import { connectToDatabase } from './_connect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  try {
    await connectToDatabase();
    const messages = await Msg.find().sort({ createdAt: -1 });
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}