import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ImgSlider from '../index';

jest.dontMock('../index');

describe('components: <ImgSlider />', () => {
  const images = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fefa5120099237.562e57c552241.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/6d2c4b11613843.560fa91b30afb.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3396dc30855203.5692e7efed2bd.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9e611731864083.5664698f7093b.jpg',
  ];

  it('renders .img-slider__indicator-item', () => {
    const wrapper = shallow(<ImgSlider images={images} />);
    expect(wrapper.find('.img-slider__indicator-item')).toHaveLength(images.length);
    expect(wrapper.state('current')).toEqual(0);
    wrapper.find('.img-slider__indicator-item').at(1).simulate('click');

    expect(wrapper.state('current')).toEqual(1);
  });

  it('renders .img-slider__item', () => {
    const preventDefault = sinon.spy();
    const wrapper = shallow(<ImgSlider images={images} />);

    expect(wrapper.find('.img-slider__item')).toHaveLength(4);
    expect(preventDefault.calledOnce).toEqual(false);
    expect(wrapper.state('showLightBox')).toEqual(false);

    wrapper.find('.img-slider__item img').at(1).simulate('click', { preventDefault });

    expect(preventDefault.calledOnce).toEqual(true);
    expect(wrapper.state('showLightBox')).toEqual(true);
  });
});
