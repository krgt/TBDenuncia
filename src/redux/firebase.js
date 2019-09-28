import * as firebase from "firebase";

import { firebaseConfig } from "./firebaseconfig";

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const crimesRef = databaseRef.child("crimes");