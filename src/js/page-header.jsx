import React from 'react'

class PageHeader extends React.Component {
  constructor (props) {
    super(props)

    // console.info( "\nMounted: 'Current Word' Component." )
  }

  render () {
    return (
      <header>
        <h3><em>"{ this.props.title }"</em> Spelling Quiz Assistant</h3>
      </header>
    )
  }
}

export default PageHeader
