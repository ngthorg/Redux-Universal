import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Navbar from '../index';

jest.unmock('../index');

describe('components: <Navbar />', () => {
  it('renders click icon to serach"', () => {
    const store = {
      dispatch: sinon.spy(),
    };
    const wrapper = shallow(
      <Navbar />,
      { context: { store } },
    );

    expect(wrapper.find('.navbar')).toHaveLength(1);
    expect(wrapper.find('.pull-right')).toHaveLength(1);
    expect(store.dispatch.calledOnce).toEqual(false);
    wrapper.find('.pull-right').simulate('click');
    expect(store.dispatch.calledOnce).toEqual(true);
  });
});
