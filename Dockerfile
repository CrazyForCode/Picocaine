FROM daocloud.io/library/node

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/server

RUN npm install

EXPOSE 2333

ENV PASS_CODE lovecfc
ENV MONGO_CON_STR mongodb://172.17.0.1:27017/picocaine

CMD npm start
