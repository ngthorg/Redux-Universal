import React from 'react';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';


const meta = { title: 'Not Found!' };

const NotFound = () => (
  <div className="container">
    <DocumentMeta {...meta} />
    <h4 className="text-center">404 page Not Found!</h4>
    <div className="text-center">
      <Link className="btn btn-primary-outline btn-sm" to="/">Go to home</Link>
    </div>
  </div>
);

export default NotFound;
