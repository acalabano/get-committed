import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {createTask, removeTask, updateTask, getTasks} from '../reducers/task'
import {removePixel, updatePixel, loadPixel, createPixelTask} from '../reducers/pixel'

class SinglePixel extends React.Component {
  constructor(props) {
    super(props)
    this.props.loadSinglePixel(this.props.pixelId)
    this.state={
      chosenPixel: this.props.pixels.get(parseInt(this.props.pixelId)-1),
      deletedSuccesfully: false,
      completedTasks: [...(this.props.tasks.filter(task => task.taskDone === true))]
    }
    this.removePixelCallback=this.removePixelCallback.bind(this)
    this.onUpdatePixelSubmit=this.onUpdatePixelSubmit.bind(this)
    this.onTaskSubmit=this.onTaskSubmit.bind(this)
    this.removeTaskCallback=this.removeTaskCallback.bind(this)
    this.markTaskDone=this.markTaskDone.bind(this)
    this.onResetTasks=this.onResetTasks.bind(this)
  }

  componentDidMount() {
    console.log('GETTING HERE AGAIN')
  }

  removePixelCallback(event) {
    const removeOnePixel = this.props.removeOnePixel
    removeOnePixel(this.props.pixelId)
    this.setState({deletedSuccesfully: true})
    browserHistory.push(`/deleted/${this.props.userId}`)
  }

  onUpdatePixelSubmit(event) {
    event.preventDefault()
    let updatedPixelInfo = {
      color: event.target.color.value,
      day: event.target.day.value,
      content: event.target.content.value
    }
    console.log('PIXEL INFO UPDATED', updatedPixelInfo)
    this.props.updateOnePixel(this.props.pixelId, updatedPixelInfo.color, updatedPixelInfo.day, updatedPixelInfo.content, this.props.pixels.get(this.props.pixelId).pixelTasks)
  }

  onTaskSubmit(event) {
    event.preventDefault()
    let taskInfo = {
      content: event.target.content.value,
      done: false,
      taskFrequency: event.target.taskFrequency.value
    }
    this.props.addAPixelTask(parseInt(this.props.pixelId), taskInfo.content, taskInfo.done, taskInfo.taskFrequency)
  }

  removeTaskCallback(index) {
    const removeATask = this.props.removeATask
    removeATask(index)
  }

  markTaskDone(idx) {
    this.props.updateATask(idx, true)
    console.log('TESTING DONNNE TASKS BEFORE', [...(this.props.tasks.filter(task => task.taskDone === true))])
    this.setState({completedTasks: ([...(this.props.tasks.filter(task => task.taskDone === true))])})
    console.log('TESTING DONNNE TASKS AFTER', [...(this.props.tasks.filter(task => task.taskDone === true))])
    if ([...(this.props.tasks.filter(task => task.taskDone === true))].length < 1) {
      this.props.updateOnePixel(this.props.pixelId, 'white', '', '')
    } else if ([...(this.props.tasks.filter(task => task.taskDone === true))].length >0) {
      this.props.updateOnePixel(this.props.pixelId, '#00FF00', '', '')
    }
  }

  markIncomplete(idx) {
    this.props.updateATask(idx, false)
    this.setState({completedTasks: ([...(this.props.tasks.filter(task => task.taskDone === true))])})
    if ([...(this.props.tasks.filter(task => task.taskDone === true))].length < 1) {
      this.props.updateOnePixel(this.props.pixelId, 'white', '', '')
    } else if ([...(this.props.tasks.filter(task => task.taskDone === true))].length >0) {
      this.props.updateOnePixel(parseInt(this.props.pixelId), '#00FF00', '', '')
    }
  }

  onResetTasks(frequencyString) {
    this.props.tasks.filter((task) => task.taskFrequency === frequencyString && task.taskDone === true).forEach(task => {
      const taskIndex= this.props.tasks.indexOf(task)
      this.markIncomplete(taskIndex)
    })
  }

  render() {
    let thatPixel=this.props.pixels.get(parseInt(this.props.pixelId))
    return (thatPixel)?
    (

      <div>
        {
          console.log('heyaae ababeiuabiegwf', this.props.pixels.get(this.props.pixelId).pixelTasks)
        }
        <h1>{thatPixel.pixelDay} Pixel</h1>
        <div id="wrapper" style={{backgroundColor: thatPixel.pixelColor, width: `${10}vh`, height: `${10}vh`}}><p className="text">{thatPixel.pixelColor}</p></div>
        <h3>Entry: </h3>
        <p>{thatPixel.pixelContent}</p>
        <hr />
        <h3>Update Pixel Information:</h3>
        <div className="row col-lg-4">
          <form onSubmit={this.onUpdatePixelSubmit}>
            <label htmlFor="color" className="mr-sm-2">Pixel Color:</label>
            <div className="form-group">
              <input className="form-control mb-2 mr-sm-2 mb-sm-0" type="color" id="color" />
            </div>
            <a href="/mirror.html"> Click here for the mirror page to check your mood!</a>
            <br></br>
            <label htmlFor="day" className="mr-sm-2"> Day: </label>
            <div className="form-group">
              <input className="form-control" type="date" id="day" />
            </div>
            <label htmlFor="content" className="mr-sm-2">Content: </label>
            <div className="form-group">
              <textarea className="form-control" cols="40" rows="5" id="content"></textarea>
            </div>
            <button className="btn btn-default" type="submit">Update</button>
          </form>
        </div>
        <div className="row col-lg-12">
        <hr />

          <button className="btn btn-default" name="deletePixel" onClick={this.removePixelCallback}>Delete Pixel</button>

        </div>
        <div className="row">
        <div className="col-lg-4">
          <form onSubmit={this.onTaskSubmit}>
          <div className="form-group">
            <input className="form-control" type="text" id="content"></input>
          </div>
          <select id="taskFrequency">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
          </select>
            <button className="btn btn-default" type="submit">Add Task</button>
          </form>
        </div>
        </div>
        <br></br>
        <h2>Daily Tasks</h2>
        <button className="btn btn-warning" onClick={() => this.onResetTasks('daily')}>Reset my Dailies</button>
          <div className="container-fluid">
             <div className="row">
               <div className="col-lg-6">
               <h3>Incomplete tasks</h3>
               <div>
               {
                 thatPixel.pixelTasks
               }
              </div>
             </div>
             <div className="col-lg-6">
             <h3>Done!</h3>
             {
               this.props.tasks.filter((task) => task.taskFrequency === 'daily' && task.taskDone === true).map(task => {
                 let taskIndex= this.props.tasks.indexOf(task)
                 return (
                   <div key={taskIndex}><input className="task-item" type="checkbox" checked={true} onChange={() => this.markIncomplete(taskIndex)}/>{task.taskContent} <button className="btn-danger" onClick={() => this.removeTaskCallback(taskIndex)}>X</button></div>
                 )
               })
             }
              </div>
            </div>
           </div>
      </div>
    ):null
  }
}

/* ---CONTAINERS--- */
const mapStateToProps = (state, ownProps) => ({
  pixels: state.pixel.pixels,
  tasks: state.task.tasks,
  userId: ownProps.userId,
  pixelId: ownProps.pixelId
})

const mapDispatchToProps = (dispatch) => ({
  removeOnePixel: (pixelId) => {
    dispatch(removePixel(pixelId))
  },
  updateOnePixel: (pixelId, pixelColor, pixelDay, pixelContent, pixelTasks) => {
    console.log('DISPATCHING WORKS?', pixelColor)
    dispatch(updatePixel(pixelId, pixelColor, pixelDay, pixelContent, pixelTasks))
  },
  loadSinglePixel: (pixelId) => {
    dispatch(loadPixel(pixelId))
  },
  addAPixelTask: (pixelId, taskContent, taskDone, taskFrequency) => {
    dispatch(createPixelTask(pixelId, taskContent, taskDone, taskFrequency))
  },
  addATask: (taskContent, taskDone, taskFrequency) => {
    dispatch(createTask(taskContent, taskDone, taskFrequency))
  },
  removeATask: (taskId) => {
    dispatch(removeTask(taskId))
  },
  updateATask: (taskId, taskDone) => {
    dispatch(updateTask(taskId, taskDone))
  },
  loadTasks: () => {
    dispatch(getTasks())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePixel)
