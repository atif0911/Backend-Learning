import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBLnql6Dl2s8q04M2x7K026V5RLEqasR2c",
  authDomain: "netflix-clone-5eaec.firebaseapp.com",
  projectId: "netflix-clone-5eaec",
  storageBucket: "netflix-clone-5eaec.firebasestorage.app",
  messagingSenderId: "790246286485",
  appId: "1:790246286485:web:eec2844a4e6d4b3b3a279c",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
      console.log(err);
        toast.error(err.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth);
}

export {auth,db,login,signup,logout}