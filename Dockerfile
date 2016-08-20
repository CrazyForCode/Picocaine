FROM daocloud.io/library/node

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/server

RUN npm install

EXPOSE 80

CMD npm start
