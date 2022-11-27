import {createContext} from 'react'
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Store from "./store/Store.js";

export const store = new Store();

export const Context = createContext({
    store
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{
        store
    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>
)
