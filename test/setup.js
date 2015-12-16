require("babel-core/register");
require("babel-polyfill");

import chai from 'chai';
import chaiImmutable from 'chai-immutable';


chai.use(chaiImmutable);
