
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc  } from "firebase/firestore";

const firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STROAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAING_SENDER_ID,
   appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const sendInvoiceToFirebase = async (invoiceData) => {
  try {
    const invoicesCollection = collection(db, 'invoices');

    const docRef = await addDoc(invoicesCollection, invoiceData);
    console.log('Fatura Firestore\'a başarıyla eklendi, ID:', docRef.id);
  } catch (error) {
    console.error('Fatura eklenirken hata oluştu:', error);
    throw error;
  }
};

export default app;

