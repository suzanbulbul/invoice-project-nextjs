
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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

// Craete a new invoice
export const sendInvoiceToFirebase = async (invoiceData) => {
  try {
    const invoicesCollection = collection(db, 'invoices');

    const docRef = await addDoc(invoicesCollection, invoiceData);
    console.log('Fatura Firestore\'a başarıyla eklendi');
  } catch (error) {
    console.error('Fatura eklenirken hata oluştu:', error);
    throw error;
  }
};

// Get all invoices
export const getInvoices = async () => {
  const invoicesCollectionRef = collection(db, "invoices");
  const querySnapshot = await getDocs(invoicesCollectionRef);

  const invoiceList = [];
  querySnapshot.forEach((doc) => {
    invoiceList.push({ id: doc.id, ...doc.data() });
  });

  return invoiceList;
};

export default app;

