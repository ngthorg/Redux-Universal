import React, { PropTypes } from 'react'
import DocumentMeta from 'react-document-meta'
import { routeActions } from 'react-router-redux'


const meta = { title: '404 Not Found!' }

export default class NotFound extends React.Component {
  static contextTypes = {
    store: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { store } = this.context
    store.dispatch(routeActions.push('/'))
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta {...meta} />
        <h4 className="text-center">404 Not Found!</h4>
        <div className="text-center">
          <button
            type="button"
            onClick={this.handleClick}
            className="btn btn-primary-outline btn-sm"
          >
            Go Home!
          </button>
        </div>
      </div>
    )
  }

}
