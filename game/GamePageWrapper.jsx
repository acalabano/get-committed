import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import GamePage from './components/GamePage'

export default ({params: {uid}}) =>
    <div className='gamePage'>
      <GamePage fireRef={db.ref('board').child(uid)} gameId={uid}/>
  </div>
