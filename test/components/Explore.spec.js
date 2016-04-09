import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import Explore from 'universal/components/Search/Explore'

describe('components: <Explore />', () => {
  const dispatch = sinon.spy()
  const store = { dispatch }
  const params = { text: '' }
  const wrapper = mount(
    <Explore params={params} />,
    { context: { store } }
  )

  it('renders input', () => {
    const textChange = 'hello'

    expect(wrapper.state('search')).to.equal(params.text)
    wrapper.find('input').get(0).value = textChange
    wrapper.find('input').simulate('change')
    expect(wrapper.state('search')).to.equal(textChange)
    expect(wrapper.find('input').get(0).value).to.equal(textChange)
  })

  it('renders button', () => {
    expect(dispatch.calledOnce).to.equal(false)
    wrapper.find('button').simulate('click')
    expect(dispatch.calledOnce).to.equal(true)
  })
})
