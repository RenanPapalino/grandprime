import React, { useState, useRef } from 'react';
import { ViewState } from '../types';

interface HomeProps {
  setView: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
  // Calculator State
  const [revenue, setRevenue] = useState('');
  const [regime, setRegime] = useState('simples');
  const [sector, setSector] = useState('servicos');
  const [savings, setSavings] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [resultDetails, setResultDetails] = useState<{taxOriginal: number, taxOptimized: number} | null>(null);
  const calculatorRef = useRef<HTMLElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatInputCurrency = (value: string) => {
    // Remove non-digits
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    
    // Convert to currency format
    const result = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(number) / 100);
    
    return result;
  };

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevenue(formatInputCurrency(e.target.value));
    setSavings(null); // Reset savings when input changes
    setResultDetails(null);
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revenue) return;

    setIsCalculating(true);
    setSavings(null);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert formatted string back to number
    const revValue = parseFloat(revenue.replace(/\./g, '').replace(',', '.')) || 0;
    
    // Logic for demonstration (Simplified Algorithm)
    // Base savings percentage based on regime inefficiency average
    let percentage = 0;
    let baseTaxRate = 0;

    switch (regime) {
      case 'simples':
        // Simples usually has opportunities in monofasic segregation (PIS/COFINS) or Factor R
        percentage = 0.12; 
        baseTaxRate = 0.10; // Est. effective tax
        break;
      case 'lucro_presumido':
        // Opportunities in tax credits and base reduction
        percentage = 0.22;
        baseTaxRate = 0.16;
        break;
      case 'lucro_real':
        // High complexity, high opportunity for credit recovery
        percentage = 0.18;
        baseTaxRate = 0.24;
        break;
      default:
        percentage = 0.10;
        baseTaxRate = 0.15;
    }

    // Sector adjustment
    if (sector === 'servicos') percentage += 0.03; // ISS vs ICMS complexity
    if (sector === 'comercio') percentage += 0.05; // ICMS adjustments usually yield high returns
    if (sector === 'industria') percentage += 0.04; // IPI and industrial credits

    const estimatedTaxOriginal = revValue * baseTaxRate;
    const estimatedSavings = estimatedTaxOriginal * percentage;
    const estimatedTaxOptimized = estimatedTaxOriginal - estimatedSavings;

    setSavings(estimatedSavings);
    setResultDetails({
      taxOriginal: estimatedTaxOriginal,
      taxOptimized: estimatedTaxOptimized
    });
    setIsCalculating(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-navy-800/50 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-gold-500 mr-2"></span>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Contabilidade de Alta Performance</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white tracking-tight mb-8 leading-tight">
            Reduza seus impostos<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              em até 40%
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            A única assessoria que une a tradição de grandes contadores com tecnologia de ponta para blindar seu patrimônio e maximizar seus lucros.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToCalculator}
              className="w-full sm:w-auto px-8 py-4 bg-gold-500 text-navy-950 font-bold rounded-xl hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/20 transform hover:-translate-y-1 flex items-center justify-center"
            >
              <span className="material-icons-outlined mr-2">calculate</span>
              Calcule sua Economia Agora
            </button>
            <button 
              onClick={() => setView(ViewState.SERVICES)}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Saiba Como Crescer
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10">
            {[
              { label: 'Economia Gerada', value: 'R$ 15M+' },
              { label: 'Clientes Ativos', value: '1.2k+' },
              { label: 'Nota de Satisfação', value: '4.9/5' },
              { label: 'Tempo de Resposta', value: '< 5min' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-24 bg-navy-900 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Simulador de Economia Tributária
            </h2>
            <p className="text-gray-400">
              Descubra quanto dinheiro sua empresa pode estar perdendo anualmente por falta de planejamento adequado.
            </p>
          </div>

          <div className="bg-navy-950 rounded-2xl border border-white/10 p-6 md:p-10 shadow-2xl">
            <form onSubmit={handleCalculate} className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Regime Atual</label>
                <div className="relative">
                  <select 
                    value={regime}
                    onChange={(e) => setRegime(e.target.value)}
                    className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 pr-8 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="simples">Simples Nacional</option>
                    <option value="lucro_presumido">Lucro Presumido</option>
                    <option value="lucro_real">Lucro Real</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 material-icons-outlined">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Setor de Atuação</label>
                <div className="relative">
                  <select 
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 pr-8 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="servicos">Serviços</option>
                    <option value="comercio">Comércio</option>
                    <option value="industria">Indústria</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 material-icons-outlined">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Faturamento Anual (Estimado)</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-500 transition-colors">R$</span>
                  <input 
                    type="text" 
                    value={revenue}
                    onChange={handleRevenueChange}
                    placeholder="0,00"
                    className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <button 
                  type="submit"
                  disabled={isCalculating || !revenue}
                  className={`w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-4 rounded-xl transition-all shadow-lg transform active:scale-[0.99] text-lg mt-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isCalculating ? (
                    <>
                      <span className="material-icons-outlined animate-spin mr-2">sync</span>
                      Analisando Perfil Tributário...
                    </>
                  ) : (
                    "SIMULAR ECONOMIA AGORA"
                  )}
                </button>
              </div>
            </form>

            {/* Results Display */}
            {savings !== null && resultDetails && !isCalculating && (
              <div className="animate-fade-in-up">
                <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl p-8 border border-gold-500/30 text-center relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  
                  <div className="relative z-10">
                    <span className="inline-block bg-gold-500 text-navy-950 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider shadow-lg">
                      Oportunidade Encontrada
                    </span>
                    
                    <p className="text-gray-300 mb-2 font-medium">Sua empresa pode recuperar até:</p>
                    <div className="text-4xl md:text-6xl font-display font-extrabold text-gold-500 mb-2 tracking-tight drop-shadow-lg">
                      {formatCurrency(savings)}<span className="text-xl md:text-2xl text-gold-500/70 font-sans font-medium">/ano</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto my-8 p-4 bg-navy-950/50 rounded-lg border border-white/5">
                      <div className="border-r border-white/10 pr-4">
                        <p className="text-xs text-gray-500 mb-1">Custo Tributário Atual (Est.)</p>
                        <p className="text-white font-bold">{formatCurrency(resultDetails.taxOriginal)}</p>
                      </div>
                      <div className="pl-4">
                        <p className="text-xs text-gold-500 mb-1">Custo Otimizado Grand Prime</p>
                        <p className="text-gold-400 font-bold">{formatCurrency(resultDetails.taxOptimized)}</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">
                      *Cálculo baseado na média de recuperação tributária para empresas do setor de <span className="text-gray-300 capitalize">{sector}</span> no regime {regime === 'simples' ? 'Simples Nacional' : regime.replace('_', ' ')}. 
                      Valores exatos dependem de análise detalhada da documentação.
                    </p>
                    
                    <button 
                      onClick={() => setView(ViewState.SERVICES)}
                      className="group inline-flex items-center justify-center bg-white text-navy-950 hover:bg-gray-100 font-bold px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-white/10"
                    >
                      <span>Quero Validar essa Economia</span>
                      <span className="material-icons-outlined ml-2 group-hover:translate-x-1 transition-transform text-gold-600">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-navy-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Por que a Grand Prime?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Não somos apenas contadores. Somos estrategistas de crescimento para o seu negócio.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'trending_up', title: 'Foco no Lucro', desc: 'Análise tributária profunda para encontrar cada centavo de economia legal possível.' },
              { icon: 'memory', title: 'Agilidade Digital', desc: 'Sem papelada. Tudo na nuvem, acessível pelo seu celular, com tecnologia de ponta.' },
              { icon: 'gavel', title: 'Blindagem Fiscal', desc: 'Monitoramento 24/7 de suas obrigações para evitar multas da Receita Federal.' },
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 bg-navy-900 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all hover:bg-navy-800/80">
                <div className="w-14 h-14 bg-navy-950 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/5 shadow-inner">
                  <span className="material-icons-outlined text-gold-500 text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Quem confia cresce</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Ricardo Mendes', role: 'CEO TechStart', text: 'A migração para a Grand Prime reduziu nossa carga tributária em 22% logo no primeiro trimestre.' },
              { name: 'Ana Clara', role: 'Médica PJ', text: 'Abertura da minha empresa foi recorde. Em 24h já estava emitindo notas. O atendimento via IA ajuda muito nas dúvidas rápidas.' },
              { name: 'Felipe Costa', role: 'E-commerce', text: 'O dashboard financeiro deles mudou minha visão de fluxo de caixa. Recomendo de olhos fechados.' },
            ].map((t, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex text-gold-500 mb-4">
                  {[1,2,3,4,5].map(star => <span key={star} className="material-icons text-sm">star</span>)}
                </div>
                <p className="text-gray-300 italic mb-6">"{t.text}"</p>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-gray-500 uppercase">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 bg-gradient-to-r from-gold-600 to-gold-500">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-navy-950 mb-6">
            Sua empresa merece ser Prime
          </h2>
          <p className="text-navy-900/80 text-xl mb-10 max-w-2xl mx-auto font-medium">
            Agende uma análise tributária gratuita e descubra quanto você está deixando na mesa.
          </p>
          <button 
            onClick={() => setView(ViewState.SERVICES)}
            className="px-10 py-5 bg-navy-950 text-white font-bold rounded-xl hover:bg-navy-900 transition-all shadow-2xl transform hover:-translate-y-1"
          >
            Falar com Especialista
          </button>
        </div>
      </section>
    </div>
  );
};