import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
  // getContact(id) {
  //   return contacts.find((contact) => contact.id === id);
  // }
}
let contactService = new ContactService();
export { contactService };
