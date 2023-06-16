import { db } from "./firebase"; // Uppdatera importstigen till din firebase-konfiguration
import { addDoc, collection } from "firebase/firestore";

export const addTicket = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "Tickets"), formData);
    console.log("Ticket created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating ticket: ", error);
  }
};
