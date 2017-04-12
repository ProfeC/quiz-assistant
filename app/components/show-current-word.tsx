import * as React from 'react'

export interface ShowCurrentWordProps{
    visibility: string;
    word: string;
}

export interface ShowCurrentWordState{}

export default class ShowCurrentWord extends React.Component {
    constructor(props: ShowCurrentWordProps) {
        super(props)

        let displayName = 'Show Current Word'

        // console.info( "\nMounted: 'Current Word' Component." )
    }

    render() {
        const wordStyle = this.props.visibility
            ? 'visible'
            : 'hidden'
        // console.info("\nWord Style: " + wordStyle)

        return (
            <h1 id="current-word" style={{ visibility: wordStyle }}>{this.props.word}</h1>
        )
    }
}
