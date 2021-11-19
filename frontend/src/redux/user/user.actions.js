import userTypes from './user.types';
import { db, auth, provider } from '../../firebase-config';
import { signInWithPopup } from "firebase/auth";
import { setDoc, doc} from "firebase/firestore"; 

export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});


export const signInWithGoogle = () => async (dispatch) => {
  try {
    await signInWithPopup(auth, provider)
      .then(
        async (result) => {
          let user = result.user;
          await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            jobTitle: "No-Job-Title"
          });
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true
        });
      }).catch((err) => console.log(err));

  } catch (err) {
    console.log(err);
  }

};