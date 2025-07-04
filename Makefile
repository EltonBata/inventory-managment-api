# Nome do container Laravel
APP_CONTAINER=inventory-managment-api

setup:
	make build
	make up
	

up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

migrate:
	docker exec $(APP_CONTAINER) php artisan migrate:fresh --force --seed

seed:
	docker exec $(APP_CONTAINER) php artisan db:seed --force

artisan:
	docker exec $(APP_CONTAINER) php artisan $(filter-out $@,$(MAKECMDGOALS))

docker-compose:
	docker-compose $(filter-out $@,$(MAKECMDGOALS))

composer:
	docker exec $(APP_CONTAINER) composer $(filter-out $@,$(MAKECMDGOALS))

bash:
	docker exec -it $(APP_CONTAINER) /bin/bash