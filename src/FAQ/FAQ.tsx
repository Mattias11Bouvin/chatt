import React, { useState, useEffect } from "react";
import { db } from "../DB/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import FaqForm from "./FaqForm";
import FaqList from "./FaqList";

// Komponent
const FaqManager = () => {
  const [faq, setFaq] = useState({
    Answer: "",
    Category: "",
    Image: "",
    Question: "",
  });
  const [faqList, setFaqList] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null); // Håller det valda FAQ-objektet för uppdatering
  const [updatedFaq, setUpdatedFaq] = useState({
    Answer: "",
    Category: "",
    Image: "",
    Question: "",
  }); // Håller de uppdaterade värdena för FAQ

  const isUpdateMode = selectedFaq !== null;

  useEffect(() => {
    const fetchFaqList = async () => {
      try {
        const faqSnapshot = await getDocs(collection(db, "Faq"));
        const fetchedFaqList = faqSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFaqList(fetchedFaqList);
      } catch (error) {
        console.error("Error fetching FAQ list: ", error);
      }
    };

    fetchFaqList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFaqId = await createFaq(faq);
    setFaqList([...faqList, { id: newFaqId, ...faq }]);
    setFaq({
      Answer: "",
      Category: "",
      Image: "",
      Question: "",
    });
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;

    if (target.files) {
      // for file inputs
      if (isUpdateMode) {
        setUpdatedFaq((prevUpdatedFaq) => ({
          ...prevUpdatedFaq,
          [name]: target.files[0], // if multiple files are allowed, this should be an array: files
        }));
      } else {
        setFaq((prevFaq) => ({
          ...prevFaq,
          [name]: target.files[0], // if multiple files are allowed, this should be an array: files
        }));
      }
    } else {
      // for text inputs
      const value = target.value;
      if (isUpdateMode) {
        setUpdatedFaq((prevUpdatedFaq) => ({
          ...prevUpdatedFaq,
          [name]: value,
        }));
      } else {
        setFaq((prevFaq) => ({
          ...prevFaq,
          [name]: value,
        }));
      }
    }
  };

  const handleCancelUpdate = () => {
    setSelectedFaq(null); // Avbryter uppdateringen och återställer det valda FAQ-objektet
    setUpdatedFaq({
      Answer: "",
      Category: "",
      Image: "",
      Question: "",
    }); // Återställer de uppdaterade värdena för FAQ i formuläret
  };

  const handleUpdate = (faqId, faqData) => {
    setSelectedFaq(faqId);
    setUpdatedFaq(faqData);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    await updateFaq(selectedFaq, updatedFaq);
    setFaqList(
      faqList.map((faq) =>
        faq.id === selectedFaq ? { ...faq, ...updatedFaq } : faq
      )
    );
    setSelectedFaq(null);
    setUpdatedFaq({
      Answer: "",
      Category: "",
      Image: "",
      Question: "",
    });
  };

  const handleDelete = async (faqId, onDelete) => {
    await deleteFaq(faqId, onDelete);
    setFaqList(faqList.filter((faq) => faq.id !== faqId));
  };

  return (
    <div>
      <FaqForm
        onSubmit={handleSubmit}
        faq={faq}
        onChange={handleChange}
        selectedFaq={selectedFaq}
        updatedFaq={updatedFaq}
        onSubmitUpdate={handleSubmitUpdate}
        onCancelUpdate={handleCancelUpdate}
      />

      <FaqList
        faqList={faqList}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        selectedFaq={selectedFaq}
        updatedFaq={updatedFaq}
        onSubmitUpdate={handleSubmitUpdate}
      />
    </div>
  );
};

const createFaq = async (newFaq) => {
  try {
    const faqRef = collection(db, "Faq");
    const faqDoc = await addDoc(faqRef, newFaq);
    const faqId = faqDoc.id;
    console.log("FAQ created with ID: ", faqId);
    return faqId;
  } catch (error) {
    console.error("Error creating FAQ: ", error);
  }
};

const updateFaq = async (faqId, updatedFaq) => {
  try {
    const faqRef = doc(collection(db, "Faq"), faqId);
    await updateDoc(faqRef, updatedFaq);
    console.log("FAQ updated with ID: ", faqId);
    // Uppdatera FAQ-listan eller göra andra åtgärder vid behov
  } catch (error) {
    console.error("Error updating FAQ: ", error);
  }
};

const deleteFaq = async (faqId, onDelete) => {
  try {
    const faqRef = doc(collection(db, "Faq"), faqId);
    await deleteDoc(faqRef, onDelete);
    console.log("FAQ deleted with ID: ", faqId);
  } catch (error) {
    console.error("Error deleting FAQ: ", error);
  }
};

export default FaqManager;
