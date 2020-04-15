export const signIn = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const provider = new firebase.auth.GithubAuthProvider();
  try {
    const { user } = await firebase.auth().signInWithPopup(provider);

    await firestore
      .collection("users")
      .doc(user.uid)
      .set(
        {
          photoURL: user.photoURL,
          displayName: user.displayName,
          githubID: user.providerData[0].uid
        },
        { merge: true }
      );
  } catch (error) {}
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
  } catch (error) {}
};
