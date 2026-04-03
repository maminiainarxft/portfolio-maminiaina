// Portfolio_MaminiainaRafetraharivony.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiDownload, FiLinkedin, FiBriefcase, FiBookOpen, FiZoomIn, FiX, FiCheckCircle, FiMenu } from 'react-icons/fi';

// ---------- Données principales ----------
const CV = {
  name: 'Maminiaina Rafetraharivony',
  title: 'Technicien support informatique',
  email: 'landry012345@gmail.com',
  phone: '0762687880',
  location: 'France',
  linkedin: 'https://www.linkedin.com/in/maminiaina-landry-rafetraharivony-70214833b/', 
  objective: "Passionné par les systèmes, réseaux et la cybersécurité. Je conçois, sécurise et administre des infrastructures informatiques modernes. Toujours en quête d'optimisation et d'automatisation.",
};

// ---------- Données des Projets (Tous regroupés ici) ----------
const schoolProjects = [
  {
    title: "Gestion de parc sous GLPI",
    date: "Mai 2025",
    icon: "🏢",
    context: "Optimisation de la gestion des tickets et de l'inventaire matériel.",
    interest: "Centraliser les demandes d'assistance, réduire le temps de résolution et automatiser l'inventaire via des agents.",
    file: "Documentation GLPI.pdf"
  }, // <-- La fameuse virgule manquante a été ajoutée ici !
  {
    title: "Mise en place Load Balancer",
    date: "Février 2025",
    icon: "⚖️",
    context: "Projet d'infrastructure haute disponibilité en environnement virtuel.",
    interest: "Répartir la charge entre plusieurs serveurs web pour garantir la continuité de service en cas de panne.",
    file: "DOCUMENTATION Load balancer.pdf"
  },
  {
    title: "Supervision Zabbix",
    date: "Novembre 2024",
    icon: "📈",
    context: "Déploiement d'une solution de monitoring pour le réseau de l'école.",
    interest: "Anticiper les pannes réseaux et matérielles grâce à des remontées d'alertes en temps réel.",
    file: "DOCUMENTATION Zabbix RAFETRAHARIVONY Maminiaina.pdf"
  },
  {
    title: "Sécurisation 2FA & SSH",
    date: "Janvier 2025",
    icon: "🔐",
    context: "Durcissement des accès serveurs Linux dans le cadre des TP de sécurité.",
    interest: "Bloquer les attaques par force brute et garantir l'identité des administrateurs.",
    files: [
      { name: "Doc 2FA", link: "Documentation 2FA.pdf" },
      { name: "Doc SSH", link: "documentation ssh Maminiaina RAFETRAHARIVONY.pdf" }
    ]
  },
  {
    title: "Installation Arch Linux",
    date: "Décembre 2025",
    icon: "🐧",
    context: "Déploiement d'un système Linux 'from scratch' sans interface graphique par défaut.",
    interest: "Maîtriser l'architecture fondamentale d'un système UNIX et le partitionnement avancé.",
    file: "DOCUMENTATION installation archlinux maminiaina RAFETRAHARIVONY.pdf"
  }
];

// ---------- Composant Animation Texte ----------
function TypingTitle({ lines = [], speed = 80, pause = 1000 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!lines || lines.length === 0) return;
    if (index >= lines.length) return;
    if (!lines[index]) return;

    if (subIndex === lines[index].length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
        setSubIndex(0);
      }, pause);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, lines, speed, pause]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  if (!lines || lines.length === 0) return null;

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

// ---------- Composant Section ----------
function Section({ id, children }) {
  return (
    <section id={id} className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-5xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
}

// ---------- Main component ----------
export default function Portfolio() {
  const [isZoomed, setIsZoomed] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 antialiased">
      
      {/* Fenêtre modale pour le zoom du tableau */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button className="absolute top-6 right-6 text-white text-3xl hover:text-pink-400"><FiX /></button>
            <img src="apercu_e4.jpg" alt="Aperçu Tableau E4" className="max-w-full max-h-[90vh] object-contain rounded-lg border border-white/20 shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- NOUVELLE BARRE DE NAVIGATION (RESPONSIVE) ---------- */}
      <nav className="fixed w-full z-40 top-2 sm:top-4 left-0 px-2 sm:px-6">
        <div className="max-w-6xl mx-auto py-2 backdrop-blur-md bg-black/40 rounded-xl px-4 sm:px-6 border border-white/10 relative shadow-lg">
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-gradient-to-r from-indigo-700 to-pink-600 flex items-center justify-center font-bold text-white text-xs sm:text-base">MR</div>
              <button onClick={() => scrollTo('hero')} className="hidden sm:block text-sm font-bold hover:text-indigo-300 transition-colors cursor-pointer">{CV.name}</button>
            </div>

            <div className="hidden md:flex gap-4 lg:gap-6">
              <button onClick={() => scrollTo('parcours')} className="hover:text-indigo-300 text-sm font-medium transition-colors">Parcours</button>
              <button onClick={() => scrollTo('Experience')} className="hover:text-indigo-300 text-sm font-medium transition-colors">Expérience</button>
              <button onClick={() => scrollTo('projects')} className="hover:text-indigo-300 text-sm font-medium transition-colors">Projets</button>
              <button onClick={() => scrollTo('tableau')} className="hover:text-indigo-300 text-sm font-medium transition-colors">Tableau E4</button>
              <button onClick={() => scrollTo('veille')} className="hover:text-indigo-300 text-sm font-medium transition-colors">Veille</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-indigo-300 text-sm font-medium transition-colors">Contact</button>
            </div>

            <button 
              className="md:hidden text-2xl text-white hover:text-indigo-300 transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex flex-col gap-4 shadow-2xl md:hidden"
              >
                <button onClick={() => scrollTo('parcours')} className="text-left text-white hover:text-indigo-300 font-medium">Parcours</button>
                <button onClick={() => scrollTo('Experience')} className="text-left text-white hover:text-indigo-300 font-medium">Expérience</button>
                <button onClick={() => scrollTo('projects')} className="text-left text-white hover:text-indigo-300 font-medium">Projets</button>
                <button onClick={() => scrollTo('tableau')} className="text-left text-white hover:text-indigo-300 font-medium">Tableau E4</button>
                <button onClick={() => scrollTo('veille')} className="text-left text-white hover:text-indigo-300 font-medium">Veille</button>
                <button onClick={() => scrollTo('contact')} className="text-left text-white hover:text-indigo-300 font-medium">Contact</button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </nav>
      {/* ---------------------------------------------------------------- */}

      {/* Hero */}
      <header id="hero" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 justify-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

        <div className="w-full max-w-5xl relative z-10">
          <div className="text-sm sm:text-base text-indigo-300/80 mb-2">Bonjour, je suis</div>
          <TypingTitle lines={[CV.name, CV.title]} />

          <div className="mt-6 mb-8 flex flex-wrap gap-4 items-center">
            <a 
              href="CV_MaminiainaRafetraharivonyv1.pdf" download="CV_MaminiainaRafetraharivony.pdf" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-indigo-950 font-bold shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
            > 
              <FiDownload className="text-xl" /> Télécharger mon CV
            </a>
            <a 
              href={CV.linkedin} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              <FiLinkedin className="text-xl" /> Profil LinkedIn
            </a>
          </div>