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

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      didUserAddNewLobby: false,
      currentUserId: '',
      currentUsername: '',
    }

    this.onLobbySubmit=this.onLobbySubmit.bind(this)
    this.removeGameCallback=this.removeGameCallback.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUserId: user.uid, currentUsername: user.displayName })
      }
    })
    console.log('LOBBYYYYY DIDMOUNT', this.props)
  }
  onLobbySubmit(event) {
    event.preventDefault()
    console.log('ADDING HUB?', event.target.name.value)
    this.props.createAGame(this.props.games.size+1, event.target.name.value)
  }

  removeGameCallback(event) {
    const removeAGame = this.props.removeAGame
    event.stopPropagation()
    removeAGame(event.target.id)
  }

  render() {
    return (
      <div className='lobby-background'>
        <div className='onfire-image'></div>
        <div className='game-name'></div>
        <div className='lobby-list-box'>
          <p className='choose-lobby text-center'>
            CHOOSE A HUB
          </p>
          <div className ='lobby-list text-center'>
            <h2><Link key={this.state.currentUserId} className='lobby-link' to={`/pixels/${this.state.currentUserId}`}>{this.state.currentUsername + "'"}s Main Commit Hub</Link></h2>
              {
                 (this.props.games.size>0)?
                 this.props.games.map((game) => {
                   let idx= this.props.games.indexOf(game)
                   return (
                   <div key={idx}><h2><Link className='lobby-link' to={`/pixels/${game.name}-${game.id}`}>Hub Name: {game.name}</Link></h2>
                     <button className="btn btn-danger" name="delete" id={idx} onClick={this.removeGameCallback}>X</button>
                   </div>)
                 })

                   :<div></div>

              }
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <form onSubmit={this.onLobbySubmit}>
              <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input className="form-control" type="text" id="name" />
              </div>
                <button className="btn btn-default" type="submit">Add Hub</button>
              </form>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({game}) => ({games: game.games})
const mapDispatchToProps = dispatch => ({
  createAGame: (id, name) => {
    dispatch(createGame(id, name))
  },
  removeAGame: (id) => {
    dispatch(removeGame(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
