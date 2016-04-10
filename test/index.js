const chai = require('chai');

const morningstar = require('..');

const expect = chai.expect;

chai.config.truncateThreshold = 0;

const VTI_EXPECTED_HISTORICAL = require('../static/vti-response.json');

describe('morningstar-node', () => {

  describe('#historical', () => {
    it('should return historical values for VTI', () => {
      return morningstar.historical({
        symbol : 'VTI',
        from   : '2015-03-24',
        to     : '2015-03-26'
      }).then((result) => {
        expect(result).to.deep.equal(VTI_EXPECTED_HISTORICAL);
      });
    });
  });

  describe('#dividends', () => {
    it('should return historical dividends for VTI', () => {
      return morningstar.dividend({
        symbol : 'VTI',
        from   : '2015-03-24',
        to     : '2015-03-26'
      }).then((result) => {
        expect(result).to.deep.equal([{
          date   : '2015-03-25',
          amount : 0.5080,
          type   : 'dividend'
        }]);
      });
    });
  });

});
