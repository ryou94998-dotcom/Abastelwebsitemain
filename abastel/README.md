# Abastel Website

Modern, minimal static website for Abastel LLP — built for GitHub Pages hosting.

## Structure

```
abastel/
├── index.html              # Home page
├── 404.html                # 404 error page
├── css/
│   └── style.css           # All styles (design tokens, layout, components)
├── js/
│   ├── main.js             # Used by index.html only
│   └── shared.js           # Nav + footer injection for all /pages/* files
├── pages/
│   ├── our-story.html
│   ├── our-team.html
│   ├── telecom.html
│   ├── plastic-moulds.html
│   ├── packaging.html
│   ├── aerospace.html
│   ├── factory-tour.html
│   ├── gallery.html
│   └── contact.html
└── images/                 # (Create this folder and add your photos here)
```

## GitHub Pages Deployment

1. Push this entire folder to a GitHub repository (e.g. `abastel-website`)
2. Go to **Settings → Pages**
3. Under "Source", select **Deploy from a branch**
4. Select branch: `main` (or `master`), folder: `/ (root)`
5. Click **Save** — your site will be live at `https://yourusername.github.io/abastel-website/`

### Custom Domain (abastel.in)
1. In Settings → Pages → Custom domain, enter `abastel.in`
2. Add these DNS records at your domain registrar:
   - `A` record → `185.199.108.153`
   - `A` record → `185.199.109.153`
   - `A` record → `185.199.110.153`
   - `A` record → `185.199.111.153`
   - `CNAME` record: `www` → `yourusername.github.io`

## Adding Photos

Replace gallery placeholders and team avatar divs:

**Gallery** (`pages/gallery.html`): Replace each  
`<div class="gallery-placeholder">Label</div>`  
with  
`<img src="../images/your-photo.jpg" alt="Description">`

**Team** (`pages/our-team.html`): Replace each  
`<div class="team-avatar">XX</div>`  
with  
`<img class="team-avatar" src="../images/team-name.jpg" alt="Name">`

**Recommended**: JPG, min 800px wide, under 300KB each.

## Contact Form

The contact form uses [Formspree](https://formspree.io) for free form submission:

1. Create a free account at formspree.io
2. Create a new form and copy the form ID
3. In `pages/contact.html`, replace `YOUR_FORM_ID` in the form action URL

## Customisation

- **Colors**: Edit CSS variables at the top of `css/style.css`
- **Company info**: Update email, phone, address in `js/shared.js` (footer) and `pages/contact.html`
- **Team names/bios**: Edit `pages/our-team.html`
- **Products**: Edit any of the vertical pages in `pages/`
