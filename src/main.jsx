import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'

// this check it to remove consoles on specified environments
// change this line for prod environment
if (import.meta.env.VITE_API_ENV === 'dev') {
  // eslint-disable-next-line no-console
  console.log = () => { };
  console.error = () => { };
  console.warn = () => { };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
