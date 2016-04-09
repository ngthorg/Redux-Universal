import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DocumentMeta from 'react-document-meta'
import * as CounterActions from 'universal/actions/counter'
import ImgSlider from 'universal/components/ImgSlider'
import Navbar from 'universal/components/Navbar'


const meta = { title: 'Home' }

export class Home extends React.Component {

  static propTypes = {
    counter: PropTypes.object.isRequired,
    decrement: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired
  };

  render() {
    const { counter, decrement, increment, incrementAsync, incrementIfOdd } = this.props
    return (
      <div className="container container--margtop">
        <DocumentMeta {...meta} />
        <Navbar />
        <h2>Home</h2>
        <p>Clicked: {counter.get('clicked')} times</p>
        <p className="list-button">
          <button type="button" onClick={increment} className="btn btn-primary-outline btn-sm">
            +
          </button>

          <button type="button" onClick={decrement} className="btn btn-danger-outline btn-sm">
            -
          </button>

          <button type="button" onClick={incrementIfOdd} className="btn btn-info-outline btn-sm">
            Increment if odd
          </button>

          <button type="button"
            onClick={() => incrementAsync()}
            className="btn btn-success-outline btn-sm"
          >
            Increment async
          </button>
        </p>
        <p><Link to="/elasticstack">ElastiStack</Link></p>
        <p><Link to="/form">Form</Link></p>
        <ImgSlider
          images={[
            'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fefa5120099237.562e57c552241.jpg',
            'https://mir-s3-cdn-cf.behance.net/project_modules/disp/6d2c4b11613843.560fa91b30afb.jpg',
            'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3396dc30855203.5692e7efed2bd.jpg',
            'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9e611731864083.5664698f7093b.jpg'
          ]}
        />
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
  return bindActionCreators({ ...CounterActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
