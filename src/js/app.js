import React from 'react';
import ReactDOM from 'react-dom';
import PageHeader from './page-header';
import PageFooter from './page-footer';
// import FormSpellchecker from './form-spellchecker';
import week1 from '../data/20161031.json';
import week2 from '../data/20161107.json';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			spellingWords: [],
			allWords: [],
			hfaWords: [],
			spellingWordsCount: 0,
			randomWord: '',
			currentSpelling: '',
			showWord: true
		}

		// Scope functions...
		this.getWords = this.getWords.bind(this);
		this.getRandomWord = this.getRandomWord.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {
		this.getWords();
		this.getRandomWord();
		// this.displayWord();
	}

	componentDidMount() {
		console.log( "Mounted: 'App'" );
	}

	componentWillUpdate() {
		// this.displayWord();
	}

	componentWillUnmount() {
		// console.log( "Unmounted ShowCurrentWord" );
	}

	// NOTE: Get words from all lists.
	getWords(props) {
		for ( var word of week1.spellingWords ) {
			this.state.spellingWords.push(word);
		}

		for ( var word of week2.spellingWords ) {
			this.state.spellingWords.push(word);
		}

		this.setState({spellingWordsCount: this.state.spellingWords.length});
		// console.log('Spelling Word Count: ' + this.state.spellingWordsCount);
	}

	// NOTE: Get a random word
	getRandomWord() {

		var rndNum =  Math.floor(Math.random() * this.state.spellingWords.length);

		var wrd = this.state.spellingWords[rndNum];
		// console.log(wrd);
		this.setState({randomWord: wrd});
		this.displayWord();
	}

	displayWord() {
		this.startTimer();
		this.setState({showWord: true});
		console.log("timer started!");
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		this.setState({showWord: true});
		alert('Text field value is: ' + this.state.value + '\n\nThe word was: ' + this.props.word);
	}

	hideWord() {
		console.log("timer's up!");
		clearInterval( this.timerID );
		this.setState({showWord: false});
	}

	startTimer() {
		this.timerID = setInterval(
			() => this.hideWord(),
			3000
		);
	}

	render() {
		console.log("Spelling Word Count: " + this.state.spellingWordsCount);
		// console.log("Random Number: " + this.state.rndNum);
		console.log("Random Word: " + this.state.randomWord);

		const currentSpelling = this.state.value;

		var wordStyle;
		wordStyle = this.state.showWord ? 'visible' : 'hidden';
		console.log("Word Style: " + wordStyle);

		return (
			<section id="rapper">
				<PageHeader />



				<h2 id="current-word" style={{visibility: wordStyle}}>{ this.state.randomWord }</h2>
				<p><input placeholder="Spell the word..." type="text" name="current-spelling" value={currentSpelling} onChange={this.handleChange} /></p>
				<input type="submit" onClick={this.handleSubmit} value="Check Your Spelling" />
				<button onClick={this.getRandomWord}>Show Next Word</button>
				<PageFooter />
			</section>
		);
	}
}

ReactDOM.render( <App />, document.getElementById( 'root' ) );
