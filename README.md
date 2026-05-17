# Interactive EEG Frequency Basics

A static teaching site for epilepsy fellows learning frequency, power, filtering, and aliasing concepts in EEG.

## GitHub Pages

The site is configured for GitHub Pages at `https://goldenholzlab.github.io/learningEEGbasics/`.
It is served directly from the repository root and does not require a build step, package install, or GitHub Actions workflow.

## Run Locally

Any simple static file server will work. From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## File Structure

- `index.html`: page shell
- `styles.css`: shared layout and visual styling
- `app.js`: lesson content, diagrams, interactions, quiz logic, and hash-based routing
