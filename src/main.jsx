import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./redux/store"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='858764586464-c49s88ikrscv67nspbpphf9o7qujcdfg.apps.googleusercontent.com'>
  <React.StrictMode>
   <Provider store={store}>
   <App />
   <ToastContainer position="top-center" autoClose={2000}/>
   </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
)
