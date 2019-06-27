import {combineReducers} from 'redux';
import recipeReducer from './recipe';
import ingredientReducer from './ingredient'

export default combineReducers({
  recipes: recipeReducer,
  ingredients: ingredientReducer
})
