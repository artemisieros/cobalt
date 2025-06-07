# --- Dockerfile Temporário para Depuração ---

# Usa a imagem base do Node.js v24 com Alpine Linux
FROM node:24-alpine

# Define o diretório de trabalho principal
WORKDIR /app

# Copia TODOS os arquivos do seu projeto para o diretório de trabalho
COPY . .

# Comando final para listar todos os arquivos e pastas
# Em vez de iniciar o app, ele vai nos mostrar a estrutura de arquivos.
CMD [ "ls", "-R" ]