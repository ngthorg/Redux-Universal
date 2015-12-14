import React, { PropTypes } from 'react'
import { Link } from 'react-router'


export default class App extends React.Component {

  static contextTypes = {
  	history: PropTypes.object.isRequired
  }

  render() {
    return this.props.children
  }

}
