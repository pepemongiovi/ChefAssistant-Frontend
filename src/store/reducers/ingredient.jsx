import { GET_INGREDIENTS, CREATE_INGREDIENT, UPDATE_INGREDIENT, GET_SIMILAR_INGREDIENTS } from '../actions/constants'

const ingredientReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_INGREDIENTS:
        return payload
      case GET_SIMILAR_INGREDIENTS:
        return payload
      case CREATE_INGREDIENT:
        return payload
      case UPDATE_INGREDIENT:
        return payload
      default:
        return state
    }
}

export default ingredientReducer;
