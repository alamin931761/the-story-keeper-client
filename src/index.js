import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from "react-query";
import PaginationAndFilter from './Context/PaginationAndFilter';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NewArrivalBooks from './Context/NewArrivalBooks';
AOS.init();
const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PaginationAndFilter>
      <NewArrivalBooks>
        <HelmetProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </HelmetProvider>
      </NewArrivalBooks>
    </PaginationAndFilter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
