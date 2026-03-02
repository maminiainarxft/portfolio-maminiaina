// Portfolio_MaminiainaRafetraharivony.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiDownload, FiLinkedin, FiBriefcase, FiBookOpen, FiZoomIn, FiX, FiCheckCircle } from 'react-icons/fi';

// ---------- Données principales ----------
const CV = {
  name: 'Maminiaina Rafetraharivony',
  title: 'Technicien support informatique',
  email: 'landry012345@gmail.com',
  phone: '0762687880',
  location: 'France',
  linkedin: 'https://www.linkedin.com/in/maminiaina-landry-rafetraharivony-70214833b/', // <-- À REMPLIR
  objective: "Passionné par les systèmes, réseaux et la cybersécurité. Je conçois, sécurise et administre des infrastructures informatiques modernes. Toujours en quête d'optimisation et d'automatisation.",
};

// ---------- Données des Projets (Segmentés et Chronologiques) ----------
const proProjects = [
  {
    title: "Gestion de parc sous GLPI",
    date: "Août 2023",
    icon: "🏢",
    context: "Optimisation de la gestion des tickets et de l'inventaire matériel dans le cadre de mon stage chez METRO.",
    interest: "Centraliser les demandes d'assistance, réduire le temps de résolution et automatiser l'inventaire via des agents.",
    file: "Documentation GLPI.pdf"
  }
];

const schoolProjects = [
  {
    title: "Mise en place Load Balancer",
    date: "Février 2024",
    icon: "⚖️",
    context: "Projet d'infrastructure haute disponibilité en environnement virtuel.",
    interest: "Répartir la charge entre plusieurs serveurs web pour garantir la continuité de service en cas de panne.",
    file: "DOCUMENTATION Load balancer.pdf"
  },
  {
    title: "Supervision Zabbix",
    date: "Novembre 2023",
    icon: "📈",
    context: "Déploiement d'une solution de monitoring pour le réseau de l'école.",
    interest: "Anticiper les pannes réseaux et matérielles grâce à des remontées d'alertes en temps réel.",
    file: "DOCUMENTATION Zabbix RAFETRAHARIVONY Maminiaina.pdf"
  },
  {
    title: "Sécurisation 2FA & SSH",
    date: "Septembre 2023",
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
    date: "Février 2023",
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
  const [isZoomed, setIsZoomed] = useState(false); // Pour le tableau E4

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            {/* L'image de ton tableau viendra ici */}
            <img src="apercu_e4.jpg" alt="Aperçu Tableau E4" className="max-w-full max-h-[90vh] object-contain rounded-lg border border-white/20 shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed w-full z-40 top-2 sm:top-4 left-0 px-2 sm:px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-2 backdrop-blur-md bg-black/30 rounded-xl px-2 sm:px-4 border border-white/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-gradient-to-r from-indigo-700 to-pink-600 flex items-center justify-center font-bold text-white text-xs sm:text-base">MR</div>
            <button onClick={() => scrollTo('hero')} className="hidden sm:block text-sm font-bold hover:text-indigo-300 transition-colors cursor-pointer">{CV.name}</button>
          </div>
          <div className="flex gap-1 sm:gap-2 md:gap-4 flex-wrap justify-end">
            <button onClick={() => scrollTo('Le BTS')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2">BTS</button>
            <button onClick={() => scrollTo('Experience')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2 hidden sm:inline">Expérience</button>
            <button onClick={() => scrollTo('projects')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2">Projets</button>
            <button onClick={() => scrollTo('tableau')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2 hidden md:inline">Tableau E4</button>
            <button onClick={() => scrollTo('veille')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2 hidden lg:inline">Veille</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-indigo-300 text-xs sm:text-sm px-1 sm:px-2">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="hero" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 justify-center relative overflow-hidden">
        {/* Effet visuel background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

        <div className="w-full max-w-5xl relative z-10">
          <div className="text-sm sm:text-base text-indigo-300/80 mb-2">Bonjour, je suis</div>
          <TypingTitle lines={[CV.name, CV.title]} />

          <div className="mt-6 mb-8 flex flex-wrap gap-4 items-center">
            <a 
              href="CV_Maminiaina_Rafetraharivony.pdf" download="CV_Maminiaina_Rafetraharivony.pdf" 
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

      {/* ---------- Expérience section (Remontée car très important) ---------- */}
      <Section id="Experience">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3"><FiBriefcase className="text-indigo-400" /> Expérience professionnelle</h2>
          
          <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
            {/* Ligne de timeline décorative */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-pink-500"></div>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="font-bold text-xl text-white">Technicien support système (Stage)</h3>
                <p className="text-indigo-300 font-semibold mt-1">METRO France — Nanterre</p>
              </div>
              <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">2023</span>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-300 bg-black/20 p-4 rounded-lg border border-white/5 italic">
                <span className="font-semibold text-white not-italic">Contexte : </span> 
                METRO est le premier fournisseur de la restauration indépendante en France. Intégré à la DSI, j'ai participé au maintien en condition opérationnelle du parc informatique des collaborateurs du siège et des entrepôts, en assurant la transition technologique vers de nouveaux standards.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-3 text-white">Projets et missions réalisés :</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex gap-2 items-start text-sm text-gray-300">
                  <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                  <span><strong>Migration d'OS :</strong> Déploiement et migration des postes de Windows 10 vers Windows 11 via SCCM.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-gray-300">
                  <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                  <span><strong>Support N1/N2 :</strong> Résolution d'incidents utilisateurs via la gestion de tickets (JIRA).</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-gray-300">
                  <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                  <span><strong>Gestion des identités :</strong> Administration courante sur Active Directory (RAT).</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-gray-300">
                  <FiCheckCircle className="text-pink-400 mt-1 shrink-0" />
                  <span><strong>Masterisation :</strong> Préparation et déploiement logiciel automatisé de nouveaux postes (SCCM).</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ---------- Projets section (Segmentée) ---------- */}
      <Section id="projects">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3"><FiBookOpen className="text-pink-400" /> Documentations techniques</h2>
          <p className="text-gray-400 mb-8">Chronologie et détails de mes réalisations techniques.</p>

          {/* Projets Entreprise */}
          <h3 className="text-xl font-bold text-indigo-300 mb-4 border-b border-indigo-900 pb-2">En milieu professionnel</h3>
          <div className="grid grid-cols-1 gap-4 mb-10">
            {proProjects.map((proj, idx) => (
              <div key={idx} className="bg-slate-800/30 p-5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl bg-black/30 p-2 rounded-lg">{proj.icon}</span>
                    <h4 className="font-bold text-lg text-white">{proj.title}</h4>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{proj.date}</span>
                </div>
                <p className="text-sm text-gray-300 mt-3"><span className="text-indigo-300 font-semibold">Contexte :</span> {proj.context}</p>
                <p className="text-sm text-gray-300 mt-1"><span className="text-pink-300 font-semibold">Intérêt :</span> {proj.interest}</p>
                <div className="mt-4">
                  <a href={proj.file} download className="inline-flex items-center gap-2 text-xs bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-200 px-3 py-1.5 rounded-md transition-colors border border-indigo-500/30">
                    <FiDownload /> Télécharger la doc
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Projets École */}
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
            {/* Côté texte et compétences */}
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

              <a href="Tableau de synthese E4.pdf" download className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-semibold transition-colors shadow-lg shadow-pink-500/20">
                <FiDownload /> Télécharger le PDF officiel
              </a>
            </div>

            {/* Côté Visuel / Zoom */}
            <div className="relative group cursor-pointer" onClick={() => setIsZoomed(true)}>
              <div className="absolute inset-0 bg-indigo-500/20 group-hover:bg-transparent transition-colors rounded-xl z-10 flex items-center justify-center">
                <div className="bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                  <FiZoomIn /> Agrandir l'aperçu
                </div>
              </div>
              {/* IMAGE A CHANGER PAR LA TIENNE PLUS TARD */}
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
      
      {/* ---------- Veille Technologique (Enrichie) ---------- */}
      <Section id="veille">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Veille Technologique</h2>
          <p className="text-gray-400 mb-8">L'innovation au service des systèmes d'information.</p>
          
          <div className="space-y-8">
            {/* Bloc 1 : Méthodologie */}
            <div className="bg-gradient-to-r from-slate-800/80 to-indigo-900/20 p-6 sm:p-8 rounded-2xl border border-indigo-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Ma démarche et mes outils</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-sm text-gray-300 text-justify">
                  L'informatique étant un secteur en constante évolution, une veille active est indispensable. Je consacre environ 2 heures par semaine à m'informer sur les nouvelles failles de sécurité, les évolutions matérielles et les innovations IA. <br/><br/>
                  <strong>Impact pro :</strong> Cela me permet d'anticiper l'obsolescence, de proposer des outils plus performants (comme l'intégration de scripts IA pour l'automatisation) et d'appliquer les derniers patchs de sécurité rapidement.
                </p>
                <div className="bg-black/30 p-4 rounded-xl border border-white/5 h-fit">
                  <p className="font-semibold text-indigo-300 mb-2 text-sm">Sources d'informations quotidiennes :</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Agrégateurs de flux RSS (Feedly)</li>
                    <li>• Réseaux sociaux professionnels (LinkedIn, X)</li>
                    <li>• Médias spécialisés (BleepingComputer, Frandroid, ZDNet)</li>
                    <li>• Chaînes techniques YouTube</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bloc 2 : Sujet principal */}
            <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-pink-300 mb-4">Sujet d'étude : Les lunettes IA, vers le mythe d'Iron Man ?</h3>
                  <p className="text-sm sm:text-base text-gray-300 text-justify mb-6">
                    L'intégration de l'Intelligence Artificielle générative directement dans des lunettes connectées (Smart Glasses) transforme la façon dont nous interagissons avec la technologie. Ce qui relevait de la science-fiction devient une réalité matérielle.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-indigo-300 mb-2 border-b border-white/10 pb-1">Avancées majeures</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                         <li><span className="font-semibold text-white">IA embarquée :</span> Meta Ray-Ban (Llama 3), intégration multimodale (voix + vision).</li>
                         <li><span className="font-semibold text-white">Puces dédiées :</span> Snapdragon AR1 Gen 1 pour un traitement local ultra-rapide.</li>
                         <li><span className="font-semibold text-white">Usages pro :</span> Assistance technique à distance en réalité augmentée.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-pink-300 mb-2 border-b border-white/10 pb-1">Défis et Freins</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                        <li>Miniaturisation et dissipation thermique.</li>
                        <li>Autonomie de la batterie souvent limitée (3-4h).</li>
                        <li><strong>Cybersécurité :</strong> Risques liés à la vie privée et à l'enregistrement vidéo discret.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Sources formatées proprement */}
                  <div className="bg-black/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-white">Sources étudiées :</h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      <li>🔗 <a href="https://www.youtube.com/watch?v=WW-P3limYc0" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Test des Meta Ray-Ban AI : La révolution invisible (Léo Duff - YouTube)</a></li>
                      <li>🔗 <a href="https://www.youtube.com/watch?v=YHap1eSs7cg&pp=ygUKbHVuZXR0ZSBJQQ%3D%3D" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">L'avenir des lunettes connectées : Bilan 2024 (Frandroid)</a></li>
                      <li>🔗 <a href="https://www.realite-virtuelle.com/surface-keyboard-le-meta-quest-3-devient-soudain-beaucoup-plus-tentant/" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Réalité mixte et productivité : l'écosystème Meta (Realite-virtuelle.com)</a></li>
                    </ul>
                  </div>
                </div>

                {/* Visuel illustratif */}
                <div className="lg:w-1/3 flex items-center justify-center">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 group">
                    {/* Placeholder d'image stylisé */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
                      <div className="text-6xl mb-4 opacity-50">👓</div>
                      <div className="text-indigo-300 font-bold tracking-widest uppercase text-sm">Smart Glasses & AI</div>
                      <div className="w-16 h-1 bg-pink-500 mt-4 rounded-full"></div>
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
              <div className="flex items-center gap-3 text-base text-gray-300"><FiPhone className="text-indigo-400 text-xl" /> {CV.phone}</div>
              <div className="flex items-center gap-3 text-base text-gray-300"><FiMapPin className="text-indigo-400 text-xl" /> {CV.location}</div>
              <div className="w-full h-px bg-white/10 my-2"></div>
              <a href={CV.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-base text-gray-300 hover:text-[#0a66c2] transition-colors"><FiLinkedin className="text-[#0a66c2] text-xl" /> Mon réseau professionnel LinkedIn</a>
            </div>
          </div>
        </motion.div>
      </Section>

      <footer className="py-8 text-center text-sm text-gray-500 border-t border-white/5 bg-black/20">
        © {new Date().getFullYear()} {CV.name} — Portfolio Maminiaina Rafetraharivony. Tous droits réservés.
    </div>
  );
}