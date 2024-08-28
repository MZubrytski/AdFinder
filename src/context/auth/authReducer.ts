import { User } from 'firebase/auth';
import {
  SET_AUTH_USER,
  SET_DB_USER,
  SHOW_LOADER,
  SIGN_OUT,
} from './actionTypes';
import { DBUser } from '@/types/user';

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

type SetDBUserActionType = {
  type: typeof SET_DB_USER;
  payload: DBUser;
};

type ActionTypes =
  | SetAuthUserActionType
  | SignOutActionType
  | ShowLoaderActionType
  | SetDBUserActionType;

interface AuthReducerState {
  authenticatedUser: User | null;
  dbUser: DBUser | null;
  isSignedIn: boolean;
  isLoading: boolean;
}

export const authReducer = (
  state: AuthReducerState,
  action: ActionTypes,
): AuthReducerState => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        authenticatedUser: action.payload,
        isSignedIn: true,
        isLoading: false,
      };
    case SET_DB_USER:
      return {
        ...state,
        dbUser: action.payload,
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
