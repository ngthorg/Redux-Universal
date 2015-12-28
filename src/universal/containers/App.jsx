import React, { PropTypes } from 'react'


export default class App extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  static contextTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    return this.props.children
  }

}
