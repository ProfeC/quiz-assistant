import axios from 'axios'
import React from 'react'
// import ReactDOM from 'react-dom'
import Navigation from './navigation'
import QuizGrid from './quiz-grid'

// NOTE: Layout
import Words from './words'

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.displayName = 'Main Application'

        this.state = {
            quizID: this.props.quizID,
            quizzes: this.props.quizzes.files,
            displayTime: this.props.displayTime
        }

        // console.info( "\nMounted: 'App'" )
    }

    componentWillMount () {
        // console.info("Component Will Mount")
    }

    componentDidMount () {
        // console.info("Component Did Mount")
        //
        // if (this.props.navCategory) {
        //     this.url = '/api/files/' + this.props.navSource + '/' + this.props.navCategory;
        //     this.resp = 'resp.data.category'
        //     //   console.info('category')
        //
        //     this.setState({
        //         category: this.props.navCategory
        //     })
        // } else {
        //     this.url = '/api/files/' + this.props.navSource;
        //     this.resp = 'resp.data'
        //     //   console.info('no category')
        // }
        //
        // axios.get(this.url)
        // .then( resp => {
        //     // console.info(resp)
        //     // console.info(resp.data.category)
        //     // console.info(eval(this.resp))
        //
        //     this.setState({
        //         data: resp.data
        //     })
        // })
        // .catch(console.error)
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

    fetchWords = (id) => {
        // console.info(this.props)
        pushState(
            {quizID: id},
            `/words/${id}`
        )

        this.setState({
            quizID: id,
            quizzes: []
        })
    }

    currentContent = () => {
        if ( this.state.quizzes.length > 0 ) {
            return(
                <section className="quiz-grid">
                    {this.state.quizzes.map( quiz =>
                        <QuizGrid key={quiz.id} onQuizClick={this.fetchWords} {...quiz} />
                    )}
                </section>
            )
        } else {
            return (
                <Words quizID={this.state.quizID} displayTime={this.props.displayTime} />
            )
        }

    }

    render () {
        // console.info(this.fetchWords)
        return(
            <div>{this.currentContent()}</div>
        )
    }
}

// App.propTypes = {
//   dataList: React.PropTypes.String
// }
