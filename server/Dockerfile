FROM node:10
# create app dir
WORKDIR /usr/src/app
# install the dependency
COPY package*.json ./
RUN npm install
# bundle app source
COPY . .
EXPOSE 8012
CMD ["npm","start"]