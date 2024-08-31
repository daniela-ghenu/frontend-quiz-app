/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{html,js,hbs}"],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1440px'
    },
    colors: {
      "purple": "#A729F5",
      "dark-navy": "#313E51",
      "navy": "#3B4D66",
      "grey-navy": "#626C7F",
      "light-bluish": "#ABC1E1",
      "light-grey": "#F4F6FA",
      "white": "#FFFFFF",
      "green": "#26D782",
      "red": "#EE5454"
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
    fontFamily: {
      sans: ["Rubik", 'sans-serif'],
      serif: ["Rubik", 'serif'],
    },
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '640px',
          },
          '@screen lg': {
            maxWidth: '860px',
          },
          '@screen xl': {
            maxWidth: '1160px',
          },
        }
      })
    }
  ],
}

