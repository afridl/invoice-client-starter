import React from "react";
import {Link} from "react-router-dom";
import "./InvoiceTableStyle.css";

const InvoiceTable = ({label, items, deleteInvoice}) => {
    return (
        <div>
            <p>
                <strong>
                 {label}
                 </strong>
                <br/>
                 Počet faktur: {items.length}
                
            </p>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Číslo faktury</th>
                    <th>Dodavatel</th>
                    <th>Odběratel</th>
                    <th>Cena</th>
                    <th colSpan={3}>Akce</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.invoiceNumber}</td>
                        <td >
                        <Link
                                to={"/persons/show/" + item.seller._id}
                                className="btn btn-sm btn-info"
                            >🔍
                            </Link>
                            &nbsp;
                            {item.seller.name}
                            
                        </td>
                        <td >
                        <Link
                                to={"/persons/show/" + item.buyer._id}
                                className="btn btn-sm btn-info"
                            >🔍
                            </Link>
                            &nbsp;
                            {item.buyer.name} 
                            
                        </td>
                        <td>{item.price}</td>
                        <td>
                            <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default InvoiceTable;
