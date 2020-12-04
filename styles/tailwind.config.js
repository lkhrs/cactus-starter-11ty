module.exports = {
  purge: {
    content: ["_site/**/*.html"],
    options: {
      whitelist: [],
    },
  },
    theme: {
        
      extend: {
        colors: {
          change: "transparent"
        },
          animation: {
            fadeInDown: "fadeInDown 1s ease-in-out forwards"
          },
          keyframes: {
            fadeInDown: {
              "0%": { opacity: 0, transform: 'translateY(-50%)'},
              "100%": { opacity: 1, transform: 'translateY(0)'}
            }
          },
      }
    },
    variants: {},
    plugins: [],
    darkMode: 'media',
  }