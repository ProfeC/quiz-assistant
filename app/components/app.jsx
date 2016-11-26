import React from 'react'
// import ReactDOM from 'react-dom'
import * as Utils from '../libs/utils'

// NOTE: Layout
import PageHeader from '../views/page-header'
import PageFooter from '../views/page-footer'

// NOTE: Components
import CurrentWord from './show-current-word'
import CorrectSpelling from './show-correct-spelling'

// NOTE: Data
// import data from '../data/20161031.json'
import data from '../data/20161127.json'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.displayName = 'Main Application'

    const wordList = Utils.getList(this.props.urlList)
    const title = wordList.title
    const skill = wordList.skill

    this.state = {
      currentSpelling: '',
      currentWord: '',
      displayTime: 5000,
      hfWords: wordList.hfwords,
      hfWordsCount: wordList.hfwords.length,
      showWord: true,
      skill: skill,
      skillWords: wordList.skillWords,
      skillWordsCount: wordList.skillWords.length,
      spellingChecked: false,
      spellingMatches: false,
      spellingWords: wordList.spellingWords,
      spellingWordsCount: wordList.spellingWords.length,
      title: title,
      wordList: wordList
    }

    // Scope functions...
    this.displayWord = this.displayWord.bind(this)
    this.getRandomWord = this.getRandomWord.bind(this)
    this.handleNextWord = this.handleNextWord.bind(this)
    this.handleSpellingChange = this.handleSpellingChange.bind(this)
    this.handleSpellingCheck = this.handleSpellingCheck.bind(this)

    // console.info( "\nMounted: 'App'" )
  }

  componentWillMount () {
    // console.info("Component Will Mount")
  }

  componentDidMount () {
    // console.info("Component Did Mount")

    // NOTE: Get a random Word
    this.getRandomWord()
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

  // NOTE: Get a random word
  getRandomWord () {
    // const intCount = this.state.wordList.spellingWords.length
    // console.info(intCount)

    // const rndNum = Math.floor(Math.random() * this.state.wordList.spellingWords.length)
    const rndNum = Math.floor(Math.random() * this.state.spellingWords.length)
    const wrd = this.state.spellingWords[rndNum]
    // console.info(wrd)
    this.displayWord(wrd)
    this.setState({currentWord: wrd})
  }

  displayWord (word) {
    // console.info(word)
    // NOTE: Make sure the timer stops running.
    this.stopTimer()
    // Utils.stopTimer(word)

    // NOTE: Update visibility state
    this.setState({showWord: true})

    // NOTE: Restart the timer
    this.startTimer()
    // console.log('Utils.startTimer(' + this.state.displayTime + ', ' + word + ', ' + this.hideWord + ')')
    // Utils.startTimer(this.state.displayTime, word, this.hideWord)
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
    // Utils.stopTimer(this.state.currentWord)
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
    let currentSpelling = this.state.currentSpelling
    // let wordCount = Utils.getCount(this.state.wordList.spellingWords)
    // console.info(wordCount)


    return (
      <section id="rapper">
        <PageHeader title={ this.state.title } skill={this.state.skill}/>

        <CurrentWord visibility={ this.state.showWord } word={ this.state.currentWord } />
        <CorrectSpelling show={this.state.spellingMatches} checked={this.state.spellingChecked} />

        <p><input tabIndex="1" placeholder="Spell the word..." type="text" name="current-spelling" value={currentSpelling} onChange={this.handleSpellingChange} autoFocus={true} onKeyPress={Utils.checkEnter} />
        <button id="check-spelling" onClick={this.handleSpellingCheck}>Check It</button>
        </p>

        <button onClick={this.displayWord}>Show Word Again</button>
        <button onClick={this.handleNextWord}>Show Next Word</button>

        <PageFooter totalWords={this.state.count} />
      </section>
    )
  }
}

App.defaultProps = {
  urlList: Utils.getUrlParam('list'),
  displayTime: Utils.getUrlParam('displayTime')
  // countSpelling: Utils.getCount(this.wordList.spellingWords)
}


// NOTE: Render the app on the page.
// ReactDOM.render(<App />, document.getElementById('root'))
