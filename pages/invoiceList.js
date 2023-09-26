import React, { useEffect, useState } from "react";
import { getInvoices } from "../firebase/firebase";

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

  const getInvoiceStatus = (invoice) => {
 return 'Ödenmemiş';
  };

  return (
    <div className="container mt-5">
      <h2>Fatura Listesi</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Müşteri Adı</th>
              <th>Fatura Tarihi</th>
              <th>Son Ödeme Tarihi</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.customerName}</td>
                <td>{invoice.invoiceDate}</td>
                <td>{invoice.dueDate}</td>
                <td>{getInvoiceStatus(invoice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceList;
