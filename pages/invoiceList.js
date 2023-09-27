import React, { useEffect, useState } from "react";

// Firebase
import { getInvoices } from "../firebase/firebase";

// Components
import InvoiceTable from "../components/invoiceTable";
import Loading from "../components/loading";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvoices()
      .then((invoiceList) => {
        setInvoices(invoiceList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Faturaları alma hatası:", error);
        setLoading(false);
      });
  }, []);


  return (
    <div className="container mt-5">
      <h2 className="title">Fatura Listesi</h2>
      {loading ? (
        <Loading />
      ) : (
        <InvoiceTable invoices={invoices} /> 
      )}
    </div>
  );
};

export default InvoiceList;
