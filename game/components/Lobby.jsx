'use strict'
import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import { connect, Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {createGame, removeGame} from '../reducers/game'
import reducer from '../reducers'
import firebase from 'APP/fire'

let n = 5
let added = false
class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      currentN: 6,
      gamesArray: [1, 2, 3, 4, 5],
      didUserAddNewLobby: false,
      currentUserId: '',
      currentUsername: '',
    }

    this.onLobbySubmit=this.onLobbySubmit.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUserId: user.uid, currentUsername: user.displayName })
      }
    })
    console.log('LOBBYYYYY DIDMOUNT', this.props)
  }
  onLobbySubmit() {
    this.props.createAGame(this.props.games.size+1)
  }
  render() {
    return (
      <div className='lobby-background'>
        <div className='onfire-image'></div>
        <div className='game-name'></div>
        <div className='lobby-list-box'>
          <p className='choose-lobby text-center'>
            CHOOSE A LOBBY
          </p>
          <div className ='lobby-list text-center'>
            <h2><Link key={this.state.currentUserId} className='lobby-link' to={`/pixels/${this.state.currentUserId}`}>{this.state.currentUsername}s PIXEL BOARD</Link></h2>
            {
              (this.props.games.size>0)?
              this.props.games.map((game) => (<h2><Link key={game} className='lobby-link' to={`/pixels/${game.id}`}>PUBLIC PIXEL BOARD # {game.id}</Link></h2>)):<h2></h2>
            }
            <button className='add-lobby' type="button" onClick={this.onLobbySubmit}>
              <img src="/images/avatars/YellowPuppy.png" style={{width: '70px', height: '70px'}}/> Add Lobby</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({game}) => ({games: game.games})
const mapDispatchToProps = dispatch => ({
  createAGame: (id) => {
    dispatch(createGame(id))
  },
  removeAGame: (id) => {
    dispatch(removeGame(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
