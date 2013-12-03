MOCHA_OPTS= --check-leaks
REPORTER = xunit

test: clean init install test-unit

init: 
	mkdir build
	mkdir build/testResults

install:
	@NODE_PATH=/tmp/node_modules/ npm install

run: install
	@NODE_PATH=/tmp/node_modules/ npm start

test-unit:
	@NODE_PATH=/tmp/node_modules/ \
		NODE_ENV=test \
		mocha \
		--recursive \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS) > build/testResults/mocha.xml
	echo "Test complete..."

test-local:
	@NODE_PATH=/tmp/node_modules/ \
		mocha \
		--recursive \
		--reporter dot \
		$(MOCHA_OPTS)

test-local-w:
	@NODE_PATH=/tmp/node_modules/ \
		mocha \
		--recursive \
		--reporter dot \
		$(MOCHA_OPTS) \
		--watch

test-cov:
	istanbul cover _mocha --  --recursive -R spec
	tar -zcvf coverage.tar.gz coverage

clean:
	rm -rf build
	rm -rf coverage
	rm -f coverage.tar.gz
	rm -f npm-debug.log
	rm -rf /tmp/node_modules

.PHONY: test test-unit test-acceptance benchmark clean