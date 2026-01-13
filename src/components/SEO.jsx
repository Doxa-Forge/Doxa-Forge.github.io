import React from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * SEO Component for dynamic meta tags
 * Usage: <SEO title="Page Title" description="Page description" />
 */
export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage,
  ogType = 'website',
  canonical
}) {
  const fullTitle = title ? `${title} | Doxa Forge` : 'Doxa Forge - Where Ideas Take Shape'
  const metaDescription = description || 'Doxa Forge is a student-driven innovation lab focused on rapid prototyping and experimentation. We transform ideas into working prototypes and MVPs.'
  const metaKeywords = keywords || 'student innovation, rapid prototyping, MVP, startup, software development, open source'
  const ogTitleFinal = ogTitle || fullTitle
  const ogDescriptionFinal = ogDescription || metaDescription

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitleFinal} />
      <meta property="og:description" content={ogDescriptionFinal} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitleFinal} />
      <meta name="twitter:description" content={ogDescriptionFinal} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  )
}

