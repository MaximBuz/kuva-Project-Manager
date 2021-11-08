import userTypes from './user.types';
import { auth, provider, handleUserProfile } from '../../firebase-config';
import { signInWithPopup } from "firebase/auth"

export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});


export const signInWithGoogle = () => async (dispatch) => {
  try {
    await signInWithPopup(auth, provider)
      .then(() => {
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true
        });
      });


  } catch (err) {
    console.log(err);
  }

};