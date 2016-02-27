import React, { PropTypes } from 'react'
import shallowCompare from 'react/lib/shallowCompare'
import classnames from 'classnames'


export default class ImgSliderLightBox extends React.Component {

  static propTypes = {
    current: PropTypes.number.isRequired,
    handleHideLightBox: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  };

  constructor(props) {
    super(props)
    this.renderGallery = this.renderGallery.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  renderGallery(url, i) {
    const length = this.props.images.length
    const phantram = 100 / length
    const BoxsStyle = {
      width: `${phantram}%`
    }
    return (
      <div key={i} className="ImgSliderLightBoxs" style={BoxsStyle}>
        <figure className="ImgSliderLightBox__item">
          <img src={url} />
        </figure>
      </div>
		)
  }

  render() {
    const { images, current } = this.props
    const length = images.length
    const phantram = 100 / length
    const translateX = phantram * current
    const mainStyle = {
      width: `${length * 100}%`,
      WebkitTransform: `translate3d(-${translateX}%, 0px, 0px)`,
      MsTransform: `translate3d(-${translateX}%, 0px, 0px)`,
      OTransform: `translate3d(-${translateX}%, 0px, 0px)`,
      transform: `translate3d(-${translateX}%, 0px, 0px)`
    }

    const classesPrev = classnames({
      ImgSliderLightBox__NextPrev__item: true,
      'ImgSliderLightBox__NextPrev--prev': true,
      'ImgSliderLightBox__NextPrev--hide': current === 0
    })

    const classesNext = classnames({
      ImgSliderLightBox__NextPrev__item: true,
      'ImgSliderLightBox__NextPrev--next': true,
      'ImgSliderLightBox__NextPrev--hide': current === (length - 1)
    })

    return (
      <div className="ImgSliderLightBox">
        <div className="ImgSliderLightBox__main" style={mainStyle}>
          {images.map(this.renderGallery)}
        </div>
        <div className="ImgSliderLightBox__NextPrev">
          <div className={classesPrev} onClick={this.props.handleNext}>
            <i className="ion-ios-arrow-thin-left"></i>
          </div>
          <div className={classesNext} onClick={this.props.handlePrev}>
            <i className="ion-ios-arrow-thin-right"></i>
          </div>
        </div>
        <i
          className="ImgSliderLightBox__close ion-ios-close-outline"
          onClick={this.props.handleHideLightBox}
        />
      </div>
		)
  }

}
