FROM ubuntu

RUN apt-get update
RUN apt-get install -y ruby ruby-dev build-essential

RUN apt-get install -y nodejs npm


RUN mkdir -p /srv/jekyll
WORKDIR /srv/jekyll

RUN npm install --global gulp-cli

RUN gem install jekyll bundler

ADD Gemfile .
RUN bundle install

WORKDIR /srv
ADD package.json .
#ADD package-lock.json .
RUN npm install

WORKDIR /srv/jekyll

#CMD pwd && ls -a && gulp
CMD bash