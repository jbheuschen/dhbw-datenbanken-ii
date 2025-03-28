FROM node:23-alpine

WORKDIR /dbi

COPY ./package.json ./
RUN npm config set fetch-retry-maxtimeout 6000000 && npm config set fetch-retry-mintimeout 1000000 && npm install --no-audit --fetch-timeout=60000000

COPY ./ .

RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3 && npx prisma generate && npm run build

ARG VERSION
ARG BUILD

ENV NODE_ENV=production
ENV VERSION=$VERSION
ENV BUILD=$BUILD
ENV SHADOW_DATABASE_URL=""

CMD ["./run.sh"]
