DOCKER_RUN=docker run -it -u $$(id -u):$$(id -g) -v ${PWD}:/build -w /build 
DOCKER_IMAGE=node:latest


build:
	$(DOCKER_RUN) $(DOCKER_IMAGE) npm run build

.PHONY: build

run:
	$(DOCKER_RUN) -p 3000:3000 $(DOCKER_IMAGE) npm start

shell:
	$(DOCKER_RUN) $(DOCKER_IMAGE) bash
