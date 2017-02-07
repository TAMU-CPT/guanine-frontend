.PHONY: build
PORT:=10000
NPM:=$(shell which npm)
YARN:=$(shell which yarn)

installer = $(NPM)

ifdef YARN
	installer = $(YARN)
endif

all: run

run: node_modules  ## Run the server
	@echo "********************************"
	@echo "* open http://localhost:10000/ *"
	@echo "********************************"
	./node_modules/.bin/webpack-dev-server --progress --colors --devtool cheap-module-inline-source-map --hot --debug --inline --host 127.0.0.1 --port $(PORT)

build: node_modules  ## Compile a project for deployment
	./node_modules/.bin/webpack  --progress --colors --devtool source-map --optimize-minimize --optimize-dedupe

clean: ## Remove compiled artefacts
	@rm -f build/*

node_modules: package.json
	$(installer) install

.PHONY: help

help:
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
