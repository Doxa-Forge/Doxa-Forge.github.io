import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Footer Component
 * 
 * Reusable footer for Doxa Forge pages
 * 
 * @param {Object} props
 * @param {Object} props.footer - Footer data from content.yml
 */
export default function Footer({ footer }) {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4 text-purple-600">
              {footer.brand_name}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {footer.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900">{footer.resources_title}</h4>
            <ul className="space-y-2 text-gray-700">
              <li><a href={footer.links.github} className="hover:text-purple-600 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><Link to={footer.links.projects} className="hover:text-purple-600 transition-colors">Projects</Link></li>
              <li><a href={footer.links.contact} className="hover:text-purple-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900">{footer.location_title}</h4>
            <p className="text-gray-700">{footer.location}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

