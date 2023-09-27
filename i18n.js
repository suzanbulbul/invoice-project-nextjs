// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "welcome",
          invoiceList: "Invoice List",
          createInvoice: "Create Invoice",
          customerName: "Customer name",
          fillField:"Fill in this field.",
          emailAddress:"Email Address",
          invoiceDate:"Invoice Date",
          dueDate:"Due Date",
          extraItem:"Extra Item",
          desc:"Description",
          amount:"Amount",
          price:"Price",
          addLinItem:"Add Line Item",
          notes:"Notes",
          paymentStatus:"Payment Status",
          pleaseSelect:"Please select",
          paid:"Paid",
          unpaid:"Unpaid",
          pending:"Pending",
          saveInvoice:"Save Invoice",
          addInvoice:"Add Invoice",
          errorFettingInvoices:"Error getting invoices",
          emptyInvoiceList: "There is no invoice in the Invoice List.",
          status: "Status",
          sendMail: "Send Mail",
          sendEmail: "Sent Email",
          emailDesc: "Email Description",
          send: "Send"
        }
      },
      tr: {
        translation: {
            welcome: "hoşgeldin",
            invoiceList: "Fatura Listesi",
            createInvoice: "Fatura Oluştur",
            customerName: "Müşteri Adı",
            fillField:"Bu alanı doldurunuz.",
            emailAddress:"Email Adresi",
            invoiceDate:"Fatura Tarihi",
            dueDate:"Son Ödeme Tarihi",
            extraItem:"Ekstra Ürün",
            desc:"Açıklama",
            amount:"Tutar",
            price:"Fiyat",
            addLinItem:"Satır Ekle",
            notes:"Notlar",
            paymentStatus:"Ödeme Durumu",
            pleaseSelect:"Lütfen Seçiniz",
            paid:"Ödendi",
            unpaid:"Ödenmedi",
            pending:"Bekliyor",
            saveInvoice:"Faturayı Kaydet",
            addInvoice:"Fatura Ekle",
            errorFettingInvoices:"Faturaları alma hatası",
            emptyInvoiceList: "Fatura Listesinde fatura bulunamamaktadır.",
            status:"Durum",
            sendMail: "Mail Gönder",
            sendEmail:"Gönderilen Email",
            emailDesc:"Email Açıklaması",
            send: "Gönder",
        }
      }
    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: <i class="fas fa-loveseat    "></i>
    }
  });

export default i18n;
