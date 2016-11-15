import React from 'react';

class ShowCurrentWord extends React.Component {
	constructor( props ) {
		super( props );

		// console.info( "\nMounted: 'Current Word' Component." );
	}

	render() {
		const wordStyle = this.props.visibility ? 'visible' : 'hidden';
		console.info("\nWord Style: " + wordStyle);

		return (<h1 id="current-word" style={{ visibility: wordStyle }}>{ this.props.word }</h1>);
	}
}

export default ShowCurrentWord;
