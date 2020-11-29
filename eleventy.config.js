const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");
 
module.exports = function (eleventyConfig) {
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
    eleventyConfig.addPassthroughCopy("images")
    eleventyConfig.addPassthroughCopy("robots.txt")
    eleventyConfig.addPassthroughCopy({
        "./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js",
      });
    // Plugins
    eleventyConfig.addPlugin(lazyImagesPlugin);
    eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: "styles/tailwind.css",
    dest: "css",
    keepFolderStructure: false,
    minify: true,
    autoprefixer: true,
    });
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