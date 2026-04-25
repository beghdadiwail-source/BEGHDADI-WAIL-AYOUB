/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, 
  ShieldCheck, 
  ShieldAlert, 
  Server, 
  Mail, 
  Globe, 
  Lock, 
  FileText, 
  Hash, 
  Link as LinkIcon,
  ChevronRight,
  Info,
  BookOpen,
  Cpu,
  Loader2
} from 'lucide-react';
import { fetchProtocolDetails } from './services/protocolService';

interface Protocol {
  id: number;
  name: string;
  fullName: string;
  description?: string;
  port?: string;
  usage?: string;
  secure: boolean;
  loading?: boolean;
}

const protocolsList: Protocol[] = [
  { id: 1, name: "HTTP", fullName: "Hypertext Transfer Protocol", secure: false },
  { id: 2, name: "HTTPS", fullName: "Hypertext Transfer Protocol Secure", secure: true },
  { id: 3, name: "FTP", fullName: "File Transfer Protocol", secure: false },
  { id: 4, name: "SMTP", fullName: "Simple Mail Transfer Protocol", secure: false },
  { id: 5, name: "POP3", fullName: "Post Office Protocol version 3", secure: false },
  { id: 6, name: "IMAP", fullName: "Internet Message Access Protocol", secure: false },
  { id: 7, name: "DNS", fullName: "Domain Name System", secure: false },
  { id: 8, name: "DHCP", fullName: "Dynamic Host Configuration Protocol", secure: false },
  { id: 9, name: "SNMP", fullName: "Simple Network Management Protocol", secure: false },
  { id: 10, name: "SIP", fullName: "Session Initiation Protocol", secure: false },
  { id: 11, name: "SSH", fullName: "Secure Shell", secure: true },
  { id: 12, name: "Telnet", fullName: "Telnet", secure: false },
  { id: 13, name: "SNMP", fullName: "Simple Network Management Protocol (Repeated)", secure: false },
  { id: 14, name: "NTP", fullName: "Network Time Protocol", secure: false },
  { id: 15, name: "LDAP", fullName: "Lightweight Directory Access Protocol", secure: false },
  { id: 16, name: "RTSP", fullName: "Real Time Streaming Protocol", secure: false },
  { id: 17, name: "SMB/CIFS", fullName: "Server Message Block / Common Internet File System", secure: false },
  { id: 18, name: "OAuth", fullName: "Open Authorization", secure: true },
];

export default function App() {
  const [protocols, setProtocols] = useState<Protocol[]>(protocolsList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const filteredProtocols = protocols.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProtocol = async (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    
    if (protocol.description) return;

    setIsFetching(true);
    const details = await fetchProtocolDetails(protocol.name, protocol.fullName);
    setIsFetching(false);

    if (details) {
      const updatedProtocols = protocols.map(p => 
        p.id === protocol.id ? { ...p, ...details, secure: details.isSecure } : p
      );
      setProtocols(updatedProtocols);
      setSelectedProtocol(prev => prev && prev.id === protocol.id ? { ...prev, ...details, secure: details.isSecure } : prev);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#334155] font-sans selection:bg-sky-50 transition-colors duration-500">
      {/* Student Ribbon */}
      <div className="bg-[#1E293B] text-white py-3 px-6 overflow-hidden relative">
        <motion.div 
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center justify-center gap-12 whitespace-nowrap text-xs font-bold tracking-[0.3em] uppercase opacity-80"
        >
          <span>Exposé de module réseau • BEGHDADI WAIL AYOUB • Groupe 01</span>
          <span>Exposé de module réseau • BEGHDADI WAIL AYOUB • Groupe 01</span>
          <span>Exposé de module réseau • BEGHDADI WAIL AYOUB • Groupe 01</span>
        </motion.div>
      </div>

      {/* Header / Hero */}
      <header className="relative bg-white/50 backdrop-blur-md border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-2xl text-right md:text-left w-full">
              <div className="flex items-center gap-2 text-sky-600 font-mono text-sm mb-4 tracking-wider uppercase">
                <Cpu size={16} />
                <span>Rapport Technique : Analyse de la Couche Réseau</span>
              </div>
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-slate-200">
                  Par : BEGHDADI WAIL AYOUB (Groupe 01)
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 text-slate-800">
                Rapport sur les <br />
                <span className="text-sky-600">Protocoles Réseau</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-8">
                 Une exploration détaillée des protocoles de la couche application du modèle OSI, avec des analyses techniques générées par l'IA.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md overflow-hidden rounded-2xl shadow-md border border-slate-200 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-50 transition-all">
                <input 
                  type="text" 
                  placeholder="Rechercher un protocole..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 pl-12 pr-6 bg-white outline-none font-medium text-slate-700 placeholder-slate-400"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Network size={20} />
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-64 h-64 border-[1px] border-sky-100 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite] opacity-20">
                  <div className="w-full h-full border-t-[2px] border-sky-600 rounded-full"></div>
                </div>
                <Network size={80} className="text-sky-600 opacity-80" />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-sky-500 pl-6 bg-white/40 backdrop-blur-sm py-6 rounded-r-2xl border border-slate-100/50 shadow-sm">
          <div>
            <h2 className="text-2xl font-black mb-1 text-slate-800">Index des Protocoles</h2>
            <p className="text-slate-500 font-medium tracking-tight">Sélectionnez un protocole pour consulter son rapport détaillé.</p>
          </div>
          <div className="flex -space-x-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs ${['bg-sky-500', 'bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-rose-500'][i-1]}`}>
                {i}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProtocols.map((protocol, index) => (
            <motion.button
              key={`${protocol.id}-${index}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelectProtocol(protocol)}
              className="group relative bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-2xl hover:border-sky-400 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between overflow-hidden"
              id={`protocol-card-${protocol.id}`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                    {getIconForProtocol(protocol.name)}
                  </div>
                  <div className="flex flex-col items-end">
                    {protocol.secure ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-tight border border-emerald-100">
                        <ShieldCheck size={12} />
                        Sécurisé
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold uppercase tracking-tight border border-rose-100">
                        <ShieldAlert size={12} />
                        Non chiffré
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-1 text-slate-800 group-hover:text-sky-600 transition-colors uppercase tracking-tight leading-none">
                  {protocol.name}
                </h3>
                <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest line-clamp-1">
                  {protocol.fullName}
                </p>
              </div>
              
              <div className="relative z-10 mt-8 flex items-center justify-between">
                <div className="flex items-center text-sm font-bold text-sky-600">
                  Analyse détaillée <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase tracking-tighter shadow-sm">
                   OSI L7
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-sky-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="absolute top-4 right-4 text-[80px] font-black text-gray-50/50 pointer-events-none select-none z-0 group-hover:text-sky-50 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.button>
          ))}
        </div>
      </main>

      {/* Modal / Detail View */}
      <AnimatePresence>
        {selectedProtocol && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-gray-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white rounded-[40px] w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="relative p-10 md:p-12 border-b border-gray-100 bg-white">
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                        {getIconForProtocol(selectedProtocol.name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded font-black tracking-widest uppercase">Protocole</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Fiche Technique #0{selectedProtocol.id}</span>
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none">{selectedProtocol.name}</h2>
                      </div>
                    </div>
                    <p className="text-lg text-gray-400 font-medium italic">{selectedProtocol.fullName}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProtocol(null)}
                    className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-full transition-all duration-300 rotate-0 hover:rotate-90"
                  >
                    <LinkIcon size={24} className="rotate-45" />
                  </button>
                </div>
                
                {/* Background Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
              </div>
              
              {/* Modal Content */}
              <div className="p-10 md:p-12 overflow-y-auto custom-scrollbar">
                {isFetching ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-sky-600" size={48} />
                    <p className="font-mono text-xs font-black uppercase tracking-widest text-sky-400 animate-pulse">Consultation de la base de connaissances IA...</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 px-6 py-5 rounded-3xl border border-gray-100">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-sky-300 block mb-2">Couche</span>
                        <span className="font-black text-gray-700">Application (L7)</span>
                      </div>
                      <div className="bg-gray-50 px-6 py-5 rounded-3xl border border-gray-100">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-sky-300 block mb-2">Port par défaut</span>
                        <span className="font-mono font-black text-sky-600">{selectedProtocol.port || "N/A"}</span>
                      </div>
                      <div className="bg-gray-50 px-6 py-5 rounded-3xl border border-gray-100">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-sky-300 block mb-2">Sécurité</span>
                        <span className={`font-black flex items-center gap-2 ${selectedProtocol.secure ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {selectedProtocol.secure ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
                          {selectedProtocol.secure ? 'SÉCURISÉ' : 'VULNÉRABLE'}
                        </span>
                      </div>
                    </div>

                    <section>
                      <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
                        <FileText size={16} />
                        <span>Description Technique</span>
                      </h4>
                      <p className="text-gray-600 leading-[1.8] text-lg font-medium">
                        {selectedProtocol.description || "Les données historiques suggèrent que ce protocole est un pilier fondamental de l'infrastructure réseau moderne..."}
                      </p>
                    </section>
                    
                    <section>
                      <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
                        <Cpu size={16} />
                        <span>Utilisation Principale</span>
                      </h4>
                      <div className="bg-sky-600 text-white p-6 rounded-[2rem] shadow-xl shadow-sky-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                          <Info size={24} />
                        </div>
                        <p className="font-bold leading-tight uppercase">
                          {selectedProtocol.usage || "Utilisé pour les échanges de données standardisés entre les terminaux matériels et logiciels."}
                        </p>
                      </div>
                    </section>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-gray-50 flex items-center justify-between border-t border-gray-100">
                <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Génération IA Active
                </div>
                <button 
                  onClick={() => setSelectedProtocol(null)}
                  className="w-full md:w-auto px-10 py-4 bg-white border-2 border-gray-200 rounded-2xl font-black text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all active:scale-95 shadow-sm uppercase tracking-widest text-xs"
                >
                  Retour à l'index
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global CSS for scrollbars */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
      `}} />

      {/* Additional Branding Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-16">
          <div>
            <div className="flex items-center gap-2 text-sky-600 mb-6 font-black text-xl tracking-tighter">
              <Network size={28} />
              <span>RAPPORTS.RESEAU</span>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
              Ce projet est une interface de recherche interactive alimentée par l'intelligence artificielle pour fournir une analyse approfondie des protocoles réseau.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-end gap-4">
            <div className="flex gap-6 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <a href="#" className="hover:text-sky-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-sky-600 transition-colors">Standards OSI</a>
              <a href="#" className="hover:text-sky-600 transition-colors">Confidentialité</a>
            </div>
            <div className="text-gray-300 text-xs font-mono">© 2024 Initiative d'Exploration Réseau • Construit pour la recherche</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function getIconForProtocol(name: string) {
  const iconSize = 24;
  const n = name.toUpperCase();
  if (n.includes('HTTP')) return <Globe size={iconSize} />;
  if (n.includes('FTP')) return <Server size={iconSize} />;
  if (n.includes('SMTP') || n.includes('POP') || n.includes('IMAP')) return <Mail size={iconSize} />;
  if (n.includes('DNS')) return <Network size={iconSize} />;
  if (n.includes('DHCP')) return <Hash size={iconSize} />;
  if (n.includes('SNMP')) return <Info size={iconSize} />;
  if (n.includes('SIP')) return <LinkIcon size={iconSize} />;
  if (n.includes('SSH') || n.includes('OAUTH')) return <Lock size={iconSize} />;
  if (n.includes('TELNET') || n.includes('NTP')) return <Cpu size={iconSize} />;
  return <FileText size={iconSize} />;
}


