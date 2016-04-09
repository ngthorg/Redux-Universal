import React, { PropTypes } from 'react'
import DocumentMeta from 'react-document-meta'
import { routerActions } from 'react-router-redux'
import Navbar from 'universal/components/Navbar'
import Explore from 'universal/components/Search/Explore'


const meta = { title: 'Search' }

class Search extends React.Component {

  static propTypes = {
    children: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props)
    this.handleGoBack = this.handleGoBack.bind(this)
  }

  handleGoBack() {
    const { store } = this.context
    store.dispatch(routerActions.goBack())
  }

  render() {
    const { children, ...props } = this.props
    return (
      <div className="container container--margtop">
        <DocumentMeta {...meta} />
        <Navbar />
        <div className="container__header">
          <i className="ion-ios-arrow-thin-left" onClick={this.handleGoBack} />
        </div>
        <Explore {...props} />
        {children && React.cloneElement(children, { ...props })}
      </div>
    )
  }

}


export default Search
