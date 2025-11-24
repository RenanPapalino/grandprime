import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { News } from './pages/News';
import { About } from './pages/About';
import { ClientDashboard } from './pages/ClientDashboard';
import { ViewState } from './types';

function App() {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home setView={setView} />;
      case ViewState.SERVICES:
        return <Services setView={setView} />;
      case ViewState.NEWS:
        return <News setView={setView} />;
      case ViewState.ABOUT:
        return <About setView={setView} />;
      case ViewState.CLIENT_AREA:
        if (isLoggedIn) {
          return <ClientDashboard />;
        }
        return (
          <div className="min-h-screen flex items-center justify-center pt-20 bg-navy-950">
            <div className="bg-navy-900 p-8 rounded-2xl border border-white/10 text-center max-w-md mx-4 shadow-2xl animate-fade-in-up">
              <div className="w-16 h-16 bg-navy-950 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-500/30">
                <span className="material-icons-outlined text-gold-500 text-3xl">lock_person</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Área do Cliente</h2>
              <p className="text-gray-400 mb-6 text-sm">
                Acesse seu Dashboard Financeiro integrado ao ERP e envie documentos de forma segura.
              </p>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="text-left">
                  <label className="text-xs text-gray-500 uppercase font-bold ml-1">E-mail</label>
                  <input type="email" required placeholder="admin@suaempresa.com" className="w-full mt-1 bg-navy-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none" />
                </div>
                <div className="text-left">
                  <label className="text-xs text-gray-500 uppercase font-bold ml-1">Senha</label>
                  <input type="password" required placeholder="••••••••" className="w-full mt-1 bg-navy-950 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none" />
                </div>
                <button type="submit" className="w-full bg-gold-500 text-navy-950 font-bold py-3 rounded-lg hover:bg-gold-400 transition-all shadow-lg mt-2">
                  Acessar Painel
                </button>
                <p className="text-xs text-gray-600 mt-4">
                  Esqueceu a senha? <a href="#" className="text-gold-500 hover:underline">Recuperar acesso</a>
                </p>
              </form>
            </div>
          </div>
        );
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-gray-100 font-sans selection:bg-gold-500 selection:text-navy-950">
      {/* Pass logged in state to header to optionally show user profile or hide nav */}
      <Header currentView={currentView} setView={setView} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      {/* Hide Chat Widget in Client Area Dashboard to avoid UI clutter, or keep it for support */}
      <ChatWidget currentView={currentView} />
      <Footer setView={setView} />
    </div>
  );
}

export default App;