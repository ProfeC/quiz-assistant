import * as React from 'react'

export interface PageHeaderProps{
    homeLinkClick: any;
    skill: string;
    title: string;
}

export interface PageHeaderState{}

export default class PageHeader extends React.Component<PageHeaderProps, PageHeaderState> {
    // static propTypes = {
    //     title: PropTypes.string.isRequired,
    //     homeLinkClick: PropTypes.func.isRequired
    // }

    constructor(props: PageHeaderProps) {
        super(props)
        this.state = {}

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
