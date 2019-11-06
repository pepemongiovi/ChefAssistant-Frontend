import { GET_INGREDIENT, CREATE_INGREDIENT, GET_SIMILAR_INGREDIENTS, UPDATE_INGREDIENT} from './constants';

const baseUrl = "https://chefassistant.best:8080"

export const getIngredient = (id) => dispatch => {
  return fetch(`${baseUrl}/ingredients/${id}`, {
    method: "GET", 
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}` 
    }
  }).then(res => res.json())
    .then(ingredients => dispatch({
      type: GET_INGREDIENT,
      payload: ingredients[0]
    }))
}

export const getSimilarIngredients = (mainIngredient, ingredients, selectedFilters, ignoredRecipes) => dispatch => {
  return fetch(`${baseUrl}/ingredients/similarIngredients`, {
      method: "POST", 
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}` 
      }, 
      body: JSON.stringify({
        mainIngredient: mainIngredient,
        ingredients: ingredients, 
        selectedFilters: selectedFilters,
        ignoredRecipes: ignoredRecipes
      })
    }).then(res => res.json())
    .then(ingredients => dispatch({
      type: GET_SIMILAR_INGREDIENTS,
      payload: ingredients.result
    }))
}

export const createIngredient = (data) => dispatch => {
  return fetch(`${baseUrl}/ingredients`, { method: 'GET', data: data })
    .then(res => res.json())
    .then(ingredient => dispatch({
      type: CREATE_INGREDIENT,
      payload: ingredient
    }))
}

export const updateIngredient = (data) => dispatch => {
  return fetch(`${baseUrl}/ingredients/${data._id}` , { method: 'PATCH', data: data })
    .then(res => res.json())
    .then(ingredient => dispatch({
      type: UPDATE_INGREDIENT,
      payload: ingredient
    }))
}
