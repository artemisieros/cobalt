# Usa a imagem base do Node.js v24 com Alpine Linux
FROM node:24-alpine

# Define o diretório de trabalho principal e o mantém até o fim
WORKDIR /app

# Configura e habilita o pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copia TODOS os arquivos do projeto para o diretório de trabalho
COPY . .

# Instala as dependências de produção.
RUN pnpm install --prod --frozen-lockfile

# Define o usuário como 'node' (não-root) por segurança
USER node

# Expõe a porta que a aplicação usa
EXPOSE 9000

# Comando final para iniciar a aplicação, usando o caminho completo.
CMD [ "node", "api/src/cobalt.js" ]