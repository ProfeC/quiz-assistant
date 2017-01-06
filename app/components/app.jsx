import React from 'react'
// import ReactDOM from 'react-dom'
import * as Utils from '../libs/utils'

// NOTE: Layout
import PageHeader from '../views/page-header'
import PageFooter from '../views/page-footer'

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
        <article className="spelling">
            <h2><a href="/words/20161024">Who Works Here?</a></h2>
            <p>Skill: long i (CVCe) wh,ch,tch</p>
        </article>
        <article className="spelling">
            <h2><a href="/words/20161031">The Farmer in the Hat</a></h2>
            <p>Skill: long a (CVCe) c /s/ and g /j/</p>
        </article>
        <article className="spelling">
            <h2><a href="/words/20161107">The Big Circle</a></h2>
            <p>Skill: long o (CVCe) contractions n't, 'm, 'll</p>
        </article>
        <article className="spelling">
            <h2><a href="/words/20161121">Life in the Forest</a></h2>
            <p>Skill: long u (CVCe) Long e (CVCe)</p>
        </article>
        <article className="spelling">
            <h2><a href="/words/20161127">Honey Bees</a></h2>
            <p>Skill: long e (e, ee) Syllables VCCV pattern</p>
        </article>
      </section>
    )
  }
}

App.propTypes = {
  dataList: React.PropTypes.String
}
