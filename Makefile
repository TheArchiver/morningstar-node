MOCHA = node_modules/.bin/mocha
XYZ = node_modules/.bin/xyz --repo git@github.com:rbuckheit/morningstar-node.git

TESTS = $(find test -name *.js)


.PHONY: install
install:
	npm install


.PHONY: test
test:
	$(MOCHA) -- $(TESTS)


.PHONY: release-major release-minor release-patch
release-major release-minor release-patch:
	@$(XYZ) --increment $(@:release-%=%)
