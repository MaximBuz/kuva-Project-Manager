import userTypes from './user.types';
import { db, auth, provider, handleUserProfile } from '../../firebase-config';
import { signInWithPopup } from "firebase/auth";
import { collection, addDoc} from "firebase/firestore"; 

export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});


export const signInWithGoogle = () => async (dispatch) => {
  try {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        if (result.additionalUserInfo.isNewUser) {
          let user = result.user;
          const docRef = await addDoc(collection(db, "users"), {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoUrl,
            id: user.uid,
            jobTitle: "No-Job-Title"
        });
        }
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true
        });
      });


  } catch (err) {
    console.log(err);
  }

};