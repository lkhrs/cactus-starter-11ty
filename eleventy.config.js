const Image = require("@11ty/eleventy-img");
 
module.exports = function (eleventyConfig) {
  // // Set Browsersync options
  //   eleventyConfig.setWatchThrottleWaitTime(0); // in milliseconds
  //   // BrowserSync options
  // eleventyConfig.setBrowserSyncConfig({
  //   notify: false,
  //   reloadDelay: 0
  // });
  eleventyConfig.addWatchTarget("./_site/style.css");

  // eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
  eleventyConfig.addPassthroughCopy({ "./site/blog": "./blog"});

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });
    // Filters
    // Add a readable date formatter filter to Nunjucks
    eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js"))

    // Add a HTML timestamp formatter filter to Nunjucks
    eleventyConfig.addFilter("htmlDateDisplay", require("./filters/timestamp.js"))

    // Add a limit function to limit the amount of items output by an array. https://11ty.rocks/eleventyjs/data-arrays/#limit-filter
    eleventyConfig.addFilter("limit", function (arr, limit) {
      return arr.slice(0, limit);
    });
    // Random item filter
    eleventyConfig.addFilter("randomItem", (arr) => {
      arr.sort(() => {
        return 0.5 - Math.random();
      });
      return arr.slice(0, 1);
    });
    // Year filter
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

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

async function imageShortcode(src, alt, sizes = '40vw, 60vw, 100vw') {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }
  // Do NOT use AVIF yet - adds 30s per size to build time 03/2021
  // Should I disable JPEG altogether and just use webp?
  // Support JPEG until 2022, Safari on iOS only recently started supporting it 11/2020
  let metadata = await Image(src, {
    widths: [1000],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/"
  });

  let lowsrc = metadata.jpeg[0];

  return `<picture>
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        src="${lowsrc.url}"
        width = "${lowsrc.width}"
        height = "${lowsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

      eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
      eleventyConfig.addLiquidShortcode("image", imageShortcode);
      eleventyConfig.addJavaScriptFunction("image", imageShortcode);

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

    // Transforms
    
};