import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";
class LabelService {
  getLabel() {
    return;
  }
  async getLabels(uid) {
    let labels = [];
    console.log(`users/${uid}/labels`);
    const querySnapshot = await getDocs(collection(db, `users/${uid}/labels`));
    querySnapshot.forEach((doc) => {
      labels.push({ ...doc.data(), id: doc.id });
    });
    return labels;
  }
  async saveLabel(label, uid) {
    try {
      const docRef = await addDoc(collection(db, `users/${uid}/labels`), {
        name: label.title,
      });
      console.log("Document written with ID: ", docRef.id, label.title);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
let labelService = new LabelService();
export { labelService };
