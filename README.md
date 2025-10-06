# 💻 Portfolio OS - by Pahae 🚀

Bienvenue sur **Portfolio OS**, un portfolio **immersif et interactif** conçu sous forme d’un **système d’exploitation personnel** 🧠✨.  
Ce projet allie **Next.js**, **TailwindCSS**, et **Three.js** pour offrir une expérience fluide, moderne et inspirée des environnements informatiques.  

---

## 🖼️ Aperçu

> Un portfolio qui ressemble à un vrai OS 💾 :  
> chaque composant est représenté comme un **dossier**, et un **terminal intégré** permet de naviguer et d’interagir à travers des commandes personnalisées.

---

## 🧭 Fonctionnalités principales

### 🗂️ Dossiers disponibles :
| Dossier | Contenu |
|:--------|:---------|
| 💁‍♂️ **Infos personnelles** | Présente mon identité, bref description, et mes réseaux |
| 🏆 **Parcours** | Mon parcours unversitaire |
| ⚙️ **Skills** | Mes compétences techniques |
| 📄 **Docs** | Mes diplômes et certificats |
| 💼 **Projects** | Mes projets personnels et professionnels |
| 💬 **Feedbacks** | Les vis de quelque gens |
| 📞 **Contact** | Formulaire et liens de contact |

---

## 🧮 Terminal intégré

Le **Terminal OS** est au cœur de l’expérience 💻  
Tu peux exécuter différentes commandes pour explorer le portfolio 👇  

### 📜 Liste des commandes disponibles :

| Commande | Description |
|:---------|:-------------|
| 🧠 `sudo pahae -u root -p` | Débloque le terminal |
| 🧠 `sudo whoami` | Affiche les informations personnelles |
| 🌐 `sudo whoami -s` | Affiche les réseaux sociaux |
| 🎓 `sudo path` | Affiche le parcours académique complet |
| 🧭 `sudo path -p` | Affiche le parcours (version courte) |
| ⚡ `sudo skills` | Montre les compétences techniques |
| 📚 `sudo docs` | Ouvre la documentation |
| 🧱 `sudo projects` | Affiche les projets |
| 💬 `sudo feedbacks` | Montre les retours |
| 📞 `sudo contact` | Page de contact |
| 🏁 `sudo exit` | Retour à l'accueil |
| 🧹 `clear` / `cls` | Efface le terminal |
| 🔍 `ping pahae` | Vérifie la connexion |

---

## 🧩 Structure du projet

```bash
📦 portfolio-os
├── 📁 public                # Ressources statiques (images, icônes, modèles 3D, etc.)
├── 📁 src
│   ├── 📁 components        # Interfaces principales (chaque dossier du système)
│   ├── 📁 containers        # Composants unitaires internes à chaque interface
│   ├── 📁 styles            # Feuilles de style (ex: globals.css)
│   ├── 📁 utils             # Constantes et fonctions utilitaires
│   ├── 📁 windows           # Composants relatifs au système d’exploitation (fenêtres, barre, terminal…)
│   └── 📁 pages
│       ├── 📁 api           # Backend API routes (Next.js)
│       ├── 📄 index.jsx     # Page principale du portfolio (version desktop)
│       └── 📄 tel.jsx       # Version mobile adaptée
└── 📄 README.md



