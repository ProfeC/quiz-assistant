import * as axios from 'axios'
import * as React from 'react'
// import Navigation from './navigation'
import PageHeader from './page-header'
// import QuizGrid from './quiz-grid'
// import Words from './words'
import * as api from '../api'

export interface AppProps {
	initialData: InitialDataProps | undefined;
    displayName?: string;
}

export interface AppState {
    initialData: InitialDataProps | undefined;
    quizzes: {};
    currentQuizID: string;
    currentContent: {};
    fetchQuizList: any;
}

export interface InitialDataProps {
    quizzes?: any;
}

const pushState = (obj:{}, url:string) =>
  window.history.pushState(obj, '', url);

export default class App extends React.Component<AppProps, AppState> {
    // static propTypes = {
    //     initialData: React.PropTypes.object.isRequired
    // }

    constructor (props: AppProps) {
        super(props)
        // let displayName = 'Main Application'

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

    fetchQuiz = (id:string) => {
        // console.info(this.props)
        pushState(
            {currentQuizID: id},
            `/quiz/${id}`
        )

        api.getQuiz(id).then( quiz =>{
            this.setState({
                currentQuizID: quiz.id,
                quizzes: []
            })
        })
    }

    fetchQuizList = () => {
        // console.info('fetchQuizList() => ' + JSON.stringify(this.props))
        pushState(
            {currentQuizID: ''},
            '/'
        )

        api.getQuizList().then((data:{}) => {
            this.setState({
                currentQuizID: '',
                quizzes: data
            })
        })
    }

    currentContent = () => {
        // console.info('app.jsx => this.state.quizzes is ' + JSON.stringify(this.state.quizzes))

        if ( this.state.currentQuizID ) {
            // return <Words currentQuizID={this.state.currentQuizID} />
            return 'some words'
        }

//        return <section className="quiz-grid">
//            {this.state.quizzes.map( quiz =>
//                <QuizGrid key={quiz.id} onQuizClick={this.fetchQuiz} {...quiz} />
//            )}
//        </section>

        return <section className="quiz-grid">
            <p>some testing</p>
        </section>

    }

    render () {
        // console.info(this.fetchWords)
        // console.info(Array.isArray(this.state.quizzes))
        // console.info(this.state.quizzes.length)

        return (
            <div className="App">
                <PageHeader title='Quiz Assistant - Main Application' skill='' homeLinkClick={fetchQuizList()} />
                {currentContent()}
            </div>
        )        
    }
}

// App.propTypes = {
//   dataList: React.PropTypes.String
// }
