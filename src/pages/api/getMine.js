import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const directory = path.join(process.cwd(), 'public', req.query.folder);
    const files = fs.readdirSync(directory);
    const vids = files.filter(f => f.includes('mp4'));
    res.status(200).json({ vids });
  } catch (e) {
    res.status(500).json({ error: "Impossible de lire le dossier", details: e.message });
  }
}