import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {apiDelete, apiGet} from "../utils/api";
import "./InvoiceIndexStyle.css";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilterForm from "./InvoiceFilterForm";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [filters, setFilters] = useState();

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };


    const handleSubmit = (data) => {
        console.log(data);
        setFilters(data);
    }

    useEffect(() => {
        apiGet("/api/invoices", filters).then((data) => setInvoices(data));
    }, [filters]);



    return (
        <div>
            
            <h1>Seznam faktur</h1>                
            
            <hr/>
            <h5>Filtr faktur:</h5>
            <InvoiceFilterForm handleSubmit={handleSubmit} />
            <hr/>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet osob:"
            />
            
        </div>
    );
};
export default InvoiceIndex;
