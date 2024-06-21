import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FeatureFlagsProvider } from "./contexts/FeatureFlags";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FeatureFlagsProvider>
      <App />
    </FeatureFlagsProvider>
  </React.StrictMode>,
)
