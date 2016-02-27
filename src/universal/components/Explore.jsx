import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { routeActions } from 'react-router-redux'
import shallowCompare from 'react/lib/shallowCompare'
import shallowEqual from 'react-redux/lib/utils/shallowEqual'


export default class Explore extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      text: PropTypes.string
    }).isRequired
  };

  static contextTypes = {
    store: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.state = {
      search: props.params.text
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props.params, nextProps.params)) {
      this.setState({
        search: nextProps.params.text
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  getInputValue() {
    return findDOMNode(this.refs.search).value
  }

  handleOnChange() {
    this.setState({
      search: this.getInputValue()
    })
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleSearchClick()
    }
  }

  handleSearchClick() {
    this.handleSearch(this.getInputValue())
  }

  handleSearch(value) {
    if (value) {
      const { store } = this.context
      store.dispatch(routeActions.push(`/search/${value}`))
    }
  }

  render() {
    return (
      <div className="input-group input-group-sm">
        <input
          ref="search"
          type="text"
          autoFocus
          placeholder="Search username github"
          className="form-control"
          value={this.state.search}
          onKeyUp={this.handleKeyUp}
          onChange={this.handleOnChange}
        />
        <span className="input-group-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSearchClick}
          >
            Search
          </button>
        </span>
      </div>
    )
  }

}
