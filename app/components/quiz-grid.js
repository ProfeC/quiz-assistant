import axios from 'axios'
import React from 'react'
// import ReactDOM from 'react-dom'
import * as Utils from '../libs/utils'

const pushState = (obj, url) => window.history.pushState(obj, '', url);

export default class QuizGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            category: null,
            displayName: 'Available Practice Quizes',
            spelling: []
        }

        // console.info( "\nMounted: 'Quiz Grid'" )
    }

    componentWillMount() {
        // console.info("Component Will Mount")
    }

    componentDidMount() {
        // console.info("Component Did Mount")

        axios.get('/api/files/navigation').then(resp => {
            // console.info(resp)
            // console.info(resp.data.category)
            // console.info(eval(this.resp))

            let spelling_items = resp.data.all.spelling.map(item => {
                return <li className="link-item" key={item.id} {...item}>{item.title}</li>
            })

            this.setState({
                data: resp.data,
                spelling: spelling_items
            })
        }).catch(console.error)
    }

    componentWillUpdate() {
        // console.info("Component Will Update")
    }

    componentDidUpdate() {
        console.info('Component Updated')
    }

    componentWillUnmount() {
        // console.info( "Unmounted ShowCurrentWord" )
    }

    render() {
        return (
            <div>
                <ul>
                    {JSON.stringify(this.state.data.all)}
                </ul>
                <ul>
                    {this.state.spelling}
                </ul>
            </div>
        )
    }
}

QuizGrid.propTypes = {
    // dataList: React.PropTypes.String
    // data: React.PropTypes.Struct
}
