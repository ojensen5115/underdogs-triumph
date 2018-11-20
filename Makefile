build :
	docker build -t underdog:latest .

bash :
	docker run -p 3000:3000 -p 3001:3001 -v "$(PWD)/src:/srv/jekyll" -it underdog bash

run :
	docker run -p 3000:3000 -p 3001:3001 -v "$(PWD)/src:/srv/jekyll" -it underdog gulp

js :
	docker run -v "$(PWD)/src:/srv/jekyll" -it underdog gulp js

