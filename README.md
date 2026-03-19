# Portfolio

Single-page portfolio ready for GitHub Pages deployment.

## Tech

- HTML
- CSS
- JavaScript (ES modules)
- Light/Dark theme switch with saved preference

## Edit Content

Update only `assets/content.js` to change:

- Hero
- About
- Projects
- Skills
- Contact
- Hero image
- Project images

The layout and rendering logic are already wired to this file.

You can use local paths (for example, `assets/images/my-photo.jpg`) or external URLs for image fields.

## Run Locally

You can use any static server. Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to GitHub Pages

Push to `main` and the workflow in `.github/workflows/deploy.yml` will deploy automatically.
