import { GET_RECIPES, GET_RECIPE, CREATE_RECIPE, UPDATE_RECIPE, GET_RECOMMENDED_RECIPES } from '../actions/constants'

const recipeReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_RECIPES:
        return payload
      case GET_RECIPE:
        return payload
      case CREATE_RECIPE:
        return payload
      case UPDATE_RECIPE:
        return payload
      case GET_RECOMMENDED_RECIPES:
        return payload
      default:
        return state
    }
}

export default recipeReducer;
