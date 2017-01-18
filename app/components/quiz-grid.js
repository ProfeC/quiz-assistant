import axios from 'axios'
import React from 'react'
// import ReactDOM from 'react-dom'
import * as Utils from '../libs/utils'

const pushState = (obj, url) => window.history.pushState(obj, '', url);

export default class QuizGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props,
            displayName: this.props.title
        }

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
        console.info(this.props.contestName);
    };

    render() {

        let data = this.state

        // return (
        //     {this.state.data.cards.all.spelling.map( item =>
        //         <article onClick="" className="nav-grid">
        //             <header>
        //                 <h3>{item.displayName}</h3>
        //             </header>
        //             <p>
        //                 {item.data.subject}
        //             </p>
        //         </article>
        //     )}
        // )

        return (
            <div>{JSON.stringify(data)}</div>
        )
    }
}

QuizGrid.propTypes = {
    // dataList: React.PropTypes.String
    // data: React.PropTypes.Struct
}