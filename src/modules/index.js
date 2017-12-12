import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import player from './player'

export default combineReducers({
  routing: routerReducer,
  player
})
