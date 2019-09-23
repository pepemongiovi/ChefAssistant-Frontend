import {combineReducers} from 'redux';
import recipeReducer from './recipe';
import ingredientReducer from './ingredient'
import userReducer from './user'
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
  recipes: recipeReducer,
  ingredients: ingredientReducer,
  userReducer: userReducer,
  toastr: toastrReducer 
})
