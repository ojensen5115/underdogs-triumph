all :
	docker build -t underdog:latest . && docker run -p 3000:3000 -p 3001:3001 -v "$(shell pwd):/srv/jekyll" -it underdog bundle exec gulp

docker :
	docker build -t underdog:latest .

run :
	docker run -p 3000:3000 -p 3001:3001 -v "$(shell pwd):/srv/jekyll" -it underdog bundle exec gulp

build:
	docker run -v "$(shell pwd):/srv/jekyll" -it underdog bundle exec gulp build

js :
	docker run -v "$(shell pwd):/srv/jekyll" -it underdog bundle exec gulp js

img :
	docker run -v "$(shell pwd):/srv/jekyll" -it underdog bundle exec gulp img

clean :
	docker run -v "$(shell pwd):/srv/jekyll" -it underdog bundle exec gulp clean

deploy :
	docker run -v "$(shell pwd):/srv/jekyll" -it underdog bundle exec gulp deploy

bash :
	docker run -p 3000:3000 -p 3001:3001 -v "$(shell pwd):/srv/jekyll" -it underdog bash
