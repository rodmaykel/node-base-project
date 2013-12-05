MOCHA_OPTS= --check-leaks
MOCHA_SCRIPT = ./node_modules/.bin/mocha
REPORTER = xunit-file
XUNIT_ENV = XUNIT_FILE=build/testResults/mocha.xml LOG_XUNIT=true
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

test-style:
	echo ">> Starting style check"
	$(STYLE_SCRIPT) app.js
#	find test -type f -name "*.js" -exec $(STYLE_SCRIPT) {} +
#	find routes -type f -name "*.js" -exec $(STYLE_SCRIPT) {} +
#	find lib -type f -name "*.js" -exec $(STYLE_SCRIPT) {} +
#	find models -type f -name "*.js" -exec $(STYLE_SCRIPT) {} +

clean:
	rm -rf build
	rm -rf coverage
	rm -f coverage.tar.gz
	rm -f npm-debug.log
	rm -rf /tmp/node_modules

.PHONY: test test-unit test-acceptance benchmark clean
