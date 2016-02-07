import React, { PropTypes } from 'react'
import shallowCompare from 'react/lib/shallowCompare'
import ImmutablePropTypes from 'react-immutable-proptypes'


export default class SearchAll extends React.Component {
  static propTypes = {
    user: ImmutablePropTypes.contains({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired
    })
  };

  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <p><a href={user.get('html_url')} target="_blank">{user.get('login')}</a></p>
        <img src={user.get('avatar_url')} style={{ width: '50px', height: '50px' }} />
      </div>
    )
  }
}
