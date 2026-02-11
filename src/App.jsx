// Portfolio_MaminiainaRafetraharivony.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiDownload } from 'react-icons/fi';

// ---------- Données principales ----------
const CV = {
  name: 'Maminiaina Rafetraharivony',
  title: 'Technicien support informatique',
  email: 'landry012345@gmail.com',
  phone: '0762687880',
  location: 'France',
  objective: "Passionné par les systèmes, réseaux et la cybersécurité. Je conçois, sécurise et administre des infrastructures informatiques modernes.",
};

// ---------- Composant Animation Texte ----------
function TypingTitle({ lines = [], speed = 80, pause = 1000 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    // SÉCURITÉ 1 : Si pas de lignes, on ne fait rien
    if (!lines || lines.length === 0) return;

    // Si l'animation est finie
    if (index >= lines.length) return;

    // SÉCURITÉ 2 : Si la ligne actuelle n'existe pas, on arrête
    if (!lines[index]) return;

    // Si la ligne est finie
    if (subIndex === lines[index].length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
        setSubIndex(0);
      }, pause);
      return () => clearTimeout(timeout);
    }

    // Sinon on écrit
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, lines, speed, pause]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // SÉCURITÉ 3 : Si pas de données, on n'affiche rien
  if (!lines || lines.length === 0) return null;

  // Calcul du texte à afficher
  const text = index >= lines.length 
    ? lines.join(' - ') 
    : lines.slice(0, index).join(' - ') + (index > 0 ? ' - ' : '') + (lines[index] ? lines[index].slice(0, subIndex) : '');

  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
        {text}
      </span>
      <span className={`ml-1 ${blink ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </h1>
  );
}

// ---------- Composant Section (C'était le morceau manquant !) ----------
function Section({ id, children }) {
  return (
    <section id={id} className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
}

// ---------- Main component ----------
export default function Portfolio() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 antialiased">
      {/* Navigation */}
      <nav className="fixed w-full z-40 top-2 sm:top-4 left-0 px-2 sm:px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-2 backdrop-blur-md bg-black/30 rounded-xl px-2 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-gradient-to-r from-indigo-700 to-pink-600 flex items-center justify-center font-bold text-white text-xs sm:text-base">MR</div>
            <button onClick={() => scrollTo('hero')} className="hidden sm:block text-sm font-bold hover:text-indigo-300 transition-colors cursor-pointer">{CV.name}</button>
          </div>
          <div className="flex gap-1 sm:gap-2 md:gap-4 flex-wrap justify-end">
            <button onClick={() => scrollTo('Le BTS')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2">Le BTS</button>
            <button onClick={() => scrollTo('Experience')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2 hidden sm:inline">Experience</button>
            <button onClick={() => scrollTo('projects')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2">Projets</button>
            <button onClick={() => scrollTo('tableau')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2 hidden md:inline">Tableau</button>
            <button onClick={() => scrollTo('veille')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2 hidden lg:inline">Veille</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="hero" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 justify-center">
        <div className="w-full max-w-5xl">
          <div className="text-sm sm:text-base text-indigo-300/80 mb-2">Bonjour, je suis</div>
          
          {/* Ton Animation de Nom et Titre */}
          <TypingTitle lines={[CV.name, CV.title]} />

          {/* --- NOUVEAU BOUTON CV --- */}
          <div className="mt-6 mb-8">
            <a 
              href="/CV_Maminiaina.pdf" // <--- Vérifie que le nom du fichier est exact !
              download="CV_Maminiaina_Rafetraharivony.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300"
            >
              <FiDownload className="text-xl" />
              Télécharger mon CV
            </a>
          </div>
          {/* ------------------------- */}

          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
            {CV.objective}
          </p>
        </div>
      </header>

      {/* ---------- Formation BTS SIO section ---------- */}
      <Section id="Le BTS">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Grille pour séparer les deux définitions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Carte 1: BTS SIO Général */}
            <motion.div 
              className="bg-slate-800/40 p-6 rounded-xl border border-white/10 h-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-indigo-300">Qu'est-ce que le BTS SIO ?</h2>
              <p className="text-gray-300">
                Le BTS SIO (Service Informatique aux Organisations) est un programme de niveau Bac+2, qui forme des informaticiens aussi bien doués pour le développement que pour l'administration et la maintenance d'un réseau informatique.
              </p>
            </motion.div>

            {/* Carte 2: Option SISR */}
            <motion.div 
              className="bg-slate-800/40 p-6 rounded-xl border border-white/10 h-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-pink-300">Qu'est-ce que le BTS SIO SISR ?</h2>
              <p className="text-gray-300 mb-4">
                Le BTS SIO SISR (Solution d’Infrastructure Système et Réseau) a pour but de former des techniciens réseau polyvalents.
              </p>
              <p className="text-gray-300 mb-3">Parmi les métiers qui leur sont accessibles nous pouvons citer :</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Technicien systèmes et réseaux</li>
                <li>Administrateur systèmes et réseaux</li>
                <li>Technicien support informatique</li>
                <li>Ingénieur réseau junior</li>
              </ul>
            </motion.div>

          </div>
        </motion.div>
      </Section>

      {/* ---------- Expérience section ---------- */}
      <Section id="Experience">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Expérience professionnelle</h2>
          
          <div className="bg-slate-800/40 p-4 sm:p-6 rounded-xl border border-white/10">
            {/* En-tête de l'expérience */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-indigo-300">Technicien support système (stage)</h3>
              <p className="text-sm sm:text-base text-gray-400">METRO France, Nanterre</p>
            </div>

            {/* Liste des tâches */}
            <div className="mt-3 sm:mt-4">
              <p className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Tâches principales :</p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>Support Niveau 1</li>
                <li>Active Directory (RAT)</li>
                <li>Gestion de tickets (JIRA)</li>
                <li>Migration des laptops de Windows 10 vers Windows 11 (SCCM)</li>
                <li>Masterisation de pc (SCCM)</li>
                <li>Déploiement de software (SCCM)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Projects section */}
      <Section id="projects">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Documentations techniques</h2>
          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">Téléchargez mes différentes documentations techniques réalisées dans le cadre de ma formation.</p>
          <div className="bg-slate-800/40 p-4 sm:p-6 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              
              <a href="/Documentation 2FA.pdf" download className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded bg-slate-700/50 hover:bg-slate-700/80 transition text-xs sm:text-sm border border-white/5">
                <FiDownload /> Documentation 2FA
              </a>

              <a href="/documentation ssh Maminiaina RAFETRAHARIVONY.pdf" download className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded bg-slate-700/50 hover:bg-slate-700/80 transition text-xs sm:text-sm border border-white/5">
                <FiDownload /> Documentation SSH
              </a>

              <a href="/DOCUMENTATION Load balancer.pdf" download className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded bg-slate-700/50 hover:bg-slate-700/80 transition text-xs sm:text-sm border border-white/5">
                <FiDownload /> Documentation Load Balancer
              </a>

              <a href="/DOCUMENTATION Zabbix RAFETRAHARIVONY Maminiaina.pdf" download className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded bg-slate-700/50 hover:bg-slate-700/80 transition text-xs sm:text-sm border border-white/5">
                <FiDownload /> Documentation Zabbix
              </a>

              <a href="/DOCUMENTATION installation archlinux maminiaina RAFETRAHARIVONY.pdf" download className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded bg-slate-700/50 hover:bg-slate-700/80 transition text-xs sm:text-sm border border-white/5">
                <FiDownload /> Installation Arch Linux
              </a>

              <a href="/Documentation GLPI.pdf" download className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded bg-slate-700/50 hover:bg-slate-700/80 transition text-xs sm:text-sm border border-white/5">
                <FiDownload /> Documentation GLPI
              </a>

              
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Tableau de synthèse section */}
      <Section id="tableau">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Tableau de synthèse E4</h2>
          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">Voici le tableau de synthèse des réalisations professionnelles du BTS SIO option SISR. Il présente les compétences mobilisées dans chaque activité.</p>
          <div className="bg-slate-800/40 p-4 sm:p-6 rounded-xl border border-white/10">
            <a href="/Tableau de synthese E4.pdf" download className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded bg-pink-600/60 hover:bg-pink-600/80 transition text-xs sm:text-sm">
              <FiDownload /> Télécharger le tableau de synthèse (PDF)
            </a>
          </div>
        </motion.div>
      </Section>
      
      {/* ---------- Veille Technologique section ---------- */}
      <Section id="veille">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          
          {/* Titre de la veille */}
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Veille technologique : Lunettes IA d'Iron Man</h2>
          
          {/* Conteneur pour le contenu de la veille */}
          <div className="bg-slate-800/40 p-4 sm:p-6 rounded-xl border border-white/10 space-y-4 sm:space-y-6">
            
            <p className="text-sm sm:text-base text-gray-300">
              Plusieurs avancées technologiques se rapprochent du concept de lunettes intelligentes comme dans la fiction :
            </p>

            {/* Listes des avancées et freins */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Avancées */}
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-indigo-300">Avancées technologiques</h3>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <li><span className="font-semibold">AR :</span> Meta, Apple Vision Pro</li>
                  <li><span className="font-semibold">IA embarquée :</span> Snapdragon XR2 Gen 2</li>
                  <li><span className="font-semibold">Connectivité :</span> 5G / Wi-Fi 6</li>
                  <li><span className="font-semibold">Contrôle :</span> Oculaire / Gestuel</li>
                </ul>
              </div>

              {/* Freins */}
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-pink-300">Freins techniques</h3>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <li>Miniaturisation complexe</li>
                  <li>Autonomie limitée</li>
                  <li>Problèmes de vie privée</li>
                  <li>Coûts de fabrication élevés</li>
                  <li>Acceptation sociale réduite</li>
                </ul>
              </div>
            </div>

            {/* Sources */}
            <div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Sources :</h4>
              <p className="text-xs sm:text-sm text-gray-400">
                <li><a href="https://www.youtube.com/watch?v=WW-P3limYc0" className="hover:text-indigo-300 break-all">Youtube.com</a></li>
                <li><a href="https://www.youtube.com/watch?v=YHap1eSs7cg&pp=ygUKbHVuZXR0ZSBJQQ%3D%3D" className="hover:text-indigo-300 break-all">Frandroid</a></li>
                <li><a href="https://www.realite-virtuelle.com/surface-keyboard-le-meta-quest-3-devient-soudain-beaucoup-plus-tentant/" className="hover:text-indigo-300 break-all">Realite-virtuelle.com</a></li>
              </p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Contact</h2>
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center gap-2 text-sm sm:text-base break-all"><FiMail /> {CV.email}</div>
            <div className="flex items-center gap-2 text-sm sm:text-base"><FiPhone /> {CV.phone}</div>
            <div className="flex items-center gap-2 text-sm sm:text-base"><FiMapPin /> {CV.location}</div>
          </div>
        </motion.div>
      </Section>

      <footer className="py-6 sm:py-8 text-center text-xs sm:text-sm text-gray-400 px-4">© {new Date().getFullYear()} {CV.name} — Portfolio interactif</footer>
    </div>
  );
}