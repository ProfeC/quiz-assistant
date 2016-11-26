import React from 'react'

class ShowCorrectSpelling extends React.Component {
  constructor (props) {
    super(props)

    this.displayName = 'Show Correct Spelling'

    // console.info( "\nMounted: 'Correct Spelling' Component." )
  }

  render () {
    const showMe = this.props.show
    const checkMe = this.props.checked
    // console.log({showMe})
    // console.log({checkMe})

    if (!this.props.checked) {
      return (
        null
      )
    }

    if (this.props.checked && !this.props.show) {
      return (
        <h2 className="incorrect">Incorrect!</h2>
      )
    }

    return (
      <div>
        <h2 className="correct">Correct!</h2>
      </div>
    )
  }
}

export default ShowCorrectSpelling
