import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'
import shallowCompare from 'react/lib/shallowCompare'
import { checkoutProfileValidation } from 'universal/validation/checkoutValidation'


@reduxForm({
  form: 'checkout',
  fields: ['firstName', 'lastName'],
  validate: checkoutProfileValidation
})

export default class CheckoutProfile extends React.Component {

  static propTypes = {
    fields: PropTypes.shape({
      firstName: PropTypes.object.isRequired,
      lastName: PropTypes.object.isRequired
    }).isRequired,
    setProfileValid: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.valid !== nextProps.valid) {
      if (nextProps.valid === true) {
        this.props.setProfileValid(true)
      } else {
        this.props.setProfileValid(false)
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const { fields: { firstName, lastName }, valid } = this.props
    const classLine = classnames({
      checkout__section__line: true,
      'checkout__section__line--done': valid
    })
    return (
      <div className="checkout__section checkout__section--profile">
        <div className="checkout__section__title">
          <p>Profile</p>
        </div>
        <div className="checkout__section__number checkout__section__number--focus">1</div>
        <div className={classLine} />
        <fieldset className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            {...firstName}
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            {...lastName}
          />
        </fieldset>
      </div>
    )
  }

}
