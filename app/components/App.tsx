/// <reference path="../app.d.ts" />

import * as axios from 'axios'
import * as React from 'react'
import Navigation from './navigation'
import PageHeader from './page-header'
import QuizGrid from './quiz-grid'
import Words from './words'
import * as api from '../api'

const pushState = (obj:{}, url:string) =>
  window.history.pushState(obj, '', url);

export default class App extends React.Component<QuizAssistant.AppProps, QuizAssistant.AppState> {
    // static propTypes = {
    //     initialData: React.PropTypes.object.isRequired
    // }

    constructor (props: QuizAssistant.AppProps) {
        super(props)
        // let displayName = 'Main Application'

        this.state = {
          quizzes: [],
          currentQuizID: '',
          currentContent: '',
          fetchQuizList: ''
        }

        // console.info( '\nMounted: \'App\'' )
    }

    componentWillMount () {

        let myData = new Request('/app/data/quizzes.json')

        let jsnData:any = fetch(myData)
        .then( function(res) {
          return res.json()
        })
        .then( function(jsn){
          console.info('L48 - JSON Data', jsn)
          return jsn
        })
      .catch( function(error: any) {
        console.error('There was a problem with Fetch!', error)
      })

      this.setState({
        currentQuizID: '',
        quizzes: jsnData
      })
        console.info("Component Will Mount")
    }

    componentDidMount () {
        console.info(this.state)
        console.info("Component Did Mount")
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

    fetchQuiz = (id:string) => {
        // console.info(this.props)
        pushState(
            {currentQuizID: id},
            `/quiz/${id}`
        )

        // api.getQuiz(id).then( quiz =>{
        //     this.setState({
        //         currentQuizID: quiz.id,
        //         quizzes: []
        //     })
        // })

        fetch(`/api/quiz/${id}`)
        .then( (resp:any)  => resp.data)
    }

    fetchQuizList:any = () => {
        console.info('fetchQuizList() => ' + JSON.stringify(this.props))
        pushState(
            {currentQuizID: ''},
            '/'
        )

        // api.getQuizList().then((data:object[]) => {
        //     this.setState({
        //         currentQuizID: '',
        //         quizzes: data
        //     })
        // })

        fetch('./app/data/quizzes.json')
        .then( function(res:any) {
        if (res.ok) {
          console.info('getQuizListFS Response.', res)
          console.info('getQuizListFS body.', res.body)
          console.info('getQuizListFS URL.', res.url)

          return res.json
        }

        throw new Error('Request for quiz list was unsuccessful')
      })
      .catch( function(error: any) {
        console.info('There was a problem with Fetch!', error)
      })

        // let test = api.getQuizListFS()
        // .then((data:object[]) => {
          // console.info('api.getQuizListFS Data...', data)

        //     this.setState({
        //         currentQuizID: '',
        //         quizzes: data
        //     })
        // })
    }

    currentContent = () => {
        console.info('App => this.state.quizzes is ' + JSON.stringify(this.state.quizzes))

        if ( this.state.currentQuizID.length > 0 ) {
            return <Words currentQuizID={this.state.currentQuizID} />
        }

       return <section className="quiz-grid">
           {this.state.quizzes.map( (quiz: QuizAssistant.QuizProps) =>
               <QuizGrid key={quiz.id} onQuizClick={this.fetchQuiz} {...quiz} />
           )}
       </section>
    }

    render () {
        // console.info(this.fetchWords)
        console.info('Quizzes in the state?', Array.isArray(this.state.quizzes))
        console.info('Length of Quiz array: ', this.state.quizzes.length)

        return (
            <div className="App">
                <PageHeader title='Quiz Assistant - Main Application' skill='' homeLinkClick={this.fetchQuizList()} />
                {this.currentContent()}
            </div>
        )
    }
}

// App.propTypes = {
//   dataList: React.PropTypes.String
// }
