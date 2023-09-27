import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

// Firebase
import { getInvoices } from "../firebase/firebase";

// Components
import InvoiceTable from "../components/invoiceTable";
import Loading from "../components/loading";

const InvoiceList = () => {
  const { t } = useTranslation();

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvoices()
      .then((invoiceList) => {
        setInvoices(invoiceList);
        setLoading(false);
      })
      .catch((error) => {
        console.error(t('errorFettingInvoices') + ':', error);
        setLoading(false);
      });
  }, []);


  return (
    <div className="container invoiceList">
      <div className="d-flex justify-content-between align-items-start">
         <h2 className="title">{t('invoiceList')}</h2>
        <Link href="/" className="secondaryButton">{t('addInvoice')}</Link>
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
