import React, { useState } from 'react';
import { ViewState, ServiceItem } from '../types';

interface ServicesProps {
  setView: (view: ViewState) => void;
}

export const Services: React.FC<ServicesProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'PJ' | 'PF'>('PJ');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [loadingServiceId, setLoadingServiceId] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleOpenModal = (serviceId: number, serviceTitle: string) => {
    setLoadingServiceId(serviceId);
    // Simula um breve carregamento para feedback visual
    setTimeout(() => {
      setSelectedService(serviceTitle);
      setIsModalOpen(true);
      setLoadingServiceId(null);
    }, 800);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert(`Obrigado, ${formData.name}! Recebemos sua solicitação para "${selectedService}". Um especialista entrará em contato em breve.`);
    handleCloseModal();
  };

  const servicesPJ: ServiceItem[] = [
    {
      id: 1,
      title: 'Abertura de Empresas',
      description: 'Processo 100% digital e rápido. Cuidamos de toda burocracia para você começar a faturar.',
      icon: 'rocket_launch',
      features: ['CNPJ em 24h', 'Escolha do regime ideal', 'Alvarás digitais'],
      isPopular: true
    },
    {
      id: 2,
      title: 'Contabilidade Completa',
      description: 'Gestão contábil, fiscal e trabalhista integrada. Relatórios inteligentes para tomada de decisão.',
      icon: 'analytics',
      features: ['Balanços mensais', 'Folha de pagamento', 'Certidões negativas']
    },
    {
      id: 3,
      title: 'Planejamento Tributário',
      description: 'Análise profunda da sua operação para reduzir a carga tributária dentro da lei.',
      icon: 'account_balance',
      features: ['Recuperação de impostos', 'Elisão fiscal', 'Análise de regime']
    },
    {
      id: 4,
      title: 'BPO Financeiro',
      description: 'Terceirize seu financeiro. Contas a pagar, receber e conciliação bancária profissional.',
      icon: 'payments',
      features: ['Gestão de fluxo de caixa', 'Emissão de notas', 'Relatórios financeiros']
    }
  ];

  const servicesPF: ServiceItem[] = [
    {
      id: 5,
      title: 'Imposto de Renda',
      description: 'Declaração completa e análise de caixa para evitar malha fina e maximizar restituição.',
      icon: 'description',
      features: ['Análise de evolução patrimonial', 'Investimentos em bolsa', 'Carnê-leão'],
      isPopular: true
    },
    {
      id: 6,
      title: 'Holding Familiar',
      description: 'Proteção patrimonial e planejamento sucessório para garantir o futuro da sua família.',
      icon: 'family_restroom',
      features: ['Proteção de bens', 'Redução de impostos na sucessão', 'Governança familiar']
    },
    {
      id: 7,
      title: 'Regularização de CPF',
      description: 'Resolvemos pendências com a Receita Federal para limpar seu nome rapidamente.',
      icon: 'verified_user',
      features: ['Consulta de pendências', 'Parcelamento de débitos', 'Regularização cadastral']
    }
  ];

  const activeServices = activeTab === 'PJ' ? servicesPJ : servicesPF;

  return (
    <div className="min-h-screen pt-24 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Nossas Soluções</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Personalizamos nossos serviços para atender o momento exato da sua vida ou do seu negócio.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-navy-800 p-1 rounded-xl inline-flex border border-white/10">
            <button
              onClick={() => setActiveTab('PJ')}
              className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'PJ' 
                  ? 'bg-gold-500 text-navy-950 shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Para Empresas
            </button>
            <button
              onClick={() => setActiveTab('PF')}
              className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'PF' 
                  ? 'bg-gold-500 text-navy-950 shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Para Você
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service) => (
            <div 
              key={service.id}
              className={`group relative bg-navy-900 border rounded-2xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col ${
                service.isPopular 
                  ? 'border-gold-500/30 hover:shadow-gold-500/20' 
                  : 'border-white/10 hover:border-gold-500/30 hover:shadow-gold-500/10'
              }`}
            >
              {service.isPopular && (
                <div className="absolute top-0 right-0 bg-gold-500 text-navy-950 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl shadow-lg z-10">
                  MAIS PROCURADO
                </div>
              )}
              
              {/* Modern Icon Container */}
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 
                bg-gradient-to-br from-navy-800 to-black border border-gold-500/20 shadow-lg relative overflow-hidden
                group-hover:scale-110 group-hover:bg-gold-500 group-hover:border-gold-400 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] group-hover:rotate-3">
                
                <span className="relative z-10 material-icons-outlined text-4xl text-gold-500 transition-colors duration-300 group-hover:text-navy-950">
                  {service.icon}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 text-sm">
                    <span className="material-icons-outlined text-gold-500 text-base mr-2">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleOpenModal(service.id, service.title)}
                disabled={loadingServiceId === service.id}
                className={`w-full py-4 rounded-xl font-bold transition-all transform duration-300 active:scale-[0.98] flex items-center justify-center
                  ${service.isPopular 
                    ? 'bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:scale-[1.02]' 
                    : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-navy-950 hover:border-white'
                  }
                  ${loadingServiceId === service.id ? 'opacity-70 cursor-wait' : ''}
                `}
              >
                {loadingServiceId === service.id ? (
                  <>
                    <span className="material-icons-outlined animate-spin mr-2 text-xl">sync</span>
                    Processando...
                  </>
                ) : (
                  <>
                    <span>
                      {service.isPopular ? "Quero um Orçamento Personalizado" : "Simular Economia Agora"}
                    </span>
                    <span className={`material-icons-outlined ml-2 ${service.isPopular ? 'animate-pulse' : ''}`}>
                      {service.isPopular ? 'star' : 'arrow_forward'}
                    </span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="mt-24 bg-navy-800/50 rounded-3xl p-8 md:p-12 border border-white/5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Ainda com dúvidas?</h3>
              <p className="text-gray-400 mb-6">
                Nosso time de especialistas (e nossa IA) estão prontos para explicar cada detalhe.
              </p>
              <button className="text-gold-500 font-bold flex items-center hover:text-gold-400 transition-colors">
                Falar no Chat Agora <span className="material-icons-outlined ml-2">arrow_forward</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-navy-900 p-4 rounded-xl border border-white/5">
                <p className="font-semibold text-white">Quanto custa a mensalidade?</p>
                <p className="text-gray-400 text-sm mt-2">Nossos planos partem de R$ 199,00 para MEIs e variam conforme o faturamento e complexidade.</p>
              </div>
              <div className="bg-navy-900 p-4 rounded-xl border border-white/5">
                <p className="font-semibold text-white">O atendimento é humanizado?</p>
                <p className="text-gray-400 text-sm mt-2">Sim! A IA agiliza processos, mas você tem um contador dedicado para estratégias complexas.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Request Quote Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative bg-navy-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-navy-950/50 rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-white">Solicitar Orçamento</h3>
                <p className="text-sm text-gold-500">{selectedService}</p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                <span className="material-icons-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                    placeholder="Ex: João Silva"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-navy-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                      placeholder="joao@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Telefone / WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-navy-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mensagem (Opcional)</label>
                  <textarea 
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none resize-none"
                    placeholder="Conte um pouco sobre sua necessidade..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-3.5 rounded-xl shadow-lg transition-all transform active:scale-[0.99]"
                  >
                    Enviar Solicitação
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Seus dados estão seguros. Nossa equipe responderá em até 2 horas.
                  </p>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};