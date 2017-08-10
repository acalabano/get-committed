import {List} from 'immutable'

// -- // -- // Actions // -- // -- //

export const CREATE_TASK = 'CREATE_TASK'
export const createTask = (taskContent, taskDone, taskFrequency) => ({
  type: CREATE_TASK,
  taskContent,
  taskDone,
  taskFrequency
})

export const REMOVE_TASK = 'REMOVE_TASK'
export const removeTask = (taskIndex) => ({
  type: REMOVE_TASK,
  taskIndex
})

export const UPDATE_TASK = 'UPDATE_TASK'
export const updateTask = (taskIndex, taskDone) => ({
  type: UPDATE_TASK,
  taskIndex,
  taskDone,
})

export const GET_TASKS='GET_TASKS'
export const getTasks = () => ({
  type: GET_TASKS
})
// -- // -- // Helpers // -- // -- //

// -- // -- // State // -- // -- //

const initial = {
  tasks: List()
}

// -- // -- // Reducer // -- // -- //

const taskReducer = (state = initial, action) => {
  switch (action.type) {
  case GET_TASKS:
    return state
  case CREATE_TASK:
    return {...state,
      tasks: state.tasks.push({
        taskContent: action.taskContent,
        taskDone: action.taskDone,
        taskFrequency: action.taskFrequency,
        error: null
      })
    }

  case REMOVE_TASK:
    return {...state,
      tasks: state.tasks.delete(action.taskIndex)
    }
  case UPDATE_TASK:
    return {...state,
      tasks: state.tasks.set(action.taskIndex, {
        ...state.tasks.get(action.taskIndex),
        taskDone: action.taskDone
      })
    }
  }
  return state
}

export default taskReducer
