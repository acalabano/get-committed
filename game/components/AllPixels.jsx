'use strict'
import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'
import {addPixel, getPixels} from '../reducers/pixel'
import {createTask, removeTask} from '../reducers/task'
import reducer from '../reducers/'
import firebase from 'APP/fire'
import {List} from 'immutable'

class AllPixels extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      currentUserId: '',
      currentUsername: '',
      addButtonClicked: false,
    }
    this.onPixelSubmit=this.onPixelSubmit.bind(this)
    this.onTaskSubmit=this.onTaskSubmit.bind(this)
    this.removeTaskCallback=this.removeTaskCallback.bind(this)
  }

  onPixelSubmit(event) {
    event.preventDefault()
    let defaultTasks= this.props.tasks.filter((task) => task.taskDay=== '')
    let pixelInfo = {
      day: event.target.day.value,
    }
    this.props.addAPixel('#E3E3E3', pixelInfo.day, '')
    defaultTasks? defaultTasks.forEach((taskInfo) => this.props.addATask(taskInfo.taskContent, taskInfo.taskDone, taskInfo.taskFrequency, pixelInfo.day)):null
    // console.log('THESE ARE THE TASKS SO FARRR', this.props.tasks)
    this.setState({addButtonClicked: false})
  }

  onTaskSubmit(event) {
    event.preventDefault()
    let taskInfo = {
      content: event.target.taskContent.value,
      done: false,
      taskFrequency: 'daily',
    }
    this.props.addATask(taskInfo.content, taskInfo.done, taskInfo.taskFrequency, '')
    event.target.taskContent.value=''
  }

  removeTaskCallback(index) {
    const removeATask = this.props.removeATask
    removeATask(index)
  }

  render() {
    const defaultTasks=this.props.tasks.filter((task) => task.taskDay==='')
    let pixLength= this.props.pixels.size
    let height=11
    let width
    console.log('FINDING COLUMNS', pixLength/7)
    let columns= Array.from(new Array(Math.ceil(pixLength/7)), (x, i) => (i+1))
    console.log('FINDING COLUMNS ARRAY', columns)
    let offset=Math.floor(12/columns.length)

    if (pixLength <= 1) {
      offset= 12
      height= 100/Math.ceil(pixLength)
      width=100/pixLength
      width=100/Math.ceil(pixLength/6)
    } else {
      offset=1
    }

    let columnsShown = columns.slice()
    if (columns.length > 12) {
      columnsShown= columns.slice(columns.length-12, columns.length)
    }
    // if (pixLength>20) {
    //   offset=2
    //   height=100/Math.ceil(pixLength/5)
    //   width=100/(pixLength)
    //   width=100/Math.ceil(pixLength/5)
    // }
    // else if (pixLength>6) {
    //   offset=2
    //   width=100/Math.ceil(pixLength/3)
    //   height=100/Math.ceil(pixLength/3)
    // }
    // else {
    //   offset=Math.floor(12/pixLength)
    // }
    return (
      <div className="">
        <h1>Welcome to the Get Committed App</h1>
          <hr />
          <div className="row">
          <div className="col-lg-4">
            <form onSubmit={this.onTaskSubmit}>
              <label htmlFor="taskContent" className="mr-sm-2"> Task Content: </label>
            <div className="form-group">
              <input className="form-control" placeholder="Do my project, make a thing" type="text" id="taskContent" defaultValue=""></input>
            </div>
              <button className="btn btn-default" type="submit">Add a Daily Task</button>
            </form>
          </div>
          </div>
          <hr></hr>
        {this.state.addButtonClicked===false?
          <div>
            <button onClick={() => (this.setState({addButtonClicked: true}))} className="btn btn-default">Add Pixel +</button>
              <br></br>
              <br></br>
              <div className="container-fluid">
                <div className="row">
                  {
                    columnsShown.map(column =>
                      (
                        <div className={`col-lg-${offset}`} style ={{paddingRight: '0px'}} key={column}>

                          {
                            this.props.pixels.slice(7*(column-1), column*7).map(pixel => {
                              let pixelIndex= this.props.pixels.indexOf(pixel)
                              pixelIndex
                              return (
                                <div key={pixelIndex} style ={{paddingBottom: '5px'}}>
                                  <Link to={`/pixel/${this.props.userId}/${this.props.hubId}/${pixelIndex}`} key={pixelIndex} style={{textDecoration: 'none'}}>
                                    <div id="wrapper" style={{backgroundColor: pixel.pixelColor, width: `100%`, height: `${height}vh`}}><p className="text">{pixel.pixelDay}</p></div>
                                  </Link>
                                </div>

                              )
                            })
                          }
                        </div>
                      )
                      )
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
        <h2>Daily tasks you've added</h2>
        <div>
          <div className="container-fluid">
             <div className="row">
               <div className="col-lg-6">
               <div>
               {
                 defaultTasks.map(task => {
                   let taskIndex= this.props.tasks.indexOf(task)
                   return (
                     <div key={taskIndex}>{task.taskContent} <button className="btn-danger" onClick={(event) => {
                       event.preventDefault()
                       this.removeTaskCallback(taskIndex)
                     }}>X</button></div>
                   )
                 })
               }
              </div>
             </div>
           </div>
         </div>
       </div>
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
  },
  removeATask: (taskId) => {
    dispatch(removeTask(taskId))
  }
})

export default connect(mapState, mapDispatch)(AllPixels)
