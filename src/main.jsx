import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './kit.css'
/* the brand guidelines (IBA Brand Guidelines v1.0), applied last so they
   override every earlier styling decision */
import './brandbook.css'
/* the site-wide floating motion (by request) — remove to switch it off */
import './float.css'

/* Entrance states live behind `.js`, so if this bundle never runs the page is
   still fully readable instead of being a screen of invisible text. */
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
