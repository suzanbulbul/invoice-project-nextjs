import React from 'react';

const InvoiceList = () => {

    const invoices = [
        {
          customerName: 'Müşteri 1',
          invoiceDate: '2023-09-15',
          dueDate: '2023-10-15',
        },
        {
          customerName: 'Müşteri 2',
          invoiceDate: '2023-09-10',
          dueDate: '2023-10-10',
        },
        {
          customerName: 'Müşteri 3',
          invoiceDate: '2023-09-05',
          dueDate: '2023-10-05',
        },
      ];
  return (
    <div className="container mt-5">
      <h2>Fatura Listesi</h2>
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
    </div>
  );
};

// Fatura durumu hesaplaması yapılabilir
const getInvoiceStatus = (invoice) => {
  // Burada fatura durumu hesaplamaları yapılabilir
  // Örneğin, ödenen, ödenmemiş veya gecikmiş gibi
  return 'Ödenmemiş'; // Örnek durum
};

export default InvoiceList;
