import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Explore from '../Explore';

jest.unmock('../Explore');

describe('components: <Explore />', () => {
  const dispatch = sinon.spy();
  const store = { dispatch };
  const params = { text: '' };
  const wrapper = mount(
    <Explore params={params} />,
    { context: { store } }
  );

  it('renders input', () => {
    const textChange = 'My new value';

    expect(wrapper.state('search')).toEqual(params.text);
    wrapper.find('input').get(0).value = textChange;
    wrapper.find('input').simulate('change', { target: { value: textChange } });
    expect(wrapper.state('search')).toEqual(textChange);
    expect(wrapper.find('input').get(0).value).toEqual(textChange);
  });

  it('renders button', () => {
    expect(dispatch.calledOnce).toEqual(false);
    wrapper.find('button').simulate('click');
    expect(dispatch.calledOnce).toEqual(true);
  });
});
