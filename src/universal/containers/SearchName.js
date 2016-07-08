import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { prepareOnUpdate } from '../decorators';
import { getUser } from '../actions/github';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import SearchName from '../components/Search/SearchName';

export const SearchNameContainer = (props) => {
  const { params: { name }, github } = props;
  const user = github.getIn(['users', name]);

  if (!user) {
    return <Loading />;
  }

  if (user.get('loading') === false) {
    return <NotFound />;
  }

  return <SearchName user={user} />;
};

SearchNameContainer.propTypes = {
  github: PropTypes.object.isRequired,
  params: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    github: state.github,
  };
}

function prepare({ store, params: { name } }) {
  return Promise.all([
    store.dispatch(getUser(name, ['login'])),
  ]);
}

export default connect(mapStateToProps)(prepareOnUpdate(['name'], prepare)(SearchNameContainer));
