import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/index";
class TrashService {
  getContacts() {
    return;
  }
  async getTrash(uid) {
    let trash = [];
    console.log(`users/${uid}/trash`);
    const querySnapshot = await getDocs(
      collection(db, `users/${uid}/contacts`)
    );
    querySnapshot.forEach((doc) => {
      trash.push({ ...doc.data(), id: doc.id });
    });
    return trash;
  }
  async create(trash, uid) {
    try {
      const docRef = await addDoc(collection(db, `users/${uid}/contacts`), {
        ...contact,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
//   async getContact(uid,id) {
//     let contact = null;
//     const docRef = doc(db, "users", uid, "contacts", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       contact = docSnap.data();
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//     return contact;
//
//     
//   }
  async delContact(uid,id) {
    const docRef = doc(db, "users",uid,"contacts",id);
    deleteDoc(docRef).then(() => {
      console.log("deleted");
    });
  }
  deleteContact;
}
let trashService = new TrashService();
export { trashService };
