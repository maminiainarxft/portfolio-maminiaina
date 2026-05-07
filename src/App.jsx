// Portfolio_MaminiainaRafetraharivony.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiMapPin, FiDownload, FiLinkedin, 
  FiBriefcase, FiBookOpen, FiZoomIn, FiX, FiCheckCircle, FiMenu 
} from 'react-icons/fi';

// ---------- Données principales ----------
const CV = {
  name: 'Maminiaina Rafetraharivony',
  title: 'Technicien support informatique',
  email: 'landry012345@gmail.com',
  location: 'France',
  linkedin: 'https://www.linkedin.com/in/maminiaina-landry-rafetraharivony-70214833b/', 
  objective: "Passionné par les systèmes, réseaux et la cybersécurité. Je conçois, sécurise et administre des infrastructures informatiques modernes. Toujours en quête d'optimisation et d'automatisation.",
};

// ---------- Données des Projets ----------
const schoolProjects = [
  {
    title: "Gestion de parc sous GLPI",
    date: "Mai 2025",
    icon: "🏢",
    context: "Optimisation de la gestion des tickets et de l'inventaire matériel.",
    interest: "Centraliser les demandes d'assistance, réduire le temps de résolution et automatiser l'inventaire via des agents.",
    file: "/Documentation GLPI.pdf"
  },
  {
    title: "Mise en place Load Balancer",
    date: "Février 2025",
    icon: "⚖️",
    context: "Projet d'infrastructure haute disponibilité en environnement virtuel.",
    interest: "Répartir la charge entre plusieurs serveurs web pour garantir la continuité de service en cas de panne.",
    file: "/DOCUMENTATION Load balancer.pdf"
  },
  {
    title: "Supervision Zabbix",
    date: "Novembre 2024",
    icon: "📈",
    context: "Déploiement d'une solution de monitoring pour le réseau de l'école.",
    interest: "Anticiper les pannes réseaux et matérielles grâce à des remontées d'alertes en temps réel.",
    file: "/DOCUMENTATION Zabbix RAFETRAHARIVONY Maminiaina.pdf"
  },
  {
    title: "Sécurisation 2FA & SSH",
    date: "Janvier 2025",
    icon: "🔐",
    context: "Durcissement des accès serveurs Linux dans le cadre des TP de sécurité.",
    interest: "Bloquer les attaques par force brute et garantir l'identité des administrateurs.",
    files: [
      { name: "Doc 2FA", link: "/Documentation 2FA.pdf" },
      { name: "Doc SSH", link: "/documentation ssh Maminiaina RAFETRAHARIVONY.pdf" }
    ]
  },
  {
    title: "Installation Arch Linux",
    date: "Décembre 2025",
    icon: "🐧",
    context: "Déploiement d'un système Linux 'from scratch' sans interface graphique par défaut.",
    interest: "Maîtriser l'architecture fondamentale d'un système UNIX et le partitionnement avancé.",
    file: "/DOCUMENTATION installation archlinux maminiaina RAFETRAHARIVONY.pdf"
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
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
        {text}
      </span>
      <span className={`ml-1 text-pink-400 ${blink ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </h1>
  );
}

// ---------- Composant Section ----------
function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`min-h-screen py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center border-t border-white/5 relative ${className}`}>
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {children}
      </div>
    </section>
  );
}

// ---------- Composant Principal ----------
export default function Portfolio() {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'parcours', label: 'Parcours' },
    { id: 'Experience', label: 'Expérience' },
    { id: 'projects', label: 'Projets' },
    { id: 'tableau', label: 'Tableau E4' },
    { id: 'veille', label: 'Veille' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 antialiased selection:bg-pink-500/30">
      
      {/* Fenêtre modale (Zoom) */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
            onClick={() => setZoomedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white text-3xl hover:text-pink-400 transition-colors z-[60] p-2 bg-black/50 rounded-full">
              <FiX />
            </button>
        
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-6xl h-[85vh] bg-[#131B2F] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {zoomedImage.toLowerCase().endsWith('.pdf') ? (
                <iframe src={`${zoomedImage}#view=FitH`} title="Aperçu PDF" className="w-full h-full border-none" />
              ) : (
                <img src={zoomedImage} alt="Aperçu agrandi" className="max-w-full max-h-full object-contain p-2" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Responsive */}
      <nav className="fixed w-full z-40 top-4 left-0 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto py-3 px-5 backdrop-blur-xl bg-[#131B2F]/80 rounded-2xl border border-white/10 shadow-2xl flex justify-between items-center transition-all">
          
          {/* Logo / Nom */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
              MR
            </div>
            <span className="hidden sm:block text-sm font-bold tracking-wide group-hover:text-pink-300 transition-colors">
              {CV.name}
            </span>
          </div>

          {/* Liens Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)} 
                className="text-sm font-medium text-gray-300 hover:text-white hover:underline decoration-pink-500 decoration-2 underline-offset-8 transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Bouton Menu Mobile */}
          <button 
            className="md:hidden text-2xl text-gray-300 hover:text-white transition-colors focus:outline-none p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menu Mobile Déroulant */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 left-4 right-4 bg-[#131B2F] backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-2xl md:hidden z-30"
            >
              {navLinks.map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => scrollTo(link.id)} 
                  className="w-full text-left px-4 py-3 rounded-xl text-gray-200 hover:bg-white/5 hover:text-pink-300 font-medium transition-all"
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="hero" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Cercles de fond */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse duration-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

        <div className="max-w-5xl mx-auto w-full relative z-10 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-sm font-medium mb-6">
              👋 Bonjour, je suis
            </span>
            <TypingTitle lines={[CV.name, CV.title]} />

            <p className="mt-8 text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
              {CV.objective}
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a 
                href="/RAFETRAHARIVONY-Maminiaina-Landry.pdf" download="RAFETRAHARIVONY-Maminiaina-Landry.pdf" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300"
              > 
                <FiDownload className="text-xl" /> Télécharger mon CV
              </a>
              <a 
                href={CV.linkedin} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <FiLinkedin className="text-xl text-[#0a66c2]" /> Mon LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- PARCOURS SCOLAIRE --- */}
      <Section id="parcours">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <span className="text-4xl">🎓</span> Parcours Scolaire
          </h2>

          <div className="relative border-l-2 border-indigo-500/30 ml-4 md:ml-0 md:border-none space-y-12">
            {/* Ligne verticale Desktop */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-indigo-500/50 to-pink-500/50 -translate-x-1/2"></div>
            
            {/* BTS */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[#0B0F19] bg-indigo-500 text-white shadow-lg items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <FiBookOpen className="text-xl" />
              </div>
              <div className="w-full md:w-[45%] bg-[#131B2F] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 shadow-lg hover:shadow-indigo-500/5 transition-all md:text-right pl-10 md:pl-8 relative">
                {/* Point repère Mobile */}
                <div className="md:hidden absolute left-[-9px] top-8 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#0B0F19]"></div>
                
                <h3 className="font-bold text-xl text-indigo-300 mb-1">BTS SIO - Option SISR</h3>
                <p className="text-gray-400 text-sm mb-4">Solutions d'Infrastructure, Systèmes et Réseaux</p>
                <div className="bg-black/30 p-4 rounded-xl text-sm text-gray-300 text-left border border-white/5 inline-block w-full">
                  <p className="mb-2"><strong className="text-white">Objectif :</strong> Administrer, sécuriser et maintenir des réseaux informatiques.</p>
                  <p><strong className="text-white">Métiers :</strong> Technicien support, Administrateur systèmes/réseaux.</p>
                </div>
              </div>
              <div className="hidden md:block w-[45%]"></div>
            </div>

            {/* BAC */}
            <div className="relative flex flex-col md:flex-row-reverse items-center md:justify-between group">
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[#0B0F19] bg-pink-500 text-white shadow-lg items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <FiCheckCircle className="text-xl" />
              </div>
              <div className="w-full md:w-[45%] bg-[#131B2F] p-8 rounded-2xl border border-white/5 hover:border-pink-500/30 shadow-lg hover:shadow-pink-500/5 transition-all pl-10 md:pl-8 relative">
                <div className="md:hidden absolute left-[-9px] top-8 w-4 h-4 rounded-full bg-pink-500 border-4 border-[#0B0F19]"></div>
                
                <h3 className="font-bold text-xl text-pink-300 mb-1">Baccalauréat Général</h3>
                <p className="text-gray-400 text-sm mb-3">Spécialité : Numérique et Sciences Informatiques (NSI) - Mathématiques.</p>
                <p className="text-xs font-medium text-gray-500 flex items-center gap-2">
                  <FiMapPin className="text-pink-400" /> Antony, France
                </p>
              </div>
              <div className="hidden md:block w-[45%]"></div>
            </div>
          </div>