import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import player from './player'

export default (history) => combineReducers({
    player,
    router: connectRouter(history)
})