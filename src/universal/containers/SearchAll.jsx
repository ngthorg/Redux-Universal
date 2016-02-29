import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { prepareOnUpdate } from 'universal/decorators'
import { getUser } from 'universal/actions/github'
import Loading from 'universal/components/Loading'
import SearchAll from 'universal/components/SearchAll'


@prepareOnUpdate(['text'], async ({ store, params: { text } }) => Promise.all([
  store.dispatch(getUser(text, ['login']))
]))

@connect((state) => ({
  github: state.github
}))

export default class SearchAllContainer extends React.Component {

  static propTypes = {
    github: PropTypes.object.isRequired,
    params: PropTypes.shape({
      text: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const { params: { text }, github } = this.props
    const user = github.getIn(['users', text])

    if (!user) {
      return (
        <Loading />
      )
    }

    if (user.get('loading') === false) {
      return (
        <div>
          NotFound
        </div>
      )
    }

    return (
      <SearchAll user={user} />
    )
  }

}
