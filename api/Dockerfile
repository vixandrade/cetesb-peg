FROM node:latest
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
WORKDIR /opt/app
ADD . /opt/app
EXPOSE 3000
EXPOSE 5858
CMD ["node", "--inspect=0.0.0.0:5858", "/opt/app/bin/www"]
