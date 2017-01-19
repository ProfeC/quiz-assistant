import axios from 'axios'
import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import * as Utils from '../libs/utils'

const pushState = (obj, url) => window.history.pushState(obj, '', url);

export default class QuizGrid extends React.Component {
    constructor(props) {
        super(props)

        // this.state = {}

        // console.info( "\nMounted: 'Quiz Grid'" )
    }

    componentWillMount() {
        // console.info("Component Will Mount")
    }

    componentDidMount() {
        // console.info("Component Did Mount")
    }

    componentWillUpdate() {
        // console.info("Component Will Update")
    }

    componentDidUpdate() {
        // console.info('Component Updated')
    }

    componentWillUnmount() {
        // console.info( "Unmounted ShowCurrentWord" )
    }

    handleClick = () => {
        console.info(this.props.id)
        this.props.onQuizClick(this.props.id)
    };

    render() {
        return (
            <article onClick={this.handleClick} className="quiz">
                <header>
                    <h3>{this.props.title}</h3>
                </header>
                <p>
                    {this.props.subject}
                </p>
            </article>
        )
    }
}
