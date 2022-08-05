import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from 'firebase/auth'
import {getFirestore, query, getDocs, collection, where,addDoc} from 'firebase/firestore'



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWxlf3X21wUEzcodSfS7ndjLLIBmU_rs4",
    authDomain: "passcore-89ab5.firebaseapp.com",
    projectId: "passcore-89ab5",
    storageBucket: "passcore-89ab5.appspot.com",
    messagingSenderId: "237898180561",
    appId: "1:237898180561:web:9b7bad99812d9a64cee2f0",
    measurementId: "G-EWWW81JD1C"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () =>{
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
          });
        }
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };
    const logInWithEmailAndPassword = async (email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };
    const registerWithEmailAndPassword = async (name, email, password) => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
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
    const sendPasswordReset = async (email) => {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };
    const logout = () => {
      signOut(auth);
    };
    export {
      auth,
      db,
      signInWithGoogle,
      logInWithEmailAndPassword,
      registerWithEmailAndPassword,
      sendPasswordReset,
      logout,
    };
    