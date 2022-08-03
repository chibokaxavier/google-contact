import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, getDocs,getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/index";
import { faker } from "@faker-js/faker";
class ContactService {
  getContacts() {
    return;
  }
  async getContacts(uid) {
    let contacts = [];
    console.log(`users/${uid}/contacts`);
    const querySnapshot = await getDocs(
      collection(db, `users/${uid}/contacts`)
    );
    querySnapshot.forEach((doc) => {
      contacts.push({ ...doc.data(), id: doc.id });
    });
    return contacts;
  }
  async create(contact, uid) {
    try {
      const docRef = await addDoc(collection(db, `users/${uid}/contacts`), {
        ...contact,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async getContact(uid, id) {
    let contact = null;
    const docRef = doc(db, "users", uid, "contacts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      contact = docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return contact;

    //
    //
  }
}
let contactService = new ContactService();
export { contactService };
