import React from 'react'
import { expect } from 'chai'
import { fromJS } from 'immutable'
import { shallow, render } from 'enzyme'
import UserProfile from 'universal/components/User/UserProfile'


describe('components: <UserProfile />', () => {
  const dataProps = {
    avatar_url: 'https://avatars.githubusercontent.com/u/4083429?v=3',
    login: 'ngthorg'
  }
  const userProps = fromJS(dataProps)

  it('renders two ".text-center"', () => {
    const wrapper = shallow(<UserProfile user={userProps} />)
    expect(wrapper.find('.text-center')).to.have.length(2)
    expect(wrapper.find('h4').hasClass('text-center')).to.equal(true)
    expect(wrapper.find('div.text-center')).to.have.length(1)
  })

  it('renders an <p>', () => {
    const wrapper = shallow(<UserProfile user={userProps} />)
    expect(wrapper.find('p').text()).to.contain('ngthorg')
    expect(wrapper.contains(<h4 className="text-center">User github!</h4>)).to.equal(true)
  })

  it('renders an <img>', () => {
    const wrapper = shallow(<UserProfile user={userProps} />)
    expect(wrapper.contains(
      <img src={dataProps.avatar_url} style={{ width: '50px', height: '50px' }} />
    )).to.equal(true)
    expect(wrapper.find('img')).to.have.attr('src', dataProps.avatar_url)
    expect(wrapper.find('img')).to.have.attr('style', 'width:50px;height:50px;')
  })

  it('renders an <a>', () => {
    const wrapper = render(<UserProfile user={userProps} />)
    expect(wrapper.find('a').text()).to.contain('go Home!')
  })
})
