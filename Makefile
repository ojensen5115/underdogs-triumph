all :
	docker build -t underdog:latest . && docker run -p 3000:3000 -p 3001:3001 -v "$(PWD):/srv/jekyll" -it underdog gulp

docker :
	docker build -t underdog:latest .

run :
	docker run -p 3000:3000 -p 3001:3001 -v "$(PWD):/srv/jekyll" -it underdog gulp

build:
	docker run -v "$(PWD):/srv/jekyll" -it underdog gulp build

js :
	docker run -v "$(PWD):/srv/jekyll" -it underdog gulp js

img :
	docker run -v "$(PWD):/srv/jekyll" -it underdog gulp img

clean :
	docker run -v "$(PWD):/srv/jekyll" -it underdog gulp clean

deploy :
	docker run -v "$(PWD):/srv/jekyll" -it underdog gulp deploy

bash :
	docker run -p 3000:3000 -p 3001:3001 -v "$(PWD):/srv/jekyll" -it underdog bash
