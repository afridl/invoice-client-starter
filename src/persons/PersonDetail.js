
import React, {useEffect, useState} from "react";
import {redirect, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";
import {apiDelete} from "../utils/api";
import "./PersonStyles.css";
import InvoiceTable from "../invoices/InvoiceTable";

const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});
    const [sales, setSales] = useState();
    const [purchases, setPurchases] = useState();
    const navigate = useNavigate();
    const [country, setCountry] = useState();

    useEffect(() => {
        apiGet(`/api/persons/${id}`).then((data) => setPerson(data));
                
    }, [id]);
    

    useEffect(() => {
        if(person)            
            {   
                setCountry ((Country.CZECHIA === person.country) ? "Česká republika" : "Slovensko");
                apiGet(`/api/identification/${person.identificationNumber}/sales`).then((data) => setSales(data));
                apiGet(`/api/identification/${person.identificationNumber}/purchases`).then((data) => setPurchases(data));
            }
    }, [person]);

    const deleteInvoice = async (id) => {
            try {
                await apiDelete("/api/invoices/" + id);
            } catch (error) {
                console.log(error.message);
                alert(error.message)
            }
            setInvoices(invoices.filter((item) => item._id !== id));
        };
    
    
    const deletePerson = async (id) => {
        try {
             await apiDelete("/api/persons/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        navigate(`/persons`);
        
        
    };

    if (!person) {
        return <h1 className="text-danger">404 Osobnost nenalezena</h1>;
    }
    if(!sales) {
        return null;
    }
    if(!purchases) {
        return null;
    }
    

     

    return (
        <>
            <div>
                <h1>
                    Detail osoby 
                    
                </h1>
                <hr />
                <h3>{person.name} ({person.identificationNumber}) {person.hidden? <span className="text-danger">Smazaný záznam</span>:null}</h3>
                <Link to={"/persons/edit/" + id} hidden={person.hidden} className="btn btn-sm btn-warning">
                        Upravit
                    </Link>
                    <button hidden={person.hidden} onClick={() => deletePerson(id)} className="btn btn-sm btn-danger">
                        Odstranit
                    </button>
                <p>
                    <strong>DIČ:</strong>
                    <br />
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br />
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br />
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br />
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br />
                    {person.street}, {person.city}, {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br />
                    {person.note}
                </p>
            </div>
            <span id="statisticsTables">
                {(sales.length)?<InvoiceTable  label="Prodeje" items={sales} deleteInvoice={deleteInvoice}></InvoiceTable>:null}
                {(purchases.length)?<InvoiceTable label="Nákupy" items={purchases} deleteInvoice={deleteInvoice}></InvoiceTable>:null}
            </span>
        </>
    );
};

export default PersonDetail;
