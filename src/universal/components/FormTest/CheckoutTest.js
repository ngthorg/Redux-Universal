import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import classnames from 'classnames';
import shallowCompare from 'react/lib/shallowCompare';
import checkoutValidation from './checkoutValidation';


class CheckoutTest extends React.Component {

  static propTypes = {
    fields: PropTypes.shape({
      email: PropTypes.object.isRequired,
    }).isRequired,
    profileValid: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { fields: { email }, valid, profileValid } = this.props;
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
          <input
            type="text"
            className="form-control"
            placeholder="email"
            {...email}
          />
        </fieldset>
      </div>
    );
  }

}

export default reduxForm({
  form: 'checkout',
  fields: ['firstName', 'lastName', 'email'],
  validate: checkoutValidation,
})(CheckoutTest);
