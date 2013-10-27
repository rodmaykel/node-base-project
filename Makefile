MOCHA_OPTS= --check-leaks
REPORTER = xunit

test: clean run test-unit

init: 
	mkdir build
	mkdir build/testResults

run: init
	@NODE_PATH=/tmp/node_modules/ npm install

test-unit:
	@NODE_PATH=/tmp/node_modules/ \
		NODE_ENV=test \
		mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS) > build/testResults/mocha.xml
	echo "Test complete..."

test-local:
	@NODE_PATH=/tmp/node_modules/ \
		mocha \
		--reporter dot \
		$(MOCHA_OPTS)

clean:
	rm -rf build
	rm -rf /tmp/node_modules

.PHONY: test test-unit test-acceptance benchmark clean