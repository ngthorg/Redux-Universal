import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import shallowCompare from 'react/lib/shallowCompare';
import { checkoutProfileValidation } from './checkoutValidation';


class CheckoutProfile extends React.Component {

  static propTypes = {
    setProfileValid: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.valid !== nextProps.valid) {
      if (nextProps.valid === true) {
        this.props.setProfileValid(true);
      } else {
        this.props.setProfileValid(false);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { valid } = this.props;
    const classLine = classnames({
      checkout__line: true,
      'checkout__line--done': valid,
    });

    return (
      <div className="checkout__section checkout__section--profile centered clearfix">
        <div className="checkout__title">
          <p>Profile</p>
        </div>
        <div className="checkout__number checkout__number--focus center-aligin">1</div>
        <div className={classLine} />
        <fieldset className="form-group">
          <label>First Name</label>
          <Field
            name="firstName"
            component="input"
            type="text"
            className="form-control"
            placeholder="First Name"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Last Name</label>
          <Field
            name="lastName"
            component="input"
            type="text"
            className="form-control"
            placeholder="Last Name"
          />
        </fieldset>
      </div>
    );
  }

}

export default reduxForm({
  form: 'checkout',
  validate: checkoutProfileValidation,
})(CheckoutProfile);
