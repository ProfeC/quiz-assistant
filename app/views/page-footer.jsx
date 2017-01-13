import React from 'react'

class PageFooter extends React.Component {
    constructor(props) {
        super(props)

        this.displayName = 'Page Footer'

        // console.info( "\nMounted: 'Current Word' Component." )
    }
    render() {
        return (
            <footer>
                <section id="total-words">Total Words: {this.props.totalWords}</section>
            </footer>
        )
    }
}

export default PageFooter
