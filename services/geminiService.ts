import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the client strictly according to guidelines
const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const generateBotResponse = async (
  userMessage: string, 
  context: string = '',
  history: string[] = [] // Optional: pass conversation history if needed for context
): Promise<string> => {
  if (!ai) {
    // Fallback simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Olá! O Assistente Grand Prime está em modo de demonstração. Em produção, eu usaria o Gemini para qualificar seu perfil e agendar uma consultoria baseada na página que você está visitando (" + context + ").");
      }, 1500);
    });
  }

  try {
    const modelId = 'gemini-2.5-flash';
    
    // "Jornalista Robô" / "Contador Consultor" Persona - RAG Simulation
    const systemInstruction = `
      CONTEXTO TÉCNICO (SIMULAÇÃO RAG):
      Você é o "Grand Prime Assistente Inteligente". 
      Sua base de conhecimento inclui:
      1. Manuais Internos da Grand Prime.
      2. Leis Tributárias Brasileiras (CTN, Regulamento do IR, Leis do Simples Nacional).
      3. Artigos técnicos capturados de portais como IOB e Econet.

      SEU OBJETIVO:
      Você deve agir como um Contador Consultor Sênior. 
      Ao responder, finja que consultou esses documentos. Use frases como "Verificando na legislação vigente..." ou "Segundo o manual interno...".

      CAPTURA DE LEAD:
      Se o usuário mostrar intenção de compra (abrir empresa, trocar contador, dúvida complexa), você DEVE capturar os dados.
      Pergunte: Nome, Email e Telefone.
      
      ESTILO DE RESPOSTA:
      - Se o usuário perguntar "Quero abrir uma empresa", responda explicando o processo resumido e peça os dados para o especialista humano entrar em contato.
      - Seja técnico mas acessível.
      - Finalize com [AGENDAR_REUNIAO] se o lead estiver "quente".

      Exemplo de fluxo RAG:
      User: "MEI paga IRPJ?"
      Assistente: "Consultando a Lei Complementar nº 123/2006... O MEI é isento de IRPJ, CSLL, PIS e COFINS, pagando apenas um valor fixo mensal no DAS. Porém, cuidado com o limite de R$ 81 mil anual."
    `;

    // Construct the prompt with rudimentary history context if available to maintain thread
    const fullPrompt = `Histórico recente: ${history.slice(-3).join(' | ')}\nUsuário agora: ${userMessage}`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4, // Lower temperature for more factual/consultant answers
      },
    });

    return response.text || "Desculpe, estou processando muitas leis no momento. Poderia repetir?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estou analisando seu perfil, mas tive uma falha de conexão momentânea. Podemos falar no WhatsApp? (11) 94723-1355";
  }
};