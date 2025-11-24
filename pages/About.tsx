import React from 'react';
import { ViewState } from '../types';

interface AboutProps {
  setView: (view: ViewState) => void;
}

export const About: React.FC<AboutProps> = ({ setView }) => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Conheça a <span className="text-gold-500">Grand Prime</span>
            </h1>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed text-justify">
              <p>
                Somos uma empresa de pequeno porte e especialista em prestação de serviços de Consultoria e Assessoria Contábil e Fiscal.
                Nossa qualidade e seriedade são reconhecidas pelo mercado, pois usamos as ferramentas mais modernas e as técnicas mais eficazes, sempre em busca da satisfação total de nossos clientes.
              </p>
              <p>
                Idealizada em 2017 por profissionais com mais de 15 anos de experiência, a Grand Prime acumulou experiência e estrutura nas áreas Contábil, Fiscal e Societária, contando com profissionais altamente qualificados, com o propósito de atender com excelência clientes dos mais variados ramos de atividade.
              </p>
              <p>
                O principal objetivo da Grand Prime na época de sua fundação, era prestar um atendimento personalizado, onde nossos clientes fossem atendidos em todas suas dúvidas e questões fiscais, sempre respeitando os mais severos padrões de honestidade e ética profissional.
              </p>
            </div>
            
            <div className="flex space-x-8 mt-8">
              <div>
                <span className="block text-3xl font-bold text-white">2017</span>
                <span className="text-sm text-gray-500">Ano de Fundação</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white">15+</span>
                <span className="text-sm text-gray-500">Anos de XP dos Sócios</span>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gold-500 rounded-3xl rotate-3 opacity-20 blur-lg transition-all duration-500 group-hover:opacity-30 group-hover:rotate-6"></div>
            <img 
              src="../assets/grand-prime-office.jpg" 
              alt="Escritório Grand Prime - Sala de Reuniões com Xadrez" 
              loading="lazy"
              width="800"
              height="600"
              className="relative rounded-3xl border border-white/10 shadow-2xl transition-all duration-700 w-full h-auto object-cover group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-navy-900 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-16">Nossa Trajetória</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/10"></div>
            
            <div className="space-y-12">
              {[
                { year: '2017', title: 'A Fundação', desc: 'Idealizada por especialistas com vasta experiência de mercado.' },
                { year: '2019', title: 'Expansão Tecnológica', desc: 'Adoção de ferramentas modernas para otimizar a consultoria.' },
                { year: '2021', title: 'Crescimento', desc: 'Ampliação da estrutura nas áreas Contábil, Fiscal e Societária.' },
                { year: '2024', title: 'Era da IA', desc: 'Integração de inteligência artificial para maior agilidade no atendimento.' },
              ].map((item, idx) => (
                <div key={item.year} className={`flex items-center justify-between w-full ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5/12"></div>
                  <div className="z-20 flex items-center justify-center w-8 h-8 bg-gold-500 rounded-full border-4 border-navy-900"></div>
                  <div className="w-5/12 bg-navy-800 p-6 rounded-xl border border-white/5 hover:border-gold-500/50 transition-colors">
                    <span className="text-gold-500 font-bold text-xl mb-1 block">{item.year}</span>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};