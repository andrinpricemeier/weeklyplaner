FROM antora/antora AS docs
RUN mkdir -p /antora
WORKDIR /antora
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN ["git", "init", "."]
RUN git config --global user.email "docs@wucheplaner.kibunifu.com"
RUN git config --global user.name "wucheplaner-docs build"
RUN ["touch", ".gitignore"]
RUN ["git", "add", ".gitignore"]
RUN ["git", "commit", "-m", "initialize repository"]
ADD . /antora/docs
WORKDIR /antora/docs
RUN npm ci
RUN ["antora", "antora-playbook.yml"]

FROM pierrezemb/gostatic
COPY --from=docs /antora/docs/build/site /srv/http/