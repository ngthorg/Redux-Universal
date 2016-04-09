import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import ImgSliderLightBox from 'universal/components/ImgSlider/ImgSliderLightBox'


describe('components: <ImgSliderLightBox />', () => {
  const images = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fefa5120099237.562e57c552241.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/6d2c4b11613843.560fa91b30afb.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3396dc30855203.5692e7efed2bd.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9e611731864083.5664698f7093b.jpg'
  ]

  it('renders close ImgSliderLightBox', () => {
    const handleHideLightBox = sinon.spy()
    const handlePrev = sinon.spy()
    const handleNext = sinon.spy()
    const wrapper = mount(
      <ImgSliderLightBox
        current={0}
        images={images}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleHideLightBox={handleHideLightBox}
      />
    )

    expect(wrapper.prop('images')).to.equal(images)
    expect(wrapper.prop('current')).to.equal(0)
    wrapper.find('.ImgSliderLightBox__close').simulate('click')
    expect(handleHideLightBox.calledOnce).to.equal(true)
  })

  it('renders close .ImgSliderLightBox__NextPrev--next', () => {
    const handleHideLightBox = sinon.spy()
    const handlePrev = sinon.spy()
    const handleNext = sinon.spy()
    const wrapper = mount(
      <ImgSliderLightBox
        current={0}
        images={images}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleHideLightBox={handleHideLightBox}
      />
    )

    wrapper.find('.ImgSliderLightBox__NextPrev--next').simulate('click')
    expect(handlePrev.calledOnce).to.equal(true)
  })

  it('renders close .ImgSliderLightBox__NextPrev--prev', () => {
    const handleHideLightBox = sinon.spy()
    const handlePrev = sinon.spy()
    const handleNext = sinon.spy()
    const wrapper = mount(
      <ImgSliderLightBox
        current={0}
        images={images}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleHideLightBox={handleHideLightBox}
      />
    )

    wrapper.find('.ImgSliderLightBox__NextPrev--prev').simulate('click')
    expect(handleNext.calledOnce).to.equal(true)
  })

  it('renders change props', () => {
    const handleHideLightBox = sinon.spy()
    const handlePrev = sinon.spy()
    const handleNext = sinon.spy()
    // const spy = sinon.spy(ImgSliderLightBox.prototype, 'shouldComponentUpdate')
    const wrapper = mount(
      <ImgSliderLightBox
        current={0}
        images={images}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleHideLightBox={handleHideLightBox}
      />
    )

    // expect(spy.calledOnce).to.equal(false)
    wrapper.setProps({ current: 1 })
    expect(wrapper.prop('current')).to.equal(1)
    // expect(spy.calledOnce).to.equal(true)
    wrapper.setProps({ current: 1 })
  })
})
