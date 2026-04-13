// Portfolio_MaminiainaRafetraharivony.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiDownload, FiLinkedin, FiBriefcase, FiBookOpen, FiZoomIn, FiX, FiCheckCircle, FiMenu } from 'react-icons/fi';

// ---------- Données principales ----------
const CV = {
  name: 'Maminiaina Rafetraharivony',
  title: 'Technicien support informatique',
  email: 'landry012345@gmail.com',
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
  },
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
  const [zoomedImage, setZoomedImage] = useState(null); // Gère l'image à afficher (null = fermé) 
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
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setZoomedImage(null)}
          >
        <button className="absolute top-6 right-6 text-white text-3xl hover:text-pink-400"><FiX /></button>
        <img src={zoomedImage} alt="Aperçu agrandi" className="max-w-full max-h-[90vh] object-contain rounded-lg border border-white/20 shadow-2xl" />
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
              href="RAFETRAHARIVONY-Maminiaina-Landry.pdf" download="RAFETRAHARIVONY-Maminiaina-Landry.pdf" 
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
          
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed text-justify">
            {CV.objective}
          </p>
        </div>
      </header>

      {/* ---------- Parcours Scolaire section ---------- */}
      <Section id="parcours">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            🎓 Parcours Scolaire
          </h2>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:to-pink-500">
            
            {/* 1. Baccalauréat */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 bg-pink-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <FiCheckCircle className="text-sm" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/40 p-6 rounded-xl border border-white/10 hover:border-pink-500/50 transition-colors">
                <h3 className="font-bold text-lg text-pink-300">Baccalauréat Général</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Spécialité : Numérique et Sciences Informatiques (NSI) - Mathematiques.
                </p>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <FiMapPin /> Antony, France
                </p>
              </div>
            </div>

            {/* 2. BTS SIO SISR */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 bg-indigo-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <FiBookOpen className="text-sm" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/40 p-6 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-bold text-lg text-indigo-300">BTS SIO - Option SISR</h3>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Service Informatique aux Organisations, orienté <strong className="text-white">Solutions d'Infrastructure, Systèmes et Réseaux</strong>.
                </p>
                <div className="text-xs text-gray-400 space-y-2 bg-black/20 p-3 rounded-lg">
                  <p><strong className="text-pink-300">Objectif :</strong> Former des informaticiens capables d'administrer, sécuriser et maintenir des réseaux informatiques.</p>
                  <p><strong className="text-pink-300">Métiers visés :</strong> Technicien support, Administrateur systèmes et réseaux, Ingénieur réseau junior.</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </Section>  

      {/* ---------- Expérience section ---------- */}
      <Section id="Experience">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3"><FiBriefcase className="text-indigo-400" /> Expérience professionnelle</h2>
          
          <div className="space-y-6"> 
            
            {/* --- EXPÉRIENCE 1 (ANATOM'S) --- */}
            <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-pink-500"></div>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-white">Technicien support (stage)</h3>
                  <p className="text-indigo-300 font-semibold mt-1">ANATOM'S — Châtillon</p>
                </div>
                <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">2026</span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-300 bg-black/20 p-4 rounded-lg border border-white/5 italic">
                  <span className="font-semibold text-white not-italic">Contexte : </span> 
                  ANATOM'S est une association qui distribue de la nourriture aux personnes dans le besoin. En tant que technicien support, j'ai assuré la maintenance du parc informatique, la gestion des incidents contribuant ainsi à l'efficacité opérationnelle de l'association.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-3 text-white">Projets et missions réalisés :</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex flex-col gap-1 text-sm text-gray-300">
                    <div className="flex items-start gap-2">
                      <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                      <span><strong>Support N1 :</strong> Résolution d'incidents utilisateurs</span>
                    </div>
                  </li>
                  <li className="flex flex-col gap-1 text-sm text-gray-300">
                    <div className="flex items-start gap-2">
                      <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                      <span><strong>Masterisation :</strong> Préparation et déploiement logiciel de nouveaux postes.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* --- EXPÉRIENCE 2 (METRO France) --- */}
            <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-indigo-500"></div>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-white">Technicien support système (Stage)</h3>
                  <p className="text-indigo-300 font-semibold mt-1">METRO France — Nanterre</p>
                </div>
                <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">2025</span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-300 bg-black/20 p-4 rounded-lg border border-white/5 italic">
                  <span className="font-semibold text-white not-italic">Contexte : </span> 
                  METRO est le premier fournisseur de la restauration indépendante en France. Intégré à la DSI, j'ai participé au maintien en condition opérationnelle du parc informatique des collaborateurs du siège et des entrepôts, en assurant la transition technologique vers de nouveaux standards.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-3 text-white">Projets et missions réalisés :</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mission 1 */}
                <li className="flex flex-col gap-2 text-sm text-gray-300 mb-2">
                  <div className="flex items-start gap-2">
                    <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                    <div className="flex flex-col gap-1">
                      <span><strong>Migration d'OS :</strong> Déploiement et migration des postes de Windows 10 vers Windows 11 via SCCM.</span>
                      <span className="text-xs text-indigo-200/70 italic">Contexte : Homogénéisation du parc informatique et anticipation de la fin de support de Windows 10 pour répondre aux nouvelles exigences de sécurité.</span>
                    </div>
                  </div>
                  <a href="Documentation_Migration_OS.pdf" download className="ml-6 inline-flex items-center gap-1.5 text-xs bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-200 px-2.5 py-1.5 rounded-md transition-colors border border-indigo-500/30 w-fit">
                    <FiDownload /> Doc. Migration OS
                  </a>
                </li>
                
                {/* Mission 2 */}
                <li className="flex flex-col gap-2 text-sm text-gray-300 mb-2">
                  <div className="flex items-start gap-2">
                    <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                    <div className="flex flex-col gap-1">
                      <span><strong>Support N1 :</strong> Résolution d'incidents utilisateurs via la gestion de tickets (JIRA).</span>
                      <span className="text-xs text-indigo-200/70 italic">Contexte : Assurer une continuité d'activité fluide et rapide pour des centaines de collaborateurs répartis entre le siège et les différents entrepôts.</span>
                    </div>
                  </div>
                  <a href="Exemple ticket JIRA.png" download className="ml-6 inline-flex items-center gap-1.5 text-xs bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-200 px-2.5 py-1.5 rounded-md transition-colors border border-indigo-500/30 w-fit">
                    <FiDownload /> Ex. Ticket JIRA
                  </a>
                </li>
                
                {/* Mission 3 */}
                <li className="flex flex-col gap-2 text-sm text-gray-300 mb-2">
                  <div className="flex items-start gap-2">
                    <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                    <div className="flex flex-col gap-1">
                      <span><strong>Gestion des identités :</strong> Administration courante sur Active Directory (RAT).</span>
                      <span className="text-xs text-indigo-200/70 italic">Contexte : Gérer le flux des entrées et sorties (onboarding/offboarding) en attribuant les bons droits d'accès tout en respectant la politique de sécurité.</span>
                    </div>
                  </div>
                </li>

                {/* Mission 4 */}
                <li className="flex flex-col gap-2 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                    <div className="flex flex-col gap-1">
                      <span><strong>Masterisation :</strong> Préparation et déploiement logiciel automatisé de nouveaux postes (SCCM).</span>
                      <span className="text-xs text-indigo-200/70 italic">Contexte : Industrialiser la préparation matérielle pour fournir des équipements prêts à l'emploi (Plug & Play) et réduire le temps d'intervention manuel.</span>
                    </div>
                  </div>
                </li>
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </Section>

      {/* ---------- Projets section ---------- */}
      <Section id="projects">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3"><FiBookOpen className="text-pink-400" /> Documentations techniques</h2>
          <p className="text-gray-400 mb-8">Chronologie et détails de mes réalisations techniques.</p>

          <h3 className="text-xl font-bold text-pink-300 mb-4 border-b border-pink-900 pb-2">Projets de formation (Labo)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schoolProjects.map((proj, idx) => (
              <div key={idx} className="bg-slate-800/30 p-5 rounded-xl border border-white/5 hover:border-pink-500/30 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl bg-black/30 p-2 rounded-lg">{proj.icon}</span>
                      <h4 className="font-bold text-lg text-white">{proj.title}</h4>
                    </div>
                    <span className="text-xs font-mono text-gray-400">{proj.date}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-3"><span className="text-indigo-300 font-semibold">Contexte :</span> {proj.context}</p>
                  <p className="text-sm text-gray-300 mt-1"><span className="text-pink-300 font-semibold">Intérêt :</span> {proj.interest}</p>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {proj.files ? (
                    proj.files.map((f, i) => (
                      <a key={i} href={f.link} download className="inline-flex items-center gap-2 text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md transition-colors">
                        <FiDownload /> {f.name}
                      </a>
                    ))
                  ) : (
                    <a href={proj.file} download className="inline-flex items-center gap-2 text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md transition-colors">
                      <FiDownload /> Documentation
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ---------- Tableau de synthèse E4 ---------- */}
      <Section id="tableau">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Tableau de synthèse E4</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-white/10">
            <div>
              <p className="text-gray-300 mb-4 text-justify">
                Le tableau de synthèse regroupe l'ensemble des compétences acquises et mobilisées durant ma formation et mes expériences en entreprise. Il démontre ma capacité à gérer des infrastructures complexes de bout en bout.
              </p>
              
              <h3 className="font-bold text-indigo-300 mb-3">Compétences clés développées :</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-300"><FiCheckCircle className="text-green-400" /> Gérer le patrimoine informatique (Déploiement, Inventaire)</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><FiCheckCircle className="text-green-400" /> Répondre aux incidents et aux demandes d'assistance</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><FiCheckCircle className="text-green-400" /> Développer la présence en ligne de l'organisation</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><FiCheckCircle className="text-green-400" /> Travailler en mode projet (Planification, Documentation)</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><FiCheckCircle className="text-green-400" /> Sécuriser les équipements et les usages</li>
              </ul>

              <a href="Tableau de synthese E4.pdf" download className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-indigo-950 font-bold shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300">
                <FiDownload /> Télécharger le PDF officiel
              </a>
            </div>

            <div className="relative group cursor-pointer" onClick={() => setIsZoomed(true)}>
              <div className="absolute inset-0 bg-indigo-500/20 group-hover:bg-transparent transition-colors rounded-xl z-10 flex items-center justify-center">
                <div className="bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                  <FiZoomIn /> Agrandir l'aperçu
                </div>
              </div>
              <div className="w-full aspect-[4/3] bg-slate-700 rounded-xl border-2 border-dashed border-slate-500 flex flex-col items-center justify-center overflow-hidden relative">
                <img src="./apercu_e4.jpg" alt="Aperçu indisponible" className="object-cover opacity-30 w-full h-full" onError={(e) => e.target.style.display='none'} />
                <div className="absolute flex flex-col items-center text-slate-400">
                  <FiBookOpen className="text-4xl mb-2" />
                  <span className="text-sm font-semibold">Cliquer pour voir l'aperçu</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
      
      {/* ---------- Veille Technologique ---------- */}
      <Section id="veille">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Veille Technologique</h2>
          <p className="text-gray-400 mb-8">L'innovation au service des systèmes d'information et de l'utilisateur.</p>
          
          <div className="space-y-8">
            {/* Démarche et outils */}
            <div className="bg-gradient-to-r from-slate-800/80 to-indigo-900/20 p-6 sm:p-8 rounded-2xl border border-indigo-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Ma démarche et mes outils</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-sm text-gray-300 text-justify">
                  L'informatique étant un secteur en constante évolution, une veille active est indispensable. Je dois m'informer sur les nouvelles failles de sécurité, les évolutions matérielles et les innovations IA. <br/><br/>
                  <strong>Impact pro :</strong> Cela me permet d'anticiper l'obsolescence, de proposer des outils plus performants et de comprendre l'acceptabilité des nouvelles technologies par les utilisateurs.
                </p>
                <div className="bg-black/30 p-4 rounded-xl border border-white/5 h-fit">
                  <p className="font-semibold text-indigo-300 mb-2 text-sm">Sources d'informations quotidiennes :</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Réseaux sociaux professionnels (LinkedIn, X)</li>
                    <li>• Médias spécialisés (Numerama, Frandroid, The Verge)</li>
                    <li>• Chaînes techniques YouTube (Léo Duff, Marques Brownlee)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sujet d'étude principal */}
            <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-pink-300 mb-4">Sujet d'étude : Smart Glasses, de l'échec de Google au triomphe de Meta</h3>
                  <p className="text-sm sm:text-base text-gray-300 text-justify mb-6">
                    Pourquoi les Google Glass, lancées avec grand bruit il y a 10 ans, ont-elles été un fiasco commercial, là où les lunettes Meta Ray-Ban rencontrent aujourd'hui un succès retentissant ? Cette étude analyse la transition d'un gadget "techno-centré" à un véritable accessoire de mode propulsé par l'IA.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* Google Glass */}
                    <div>
                      <h4 className="font-semibold text-indigo-300 mb-2 border-b border-white/10 pb-1 flex items-center gap-2">
                        <span>2013 : Le fiasco Google Glass</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                        <li><span className="font-semibold text-white">Prix exorbitant :</span> Lancées à <strong>1 500 $</strong> (Édition Explorer), inaccessibles au grand public.</li>
                        <li><span className="font-semibold text-white">Acceptation sociale :</span> Design cyborg stigmatisant. Apparition du terme péjoratif <em>"Glasshole"</em>.</li>
                        <li><span className="font-semibold text-white">Vie privée :</span> Caméra très discrète créant la paranoïa (bannies des cinémas et bars).</li>
                        <li><span className="font-semibold text-white">Technologie :</span> Écran HUD intrusif dans le champ de vision, provoquant des maux de tête.</li>
                      </ul>
                    </div>
                    {/* Meta Ray-Ban */}
                    <div>
                      <h4 className="font-semibold text-pink-300 mb-2 border-b border-white/10 pb-1 flex items-center gap-2">
                        <span>2023 : La recette Meta Ray-Ban</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                        <li><span className="font-semibold text-white">Accessibilité :</span> Prix de lancement attractif à <strong>329 €</strong>.</li>
                        <li><span className="font-semibold text-white">Design invisible :</span> Partenariat avec le géant <strong>Luxottica</strong>. Elles ressemblent à de vraies Ray-Ban (Wayfarer).</li>
                        <li><span className="font-semibold text-white">Privacy-by-design :</span> LED frontale ultra-lumineuse et impossible à masquer lors de l'enregistrement.</li>
                        <li><span className="font-semibold text-white">Succès & IA :</span> Plus d'<strong>1 million de ventes</strong> en quelques mois. Succès poussé par l'IA vocale (Llama 3) au lieu de la réalité augmentée visuelle.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-black/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-white">Sources étudiées :</h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      <li>🔗 <a href="https://www.numerama.com/tech/1317540-pourquoi-les-google-glass-ont-echoue.html" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Pourquoi les Google Glass ont échoué : l'histoire d'un produit trop en avance (Numerama)</a></li>
                      <li>🔗 <a href="https://www.youtube.com/watch?v=WW-P3limYc0" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Test des Meta Ray-Ban AI : La révolution invisible (Léo Duff - YouTube)</a></li>
                      <li>🔗 <a href="https://fr.statista.com/infographie/31802/ventes-lunettes-connectees-smart-glasses-meta-ray-ban/" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Le marché des lunettes connectées explose grâce à Meta (Statista, 2024)</a></li>
                      <li>🔗 <a href="https://www.frandroid.com/produits-meta/1966200_meta-ray-ban-test-avis" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Test des lunettes Meta x Ray-Ban : L'IA au bout du nez (Frandroid)</a></li>
                    </ul>
                  </div>
                </div>

                <div className="lg:w-1/3 flex items-center justify-center">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center border border-white/5">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-5xl opacity-30 line-through">👓</div>
                        <div className="text-2xl text-pink-500 opacity-80">➔</div>
                        <div className="text-5xl drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">🕶️</div>
                      </div>
                      <div className="text-indigo-200 font-bold tracking-wider uppercase text-sm">Design vs Tech</div>
                      <div className="text-xs text-gray-400 mt-2 font-mono">2013 ➔ 2024</div>
                      <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mt-4 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </Section>

      {/* ---------- Contact ---------- */}
      <Section id="contact">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Contact & Réseaux</h2>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 inline-block min-w-[300px]">
            <div className="flex flex-col gap-4">
              <a href={`mailto:${CV.email}`} className="flex items-center gap-3 text-base text-gray-300 hover:text-white transition-colors"><FiMail className="text-indigo-400 text-xl" /> {CV.email}</a>
              <div className="flex items-center gap-3 text-base text-gray-300"><FiMapPin className="text-indigo-400 text-xl" /> {CV.location}</div>
              <div className="w-full h-px bg-white/10 my-2"></div>
              <a href={CV.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-base text-gray-300 hover:text-[#0a66c2] transition-colors"><FiLinkedin className="text-[#0a66c2] text-xl" /> Mon réseau professionnel LinkedIn</a>
            </div>
          </div>
        </motion.div>
      </Section>

      <footer className="py-8 text-center text-sm text-gray-500 border-t border-white/5 bg-black/20">
        © {new Date().getFullYear()} — Tous droits réservés.
      </footer>
    </div>
  );
}