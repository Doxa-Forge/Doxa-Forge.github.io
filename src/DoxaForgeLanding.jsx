/**
 * Doxa Forge Landing Page
 * 
 * Main landing page for Doxa Forge organization
 * Content is loaded from /public/content/DoxaForge/content.yml
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import doxaForgeLogo from '../assets/doxa_forge_logo.png'
import { loadDoxaForgeContent, loadProjectsList } from './utils/contentLoader'

export default function DoxaForgeLanding() {
  const [content, setContent] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contentData, projectsData] = await Promise.all([
          loadDoxaForgeContent(),
          loadProjectsList()
        ])
        console.log('Loaded content:', contentData)
        console.log('Loaded projects:', projectsData)
        setContent(contentData)
        setProjects(projectsData.projects || [])
      } catch (error) {
        console.error('Error loading content:', error)
        console.error('Error details:', error.message, error.stack)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error loading content</div>
          <div className="text-muted">Please check the console for details</div>
        </div>
      </div>
    )
  }

  const nav = content.navigation
  const hero = content.hero
  const about = content.about
  const mission = content.mission
  const getInvolved = content.get_involved
  const footer = content.footer

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-purple-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={doxaForgeLogo} alt={nav.logo_alt} className="h-10 w-auto transition-transform group-hover:scale-110" />
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {nav.brand_name}
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <Link to="/projects" className="text-dark hover:text-purple-600 font-semibold transition-all hover:scale-105">
                {nav.links.projects}
              </Link>
              <a 
                href={hero.cta_secondary.link}
                className="text-dark hover:text-purple-600 font-semibold transition-all hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                {nav.links.github}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 sm:px-8 lg:px-12 overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-700">
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-200">
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🚀 Student Innovation Lab
              </span>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-extrabold leading-[1.1] mb-8 text-balance">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                {hero.title}
              </span>
            </h1>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-12 text-balance">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {hero.subtitle}
              </span>
            </p>
            <p className="text-xl sm:text-2xl text-dark/80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              {hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link
                to={hero.cta_primary.link}
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                <span className="relative z-10">{hero.cta_primary.text}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              </Link>
              <a
                href={hero.cta_secondary.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white border-2 border-purple-300 text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {hero.cta_secondary.text}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl sm:text-6xl font-heading font-extrabold mb-8 text-balance">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {about.title}
                </span>
              </h2>
              <p className="text-xl text-dark/80 leading-relaxed mb-6 font-medium" dangerouslySetInnerHTML={{ __html: about.description_1.replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-600 font-bold">$1</strong>') }} />
              <p className="text-xl text-dark/80 leading-relaxed font-medium">
                {about.description_2}
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 rounded-3xl transform rotate-3 opacity-50"></div>
              <div className="relative bg-gradient-to-br from-white to-purple-50 p-10 rounded-3xl border-2 border-purple-200 shadow-xl">
                <h3 className="text-3xl font-heading font-bold text-dark mb-8">{about.focus_areas_title}</h3>
                <ul className="space-y-5">
                  {about.focus_areas.map((area, idx) => {
                    const colorClasses = [
                      { dot: 'bg-purple-500', text: 'text-purple-600' },
                      { dot: 'bg-pink-500', text: 'text-pink-600' },
                      { dot: 'bg-blue-500', text: 'text-blue-600' },
                      { dot: 'bg-orange-500', text: 'text-orange-600' },
                      { dot: 'bg-coral', text: 'text-coral' }
                    ]
                    const colors = colorClasses[idx % colorClasses.length]
                    return (
                      <li key={idx} className="flex items-start gap-4 group">
                        <div className={`w-2 h-2 rounded-full ${colors.dot} mt-2 group-hover:scale-150 transition-transform`}></div>
                        <div>
                          <span className={`font-bold ${colors.text} text-lg`}>{area.title}</span>
                          <span className="text-dark/70 ml-2">– {area.description}</span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-heading font-extrabold mb-12 text-balance">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              {mission.title}
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {mission.items.map((item, idx) => {
              const gradients = [
                'from-purple-500 to-pink-500',
                'from-blue-500 to-purple-500',
                'from-pink-500 to-orange-500'
              ]
              const gradient = gradients[idx % gradients.length]
              return (
                <div key={idx} className="group">
                  <div className="bg-white p-8 rounded-3xl border-2 border-transparent hover:border-purple-300 transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center transform group-hover:rotate-12 transition-transform`}>
                      <span className="text-3xl">
                        {idx === 0 ? '🧪' : idx === 1 ? '📚' : '🚀'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-dark mb-4">{item.title}</h3>
                    <p className="text-dark/70 font-medium">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-5xl sm:text-6xl font-heading font-extrabold">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {content.projects_preview.title}
              </span>
            </h2>
            <Link
              to="/projects"
              className="text-purple-600 hover:text-pink-600 transition-colors font-bold text-lg hover:scale-105 transform inline-block"
            >
              {content.projects_preview.view_all}
            </Link>
          </div>
          {content.projects_preview.description && (
            <p className="text-lg text-dark/70 mb-12 text-center max-w-2xl mx-auto">
              {content.projects_preview.description}
            </p>
          )}
          <div className="grid md:grid-cols-1 gap-8">
            {projects.slice(0, 1).map((project) => (
              <Link
                key={project.id}
                to={project.link}
                className="group relative block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-10 hover:border-purple-400 transition-all transform group-hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all">
                      {project.title}
                    </h3>
                    <span className="text-4xl group-hover:scale-110 transition-transform">→</span>
                  </div>
                  <p className="text-dark/80 text-lg mb-6 font-medium">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-lg">
                    Explore project →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl font-heading font-extrabold mb-8 text-balance">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              {getInvolved.title}
            </span>
          </h2>
          <p className="text-xl text-dark/80 mb-10 font-medium">
            {getInvolved.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={getInvolved.cta_primary.link}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              <span className="relative z-10">{getInvolved.cta_primary.text}</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            </a>
            <a
              href={getInvolved.cta_secondary.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white border-3 border-purple-300 text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {getInvolved.cta_secondary.text}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 text-white py-16 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                {footer.brand_name}
              </h3>
              <p className="text-purple-200 font-medium">
                {footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-purple-200">{footer.resources_title}</h4>
              <ul className="space-y-2 text-purple-300">
                <li><a href={footer.links.github} className="hover:text-white transition-colors font-medium" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><Link to={footer.links.projects} className="hover:text-white transition-colors font-medium">Projects</Link></li>
                <li><a href={footer.links.contact} className="hover:text-white transition-colors font-medium">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-purple-200">{footer.location_title}</h4>
              <p className="text-purple-300 font-medium">{footer.location}</p>
            </div>
          </div>
          
          <div className="border-t border-purple-700 pt-8 text-center text-purple-300">
            <p className="font-medium">© {new Date().getFullYear()} {footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
