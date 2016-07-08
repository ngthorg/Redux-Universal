import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import shallowCompare from 'react/lib/shallowCompare';
import CheckoutProfile from './CheckoutProfile';
import CheckoutTest from './CheckoutTest';
import checkoutValidation from './checkoutValidation';


class Form extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    valid: PropTypes.bool.isRequired,
    values: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.setProfileValid = this.setProfileValid.bind(this);
    this.routerWillLeave = this.routerWillLeave.bind(this);
    this.state = {
      profileValid: false,
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const { router } = this.context;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  setProfileValid(val) {
    this.setState({
      profileValid: val,
    });
  }

  routerWillLeave() {
    const { values } = this.props;
    const keysV = Object.keys(values);
    for (let i = 0; i < keysV.length; i++) {
      if (values[keysV[i]]) {
        return 'You have unsaved information, are you sure you want to leave this page?';
      }
    }
    return null;
  }

  render() {
    const { handleSubmit, valid } = this.props;
    const { profileValid } = this.state;
    const classCheck = classnames({
      checkout__number: true,
      'checkout__number--unchecked': !valid,
      'checkout__number--checked': valid,
      'checkout__number--focus': valid,
      'center-aligin': true,
    });

    return (
      <form className="checkout" onSubmit={handleSubmit}>
        <CheckoutProfile setProfileValid={this.setProfileValid} />
        <CheckoutTest profileValid={profileValid} />
        <fieldset className="form-group">
          <div className="checkout__section checkout__section--profile centered clearfix">
            <div className={classCheck} />
            <button
              type="submit"
              className="btn btn-primary-outline btn-sm btn-block"
              disabled={!valid}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    );
  }

}

const selector = formValueSelector('checkout'); // <-- same as form name

export default reduxForm({
  form: 'checkout',
  validate: checkoutValidation,
})(connect(
  state => {
    const { firstName, lastName, email } = selector(state, 'firstName', 'lastName', 'email');
    return {
      values: {
        firstName,
        lastName,
        email,
      },
    };
  }
)(Form));
