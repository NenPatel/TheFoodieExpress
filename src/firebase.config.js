import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYkfumQiXd186D-sp2bBn2j1LsTM9dhW4",
  authDomain: "restaurant-app-d7129.firebaseapp.com",
  databaseURL: "https://restaurant-app-d7129-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-d7129",
  storageBucket: "restaurant-app-d7129.appspot.com",
  messagingSenderId: "719731558648",
  appId: "1:719731558648:web:6e5c02595b2852d6e6130d"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
