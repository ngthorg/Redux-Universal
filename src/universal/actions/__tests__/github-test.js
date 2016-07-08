/* global jasmine:true */
import { fromJS } from 'immutable';
import configureMockStore from 'redux-mock-store';
import * as types from '../../constants/ActionTypes';
import * as githubActions from '../github';
import promiseMiddleware from '../../lib/promiseMiddleware';

jest.unmock('../github');
jest.unmock('../../constants/ActionTypes');
jest.unmock('../../lib/promiseMiddleware');

const middlewares = [promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const data = {
  login: 'ngthorg',
  id: 4083429,
  avatar_url: 'https://avatars.githubusercontent.com/u/4083429?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/ngthorg',
  html_url: 'https://github.com/ngthorg',
  followers_url: 'https://api.github.com/users/ngthorg/followers',
  following_url: 'https://api.github.com/users/ngthorg/following{/other_user}',
  gists_url: 'https://api.github.com/users/ngthorg/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/ngthorg/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/ngthorg/subscriptions',
  organizations_url: 'https://api.github.com/users/ngthorg/orgs',
  repos_url: 'https://api.github.com/users/ngthorg/repos',
  events_url: 'https://api.github.com/users/ngthorg/events{/privacy}',
  received_events_url: 'https://api.github.com/users/ngthorg/received_events',
  type: 'User',
  site_admin: false,
  name: 'NgThong',
  company: 'techcomio',
  blog: null,
  location: 'Hà Nội, Việt Nam',
  email: 'ngthorg@gmail.com',
  hireable: true,
  bio: null,
  public_repos: 23,
  public_gists: 7,
  followers: 15,
  following: 82,
  created_at: '2013-04-07T10:17:40Z',
  updated_at: '2016-07-08T01:12:38Z',
};

xdescribe('actions: github', () => {
  it('should fetchUser', (done) => {
    const expectedActions = [
      { type: types.GET_USER_REQUEST, user: data.login },
      { type: types.GET_USER_SUCCESS, data, status: 200, user: data.login },
    ];
    const store = mockStore({});

    store.dispatch(githubActions.fetchUser(data.login))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should getUser', (done) => {
    const datatest = fromJS({
      users: {},
    });
    const expectedActions = [
      { type: types.GET_USER_REQUEST, user: data.login },
      { type: types.GET_USER_SUCCESS, data, status: 200, user: data.login },
    ];
    const fn = githubActions.getUser(data.login, ['login']);
    const getState = () => ({ github: datatest });
    const store = mockStore(getState);

    expect(fn).toBeFunction();

    store.dispatch(fn)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .then(done)
      .catch(done.fail);
  });
});
