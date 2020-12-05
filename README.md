# A boilerplate template built with Eleventy and TailwindCSS

Based on Skeleventy, I wanted a simple boilerplate that included the latest version of Tailwind and was easy to update.

## Todo

- ~~Mobile nav~~
- Desktop nav with dropdowns
- Build a blog view
- ~~Contact form~~
- ~~Add [eleventy-img](https://github.com/11ty/eleventy-img)~~

## Features 

- A vanilla TailwindCSS setup with PostCSS and purge
- Logo configurable in eleventy.config.js, will show text if logo.svg is removed from config
- Site title configurable in eleventy.config.js
- Nav configurable in site/globals/navigation.json
- Use of @apply in styles/tailwind.css for sane defaults.
- Alpine.js
- Optimized lazy-loaded images webp first with a jpeg fallback (throw in a 10mb file and don't worry about it!)
- And *~ Responsive Images ~* in 3 sizes. Huge difference in file sizes on mobile compared to desktop.

## Building and Running 

**Live dev environment:**
1. Run `npm run production`
2. Run `npm run dev`

**Production:**
1. Run `npm run production` 