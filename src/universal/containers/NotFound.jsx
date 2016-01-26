import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { routeActions } from 'react-router-redux'


const meta = { title: '404 Not Found!' }

@connect()


export default class NotFound extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props)
	}

	handleClick() {
		const { dispatch } = this.props
		dispatch(routeActions.push('/'))
	}

  render() {
    return (
      <div className="container">
				<DocumentMeta {...meta} />
        <h4 className="text-center">404 Not Found!</h4>
        <div className="text-center">
					<button type="button" onClick={::this.handleClick} className="btn btn-primary-outline btn-sm">Go Home!</button>
        </div>
      </div>
    )
  }

}
