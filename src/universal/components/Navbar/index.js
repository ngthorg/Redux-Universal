import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { routerActions } from 'react-router-redux';


export default class Navbar extends React.Component {

  static contextTypes = {
    store: PropTypes.any.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleClickSearch() {
    const { store } = this.context;
    store.dispatch(routerActions.push('/search'));
  }

  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-light bg--white">
        <Link className="navbar-brand" to="/">Example</Link>
        <div className="pull-right" onClick={this.handleClickSearch}>
          <i className="ion-ios-search" />
        </div>
      </nav>
    );
  }

}
