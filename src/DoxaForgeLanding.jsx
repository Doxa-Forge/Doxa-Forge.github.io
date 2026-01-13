/**
 * Doxa Forge Landing Page
 * 
 * Main landing page for Doxa Forge organization
 * Content is loaded from /public/content/DoxaForge/content.yml
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadDoxaForgeContent, loadProjectsList } from './utils/contentLoader'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

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

  // #region agent log
  useEffect(() => {
    if (loading || !content) return
    setTimeout(() => {
      const button = document.querySelector('a[href="/projects"], Link[to="/projects"]')
      const computedStyle = button ? window.getComputedStyle(button) : null
      fetch('http://127.0.0.1:7243/ingest/8b755312-3682-4361-b7b5-3e08b2bcd949',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DoxaForgeLanding.jsx:120',message:'Button visibility check',data:{hasButton:!!button,backgroundColor:computedStyle?.backgroundColor,color:computedStyle?.color,display:computedStyle?.display,opacity:computedStyle?.opacity,textContent:button?.textContent?.substring(0,20)},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'H6'})}).catch(()=>{})
    }, 200)
  }, [loading, content])
  // #endregion

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error loading content</div>
          <div className="text-gray-600">Please check the console for details</div>
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
    <div className="min-h-screen bg-white">
      <SEO 
        title="Where Ideas Take Shape"
        description={hero?.description || "Doxa Forge is a student-driven innovation lab focused on rapid prototyping and experimentation. We transform ideas into working prototypes and MVPs."}
        keywords="student innovation, rapid prototyping, MVP, startup, software development, open source, innovation lab"
        ogTitle="Doxa Forge - Where Ideas Take Shape"
        ogDescription={hero?.description || "A student-driven innovation lab focused on rapid prototyping and experimentation."}
      />
      
      {/* Navigation */}
      <Navbar navigation={nav} githubLink={hero.cta_secondary.link} />

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#faf5ff' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-purple-100 rounded-full border-2 border-purple-200">
              <span className="text-sm font-semibold text-purple-700">
                Student Innovation Lab
              </span>
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold leading-tight mb-6 text-gray-900">
            {hero.title}
          </h1>
          <p className="text-2xl sm:text-3xl font-heading font-bold mb-8 text-purple-600">
            {hero.subtitle}
          </p>
          <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            {hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={hero.cta_primary.link}
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg inline-block"
              style={{ backgroundColor: '#9333ea', color: '#ffffff' }}
            >
              {hero.cta_primary.text}
            </Link>
            <a
              href={hero.cta_secondary.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white border-2 border-purple-300 text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors shadow-md"
            >
              {hero.cta_secondary.text}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-heading font-extrabold mb-6 text-gray-900">
                {about.title}
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: about.description_1.replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-600 font-bold">$1</strong>') }} />
                <p dangerouslySetInnerHTML={{ __html: about.description_2.replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-600 font-bold">$1</strong>') }} />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8">{about.focus_areas_title}</h3>
              <ul className="space-y-6">
                {about.focus_areas.map((area, idx) => {
                  const colors = [
                    { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
                    { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' },
                    { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
                    { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
                    { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-300' }
                  ]
                  const color = colors[idx % colors.length]
                  return (
                    <li key={idx} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className={`inline-block px-3 py-1 rounded-lg ${color.bg} ${color.border} border mb-2`}>
                        <span className={`font-bold ${color.text} text-base`}>{area.title}</span>
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed mt-2">{area.description}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold mb-12 text-gray-900">
            {mission.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {mission.items.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg">
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-gray-900">
              {content.projects_preview.title}
            </h2>
            <Link
              to="/projects"
              className="text-purple-600 hover:text-purple-700 font-bold text-lg transition-colors"
            >
              {content.projects_preview.view_all} →
            </Link>
          </div>
          {content.projects_preview.description && (
            <p className="text-lg text-gray-700 m-12 text-center max-w-2xl mx-auto">
              {content.projects_preview.description}
            </p>
          )}
          <div className="grid md:grid-cols-1 gap-8">
            {projects.length > 0 ? (
              projects.slice(0, 1).map((project) => (
                <Link
                  key={project.id}
                  to={project.link}
                  className="block bg-white border-2 border-purple-200 rounded-2xl p-10 hover:border-purple-400 transition-colors shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-3xl font-heading font-bold text-purple-600">
                      {project.title}
                    </h3>
                    <span className="text-2xl text-purple-600">→</span>
                  </div>
                  <p className="text-gray-700 text-lg mb-6">
                    {project.description}
                  </p>
                  <div className="text-purple-600 font-bold text-lg">
                    Explore project
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12 text-gray-600">
                {content.projects_preview.empty_message}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#faf5ff' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold mb-6 text-gray-900">
            {getInvolved.title}
          </h2>
          <p className="text-lg text-gray-700 mb-10 leading-relaxed">
            {getInvolved.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getInvolved.cta_primary.link}
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              {getInvolved.cta_primary.text}
            </a>
            <a
              href={getInvolved.cta_secondary.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white border-2 border-purple-300 text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors shadow-md"
            >
              {getInvolved.cta_secondary.text}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer footer={footer} />
    </div>
  )
}
