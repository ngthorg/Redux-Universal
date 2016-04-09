import { PropTypes } from 'react'

const App = (props) => props.children

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
