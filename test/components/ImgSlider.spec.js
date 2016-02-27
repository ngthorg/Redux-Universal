import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import ImgSlider from 'universal/components/ImgSlider'


describe('components: <ImgSlider />', () => {
  const images = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fefa5120099237.562e57c552241.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/6d2c4b11613843.560fa91b30afb.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3396dc30855203.5692e7efed2bd.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9e611731864083.5664698f7093b.jpg'
  ]

  it('renders .imgSlider__indicator__item', () => {
    const wrapper = mount(<ImgSlider images={images} />)
    expect(wrapper.find('.imgSlider__indicator__item')).to.have.length(images.length)
    expect(wrapper.state('current')).to.equal(0)
    wrapper.find('.imgSlider__indicator__item').at(1).simulate('click')
    expect(wrapper.state('current')).to.equal(1)
  })

  it('renders .imgSlider__item', () => {
    const wrapper = mount(<ImgSlider images={images} />)
    expect(wrapper.find('.imgSlider__item')).to.have.length(images.length)
  })
})
