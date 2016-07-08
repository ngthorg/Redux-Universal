import React from 'react';

function MyDiv(props) {
  return <div {...props} />;
}

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div data-ahihi>
        <MyDiv data-test={3} className="test">
          test
        </MyDiv>
      </div>
    );
  }
}

export default Test;
