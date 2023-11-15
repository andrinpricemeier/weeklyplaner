FROM node:16-bullseye-slim as base
ENV NODE_ENV production

FROM node:16-bullseye as buf-build
WORKDIR /myapp
ADD . .
COPY binaries/protoc /usr/local/bin/protoc
RUN apt-get update && apt-get install curl -y
RUN BIN="/usr/local/bin" && \
    VERSION="1.7.0" && \
    curl -sSL \
    "https://github.com/bufbuild/buf/releases/download/v${VERSION}/buf-$(uname -s)-$(uname -m)" \
    -o "${BIN}/buf" && \
    chmod +x "${BIN}/buf"
RUN npm i -g grpc_tools_node_protoc_ts grpc-tools
RUN mkdir -p generated && cd proto && buf generate

FROM base as deps
WORKDIR /myapp
ADD package.json package-lock.json .npmrc ./
RUN npm install --production=false

FROM base as production-deps
WORKDIR /myapp
COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json package-lock.json .npmrc ./
RUN npm prune --production

FROM base as build
WORKDIR /myapp
COPY --from=deps /myapp/node_modules /myapp/node_modules
COPY --from=buf-build /myapp/generated /myapp/generated
ADD . .
RUN npm run build

FROM base
WORKDIR /myapp
COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=buf-build /myapp/generated /myapp/generated
ADD . .
CMD ["npm", "start"]
