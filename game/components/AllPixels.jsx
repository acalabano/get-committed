'use strict'
import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'
import {addPixel, getPixels} from '../reducers/pixel'
import {createTask} from '../reducers/task'
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
    console.log(event.target.day)
    let pixelInfo = {
      day: event.target.day.value,
    }
    this.props.addAPixel('#E3E3E3', pixelInfo.day, '')
    this.setState({addButtonClicked: false})
    // this.props.tasks? this.props.tasks.forEach((taskInfo) => this.props.addATask(taskInfo.taskContent, taskInfo.taskDone, taskInfo.taskFrequency, pixelInfo.day)):null
    // console.log('THESE ARE THE TASKS SO FARRR', this.props.tasks)
  }

  render() {
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
    console.log('THESE ARE THE PROPS IN ALLPIXELS')
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
                      let pointerEventCondition= pixelIndex === (this.props.pixels.size - 1)? 'auto': 'none'
                      return (
                          <Link to={`/pixel/${this.props.userId}/${this.props.hubId}/${pixelIndex}`} key={pixelIndex} style={{textDecoration: 'none'}}>
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
              <div className="row col-lg-4">
                <form onSubmit={this.onPixelSubmit}>
                <div className="form-group">
                  <label htmlFor="day">Date: </label>
                  <input className="form-control" type="date" id="day" />
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

const mapState = ({pixel, task}) => ({
  pixels: pixel.pixels,
  tasks: task.tasks
})

const mapDispatch = dispatch => ({
  addAPixel: (pixelColor, pixelDay, pixelContent) => {
    dispatch(addPixel(pixelColor, pixelDay, pixelContent))
  },
  loadPixels: () => {
    dispatch(getPixels())
  },
  addATask: (taskContent, taskDone, taskFrequency, taskDay) => {
    dispatch(createTask(taskContent, taskDone, taskFrequency, taskDay))
  }
})

export default connect(mapState, mapDispatch)(AllPixels)
