run:
	cd react && make build
	cargo run test-images

build:
	cd react && make build
	cargo build

fast-run:
	cargo run test-images

deps:
	sudo apt update
	sudo apt install libvips-dev -y
