import userTypes from './user.types';
import { db, auth, provider } from '../../firebase-config';
import { signInWithPopup } from "firebase/auth";
import { setDoc, doc, collection, query, onSnapshot, where, getDoc} from "firebase/firestore"; 

const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});


export const setCurrentUserInitiate = (user) => {
  return async function(dispatch) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()){
      dispatch(setCurrentUser({...userSnap.data(), id: userSnap.id}));
    } else {
      console.log("No such user!")
    }
}
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await signInWithPopup(auth, provider)
      .then(
        async (result) => {
          let user = result.user;
          // check if user already exists in firestore
          const userSnap = await getDoc(doc(db, "users", result.user.uid));
          if (!userSnap.exists()) {
            await setDoc(doc(db, "users", user.uid), {
              displayName: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
              jobTitle: "No-Job-Title"
            });
          }
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true
        });
      }).catch((err) => console.log(err));

  } catch (err) {
    console.log(err);
  }

};