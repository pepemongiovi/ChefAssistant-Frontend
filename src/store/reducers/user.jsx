import { LOGIN, REGISTER, UPDATE_USER } from '../actions/constants'

const userReducer = (state = [], {type, payload}) => {
    switch (type) {
      case LOGIN:
        return payload
      case REGISTER:
        return payload
      case UPDATE_USER:
        return payload
      default:
        return state
    }
}

export default userReducer;
