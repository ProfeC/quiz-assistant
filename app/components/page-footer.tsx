import * as React from 'react'

export interface PageFooterProps {
    totalWords: number;
}

export interface PageFooterState {}


class PageFooter extends React.Component<PageFooterProps, PageFooterState> {
    constructor() {
        super()

        let displayName = 'Page Footer'

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
