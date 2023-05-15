import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAc5XJFORA558_DcGoQQW6X3izH1WC3w54",
    authDomain: "everx-f7968.firebaseapp.com",
    projectId: "everx-f7968",
    storageBucket: "everx-f7968.appspot.com",
    messagingSenderId: "393512220430",
    appId: "1:393512220430:web:e2ffea8e64597f9b0c895f",
    measurementId: "G-2WCJ252KLE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the authentication service
const auth = getAuth(app);

// Get a reference to the Firestore database
const db = getFirestore(app);

// Create a Google provider instance
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            const userData = {
                uid: user.uid,
                authProvider: "google",
                email: user.email,
            };
            if (user.displayName) {
                userData.name = user.displayName;
            }
            await addDoc(collection(db, "users"), userData);
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

const sendPasswordResetEmailFn = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logOut = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmailFn,
    logOut,
};
