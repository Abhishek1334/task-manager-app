import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.tsx'; // <- Updated import
import { Toaster } from "@/components/ui/sonner.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors /> 
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
