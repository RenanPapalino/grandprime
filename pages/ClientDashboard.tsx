import React from 'react';

export const ClientDashboard: React.FC = () => {
  // Dados simulados que viriam da API do ERP (Omie/Conta Azul) via Laravel
  const financials = {
    balance: 45230.50,
    toReceive: 12500.00,
    toPay: 5340.20
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Logado */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Olá, Empresa Exemplo Ltda</h1>
            <p className="text-gray-400 text-sm flex items-center mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Conexão ERP Ativa (Sincronizado há 5 min)
            </p>
          </div>
          <button className="bg-navy-800 border border-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-navy-700 flex items-center">
            <span className="material-icons-outlined mr-2">upload_file</span>
            Enviar Documento
          </button>
        </div>

        {/* Financial Cards - Home Logada */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Card Saldo */}
          <div className="bg-navy-900 p-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <span className="material-icons-outlined text-6xl text-blue-500">account_balance</span>
            </div>
            <p className="text-gray-400 text-sm font-medium mb-2">Saldo em Conta</p>
            <h2 className="text-3xl font-bold text-white">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financials.balance)}
            </h2>
            <div className="mt-4 flex items-center text-green-500 text-xs font-bold bg-green-500/10 inline-block px-2 py-1 rounded">
              <span className="material-icons-outlined text-xs mr-1">trending_up</span>
              +5% vs mês anterior
            </div>
          </div>

          {/* Card A Receber */}
          <div className="bg-navy-900 p-6 rounded-2xl border border-white/10 relative overflow-hidden">
             <div className="absolute right-0 top-0 p-4 opacity-10">
              <span className="material-icons-outlined text-6xl text-green-500">arrow_circle_down</span>
            </div>
            <p className="text-gray-400 text-sm font-medium mb-2">A Receber Hoje</p>
            <h2 className="text-3xl font-bold text-green-400">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financials.toReceive)}
            </h2>
            <p className="text-xs text-gray-500 mt-4">3 boletos vencendo</p>
          </div>

          {/* Card A Pagar */}
          <div className="bg-navy-900 p-6 rounded-2xl border border-white/10 relative overflow-hidden">
             <div className="absolute right-0 top-0 p-4 opacity-10">
              <span className="material-icons-outlined text-6xl text-red-500">arrow_circle_up</span>
            </div>
            <p className="text-gray-400 text-sm font-medium mb-2">A Pagar Hoje</p>
            <h2 className="text-3xl font-bold text-red-400">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financials.toPay)}
            </h2>
             <p className="text-xs text-gray-500 mt-4">Próximo: DAS Simples (20/10)</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Chart Section (Simulated with CSS) */}
          <div className="lg:col-span-2 bg-navy-900 rounded-2xl border border-white/10 p-8">
            <h3 className="text-xl font-bold text-white mb-6">Fluxo de Caixa (Últimos 6 meses)</h3>
            
            {/* Simple Bar Chart Visualization */}
            <div className="flex items-end justify-between h-64 space-x-4 px-4 pb-4 border-b border-white/10">
              {[
                { label: 'Mai', val: 40, h: 'h-24' },
                { label: 'Jun', val: 65, h: 'h-32' },
                { label: 'Jul', val: 45, h: 'h-28' },
                { label: 'Ago', val: 80, h: 'h-48' },
                { label: 'Set', val: 55, h: 'h-36' },
                { label: 'Out', val: 90, h: 'h-56' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center w-full group">
                  <div className="relative w-full flex justify-center">
                     {/* Tooltip */}
                     <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white text-black px-2 py-1 rounded font-bold">R${item.val}k</span>
                     {/* Bar */}
                     <div className={`w-full max-w-[40px] ${item.h} bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-lg hover:opacity-90 transition-all`}></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-3 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Document Upload & Status */}
          <div className="bg-navy-900 rounded-2xl border border-white/10 p-8">
            <h3 className="text-xl font-bold text-white mb-6">Documentos Recentes</h3>
            
            <div className="space-y-4 mb-6">
               <div className="flex items-center p-3 bg-navy-950 rounded-lg border border-white/5">
                  <div className="w-10 h-10 bg-red-500/20 text-red-500 rounded flex items-center justify-center mr-3">
                    <span className="material-icons-outlined">picture_as_pdf</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Folha_Pagamento_Out.pdf</p>
                    <p className="text-xs text-gray-500">Enviado por RH • 10 min atrás</p>
                  </div>
                  <span className="material-icons-outlined text-green-500 text-sm" title="Processado">check_circle</span>
               </div>
               
               <div className="flex items-center p-3 bg-navy-950 rounded-lg border border-white/5">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-500 rounded flex items-center justify-center mr-3">
                    <span className="material-icons-outlined">description</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Notas_Fiscais_Lote01.xml</p>
                    <p className="text-xs text-gray-500">Upload via Portal • Ontem</p>
                  </div>
                  <span className="material-icons-outlined text-gray-500 text-sm" title="Em análise">hourglass_empty</span>
               </div>
            </div>

            {/* Upload Area Mock */}
            <div className="border-2 border-dashed border-gold-500/30 rounded-xl p-6 text-center hover:bg-navy-800/50 transition-colors cursor-pointer group">
               <span className="material-icons-outlined text-3xl text-gold-500 mb-2 group-hover:scale-110 transition-transform">cloud_upload</span>
               <p className="text-sm text-gray-300 font-medium">Arraste arquivos aqui</p>
               <p className="text-xs text-gray-500 mt-1">PDF, XML ou Excel (Max 20MB)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};