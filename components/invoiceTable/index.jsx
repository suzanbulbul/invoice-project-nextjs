import React from "react";

const InvoiceTable = ({ invoices }) => {

  return (
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
            <td>{invoice.paymentStatus ? invoice.paymentStatus : "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
