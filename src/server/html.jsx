import React, { PropTypes } from 'react'
import DocumentMeta from 'react-document-meta'


export default class Html extends React.Component {

  static propTypes = {
    markup: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  };

  render() {
    const { state, markup } = this.props
    return (
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
          {DocumentMeta.renderAsReact()}
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" sizes="16x16 32x32 64x64 128x128 256x256" />
          {!__DEV__ && (
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
          )}
          <link rel="stylesheet" type="text/css" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
        </head>
        <body>

          <div id="main" dangerouslySetInnerHTML={{ __html: markup }} />

          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${state};` }} />
          <script src="/js/bundle.js" />
        </body>
      </html>
    )
  }

}
