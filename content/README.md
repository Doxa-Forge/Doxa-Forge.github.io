# Content Management

All website content is now stored in YAML files for easy editing. Edit these files directly in GitHub to update the website content.

## Directory Structure

```
public/content/
├── DoxaForge/
│   └── content.yml          # Doxa Forge landing page content
├── projects/
│   ├── content.yml          # Projects list page content
│   ├── projects.yml         # Projects configuration (list of all projects)
│   └── OpenPipette/
│       ├── content.yml      # OpenPipette project page content
│       ├── team.yml         # OpenPipette team configuration
│       └── wiki/            # OpenPipette wiki markdown files
│           ├── index.md
│           ├── overview.md
│           ├── design.md
│           └── validation.md
```

## Editing Content

### Doxa Forge Landing Page
Edit: `public/content/DoxaForge/content.yml`

### Projects List Page
Edit: `public/content/projects/content.yml` (page content)
Edit: `public/content/projects/projects.yml` (projects list - add new projects here)

### OpenPipette Project Page
Edit: `public/content/projects/OpenPipette/content.yml` (page content)
Edit: `public/content/projects/OpenPipette/team.yml` (team members)

### Wiki Pages
Edit markdown files in: `public/content/projects/OpenPipette/wiki/`

## Adding a New Project

1. Create a new directory: `public/content/projects/YourProject/`
2. Create `content.yml` and `team.yml` files (copy from OpenPipette as template)
3. Add project to `public/content/projects/projects.yml`:
   ```yaml
   projects:
     - id: "YourProject"
       title: "Your Project"
       description: "Project description..."
       tags: ["Tag1", "Tag2"]
       github_url: "https://github.com/Doxa-Forge/YourProject"
       status: "Planning"
       link: "/projects/YourProject"
   ```
4. Create a route in `src/main.jsx` for the new project page

## YAML Format

All content files use YAML format. Key points:
- Use proper indentation (spaces, not tabs)
- Strings can be multi-line using `|` or `>`
- Use `null` for optional/empty values
- Arrays use `-` prefix
- Objects use key-value pairs

## Benefits

- ✅ All content editable in GitHub without code changes
- ✅ Version controlled content
- ✅ Easy to translate or localize
- ✅ Non-technical team members can edit content
- ✅ Clear separation of content and code

