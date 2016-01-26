import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { prepareRoute } from 'universal/decorators'
import { getUser } from 'universal/actions/github'
import User from 'universal/components/User'
import Loading from 'universal/components/Loading'

let meta = { title: 'Counter' }

@prepareRoute(async function ({ store, params }) {
	const { name } = params

	return await Promise.all([
		store.dispatch(getUser(name, [ 'login' ]))
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

  render() {
		const { params: { name }, github } = this.props
		const user = github.getIn([ 'users', name ])

		if(!user) {
			return <Loading />
		}

    return (
      <div className="container">
				<DocumentMeta {...meta} />
				<User user={user} />
      </div>
    )
  }

}
