MOCHA = node_modules/.bin/mocha
XYZ = node_modules/.bin/xyz --repo git@github.com:rbuckheit/morningstar-node.git


.PHONY: install
install:
	npm install


.PHONY: release-major release-minor release-patch
release-major release-minor release-patch:
	@$(XYZ) --increment $(@:release-%=%)
