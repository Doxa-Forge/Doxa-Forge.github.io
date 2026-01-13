import React from 'react'
import { Link } from 'react-router-dom'
import doxaForgeLogo from '../../assets/doxa_forge_logo.png'

/**
 * Navbar Component
 * 
 * Reusable navbar for Doxa Forge pages
 * 
 * @param {Object} props
 * @param {Object} props.navigation - Navigation data from content.yml
 * @param {string} props.githubLink - GitHub URL (from hero.cta_secondary.link or footer.links.github)
 */
export default function Navbar({ navigation, githubLink }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={doxaForgeLogo} alt={navigation.logo_alt} className="h-10 w-auto" />
            <span className="text-xl font-heading font-bold">
              {navigation.brand_name}
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/projects" className="text-gray-900 hover:text-purple-600 font-semibold transition-colors">
              {navigation.links.projects}
            </Link>
            <a 
              href={githubLink}
              className="text-gray-900 hover:text-purple-600 font-semibold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {navigation.links.github}
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

