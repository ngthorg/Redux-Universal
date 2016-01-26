import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ImmutablePropTypes from 'react-immutable-proptypes'


export default class User extends React.Component {

	static propTypes = {
		user: ImmutablePropTypes.contains({
			login: PropTypes.string.isRequired,
			avatar_url: PropTypes.string.isRequired
		})
	};

	render() {
		const { user } = this.props

		return (
			<div>
				<h4 className="text-center">User github!</h4>
				<p>{user.get('login')}</p>
				<img src={user.get('avatar_url')} style={{ width: '50px', height: '50px' }} />
				<div className="text-center">
					<Link to="/">go Home!</Link>
				</div>
			</div>
		)
	}

}
