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

    // state = this.props.initialData

    constructor (props) {
        super(props)
        this.displayName = 'Main Application'

        // this.state = {
        //     quizID: this.props.quizID,
        //     quizzes: this.props.quizzes,
        //     displayTime: this.props.displayTime
        // }

        // console.info('app.jsx => this.props.initialData is ' + JSON.stringify(this.props.initialData))
        this.state = this.props.initialData;

        // console.info('app.jsx => this.state is ' + JSON.stringify(this.state))

        console.info( '\nMounted: \'App\'' )
    }

    componentWillMount () {
        // console.info("Component Will Mount")
    }

    componentDidMount () {
        console.info(this.state)
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
