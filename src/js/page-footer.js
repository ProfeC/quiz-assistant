import React from 'react'

class PageFooter extends React.Component {
  render () {
    return (
      <footer>
        <section id="total-words">Total Words: {this.props.totalWords}</section>
      </footer>
    )
  }
}

export default PageFooter
