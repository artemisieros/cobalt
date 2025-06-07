# Usa a imagem base do Node.js v24 com Alpine Linux
FROM node:24-alpine

# Define o diretório de trabalho principal
WORKDIR /app

# Habilita o pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copia TODOS os arquivos do seu projeto para dentro do container
COPY . .

# Instala SOMENTE as dependências de produção
# O pnpm é inteligente para lidar com workspaces
RUN pnpm install --prod --frozen-lockfile

# Define o diretório de trabalho para o pacote específico da API
WORKDIR /app/api

# Define o usuário como 'node' (não-root) por segurança
USER node

# Expõe a porta que a aplicação usa
EXPOSE 9000

# Comando final para iniciar a sua aplicação
CMD [ "node", "src/cobalt.js" ]