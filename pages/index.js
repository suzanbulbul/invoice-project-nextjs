import React, { useState } from 'react';

// Firebase
import { sendInvoiceToFirebase } from '../firebase/firebase';

//Icons
import { AiFillCheckCircle} from 'react-icons/ai';
import { MdReplay} from 'react-icons/md';

const Index = () => {
  const [extraItem, setExtraItem] = useState(false)
  const [extraItemDesc, setExtraItemDesc] = useState('');
  const [extraItemAmount, setExtraItemAmount] = useState('');
  const [extraItemPrice, setExtraItemPrice] = useState('');
  const [invoiceData, setInvoiceData] = useState({
    customerName: '',
    invoiceDate: '',
    dueDate: '',
    lineItems: [],
    notes: '',
    email: '',
    paymentStatus: '',
  });

  console.log(invoiceData)

  //Yeni item ögesi 
  const handleAddItem = () => {
    if (extraItemDesc && extraItemAmount && extraItemPrice) {
      console.log('Yeni item:', extraItemDesc, extraItemAmount, extraItemPrice);
      const newItem = { extraItemDesc, extraItemAmount, extraItemPrice };
      setInvoiceData((prevData) => ({
        ...prevData,
        lineItems: [...prevData.lineItems, newItem],
      }));      
      setExtraItemDesc('');
      setExtraItemAmount('');
      setExtraItemPrice('');
      setExtraItem(false);
    }
    else{
      console.log('Extra alanları dolu olmalı');
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log('Gönderilen Fatura:', invoiceData);

    try {
      await sendInvoiceToFirebase(invoiceData);
      console.log('Fatura başarıyla Firebase Firestore\'a gönderildi');
      resetForm();
    } catch (error) {
      console.error('Fatura gönderilirken hata oluştu:', error);
    }
  };

  const resetForm = () => {
    setInvoiceData(() => ({
      customerName: '',
      invoiceDate: '',
      dueDate: '',
      lineItems: [],
      notes: '',
      email: '',
      paymentStatus,
    })); 
  }

  return (
    <div className="container mt-5">
      <h2>Fatura Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">
            Müşteri Adı:
          </label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            value={invoiceData.customerName}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, customerName: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Adresi:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={invoiceData.email}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className=" me-2 w-100">
            <label htmlFor="invoiceDate" className="form-label">
              Fatura Tarihi:
            </label>
            <input
              type="date"
              className="form-control"
              id="invoiceDate"
              value={invoiceData.invoiceDate}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })
              }
              required
            />
          </div>
          <div className="ms-2 w-100">
            <label htmlFor="dueDate" className="form-label">
              Son Ödeme Tarihi:
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={invoiceData.dueDate}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, dueDate: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <h5>Extra Öğe</h5>
          {invoiceData.lineItems && (
            <div>
              {invoiceData.lineItems.map((item, index) => (
                <ul key={index}>
                  <li className="d-flex justify-content-between align-items-center my-3">
                    <div className="form-control border-0 m-0 p-0">
                      <span style={{ marginRight: "5px" }}>&bull;</span>
                      <b>Extra Item Desc:</b> {item.extraItemDesc}
                    </div>
                    <div className="form-control border-0 mx-2">
                      <b>Extra Item Amount:</b> {item.extraItemAmount}
                    </div>
                    <div className="form-control border-0">
                      <b>Extra Item Price:</b> {item.extraItemPrice}
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          )}
          {extraItem ? (
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center my-3">
                <div className="form-group w-100">
                  <label className="form-label" htmlFor="extraItemDesc">
                    Amount:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="İçerik giriniz."
                    value={extraItemDesc}
                    onChange={(e) => setExtraItemDesc(e.target.value)}
                  />
                </div>
                <div className="form-group w-100 mx-2">
                  <label
                    className="form-label"
                    htmlFor="extraIteextraItemAmountmAmount"
                  >
                    Amount:
                  </label>
                  <input
                    type="number"
                    className="form-control "
                    placeholder="İçerik giriniz."
                    value={extraItemAmount}
                    onChange={(e) => setExtraItemAmount(e.target.value)}
                  />
                </div>
                <div className="form-group w-100">
                  <label className="form-label" htmlFor="extraItemPrice">
                    Amount:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="İçerik giriniz."
                    value={extraItemPrice}
                    onChange={(e) => setExtraItemPrice(e.target.value)}
                  />
                </div>
                {!extraItemDesc || !extraItemAmount || !extraItemPrice ? (
                  <MdReplay
                    style={{
                      fontSize: "5rem",
                      marginLeft: "25px",
                      color: "green",
                      position: "relative",
                      bottom: "-12px",
                    }}
                    className="text-warning d-flex justify-content-center align-items-center"
                    onClick={handleAddItem}
                  />
                ) : (
                  <AiFillCheckCircle
                    style={{
                      fontSize: "5rem",
                      marginLeft: "25px",
                      color: "green",
                      position: "relative",
                      bottom: "-12px",
                    }}
                    className="text-success d-flex justify-content-center align-items-center"
                    onClick={handleAddItem}
                  />
                )}
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setExtraItem(true)}
            >
              Satır Öğesi Ekle
            </button>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notlar:
          </label>
          <textarea
            className="form-control"
            id="notes"
            value={invoiceData.notes}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, notes: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paymentStatus" className="form-label">
            Ödeme Durumu:
          </label>
          <select
            className="form-select"
            id="paymentStatus"
            value={invoiceData.paymentStatus}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, paymentStatus: e.target.value })
            }
            required
          >
            <option value="">Lütfen seçin</option>
            <option value="paid">Ödenmiş</option>
            <option value="unpaid">Ödenmemiş</option>
            <option value="pending">Beklemede</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Faturayı Gönder
        </button>
      </form>
    </div>
  );
};

export default Index;
