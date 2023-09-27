import React, {useState} from "react";
import Lottie from "lottie-react";
import toast from "react-hot-toast";


// Helpers
import  dateFormat  from "../../utilities/helpers/dateFormat";

//Lottie 
import animationData from "../../public/animations/empty_list_animation.json"; 


const InvoiceTable = ({invoices}) => {

  const [mailDesc, setMailDesc] = useState("");

  const getStatusColor = (status) => {
    if (status === "paid") {
      return "limegreen"; 
    } else if (status === "unpaid") {
      return "red"; 
    }else if(status === "pending"){
      return "gold";
    }else{
      return "black";
    }
  }

  if (invoices.length === 0) {
    return (
      <div className="invoice-table-empty">
        <h1 className="desc">Fatura Listesinde fatura bulunamamaktadır.</h1>
        <Lottie className="animation" animationData={animationData} />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Mail başarıyla gönderildi.");
  }
  
  return (
    <div className="invoice-table">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Müşteri Adı</th>
              <th>Fatura Tarihi</th>
              <th>Son Ödeme Tarihi</th>
              <th>Durum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.customerName}</td>
                <td>{dateFormat(invoice.invoiceDate)}</td>
                <td>{dateFormat(invoice.dueDate)}</td>
                <td
                  id="status"
                  style={{ color: getStatusColor(invoice.paymentStatus) }}
                >
                  {invoice.paymentStatus ? invoice.paymentStatus : "-"}
                </td>
                <td>
                  <button
                    type="button"
                    className="primaryButton"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${index}`}
                  >
                    Send Mail
                  </button>
                  <div
                    className="modal fade"
                    style={{ textAlign: "left" }}
                    id={`exampleModal${index}`}
                    tabIndex="-1"
                    aria-labelledby={`exampleModalLabel${index}`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-scrollable d-flex align-items-center">
                      <div className="modal-content  p-3 text-left">
                        <div className="modal-header d-flex align-items-venter">
                          <h1
                            className="modal-title desc m-0 text-capitalize"
                            id="exampleModalLabel"
                          >
                            Gönderilen Emial:
                            <b className="text-lowercase"> {invoice.email}</b>
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3 input">
                              <label htmlFor="mailDesc" className="label">
                                E-Posta Açıklaması:
                              </label>
                              <textarea
                                id="mailDesc"
                                value={mailDesc}
                                placeholder={invoice.notes}
                                onChange={(e) => setMailDesc(e.target.value)}
                              />
                            </div>
                            <button
                              type="submit"
                              className="primaryButton w-100"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Gönder
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );    
};

export default InvoiceTable;
