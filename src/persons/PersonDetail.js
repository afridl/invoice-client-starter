/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

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

    useEffect(() => {
        apiGet(`/api/persons/${id}`).then((data) => setPerson(data));        
    }, [id]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    useEffect(() => {
        apiGet(`/api/identification/${person.identificationNumber}/sales`).then((data) => setSales(data));
        apiGet(`/api/identification/${person.identificationNumber}/purchases`).then((data) => setPurchases(data));
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
        return null;
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
                <h3>{person.name} ({person.identificationNumber})</h3>
                <Link to={"/persons/edit/" + id} className="btn btn-sm btn-warning">
                        Upravit
                    </Link>
                    <button onClick={() => deletePerson(id)} className="btn btn-sm btn-danger">
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
                <InvoiceTable label="Prodeje" items={sales} deleteInvoice={deleteInvoice}></InvoiceTable>
                <InvoiceTable label="Nákupy" items={purchases} deleteInvoice={deleteInvoice}></InvoiceTable>
            </span>
        </>
    );
};

export default PersonDetail;
