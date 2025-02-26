import React, {useEffect, useState} from "react";
import {redirect, useNavigate, useParams} from "react-router-dom";
import {dateStringFormatter} from "../utils/dateStringFormatter";
import {apiGet} from "../utils/api";
import {Link} from "react-router-dom";
import {apiDelete} from "../utils/api";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});
    const navigate = useNavigate();

    const deleteInvoice = async (id) => {
          try {
              await apiDelete("/api/invoices/" + id);
          } catch (error) {
              console.log(error.message);
              alert(error.message)
          }
          navigate("/invoices");
    };

    useEffect(() => {
        apiGet(`/api/invoices/${id}`).then((data) => setInvoice(data));
    }, [id]);     

    

    if (!invoice) {
        return <h1 className="text-danger">404 Faktura nenalezena</h1>;
    }
    if (!invoice.buyer) {
        return null;
    }
    if (!invoice.seller) {
        return null;
    }
    

    return (
        <>
            <div>
                <h1>Detail faktury</h1>
                <hr />
                <h3>{invoice.invoiceNumber} ({invoice.product})</h3>
                <Link to={"/invoices/edit/" + id} className="btn btn-sm btn-warning">
                    Upravit
                </Link>
                <button onClick={() => deleteInvoice(id)} className="btn btn-sm btn-danger">
                    Odstranit
                </button>
                <p>
                    <strong>Vystavení faktury:</strong>
                    <br />
                    {dateStringFormatter(invoice.issued)}
                </p>
                <p>
                    <strong>Splátnost faktury:</strong>
                    <br />
                    {dateStringFormatter(invoice.dueDate)}
                </p>
                <p>
                    <strong>Cena:</strong>
                    <br />
                    {invoice.price} Kč
                </p>
                <p>
                    <strong>DPH:</strong>
                    <br />
                    {invoice.vat} Kč
                </p>
                <p>
                    <strong>Dodavatel:</strong>
                    <br />
                    {invoice.seller.name}, {invoice.seller.identificationNumber}
                    <br />
                    <Link to={"/persons/show/" + invoice.seller._id} className="btn btn-sm btn-info">
                        Zobrazit
                    </Link>
                </p>
                <p>
                    <strong>Odběratel:</strong>
                    <br />
                    {invoice.buyer.name}, {invoice.buyer.identificationNumber}
                    <br />
                    <Link to={"/persons/show/" + invoice.buyer._id} className="btn btn-sm btn-info">
                        Zobrazit
                    </Link>
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br />
                    {invoice.note}
                </p>
            </div>
        </>
    );
};

export default InvoiceDetail;
