import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/index";
import { faker } from "@faker-js/faker";
class ContactService {
  getContacts() {
    return;
  }
  async getContacts(uid) {
    let contacts = [];
    const querySnapshot = await getDocs(
      collection(db, `users/${uid}/contacts`)
    );
    querySnapshot.forEach((doc) => {
      contacts.push({ ...doc.data(), id: doc.id });
    });
    return contacts;
  }
  async getTrashContacts(uid) {
    let trashContacts = [];
    const querySnapshot = await getDocs(collection(db, `users/${uid}/trash`));
    querySnapshot.forEach((doc) => {
      trashContacts.push({ ...doc.data(), id: doc.id });
    });
    return trashContacts;
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
  async saveMany(json, uid){
    let ops = []
    json.map(contact => {
      ops.push(addDoc(collection(db, `users/${uid}/contacts`), {
        ...contact,
      }))
    })
    await Promise.all(ops)
    console.log("Batch saving completed")
  }

  async updateLabels(contact, uid, labels) {
    console.log(contact, uid, labels);
    try {
      const docRef = doc(db, "users", uid, "contacts", contact.id);
      updateDoc(docRef, {
        labels,
      });
      console.log("updated labels");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async createTrash(contact, uid) {
    // await setDoc(doc(db, `users`, cred.user.uid), {
    //   name,
    // });
    try {
      const docRef = await setDoc(doc(db, `users/${uid}/trash`, contact.id), {
        ...contact,
      });
      console.log("Document written with ID: ", contact.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getLabels(uid, labels) {
    let results = [];
    let ops = labels.map((label_id) => {
      return (async () => {
        const _docRef = doc(db, "users", uid, "labels", label_id);
        const _docSnap = await getDoc(_docRef);
        results.push({ id: label_id, ..._docSnap.data() });
      })()
    });
    await Promise.all(ops);
    return results;
  }

  async getContact(uid, id) {
    let contact = null;
    const docRef = doc(db, "users", uid, "contacts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      contact = docSnap.data();
      contact.id = id;
      let labels = await this.getLabels(uid, contact.labels);
      console.log("labels", labels.length);
      contact.labels = labels;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return contact;
  }

  async delContact(uid, contact) {
    console.log(uid, contact);
    const docRef = doc(db, "users", uid, "contacts", contact.id);
    deleteDoc(docRef).then(() => {
      console.log("deleted");
    });
    await this.createTrash(contact, uid);
  }
  async delLabel(uid, id) {
    const docRef = doc(db, "users", uid, "labels", id);
    deleteDoc(docRef).then(() => {
      console.log("deleted");
    });
  }

  async clearTrash(uid, docs) {
    let delOps = docs.map((contact) =>
      deleteDoc(doc(db, "users", uid, "trash", contact.id))
    );
    await Promise.all(delOps);
  }
}
let contactService = new ContactService();
export { contactService };
