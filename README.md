# Doxa Forge Website

A responsive website for Doxa Forge - a student-driven innovation lab. The site includes:
- Doxa Forge landing page
- Projects listing page
- OpenPipette project page (a student-run open hardware project creating affordable, validated pipettes)
- Wiki system for project documentation

## Features

- Fully responsive design (mobile, tablet, desktop)
- Accessible markup with ARIA labels and semantic HTML
- Two conversion forms: mailing list signup and investor/partner registration
- **Wiki system** - Static markdown-based wiki editable via GitHub
- Subtle micro-animations and fade-in effects
- Modern design inspired by minimal, bold typography and spacious layouts

## Tech Stack

- React 18
- React Router DOM for routing
- TailwindCSS for styling
- Vite for build tooling
- react-markdown for wiki system

## Site Structure

- `/` - Doxa Forge landing page
- `/projects` - Projects listing page
- `/projects/OpenPipette` - OpenPipette project page
- `/projects/OpenPipette#wiki` - OpenPipette wiki (hash-based routing)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

Output will be in the `dist/` directory.

## Integration Guide

### Mailing List Form

The mailing list form posts to `/api/subscribe`. To integrate:

1. **Mailchimp**: Use Mailchimp's API or webhook
   - Sign up for Mailchimp
   - Create an audience/list
   - Use Mailchimp's JavaScript SDK or create a serverless function to handle the POST request

2. **Buttondown**: Use Buttondown's API
   - Sign up for Buttondown
   - Use their REST API: `POST https://api.buttondown.email/v1/subscribers`

3. **Google Sheets**: Use Google Apps Script or Zapier
   - Create a Google Sheet
   - Use Apps Script to create a webhook endpoint
   - Or use Zapier to connect form submissions to Google Sheets

4. **Custom Backend**: Create your own endpoint
   - Example: Node.js/Express, Python/Flask, or serverless function (Vercel, Netlify Functions)

### Investor Form

The investor form posts to `/api/investor` with FormData (including optional file uploads). To integrate:

1. **File Storage**: Use AWS S3, Cloudinary, or similar
   - Upload files to cloud storage
   - Store file URLs in your database

2. **Backend**: Create an endpoint that:
   - Validates form data
   - Handles file uploads
   - Sends email notifications
   - Stores data in a database

3. **Email Notifications**: Use SendGrid, Mailgun, or AWS SES
   - Send confirmation to submitter
   - Notify team members of new submissions

## Deployment

### Recommended Platforms

1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```
   - Automatic deployments from Git
   - Serverless functions for API endpoints
   - Free tier available

2. **Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```
   - Similar to Vercel
   - Netlify Functions for API endpoints

3. **GitHub Pages**
   - Build the project: `npm run build`
   - Deploy the `dist/` folder to GitHub Pages

### Environment Variables

Create a `.env` file for local development:
```
VITE_MAILCHIMP_API_KEY=your_key_here
VITE_MAILCHIMP_LIST_ID=your_list_id
```

## Analytics

### Google Analytics 4

Add to `index.html` before closing `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible Analytics

Add to `index.html` before closing `</head>`:
```html
<script defer data-domain="openpipette.org" src="https://plausible.io/js/script.js"></script>
```

## Accessibility Checklist

✅ **Semantic HTML**: All sections use proper HTML5 semantic elements (`<nav>`, `<section>`, `<footer>`, etc.)

✅ **ARIA Labels**: Forms include `aria-required`, `aria-invalid`, and `aria-describedby` attributes

✅ **Color Contrast**: Text meets WCAG AA standards (dark text on light background, sufficient contrast ratios)

✅ **Keyboard Navigation**: All interactive elements are keyboard accessible with visible focus states

✅ **Form Labels**: All form inputs have associated `<label>` elements

✅ **Error Messages**: Form validation errors are announced to screen readers via `role="alert"`

✅ **Alt Text**: SVG illustrations include descriptive text (consider adding `<title>` elements for complex graphics)

## Sample Welcome Email

**Subject:** Welcome to OpenPipette — You're on the list!

**Body:**

Hi there,

Thanks for joining the OpenPipette mailing list! We're excited to have you along for the journey.

We're building open-source, affordable pipettes that can save lives — especially when they're cheap. As a student-led project, we're re-engineering pipettes to be robust, validated, and accessible to labs and clinics everywhere.

You'll receive updates on:
- Our progress toward a 96-channel validated prototype
- Validation results and accuracy testing
- Launch timeline and early access opportunities
- Open design releases on GitHub

Stay tuned, and feel free to reach out if you have questions or want to get involved.

Best,
The OpenPipette Team

---

P.S. If you're interested in investing or partnering, check out our [Investors & Partners form](https://openpipette.org#investors).

## Wiki System

The landing page includes a built-in wiki system that uses markdown files stored in `/public/wiki/`.

### Editing the Wiki

1. Navigate to the GitHub repository
2. Go to `web/public/wiki/`
3. Edit any `.md` file directly in GitHub
4. Changes will be reflected after deployment

### Adding New Wiki Pages

1. Create a new `.md` file in `/public/wiki/`
2. Update the `WIKI_PAGES` array in `/src/Wiki.jsx` to include your new page
3. Commit both files

### Wiki Features

- Static markdown rendering (no server required)
- GitHub Flavored Markdown support
- Sidebar navigation
- Direct links to edit pages on GitHub
- Fully responsive design

See `/public/wiki/README.md` for more details.

## License

Open Hardware · CC BY-SA (or MIT for code)

