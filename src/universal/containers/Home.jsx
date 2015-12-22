import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DocumentMeta from 'react-document-meta'
import * as CounterActions from 'universal/actions/counter'
import { pushPath } from 'redux-simple-router'


const meta = {
	title: "Home"
};

class Home extends React.Component {

  render () {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div className='container'>
        <DocumentMeta {...meta} />
        <h2>Home</h2>
        <p>Clicked: {counter.clicked} times</p>
        <p className='list-button'>
          <button type="button" onClick={increment} className="btn btn-primary-outline btn-sm">+</button>
          <button type="button" onClick={decrement} className="btn btn-danger-outline btn-sm">-</button>
          <button type="button" onClick={incrementIfOdd} className="btn btn-info-outline btn-sm">Increment if odd</button>
          <button type="button" onClick={() => incrementAsync()} className="btn btn-success-outline btn-sm">Increment async</button>
        </p>
	      <p><Link to="/user/ngthorg">ngthorg</Link></p>
	      <p><Link to="/user/rackt">rackt</Link></p>
      </div>
    )
  }

}


function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
