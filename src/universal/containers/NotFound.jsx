import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { pushPath, replacePath } from 'redux-simple-router'


const meta = {
	title: "404 Not Found!"
};

@connect()

export default class NotFound extends React.Component {

	handleClick = (e) => {
		const { dispatch } = this.props

		dispatch(pushPath('/'))
	}

  render() {
    return (
      <div className='container'>
	      <DocumentMeta {...meta} />
        <h4 className="text-center">404 Not Found!</h4>
        <div className="text-center">
					<button type="button" onClick={this.handleClick} className="btn btn-primary-outline btn-sm">Go Home!</button>
        </div>
      </div>
    );
  }

}
