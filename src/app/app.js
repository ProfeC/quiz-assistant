import React from 'react'
import ReactDOM from 'react-dom'
import * as Utils from './utils'

// NOTE: Layout
import PageHeader from './page-header'
import PageFooter from './page-footer'

// NOTE: Components
import CurrentWord from './show-current-word'
import CorrectSpelling from './show-correct-spelling'

// NOTE: Data
// import data from '../data/20161031.json'
import data from '../data/20161107.json'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.displayName = 'Main Application'

    this.state = {
      allWords: [],
      currentSpelling: '',
      currentWord: '',
      displayTime: 5000,
      hfaWords: [],
      list: '',
      showWord: true,
      spellingChecked: false,
      spellingMatches: false,
      spellingWords: [],
      spellingWordsCount: 0
    }

    // Scope functions...
    this.getWords = this.getWords.bind(this)
    this.displayWord = this.displayWord.bind(this)
    this.getRandomWord = this.getRandomWord.bind(this)
    this.handleNextWord = this.handleNextWord.bind(this)
    this.handleSpellingChange = this.handleSpellingChange.bind(this)
    this.handleSpellingCheck = this.handleSpellingCheck.bind(this)

    // console.info( "\nMounted: 'App'" )
  }

  componentWillMount () {
    // console.info("Component Will Mount")
    this.getWords()

    if (location.search) {
      this.setState({
        list: Utils.getUrlParam('list')
      })
    }

  }

  componentDidMount () {
    // console.info("Component Did Mount")
    // console.info("\nSpelling Word Count: " + this.state.spellingWordsCount)
    this.getRandomWord()

    this.setState({
      hfaWords: Utils.getSpellingWords(this.state.list)
    })
  }

  componentWillUpdate () {
    // console.info("Component Will Update")
    // console.info("\nRandom Word: " + this.state.currentWord)
  }

  componentDidUpdate () {
    // console.info("Component Updated")
  }

  componentWillUnmount () {
    // console.info( "Unmounted ShowCurrentWord" )
  }

  // NOTE: Get words from all lists.
  getWords () {
    // for ( var word of week1.spellingWords ) {
    //  this.state.spellingWords.push(word)
    // }

    // for ( var word of data.spellingWords ) {
    //  this.state.spellingWords.push(word)
    // }

    // this.setState({spellingWordsCount: this.state.spellingWords.length})
    this.setState({
      spellingWords: data.spellingWords,
      spellingWordsCount: data.spellingWords.length,
      spellingWordsTitle: data.title
    })
  }

  // NOTE: Get a random word
  getRandomWord () {
    const rndNum = Math.floor(Math.random() * this.state.spellingWords.length)
    const wrd = this.state.spellingWords[rndNum]
    // console.info(wrd)
    this.setState({currentWord: wrd})
    this.displayWord()
  }

  displayWord () {
    // NOTE: Make sure the timer stops running.
    this.stopTimer()

    // NOTE: Update visibility state
    this.setState({showWord: true})

    // NOTE: Restart the timer
    this.startTimer()
  }

  handleNextWord (event) {
    this.setState({
      currentSpelling: '',
      spellingMatches: false,
      spellingChecked: false
    })

    event.target.value = ''
    this.getRandomWord()
  }

  handleSpellingChange (event) {
    this.setState({currentSpelling: event.target.value.toLowerCase()})
  }

  handleSpellingCheck (event) {
    // alert('Text field value is: ' + this.state.currentSpelling + '\n\nThe word was: ' + this.state.currentWord)

    if (this.state.currentSpelling === this.state.currentWord) {
      // alert('Spellings match...')
      this.setState({
        spellingMatches: true,
        spellingChecked: true
      })
    } else {
      // alert('Spellings don\'t match...')
      this.setState({
        spellingMatches: false,
        spellingChecked: true
      })
    }
  }

  hideWord () {
    this.stopTimer()
    this.setState({showWord: false})
  }

  startTimer () {
    this.timerID = setInterval(
      () => this.hideWord(),
      this.state.displayTime
    )
    // console.info("\n*** Timer Started ***\n")
  }

  stopTimer () {
    clearInterval(this.timerID)
    // console.info("\n*** Timer Stopped ***\n")
  }

  render () {
    const currentSpelling = this.state.currentSpelling

    return (
      <section id="rapper">
        <PageHeader title={ this.state.spellingWordsTitle } />

        <CurrentWord visibility={ this.state.showWord } word={ this.state.currentWord } />

        <p><input tabIndex="1" placeholder="Spell the word..." type="text" name="current-spelling" value={currentSpelling} onChange={this.handleSpellingChange} autoFocus={true} onKeyPress={Utils.checkEnter} />
        <button id="check-spelling" onClick={this.handleSpellingCheck}>Check It</button>
        </p>

        <CorrectSpelling show={this.state.spellingMatches} checked={this.state.spellingChecked} />

        <button onClick={this.displayWord}>Show Word Again</button>
        <button onClick={this.handleNextWord}>Show Next Word</button>

        <PageFooter totalWords={this.state.spellingWordsCount} />
      </section>
    )
  }
}

// NOTE: Render the app on the page.
ReactDOM.render(<App />, document.getElementById('root'))
