FROM node:20 AS base
WORKDIR /app 

# Copia e depois Instala dependências 
COPY package*.json ./
RUN npm install

# Copia o código-fonte
COPY . .

# Estágio de desenvolvimento (hot-reload)
FROM base AS dev
# Documenta que a aplicação usa a porta 3000 (Não publica a porta)
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

