import React, {Component, PropTypes} from 'react'

class PageHeader extends React.Component {
    constructor(props) {
        super(props)

        // console.info( "\nMounted: 'Current Word' Component." )
    }

    render() {
        return (
            <header>
                <h3>
                    <em><a onClick={this.props.homeLinkClick}>{this.props.title}</a></em>
                </h3>
                <p className="skills">{this.props.skill}</p>
            </header>
        )
    }
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    homeLinkClick: PropTypes.func.isRequired
}

export default PageHeader
