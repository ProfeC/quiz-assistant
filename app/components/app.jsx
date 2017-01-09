import React from 'react'
// import ReactDOM from 'react-dom'
import * as Utils from '../libs/utils'

// NOTE: Layout
import Nav from './navigation'
import PageHeader from '../views/page-header'
import PageFooter from '../views/page-footer'
import Words from './words'

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.displayName = 'Main Application'

    this.state = {
    }

    // console.info( "\nMounted: 'App'" )
  }

  componentWillMount () {
    // console.info("Component Will Mount")
  }

  componentDidMount () {
    // console.info("Component Did Mount")
  }

  componentWillUpdate () {
    // console.info("Component Will Update")
  }

  componentDidUpdate () {
    // console.info("Component Updated")
  }

  componentWillUnmount () {
    // console.info( "Unmounted ShowCurrentWord" )
  }

  render () {
    return (
      <section id="rapper">
        <PageHeader title={ this.displayName } />
        <section id="side-nav">
          <Nav source={this.props.navSource} category={this.props.navCategory} className="side-nav" />
        </section>
        <section id="main">
          <Words urlList={this.props.urlList} displayTime={this.props.displayTime} />
        </section>

      </section>
    )
  }
}

App.propTypes = {
  dataList: React.PropTypes.String
}
