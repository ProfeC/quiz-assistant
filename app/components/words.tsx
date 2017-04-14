/// <reference path="../app.d.ts" />

// import * as axios from 'axios'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Utils from '../libs/utils'
// import * as api from '../api'

// NOTE: Components
import CurrentWord from './show-current-word'
import CorrectSpelling from './show-correct-spelling'

export default class Words extends React.Component<QuizAssistant.WordsProps, QuizAssistant.WordsState> {
    constructor(props: QuizAssistant.WordsProps) {
        super(props)

        let displayName: string = 'Spelling Words Application'

        this.state = {
            currentSpelling: '',
            currentWord: '',
            displayTime: 5000,
            showWord: true,
            skill: '',
            spellingChecked: false,
            spellingMatches: false,
            spellingWords: [],
            spellingWordsCount: 0,
            title: ''
        }

        // Scope functions...
        this.displayWord = this.displayWord.bind(this)
        this.getRandomWord = this.getRandomWord.bind(this)
        this.handleNextWord = this.handleNextWord.bind(this)
        this.handleSpellingChange = this.handleSpellingChange.bind(this)
        this.handleSpellingCheck = this.handleSpellingCheck.bind(this)

        // console.info( '\nMounted: \'Words\'' )
    }


    componentWillMount() {
        // console.info("Component Will Mount")
    }

    componentDidMount() {
        // console.info('Component Did Mount')
        // api.getQuiz(this.props.currentQuizID).then(data => {
        //     // console.info(data);

        //     this.setState({
        //         spellingWords: data.spellingWords,
        //         spellingWordsCount: data.spellingWords.length,
        //         title: data.title,
        //         skill: data.skill
        //     });

        //     // NOTE: Get a random Word
        //     this.getRandomWord();
        // }).catch(console.error);
    }

    componentWillUpdate() {
        // console.info("Component Will Update")
    }

    componentDidUpdate() {
        // console.info("Component Updated")
    }

    componentWillUnmount() {
        // console.info( "Unmounted ShowCurrentWord" )
    }

    // NOTE: Get a random word
    getRandomWord() {
        let rndNum = Math.floor(Math.random() * this.state.spellingWordsCount)
        let wrd = this.state.spellingWords[rndNum]

        this.displayWord()
        this.setState(
          {
            currentWord: wrd
          }
        )
    }

    displayWord() {
        // NOTE: Make sure the timer stops running.
        this.stopTimer()

        // NOTE: Update visibility state
        this.setState({showWord: true})

        // NOTE: Restart the timer
        this.startTimer()
    }

    handleNextWord(event: any) {
        this.setState({currentSpelling: '', spellingMatches: false, spellingChecked: false})

        event.target.value = ''
        this.getRandomWord()
    }

    handleSpellingChange(event: any) {
        this.setState({currentSpelling: event.target.value.toLowerCase()})
    }

    handleSpellingCheck(event: any) {
        if (this.state.currentSpelling === this.state.currentWord) {
            this.setState({spellingMatches: true, spellingChecked: true})
        } else {
            this.setState({spellingMatches: false, spellingChecked: true})
        }
    }

    hideWord() {
        this.stopTimer()
        this.setState({showWord: false})
    }

    startTimer() {
        QuizAssistant.timerID = setInterval(() => this.hideWord(), this.state.displayTime)
    }

    stopTimer() {
        clearInterval(QuizAssistant.timerID)
    }

    render() {
        let currentSpelling = this.state.currentSpelling

        return (
            <section id="rapper">
                <header>
                    <h3>
                        <em>{this.state.title}</em>
                    </h3>
                    <p className="skills">{this.state.skill}</p>
                </header>

                <CurrentWord visibility={this.state.showWord} word={this.state.currentWord}/>
                <CorrectSpelling show={this.state.spellingMatches} checked={this.state.spellingChecked}/>

                <p><input placeholder="Spell the word..." type="text" name="current-spelling" value={currentSpelling} onChange={this.handleSpellingChange} autoFocus={true} onKeyPress={Utils.checkEnter}/>
                    <button id="check-spelling" onClick={this.handleSpellingCheck}>Check It</button>
                </p>

                <button onClick={this.displayWord}>Show Word Again</button>
                <button onClick={this.handleNextWord}>Show Next Word</button>

                <footer>
                    <section id="total-words">Total Words: {this.state.spellingWordsCount}</section>
                </footer>
            </section>
        )
    }
}

// Words.defaultProps = {
//   quizID: Utils.getUrlParam('list') || '20161127',
//   displayTime: Utils.getUrlParam('displayTime')
//   // countSpelling: Utils.getCount(this.wordList.spellingWords)
// }
