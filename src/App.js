
import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
  useNavigate
} from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import StatisticsIndex from "./statistics/StatisticsIndex";




function AppContent() {
  const navigate = useNavigate();
  

  return (
    
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <ul className="navbar-nav mr-auto" id= "nav">
            <li className="nav-item">
              <Link to={"/persons"} className="nav-link">
                Osoby
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/invoices"} className="nav-link">
                Faktury
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/statistics"} className="nav-link">
                Statistiky
              </Link>
            </li>
            <li>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
             ↶ Zpět
            </button>
            
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<Navigate to={"/persons"} />} />
          <Route path="/persons">
            <Route index element={<PersonIndex />} />
            <Route path="show/:id" element={<PersonDetail />} />
            <Route path="create" element={<PersonForm />} />
            <Route path="edit/:id" element={<PersonForm />} />
          </Route>
          <Route path="/invoices">
            <Route index element={<InvoiceIndex />} />
            <Route path="show/:id" element={<InvoceDetail />} />
            <Route path="create" element={<InvoiceForm />} />
            <Route path="edit/:id" element={<InvoiceForm />} />
          </Route>
          <Route path="/statistics">
            <Route index element={<StatisticsIndex />} />            
          </Route>

        </Routes>
      </div>
    
  );
}

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
