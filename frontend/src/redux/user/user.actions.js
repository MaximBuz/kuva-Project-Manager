import userTypes from "./user.types";
import { db, auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const updateCurrentUser = () => ({
  type: userTypes.UPDATE_CURRENT_USER,
})

export const logOutUser = () => ({
  type: userTypes.LOG_OUT,
});

export const setCurrentUserInitiate = (user) => {
  return async function (dispatch) {
    const userRef = doc(db, "users", user?.uid || "null");
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      dispatch(setCurrentUser({ ...userSnap.data(), id: userSnap.id }));
    }
  };
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        let user = result.user;
        // check if user already exists in firestore
        const userSnap = await getDoc(doc(db, "users", result.user.uid));
        if (!userSnap.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            jobTitle: "",
            phone: "",
            location: "",
            birthday: "",
            workAnniversary: "",
          });
        }
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true,
        });
        toast.success("Successfully logged in", {position: "bottom-right"});
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    toast.error(String(err), {position: "bottom-right"});
  }
};
