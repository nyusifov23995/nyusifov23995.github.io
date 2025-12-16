# My Personal Website (Jekyll)

This is a minimal Jekyll scaffold for a responsive personal website with pages: Home, About, Projects, Skills, Experience, Contact.

Quick start (Windows PowerShell):

```powershell
# Install bundler and jekyll if you don't have them
gem install bundler jekyll

# In the project folder
cd "c:/Users/Asus/OneDrive - ADA University/Desktop/mypersonalwebsite"
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload
```

Files of interest:
- `_config.yml` — site config
- `_layouts/default.html` — base layout used by all pages
- `_includes/nav.html` and `_includes/footer.html` — site-wide nav and footer
- `assets/css/style.css` — main responsive styles
- `assets/js/main.js` — small JS for mobile nav toggle

Next steps:
- Replace placeholder content in the markdown pages
- Add images to `assets/` and reference them from pages
- Optionally add analytics, contact form, or deploy to GitHub Pages
