FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --chown=node:node src ./src/
USER node
EXPOSE 5001
CMD ["node", "src/server.js"]
