import React from 'react'

class PageHeader extends React.Component {
    constructor(props) {
        super(props)

        // console.info( "\nMounted: 'Current Word' Component." )
    }

    render() {
        return (
            <header>
                <h3>
                    <em><a href="/" title={this.props.title}>{this.props.title}</a></em>
                </h3>
                <p className="skills">{this.props.skill}</p>
            </header>
        )
    }
}

export default PageHeader
