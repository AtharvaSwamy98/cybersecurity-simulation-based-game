import React, { Component } from 'react'
import './Header.css'; // Import the CSS file for the header

 class Header extends Component {
  render() {
    return (
     <header className="header-container">
        <span className='header-text'>CyberGame</span>
      </header>
    )
  }
}
export default Header;
