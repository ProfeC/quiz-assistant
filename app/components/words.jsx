import axios from 'axios'
import React from 'react'
// import ReactDOM from 'react-dom'
import * as Utils from '../libs/utils'
import * as api from '../api'

// NOTE: Components
import CurrentWord from './show-current-word'
import CorrectSpelling from './show-correct-spelling'

export default class Words extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Spelling Words Application'

        this.state = {
            currentSpelling: '',
            currentWord: '',
            displayTime: 5000,
            showWord: true,
            skill: '',
            spellingChecked: false,
            spellingMatches: false,
            spellingWords: {},
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
        api.getQuiz(this.props.currentQuizID).then(data => {
            // console.info(data);

            this.setState({
                spellingWords: data.spellingWords,
                spellingWordsCount: data.spellingWords.length,
                title: data.title,
                skill: data.skill
            });

            // NOTE: Get a random Word
            this.getRandomWord();
        }).catch(console.error);
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
        const rndNum = Math.floor(Math.random() * this.state.spellingWordsCount)
        const wrd = this.state.spellingWords[rndNum]

        this.displayWord(wrd)
        this.setState({currentWord: wrd})
    }

    displayWord(word) {
        // NOTE: Make sure the timer stops running.
        this.stopTimer()

        // NOTE: Update visibility state
        this.setState({showWord: true})

        // NOTE: Restart the timer
        this.startTimer()
    }

    handleNextWord(event) {
        this.setState({currentSpelling: '', spellingMatches: false, spellingChecked: false})

        event.target.value = ''
        this.getRandomWord()
    }

    handleSpellingChange(event) {
        this.setState({currentSpelling: event.target.value.toLowerCase()})
    }

    handleSpellingCheck(event) {
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
        this.timerID = setInterval(() => this.hideWord(), this.state.displayTime)
    }

    stopTimer() {
        clearInterval(this.timerID)
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

                <p><input tabIndex="1" placeholder="Spell the word..." type="text" name="current-spelling" value={currentSpelling} onChange={this.handleSpellingChange} autoFocus={true} onKeyPress={Utils.checkEnter}/>
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
