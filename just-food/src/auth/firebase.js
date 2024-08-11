import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAdqwZHqqb1sivPfVK0jX0Mw3cUhGgZTJg",
  authDomain: "just-food-f5ff1.firebaseapp.com",
  projectId: "just-food-f5ff1",
  storageBucket: "just-food-f5ff1.appspot.com",
  messagingSenderId: "972747664560",
  appId: "1:972747664560:web:2bc77409fec62689529f75",
  measurementId: "G-GVZ2QXWZCC",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const signUp = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await updateProfile(user, { displayName: name });
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logOut = () => {
  signOut(auth);
};
export { auth, db, signIn, signUp, logOut };
