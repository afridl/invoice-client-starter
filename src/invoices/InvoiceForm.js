import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";

import FlashMessage from "../components/FlashMessage";






const InvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    issued: "",
    dueDate: "",
    product: "",
    price: "",
    vat: "",
    note: "",
    buyerId: "",
    buyer: {
      _id: ""
    },
    seller: {
      _id: ""
    },
    sellerId: ""
    
  });
  const [persons, setPersons] = useState();
  const [sentState, setSent] = useState(false);
  const [successState, setSuccess] = useState(false);
  const [errorState, setError] = useState(null);
  

  useEffect(() => {
    apiGet("/api/persons").then((data) => setPersons(data));
    
  }, []);

  useEffect(() => {
    if (id) {
      apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }
    
  }, [id]);

  useEffect(() => {
    setInvoice({...invoice, buyerId: invoice.buyer._id});
  }, [invoice.buyer._id]);
  useEffect(() => {
    setInvoice({...invoice, sellerId: invoice.seller._id});
  }, [invoice.seller._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(invoice);
    (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
      .then((data) => {
        setSent(true);
        setSuccess(true);
        navigate(`/invoices`);
        
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setSent(true);
        setSuccess(false);
      });
  };

  const sent = sentState;
  const success = successState;

  if (!persons) {
    return <h1>Načítám...</h1>;
  }
  

  return (
    <div>
      <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
      <hr />
      {errorState ? (
        <div className="alert alert-danger">{errorState}</div>
      ) : null}
      {sent && (
        <FlashMessage
          theme={success ? "success" : ""}
          text={success ? "Uložení osobnosti proběhlo úspěšně." : ""}
        />
      )}
      <form onSubmit={handleSubmit}>
        <h2>Invoice Details</h2>
        <InputField
          max={1000000000}

          label="Číslo faktury"
          type="number"
          name="invoiceNumber"
          value={invoice.invoiceNumber}
          handleChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
          isRequired={true}
        />
        <InputField
          label="Vystavení faktury"
          type="date"
          name="issued"
          value={invoice.issued.split("T")[0]}
          handleChange={(e) => setInvoice({ ...invoice, issued: e.target.value })}
          isRequired={true}
        />
        <InputField
          label="Datum splatnosti"
          type="date"
          name="dueDate"
          value={invoice.dueDate.split("T")[0]}
          handleChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
          required={true}
        />
        <InputField
          label="Produkt"
          type="text"
          name="product"
          value={invoice.product}
          handleChange={(e) => setInvoice({ ...invoice, product: e.target.value })}
          required={true}
        />
        <InputField
          max={1000000000}
          label="Cena"
          type="number"
          name="price"
          value={invoice.price}
          handleChange={(e) => setInvoice({ ...invoice, price: e.target.value })}
          required={true}
        />
        <InputField
          max={1000000000}
          label="DPH"
          type="number"
          name="vat"
          value={invoice.vat}
          handleChange={(e) => setInvoice({ ...invoice, vat: e.target.value })}
          required={true}
        />
        <InputField
          label="Poznámka"
          type="text"
          name="note"
          value={invoice.note}
          handleChange={(e) => setInvoice({ ...invoice, note: e.target.value })}
          required={true}
        />       
        

        
        <InputField
          required={true}
          label="Dodavatel"
          type="select"
          name="seller"
          prompt="Vyberte dodavatele"
          value={invoice.seller._id}
          options={persons}
          handleChange={(e) => setInvoice({ ...invoice, seller: { ...invoice.seller, _id: e.target.value } })}
               
        />
        <InputField
          required={true}
          label="Odběratel"
          type="select"
          name="buyer"
          prompt="Vyberte odběratele"
          value={invoice.buyer._id}
          options={persons}
          handleChange={(e) => setInvoice({ ...invoice, buyer: { ...invoice.buyer, _id: e.target.value } })}
               
        />
        <p />
        <input type="submit" className="btn btn-primary" value="Uložit" />
      </form>
    </div>
  );
};
    
    export default InvoiceForm;