# Estágio de Build
FROM node:18-alpine as builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Argumentos de Build (necessário para injetar a chave API na hora do build se usar VITE_)
# No seu caso, você usa process.env via vite.config, então vamos passar no runtime ou build
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Gera a pasta 'dist' otimizada
RUN npm run build

# Estágio de Produção (Servidor Nginx leve)
FROM nginx:alpine

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados no build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]