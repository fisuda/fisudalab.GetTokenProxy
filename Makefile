curdir = $(shell pwd)
cname = gettokenproxy
container = fisuda/gettokenproxy
port = -p 8000:8000
vol = -v $(curdir)/config.js:/config.js  -v /etc/localtime:/etc/localtime:ro

build:
	docker build --no-cache -t $(container) .
run:
	docker run -d --name $(cname) $(port) $(vol) $(container)
debug:
	docker run --rm -it --name $(cname) --entrypoint=sh $(port) $(vol) $(container)
exec:
	docker exec -it $(cname) sh
stop:
	docker stop $(cname)
rm:
	docker rm $(cname)
logs:
	docker logs $(cname)

