import axios from 'axios'
import React from 'react'
// import ReactDOM from 'react-dom'
import Navigation from './navigation'
import * as Utils from '../libs/utils'

// NOTE: Layout
import Words from './words'

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.displayName = 'Main Application'

    this.state = {
      data: null,
      category: null
    }

    // console.info( "\nMounted: 'App'" )
  }

  componentWillMount () {
    // console.info("Component Will Mount")
  }

  componentDidMount () {
    // console.info("Component Did Mount")

    if (this.props.category) {
      this.url = '/api/files/' + this.props.navSource + '/' + this.props.navCategory;
      this.resp = 'resp.data.category'
      console.info('category')

      this.setState({
        category: this.props.navCategory
      })
    } else {
      this.url = '/api/files/' + this.props.navSource;
      this.resp = 'resp.data'
      console.info('no category')
    }

    axios.get(this.url)
      .then( resp => {
        console.info(resp)
        console.info(resp.data.category)
        console.info(eval(this.resp))

        this.setState({
          data: eval(this.resp)
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

  render () {
    return (
      <div>
        <nav className={this.props.category} id="side-nav">
          <Navigation source={this.props.navSource} category={this.props.navCategory} className="side-nav" data={this.state.data} />
        </nav>
        <div>
          <Words urlList={this.props.urlList} displayTime={this.props.displayTime} />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dataList: React.PropTypes.String
}
