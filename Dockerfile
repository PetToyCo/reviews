FROM node:12.6-alpine
WORKDIR /reviews
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
CMD npm run seedDb && npm run server