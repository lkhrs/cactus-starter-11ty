const Image = require("@11ty/eleventy-img");
 
module.exports = function (eleventyConfig) {
  // Set Browsersync options
    eleventyConfig.setWatchThrottleWaitTime(1000); // in milliseconds
    // BrowserSync options
  eleventyConfig.setBrowserSyncConfig({
    notify: false,
    reloadDelay: 2000
  });
  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });
    // General
    // Add a readable date formatter filter to Nunjucks
    eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js"))

    // Add a HTML timestamp formatter filter to Nunjucks
    eleventyConfig.addFilter("htmlDateDisplay", require("./filters/timestamp.js"))

        // Collections
        eleventyConfig.addCollection('blog', collection => {

            const blogs = collection.getFilteredByTag('blog')
    
            for( let i = 0; i < blogs.length; i++ ) {
    
                const prevPost = blogs[i - 1]
                const nextPost = blogs[i + 1]
    
                blogs[i].data["prevPost"] = prevPost
                blogs[i].data["nextPost"] = nextPost
    
            }
    
            return blogs.reverse()
    
        })

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

    // Include our static assets
    eleventyConfig.addPassthroughCopy("js")
    eleventyConfig.addPassthroughCopy("robots.txt")
    // Pass through our SVGs
    eleventyConfig.addPassthroughCopy("images/svg")
    // Pass through our icons
    eleventyConfig.addPassthroughCopy("images/icons")
    eleventyConfig.addPassthroughCopy({
        "./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js",
      });
    // Plugins

    // Eleventy-img config
    eleventyConfig.addNunjucksAsyncShortcode("Image", async function(src, alt) {
        if(alt === undefined) {
          // You bet we throw an error on missing alt (alt="" works okay)
          throw new Error(`Missing \`alt\` on Image from: ${src}`);
        }
    
        let stats = await Image(src, {
          // Let's cap the image width. The lower number is the minimum image size which shows on mobile, and the higher number is the highest size. Use the highest size to cap how big the image is (sometimes I throw in 10MB images from unsplash and don't think about it)
          widths: [320, 1024, 1500],
          formats: ['webp', 'jpeg'],
          urlPath: "/images/",
        outputDir: "./_site/images/",
        });
        let lowestSrc = stats["jpeg"][2];
        let sizes = "(min-width: 320px) 33.3vw, (min-width: 1024px) 66.6vw, 100vw";
    
        // Iterate over formats and widths
        return `<picture>
          ${Object.values(stats).map(imageFormat => {
            return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}">`;
          }).join("\n")}
            <img
              src="${lowestSrc.url}"
              width="${lowestSrc.width}"
              height="${lowestSrc.height}"
              alt="${alt}"
              sizes="${sizes}"
              loading="lazy">
          </picture>`;
        });

    // Template formats
    return {
        templateFormats: ["md", "njk"],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: 'site',
            output: '_site',
            includes: 'includes',
            data: 'globals'
        }
    }
};
