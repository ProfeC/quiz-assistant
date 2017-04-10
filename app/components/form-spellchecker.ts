import React from 'react';
// import ShowCurrentWord from './show-current-word';
// import NextWord from './next-word';

class FormSpellchecker extends React.Component {
  constructor(props) {
    super(props);

    this.displayName = 'Spell Checking Form'

    this.state = {
      currentSpelling: '',
      showWord: true
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleNextWord = this.handleNextWord.bind(this);
  }

  componentWillMount() {
    console.log( "Mounted ShowCurrentWord" );
    this.displayWord();
  }

  componentWillUnmount() {
    console.log( "Unmounted ShowCurrentWord" );
    clearInterval( this.timerID );
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

  handleNextWord() {
    getRandomWord();
  }

  hideWord() {
    console.log("timer's up!");
    clearInterval( this.timerID );
    this.setState({showWord: false});
  }

  startTimer() {
    this.timerID = setInterval(
      () => this.hideWord(),
      5000
    );
  }

  render() {
    const currentWord = this.props.word;
    const currentSpelling = this.state.value;

    var wordStyle;
    wordStyle = this.state.showWord ? 'visible' : 'hidden';
    console.log("Word Style: " + wordStyle);

    return (
      <div>
        <h2 id="current-word" style={{visibility: wordStyle}}>{ currentWord }</h2>
        <p><input placeholder="Spell the word..." type="text" name="current-spelling" value={currentSpelling} onChange={this.handleChange} /></p>
        <input type="submit" onClick={this.handleSubmit} value="Check Your Spelling" />
        <button onClick={this.handleNextWord}>Show Next Word</button>
      </div>
    );
  }
}

export default FormSpellchecker;

        /* <ShowCurrentWord word={currentWord} /> */
