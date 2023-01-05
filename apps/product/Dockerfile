FROM node:16-alpine
LABEL maintainer="Bruno Uemura"
WORKDIR /usr/app
COPY package*.json ./
COPY .env .
RUN npm install
COPY . .
RUN npm run postinstall
RUN npm run build
EXPOSE 5001
CMD ["npm", "start"]