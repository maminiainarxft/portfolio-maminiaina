// App.jsx
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
    file: "./Documentation GLPI.pdf"
  },
  {
    title: "Mise en place Load Balancer",
    date: "Février 2025",
    icon: "⚖️",
    context: "Projet d'infrastructure haute disponibilité en environnement virtuel.",
    interest: "Répartir la charge entre plusieurs serveurs web pour garantir la continuité de service en cas de panne.",
    file: "./DOCUMENTATION Load balancer.pdf"
  },
  {
    title: "Supervision Zabbix",
    date: "Novembre 2024",
    icon: "📈",
    context: "Déploiement d'une solution de monitoring pour le réseau de l'école.",
    interest: "Anticiper les pannes réseaux et matérielles grâce à des remontées d'alertes en temps réel.",
    file: "./DOCUMENTATION Zabbix RAFETRAHARIVONY Maminiaina.pdf"
  },
  {
    title: "Sécurisation 2FA & SSH",
    date: "Janvier 2025",
    icon: "🔐",
    context: "Durcissement des accès serveurs Linux dans le cadre des TP de sécurité.",
    interest: "Bloquer les attaques par force brute et garantir l'identité des administrateurs.",
    files: [
      { name: "Doc 2FA", link: "./Documentation 2FA.pdf" },
      { name: "Doc SSH", link: "./documentation ssh Maminiaina RAFETRAHARIVONY.pdf" }
    ]
  },
  {
    title: "Installation Arch Linux",
    date: "Décembre 2025",
    icon: "🐧",
    context: "Déploiement d'un système Linux 'from scratch' sans interface graphique par défaut.",
    interest: "Maîtriser l'architecture fondamentale d'un système UNIX et le partitionnement avancé.",
    file: "./DOCUMENTATION installation archlinux maminiaina RAFETRAHARIVONY.pdf"
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
      
      {/* Fenêtre modale (Zoom PDF & Images) */}
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
                <iframe 
                  src={`${encodeURI(zoomedImage)}#view=FitH`} 
                  title="Aperçu PDF" 
                  className="w-full h-full border-none bg-white rounded-2xl" 
                />
              ) : (
                <img 
                  src={encodeURI(zoomedImage)} 
                  alt="Aperçu agrandi" 
                  className="w-full h-full object-contain rounded-2xl" 
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Responsive */}
      <nav className="fixed w-full z-40 top-4 left-0 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto py-3 px-5 backdrop-blur-xl bg-[#131B2F]/80 rounded-2xl border border-white/10 shadow-2xl flex justify-between items-center transition-all">
          
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
              MR
            </div>
            <span className="hidden sm:block text-sm font-bold tracking-wide group-hover:text-pink-300 transition-colors">
              {CV.name}
            </span>
          </div>

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

          <button 
            className="md:hidden text-2xl text-gray-300 hover:text-white transition-colors focus:outline-none p-2"
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
                href="./RAFETRAHARIVONY-Maminiaina-Landry.pdf" download="RAFETRAHARIVONY-Maminiaina-Landry.pdf" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300"
              > 
                <FiDownload className="text-white text-xl" /> Télécharger mon CV
              </a>
              <a 
                href={CV.linkedin} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 bg-white/10 text-white font-bold hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
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
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-indigo-500/50 to-pink-500/50 -translate-x-1/2"></div>
            
            <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[#0B0F19] bg-indigo-500 text-white shadow-lg items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <FiBookOpen className="text-xl" />
              </div>
              <div className="w-full md:w-[45%] bg-[#131B2F] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 shadow-lg hover:shadow-indigo-500/5 transition-all md:text-right pl-10 md:pl-8 relative">
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
        </motion.div>
      </Section>

      {/* --- EXPÉRIENCES --- */}
      <Section id="Experience">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <FiBriefcase className="text-indigo-400 text-4xl" /> Expérience professionnelle
          </h2>
          
          <div className="space-y-8">
            
            {/* METRO France */}
            <div className="group bg-[#131B2F] p-6 sm:p-10 rounded-3xl border border-white/5 hover:border-indigo-500/20 transition-all hover:-translate-y-1 shadow-xl relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-pink-500 rounded-l-3xl"></div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <div>
                  <h3 className="font-bold text-2xl text-white">Technicien support système</h3>
                  <p className="text-indigo-400 font-medium text-lg mt-1">METRO France — Nanterre</p>
                </div>
                <span className="text-sm font-bold text-indigo-200 bg-indigo-500/20 border border-indigo-500/30 px-4 py-2 rounded-full mt-4 sm:mt-0 w-fit">Stage 2025</span>
              </div>

              <div className="mb-8 bg-[#0B0F19]/50 p-5 rounded-2xl border border-white/5 text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">Contexte :</strong> METRO est le premier fournisseur de la restauration indépendante en France. Intégré à la DSI, j'ai participé au maintien en condition opérationnelle du parc informatique des collaborateurs du siège et des entrepôts, en assurant la transition technologique vers de nouveaux standards.
              </div>

              <div>
                <p className="font-semibold text-white mb-5 text-lg">Missions & Réalisations :</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Mission : Migration OS */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <FiCheckCircle className="text-pink-400 text-xl shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block mb-1">Migration d'OS</span>
                        <p className="text-sm text-gray-400">Déploiement et migration des postes de Windows 10 vers Windows 11 pour répondre aux exigences de sécurité.</p>
                      </div>
                    </div>
                    <a href="./Documentation_Migration_OS.pdf" download className="ml-8 inline-flex items-center gap-2 text-sm font-bold bg-pink-600 hover:bg-pink-500 text-white px-4 py-2.5 rounded-lg transition-colors shadow-md w-fit">
                      <FiDownload className="text-white" /> Doc. Migration OS
                    </a>
                  </div>

                  {/* Mission : JIRA */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <FiCheckCircle className="text-pink-400 text-xl shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block mb-1">Support N1 & Tickets</span>
                        <p className="text-sm text-gray-400">Résolution d'incidents utilisateurs pour assurer une continuité d'activité fluide du siège et des entrepôts.</p>
                      </div>
                    </div>
                    <button onClick={() => setZoomedImage('./Exemple ticket JIRA.png')} className="ml-8 inline-flex items-center gap-2 text-sm font-bold bg-pink-600 hover:bg-pink-500 text-white px-4 py-2.5 rounded-lg transition-colors shadow-md w-fit">
                      <FiZoomIn className="text-white" /> Aperçu Ticket JIRA
                    </button>
                  </div>

                  {/* Mission : AZURE */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <FiCheckCircle className="text-pink-400 text-xl shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block mb-1">Gestion des identités</span>
                        <p className="text-sm text-gray-400">Administration courante Active Directory, onboarding/offboarding dans le respect de la politique de sécurité.</p>
                      </div>
                    </div>
                    <a href="./Gestion de privilège AZURE.pdf" download className="ml-8 inline-flex items-center gap-2 text-sm font-bold bg-pink-600 hover:bg-pink-500 text-white px-4 py-2.5 rounded-lg transition-colors shadow-md w-fit">
                      <FiDownload className="text-white" /> Doc. Privilèges AZURE
                    </a>
                  </div>

                  {/* Mission : Masterisation SCCM */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <FiCheckCircle className="text-pink-400 text-xl shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block mb-1">Masterisation</span>
                        <p className="text-sm text-gray-400">Industrialisation du déploiement logiciel de nouveaux postes pour fournir des équipements Plug & Play.</p>
                      </div>
                    </div>
                    <button onClick={() => setZoomedImage('./Deploiement de software.png')} className="ml-8 inline-flex items-center gap-2 text-sm font-bold bg-pink-600 hover:bg-pink-500 text-white px-4 py-2.5 rounded-lg transition-colors shadow-md w-fit">
                      <FiZoomIn className="text-white" /> Aperçu Déploiement Logiciel
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* ANATOM'S */}
            <div className="group bg-[#131B2F] p-6 sm:p-10 rounded-3xl border border-white/5 hover:border-pink-500/20 transition-all hover:-translate-y-1 shadow-xl relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-pink-500 to-indigo-500 rounded-l-3xl"></div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <div>
                  <h3 className="font-bold text-2xl text-white">Technicien support</h3>
                  <p className="text-pink-400 font-medium text-lg mt-1">ANATOM'S — Châtillon</p>
                </div>
                <span className="text-sm font-bold text-pink-200 bg-pink-500/20 border border-pink-500/30 px-4 py-2 rounded-full mt-4 sm:mt-0 w-fit">Stage 2026</span>
              </div>

              <div className="mb-6 bg-[#0B0F19]/50 p-5 rounded-2xl border border-white/5 text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">Contexte :</strong> Association de distribution de nourriture. Maintenance du parc informatique et gestion des incidents pour garantir l'efficacité opérationnelle des bénévoles.
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <FiCheckCircle className="text-indigo-400 text-xl shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-1">Support N1 & Maintenance</span>
                    <p className="text-sm text-gray-400">Résolution rapide des incidents rencontrés par les utilisateurs de l'association.</p>
                  </div>
                </div>
                <button onClick={() => setZoomedImage('./Ticket ANATOMS.jpg')} className="ml-8 inline-flex items-center gap-2 text-sm font-bold bg-pink-600 hover:bg-pink-500 text-white px-4 py-2.5 rounded-lg transition-colors shadow-md w-fit">
                  <FiZoomIn className="text-white" /> Aperçu Ticket ANATOM'S
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </Section>

      {/* --- PROJETS --- */}
      <Section id="projects">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-3 mb-3">
              <FiBookOpen className="text-pink-400 text-4xl" /> Documentations techniques
            </h2>
            <p className="text-gray-400 text-lg">Projets de formation (Laboratoire) et cas d'études.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {schoolProjects.map((proj, idx) => (
              <div key={idx} className="group bg-[#131B2F] p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-pink-500/30 hover:-translate-y-1 transition-all shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl bg-[#0B0F19] p-3 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
                        {proj.icon}
                      </div>
                      <h4 className="font-bold text-xl text-white">{proj.title}</h4>
                    </div>
                  </div>
                  
                  <div className="space-y-3 bg-[#0B0F19]/40 p-4 rounded-xl border border-white/5">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      <span className="text-indigo-300 font-bold block mb-1">Contexte</span> 
                      {proj.context}
                    </p>
                    <div className="w-full h-px bg-white/5"></div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      <span className="text-pink-300 font-bold block mb-1">Intérêt</span> 
                      {proj.interest}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  {proj.files ? (
                    proj.files.map((f, i) => (
                      <a key={i} href={f.link} download className="inline-flex items-center gap-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl transition-colors border border-white/10 shadow-md">
                        <FiDownload className="text-white" /> {f.name}
                      </a>
                    ))
                  ) : (
                    <a href={proj.file} download className="inline-flex items-center gap-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl transition-colors border border-white/10 shadow-md">
                      <FiDownload className="text-white" /> Documentation
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* --- TABLEAU E4 --- */}
      <Section id="tableau" className="bg-[#131B2F]/30">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="bg-gradient-to-br from-[#131B2F] to-[#0B0F19] p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-white">Tableau de synthèse E4</h2>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                  Le document officiel regroupant l'ensemble des compétences acquises et mobilisées durant ma formation et mes expériences en entreprise. Preuve de ma capacité à gérer des infrastructures de bout en bout.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Gérer le patrimoine informatique (Déploiement, Inventaire)",
                    "Répondre aux incidents et aux demandes d'assistance",
                    "Développer la présence en ligne de l'organisation",
                    "Travailler en mode projet (Planification, Documentation)",
                    "Sécuriser les équipements et les usages"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-gray-300 font-medium">
                      <span className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30 text-indigo-400">
                        <FiCheckCircle />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <a href="./Tableau de synthese E4.pdf" download className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-1 transition-all">
                    <FiDownload className="text-white text-xl" /> Télécharger E4
                  </a>
                  <button onClick={() => setZoomedImage('./apercu_e4.jpg')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold shadow-lg hover:-translate-y-1 transition-all">
                    <FiZoomIn className="text-white text-xl" /> Aperçu direct E4
                  </button>
                </div>
              </div>

              {/* Illustration visuelle */}
              <div className="hidden md:flex w-1/3 justify-center">
                <div className="relative w-full max-w-[250px] aspect-[3/4] bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col p-4">
                  <div className="w-full h-4 bg-indigo-500/40 rounded mb-4"></div>
                  <div className="w-3/4 h-3 bg-white/10 rounded mb-2"></div>
                  <div className="w-5/6 h-3 bg-white/10 rounded mb-8"></div>
                  <div className="flex-1 border-t border-dashed border-white/20 pt-4 flex flex-col gap-3">
                    <div className="w-full h-8 bg-pink-500/20 rounded"></div>
                    <div className="w-full h-8 bg-indigo-500/20 rounded"></div>
                    <div className="w-full h-8 bg-white/5 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
      
      {/* --- VEILLE TECHNOLOGIQUE --- */}
      <Section id="veille">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl font-bold mb-3 text-center md:text-left">Veille Technologique</h2>
          <p className="text-gray-400 mb-12 text-lg text-center md:text-left">L'innovation au service des systèmes d'information et de l'utilisateur.</p>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#131B2F] to-[#1a233a] p-8 sm:p-10 rounded-3xl border border-indigo-500/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Ma démarche et mes outils</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <p className="text-gray-300 text-lg leading-relaxed">
                  L'informatique étant en constante évolution, une veille active est indispensable. Je m'informe sur les nouvelles failles de sécurité, les évolutions matérielles et les innovations liées à l'IA.<br/><br/>
                  <strong className="text-indigo-300">Impact professionnel :</strong> Cela me permet d'anticiper l'obsolescence, de proposer des outils plus performants et de comprendre l'acceptabilité des technologies par les utilisateurs.
                </p>
                <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/5">
                  <p className="font-bold text-pink-300 mb-4 text-lg">Mes sources quotidiennes :</p>
                  <ul className="space-y-3 text-gray-300 font-medium">
                    <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Réseaux sociaux (LinkedIn, X)</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-pink-500"></span> Médias spécialisés (Numerama, Frandroid)</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Chaînes techniques (YouTube, Podcasts)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#131B2F] p-8 sm:p-10 rounded-3xl border border-white/5 shadow-xl">
              <div className="flex flex-col xl:flex-row gap-12">
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 mb-6">
                    Smart Glasses : De l'échec de Google au triomphe de Meta
                  </h3>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Pourquoi les Google Glass ont-elles été un fiasco commercial, là où les Meta Ray-Ban rencontrent un succès retentissant ? Analyse de la transition d'un gadget "techno-centré" à un véritable accessoire de mode dopé à l'IA.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[#0B0F19]/50 p-6 rounded-2xl border border-white/5">
                      <h4 className="font-bold text-xl text-indigo-300 mb-4 pb-2 border-b border-white/10 flex items-center gap-3">
                        <span className="text-2xl">📉</span> 2013 : Google Glass
                      </h4>
                      <ul className="space-y-3 text-gray-400 text-sm">
                        <li><strong className="text-gray-200">Prix :</strong> Exorbitant (1 500 $).</li>
                        <li><strong className="text-gray-200">Social :</strong> Design stigmatisant (terme "Glasshole").</li>
                        <li><strong className="text-gray-200">Privacy :</strong> Caméra trop discrète, rejet dans les lieux publics.</li>
                        <li><strong className="text-gray-200">Technologie :</strong> Écran HUD intrusif provoquant des maux de tête.</li>
                      </ul>
                    </div>

                    <div className="bg-[#0B0F19]/50 p-6 rounded-2xl border border-white/5">
                      <h4 className="font-bold text-xl text-pink-300 mb-4 pb-2 border-b border-white/10 flex items-center gap-3">
                        <span className="text-2xl">📈</span> 2023 : Meta Ray-Ban
                      </h4>
                      <ul className="space-y-3 text-gray-400 text-sm">
                        <li><strong className="text-gray-200">Prix :</strong> Accessible (Dès 329 €).</li>
                        <li><strong className="text-gray-200">Design :</strong> Invisible, vrai look Ray-Ban (Wayfarer).</li>
                        <li><strong className="text-gray-200">Privacy :</strong> LED d'enregistrement impossible à cacher.</li>
                        <li><strong className="text-gray-200">Succès :</strong> +1M de ventes. Poussé par l'audio et l'IA (Llama 3).</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-indigo-900/10 p-5 rounded-xl border border-indigo-500/20">
                    <h4 className="font-bold text-white mb-3">🔗 Sources étudiées</h4>
                    <ul className="space-y-2 text-sm text-indigo-200/80">
                      <li><a href="#" className="hover:text-pink-300 transition-colors">Numerama : Pourquoi les Google Glass ont échoué</a></li>
                      <li><a href="#" className="hover:text-pink-300 transition-colors">YouTube (Léo Duff) : Test des Meta Ray-Ban AI</a></li>
                      <li><a href="#" className="hover:text-pink-300 transition-colors">Statista : Ventes de lunettes connectées (2024)</a></li>
                    </ul>
                  </div>
                </div>

                <div className="xl:w-1/3 flex items-center justify-center">
                  <div className="w-full max-w-sm aspect-square rounded-[2rem] bg-gradient-to-br from-[#0B0F19] to-[#1a233a] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="text-6xl opacity-40 grayscale mb-2">👓</div>
                    <div className="text-3xl text-pink-500 mb-2 font-black">↓</div>
                    <div className="text-6xl drop-shadow-[0_0_25px_rgba(236,72,153,0.6)] group-hover:scale-110 transition-transform duration-500">🕶️</div>
                    <div className="mt-8">
                      <div className="text-white font-bold tracking-widest uppercase text-sm mb-1">Design &gt; Tech</div>
                      <div className="text-indigo-300 font-mono text-sm bg-indigo-500/10 py-1 px-3 rounded-full border border-indigo-500/20">Évolution 2013 → 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* --- CONTACT --- */}
      <Section id="contact" className="min-h-[60vh]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <h2 className="text-4xl font-black mb-10">Restons en contact</h2>
          
          <div className="inline-flex flex-col gap-6 bg-[#131B2F] p-8 sm:p-12 rounded-[2rem] border border-white/5 shadow-2xl">
            <a href={`mailto:${CV.email}`} className="flex items-center justify-center gap-4 text-lg font-medium text-gray-300 hover:text-white group transition-colors">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                <FiMail className="text-indigo-400 group-hover:text-white text-xl" />
              </div>
              {CV.email}
            </a>
            
            <div className="flex items-center justify-center gap-4 text-lg font-medium text-gray-300">
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center">
                <FiMapPin className="text-pink-400 text-xl" />
              </div>
              {CV.location}
            </div>
            
            <div className="w-full h-px bg-white/5 my-2"></div>
            
            <a href={CV.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 text-lg font-medium text-gray-300 hover:text-[#0a66c2] group transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#0a66c2]/10 flex items-center justify-center group-hover:bg-[#0a66c2] transition-colors">
                <FiLinkedin className="text-[#0a66c2] group-hover:text-white text-xl" />
              </div>
              LinkedIn Professionnel
            </a>
          </div>
        </motion.div>
      </Section>

      <footer className="py-8 text-center text-sm font-medium text-gray-500 bg-[#0B0F19] border-t border-white/5">
        © {new Date().getFullYear()} {CV.name} — Tous droits réservés.
      </footer>
    </div>
  );
}