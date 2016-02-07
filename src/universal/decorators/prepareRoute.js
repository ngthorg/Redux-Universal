import React, { PropTypes } from 'react'


export default function prepareRoute(prepareFn) {
  return DecoratedComponent => class PrepareRouteDecorator extends React.Component {

    static prepareRoute = prepareFn;

    static propTypes = {
      location: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired
    };

    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    componentDidMount() {
      const {
        context: { store },
        props: { params, location }
      } = this

      prepareFn({ store, params, location })
    }

    render() {
      return (
        <DecoratedComponent {...this.props} />
      )
    }

  }
}
