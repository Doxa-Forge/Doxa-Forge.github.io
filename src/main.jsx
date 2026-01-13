import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DoxaForgeLanding from './DoxaForgeLanding.jsx'
import ProjectsList from './ProjectsList.jsx'
import OpenPipetteLanding from './OpenPipetteLanding.jsx'
import Wiki from './Wiki.jsx'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DoxaForgeLanding />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/OpenPipette" element={<OpenPipetteLanding />} />
        <Route path="/projects/OpenPipette/wiki" element={<Wiki />} />
        <Route path="/projects/OpenPipette/wiki/:pageId" element={<Wiki />} />
        {/* Redirect old hash-based wiki to new route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

