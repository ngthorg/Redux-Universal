import 'babel-polyfill'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import chaiImmutable from 'chai-immutable'


chai.use(chaiEnzyme())
chai.use(chaiImmutable)

// function setupDom() {
//   if (typeof document !== 'undefined') {
//     return
//   }
//
//   global.document = jsdom.jsdom('<html><body></body></html>')
//   global.window = document.defaultView
//   global.navigator = window.navigator
// }
//
// setupDom()
