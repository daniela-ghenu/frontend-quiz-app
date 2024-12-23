/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{html,js,hbs}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1440px'
    },
    colors: {
      'purple': {
        100: '#F6E7FF',
        500: '#D394FA',
        700: '#A729F5',
      },
      'dark-navy': '#313E51',
      'navy': '#3B4D66',
      'grey-navy': '#626C7F', 
      'light-bluish': '#ABC1E1',
      'light-grey': '#F4F6FA',
      'white': '#FFFFFF',
      'green': '#26D782',
      'red': '#EE5454'   
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '0',
      },
    },
    fontFamily: {
      sans: ["Rubik", 'sans-serif'],
      serif: ["Rubik", 'serif'],
    },

    extend: {
      boxShadow: {
        'card': '0 16px 40px 0 rgba(143, 160, 193, 0.14)',
        'card-dark': '0 16px 40px 0 rgba(49, 62, 81, 0.14)',
        'card-hover': '0 16px 50px 0 rgba(143, 160, 193, 0.3);',
        'card-hover-dark': '0 16px 40px 0 rgba(49, 62, 81, 0.3)',
      },
      backgroundImage: {
        'mobile-dark': "url('/images/pattern-background-mobile-dark.svg')",
        'mobile-light': "url('/images/pattern-background-mobile-light.svg')",
        'tablet-dark': "url('/images/pattern-background-tablet-dark.svg')",
        'tablet-light': "url('/images/pattern-background-tablet-light.svg')",
        'desktop-dark': "url('/images/pattern-background-desktop-dark.svg')",
        'desktop-light': "url('/images/pattern-background-desktop-light.svg')",
      }
    }
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
            maxWidth: '768px',
          },
          '@screen xl': {
            maxWidth: '1160px',
          },
        }
      })
    }
  ],
}

