import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import SinglePixelPage from './components/SinglePixelPage'

export default ({params: {uid, id}}) =>
    <div className='gamePage'>
      <SinglePixelPage fireRef={db.ref('board').child(uid)} boardId={uid} gameId={id}/>
  </div>
