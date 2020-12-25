FROM node:12.13-alpine As development

WORKDIR /app
COPY . ./

RUN npm ci && npm run build

EXPOSE 3000
CMD [ "node", "/app/dist/src/main" ]
