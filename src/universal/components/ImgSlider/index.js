import React, { PropTypes } from 'react';
import classnames from 'classnames';
import shallowCompare from 'react/lib/shallowCompare';
import ImgSliderLightBox from './ImgSliderLightBox';
import IndicatorItem from './IndicatorItem';

export default class ImgSlider extends React.Component {

  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.renderGallery = this.renderGallery.bind(this);
    this.handleImgMediumClick = this.handleImgMediumClick.bind(this);
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.showLightBox = this.showLightBox.bind(this);
    this.hideLightBox = this.hideLightBox.bind(this);
    this.setCurrent = this.setCurrent.bind(this);
    this.Prev = this.Prev.bind(this);
    this.Next = this.Next.bind(this);
    this.state = {
      current: 0,
      showLightBox: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  setCurrent(current) {
    this.setState({
      current,
    });
  }

  showLightBox() {
    this.setState({
      showLightBox: true,
    });
  }

  handleIndicatorClick(current, e) {
    e.preventDefault();
    this.setCurrent(current);
  }

  handleImgMediumClick(e) {
    e.preventDefault();
    this.showLightBox();
  }

  hideLightBox() {
    this.setState({
      showLightBox: false,
    });
  }

  Prev() {
    this.setState({
      current: this.state.current + 1,
    });
  }

  Next() {
    this.setState({
      current: this.state.current - 1,
    });
  }

  renderGallery(url, i) {
    const { current } = this.state;
    const liClass = classnames({
      'img-slider__item': true,
      'img-slider__item--current': current === i,
    });

    return (
      <li key={i} className={liClass}>
        <figure>
          <img src={url} onClick={this.handleImgMediumClick} alt="img slider" />
        </figure>
      </li>
		);
  }

  renderTab(url, i) {
    const { current } = this.state;
    const liClass = classnames({
      'img-slider__item': true,
      'img-slider__item--small': true,
      'img-slider__item--current': current === i,
    });

    return (
      <li key={i} className={liClass}>{url}</li>
    );
  }

  render() {
    const { showLightBox, current } = this.state;
    const { images } = this.props;
    return (
      <div className="img-slider">
        <div className="img-slider__main">
          <div className="img-slider__viewer center-aligin">
            ImgSlider!
            <ul className="img-slider__gallery img-slider__gallery--medium">
              {images.map(this.renderGallery)}
            </ul>
          </div>
          <div className="img-slider__indicator center-aligin">
            <ul className="img-slider__indicators">
              {images.map((_, i) => {
                const liClass = classnames({
                  'img-slider__indicator-item': true,
                  'img-slider__indicator-item--current': this.state.current === i,
                });

                return (
                  <IndicatorItem
                    key={i} index={i} className={liClass} setCurrent={this.setCurrent}
                  />
                );
              })}
            </ul>
          </div>
        </div>
        <div className="img-slider__tab">
          <ul className="img-slider__gallery img-slider__gallery--tab">

          </ul>
        </div>
        {showLightBox && (
          <ImgSliderLightBox
            current={current}
            images={images}
            handlePrev={this.Prev}
            handleNext={this.Next}
            handleHideLightBox={this.hideLightBox}
          />
        )}
      </div>
		);
  }

}
