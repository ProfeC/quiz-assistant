import React from 'react';
import ReactDOM from 'react-dom';
import PageHeader from './page-header';
import PageFooter from './page-footer';
// import week1 from '../data/20161031.json';
import week2 from '../data/20161107.json';

require('../scss/app.scss');

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			allWords: [],
			currentSpelling: '',
			currentWord: '',
			displayTime: 5000,
			hfaWords: [],
			showWord: true,
			spellingChecked: false,
			spellingMatches: false,
			spellingWords: [],
			spellingWordsCount: 0
		}

		// Scope functions...
		this.getWords = this.getWords.bind(this);
		this.displayWord = this.displayWord.bind(this);
		this.getRandomWord = this.getRandomWord.bind(this);
		this.handleNextWord = this.handleNextWord.bind(this);
		this.handleSpellingChange = this.handleSpellingChange.bind(this);
		this.handleSpellingCheck = this.handleSpellingCheck.bind(this);

		// console.info( "\nMounted: 'App'" );
	}

	componentWillMount() {
		this.getWords();
	}

	componentDidMount() {
		this.getRandomWord();
		// console.info("\nSpelling Word Count: " + this.state.spellingWordsCount);
	}

	componentWillUpdate() {
		// console.info("\nRandom Word: " + this.state.currentWord);
	}

	componentWillUnmount() {
		// console.info( "Unmounted ShowCurrentWord" );
	}

	// NOTE: Get words from all lists.
	getWords(props) {
		// for ( var word of week1.spellingWords ) {
		// 	this.state.spellingWords.push(word);
		// }

		// for ( var word of week2.spellingWords ) {
		// 	this.state.spellingWords.push(word);
		// }

		// this.setState({spellingWordsCount: this.state.spellingWords.length});
		this.setState({
			spellingWords: week2.spellingWords,
			spellingWordsCount: week2.spellingWords.length
		});
	}

	// NOTE: Get a random word
	getRandomWord() {
		const rndNum =  Math.floor(Math.random() * this.state.spellingWords.length);
		const wrd = this.state.spellingWords[rndNum];
		// console.info(wrd);
		this.setState({currentWord: wrd});
		this.displayWord();
	}

	displayWord() {
		// NOTE: Make sure the timer stops running.
		this.stopTimer();

		// NOTE: Update visibility state
		this.setState({showWord: true});

		// NOTE: Restart the timer
		this.startTimer();
	}

	handleNextWord(event) {
		this.setState({
			currentSpelling: '',
			spellingMatches: false,
			spellingChecked: false
		});
		event.target.value = '';
		this.getRandomWord();
	}

	handleSpellingChange(event) {
		this.setState({currentSpelling: event.target.value});
	}

	handleSpellingCheck(event) {
		// alert('Text field value is: ' + this.state.currentSpelling + '\n\nThe word was: ' + this.state.currentWord);

		if ( this.state.currentSpelling === this.state.currentWord ) {
			// alert('Spellings match...');
			this.setState({
				spellingMatches: true,
				spellingChecked: true
			});
		} else {
			// alert('Spellings don\'t match...');
			this.setState({
				spellingMatches: false,
				spellingChecked: true
			});
		}
	}

	hideWord() {
		this.stopTimer();
		this.setState({showWord: false});
	}

	startTimer() {
		this.timerID = setInterval(
			() => this.hideWord(),
			this.state.displayTime
		);
		// console.info("\n*** Timer Started ***\n");
	}

	stopTimer() {
		clearInterval( this.timerID );
		// console.info("\n*** Timer Stopped ***\n");
	}

	render() {
		const currentSpelling = this.state.currentSpelling;
		const wordStyle = this.state.showWord ? 'visible' : 'hidden';
		// console.info("\nWord Style: " + wordStyle);

		return (
			<section id="rapper">
				<PageHeader />

				<h2 id="current-word" style={{visibility: wordStyle}}>{ this.state.currentWord }</h2>
				<p><input tabIndex="1" placeholder="Spell the word..." type="text" name="current-spelling" value={currentSpelling} onChange={this.handleSpellingChange} />
				<button id="check-spelling" onClick={this.handleSpellingCheck}>Check It</button>
				</p>

				<CorrectSpelling show={this.state.spellingMatches} checked={this.state.spellingChecked} />

				<button onClick={this.displayWord}>Show Word Again</button>
				<button onClick={this.handleNextWord}>Show Next Word</button>

				<PageFooter totalWords={this.state.spellingWordsCount} />
			</section>
		);
	}
}

class CorrectSpelling extends App {
	constructor(props) {
		super(props);

		// console.info( "\nMounted: 'Correct Spelling' Component." );
	}

	render() {
		const showMe = this.props.show;
		const checkMe = this.props.checked;
		// console.log({showMe});
		// console.log({checkMe});

		if ( !this.props.checked ) {
			return (
				null
			);
		}

		if ( this.props.checked && !this.props.show ) {
			return (
				<h2 className="incorrect">Incorrect!</h2>
			);
		}

		return (
			<div>
				<h2 className="correct">Correct!</h2>
			</div>
		);
	}
}


// NOTE: Render the app on the page.
ReactDOM.render( <App />, document.getElementById( 'root' ) );
