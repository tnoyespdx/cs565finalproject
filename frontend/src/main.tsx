import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx'

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain="dev-vkg33qrgjahvink0.us.auth0.com"
    clientId="2SqkJTH4FNdMGTkmtcj5f7o0DQFk4FsP"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/"
    }}
  >
    <App />
  </Auth0Provider>,
)
