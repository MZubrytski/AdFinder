import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import React, { useEffect, useReducer } from 'react';
import { createContext } from 'react';
import { auth, database } from '../../../firebaseConfig';
import { Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { authReducer } from './authReducer';
import { SET_AUTH_USER, SHOW_LOADER, SIGN_OUT } from './actionTypes';

interface AuthContextInterface {
  authenticatedUser: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    repeatedPassword: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({
  authenticatedUser: null,
  isLoading: true,
} as AuthContextInterface);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const initialState = {
    authenticatedUser: null,
    isLoading: true,
    isSignedIn: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        dispatch({ type: SET_AUTH_USER, payload: authenticatedUser });
      } else {
        dispatch({ type: SIGN_OUT });
      }
    });

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

  const signUp = async (
    email: string,
    password: string,
    repeatedPassword: string,
  ) => {
    if (email && password === repeatedPassword) {
      try {
        showLoader();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        const userRef = doc(database, 'users', user.uid);
        await setDoc(userRef, {
          email: email,
          uid: user.uid,
        });
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
