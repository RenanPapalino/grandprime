import React, { useState } from 'react';
import { ViewState, NewsItem } from '../types';

interface NewsProps {
  setView: (view: ViewState) => void;
}

export const News: React.FC<NewsProps> = ({ setView }) => {
  const [filter, setFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');

  // Mock Data simulating the output from the Laravel FetchAccountingNews Job + GPT-4 Summary
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Reforma Tributária 2025: O que muda para o Simples Nacional?',
      summary: 'O Comitê Gestor aprovou novas faixas de transição. Nossa IA analisou o texto original da Lei Complementar e destacou que empresas de serviços devem ter atenção redobrada ao IVA dual.',
      category: 'Tributário',
      date: 'Hoje, 08:00',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-9726b30c8d1b?auto=format&fit=crop&q=80&w=800',
      readTime: 'Resumo IA • 1 min',
      source: 'Portal Contábeis',
      aiProcessed: true
    },
    {
      id: 2,
      title: 'Banco Central anuncia novidades no Pix para Pessoas Jurídicas',
      summary: 'A partir de novembro, transferências acima de R$ 200 em dispositivos novos exigirão biometria. Medida visa reduzir fraudes em contas corporativas.',
      category: 'Finanças',
      date: 'Ontem, 14:15',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
      readTime: 'Resumo IA • 45 seg',
      source: 'IOB Notícias',
      aiProcessed: true
    },
    {
      id: 3,
      title: 'IA na Contabilidade: O fim das tarefas manuais?',
      summary: 'Artigo técnico detalha como a automação de lançamentos via OFX está permitindo que contadores atuem como consultores estratégicos de negócios, focando em BPO.',
      category: 'Tecnologia',
      date: '23 Out, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      readTime: 'Original • 4 min',
      source: 'Econet Editora',
      aiProcessed: false
    },
    {
      id: 4,
      title: 'FGTS Digital: Prazo para adaptação encerra em breve',
      summary: 'Empregadores devem atualizar cadastros no eSocial para evitar multas. O sistema substituirá a GFIP/SEFIP completamente no próximo mês.',
      category: 'Trabalhista',
      date: '22 Out, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
      readTime: 'Resumo IA • 1 min',
      source: 'Portal Contábeis',
      aiProcessed: true
    },
  ];

  const categories = ['Todas', 'Tributário', 'Finanças', 'Trabalhista', 'Tecnologia'];

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = filter === 'Todas' || item.category === filter;
    const query = searchQuery.toLowerCase();
    const matchesText = 
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      (item.source && item.source.toLowerCase().includes(query));

    let matchesDate = true;
    if (searchDate) {
      const dateString = item.date.toLowerCase();
      const today = new Date().toISOString().split('T')[0];
      if (dateString.includes('hoje') && searchDate !== today) matchesDate = false;
      // Simplified date check for demo
    }

    return matchesCategory && matchesText && matchesDate;
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-8">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-display font-bold text-white">Grand Prime News</h1>
              <span className="bg-gold-500/10 text-gold-500 text-xs font-bold px-2 py-1 rounded border border-gold-500/20 flex items-center">
                <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse mr-2"></span>
                Live Feed
              </span>
            </div>
            <p className="text-gray-400 max-w-xl">
              Monitoramos fontes oficiais (IOB, Econet, Portal Contábeis) 24h por dia. 
              Nossa IA resume a legislação técnica em linguagem de negócios para você.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              <span className="material-icons-outlined text-[10px] align-middle mr-1">update</span>
              Última atualização automática: Hoje às 08:00
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex-shrink-0">
            <button className="bg-gold-500 text-navy-950 px-6 py-3 rounded-xl text-sm font-bold hover:bg-gold-400 hover:scale-105 transition-all shadow-lg shadow-gold-500/20 transform flex items-center">
              <span className="material-icons-outlined mr-2 text-lg">mail</span>
              Receber Resumo Diário
            </button>
          </div>
        </div>

        {/* Smart Search Bar */}
        <div className="bg-navy-900/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-12 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons-outlined text-gray-500 group-focus-within:text-gold-500 transition-colors">
                  search
                </span>
                <input 
                  type="text" 
                  placeholder="Buscar por palavra-chave (ex: Simples Nacional)" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-navy-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder-gray-500"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <span className="material-icons-outlined text-sm">close</span>
                  </button>
                )}
              </div>

              <div className="w-full md:w-48 relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons-outlined text-gray-500 group-focus-within:text-gold-500 transition-colors">
                  calendar_today
                </span>
                <input 
                  type="date" 
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full bg-navy-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder-gray-500 [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="flex items-center overflow-x-auto no-scrollbar lg:border-l lg:border-white/10 lg:pl-6 space-x-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${
                    filter === cat 
                      ? 'bg-gold-500 text-navy-950 border-gold-500 shadow-md' 
                      : 'bg-navy-950 text-gray-400 border-white/5 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-20 bg-navy-900/50 rounded-3xl border border-white/5 border-dashed">
            <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-6">
               <span className="material-icons-outlined text-4xl text-gray-600">travel_explore</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Nenhum resultado encontrado</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Tente buscar por termos mais amplos ou limpe os filtros.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setFilter('Todas'); setSearchDate('');}}
              className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-gold-500 font-bold rounded-lg transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredNews.map((news) => (
              <article key={news.id} className="bg-navy-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all hover:-translate-y-1 group flex flex-col md:flex-row h-full animate-fade-in-up shadow-lg">
                <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden flex-shrink-0">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-navy-950/90 backdrop-blur text-gold-500 px-2 py-1 rounded text-xs font-bold uppercase border border-gold-500/20">
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-xs text-gray-500 flex items-center">
                          <span className="material-icons-outlined text-[14px] mr-1">source</span>
                          Fonte: {news.source}
                       </span>
                       {news.aiProcessed && (
                         <span className="flex items-center text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
                            <span className="material-icons-outlined text-[10px] mr-1">auto_awesome</span>
                            IA Resumiu
                         </span>
                       )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-500 transition-colors leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-gray-500 text-xs flex items-center">
                      <span className="material-icons-outlined text-[14px] mr-1">calendar_today</span>
                      {news.date}
                    </span>
                    <button className="text-gold-500 text-sm font-medium hover:underline flex items-center">
                      Ler completo <span className="material-icons-outlined text-sm ml-1">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};