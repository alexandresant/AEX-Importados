# Imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho do contêiner
WORKDIR /src/app

# Copia os arquivos de configuração do Node para instalar as dependências
COPY package*.json ./

# Instala as dependências de produção
RUN npm install

# Copia o restante do código da sua aplicação
COPY . .

# Executa o comando de build para criar a pasta dist
RUN npm run build

# Executa o comando para gerar o cliente prisma
RUN npx prisma generate

#Executa as migrações do prisma no banco de dados
RUN npx prisma migrate deploy

# Exponha a porta que seua aplicação usará
EXPOSE 3001

# Comando para iniciar o servidor em produção
CMD ["npm", "run", "start"]