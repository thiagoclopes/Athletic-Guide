import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { DietProvider } from './pages/InformationCapture/DietContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <DietProvider>
    <App />
  </DietProvider>
  </React.StrictMode>,
)
