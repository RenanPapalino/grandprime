import React, { useState, useRef, useEffect } from 'react';
import { generateBotResponse } from '../services/geminiService';
import { ChatMessage, ViewState } from '../types';

interface ChatWidgetProps {
  currentView?: ViewState;
}

// Using the logo URL provided in Logo.tsx
const BOT_AVATAR_URL = "../public/logo.jpg";

export const ChatWidget: React.FC<ChatWidgetProps> = ({ currentView = ViewState.HOME }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [proactiveTriggered, setProactiveTriggered] = useState(false);
  const [customTeaserMessage, setCustomTeaserMessage] = useState<string | null>(null);
  
  // State for Quick Replies (Chips)
  const [quickReplies, setQuickReplies] = useState<string[]>([]);

  // Messages State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Define Quick Replies based on context
  const getQuickReplies = (view: ViewState) => {
    switch (view) {
      case ViewState.HOME:
        return ["Quero reduzir impostos", "Abrir minha empresa", "Falar com contador"];
      case ViewState.SERVICES:
        return ["Orçamento PJ", "Regularizar CPF", "Trocar de contador"];
      case ViewState.NEWS:
        return ["Dúvida sobre a notícia", "Impacto no meu negócio"];
      default:
        return ["Como funciona?", "Quero um orçamento"];
    }
  };

  // Dynamic Initial Messages based on Page Context (The "Hook")
  const getContextMessage = (view: ViewState) => {
    switch (view) {
      case ViewState.HOME:
        return "Olá! Sou o Assistente Virtual da Grand Prime. Notei seu interesse em reduzir custos. Sua empresa é de Serviços ou Comércio?";
      case ViewState.SERVICES:
        return "Olá! Posso agilizar seu atendimento. Qual serviço você procura com mais urgência hoje?";
      case ViewState.NEWS:
        return "O cenário fiscal muda rápido! Se essa notícia impacta seu negócio, posso explicar como se proteger.";
      case ViewState.CLIENT_AREA:
        return "Problemas com acesso? Posso conectar você diretamente ao suporte técnico.";
      case ViewState.ABOUT:
        return "Gostou da nossa trajetória? Posso agendar uma visita para você conhecer nossa estrutura pessoalmente.";
      default:
        return "Olá! Sou a IA da Grand Prime. Posso ajudar você a otimizar seus impostos hoje?";
    }
  };

  // Initialize or update chat hook when view changes
  useEffect(() => {
    if (!hasInteracted && !isOpen) {
      // Update quick replies based on new view
      setQuickReplies(getQuickReplies(currentView));
      setCustomTeaserMessage(null); // Reset custom message on view change
      setProactiveTriggered(false); // Reset trigger on view change
      
      // Reset teaser logic
      setShowTeaser(false);
      const timer = setTimeout(() => setShowTeaser(true), 4000); // 4s delay for "active" look
      return () => clearTimeout(timer);
    }
  }, [currentView, hasInteracted, isOpen]);

  // Proactive Inactivity Timer (15s on Home)
  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;

    if (currentView === ViewState.HOME && !hasInteracted && !proactiveTriggered) {
      inactivityTimer = setTimeout(() => {
        triggerProactiveEngagement();
      }, 15000);
    }

    return () => {
      if(inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [currentView, hasInteracted, proactiveTriggered, isOpen]);

  const triggerProactiveEngagement = () => {
    setProactiveTriggered(true);
    const proactiveMsg = "Vi que você está conferindo nossa calculadora. Para eu simular uma economia exata, qual é o seu regime tributário atual?";
    
    // Update Quick Replies to facilitate the answer
    setQuickReplies(["Simples Nacional", "Lucro Presumido", "Lucro Real", "Não sei informar"]);

    if (isOpen) {
      // If chat is already open but user hasn't typed, push the message
      setMessages(prev => [...prev, {
        id: 'proactive-' + Date.now(),
        text: proactiveMsg,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } else {
      // If chat is closed, update the teaser text to be specific and show it
      setCustomTeaserMessage("Posso simular sua economia tributária agora. Qual seu regime atual?");
      setShowTeaser(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping, quickReplies]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowTeaser(false);
    
    // Only add initial message if empty
    if (messages.length === 0) {
      // Use custom teaser message as start if it exists (triggered by inactivity), otherwise default
      const initialText = customTeaserMessage || getContextMessage(currentView);
      setMessages([{
        id: 'init',
        text: initialText,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } else if (customTeaserMessage && !messages.some(m => m.text === customTeaserMessage)) {
        // Edge case: if user opened, closed, waited 15s, then opened again.
        setMessages(prev => [...prev, {
            id: 'proactive-reopen-' + Date.now(),
            text: customTeaserMessage,
            sender: 'bot',
            timestamp: new Date()
        }]);
    }
  };

  const processResponse = async (userText: string) => {
    setIsTyping(true);
    setQuickReplies([]); // Hide replies while thinking

    try {
      // Pass simplistic history (last 2 messages) for context
      const historyStrings = messages.slice(-2).map(m => `${m.sender}: ${m.text}`);
      
      const responseText = await generateBotResponse(userText, currentView, historyStrings);
      
      // Check for Scheduling Tag
      const hasSchedulingRequest = responseText.includes('[AGENDAR_REUNIAO]');
      const cleanText = responseText.replace('[AGENDAR_REUNIAO]', '').trim();

      const botMsg: ChatMessage = {
        id: Date.now().toString(),
        text: cleanText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);

      // If scheduling is requested, add a system message or button
      if (hasSchedulingRequest) {
        setMessages(prev => [...prev, {
          id: 'sys-' + Date.now(),
          text: "SCHEDULING_CARD", // Special flag for renderer
          sender: 'bot',
          timestamp: new Date()
        }]);
      }

    } catch (error) {
       console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    setHasInteracted(true);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    processResponse(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Teaser Bubble (The "Hook") */}
      {showTeaser && !isOpen && (
        <div 
          onClick={handleOpen}
          className="mb-4 mr-2 bg-white text-navy-950 p-4 rounded-2xl rounded-br-none shadow-2xl border border-gold-500/30 cursor-pointer animate-fade-in-up hover:scale-105 transition-transform max-w-[280px] relative group"
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setShowTeaser(false); }}
            className="absolute -top-2 -left-2 bg-navy-900 text-white rounded-full p-1 hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <span className="material-icons-outlined text-xs block">close</span>
          </button>
          
          <div className="flex items-start space-x-3">
             <div className="relative flex-shrink-0 w-10 h-10 bg-black rounded-full border-2 border-gold-500 overflow-hidden">
               <img src={BOT_AVATAR_URL} alt="Grand Prime" className="w-full h-full object-contain p-1" />
               <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
             </div>
             <div>
                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Grand Prime • Online</span>
                <p className="text-sm font-medium leading-tight text-navy-900">
                  {customTeaserMessage || (currentView === ViewState.HOME 
                    ? "Sua empresa paga muito imposto? Posso fazer uma análise rápida." 
                    : "Olá! Posso te ajudar com uma dúvida técnica?")}
                </p>
             </div>
          </div>
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gold-500/30"></div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[380px] bg-navy-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up h-[550px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-950 to-navy-800 p-4 border-b border-white/10 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center">
              <div className="relative w-10 h-10 bg-black rounded-full border border-gold-500 overflow-hidden">
                <img src={BOT_AVATAR_URL} alt="Grand Prime" className="w-full h-full object-contain p-1" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-navy-900 animate-pulse"></div>
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-white text-sm">Grand Prime Assistente</h3>
                <span className="text-xs text-gold-500 font-medium">Inteligência Artificial</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
               <button onClick={() => { setMessages([]); setHasInteracted(false); handleOpen(); }} className="text-gray-400 hover:text-white" title="Reiniciar">
                  <span className="material-icons-outlined text-lg">refresh</span>
               </button>
               <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                 <span className="material-icons-outlined">close</span>
               </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0B0C10] scroll-smooth">
            <div className="text-center py-4">
              <span className="text-xs text-gray-500 bg-navy-800 px-3 py-1 rounded-full">Hoje</span>
            </div>
            
            {messages.map((msg) => {
              if (msg.text === "SCHEDULING_CARD") {
                return (
                  <div key={msg.id} className="animate-fade-in-up my-4">
                    <div className="bg-navy-800 rounded-xl border border-gold-500/50 p-4 shadow-lg mx-4">
                      <div className="flex items-center mb-3 text-gold-500">
                        <span className="material-icons-outlined mr-2">event_available</span>
                        <span className="font-bold text-sm">Agendamento Recomendado</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">
                        Vamos analisar seu caso em detalhes. Escolha um horário para nossa consultoria gratuita.
                      </p>
                      <button className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-2 rounded-lg text-sm transition-colors mb-2">
                        Agendar via Google Meet
                      </button>
                      <button className="w-full bg-transparent border border-white/20 hover:bg-white/5 text-white py-2 rounded-lg text-sm transition-colors">
                        Chamar no WhatsApp
                      </button>
                    </div>
                  </div>
                );
              }
              
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                     <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-2 bg-black border border-gold-500/30">
                        <img src={BOT_AVATAR_URL} alt="Bot" className="w-full h-full object-contain p-0.5" />
                     </div>
                  )}
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-gold-600 text-white font-medium rounded-tr-none' 
                        : 'bg-navy-800 text-gray-200 rounded-tl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex justify-start">
                 <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-2 bg-black border border-gold-500/30">
                    <img src={BOT_AVATAR_URL} alt="Bot" className="w-full h-full object-contain p-0.5" />
                 </div>
                <div className="bg-navy-800 rounded-2xl rounded-tl-none px-4 py-3 border border-white/5 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area & Quick Replies */}
          <div className="bg-navy-900 border-t border-white/10">
            {/* Quick Replies */}
            {!isTyping && quickReplies.length > 0 && messages.length < 5 && (
              <div className="flex gap-2 overflow-x-auto p-3 no-scrollbar border-b border-white/5">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(reply)}
                    className="whitespace-nowrap bg-navy-800 text-gold-500 border border-gold-500/30 hover:bg-gold-500 hover:text-navy-950 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escreva uma mensagem..."
                  className="w-full bg-navy-950 text-white rounded-xl py-3 pl-4 pr-12 text-sm border border-white/10 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-gray-500"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gold-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-icons-outlined text-xl">send</span>
                </button>
              </div>
            </div>
            
            <div className="bg-navy-950 py-1 flex justify-center border-t border-white/5">
                <p className="text-[9px] text-gray-600 font-medium">Grand Prime AI Assistant • Powered by Gemini</p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button (The Avatar when closed) */}
      <button
        onClick={() => isOpen ? setIsOpen(false) : handleOpen()}
        className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all hover:scale-105 active:scale-95 z-50 ${isOpen ? 'bg-navy-800' : 'bg-black'}`}
      >
        {isOpen ? (
           <span className="material-icons-outlined text-2xl text-white">close</span>
        ) : (
          <div className="relative w-full h-full bg-black rounded-full border-2 border-gold-500 overflow-hidden">
            {/* Pulsing effect behind */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-20 animate-ping"></span>
            
            {/* Image Avatar */}
            <img 
              src={BOT_AVATAR_URL} 
              alt="Chat" 
              className="w-full h-full object-contain p-2"
            />
            
            {/* Status Indicator */}
            <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-navy-950 rounded-full"></span>
            
            {/* Unread Badge */}
            {!showTeaser && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 bg-red-500 rounded-full items-center justify-center text-[10px] text-white font-bold border-2 border-navy-950">1</span>
            )}
          </div>
        )}
      </button>
    </div>
  );
};