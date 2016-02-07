import React, { PropTypes } from 'react'
import shallowEqual from 'react-redux/lib/utils/shallowEqual'


function mapParams(paramKeys, params) {
  return paramKeys.reduce((acc, key) => Object.assign({}, acc, { [key]: params[key] }), {})
}

export default function prepareRoute(paramKeys, prepareFn) {
  return DecoratedComponent => class PrepareRouteDecorator extends React.Component {

    static prepareRoute = prepareFn;

    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    static propTypes = {
      location: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired
    };

    componentDidMount() {
      const {
        context: { store },
        props: { params, location }
      } = this

      prepareFn({ store, params: mapParams(paramKeys, params), location })
    }

    componentDidUpdate(prevProps) {
      const {
        context: { store },
        props: { location }
      } = this
      const params = mapParams(paramKeys, this.props.params)
      const prevParams = mapParams(paramKeys, prevProps.params)

      if (!shallowEqual(params, prevParams)) {
        prepareFn({ store, params, location })
      }
    }

    render() {
      return (
        <DecoratedComponent {...this.props} />
      )
    }

  }
}
