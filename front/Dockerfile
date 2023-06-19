# Dockerfile para o frontend
FROM node:18

# Configurar o diretório de trabalho
WORKDIR /app

# Instalar o Yarn
# RUN npm install -g yarn

# Instalar as dependências do frontend
COPY ./front/package.json .
RUN npm install

# Copiar o código do frontend
COPY . .

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=7000
CMD npm run dev
EXPOSE 7000
