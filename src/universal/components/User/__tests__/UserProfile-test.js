import React from 'react';
import { fromJS } from 'immutable';
import { shallow, render } from 'enzyme';
import UserProfile from '../UserProfile';

jest.unmock('../UserProfile');

describe('components: <UserProfile />', () => {
  const dataProps = {
    avatar_url: 'https://avatars.githubusercontent.com/u/4083429?v=3',
    login: 'ngthorg',
  };
  const userProps = fromJS(dataProps);

  it('renders two ".text-center"', () => {
    const wrapper = shallow(<UserProfile user={userProps} />);
    expect(wrapper.find('.text-center')).toHaveLength(2);
    expect(wrapper.find('h4').hasClass('text-center')).toEqual(true);
    expect(wrapper.find('div.text-center')).toHaveLength(1);
  });

  it('renders an <p>', () => {
    const wrapper = shallow(<UserProfile user={userProps} />);
    expect(wrapper.find('p').text()).toContain('ngthorg');
    expect(wrapper.contains(<h4 className="text-center">User github!</h4>)).toEqual(true);
  });

  xit('renders an <img>', () => {
    const wrapper = shallow(<UserProfile user={userProps} />);
    expect(wrapper.contains(
      <img alt="avatar" src={dataProps.avatar_url} style={{ width: '50px', height: '50px' }} />
    )).toEqual(true);

    // expect(wrapper.find('img')).to.have.attr('src', dataProps.avatar_url);
    // expect(wrapper.find('img')).to.have.attr('style', 'width:50px;height:50px;');
    expect(wrapper.find('img')).toHaveStyle('width', '50px');
    expect(wrapper.find('img')).toHaveStyle('height', '50px');
  });

  it('renders an <a>', () => {
    const wrapper = render(<UserProfile user={userProps} />);
    expect(wrapper.find('a').text()).toContain('go Home!');
  });
});
