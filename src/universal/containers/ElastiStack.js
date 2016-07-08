import React from 'react';


export default class ElastiStack extends React.Component {

  componentDidMount() {
    require(['../../client/plugins/elastiStack'], (elStack) => {
      this.elastiStack = new elStack.ElastiStack(this.refs.elasticstack);
    });
  }

  componentWillUnmount() {
    delete this.elastiStack;
  }

  render() {
    return (
      <div>
        <ul id="elasticstack" className="elasticstack" ref="elasticstack">
          <li><img src="/images/1.jpg" alt="01" /><h5>Saudade</h5></li>
          <li><img src="/images/2.jpg" alt="02" /><h5>Tuqburni</h5></li>
          <li><img src="/images/3.jpg" alt="03" /><h5>Retrouvailles</h5></li>
          <li><img src="/images/4.jpg" alt="04" /><h5>Onsra</h5></li>
          <li><img src="/images/5.jpg" alt="05" /><h5>Mamihlapinatapai</h5></li>
          <li><img src="/images/6.jpg" alt="06" /><h5>Koi No Yokan</h5></li>
        </ul>
      </div>
    );
  }

}
