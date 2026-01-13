/**
 * Wiki Component
 * 
 * A simple, static wiki system using markdown files.
 * Wiki pages are stored in /public/wiki/ and can be edited directly in GitHub.
 * 
 * Usage:
 * - Add markdown files to /public/wiki/
 * - Link to pages using: #wiki?page=filename (without .md extension)
 * - The index page lists all available wiki pages
 */

import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import doxaForgeLogo from '../assets/doxa_forge_logo.png'
import SEO from './components/SEO'

// Wiki page index - update this when adding new pages
const WIKI_PAGES = [
  { id: 'index', title: 'Wiki Home', file: 'index.md', path: '/projects/OpenPipette/wiki' },
  { id: 'editing-guide', title: 'Editing Guide', file: 'editing-guide.md', path: '/projects/OpenPipette/wiki/editing-guide' },
  { id: 'overview', title: 'Project Overview', file: 'overview.md', path: '/projects/OpenPipette/wiki/overview' },
  { id: 'design', title: 'Design Specifications', file: 'design.md', path: '/projects/OpenPipette/wiki/design' },
  { id: 'validation', title: 'Validation Protocols', file: 'validation.md', path: '/projects/OpenPipette/wiki/validation' },
]

/**
 * Transform a markdown link href to a wiki route if it's a wiki page link
 * @param {string} href - The href from the markdown link (e.g., './design.md', '../overview.md', 'design.md')
 * @param {string} currentPageId - The current wiki page ID
 * @returns {string|null} - The wiki route path or null if it's not a wiki page link
 */
function transformWikiLink(href, currentPageId) {
  // Handle external links
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
    return null
  }

  // Handle anchor links (same page)
  if (href.startsWith('#')) {
    return null // Let browser handle anchor links
  }

  // Resolve relative paths
  let resolvedPath = href
  
  // Handle relative paths like ./design.md or ../overview.md
  if (href.startsWith('./')) {
    // Remove ./ prefix
    resolvedPath = href.substring(2)
  } else if (href.startsWith('../')) {
    // For now, we don't have subdirectories, but handle it anyway
    // Remove ../ prefix - in a flat structure, this is the same as removing ./
    resolvedPath = href.replace(/^\.\.\//, '')
  }

  // Remove .md extension if present
  const filename = resolvedPath.replace(/\.md$/, '')
  
  // Find matching wiki page by filename (without extension)
  const wikiPage = WIKI_PAGES.find(page => {
    const pageFilename = page.file.replace(/\.md$/, '')
    return pageFilename === filename
  })

  if (wikiPage) {
    return wikiPage.path
  }

  // Not a wiki page link
  return null
}

export default function Wiki() {
  const navigate = useNavigate()
  const { pageId } = useParams()
  const [currentPage, setCurrentPage] = useState('index')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get page from URL params or default to index
  useEffect(() => {
    if (pageId) {
      setCurrentPage(pageId)
    } else {
      // If no pageId in URL, check if we're on the wiki route
      const path = window.location.pathname
      if (path === '/projects/OpenPipette/wiki') {
        setCurrentPage('index')
      } else {
        // Extract pageId from path
        const match = path.match(/\/wiki\/(.+)$/)
        if (match) {
          setCurrentPage(match[1])
        } else {
          setCurrentPage('index')
        }
      }
    }
  }, [pageId])

  // Load markdown content
  useEffect(() => {
    const loadPage = async () => {
      setLoading(true)
      setError(null)
      
      const pageInfo = WIKI_PAGES.find(p => p.id === currentPage)
      if (!pageInfo) {
        setError('Page not found')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/content/projects/OpenPipette/wiki/${pageInfo.file}`)
        if (!response.ok) {
          throw new Error(`Failed to load ${pageInfo.file}`)
        }
        const text = await response.text()
        setContent(text)
      } catch (err) {
        setError(err.message)
        setContent('')
      } finally {
        setLoading(false)
      }
    }

    loadPage()
  }, [currentPage])

  const handlePageChange = (pageId) => {
    const pageInfo = WIKI_PAGES.find(p => p.id === pageId)
    if (pageInfo) {
      navigate(pageInfo.path)
    }
  }

  const currentPageInfo = WIKI_PAGES.find(p => p.id === currentPage)

  // Helper function to generate ID from text
  const generateId = (text) => {
    if (typeof text === 'string') {
      return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    }
    if (Array.isArray(text)) {
      return generateId(text.map(t => typeof t === 'string' ? t : '').join(''))
    }
    return ''
  }

  // Custom link component for markdown links
  const WikiLink = ({ href, children, ...props }) => {
    const wikiRoute = transformWikiLink(href, currentPage)
    
    if (wikiRoute) {
      // Internal wiki link - use React Router Link
      return (
        <Link to={wikiRoute} className="text-teal hover:underline" {...props}>
          {children}
        </Link>
      )
    }
    
    // Handle anchor links with smooth scrolling
    const isAnchor = href?.startsWith('#')
    if (isAnchor) {
      const handleAnchorClick = (e) => {
        e.preventDefault()
        const targetId = href.substring(1)
        const element = document.getElementById(targetId)
        if (element) {
          const headerOffset = 120 // Account for sticky header
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
          })
        }
      }
      
      return (
        <a
          href={href}
          onClick={handleAnchorClick}
          className="text-teal hover:underline"
          {...props}
        >
          {children}
        </a>
      )
    }
    
    // External link - use regular anchor tag
    const isExternal = href?.startsWith('http://') || href?.startsWith('https://')
    
    return (
      <a
        href={href}
        className="text-teal hover:underline"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={currentPageInfo ? `${currentPageInfo.title} - OpenPipette Wiki` : "OpenPipette Wiki"}
        description={currentPageInfo ? `Documentation for ${currentPageInfo.title} in the OpenPipette project.` : "OpenPipette project documentation and wiki."}
        keywords="OpenPipette, wiki, documentation, open source, medical equipment, pipette"
        ogTitle={currentPageInfo ? `${currentPageInfo.title} - OpenPipette Wiki` : "OpenPipette Wiki"}
        ogDescription={currentPageInfo ? `Documentation for ${currentPageInfo.title} in the OpenPipette project.` : "OpenPipette project documentation and wiki."}
      />
      {/* Wiki Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={doxaForgeLogo} alt="Doxa Forge" className="h-8 w-auto" />
              </Link>
              <span className="text-muted">/</span>
              <Link to="/projects/OpenPipette" className="text-muted hover:text-dark transition-colors">
                OpenPipette
              </Link>
              <span className="text-muted">/</span>
              <h1 className="text-2xl font-heading font-bold text-dark">Wiki</h1>
              {currentPageInfo && (
                <span className="text-muted">/ {currentPageInfo.title}</span>
              )}
            </div>
            <Link
              to="/projects/OpenPipette"
              className="px-4 py-2 text-muted hover:text-dark transition-colors"
            >
              ← Back to Project
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24">
              <h2 className="text-lg font-semibold text-dark mb-4">Pages</h2>
              <ul className="space-y-2">
                {WIKI_PAGES.map((page) => (
                  <li key={page.id}>
                    <Link
                      to={page.path}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors block ${
                        currentPage === page.id
                          ? 'bg-teal/10 text-teal font-semibold'
                          : 'text-muted hover:bg-gray-50 hover:text-dark'
                      }`}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-muted mb-2">
                  <strong>Edit this wiki:</strong>
                </p>
                <a
                  href={`https://github.com/Doxa-Forge/OpenPipette/tree/main/web/public/content/projects/OpenPipette/wiki/${currentPageInfo?.file || 'index.md'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-teal hover:underline"
                >
                  Edit on GitHub →
                </a>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-muted">Loading...</div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error loading page</h3>
                <p className="text-red-600">{error}</p>
                <p className="text-sm text-red-600 mt-2">
                  Make sure the markdown file exists in /public/wiki/
                </p>
              </div>
            )}

            {!loading && !error && content && (
              <article className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, children, ...props }) => {
                      const id = generateId(children)
                      return (
                        <h1 id={id} className="text-4xl font-heading font-bold text-dark mb-6 mt-8 first:mt-0 scroll-mt-32" {...props}>
                          {children}
                        </h1>
                      )
                    },
                    h2: ({ node, children, ...props }) => {
                      const id = generateId(children)
                      return (
                        <h2 id={id} className="text-3xl font-heading font-bold text-dark mb-4 mt-8 scroll-mt-32" {...props}>
                          {children}
                        </h2>
                      )
                    },
                    h3: ({ node, children, ...props }) => {
                      const id = generateId(children)
                      return (
                        <h3 id={id} className="text-2xl font-heading font-semibold text-dark mb-3 mt-6 scroll-mt-32" {...props}>
                          {children}
                        </h3>
                      )
                    },
                    p: ({ node, ...props }) => (
                      <p className="text-muted leading-relaxed mb-4" {...props} />
                    ),
                    a: ({ node, href, children, ...props }) => (
                      <WikiLink href={href} {...props}>{children}</WikiLink>
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-muted" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-muted" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-4" {...props} />
                    ),
                    code: ({ node, inline, ...props }) =>
                      inline ? (
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-dark" {...props} />
                      ) : (
                        <code className="block bg-gray-100 p-4 rounded-lg text-sm font-mono text-dark overflow-x-auto mb-4" {...props} />
                      ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-teal pl-4 italic text-muted my-4" {...props} />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

