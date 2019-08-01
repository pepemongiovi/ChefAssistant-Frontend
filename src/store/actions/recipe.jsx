import { GET_RECIPES, GET_RECIPE, CREATE_RECIPE, UPDATE_RECIPE, GET_RECOMMENDED_RECIPES } from './constants';


export const getRecipes = () => dispatch => {
  return fetch('/recipes')
    .then(res => res.json())
    .then(recipes => dispatch({type: GET_RECIPES, payload: recipes}))
}

export const getRecipe = (recipeId) => dispatch => {
  return fetch(`/recipes/${recipeId}`)
    .then(res => res.json())
    .then(recipe => dispatch({type: GET_RECIPE, payload: recipe}))
}

export const getRecommendedRecipes = (ids, mainIngredient, selectedFilters) => dispatch =>{
  return fetch('/recipes/recommendedRecipes', {
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ 
        ids: ids, 
        mainIngredient: mainIngredient,
        selectedFilters: selectedFilters
      })
    }).then(res => res.json())
    .then(recipes => dispatch({type: GET_RECOMMENDED_RECIPES, payload: recipes}))
}

export const createRecipe = (data) => dispatch => {
  return fetch('/recipes', { 
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), 
    })
    .then(res => res.json())
    .then(recipe => dispatch({type: CREATE_RECIPE, payload: recipe}))
}

export const updateRecipe = (data) => dispatch => {
  return fetch(`/recipes/${data._id}`, { method: 'PATCH', data: data })
    .then(res => res.json())
    .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))
}
