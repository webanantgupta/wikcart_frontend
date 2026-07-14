import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from "react-redux";
import { store } from "./redux/Store.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId='762184622759-8ftbfgce25652vid4qe2g7rvbb5f6cgb.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)




