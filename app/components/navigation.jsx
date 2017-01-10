import axios from 'axios'
import React from 'react'
// import ReactDOM from 'react-dom'
import * as Utils from '../libs/utils'

// NOTE: Layout
import PageHeader from '../views/page-header'

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

export default class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.displayName = this.props.title

    this.state = {
      data: null,
      category: null
    }

    // console.info( "\nMounted: 'Navigation'" )
  }

  componentWillMount () {
    // console.info("Component Will Mount")
  }

  componentDidMount () {
    // console.info("Component Did Mount")

    if (this.props.category) {
      this.url = '/api/files/' + this.props.source + '/' + this.props.category;
      this.resp = 'resp.data.category'
      console.log('category')
    } else {
      this.url = '/api/files/' + this.props.source;
      this.resp = 'resp.data'
      console.log('no category')
    }

    axios.get(this.url)
      .then( resp => {
        console.info(resp)
        console.info(resp.data.category)
        console.info(eval(this.resp))

        this.setState({
          data: resp.data
        })
      })
      .catch(console.error)

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


  // const ContestList = ({ contests }) => (
  //   <div className="ContestList">
  //     {contests.map(contest =>
  //       <ContestPreview key={contest.id} {...contest} />
  //     )}
  //   </div>
  // );

  // TODO: Iterate over the received nav items.

  // NOTE: Handle clicks
    handleClick() {
      console.log(this.props.navID)
    }


  render () {
    return (
      <nav className="{this.state.category}">
        <ul>
          <li className="heading">{this.state.category}</li>
          <li onClick={this.handleClick}><a href="/words/20170109" title="Skill: controlled or, ore - ending: es; plural es">Jan's New Home</a></li>
          <li><a href="/words/20161127" title="Skill: long e (e, ee) Syllables VCCV pattern">Honey Bees</a></li>
          <li><a href="/words/20161121" title="Skill: long u (CVCe) Long e (CVCe)">Life in the Forest</a></li>
          <li><a href="/words/20161107" title="Skill: long o (CVCe) contractions n't, 'm, 'll">The Big Circle</a></li>
          <li><a href="/words/20161031" title="Skill: long a (CVCe) c /s/ and g /j/">The Farmer in the Hat</a></li>
          <li><a href="/words/20161024" title="Skill: long i (CVCe) wh,ch,tch">Who Works Here?</a></li>
        </ul>
      </nav>
    )
  }
}

Navigation.propTypes = {
  nav: React.PropTypes.String
}
