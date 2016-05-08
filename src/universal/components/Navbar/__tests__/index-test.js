import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Navbar from '../index';


describe('components: <Navbar />', () => {
  it('renders click icon to serach"', () => {
    const store = {
      dispatch: sinon.spy(),
    };
    const wrapper = shallow(
      <Navbar />,
      { context: { store } },
    );

    expect(wrapper.find('.navbar')).to.have.length(1);
    expect(wrapper.find('.pull-right')).to.have.length(1);
    expect(store.dispatch.calledOnce).to.equal(false);
    wrapper.find('.pull-right').simulate('click');
    expect(store.dispatch.calledOnce).to.equal(true);
  });
});
