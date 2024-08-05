import { User } from 'firebase/auth';
import { SET_AUTH_USER, SHOW_LOADER, SIGN_OUT } from './actionTypes';

type SetAuthUserActionType = {
  type: typeof SET_AUTH_USER;
  payload: User;
};

type SignOutActionType = {
  type: typeof SIGN_OUT;
};

type ShowLoaderActionType = {
  type: typeof SHOW_LOADER;
};

type ActionTypes =
  | SetAuthUserActionType
  | SignOutActionType
  | ShowLoaderActionType;

interface AuthReducerState {
  authenticatedUser: User | null;
  isSignedIn: boolean;
  isLoading: boolean;
}

export const authReducer = (state: AuthReducerState, action: ActionTypes) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        authenticatedUser: action.payload,
        isSignedIn: true,
        isLoading: false,
      };
    case SIGN_OUT:
      return {
        ...state,
        authenticatedUser: null,
        isSignedIn: false,
        isLoading: false,
      };
    case SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
