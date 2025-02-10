import { LOGIN_FAILURE } from "./authAction";
import { LOGIN_SUCCESS } from "./authAction";

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true };
    case LOGIN_FAILURE:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
