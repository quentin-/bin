FROM iojs

RUN mkdir -p /home/app
COPY . /home/app

WORKDIR /home/app
RUN npm install

CMD ["npm", "start"]
