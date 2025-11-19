import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const directory = path.join(process.cwd(), 'public', req.query.folder);
    const files = fs.readdirSync(directory);

    res.status(200).json({ files });
  } catch (e) {
    res.status(500).json({ error: "Impossible de lire le dossier", details: e.message });
  }
}