import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DocumentMeta from 'react-document-meta'

const meta = {
	title: "404 Not Found!"
};

export default class NotFound extends React.Component {

  render() {
    return (
      <div className='container'>
	      <DocumentMeta {...meta} />
        <h4 className="text-center">404 Not Found!</h4>
        <div className="text-center">
        	<Link to="/">Go home!</Link>
        </div>
      </div>
    );
  }

}
