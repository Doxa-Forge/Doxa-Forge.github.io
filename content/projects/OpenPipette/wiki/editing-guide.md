# Wiki Editing Guide

This guide explains how to edit and maintain the OpenPipette wiki. The wiki is built using Markdown files that are automatically rendered on the website.

## Table of Contents

- [Quick Start](#quick-start)
- [File Structure](#file-structure)
- [Adding New Pages](#adding-new-pages)
- [Markdown Formatting](#markdown-formatting)
- [Content Structure Guidelines](#content-structure-guidelines)
- [Best Practices](#best-practices)
- [Navigation](#navigation)

## Quick Start

### Where are the wiki files?

All wiki files are located in:
```
web/public/content/projects/OpenPipette/wiki/
```

### How to edit a page

1. Navigate to the wiki page you want to edit on the website
2. Click the "Edit on GitHub" link in the sidebar (or go directly to the GitHub repository)
3. Edit the markdown file (`.md` extension)
4. Commit and push your changes
5. Changes will appear on the website after deployment

### Direct GitHub link

The wiki files are in the GitHub repository at:
```
https://github.com/Doxa-Forge/OpenPipette/tree/main/web/public/content/projects/OpenPipette/wiki
```

## File Structure

### Current Wiki Pages

The wiki consists of the following markdown files:

- `index.md` - Wiki home page and navigation hub
- `overview.md` - Project overview and mission
- `design.md` - Design specifications and technical details
- `validation.md` - Validation protocols and testing procedures
- `editing-guide.md` - This guide (how to edit the wiki)

### File Naming Convention

- Use lowercase letters and hyphens: `my-page.md` (not `MyPage.md` or `my_page.md`)
- Keep filenames short and descriptive
- Match the filename to the page title when possible

## Adding New Pages

To add a new wiki page, follow these steps:

### Step 1: Create the Markdown File

1. Create a new `.md` file in the wiki directory
2. Use a descriptive filename (e.g., `assembly-guide.md`, `troubleshooting.md`)
3. Start the file with a level 1 heading (`#`) that matches your page title

Example:
```markdown
# Assembly Guide

This guide explains how to assemble the OpenPipette...
```

### Step 2: Register the Page in Wiki.jsx

You need to add the new page to the `WIKI_PAGES` array in `src/Wiki.jsx`:

```javascript
const WIKI_PAGES = [
  { id: 'index', title: 'Wiki Home', file: 'index.md', path: '/projects/OpenPipette/wiki' },
  { id: 'overview', title: 'Project Overview', file: 'overview.md', path: '/projects/OpenPipette/wiki/overview' },
  // ... existing pages ...
  { id: 'assembly-guide', title: 'Assembly Guide', file: 'assembly-guide.md', path: '/projects/OpenPipette/wiki/assembly-guide' },
]
```

**Important fields:**
- `id`: A unique identifier (usually matches the filename without `.md`)
- `title`: The display name in the navigation sidebar
- `file`: The markdown filename
- `path`: The URL path (should match the id)

### Step 3: Update index.md

Add a link to your new page in the `index.md` file:

```markdown
## Getting Started

- [Project Overview](./overview.md)
- [Design Specifications](./design.md)
- [Validation Protocols](./validation.md)
- [Assembly Guide](./assembly-guide.md)  <!-- New page -->
```

## Markdown Formatting

The wiki uses standard Markdown with GitHub Flavored Markdown (GFM) extensions. Here are the most common formatting options:

### Headings

```markdown
# Level 1 Heading (Page Title)
## Level 2 Heading (Main Sections)
### Level 3 Heading (Subsections)
#### Level 4 Heading (Sub-subsections)
```

**Note:** Use `#` for the page title, `##` for main sections, and `###` for subsections. The wiki automatically creates a table of contents from these headings.

### Text Formatting

```markdown
**Bold text**
*Italic text*
`Inline code`
~~Strikethrough~~
```

### Lists

**Unordered lists:**
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

**Ordered lists:**
```markdown
1. First item
2. Second item
3. Third item
```

### Links

```markdown
[Link text](./other-page.md)
[External link](https://example.com)
[Link with title](https://example.com "Title text")
```

### Code Blocks

**Inline code:**
```markdown
Use `pip install package` to install.
```

**Code blocks:**
````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

You can specify the language for syntax highlighting:
````markdown
```javascript
const greeting = "Hello, World!";
```
````

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
```

### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```

### Images

```markdown
![Alt text](./images/image.png)
![Alt text with link](https://example.com/image.png)
```

**Note:** Store images in a subdirectory like `wiki/images/` and reference them with relative paths.

### Horizontal Rules

```markdown
---
```

## Content Structure Guidelines

### Page Structure Template

Every wiki page should follow this general structure:

```markdown
# Page Title

Brief introduction paragraph explaining what this page covers.

## Section 1

Content for the first main section.

### Subsection 1.1

More detailed information.

## Section 2

Content for the second main section.

## Resources

- [Link to related page](./other-page.md)
- [External resource](https://example.com)
```

### Section Organization

1. **Start with an overview** - Always begin with a brief introduction
2. **Use clear headings** - Headings should be descriptive and hierarchical
3. **Keep sections focused** - Each section should cover one topic
4. **Add examples** - Include code examples, diagrams, or screenshots when helpful
5. **Link to related content** - Cross-reference other wiki pages and external resources

### Heading Hierarchy

- `#` - Page title (only one per page)
- `##` - Main sections (2-5 per page recommended)
- `###` - Subsections (as needed)
- `####` - Sub-subsections (use sparingly)

## Best Practices

### Writing Style

- **Be clear and concise** - Write for your audience (technical but accessible)
- **Use active voice** - "Install the component" not "The component should be installed"
- **Be consistent** - Use the same terminology throughout
- **Update regularly** - Keep content current with project progress

### Content Guidelines

- **Keep it factual** - Focus on what is, not what might be
- **Include context** - Explain why, not just how
- **Add examples** - Real examples help readers understand
- **Document decisions** - Explain design choices and trade-offs

### Technical Writing Tips

- Use bullet points for lists of items
- Use numbered lists for step-by-step instructions
- Break up long paragraphs
- Use code blocks for commands and code snippets
- Include diagrams or images when they add value

### Maintenance

- **Review regularly** - Check for outdated information
- **Fix broken links** - Ensure all internal and external links work
- **Update examples** - Keep code examples current
- **Remove obsolete content** - Delete or archive outdated pages

## Navigation

### Sidebar Navigation

The wiki sidebar automatically displays:
- All registered pages from `WIKI_PAGES` array
- Table of contents for the current page (extracted from headings)

### Internal Linking

Link to other wiki pages using relative paths:

```markdown
[Link to overview](./overview.md)
[Link to design specs](./design.md)
```

### External Linking

Link to external resources:

```markdown
[GitHub Repository](https://github.com/Doxa-Forge/OpenPipette)
[Documentation](https://example.com/docs)
```

### Breadcrumbs

The wiki header shows the navigation path:
```
Doxa Forge / OpenPipette / Wiki / Current Page
```

## Advanced Features

### Search Functionality

The wiki includes a search feature that:
- Searches across all wiki pages
- Highlights matching text
- Shows context for matches
- Links directly to relevant sections

### Table of Contents

The wiki automatically generates a table of contents from:
- Level 1 headings (`#`) - Main sections
- Level 2 headings (`##`) - Subsections (collapsible)

The TOC appears in the sidebar and allows quick navigation within a page.

### Code Syntax Highlighting

Code blocks support syntax highlighting for many languages:
- JavaScript/TypeScript
- Python
- Bash/Shell
- JSON
- YAML
- And many more

## Troubleshooting

### Page Not Appearing

If a new page doesn't appear:
1. Check that it's added to `WIKI_PAGES` in `Wiki.jsx`
2. Verify the file exists in the correct directory
3. Ensure the filename matches the `file` field in `WIKI_PAGES`
4. Check that the file has a `.md` extension

### Links Not Working

If internal links don't work:
1. Verify the file path is correct (relative to the wiki directory)
2. Check that the target file exists
3. Ensure the filename matches exactly (case-sensitive)

### Formatting Issues

If markdown isn't rendering correctly:
1. Check for syntax errors (unclosed brackets, etc.)
2. Verify you're using standard Markdown syntax
3. Check for special characters that might need escaping

## Getting Help

- **GitHub Issues** - Report wiki issues or suggest improvements
- **Pull Requests** - Submit improvements directly via PR
- **Team Contact** - Reach out to the project leads for questions

## Summary

- Wiki files are in `web/public/content/projects/OpenPipette/wiki/`
- Edit markdown files directly in GitHub
- Add new pages by creating `.md` files and updating `Wiki.jsx`
- Use standard Markdown syntax with GFM extensions
- Follow the content structure guidelines for consistency
- Keep content clear, current, and well-organized

Happy editing!

