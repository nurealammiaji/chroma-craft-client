import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Public from './routes/Public.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={QueryClient}>
      <AuthProvider>
        <HelmetProvider>
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={Public} />
          </div>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
