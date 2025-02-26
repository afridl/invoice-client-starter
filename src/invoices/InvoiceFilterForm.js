import InputField from "../components/InputField";
import {useState} from "react";
import "./InvoiceFilterFormStyle.css";

export default function InvoiceFilterForm({handleSubmit}){
    const [formData, setFormData] =
    useState({
        buyerId: null,
        sellerId: null,
        product: null,
        minPrice: null,
        maxPrice: null,
        limit: null
    });

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    }
    

    return( 
        <form id="filterForm" onSubmit={onSubmit} className="filter-group">
            <div className="filter-sub-group">
                <div>  
                    <InputField handleChange={(e)=>setFormData({...formData, buyerId: (e.target.value)?e.target.value:null})} label="ID odběratele" type="number"/>
                    <InputField handleChange={(e)=>setFormData({...formData, sellerId: (e.target.value)?e.target.value:null})} label="ID dodavatele" type="number" />
                    <InputField handleChange={(e)=>setFormData({...formData, product: (e.target.value)?e.target.value:null})} label="Produkt" type="text"  />
                </div>
                <div>
                    <InputField handleChange={(e)=>setFormData({...formData, minPrice: (e.target.value)?e.target.value:null})} label="Minimální cena" type="number" />
                    <InputField handleChange={(e)=>setFormData({...formData, maxPrice: (e.target.value)?e.target.value:null})} label="Maximální cena" type="number" />
                    <InputField handleChange={(e)=>setFormData({...formData, limit: (e.target.value)?e.target.value:null})} label="Zobrazit maximální počet faktur" type="number"/>
                </div>
            </div>
         <br/>
         <input type="submit" className="btn btn-primary" value="Filtrovat" />
        </form>
    )
}