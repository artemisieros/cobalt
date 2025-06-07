# Usa a imagem base do Node.js v24 com Alpine Linux
FROM node:24-alpine

# Define o diretório de trabalho principal
WORKDIR /app

# Configura e habilita o pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# --- INÍCIO DA CORREÇÃO ---
# Instala as ferramentas de build necessárias (Python, Make, G++)
# O 'apk' é o gerenciador de pacotes do Alpine Linux
RUN apk add --no-cache python3 make g++
# --- FIM DA CORREÇÃO ---

# Copia TODOS os arquivos do seu projeto para o diretório de trabalho
COPY . .

# Instala as dependências de produção.
# Agora ele encontrará o Python e conseguirá compilar o 'syscall-napi'
RUN pnpm install --prod --frozen-lockfile

# Define o usuário como 'node' (não-root) por segurança
USER node

# Expõe a porta que a aplicação usa
EXPOSE 9000

# Comando final para iniciar a sua aplicação
CMD [ "node", "api/src/cobalt.js" ]