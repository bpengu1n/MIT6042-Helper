# 6.042J walkthrough

An interactive, step-by-step companion to MIT's *Mathematics for Computer Science* (6.042J, Fall 2010). Each of the 25 lectures is four screens: the core idea, a fully worked proof or example, a hands-on widget, and one check question.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no framework.

## Publish on GitHub Pages

```bash
git init -b main
git add .
git commit -m "Initial commit"
gh repo create mcs-6042j-walkthrough --public --source=. --push
```

Then in the repo on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`. The site appears at:

```
https://bpengu1n.github.io/mcs-6042j-walkthrough/
```

It usually goes live within a minute or two of the first push. If you rename the repo, the URL follows the repo name.

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```

## Layout

```
index.html          page shell
css/style.css       all styling; light and dark themes are CSS custom properties on :root
js/core.js          DOM helpers, progress storage, theme toggle
js/widgets.js       one function per interactive widget, keyed by name
js/lectures.js      all lecture content — the LECTURES array
js/app.js           map layout and the lecture/step views
scripts/            download-6042j.sh, fetches the lecture videos from the Internet Archive
```

To add or edit a lecture, change its entry in `js/lectures.js`. A step with `widget: 'name'` calls `WIDGETS.name(container)` from `js/widgets.js`. New lectures also need a position in `POS` (and any edges in `EDGES`) in `js/app.js` to appear on the map.

## Notes

- Progress and theme choice are kept in the visitor's own `localStorage`. Nothing leaves the browser.
- Fonts load from Google Fonts. Everything else is local.
- `.nojekyll` stops GitHub Pages from running Jekyll over the site.

## Attribution

The explanations, worked examples, widgets and questions here are original companion material. The course itself — lectures by Tom Leighton and Marten van Dijk — is published by MIT OpenCourseWare at <https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/> under CC BY-NC-SA 4.0, which also governs the videos fetched by `scripts/download-6042j.sh`.
