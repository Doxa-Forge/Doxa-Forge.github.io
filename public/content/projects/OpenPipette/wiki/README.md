# Wiki Documentation

This directory contains the markdown files for the OpenPipette wiki.

## Editing the Wiki

To edit wiki pages:

1. Navigate to the GitHub repository: https://github.com/Doxa-Forge/OpenPipette
2. Go to the `web/public/content/projects/OpenPipette/wiki/` directory
3. Click on the markdown file you want to edit
4. Click the "Edit" button (pencil icon)
5. Make your changes
6. Commit your changes with a descriptive message
7. The changes will be reflected after the next deployment

## Adding New Pages

1. Create a new `.md` file in this directory
2. Add the page to the `WIKI_PAGES` array in `/src/Wiki.jsx`:
   ```javascript
   { id: 'newpage', title: 'New Page Title', file: 'newpage.md' }
   ```
3. Commit both the markdown file and the updated Wiki.jsx

## Markdown Support

The wiki supports standard markdown plus GitHub Flavored Markdown (GFM):
- Headers (# ## ###)
- Bold and italic text
- Lists (ordered and unordered)
- Links
- Code blocks
- Tables
- Blockquotes
- And more

## File Structure

- `index.md` - Wiki homepage
- `overview.md` - Project overview
- `design.md` - Design specifications
- `validation.md` - Validation protocols

Add more pages as needed!

