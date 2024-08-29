/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{html,js,hbs}"],
  theme: {
    screens: {
      'sm': '375px',
      'md': '768px',
      'lg': '1440px'
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
      padding: {
        DEFAULT: '1.5rem',
        md: '0',
      },
      screens: {
        sm: '640px',
        md: '1160px',
      }
    },
    fontFamily: {
      sans: ["Rubik", 'sans-serif'],
      serif: ["Rubik", 'serif'],
    },
  },

  plugins: [],
}

