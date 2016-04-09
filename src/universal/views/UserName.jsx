import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { prepareRoute } from 'universal/decorators'
import { getUser } from 'universal/actions/github'
import Navbar from 'universal/components/Navbar'
import Loading from 'universal/components/Loading'
import UserProfile from 'universal/components/User/UserProfile'


const meta = { title: 'User Name' }

export class UserName extends React.Component {

  static propTypes = {
    github: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      const { dispatch, params: { name } } = nextProps
      dispatch(getUser(name, ['login']))
    }
  }

  render() {
    const { params: { name }, github } = this.props
    const user = github.getIn(['users', name])

    if (!user) {
      return <Loading />
    }

    return (
      <div className="container container--margtop">
        <DocumentMeta {...meta} />
        <Navbar />
        <UserProfile user={user} />
      </div>
    )
  }

}


function mapStateToProps(state) {
  return {
    github: state.github
  }
}

function prepare({ store, params }) {
  const { name } = params

  return Promise.all([
    store.dispatch(getUser(name, ['login']))
  ])
}

export default connect(mapStateToProps)(prepareRoute(prepare)(UserName))
