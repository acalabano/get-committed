'use strict'
import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'
import {addPixel, getPixels} from '../reducers/pixel'
import reducer from '../reducers/'
import firebase from 'APP/fire'
import {List} from 'immutable'

class AllPixels extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      currentUserId: '',
      currentUsername: '',
      addButtonClicked: false
    }
    this.onPixelSubmit=this.onPixelSubmit.bind(this)
  }

  componentWillMount() {
    this.props.loadPixels()
    console.log('IS Willmount GOING FIRST')
  }

  onPixelSubmit(event) {
    event.preventDefault()
    console.log('EVENT TARGETSSSS', event.target)
    console.log(event.target.color)
    console.log(event.target.day)
    console.log(event.target.content)
    let pixelInfo = {
      color: event.target.color.value,
      day: event.target.day.value,
      content: event.target.content.value
    }
    this.props.addAPixel(pixelInfo.color, pixelInfo.day, pixelInfo.content, null)
    this.setState({addButtonClicked: false})
  }

  render() {
    console.log('ALLLL PIXELSSSSSS AFTER RENDER', [...this.props.pixels])
    let pixLength= this.props.pixels.size
    let height=100/(pixLength)
    let width
    let offset
    if (pixLength>20) {
      offset=2
      height=100/Math.ceil(pixLength/5)
      width=100/(pixLength)
      width=100/Math.ceil(pixLength/5)
    }
    else if (pixLength>6) {
      offset=2
      width=100/Math.ceil(pixLength/3)
      height=100/Math.ceil(pixLength/3)
    }
    else {
      offset=Math.floor(12/pixLength)
    }
    return (
      <div className="">
        <h1>Welcome to the Pixel Mood App</h1>
        {this.state.addButtonClicked===false?
          <div>
            <button onClick={() => (this.setState({addButtonClicked: true}))} className="btn btn-default">Add Pixel +</button>
              <div className="container-fluid">
                <div className="row">

                  {
                    this.props.pixels.map(pixel => {
                      let pixelIndex= this.props.pixels.indexOf(pixel)
                      return (
                          <Link to={`/pixel/${this.props.gameId}/${pixelIndex}`} key={pixelIndex} style={{textDecoration: 'none'}}>
                            <div className={`col-md-${offset}`} id="wrapper" style={{backgroundColor: pixel.pixelColor, width: `${width}vh`, height: `${height}vh`}}><p className="text">{pixel.pixelDay}</p></div>
                          </Link>

                      )
                    })
                  }
                </div>
              </div>
            </div>:
            <div className="gamePage">
            <h1>Add a Pixel</h1>
              <div>
                <br></br>
                <a href="/mirror.html"> Click here for the mirror page to check your mood!</a>
                <br></br>
              </div>
              <div className="row col-lg-4">
                <form onSubmit={this.onPixelSubmit}>
                <div className="form-group">
                  <label htmlFor="color">Pixel Color:</label>
                  <input className="form-control" type="color" id="color" />
                </div>
                <div className="form-group">
                  <label htmlFor="day">Date: </label>
                  <input className="form-control" type="date" id="day" />
                </div>
                <div className="form-group">
                  <label htmlFor="content">What happened on this day: </label>

                  <textarea className="form-control" cols="40" rows="5" id="content"></textarea>
                </div>

                  <button className="btn btn-default" type="submit">Add New Pixel</button>
                </form>

              </div>
            </div>
        }
      </div>
    )
  }
}

// -- // -- // Container // -- // -- //

const mapState = ({pixel}) => ({
  pixels: pixel.pixels
})

const mapDispatch = dispatch => ({
  addAPixel: (pixelColor, pixelDay, pixelContent, pixelTasks) => {
    dispatch(addPixel(pixelColor, pixelDay, pixelContent, pixelTasks))
  },
  loadPixels: () => {
    dispatch(getPixels())
  }
})

export default connect(mapState, mapDispatch)(AllPixels)
