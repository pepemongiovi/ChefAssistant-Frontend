import { GET_RECIPES, CREATE_RECIPE, UPDATE_RECIPE } from '../actions/constants'

const recipeReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_RECIPES:
        return payload
      case CREATE_RECIPE:
        return payload
      case UPDATE_RECIPE:
        return payload
      default:
        return state
    }
}

export default recipeReducer;
