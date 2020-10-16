FROM node:stretch-slim
LABEL author="Usman Murtala"
WORKDIR /app
COPY package.json /app
COPY src /app
RUN ["npm", "install"]
EXPOSE 3000
CMD ["npm", "start"]