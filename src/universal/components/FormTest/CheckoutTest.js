import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import shallowCompare from 'react/lib/shallowCompare';
import checkoutValidation from './checkoutValidation';


class CheckoutTest extends React.Component {

  static propTypes = {
    profileValid: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { valid, profileValid } = this.props;
    const classNumber = classnames({
      checkout__number: true,
      'checkout__number--focus': profileValid,
      'center-aligin': true,
    });
    const classLine = classnames({
      checkout__line: true,
      'checkout__line--done': valid,
    });

    return (
      <div className="checkout__section checkout__section--profile centered clearfix">
        <div className="checkout__title">
          <p>Email</p>
        </div>
        <div className={classNumber}>2</div>
        <div className={classLine} />
        <fieldset className="form-group">
          <label>email</label>
          <Field
            name="email"
            component="input"
            type="email"
            className="form-control"
            placeholder="email"
          />
        </fieldset>
      </div>
    );
  }

}

export default reduxForm({
  form: 'checkout',
  validate: checkoutValidation,
})(CheckoutTest);
