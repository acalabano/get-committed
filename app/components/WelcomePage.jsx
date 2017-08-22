'use strict'
import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import firebase from 'APP/fire'

import Signin from './Signin'

class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      currentUserId: '',
      currentUsername: '',
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUserId: user.uid, currentUsername: user.displayName })
      }
    })
  }
  render() {
    return (
      <div className='homepage-background'>
      {
        this.state.currentUsername?
        <button className='enter-game btn btn-default'>
          <Link to={`/pixels/${this.state.currentUserId}/main`} activeClassName="active">Click to go to Your Main Commit Hub</Link>
        </button>:<h1>Please Log in to Preserve your data!</h1>
      }
      </div>
    )
  }
}

      //<div class='welcome-enter-btn-wrapper'>
       // <button className='welcome-enter-game btn btn-warning' type="submit" value="enter">
         // <Link to="/home" activeClassName="active">ENTER GAME</Link>
        //</button>
      //</div>

export default WelcomePage
