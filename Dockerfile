# --- ESTÁGIO 1: Build ---
# Instala dependências e prepara os arquivos
FROM node:24-alpine AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copia todo o código-fonte para o estágio de build
COPY . .

# Instala SOMENTE as dependências de produção
RUN pnpm install --prod --frozen-lockfile


# --- ESTÁGIO 2: Produção ---
# Cria a imagem final, que será enxuta e segura
FROM node:24-alpine AS production
WORKDIR /app

# Define o usuário como 'node' (não-root) por segurança
USER node

# A partir do estágio 'build', copia as dependências já instaladas
# O --chown garante que o usuário 'node' seja o dono dos arquivos
COPY --from=build --chown=node:node /app/node_modules ./node_modules

# A partir do estágio 'build', copia o código-fonte da sua API
COPY --from=build --chown=node:node /app/api ./

# Expõe a porta que a aplicação usa
EXPOSE 9000

# Comando final para iniciar a sua aplicação
CMD [ "node", "src/cobalt.js" ]
