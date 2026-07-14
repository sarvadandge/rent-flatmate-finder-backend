FROM node:22-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --chown=appuser:appgroup package*.json ./

RUN npm ci

COPY --chown=appuser:appgroup . .

RUN npx prisma generate

USER appuser

EXPOSE 5000

CMD ["npm", "start"]