import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { prepareRoute } from 'universal/decorators'
import { getUser } from 'universal/actions/github'
import User from 'universal/components/User'
import Navbar from 'universal/components/Navbar'
import Loading from 'universal/components/Loading'


const meta = { title: 'Counter' }

@prepareRoute(async ({ store, params }) => {
  const { name } = params

  return await Promise.all([
    store.dispatch(getUser(name, ['login']))
  ])
})

@connect(state => ({
  github: state.github
}))

export default class UserContainer extends React.Component {
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
        <User user={user} />
      </div>
    )
  }

}
