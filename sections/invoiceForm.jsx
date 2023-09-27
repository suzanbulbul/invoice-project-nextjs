import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

// Firebase
import { sendInvoiceToFirebase } from '../firebase/firebase';

//Icons
import { AiFillCheckCircle} from 'react-icons/ai';
import { MdReplay} from 'react-icons/md';

const InvoiceForm  = () => {
  const { t } = useTranslation();
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
        <div className="invoiceForm-content">
          <h2 className="title">{t('createInvoice')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <label htmlFor="customerName" className="form-label label">
                {t('customerName')}:
              </label>
              <input
                type="text"
                id="customerName"
                placeholder={t('fillField')}
                value={invoiceData.customerName}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    customerName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="input">
              <label htmlFor="email" className="form-label label">
                {t('emailAddress')}:
              </label>
              <input
                type="email"
                id="email"
                placeholder={t('fillField')}
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
                  {t('invoiceDate')}:
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
                  {t('dueDate')}:
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
              <h5 className="subtitle mb-2">{t('extraItem')}:</h5>
              {invoiceData.lineItems && (
                <div>
                  {invoiceData.lineItems.map((item, index) => (
                    <ul className="mb-3" key={index}>
                      <li className="d-flex justify-content-between align-items-center my-3">
                        <div className="form-control border-0 label">
                          <b>{t('desc')}:</b> {item.extraItemDesc}
                        </div>
                        <div className="form-control border-0 ps-0 label">
                          <b>{t('amount')}:</b> {item.extraItemAmount}
                        </div>
                        <div className="form-control border-0 ps-0 label">
                          <b>{t('price')}:</b> {item.extraItemPrice}
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              )}
              {extraItem ? (
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-11">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="input">
                            <label className="form-label label" for="extraItemDesc">
                            {t('desc')}:
                            </label>
                            <input
                              type="text"
                              placeholder={t('fillField')}
                              value={extraItemDesc}
                              onChange={(e) => setExtraItemDesc(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div claclassNamess="input">
                            <label
                              className="form-label label"
                              for="extraItemAmount"
                            >
                              {t('amount')}:
                            </label>
                            <input
                              type="number"
                              placeholder={t('fillField')}
                              value={extraItemAmount}
                              onChange={(e) =>
                                setExtraItemAmount(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="input">
                            <label
                              class="form-label label"
                              for="extraItemPrice"
                            >
                              {t('price')}:
                            </label>
                            <input
                              type="number"
                              placeholder={t('fillField')}
                              value={extraItemPrice}
                              onChange={(e) =>
                                setExtraItemPrice(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1 icon-area">
                      {!extraItemDesc || !extraItemAmount || !extraItemPrice ? (
                        <MdReplay
                          class="icon icon-warning d-flex justify-content-center align-items-center"
                          onClick={() => setExtraItem(false)}
                        />
                      ) : (
                        <AiFillCheckCircle
                          class="icon icon-success text-success d-flex justify-content-center align-items-center"
                          onClick={handleAddItem}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="primaryButton"
                  onClick={() => setExtraItem(true)}
                >
                   {t('addLinItem')}:
                </button>
              )}
            </div>

            <div className="input">
              <label htmlFor="notes" className="form-label label">
                {t('notes')}:
              </label>
              <textarea
                id="notes"
                placeholder={t('fillField')}
                value={invoiceData.notes}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, notes: e.target.value })
                }
              />
            </div>

            <div className="input">
              <label htmlFor="paymentStatus" className="form-label label">
              {t('paymentStatus')}::
              </label>
              <select
                className="paymentStatus"
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
                <option value="">{t('pleaseSelect')}:</option>
                <option value="paid">{t('paid')}</option>
                <option value="unpaid">{t('unpaid')}</option>
                <option value="pending">{t('pending')}</option>
              </select>
            </div>
            <button type="submit" className="secondaryButton my-2 w-100">
            {t('saveInvoice')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm ;

