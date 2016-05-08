import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';


function UserProfile(props) {
  return (
    <div>
      <h4 className="text-center">User github!</h4>
      <p>{props.user.get('login')}</p>
      <Link to="/user/ngthorg">ngthorg!</Link>
      <Link to="/user/rackt">rackt!</Link>
      <img
        alt="avatar"
        src={props.user.get('avatar_url')}
        style={{ width: '50px', height: '50px' }}
      />
      <div className="text-center">
        <Link to="/">go Home!</Link>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: ImmutablePropTypes.contains({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }),
};

export default UserProfile;
