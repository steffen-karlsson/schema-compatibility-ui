.PHONY: clean build build-no-test help

clean:
	@echo "Cleaning..."
	./mvnw clean

build:
	@echo "Building..."
	./mvnw clean install

build-no-test:
	@echo "Building..."
	./mvnw clean install -DskipTests

build-docker:
	@echo "Building Docker image..."
	$(MAKE) -C ./api build-docker

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  all               		Run all tests, lint and build the application"
	@echo "  build             		Build the application"
	@echo "  build-no-test     		Build the application without running tests"
	@echo "  build-docker      		Build the Docker image"
	@echo "  clean             		Clean the application"
