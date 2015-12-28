import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Loading from 'universal/components/Loading'


describe('components: <Loading />', () => {

	it("renders an '.progress-bar'", () => {
    const wrapper = shallow(<Loading />)

    expect(wrapper.find('.progress-bar')).to.have.length(1)
  })

})
