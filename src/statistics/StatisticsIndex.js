import React, {useEffect, useState} from 'react';
import {apiGet} from '../utils/api';
import {Link} from 'react-router-dom';
import './StatisticsStyle.css';

export default function StatisticsIndex(){

    const [invoiceStatistics, setInvoiceStatistics] = useState(null);
    const [personStatistics, setPersonStatistics] = useState(null);

    useEffect(() => {
        apiGet('/api/invoices/statistics').then((data) => setInvoiceStatistics(data));
        apiGet('/api/persons/statistics').then((data) => setPersonStatistics(data));
    }, []);

    if (!invoiceStatistics || !personStatistics) {

        return (
        <div>
            <h1>Statistiky</h1>
            <p>Načítám statistiky...</p>
        </div>
        )
    }
    

    return (
        <div>
            <h1>Statistiky</h1>
            <hr/>
            <h2>Celkové statistiky</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th >Počet Faktur</th>
                    <th >Tržba za tento rok</th>
                    <th >Tržba celkem</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{invoiceStatistics.invoicesCount} </td>
                        <td align="right">{invoiceStatistics.currentYearSum} Kč</td>
                        <td align="right">{invoiceStatistics.allTimeSum} Kč</td>
                    </tr>
                </tbody>
            </table>
            <h2>Personální statistiky</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th >#</th>
                    <th >Jméno</th>
                    <th >Tržba</th>
                </tr>
                </thead>
                <tbody>
                    {personStatistics.map((item, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td id="statisticsNameTd">{item.personName} 
                                                <Link
                                                    to={"/persons/show/" + item.personId}
                                                    className="btn btn-sm btn-info"
                                                    >🔍
                                                </Link> 
                                            </td>
                                            <td align="right">{item.revenue} Kč</td>
                                        </tr>
                                    ))}
                </tbody>
            </table>
        </div>
    );

}