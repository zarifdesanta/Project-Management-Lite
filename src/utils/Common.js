import firebase from "firebase/compat/app";
import { firestore } from "./Firebase";
import {
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";

export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  // console.log("saved", key);
};

export const loadData = (key) => {
  // console.log("getting", key, "data");
  return JSON.parse(localStorage.getItem(key));
};

export const clearAll = () => {
  localStorage.clear();
  // console.log("all cleared");
};

const fireStoreRef = collection(firestore, "projects");

export const addDocInFirestore = (data) => {
  try {
    addDoc(fireStoreRef, data);
  } catch (err) {
    console.log(err);
  }
};

export const getDocFromFirestore = async () => {
  try {
    const data = await getDocs(fireStoreRef);
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const updateDocInFirestore = async (id, dataModel) => {
  try {
    const projectDoc = doc(firestore, "projects", id);

    console.log(projectDoc);
    return await updateDoc(projectDoc, dataModel);
  } catch (err) {
    console.log(err);
  }
};

export const deleteDocFromFirestore = async (id) => {
  try {
    const projectDoc = doc(firestore, "projects", id);

    console.log(projectDoc);
    return await deleteDoc(projectDoc);
  } catch (err) {
    console.log(err);
  }
};

export const toggleView = (isView, id, display) => {
  if (isView) {
    document.getElementById(id).style.display = display;
    document.getElementById(id).style.animation =
      "field-open-anim 0.4s forwards";
  } else {
    document.getElementById(id).style.animation =
      "field-close-anim 0.25s forwards";
  }
};
