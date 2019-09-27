import React, { Component } from 'react';
import './Header.css';
import { Button } from 'semantic-ui-react'

class Header extends Component {

  render () {
    return (
      <div className='header-container'>
        <span className='header-text'> Find your COCKTAIL or </span>
        <Button
          color='violet'
          onClick={this.props.random}
        > Click here </Button>
      </div>
    )
  }
}

export default Header;
