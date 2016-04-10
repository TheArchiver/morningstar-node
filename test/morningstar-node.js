const chai = require('chai');

const morningstar = require('..');

const expect = chai.expect;

chai.config.truncateThreshold = 0;

const VTI_EXPECTED_HISTORICAL = require('../static/vti-response.json');

describe('morningstar-node', () => {

  describe('#historical', () => {
    it('should return historical values for VTI', () => {
      return morningstar.historical({
        ticker: 'VTI',
        from: '2015-03-24',
        to: '2015-03-26'
      }).then((result) => {
        expect(result).to.deep.equal(VTI_EXPECTED_HISTORICAL);
      });
    });
  });

});
