import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CharactersContextProvider } from './context/CharactersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CharactersContextProvider>
    <App />
    </CharactersContextProvider>
  </StrictMode>,
)
