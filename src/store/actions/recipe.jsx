import { GET_RECIPES, GET_RECIPE, CREATE_RECIPE, UPDATE_RECIPE, GET_RECOMMENDED_RECIPES } from './constants';

const baseUrl = "http://35.235.5.103:8080"

export const getRecipes = () => dispatch => {
  return fetch(`${baseUrl}/recipes`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}` 
    }
  })
    .then(res => res.json())
    .then(recipes => dispatch({type: GET_RECIPES, payload: recipes}))
}

export const getRecipe = (recipeId) => dispatch => {
  return fetch(`${baseUrl}/recipes/${recipeId}`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}` 
    }
  })
    .then(res => res.json())
    .then(recipe => dispatch({type: GET_RECIPE, payload: recipe}))
}

export const getRecommendedRecipes = (mainIngredientIds, ingredientsIds) => dispatch =>{
  return fetch(`${baseUrl}/recipes/recommendedRecipes`, {
      method: "POST", 
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`  
      },
      body: JSON.stringify({ 
        mainIngredientIds: mainIngredientIds,
        ingredientsIds: ingredientsIds
      })
    }).then(res => res.json())
    .then(recipes => dispatch({type: GET_RECOMMENDED_RECIPES, payload: recipes}))
    .catch(err => console.log(err))
}

export const createRecipe = (data) => dispatch => {
  return fetch(`${baseUrl}/recipes`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}` 
      },
      body: JSON.stringify(data) 
    })
    .then(res => res.json())
    .then(recipe => dispatch({type: CREATE_RECIPE, payload: recipe}))
}

export const updateRecipe = (data) => dispatch => {
  return fetch(`${baseUrl}/recipes/${data._id}`, { method: 'PATCH', data: data })
    .then(res => res.json())
    .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))
}
