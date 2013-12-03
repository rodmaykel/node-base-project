MOCHA_OPTS= --check-leaks
REPORTER = xunit
STYLE_SCRIPT= scripts/jsstyle/jsstyle -o leading-comma-ok,doxygen

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
	echo ">> Test complete..."

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

test-style:
	echo ">> Starting style check"
	$(STYLE_SCRIPT) app.js
#	$(STYLE_SCRIPT) routes/*.js
#	$(STYLE_SCRIPT) test/*.js
#	$(STYLE_SCRIPT) lib/*.js
#	$(STYLE_SCRIPT) models/*.js

clean:
	rm -rf build
	rm -rf coverage
	rm -f coverage.tar.gz
	rm -f npm-debug.log
	rm -rf /tmp/node_modules

.PHONY: test test-unit test-acceptance benchmark clean