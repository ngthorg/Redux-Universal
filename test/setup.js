require('babel/register')({
	stage: 0
});
import chai from 'chai';
import chaiImmutable from 'chai-immutable';


chai.use(chaiImmutable);
