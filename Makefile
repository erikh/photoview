run:
	cd react && make build
	cargo run test-images

build:
	cd react && make build
	cargo build

fast-run:
	cargo run test-images
