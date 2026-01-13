/**
 * OpenPipette Landing Page Component
 * 
 * INTEGRATION NOTES:
 * - Mailing list form: POST to /api/subscribe
 *   Expected payload: { email, role, country }
 *   Replace with Mailchimp webhook, Buttondown API, or Google Sheets via Zapier
 * 
 * - Investor form: POST to /api/investor
 *   Expected payload: FormData with { name, organization, email, role, message, budget, file, consent }
 *   For file uploads, use AWS S3, Cloudinary, or similar storage service
 * 
 * SAMPLE JSON PAYLOADS:
 * 
 * Mailing list:
 * {
 *   "email": "user@example.com",
 *   "role": "Student",
 *   "country": "Belgium"
 * }
 * 
 * Investor form:
 * {
 *   "name": "John Doe",
 *   "organization": "HealthTech Ventures",
 *   "email": "john@example.com",
 *   "role": "Investor",
 *   "message": "Interested in funding...",
 *   "budget": "50k-100k",
 *   "consent": true
 * }
 * 
 * ANALYTICS:
 * - Add Google Analytics 4 (gtag.js) or Plausible script in index.html
 * - Track form submissions and CTA clicks
 * 
 * SEO:
 * - Meta tags included in index.html
 * - Add structured data (JSON-LD) for better search visibility
 */

import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import doxaForgeLogo from '../assets/doxa_forge_logo.png'
import { loadOpenPipetteContent, loadOpenPipetteTeam } from './utils/contentLoader'

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
  const [showEmailField, setShowEmailField] = useState(false)
  const [mailingListForm, setMailingListForm] = useState({ email: '', role: '', country: '' })
  const [investorForm, setInvestorForm] = useState({ 
    name: '', organization: '', email: '', role: '', message: '', budget: '', consent: false 
  })
  const [mailingListStatus, setMailingListStatus] = useState(null)
  const [investorStatus, setInvestorStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const mailingListRef = useRef(null)
  const investorRef = useRef(null)
  const fileInputRef = useRef(null)

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

  const scrollToInvestor = () => {
    investorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleMailingListSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!mailingListForm.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(mailingListForm.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!mailingListForm.role) {
      newErrors.role = 'Please select your role'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        // TODO: Replace with actual endpoint
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mailingListForm),
        })

        if (response.ok) {
          setMailingListStatus('success')
          setMailingListForm({ email: '', role: '', country: '' })
          setShowEmailField(false)
          setTimeout(() => setMailingListStatus(null), 5000)
        } else {
          setMailingListStatus('error')
        }
      } catch (error) {
        console.error('Subscription error:', error)
        setMailingListStatus('error')
      }
    }
  }

  const handleInvestorSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!investorForm.name) newErrors.name = 'Name is required'
    if (!investorForm.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(investorForm.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!investorForm.role) newErrors.role = 'Please select your role'
    if (!investorForm.message) newErrors.message = 'Please tell us about your interest'
    if (!investorForm.consent) newErrors.consent = 'Please agree to be contacted'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        const formData = new FormData()
        Object.keys(investorForm).forEach(key => {
          if (key !== 'consent') {
            formData.append(key, investorForm[key])
          } else {
            formData.append(key, investorForm.consent.toString())
          }
        })

        // Append file if selected
        if (fileInputRef.current?.files?.[0]) {
          formData.append('file', fileInputRef.current.files[0])
        }

        // TODO: Replace with actual endpoint
        const response = await fetch('/api/investor', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          setInvestorStatus('success')
          setInvestorForm({ name: '', organization: '', email: '', role: '', message: '', budget: '', consent: false })
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
          setTimeout(() => setInvestorStatus(null), 5000)
        } else {
          setInvestorStatus('error')
        }
      } catch (error) {
        console.error('Investor form error:', error)
        setInvestorStatus('error')
      }
    }
  }

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
            <button 
              onClick={() => {
                mailingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setShowEmailField(true)
              }}
              className="md:hidden px-4 py-2 text-muted hover:text-dark transition-colors text-sm"
              aria-label="Join mailing list"
            >
              Join
            </button>
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
              <button
                onClick={() => {
                  mailingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setShowEmailField(true)
                }}
                className="px-10 py-4 bg-teal text-white rounded-full font-semibold text-lg hover:bg-teal/90 transition-colors"
                aria-label={hero.cta_primary.text}
              >
                {hero.cta_primary.text}
              </button>
              <button
                onClick={scrollToInvestor}
                className="px-10 py-4 bg-white border border-gray-300 text-dark rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors"
                aria-label={hero.cta_secondary.text}
              >
                {hero.cta_secondary.text}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Row */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 text-center text-muted">
            {content.social_proof.items.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>•</span>}
                {item.includes('GitHub') ? (
                  <a href={project.github_url} className="text-teal hover:text-dark transition-colors" target="_blank" rel="noopener noreferrer">
                    {item}
                  </a>
                ) : (
                  <span>{item}</span>
                )}
              </React.Fragment>
            ))}
            {project.institution && (
              <>
                <span>•</span>
                <span>{project.institution}</span>
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

      {/* Mailing List Signup */}
      <section 
        id="join" 
        ref={mailingListRef}
        className="py-32 px-6 sm:px-8 lg:px-12 border-t border-gray-100"
      >
        <div className="max-w-2xl mx-auto">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-dark mb-6 text-balance">
              {mailingList.title}
            </h2>
            <p className="text-lg text-muted">
              {mailingList.description}
            </p>
          </div>

          <form 
            onSubmit={handleMailingListSubmit}
            className="fade-in opacity-0 translate-y-8 transition-all duration-700"
            noValidate
          >
            {mailingListStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800" role="alert">
                {mailingList.success_message}
              </div>
            )}
            {mailingListStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800" role="alert">
                {mailingList.error_message}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                  {mailingList.form.email_label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={mailingListForm.email}
                  onChange={(e) => setMailingListForm({ ...mailingListForm, email: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-dark mb-2">
                  {mailingList.form.role_label} <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  value={mailingListForm.role}
                  onChange={(e) => setMailingListForm({ ...mailingListForm, role: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  aria-required="true"
                  aria-invalid={errors.role ? 'true' : 'false'}
                >
                  <option value="">Select your role</option>
                  <option value="Student">Student</option>
                  <option value="Researcher">Researcher</option>
                  <option value="NGO">NGO</option>
                  <option value="Other">Other</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.role}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-dark mb-2">
                  {mailingList.form.country_label} <span className="text-sm text-muted">{mailingList.form.country_optional}</span>
                </label>
                <input
                  type="text"
                  id="country"
                  value={mailingListForm.country}
                  onChange={(e) => setMailingListForm({ ...mailingListForm, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div className="text-sm text-muted" dangerouslySetInnerHTML={{ __html: mailingList.form.consent.replace(/Read our privacy note/, `<a href="${mailingList.form.privacy_link}" class="text-teal hover:underline">Read our privacy note</a>`) }} />

              <button
                type="submit"
                className="w-full px-10 py-4 bg-teal text-white rounded-full font-semibold text-lg hover:bg-teal/90 transition-colors"
              >
                {mailingList.form.submit}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Investors / Partners Section */}
      <section 
        id="investors" 
        ref={investorRef}
        className="py-32 px-6 sm:px-8 lg:px-12 bg-gray-50"
      >
        <div className="max-w-2xl mx-auto">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-dark mb-6 text-balance">
              {investors.title}
            </h2>
            <p className="text-lg text-muted">
              {investors.description}
            </p>
          </div>

          <form 
            onSubmit={handleInvestorSubmit}
            className="fade-in opacity-0 translate-y-8 transition-all duration-700"
            noValidate
          >
            {investorStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800" role="alert">
                {investors.success_message}
              </div>
            )}
            {investorStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800" role="alert">
                {investors.error_message}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label htmlFor="investor-name" className="block text-sm font-medium text-dark mb-2">
                  {investors.form.name_label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="investor-name"
                  value={investorForm.name}
                  onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  aria-required="true"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-dark mb-2">
                  {investors.form.organization_label}
                </label>
                <input
                  type="text"
                  id="organization"
                  value={investorForm.organization}
                  onChange={(e) => setInvestorForm({ ...investorForm, organization: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label htmlFor="investor-email" className="block text-sm font-medium text-dark mb-2">
                  {investors.form.email_label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="investor-email"
                  value={investorForm.email}
                  onChange={(e) => setInvestorForm({ ...investorForm, email: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  aria-required="true"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="investor-role" className="block text-sm font-medium text-dark mb-2">
                  {investors.form.role_label} <span className="text-red-500">*</span>
                </label>
                <select
                  id="investor-role"
                  value={investorForm.role}
                  onChange={(e) => setInvestorForm({ ...investorForm, role: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  aria-required="true"
                >
                  <option value="">Select your role</option>
                  <option value="Investor">Investor</option>
                  <option value="Lab">Lab</option>
                  <option value="NGO">NGO</option>
                  <option value="Other">Other</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.role}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                  {investors.form.message_label} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={investorForm.message}
                  onChange={(e) => setInvestorForm({ ...investorForm, message: e.target.value })}
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  aria-required="true"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-dark mb-2">
                  {investors.form.budget_label}
                </label>
                <select
                  id="budget"
                  value={investorForm.budget}
                  onChange={(e) => setInvestorForm({ ...investorForm, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <option value="">Select budget range</option>
                  <option value="<10k">Less than $10k</option>
                  <option value="10k-50k">$10k - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k-500k">$100k - $500k</option>
                  <option value=">500k">More than $500k</option>
                </select>
              </div>

              <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-dark mb-2">
                  {investors.form.file_label} <span className="text-sm text-muted">{investors.form.file_note}</span>
                </label>
                <input
                  type="file"
                  id="file-upload"
                  ref={fileInputRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  accept=".pdf,.doc,.docx"
                />
                <p className="mt-1 text-xs text-muted">{investors.form.file_privacy_note}</p>
              </div>

              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={investorForm.consent}
                    onChange={(e) => setInvestorForm({ ...investorForm, consent: e.target.checked })}
                    className="mt-1 mr-3 w-4 h-4 text-teal focus:ring-teal border-gray-300 rounded"
                    required
                    aria-required="true"
                  />
                  <span className="text-sm text-muted">
                    {investors.form.consent_label} <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.consent}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-10 py-4 bg-teal text-white rounded-full font-semibold text-lg hover:bg-teal/90 transition-colors"
              >
                {investors.form.submit}
              </button>
            </div>
          </form>
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
                <div key={idx} className="text-center">
                  <AvatarPlaceholder name={member.name} avatar={member.avatar} />
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
      <footer className="bg-dark text-white py-16 px-6 sm:px-8 lg:px-12 border-t border-gray-100">
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
                <li><a href={footer.links.github} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">GitHub repo</a></li>
                <li><a href={footer.links.contact} className="hover:text-white transition-colors">Contact email</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{footer.legal_title}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href={footer.links.privacy} className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href={footer.links.terms} className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>{footer.license_text}</p>
            <p className="mt-2">
              © {new Date().getFullYear()} {footer.copyright}
              {project.institution && ` · ${project.institution}`}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

