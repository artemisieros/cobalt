FROM node:24-alpine
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . .
RUN pnpm install --prod --frozen-lockfile
USER node
EXPOSE 9000
CMD [ "node", "api/src/cobalt.js" ]