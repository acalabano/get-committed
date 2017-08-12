import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {createTask, removeTask, updateTask, getTasks} from '../reducers/task'
import {removePixel, updatePixel, loadPixel, createPixelTask} from '../reducers/pixel'

class SinglePixel extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      completedTasks: [...(this.props.tasks.filter(task => task.taskDone === true))]
    }
    this.onTaskSubmit=this.onTaskSubmit.bind(this)
    this.removeTaskCallback=this.removeTaskCallback.bind(this)
    this.markTaskDone=this.markTaskDone.bind(this)
    this.onResetTasks=this.onResetTasks.bind(this)
  }

  componentDidMount() {
    console.log('GETTING HERE AGAIN')
  }

  onTaskSubmit(event) {
    event.preventDefault()
    let taskInfo = {
      content: event.target.content.value,
      done: false,
      taskFrequency: event.target.taskFrequency.value
    }
    this.props.addATask(taskInfo.content, taskInfo.done, taskInfo.taskFrequency)
  }

  removeTaskCallback(index) {
    const removeATask = this.props.removeATask
    removeATask(index)
  }

  markTaskDone(idx) {
    this.props.updateATask(idx, true)
    console.log('TESTING DONNNE TASKS AFTER', (this.props.tasks.filter((task) => task.taskDone === true)).size+1)
    if (((this.props.tasks.filter((task) => task.taskDone === true).size+1) *1.0/(this.props.tasks).size > (2.0/3)) && ((this.props.tasks).size>=6)) {
      this.props.updateOnePixel(this.props.pixelId, '#006600', '', '', this.props)
    } else if (((this.props.tasks.filter((task) => task.taskDone === true)).size+1) *1.0/(this.props.tasks).size > (1.0/3) && (this.props.tasks).size >= 3) {
      this.props.updateOnePixel(this.props.pixelId, '#00FF00', '', '', this.props)
    } else if ((this.props.tasks).size <=5 || (this.props.tasks.filter((task) => task.taskDone === true)).size+1 *1.0/(this.props.tasks).size < (1.0/3)) {
      this.props.updateOnePixel(this.props.pixelId, '#99FF33', '', '', this.props)
    }
  }

  markIncomplete(idx) {
    this.props.updateATask(idx, false)
    this.setState({completedTasks: ([...(this.props.tasks.filter(task => task.taskDone === true))])})
    if ((this.props.tasks.filter((task) => task.taskDone === false)).size+1 >= this.props.tasks.size) {
      this.props.updateOnePixel(this.props.pixelId, '#E3E3E3', '', '', this.props)
    } else if ((this.props.tasks).size <=5 || ((this.props.tasks.filter((task) => task.taskDone === false)).size+1) *1.0/(this.props.tasks).size > (2.0/3)) {
      this.props.updateOnePixel(this.props.pixelId, '#99FF33', '', '', this.props)
    } else if (((this.props.tasks.filter((task) => task.taskDone === false)).size+1) *1.0/(this.props.tasks).size > (2.0/6) && (this.props.tasks).size>=3) {
      this.props.updateOnePixel(this.props.pixelId, '#00FF00', '', '', this.props)
    } else if ((((this.props.tasks.filter((task) => task.taskDone === false)).size+1) *1.0/(this.props.tasks).size > (1.0/3)) && ((this.props.tasks).size> 5)) {
      this.props.updateOnePixel(this.props.pixelId, '#006600', '', '', this.props)
    }
  }

  onResetTasks(frequencyString) {
    this.props.tasks.filter((task) => task.taskFrequency === frequencyString && task.taskDone === true).forEach(task => {
      const taskIndex= this.props.tasks.indexOf(task)
      this.markIncomplete(taskIndex)
    })
  }

  render() {
    return (
    <div>
      {
        console.log('heyaae ababeiuabiegwf heeeyyyy yoooo', this.props)
      }
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
               this.props.tasks.filter((task) => task.taskFrequency === 'daily' && task.taskDone === false).map(task => {
                 let taskIndex= this.props.tasks.indexOf(task)
                 return (
                   <div key={taskIndex}><input className="task-item" type="checkbox" onChange={(event) => {
                     event.preventDefault()
                     this.markTaskDone(taskIndex)
                   }}/>{task.taskContent} <button className="btn-danger" onClick={() => this.removeTaskCallback(taskIndex)}>X</button></div>
                 )
               })
             }
            </div>
           </div>
           <div className="col-lg-6">
           <h3>Done!</h3>
           {
             this.props.tasks.filter((task) => task.taskFrequency === 'daily' && task.taskDone === true).map(task => {
               let taskIndex= this.props.tasks.indexOf(task)
               return (
                 <div key={taskIndex}><input className="task-item" type="checkbox" checked={true} onChange={(event) => {
                   event.preventDefault
                   this.markIncomplete(taskIndex)
                 }}/>{task.taskContent} <button className="btn-danger" onClick={() => this.removeTaskCallback(taskIndex)}>X</button></div>
               )
             })
           }
            </div>
          </div>
         </div>
    </div>
    )
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
