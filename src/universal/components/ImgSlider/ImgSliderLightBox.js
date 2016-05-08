import React, { PropTypes } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import classnames from 'classnames';


export default class ImgSliderLightBox extends React.Component {

  static propTypes = {
    current: PropTypes.number.isRequired,
    handleHideLightBox: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  constructor(props) {
    super(props);
    this.renderGallery = this.renderGallery.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderGallery(url, i) {
    const length = this.props.images.length;
    const phantram = 100 / length;
    const BoxsStyle = {
      width: `${phantram}%`,
    };
    return (
      <div key={i} className="img-slider-lightbox__gallery" style={BoxsStyle}>
        <figure className="img-slider-lightbox__item">
          <img src={url} alt="light box img" />
        </figure>
      </div>
		);
  }

  render() {
    const { images, current } = this.props;
    const length = images.length;
    const phantram = 100 / length;
    const translateX = phantram * current;
    const mainStyle = {
      width: `${length * 100}%`,
      WebkitTransform: `translate3d(-${translateX}%, 0px, 0px)`,
      MsTransform: `translate3d(-${translateX}%, 0px, 0px)`,
      OTransform: `translate3d(-${translateX}%, 0px, 0px)`,
      transform: `translate3d(-${translateX}%, 0px, 0px)`,
    };

    const classesPrev = classnames({
      'img-slider-lightbox__direction': true,
      'img-slider-lightbox__direction--prev': true,
      'img-slider-lightbox__direction--hide': current === 0,
      'center-aligin': true,
    });

    const classesNext = classnames({
      'img-slider-lightbox__direction': true,
      'img-slider-lightbox__direction--next': true,
      'img-slider-lightbox__direction--hide': current === (length - 1),
      'center-aligin': true,
    });

    return (
      <div className="img-slider-lightbox center-aligin">
        <div className="img-slider-lightbox__main" style={mainStyle}>
          {images.map(this.renderGallery)}
        </div>
        <div>
          <div className={classesPrev} onClick={this.props.handleNext}>
            <i className="ion-ios-arrow-thin-left"></i>
          </div>
          <div className={classesNext} onClick={this.props.handlePrev}>
            <i className="ion-ios-arrow-thin-right"></i>
          </div>
        </div>
        <i
          className="img-slider-lightbox__close ion-ios-close-outline"
          onClick={this.props.handleHideLightBox}
        />
      </div>
		);
  }

}
