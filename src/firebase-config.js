
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyAfR3fRuo8Zd9N62UBHCuOTa-MYwukOImQ",
  authDomain: "cart-fa17f.firebaseapp.com",
  projectId: "cart-fa17f",
  storageBucket: "cart-fa17f.appspot.com",
  messagingSenderId: "710757363218",
  appId: "1:710757363218:web:402c5950b40b41608b72cb"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);