import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import DoxaForgeLanding from './DoxaForgeLanding.jsx'
import ProjectsList from './ProjectsList.jsx'
import OpenPipetteLanding from './OpenPipetteLanding.jsx'
import Wiki from './Wiki.jsx'

// Component to redirect .md file links to proper wiki routes (from outside wiki)
function WikiRedirect() {
  const { pageId } = useParams()
  // Remove .md extension if present and redirect to wiki route
  const cleanPageId = pageId?.replace(/\.md$/, '') || 'index'
  return <Navigate to={`/projects/OpenPipette/wiki/${cleanPageId}`} replace />
}

// Component to redirect .md file links within wiki to proper wiki route (without .md)
function WikiMdRedirect() {
  const { pageId } = useParams()
  // Remove .md extension and redirect to wiki route without .md
  const cleanPageId = pageId?.replace(/\.md$/, '') || 'index'
  return <Navigate to={`/projects/OpenPipette/wiki/${cleanPageId}`} replace />
}

// Component to redirect direct page access (without .md) to proper wiki route
// Only redirects if it's a known wiki page, otherwise redirects to OpenPipette landing
function WikiPageRedirect() {
  const { pageId } = useParams()
  // List of known wiki page IDs (without .md extension)
  // This should match the WIKI_PAGES array in Wiki.jsx
  const knownWikiPages = ['index', 'overview', 'design', 'validation', 'editing-guide']
  
  // Don't redirect if it's 'wiki' (that's handled by the wiki route)
  if (pageId === 'wiki') {
    return <Navigate to="/projects/OpenPipette/wiki" replace />
  }
  
  // Redirect known wiki pages to their wiki route
  if (knownWikiPages.includes(pageId)) {
    return <Navigate to={`/projects/OpenPipette/wiki/${pageId}`} replace />
  }
  
  // If not a known wiki page, redirect to OpenPipette landing
  return <Navigate to="/projects/OpenPipette" replace />
}

function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<DoxaForgeLanding />} />
          <Route path="/projects" element={<ProjectsList />} />
          {/* Wiki routes - must come before /projects/OpenPipette to avoid conflicts */}
          <Route path="/projects/OpenPipette/wiki" element={<Wiki />} />
          {/* Handle .md links within wiki - redirect to proper wiki route without .md */}
          <Route path="/projects/OpenPipette/wiki/:pageId.md" element={<WikiMdRedirect />} />
          <Route path="/projects/OpenPipette/wiki/:pageId" element={<Wiki />} />
          {/* Handle .md file links from outside wiki - redirect to proper wiki route */}
          <Route path="/projects/OpenPipette/:pageId.md" element={<WikiRedirect />} />
          {/* Handle direct page access (without .md) - redirect to wiki if known page */}
          <Route path="/projects/OpenPipette/:pageId" element={<WikiPageRedirect />} />
          <Route path="/projects/OpenPipette" element={<OpenPipetteLanding />} />
          {/* Redirect old hash-based wiki to new route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

