### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:14.17.6-alpine3.13 as builder

COPY package*.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /opt/app && cp -R ./node_modules /opt/app

WORKDIR /opt/app

COPY . .

RUN npm run-script build


### STAGE 2: Setup ###


FROM bitnami/nginx:1.18.0
COPY --from=builder /opt/app/build /var/www/my-app
COPY run.sh /app/
USER 0
RUN chmod +x /app/run.sh && \
    chgrp -R 0 /var/www/my-app && chmod -R g=u /var/www/my-app
USER 1001
COPY nginx/site.conf /opt/bitnami/nginx/conf/server_blocks/
ENTRYPOINT ["/app/run.sh"]
