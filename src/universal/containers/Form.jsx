import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Form from 'universal/components/Form'


class FormContainer extends React.Component {

  static propTypes = {
    route: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(data) {
    console.log('handleSubmit', data)
  }

  render() {
    return (
      <div>
        <p><Link to="/">Home</Link></p>
        <Form onSubmit={this.handleSubmit} route={this.props.route} />
      </div>
    )
  }

}

export default FormContainer
