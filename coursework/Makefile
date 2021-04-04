CURRENT_DIRECTORY := $(shell pwd)

ifndef DC_FILE
	DC_FILE := docker-compose.yml
endif

DC_CMD = docker-compose -f ${DC_FILE}

up:
	$(DC_CMD) up

down:
	$(DC_CMD) down