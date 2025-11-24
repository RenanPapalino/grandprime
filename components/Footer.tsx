import React from 'react';
import { ViewState } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  setView: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  const socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/grandprimecf', 
      icon: 'f', 
      isMaterial: false,
      style: 'bg-[#1877F2] text-white hover:shadow-[0_0_20px_rgba(24,119,242,0.6)]'
    },
    { 
      name: 'X', 
      url: 'https://x.com/grandprimecont', 
      icon: 'X', 
      isMaterial: false,
      style: 'bg-white text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]'
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/grandprimeassessoriacontabil/', 
      icon: 'camera_alt', 
      isMaterial: true,
      style: 'bg-gradient-to-tr from-[#fdf497] via-[#fd5949] to-[#d6249f] text-white hover:shadow-[0_0_20px_rgba(253,89,73,0.6)]'
    }
  ];

  return (
    <footer className="bg-navy-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center justify-start">
              <Logo className="origin-left" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Combinamos tecnologia de ponta com inteligência tributária para maximizar os lucros da sua empresa e garantir segurança fiscal.
            </p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:animate-none shadow-lg animate-pulse-gold ${social.style}`}
                  style={{ animationDelay: `${index * 500}ms` }}
                  aria-label={social.name}
                >
                  {social.isMaterial ? (
                     <span className="material-icons-outlined text-xl">{social.icon}</span>
                  ) : (
                     <span className="text-xl font-bold font-sans">{social.icon}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">Navegação</h3>
            <ul className="space-y-3">
              {[
                { label: 'Início', val: ViewState.HOME },
                { label: 'Serviços', val: ViewState.SERVICES },
                { label: 'Notícias', val: ViewState.NEWS },
                { label: 'Sobre Nós', val: ViewState.ABOUT },
              ].map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => setView(link.val)}
                    className="text-gray-400 hover:text-gold-500 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">Serviços</h3>
            <ul className="space-y-3">
              {['Abertura de Empresas', 'Contabilidade Digital', 'Planejamento Tributário', 'BPO Financeiro', 'Imposto de Renda'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 text-sm">
                <span className="material-icons-outlined text-gold-500 mr-3 text-lg">location_on</span>
                <span>Avenida Dona Belmira Marin, 505 - Sala 01<br/>Grajaú, São Paulo/SP</span>
              </li>
              <li className="flex items-start text-gray-400 text-sm">
                <span className="material-icons-outlined text-gold-500 mr-3 text-lg">phone</span>
                <div className="flex flex-col">
                  <span>(11) 3467-5678</span>
                  <span>(11) 94723-1355</span>
                </div>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="material-icons-outlined text-gold-500 mr-3 text-lg">email</span>
                <span>grandprimeassessoriacf@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Grand Prime Assessoria. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-xs">Termos de Uso</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};