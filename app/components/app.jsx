import axios from 'axios'
import React from 'react'
import Navigation from './navigation'
import PageHeader from './page-header'
import QuizGrid from './quiz-grid'
import Words from './words'
import * as api from '../api'

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

export default class App extends React.Component {
    static propTypes = {
        initialData: React.PropTypes.object.isRequired
    }

    constructor (props) {
        super(props)
        this.displayName = 'Main Application'
        this.state = this.props.initialData;

        // console.info( '\nMounted: \'App\'' )
    }

    componentWillMount () {
        // console.info("Component Will Mount")
    }

    componentDidMount () {
        // console.info(this.state)
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

    fetchQuiz = (id) => {
        // console.info(this.props)
        pushState(
            {currentQuizID: id},
            `/quiz/${id}`
        )

        this.setState({
            currentQuizID: id,
            quizzes: []
        })
    }

    currentContent = () => {
        // console.info('app.jsx => this.state.quizzes is ' + JSON.stringify(this.state.quizzes))

        if ( this.state.currentQuizID ) {
            return <Words currentQuizID={this.state.currentQuizID} />
        }

        return <section className="quiz-grid">
            {this.state.quizzes.map( quiz =>
                <QuizGrid key={quiz.id} onQuizClick={this.fetchQuiz} {...quiz} />
            )}
        </section>

    }

    render () {
        // console.info(this.fetchWords)
        // console.info(Array.isArray(this.state.quizzes))
        // console.info(this.state.quizzes.length)

        return (
            <div className="App">
                <PageHeader title='Quiz Assistant - Main Application' skill='' />
                {this.currentContent()}
            </div>
        )
    }
}

// App.propTypes = {
//   dataList: React.PropTypes.String
// }
