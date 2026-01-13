/**
 * Projects List Page
 * 
 * Displays all Doxa Forge projects
 * Content is loaded from /public/content/projects/content.yml and projects.yml
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import doxaForgeLogo from '../assets/doxa_forge_logo.png'
import { loadProjectsContent, loadProjectsList } from './utils/contentLoader'

export default function ProjectsList() {
  const [content, setContent] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contentData, projectsData] = await Promise.all([
          loadProjectsContent(),
          loadProjectsList()
        ])
        setContent(contentData)
        setProjects(projectsData.projects || [])
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    )
  }

  const nav = content.navigation
  const header = content.header
  const footer = content.footer

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={doxaForgeLogo} alt={nav.logo_alt} className="h-10 w-auto" />
              <span className="text-xl font-heading font-bold text-dark">{nav.brand_name}</span>
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <Link to="/projects" className="text-teal font-semibold">
                {nav.links.projects}
              </Link>
              <a 
                href={footer.links.github}
                className="text-muted hover:text-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {nav.links.github}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-16 px-6 sm:px-8 lg:px-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-heading font-bold text-dark mb-6">
            {header.title}
          </h1>
          <p className="text-xl text-muted max-w-3xl">
            {header.description}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">{content.empty_state.message}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={project.link}
                  className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-teal hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-heading font-bold text-dark group-hover:text-teal transition-colors">
                      {project.title}
                    </h2>
                    {project.status && (
                      <span className="px-3 py-1 bg-gray-100 text-muted text-sm rounded-full">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p className="text-muted mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-teal/10 text-teal text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-teal font-semibold">
                      Learn more →
                    </div>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted hover:text-dark transition-colors"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-16 px-6 sm:px-8 lg:px-12 border-t border-gray-100 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-heading font-bold mb-4">{footer.brand_name}</h3>
              <p className="text-gray-400">
                {footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{footer.resources_title}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href={footer.links.github} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><Link to={footer.links.projects} className="hover:text-white transition-colors">Projects</Link></li>
                <li><a href={footer.links.contact} className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{footer.location_title}</h4>
              <p className="text-gray-400">{footer.location}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} {footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
