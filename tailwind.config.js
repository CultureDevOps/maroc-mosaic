// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const customColors = {
  beige: {
    100: '#faf7f0',
    200: '#f3e8d4',
    300: '#e8d7b5',
    400: '#e0c6a4',
    500: '#d8b98f',
    600: '#c8a87d',
    700: '#b78e69',
    800: '#a67553',
    900: '#9c6243',
  },
  marron: {
    100: '#e7dfdc',
    200: '#cfc1b9',
    300: '#b7a299', 
    400: '#9f8476',
    500: '#876755', 
    600: '#6f4f40',
    700: '#573c30',
    800: '#281b16', 
    900: '#150d0b',
  },
  gris: {
    100: '#f8fafc',
    200: '#edeff3',
    300: '#e2e5eb',
    400: '#d7dbe2',
    500: '#d1d5db',
    600: '#bcc0c7',
    700: '#a8acb4',
    800: '#9397a1',
    900: '#7f838e',
  },
  terracotta: {
    100: '#f9d0c4',
    200: '#f5b1a1',
    300: '#f0977f',
    400: '#e77f5d',
    500: '#e1643a',
    600: '#d24a2d',
    700: '#c0331e',
    800: '#a92a16',
    900: '#8f1f10',
  },
  olive: {
    100: '#d1d78b',
    200: '#a4b25d',
    300: '#7f9f30',
    400: '#5d7f1d',
    500: '#4b6d16',
    600: '#3b5c11',
    700: '#2e4c0f',
    800: '#233c0c',
    900: '#1a2c08',
  },     
}

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'image': "url('/static/images/assets/background-marbre-04.svg')",
      },      
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', ...fontFamily.sans],
        headings: ['var(--font-scheherazade-new)'],
        logo: ['var(--font-amiri-quran)'],   
      },
      colors: {
        ...customColors,
        primary: customColors.marron,
        secondary: customColors.terracotta,
        gray: colors.stone,   
        background: customColors.beige[100],     
        heading: customColors.marron[700],
        text: customColors.gris[900],
        link: customColors.terracotta[400],
        'button-primary': customColors.marron,
        'button-secondary': customColors.olive[300],
        accent: customColors.olive[400],
        border: customColors.gris[400],
        notification: customColors.terracotta[600],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.secondary.700'),
              '&:hover': {
                color: `${theme('colors.secondary.600')}`,
              },
              code: { color: theme('colors.secondary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            'h1,h2,h3,h4,h5,h6': {
              fontFamily: theme('fontFamily.headings'), 
              textShadow: '2px 2px 4px rgba(156, 163, 175, 0.8)',
              color: theme('colors.primary.700'),
            },
            strong: {
              textShadow: '1px 1px 1px rgba(156, 163, 175, 0.8)',
            },
            code: {
              color: theme('colors.indigo.600'),
            },
            hr: {
              borderColor: theme('colors.gray.200'), // Séparateur en mode clair
              borderTopWidth: '2px',
            },
            'ul li::marker': {
              color: theme('colors.black'), // Couleur des bullet points
            },         
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.secondary.300'),
              '&:hover': {
                color: `${theme('colors.secondary.400')}`,
              },
              code: { color: theme('colors.secondary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.primary.100'),
              fontFamily: theme('fontFamily.headings'), 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
            },
            strong: {
              textShadow: '1px 1px 1px rgba(0, 0, 0, 1)',
            },
            hr: {
              borderColor: theme('colors.gray.700'), // Séparateur en mode sombre
              borderTopWidth: '1px',
            },
            'ul li::marker': {
              color: theme('colors.gray.100'), // Couleur des bullet points
            },     
            code: {
              color: theme('colors.violet.400'),
            },     
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('@tailwindcss/typography'),
    require("@designbycode/tailwindcss-text-shadow")({
      shadowColor: "rgba(0, 0, 0, 0.8)",
      shadowBlur: "3px",
      shadowOffsetX: "2px",
      shadowOffsetY: "2px",
     }),
  ],
}
