MOCHA_OPTS= --check-leaks
MOCHA_SCRIPT = ./node_modules/.bin/mocha
REPORTER = xunit-file
XUNIT_ENV = XUNIT_FILE=build/testResults/mocha.xml LOG_XUNIT=true
STYLE_SCRIPT= jshint

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
		$(XUNIT_ENV) \
		NODE_ENV=test \
		$(MOCHA_SCRIPT) \
		--recursive \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)
	echo ">> Test complete..."

test-local:
	@NODE_PATH=/tmp/node_modules/ \
		$(MOCHA_SCRIPT) \
		--recursive \
		--reporter dot \
		$(MOCHA_OPTS)

test-local-w:
	@NODE_PATH=/tmp/node_modules/ \
		$(MOCHA_SCRIPT) \
		--recursive \
		--reporter dot \
		$(MOCHA_OPTS) \
		--watch

test-cov:
	istanbul cover _mocha --  --recursive -R spec
	tar -zcvf coverage.tar.gz coverage

# http://jshint.com/docs/options/
test-style:
	echo ">> Starting style check"
	$(STYLE_SCRIPT) app.js
	$(STYLE_SCRIPT) test
	$(STYLE_SCRIPT) routes
	$(STYLE_SCRIPT) lib
	$(STYLE_SCRIPT) models

clean:
	rm -rf build
	rm -rf coverage
	rm -f coverage.tar.gz
	rm -f npm-debug.log
	rm -rf /tmp/node_modules

.PHONY: test test-unit test-acceptance benchmark clean
