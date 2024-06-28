import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FeatureFlagsProvider } from "./contexts/FeatureFlags";
import ToggleProvider from './contexts/ToggleTheme.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FeatureFlagsProvider>
      <ToggleProvider>
        <App />
      </ToggleProvider>
    </FeatureFlagsProvider>
  </React.StrictMode>,
)
