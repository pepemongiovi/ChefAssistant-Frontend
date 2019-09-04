import { LOGIN, REGISTER } from '../actions/constants'

const userReducer = (state = [], {type, payload}) => {
    switch (type) {
      case LOGIN:
        return payload
      case REGISTER:
        return payload
      default:
        return state
    }
}

export default userReducer;
