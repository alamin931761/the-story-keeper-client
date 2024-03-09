import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import NewArrivalBooks from "./Context/NewArrivalBooks";
import Order from "./Context/Order";
import Search from "./Context/Search";
import AOS from "aos";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
AOS.init();
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NewArrivalBooks>
      <HelmetProvider>
        <BrowserRouter>
          <Search>
            <Order>
              <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                  <App />
                </Provider>
              </QueryClientProvider>
            </Order>
          </Search>
        </BrowserRouter>
      </HelmetProvider>
    </NewArrivalBooks>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
