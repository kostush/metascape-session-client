DOCKER_COMPOSE_DEV ?= docker-compose -f docker-compose.dev.test.yml -f docker-compose.redis.test.yml
EXEC_SERVICE ?= docker exec -ti session_client_test

env: ## Create env file
	copy .env.dist .env

##
## NPM
## -----------------
##
npm-install: ## Update vendors
	$(EXEC_SERVICE) npm install

npm-start: ## Run prod server
	$(EXEC_SERVICE) npm run start

npm-start-dev: ## Run dev server
	$(EXEC_SERVICE) npm run start:dev

npm-start-debug: ##  Run debug server
	$(EXEC_SERVICE) npm run start:debug

npm-build: ## Build app
	$(EXEC_SERVICE) npm run build

npm-lint: ## Check code style
	$(EXEC_SERVICE) npm run lint

npm-lint-fix: ## Fix code style
	$(EXEC_SERVICE) npm run lint:fix

npm-test: ## Run test
	$(EXEC_SERVICE) npm run test

npm-test-cov: ## Run test coverage
	$(EXEC_SERVICE) npm run test:cov

npm-test-debug: ## Run test
	$(EXEC_SERVICE) npm run test:debug
##
## Docker compose dev
## -----------------
##
dockers-build: ## Build project containers
	$(DOCKER_COMPOSE_DEV) build

dockers-start: ## Create and start project containers
	$(DOCKER_COMPOSE_DEV) up

dockers-start-d: ## Create and start project containers in background
	$(DOCKER_COMPOSE_DEV) up -d

dockers-status: ## Check status of project containers
	$(DOCKER_COMPOSE_DEV) ps

dockers-stop: ## Stop project containers
	$(DOCKER_COMPOSE_DEV) stop

dockers-restart: ## Restart project containers
	$(DOCKER_COMPOSE_DEV) restart

dockers-down: ## Stop and remove project containers, networks, images
	$(DOCKER_COMPOSE_DEV) down

dockers-logs: ## View output from project containers
	$(DOCKER_COMPOSE_DEV) logs

dockers-bash: ## Enter in container with the terminal
	${EXEC_SERVICE} sh