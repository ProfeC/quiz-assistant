import React from 'react';

class ShowCurrentWord extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			showWord: true
		};
	}

	componentWillMount() {
		console.log( "Mounted ShowCurrentWord" );
		this.displayWord();
	}

	componentWillUnmount() {
		console.log( "Unmounted ShowCurrentWord" );
		clearInterval( this.timerID );
	}

	startTimer() {
		this.timerID = setInterval(
			() => this.hideWord(),
			5000
		);
	}

	hideWord() {
		console.log("timer's up!");
		clearInterval( this.timerID );
		this.setState({showWord: false});
	}

	displayWord() {
		this.startTimer();
		this.setState({showWord: true});
		console.log("timer started!");
	}

	render() {
		var wordStyle;
		wordStyle = this.state.showWord ? 'visible' : 'hidden';
		console.log("Word Style: " + wordStyle);

		return ( <h2 id="current-word" style={{visibility: wordStyle}}>{ this.props.word }</h2>);
	}
}

export default ShowCurrentWord;
