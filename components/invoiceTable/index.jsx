import React from "react";
import Lottie from "lottie-react";


// Helpers
import  dateFormat  from "../../utilities/helpers/dateFormat";

//Lottie 
import animationData from "../../public/animations/empty_list_animation.json"; 


const InvoiceTable = ({invoices}) => {

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
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.customerName}</td>
                <td>{dateFormat(invoice.invoiceDate)}</td>
                <td>{dateFormat(invoice.dueDate)}</td>
                <td id="status" style={{ color: getStatusColor(invoice.paymentStatus) }}>
                  {invoice.paymentStatus ? invoice.paymentStatus : "-"}
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
