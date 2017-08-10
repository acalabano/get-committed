import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Login from 'APP/app/components/Login'
import WhoAmI from 'APP/app/components/WhoAmI'
import { NavItem, Navbar, Nav } from 'react-bootstrap'

/* -----------------    COMPONENT     ------------------ */

const NavbarComp = ({ auth }) => {
  return (
        <nav className="navbar navbar-default navbar-fixed-top" style={{display: 'flex'}}>
          <div className="container">
          <ul className="nav navbar-nav">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/lobby">PIXELS</Link></li>
            <li><a href="/mirror.html">MIRROR</a></li>
          </ul>
          </div>
          <div className="login-navbar">
            <WhoAmI auth={auth} />
          </div>
        </nav>

  )
}

export default NavbarComp
