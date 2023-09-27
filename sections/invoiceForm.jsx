import React, { useState } from 'react';
import toast from 'react-hot-toast';

// Firebase
import { sendInvoiceToFirebase } from '../firebase/firebase';

//Icons
import { AiFillCheckCircle} from 'react-icons/ai';
import { MdReplay} from 'react-icons/md';

const InvoiceForm  = () => {
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


  //Yeni item ögesi 
  const handleAddItem = async() => {

    try{
        if (extraItemDesc && extraItemAmount && extraItemPrice) {
          const newItem = { extraItemDesc, extraItemAmount, extraItemPrice };
          setInvoiceData((prevData) => ({
            ...prevData,
            lineItems: [...prevData.lineItems, newItem],
          }));
          setExtraItemDesc("");
          setExtraItemAmount("");
          setExtraItemPrice("");
          setExtraItem(false);
        }
      }
      catch(error){
        console.error('Yeni item eklenirken hata oluştu:', error);
      }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    try {
      await sendInvoiceToFirebase(invoiceData);
      toast.success("Fatura oluşturuldu.");
      resetForm();
    } catch (error) {
      toast.error("Fatura gönderilirken hata oluştu:");
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
      paymentStatus: '', 
    })); 
  }

  return (
    <div className="invoiceForm">
      <div className="invoiceForm-container">
        <h2 className="title">Fatura Oluştur</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input">
            <label htmlFor="customerName" className="form-label label">
              Müşteri Adı:
            </label>
            <input
              type="text"
              id="customerName"
              placeholder="Bu alanı doldurun."
              value={invoiceData.customerName}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, customerName: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3 input">
            <label htmlFor="email" className="form-label label">
              Email Adresi:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Bu alanı doldurun."
              value={invoiceData.email}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="input me-2 w-100">
              <label htmlFor="invoiceDate" className="form-label label">
                Fatura Tarihi:
              </label>
              <input
                type="date"
                id="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    invoiceDate: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="input ms-2 w-100">
              <label htmlFor="dueDate" className="form-label label">
                Son Ödeme Tarihi:
              </label>
              <input
                type="date"
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
            <h5 className="subtitle mb-2">Extra Öğe</h5>
            {invoiceData.lineItems && (
              <div>
                {invoiceData.lineItems.map((item, index) => (
                  <ul className='mb-3' key={index}>
                    <li className="d-flex justify-content-between align-items-center my-3">
                      <div className="form-control border-0 label">
                        <b>Desc:</b> {item.extraItemDesc}
                      </div>
                      <div className="form-control border-0 ps-0 label">
                        <b>Amount:</b> {item.extraItemAmount}
                      </div>
                      <div className="form-control border-0 ps-0 label">
                        <b>Price:</b> {item.extraItemPrice}
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            )}
            {extraItem ? (
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="input w-100">
                    <label className="form-label label" htmlFor="extraItemDesc">
                      Desc:
                    </label>
                    <input
                      type="text"
                      placeholder="Bu alanı doldurun."
                      value={extraItemDesc}
                      onChange={(e) => setExtraItemDesc(e.target.value)}
                    />
                  </div>
                  <div className="input w-100 mx-2">
                    <label
                      className="form-label label"
                      htmlFor="extraIteextraItemAmountmAmount"
                    >
                      Amount:
                    </label>
                    <input
                      type="number"
                      placeholder="Bu alanı doldurun."
                      value={extraItemAmount}
                      onChange={(e) => setExtraItemAmount(e.target.value)}
                    />
                  </div>
                  <div className="input w-100">
                    <label
                      className="form-label label"
                      htmlFor="extraItemPrice"
                    >
                      Price:
                    </label>
                    <input
                      type="number"
                      placeholder="Bu alanı doldurun."
                      value={extraItemPrice}
                      onChange={(e) => setExtraItemPrice(e.target.value)}
                    />
                  </div>
                  {!extraItemDesc || !extraItemAmount || !extraItemPrice ? (
                    <MdReplay
                      className="icon icon-warning d-flex justify-content-center align-items-center"
                      onClick={() => setExtraItem(false)}
                    />
                  ) : (
                    <AiFillCheckCircle
                      className="icon icon-success text-success d-flex justify-content-center align-items-center"
                      onClick={handleAddItem}
                    />
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="primaryButton"
                onClick={() => setExtraItem(true)}
              >
                Satır Öğesi Ekle
              </button>
            )}
          </div>

          <div className="mb-3 input">
            <label htmlFor="notes" className="form-label label">
              Notlar:
            </label>
            <textarea
              id="notes"
              placeholder="Bu alanı doldurun."
              value={invoiceData.notes}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, notes: e.target.value })
              }
            />
          </div>

          <div className="mb-3 input">
            <label htmlFor="paymentStatus" className="form-label label">
              Ödeme Durumu:
            </label>
            <select
              className='paymentStatus'
              id="paymentStatus"
              value={invoiceData.paymentStatus}
              onChange={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  paymentStatus: e.target.value,
                })
              }
              required
            >
              <option value="">Lütfen seçin</option>
              <option value="paid">Ödenmiş</option>
              <option value="unpaid">Ödenmemiş</option>
              <option value="pending">Beklemede</option>
            </select>
          </div>
          <button type="submit" className="secondaryButton w-100">
            Faturayı Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm ;

