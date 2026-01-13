/**
 * OpenPipette Landing Page Component
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import doxaForgeLogo from '../assets/doxa_forge_logo.png'
import { loadOpenPipetteContent, loadOpenPipetteTeam } from './utils/contentLoader'
import SEO from './components/SEO'

// Avatar component with image support and fallback to initials
const AvatarPlaceholder = ({ name, avatar }) => {
  const [imageError, setImageError] = useState(false)
  
  if (avatar && !imageError) {
    return (
      <img 
        src={avatar} 
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
        onError={() => setImageError(true)}
      />
    )
  }
  
  // Fallback to initials
  return (
    <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center text-teal font-heading font-semibold text-lg">
      {name.split(' ').map(n => n[0]).join('')}
    </div>
  )
}

export default function OpenPipetteLanding() {
  const [content, setContent] = useState(null)
  const [teamConfig, setTeamConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contentData, teamData] = await Promise.all([
          loadOpenPipetteContent(),
          loadOpenPipetteTeam()
        ])
        setContent(contentData)
        setTeamConfig(teamData)
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])


  // Intersection Observer for fade-in animations
  useEffect(() => {
    if (loading) return
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.fade-in')
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [loading])

  if (loading || !content || !teamConfig) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    )
  }

  const project = content.project
  const statusBar = content.status_bar
  const nav = content.navigation
  const hero = content.hero
  const features = content.features
  const howItWorks = content.how_it_works
  const impact = content.impact
  const mailingList = content.mailing_list
  const investors = content.investors
  const team = content.team
  const footer = content.footer

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="OpenPipette"
        description={hero?.description || "Open-source pipettes that cost 40% less than commercial alternatives. Validated, modular designs enabling labs worldwide to access reliable pipetting equipment."}
        keywords="open source, medical equipment, pipette, laboratory, affordable healthcare, open hardware, lab equipment"
        ogTitle="OpenPipette - Open Source Medical Equipment"
        ogDescription={hero?.description || "Open source medical equipment can save lives. Especially when it's affordable."}
      />
      {/* Status Bar & Navigation */}
      <div className="sticky top-0 z-50">
        {/* Status Bar */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-2.5">
            <div className="flex items-center justify-center gap-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
                <span>Current phase: <strong className="text-dark font-semibold">{statusBar.phase}</strong></span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={doxaForgeLogo} alt="Doxa Forge" className="h-8 w-auto" />
              </Link>
              <span className="text-muted">/</span>
              <a href="#hero" className="text-xl font-heading font-bold text-dark hover:text-teal transition-colors">
                OpenPipette
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#about" className="text-muted hover:text-dark transition-colors">{nav.links.about}</a>
              <a href="#how-it-works" className="text-muted hover:text-dark transition-colors">{nav.links.how_it_works}</a>
              <a href="#impact" className="text-muted hover:text-dark transition-colors">{nav.links.impact}</a>
              <a href="#join" className="text-muted hover:text-dark transition-colors">{nav.links.join}</a>
              <Link
                to="/projects/OpenPipette/wiki"
                className="text-muted hover:text-dark transition-colors"
              >
                {nav.links.wiki}
              </Link>
              <Link
                to="/projects"
                className="text-muted hover:text-dark transition-colors"
              >
                {nav.back_to_projects}
              </Link>
            </div>
            <a
              href={`mailto:${project.contact_email}?subject=${encodeURIComponent('Get Early Access - OpenPipette')}`}
              className="md:hidden px-4 py-2 text-muted hover:text-dark transition-colors text-sm"
              aria-label="Contact us"
            >
              Contact
            </a>
          </div>
        </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-40 px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-700">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-bold text-dark leading-[1.1] mb-8 text-balance">
              {hero.headline}
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-teal mb-16 text-balance">
              {hero.subheadline}
            </p>
            <p className="text-lg sm:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
              {hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={`mailto:${project.contact_email}?subject=${encodeURIComponent('Get Early Access - OpenPipette')}`}
                className="px-10 py-4 bg-teal text-white rounded-full font-semibold text-lg hover:bg-teal/90 transition-colors text-center"
                aria-label={hero.cta_primary.text}
              >
                {hero.cta_primary.text}
              </a>
              <a
                href={`mailto:${project.contact_email}?subject=${encodeURIComponent('Partner with OpenPipette')}`}
                className="px-10 py-4 bg-white border border-gray-300 text-dark rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors text-center"
                aria-label={hero.cta_secondary.text}
              >
                {hero.cta_secondary.text}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Row */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-center text-gray-600">
            {content.social_proof.items.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-400">•</span>}
                {item.includes('GitHub') ? (
                  <a href={project.github_url} className="text-teal hover:text-dark transition-colors font-medium" target="_blank" rel="noopener noreferrer">
                    {item}
                  </a>
                ) : (
                  <span className="text-gray-600">{item}</span>
                )}
              </React.Fragment>
            ))}
            {project.institution && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{project.institution}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features / Why it matters */}
      <section id="about" className="py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-dark text-center mb-16 text-balance">
            {features.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-16">
            {features.items.map((feature, idx) => (
              <div 
                key={idx}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700"
              >
                <h3 className="text-3xl font-heading font-bold text-dark mb-4">{feature.title}</h3>
                <p className="text-muted leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 px-6 sm:px-8 lg:px-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-dark text-center mb-16 text-balance">
            {howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-20">
            {howItWorks.steps.map((step, idx) => (
              <div 
                key={idx}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700"
              >
                <div className="text-5xl font-heading font-bold text-teal/20 mb-6">{idx + 1}</div>
                <h3 className="text-2xl font-heading font-bold text-dark mb-4">{step.title}</h3>
                <p className="text-muted text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-32 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-dark mb-8 text-balance leading-tight">
              {impact.title}
            </h2>
            <p className="text-2xl sm:text-3xl font-heading font-semibold text-teal mb-12 text-balance">
              {impact.subtitle}
            </p>
            <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl mx-auto">
              {impact.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {impact.metrics.map((metric, idx) => {
              // Calculate team members dynamically if auto_calculate is true
              const finalMetric = { ...metric }
              if (finalMetric.auto_calculate || finalMetric.value === 'auto') {
                finalMetric.value = teamConfig.members.length.toString()
                if (finalMetric.note === 'Contributors' || finalMetric.label.toLowerCase().includes('team')) {
                  finalMetric.note = teamConfig.members.map(m => m.name).join(', ')
                }
              }
              return finalMetric
            }).map((metric, idx) => (
              <div 
                key={idx}
                className="fade-in opacity-0 translate-y-8 transition-all duration-700 text-center"
              >
                <div className="text-6xl font-heading font-bold text-teal mb-3">{metric.value}</div>
                <div className="text-lg font-medium text-dark mb-2">{metric.label}</div>
                {metric.note && <div className="text-sm text-muted">{metric.note}</div>}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href={impact.cta.link || "#join"}
              className="inline-block px-10 py-4 bg-teal text-white rounded-full font-semibold text-lg hover:bg-teal/90 transition-colors"
            >
              {impact.cta.text}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="join" 
        className="py-32 px-6 sm:px-8 lg:px-12 border-t border-gray-100"
      >
        <div className="max-w-2xl mx-auto">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-dark mb-6 text-balance">
              {mailingList.title}
            </h2>
            <p className="text-lg text-muted mb-8">
              {mailingList.description}
            </p>
            <a
              href={`mailto:${project.contact_email}?subject=${encodeURIComponent('Get Early Access - OpenPipette')}`}
              className="inline-block px-10 py-4 bg-teal text-white rounded-full font-semibold text-lg hover:bg-teal/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Investors / Partners Section */}
      <section 
        id="investors" 
        className="py-32 px-6 sm:px-8 lg:px-12 bg-gray-50"
      >
        <div className="max-w-2xl mx-auto">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-dark mb-6 text-balance">
              {investors.title}
            </h2>
            <p className="text-lg text-muted mb-8">
              {investors.description}
            </p>
            <a
              href={`mailto:${project.contact_email}?subject=${encodeURIComponent('Partner with OpenPipette')}`}
              className="inline-block px-10 py-4 bg-teal text-white rounded-full font-semibold text-lg hover:bg-teal/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Team Block */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-700 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-dark mb-8 text-balance">
              {team.title}
            </h2>
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-12 mb-8 ${
              teamConfig.members.length > 2 ? 'flex-wrap' : ''
            }`}>
              {teamConfig.members.map((member, idx) => (
                <div key={idx} className="text-center flex flex-col items-center">
                  <div className="flex justify-center">
                    <AvatarPlaceholder name={member.name} avatar={member.avatar} />
                  </div>
                  <p className="mt-4 font-semibold text-dark text-lg">{member.name}</p>
                  <p className="text-muted">
                    {member.role}
                    {member.department && ` (${member.department})`}
                    {member.age && ` • Age ${member.age}`}
                  </p>
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`} 
                      className="text-sm text-teal hover:text-dark transition-colors mt-1 inline-block"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
            {teamConfig.seeking && (
              <p className="text-muted">
                {teamConfig.seeking}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-teal">
                {footer.brand_name}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">{footer.resources_title}</h4>
              <ul className="space-y-2 text-gray-700">
                <li><a href={footer.links.github} className="hover:text-teal transition-colors" target="_blank" rel="noopener noreferrer">GitHub repo</a></li>
                <li><a href={footer.links.contact} className="hover:text-teal transition-colors">Contact email</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">{footer.legal_title}</h4>
              <ul className="space-y-2 text-gray-700">
                <li><Link to={footer.links.privacy} className="hover:text-teal transition-colors">Privacy</Link></li>
                <li><Link to={footer.links.terms} className="hover:text-teal transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p className="mb-2">{footer.license_text}</p>
            <p>
              © {new Date().getFullYear()} {footer.copyright}
              {project.institution && ` · ${project.institution}`}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

