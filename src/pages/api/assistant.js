import { buildAssistantContext } from '../../lib/assistantContext';

const endpoint = 'https://pahae-utils.vercel.app/api/responseAI';
const maxQuestionLength = 400;
const answerKeys = ['response', 'answer', 'text', 'message', 'result', 'content', 'reply', 'output', 'data'];

const instructions =
  'Tu es l’assistant du portfolio de Bahaa-eddine Lamrissi. Réponds à la question du visiteur à propos de Bahaa-eddine, à la troisième personne, dans la langue de la question, de façon claire et concise. Appuie-toi uniquement sur les données fournies. Si l’information n’y figure pas, dis-le simplement sans rien inventer. Si la question ne concerne pas Bahaa-eddine, explique poliment que tu ne peux répondre que sur lui. Question : ';

const pickText = (value) => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    const parts = value.map(pickText).filter(Boolean);
    return parts.length > 0 ? parts.join('\n') : null;
  }
  if (value && typeof value === 'object') {
    for (const key of answerKeys) {
      if (key in value) {
        const found = pickText(value[key]);
        if (found) return found;
      }
    }
  }
  return null;
};

const extractAnswer = (raw) => {
  try {
    return pickText(JSON.parse(raw));
  } catch {
    return raw.trim() || null;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  if (!question) {
    return res.status(400).json({ error: 'Posez une question pour obtenir une réponse.' });
  }
  if (question.length > maxQuestionLength) {
    return res.status(400).json({ error: `La question doit contenir au maximum ${maxQuestionLength} caractères.` });
  }

  const url = new URL(endpoint);
  url.searchParams.set('data', buildAssistantContext());
  url.searchParams.set('prompt', `${instructions}${question}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const upstream = await fetch(url, { signal: controller.signal });
    const raw = await upstream.text();
    if (!upstream.ok) {
      return res.status(502).json({ error: 'Le service IA est momentanément indisponible. Réessayez dans un instant.' });
    }
    const answer = extractAnswer(raw);
    if (!answer) {
      return res.status(502).json({ error: 'Le service IA n’a renvoyé aucune réponse exploitable.' });
    }
    return res.status(200).json({ answer });
  } catch {
    return res.status(502).json({ error: 'Impossible de joindre le service IA. Vérifiez votre connexion et réessayez.' });
  } finally {
    clearTimeout(timeout);
  }
}
