import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { prepareOnUpdate } from 'universal/decorators'
import { getUser } from 'universal/actions/github'
import Loading from 'universal/components/Loading'
import NotFound from 'universal/views/NotFound'
import SearchName from 'universal/components/Search/SearchName'


export class SearchNameContainer extends React.Component {

  static propTypes = {
    github: PropTypes.object.isRequired,
    params: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const { params: { name }, github } = this.props
    const user = github.getIn(['users', name])

    if (!user) {
      return <Loading />
    }

    if (user.get('loading') === false) {
      return <NotFound />
    }

    return <SearchName user={user} />
  }

}

function mapStateToProps(state) {
  return {
    github: state.github
  }
}

function prepare({ store, params: { name } }) {
  return Promise.all([
    store.dispatch(getUser(name, ['login']))
  ])
}

export default connect(mapStateToProps)(prepareOnUpdate(['name'], prepare)(SearchNameContainer))
