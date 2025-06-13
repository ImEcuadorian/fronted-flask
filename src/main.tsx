import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Login} from "./Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Products} from "./Products.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/products" element={<Products />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
