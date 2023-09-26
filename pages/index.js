import React, { useState } from 'react';

// Firebase
import { sendInvoiceToFirebase } from '../firebase/firebase';

const Index = () => {
  const [invoiceData, setInvoiceData] = useState({
    customerName: '',
    invoiceDate: '',
    dueDate: '',
    lineItems: [],
    notes: '',
    email: '',
  });

  const addLineItem = () => {
    setInvoiceData((prevState) => ({
      ...prevState,
      lineItems: [...prevState.lineItems, { description: '', quantity: 1, rate: 0 }],
    }));
  };

  const updateLineItem = (index, field, value) => {
    setInvoiceData((prevState) => {
      const updatedLineItems = [...prevState.lineItems];
      updatedLineItems[index][field] = value;
      return { ...prevState, lineItems: updatedLineItems };
    });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log('Gönderilen Fatura:', invoiceData);

    try {
      await sendInvoiceToFirebase(invoiceData);
      console.log('Fatura başarıyla Firebase Firestore\'a gönderildi');
    } catch (error) {
      console.error('Fatura gönderilirken hata oluştu:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Fatura Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">Müşteri Adı:</label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            value={invoiceData.customerName}
            onChange={(e) => setInvoiceData({ ...invoiceData, customerName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="invoiceDate" className="form-label">Fatura Tarihi:</label>
          <input
            type="date"
            className="form-control"
            id="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={(e) => setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Son Ödeme Tarihi:</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={invoiceData.dueDate}
            onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Adresi:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={invoiceData.email}
            onChange={(e) => setInvoiceData({ ...invoiceData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <h3>Satır Öğeleri</h3>
          <button type="button" className="btn btn-primary" onClick={addLineItem}>
            Satır Öğesi Ekle
          </button>
          {invoiceData.lineItems.map((item, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ürün veya hizmet açıklaması"
                value={item.description}
                onChange={(e) => updateLineItem(index, 'description', e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Miktar"
                value={item.quantity}
                onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value))}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Birim Fiyat"
                value={item.rate}
                onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value))}
              />
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notlar:</label>
          <textarea
            className="form-control"
            id="notes"
            value={invoiceData.notes}
            onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-success">Faturayı Gönder</button>
      </form>
    </div>
  );
};

export default Index;
