import React, { useState, useEffect } from "react";
import { db } from "../DB/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import MyForm from "./DocForm";

interface Document {
  id: string;
  title: string;
  content: string;
  createdBy: string;
}

const DocumentForm: React.FC<{
  onCreateDocument: (document: Document) => void;
}> = ({ onCreateDocument }) => {
  const [newDocument, setNewDocument] = useState<Document>({
    id: "",
    title: "",
    content: "",
    createdBy: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewDocument((prevDocument) => ({
      ...prevDocument,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateDocument(newDocument);
    setNewDocument({
      id: "",
      title: "",
      content: "",
      createdBy: "",
    });
  };

  return (
    <MyForm
      handleSubmit={handleSubmit}
      newDocument={newDocument}
      handleChange={handleChange}
    />
  );
};

const DocumentList: React.FC<{
  documents: Document[];
  onDeleteDocument: (documentId: string) => void;
}> = ({ documents, onDeleteDocument }) => {
  return (
    <ul>
      {documents.map((document) => (
        <li key={document.id}>
          <h3>{document.title}</h3>
          <p>{document.content}</p>
          <p>Created By: {document.createdBy}</p>
          <button onClick={() => onDeleteDocument(document.id)}>
            Delete Document
          </button>
        </li>
      ))}
    </ul>
  );
};

const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "documents"));
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Document[];
        setDocuments(fetchedDocuments);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchDocuments();

    const unsubscribe = onSnapshot(collection(db, "documents"), () => {
      fetchDocuments();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createDocument = async (newDocument: Document) => {
    try {
      const documentRef = await addDoc(
        collection(db, "documents"),
        newDocument
      );
      const createdDocument = {
        id: documentRef.id,
        ...newDocument,
      };
      setDocuments([...documents, createdDocument]);
    } catch (error) {
      console.error("Error creating document: ", error);
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      await deleteDoc(doc(db, "documents", documentId));
      setDocuments(documents.filter((doc) => doc.id !== documentId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <h2>Document Manager</h2>
      <DocumentForm onCreateDocument={createDocument} />
      <DocumentList documents={documents} onDeleteDocument={deleteDocument} />
    </div>
  );
};

export default DocumentManager;
