import {combineReducers} from 'redux';
import recipeReducer from './recipe';
import ingredientReducer from './ingredient'
import userReducer from './user'

export default combineReducers({
  recipes: recipeReducer,
  ingredients: ingredientReducer,
  userReducer: userReducer
})
