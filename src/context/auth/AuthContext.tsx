import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import React, { useEffect, useReducer } from 'react';
import { createContext } from 'react';
import { auth } from '../../../firebaseConfig';
import { Alert } from 'react-native';
import { authReducer } from './authReducer';
import {
  SET_AUTH_USER,
  SET_DB_USER,
  SHOW_LOADER,
  SIGN_OUT,
} from './actionTypes';
import { userService } from '@/api/user.service';
import { DBUser } from '@/types/user';

interface AuthContextInterface {
  authenticatedUser: User | null;
  dbUser: DBUser | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userName: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({
  authenticatedUser: null,
  isLoading: true,
} as AuthContextInterface);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const initialState = {
    authenticatedUser: null,
    dbUser: null,
    isLoading: true,
    isSignedIn: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          dispatch({ type: SET_AUTH_USER, payload: authenticatedUser });
          const dbUser = await userService.getUser(authenticatedUser.uid);
          dispatch({ type: SET_DB_USER, payload: dbUser });
        } else {
          dispatch({ type: SIGN_OUT });
        }
      },
    );

    return unsubscribeAuth;
  }, []);

  const signIn = async (email: string, password: string) => {
    if (email && password) {
      try {
        showLoader();
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
        Alert.alert('Login error', error.message);
      }
    }
  };

  const signUp = async (email: string, password: string, userName: string) => {
    if (email && password) {
      try {
        showLoader();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        await userService.setNewUser(user.uid, {
          email,
          userName,
          uid: user.uid,
        } as DBUser);
      } catch (error: any) {
        Alert.alert(error.message);
      }
    }
  };

  const logout = async () => {
    try {
      showLoader();
      await signOut(auth);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  return (
    <AuthContext.Provider
      value={{
        dbUser: state.dbUser,
        authenticatedUser: state.authenticatedUser,
        isLoading: state.isLoading,
        isSignedIn: state.isSignedIn,
        signIn,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
