#stage 1: build 
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
#stage 2: run in production

FROM node:18

WORKDIR /app

COPY --from=build /app ./

RUN npm install 

EXPOSE 3000

CMD ["npm", "start"]
