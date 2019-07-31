import { GET_INGREDIENT, CREATE_INGREDIENT, GET_SIMILAR_INGREDIENTS, UPDATE_INGREDIENT} from './constants';


export const getIngredient = (id) => dispatch => {
  return fetch(`/ingredients/${id}`)
    .then(res => res.json())
    .then(ingredients => dispatch({type: GET_INGREDIENT, payload: ingredients}))
}

export const getSimilarIngredients = (ingredient) => dispatch => {
  console.log("ingredient: " + ingredient)
  return fetch(`/ingredients/similarIngredients/${ingredient}` )
    .then(res => res.json())
    .then(ingredients => dispatch({type: GET_SIMILAR_INGREDIENTS, payload: ingredients}))
}

export const createIngredient = (data) => dispatch => {
  return fetch('/ingredients', { method: 'POST', data: data })
    .then(res => res.json())
    .then(ingredient => dispatch({type: CREATE_INGREDIENT, payload: ingredient}))
}

export const updateIngredient = (data) => dispatch => {
  return fetch(`/ingredients/${data._id}` , { method: 'PATCH', data: data })
    .then(res => res.json())
    .then(ingredient => dispatch({type: UPDATE_INGREDIENT, payload: ingredient}))
}
