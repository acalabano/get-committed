import {List} from 'immutable'

// -- // -- // Actions // -- // -- //
export const GET_PIXELS='GET_PIXELS'
export const getPixels = () => ({
  type: GET_PIXELS
})

export const LOAD_PIXEL='LOAD_PIXEL'
export const loadPixel = (pixelId) => ({
  type: LOAD_PIXEL,
  pixelId
})
export const ADD_PIXEL = 'ADD_PIXEL'
export const addPixel = (pixelColor, pixelDay, pixelContent, pixelTasks) => ({
  type: ADD_PIXEL,
  pixelColor,
  pixelDay,
  pixelContent,
  pixelTasks
})

export const REMOVE_PIXEL = 'REMOVE_PIXEL'
export const removePixel = (pixelIndex) => ({
  type: REMOVE_PIXEL,
  pixelIndex
})

export const UPDATE_PIXEL = 'UPDATE_PIXEL'
export const updatePixel = (pixelIndex, pixelColor, pixelDay, pixelContent, pixelTasks) => ({
  type: UPDATE_PIXEL,
  pixelIndex,
  pixelColor,
  pixelDay,
  pixelContent,
  pixelTasks
})

export const CREATE_PIXEL_TASK = 'CREATE_PIXEL_TASK'
export const createPixelTask = (pixelId, taskContent, taskDone, taskFrequency) => ({
  type: CREATE_PIXEL_TASK,
  pixelId,
  taskContent,
  taskDone,
  taskFrequency
})

export const REMOVE_PIXEL_TASK = 'REMOVE_PIXEL_TASK'
export const removePixelTask = (pixelId, taskIndex) => ({
  type: REMOVE_PIXEL_TASK,
  taskIndex
})

export const UPDATE_PIXEL_TASK = 'UPDATE_PIXEL_TASK'
export const updatePixelTask = (pixelId, taskIndex, taskDone) => ({
  type: UPDATE_PIXEL_TASK,
  pixelId,
  taskIndex,
  taskDone,
})

export const GET_PIXEL_TASKS='GET_PIXEL_TASKS'
export const getPixelTasks = (pixelId) => ({
  type: GET_PIXEL_TASKS,
  pixelId
})

// -- // -- // State // -- // -- //

const initial = {
  pixels: List()
}
// -- // -- // Reducer // -- // -- //

const pixelReducer = (state = initial, action) => {
  switch (action.type) {
  case GET_PIXELS:
    return state
  case ADD_PIXEL:
    return {...state,
      pixels: state.pixels.push({
        pixelColor: action.pixelColor,
        pixelDay: action.pixelDay,
        pixelContent: action.pixelContent,
        pixelTasks: List()
      })
    }

  case REMOVE_PIXEL:
    return {...state,
      pixels: state.pixels.delete(action.pixelIndex)
    }

  case UPDATE_PIXEL:
    return {...state,
      pixels: state.pixels.set(action.pixelIndex, {
        ...state.pixels.get(action.pixelIndex),
        pixelColor: action.pixelColor,
        pixelDay: action.pixelDay,
        pixelContent: action.pixelContent,
        pixelTasks: action.pixelTasks
      })
    }

  case CREATE_PIXEL_TASK:
    console.log('supppp', [...state.pixels.get(action.pixelId).pixelTasks])
    return {...state,
      pixels: state.pixels.set(action.pixelId, {
        ...state.pixels.get(action.pixelId),
        pixelTasks: [...state.pixels.get(action.pixelId).pixelTasks].push({
          taskContent: action.taskContent,
          taskDone: false,
          taskFrequency: action.taskFrequency,
          error: null
        })
      })
    }

  case REMOVE_PIXEL_TASK:
    return {...state,
      tasks: state.tasks.delete(action.taskIndex)
    }
  case UPDATE_PIXEL_TASK:
    return {...state,
      tasks: state.tasks.set(action.taskIndex, {
        ...state.tasks.get(action.taskIndex),
        pixelTasks: this
      })
    }
  }
  return state
}

export default pixelReducer
