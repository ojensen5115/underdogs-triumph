FROM node

# RUN apk update
# RUN apk add ruby ruby-dev make g++

RUN apt-get update && apt-get dist-upgrade -y
RUN apt-get install -y ruby ruby-dev build-essential

RUN mkdir -p /srv/jekyll
WORKDIR /srv/jekyll

RUN npm install --global gulp-cli

RUN gem install jekyll bundler

ADD Gemfile .
RUN bundle install

WORKDIR /srv
ADD package.json .
ADD package-lock.json .
RUN npm install

WORKDIR /srv/jekyll
CMD gulp