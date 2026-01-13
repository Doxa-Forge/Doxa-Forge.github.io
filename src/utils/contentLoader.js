/**
 * Content Loader Utility
 * 
 * Loads and parses YAML content files
 */

import yaml from 'js-yaml'

/**
 * Load a YAML content file
 * @param {string} path - Path to the YAML file (relative to /public/content/)
 * @returns {Promise<Object>} Parsed YAML content
 */
export async function loadContent(path) {
  try {
    const response = await fetch(`/content/${path}`)
    if (!response.ok) {
      throw new Error(`Failed to load content: ${path}`)
    }
    const text = await response.text()
    return yaml.load(text)
  } catch (error) {
    console.error(`Error loading content from ${path}:`, error)
    throw error
  }
}

/**
 * Load Doxa Forge content
 */
export async function loadDoxaForgeContent() {
  return loadContent('DoxaForge/content.yml')
}

/**
 * Load Projects list content
 */
export async function loadProjectsContent() {
  return loadContent('projects/content.yml')
}

/**
 * Load projects list configuration
 */
export async function loadProjectsList() {
  return loadContent('projects/projects.yml')
}

/**
 * Load OpenPipette project content
 */
export async function loadOpenPipetteContent() {
  return loadContent('projects/OpenPipette/content.yml')
}

/**
 * Load OpenPipette team configuration
 */
export async function loadOpenPipetteTeam() {
  return loadContent('projects/OpenPipette/team.yml')
}

