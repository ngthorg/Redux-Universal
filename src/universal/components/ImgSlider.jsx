import React, { PropTypes } from 'react'
import classnames from 'classnames'
import shallowCompare from 'react/lib/shallowCompare'
import ImgSliderLightBox from 'universal/components/ImgSliderLightBox'


export default class ImgSlider extends React.Component {

  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  };

  constructor(props) {
    super(props)
    this.renderGallery = this.renderGallery.bind(this)
    this.renderIndicator = this.renderIndicator.bind(this)
    this.handleImgMediumClick = this.handleImgMediumClick.bind(this)
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this)
    this.showLightBox = this.showLightBox.bind(this)
    this.hideLightBox = this.hideLightBox.bind(this)
    this.Prev = this.Prev.bind(this)
    this.Next = this.Next.bind(this)
    this.state = {
      current: 0,
      showLightBox: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  setCurrent(current) {
    this.setState({
      current
    })
  }

  showLightBox() {
    this.setState({
      showLightBox: true
    })
  }

  handleIndicatorClick(current, e) {
    e.preventDefault()
    this.setCurrent(current)
  }

  handleImgMediumClick(e) {
    e.preventDefault()
    this.showLightBox()
  }

  hideLightBox() {
    this.setState({
      showLightBox: false
    })
  }

  Prev() {
    this.setState({
      current: this.state.current + 1
    })
  }

  Next() {
    this.setState({
      current: this.state.current - 1
    })
  }

  renderGallery(url, i) {
    const { current } = this.state
    const liClass = classnames({
      imgSlider__item: true,
      'imgSlider__item--current': current === i
    })

    return (
      <li key={i} className={liClass}>
        <figure>
          <img src={url} onClick={this.handleImgMediumClick} />
        </figure>
      </li>
		)
  }

  renderIndicator(_, i) {
    const { current } = this.state
    const liClass = classnames({
      imgSlider__indicator__item: true,
      'imgSlider__indicator__item--current': current === i
    })

    return (
      <li
        key={i}
        className={liClass}
        onClick={this.handleIndicatorClick.bind(this, i)}
      />
		)
  }

  renderTab(url, i) {
    const { current } = this.state
    const liClass = classnames({
      imgSlider__item: true,
      'imgSlider__item--small': true,
      'imgSlider__item--current': current === i
    })

    return (
      <li key={i} className={liClass}>{url}</li>
    )
  }

  render() {
    const { showLightBox, current } = this.state
    const { images } = this.props
    return (
      <div className="imgSlider">
        <div className="imgSlider__main">
          <div className="imgSlider__viewer">
            ImgSlider!
            <ul className="imgSlider__gallery imgSlider__gallery--medium">
              {images.map(this.renderGallery)}
            </ul>
          </div>
          <div className="imgSlider__indicator">
            <ul className="imgSlider__indicators">
              {images.map(this.renderIndicator)}
            </ul>
          </div>
        </div>
        <div className="imgSlider__tab">
          <ul className="imgSlider__gallery imgSlider__gallery--tab">

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
		)
  }

}
