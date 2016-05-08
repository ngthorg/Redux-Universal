import React, { PropTypes } from 'react';

const IndicatorItem = (props) => {
  function handleIndicatorClick(e) {
    e.preventDefault();
    props.setCurrent(props.index);
  }

  const { className } = props;

  return (
    <li className={className} onClick={handleIndicatorClick} />
  );
};

IndicatorItem.propTypes = {
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default IndicatorItem;

// perpormance

// import React, { PropTypes } from 'react';
// import shallowCompare from 'react/lib/shallowCompare';
//
//
// class IndicatorItem extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
//   }
//
//   shouldComponentUpdate(nextProps, nextState) {
//     return shallowCompare(this, nextProps, nextState);
//   }
//
//   handleIndicatorClick(e) {
//     e.preventDefault();
//     this.props.setCurrent(this.props.index);
//   }
//
//   render() {
//     const { className } = this.props;
//     return (
//       <li
//         className={className}
//         onClick={this.handleIndicatorClick}
//       />
//     );
//   }
//
// }
//
// IndicatorItem.propTypes = {
//   className: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
//   setCurrent: PropTypes.func.isRequired,
// };
//
// export default IndicatorItem;
