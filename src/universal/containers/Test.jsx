import React from 'react'


export default class Test extends React.Component {

  componentDidMount() {
    require(['client/plugins/elastiStack'], (test) => {
      new test.ElastiStack(this.refs.elasticstack)
    })
  }

  render() {
    return (
      <div>
        <ul id="elasticstack" className="elasticstack" ref="elasticstack">
          <li><img src="http://tympanus.net/Development/ElasticStack/img/1.jpg" alt="01" /><h5>Saudade</h5></li>
          <li><img src="http://tympanus.net/Development/ElasticStack/img/2.jpg" alt="02" /><h5>Tuqburni</h5></li>
          <li><img src="http://tympanus.net/Development/ElasticStack/img/3.jpg" alt="03" /><h5>Retrouvailles</h5></li>
          <li><img src="http://tympanus.net/Development/ElasticStack/img/4.jpg" alt="04" /><h5>Onsra</h5></li>
          <li><img src="http://tympanus.net/Development/ElasticStack/img/5.jpg" alt="05" /><h5>Mamihlapinatapai</h5></li>
          <li><img src="http://tympanus.net/Development/ElasticStack/img/6.jpg" alt="06" /><h5>Koi No Yokan</h5></li>
        </ul>
      </div>
    )
  }

}
