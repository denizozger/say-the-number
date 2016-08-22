const 
	expect = chai.expect;

describe('Speak the number tests', function() {

  describe('Unit tests', function() {

    it('should throw an error when input is less than minimum limit', function() {
      expect(function() { say(-1); }).to.throw(Error);
      expect(function() { say(Math.min()); }).to.throw(Error);
    });

    it('should throw an error when input is less than maximum limit', function() {
      expect(function() { say(1000000000); }).to.throw(Error);
      expect(function() { say(Math.max()); }).to.throw(Error);
    });

    it('should render "0"', function() {
      expect(say(0)).to.equal('zero');
    });

    it('should render "1"', function() {
    	expect(say(1)).to.equal('one');
    });

    it('should render "21"', function() {
    	expect(say(21)).to.equal('twenty one');
    });

    it('should render "105"', function() {
    	expect(say(105)).to.equal('one hundred and five');
    });

    it('should render "123"', function() {
    	expect(say(123)).to.equal('one hundred and twenty three');
    });

    it('should render "1005"', function() {
    	expect(say(1005)).to.equal('one thousand and five');
    });

    it('should render "1042"', function() {
    	expect(say(1042)).to.equal('one thousand and forty two');
    });

    it('should render "1105"', function() {
    	expect(say(1105)).to.equal('one thousand one hundred and five');
    });

    it('should render "100345"', function() {
      expect(say(100345)).to.equal('one hundred thousand three hundred and forty five');
    });

    it('should render "1000001"', function() {
      expect(say(1000001)).to.equal('one million and one');
    });

    it('should render "56945781"', function() {
    		expect(say(56945781)).to.equal('fifty six million nine hundred and forty five ' + 
    			'thousand seven hundred and eighty one');
    });

    it('should render "999999999"', function() {
    		expect(say(999999999)).to.equal('nine hundred and ninety nine million nine' + 
    			' hundred and ninety nine thousand nine hundred and ninety nine');
    });

  });

});