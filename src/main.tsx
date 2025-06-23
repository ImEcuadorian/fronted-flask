import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Login} from "./Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Products} from "./Products.tsx";
import Dashboard from "./Dashboard.tsx";
import DashboardClients from "./DasboardClients.tsx";
import {TwoFactor} from "./TwoFactor.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/clients" element={<DashboardClients />} />
              <Route path="/2fa"    element={<TwoFactor />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
