import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { prepareRoute } from 'universal/decorators'
import { getUser } from 'universal/actions/github'
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

export default class Counter extends React.Component {

	static propTypes = {
		github: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired
	}

  render() {
		const { params: { name }, github } = this.props
		const user = github.users[name]

		if(!user) {
			return <Loading />
		}

    return (
      <div className="container">
				<DocumentMeta {...meta} />
        <h4 className="text-center">User github!</h4>
				{user.login}
        <div className="text-center">
					<Link to="/">go Home!</Link>
				</div>
      </div>
    )
  }

}
