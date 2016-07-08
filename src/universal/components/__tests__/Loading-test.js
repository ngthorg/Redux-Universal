import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';

jest.unmock('../Loading');

describe('components: <Loading />', () => {
  it('renders an ".progress-bar"', () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper.is('.progress-bar')).toBe(true);
    expect(wrapper.find('.progress-bar')).toHaveLength(1);
  });
});
