import Proj from './_Proj';
import { connectToDatabase } from './_connect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    await connectToDatabase();

    // Récupérer tous les projets avec tri par niveau décroissant
    const projects = await Proj.find().sort({ lvl: -1 });

    // Formater les données pour correspondre à votre structure front-end
    const formattedProjects = projects.map(project => ({
      _id: project._id,
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      type: project.type,
      github: project.github,
      website: project.website,
      lvl: project.lvl
    }));

    res.status(200).json({
      success: true,
      projects: formattedProjects
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des projets:', err);
    res.status(500).json({
      error: 'Erreur serveur lors de la récupération des projets',
      details: err.message
    });
  }
}