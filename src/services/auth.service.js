import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Cookies from "js-cookie";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/index";
class AuthService {
  constructor() {
    this.navigator = null;
  }
  async signup(email, password, name) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        await setDoc(doc(db, `users`, cred.user.uid), {
          name,
        });
        let user = cred.user;
        Cookies.set(
          "auth",
           JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          }),
          {
            expires: 2,
          }
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  async login(email, password, callback) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        Cookies.set(
          "auth",
           JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          }),
          {
            expires: 2,
          }
        );
        let user = cred.user;
        callback({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  async logout() {
    console.log("user logged out");
    const auth = getAuth();
    signOut(auth)
      .then((cred) => {
        console.log("logged out Successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async listenForAuthChange(funcs) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Cookies.set(
          "auth",
           JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          }),
          {
            expires: 2,
          }
        );
        funcs.login({
          uid: user.uid,
          displayName: user.displayName || "e",
          email: user.email,
        });
      } else {
        funcs.logout();
      }
    });
  }
}
let authService = new AuthService();
export { authService };
