/**
 * Projects List Page
 * 
 * Displays all Doxa Forge projects
 * Content is loaded from /public/content/projects/content.yml and projects.yml
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadProjectsContent, loadProjectsList, loadDoxaForgeContent } from './utils/contentLoader'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function ProjectsList() {
  const [content, setContent] = useState(null)
  const [projects, setProjects] = useState([])
  const [doxaForgeContent, setDoxaForgeContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contentData, projectsData, doxaForgeData] = await Promise.all([
          loadProjectsContent(),
          loadProjectsList(),
          loadDoxaForgeContent()
        ])
        setContent(contentData)
        setProjects(projectsData.projects || [])
        setDoxaForgeContent(doxaForgeData)
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading || !content || !doxaForgeContent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const nav = doxaForgeContent.navigation
  const hero = doxaForgeContent.hero
  const header = content.header
  const footer = doxaForgeContent.footer

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Projects"
        description={header?.description || "Explore our active projects and prototypes. Each project represents an idea transformed into working software or hardware."}
        keywords="projects, prototypes, MVPs, software development, open source, innovation"
        ogTitle="Doxa Forge Projects"
        ogDescription={header?.description || "Explore our active projects and prototypes."}
      />
      {/* Navigation */}
      <Navbar navigation={nav} githubLink={hero.cta_secondary.link} />

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
      <Footer footer={footer} />
    </div>
  )
}
