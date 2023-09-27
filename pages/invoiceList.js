import React, { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="container invoiceList">
      <div className="d-flex justify-content-between align-items-start">
         <h2 className="title">Fatura Listesi</h2>
        <Link href="/" className="secondaryButton">Fatura Ekle</Link>
      </div>
     
      {loading ? (
        <Loading />
      ) : (
        <InvoiceTable invoices={invoices} /> 
      )}
    </div>
  );
};

export default InvoiceList;
