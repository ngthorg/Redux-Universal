/* eslint no-console:0 */
import React, { PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { routerActions } from 'react-router-redux';
import FormTest from '../components/FormTest';


const meta = { title: 'Form Test' };

class FormContainer extends React.Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    const { store } = this.context;
    store.dispatch(routerActions.push('/'));
  }

  handleSubmit(data) {
    console.log('handleSubmit', data);
  }

  render() {
    return (
      <div className="container container--margtop">
        <DocumentMeta {...meta} />
        <button
          type="button"
          onClick={this.handleClick}
          className="btn btn-success-outline btn-sm"
        >
          <i className="ion-ios-arrow-thin-left" />
        </button>
        <FormTest onSubmit={this.handleSubmit} route={this.props.route} />
      </div>
    );
  }

}

export default FormContainer;
