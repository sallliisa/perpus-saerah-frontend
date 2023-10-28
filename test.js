/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const env = require('dotenv').config().parsed

const colors = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Flex', 'sans-serif'],
      },
      fontSize: {
        sm: '12px',
        base: '14px',
        lg: '16px',
        xl: '18px',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      },
      colors: {
        c: {
          primary: {
            DEFAULT: '#7b5800',
            container: '#ffdea6',
            fixed: {
              DEFAULT: '#ffdea6',
              dim: '#f6bd48',
            },
          },
          secondary: {
            DEFAULT: '#2f5da8',
            container: '#d7e2ff',
            fixed: {
              DEFAULT: '#d7e2ff',
              dim: '#acc7ff',
            },
          },
          tertiary: {
            DEFAULT: '#7d479a',
            container: '#f6d9ff',
            fixed: {
              DEFAULT: '#f6d9ff',
              dim: '#e7b4ff',
            },
          },
          warning: {
            DEFAULT: '#914d00',
            container: '#ffdcc3',
          },
          info: {
            DEFAULT: '#4251c8',
            container: '#dfe0ff',
          },
          success: {
            DEFAULT: '#006c49',
            container: '#76fbbf',
          },
          error: {
            DEFAULT: '#ba1a1a',
            container: '#ffdad6',
          },
          background: '#fffbff',
          surface: {
            DEFAULT: '#fff8f3',
            variant: '#eee1cf',
            tint: '#7b5800',
            bright: '#fff8f3',
            dim: '#e1d9d0',
            container: {
              lowest: '#ffffff',
              low: '#fbf2e9',
              DEFAULT: '#f5ece4',
              high: '#efe7de',
              highest: '#e9e1d9',
            },
          },
          outline: {
            DEFAULT: '#807667',
            variant: '#d1c5b4',
          },
          inverse: {
            surface: '#34302a',
            on: {
              surface: '#f8efe7',
            },
            primary: '#f6bd48',
          },
          on: {
            primary: {
              DEFAULT: '#ffffff',
              container: '#271900',
              fixed: {
                DEFAULT: '#271900',
                variant: '#5d4200',
              },
            },
            secondary: {
              DEFAULT: '#ffffff',
              container: '#001a40',
              fixed: {
                DEFAULT: '#001a40',
                variant: '#0a458f',
              },
            },
            tertiary: {
              DEFAULT: '#ffffff',
              container: '#300049',
              fixed: {
                DEFAULT: '#300049',
                variant: '#632e80',
              },
            },
            warning: {
              DEFAULT: '#ffffff',
              container: '#2f1500',
            },
            info: {
              DEFAULT: '#ffffff',
              container: '#05006c',
            },
            success: {
              DEFAULT: '#ffffff',
              container: '#002113',
            },
            error: {
              DEFAULT: '#ffffff',
              container: '#410002',
            },
            background: '#1e1b16',
            surface: {
              DEFAULT: '#1e1b16',
              variant: '#4e4639',
            },
          },
        },
        cd: {
          primary: {
            DEFAULT: '#f6bd48',
            container: '#5d4200',
            fixed: {
              DEFAULT: '#ffdea6',
              dim: '#f6bd48',
            },
          },
          secondary: {
            DEFAULT: '#acc7ff',
            container: '#0a458f',
            fixed: {
              DEFAULT: '#d7e2ff',
              dim: '#acc7ff',
            },
          },
          tertiary: {
            DEFAULT: '#e7b4ff',
            container: '#632e80',
            fixed: {
              DEFAULT: '#f6d9ff',
              dim: '#e7b4ff',
            },
          },
          warning: {
            DEFAULT: '#ffb77d',
            container: '#6e3900',
          },
          info: {
            DEFAULT: '#bcc2ff',
            container: '#2736b0',
          },
          success: {
            DEFAULT: '#57dea4',
            container: '#005236',
          },
          error: {
            DEFAULT: '#ffb4ab',
            container: '#93000a',
          },
          background: '#1e1b16',
          surface: {
            DEFAULT: '#16130e',
            variant: '#4e4639',
            tint: '#f6bd48',
            bright: '#3B383E',
            dim: '#141218',
            container: {
              lowest: '#110e09',
              low: '#1e1b16',
              DEFAULT: '#231f1a',
              high: '#2d2924',
              highest: '#38342e',
            },
          },
          outline: {
            DEFAULT: '#9a8f80',
            variant: '#4e4639',
          },
          inverse: {
            surface: '#e9e1d9',
            on: {
              surface: '#1e1b16',
            },
            primary: '#7b5800',
          },
          on: {
            primary: {
              DEFAULT: '#412d00',
              container: '#ffdea6',
              fixed: {
                DEFAULT: '#271900',
                variant: '#5d4200',
              },
            },
            secondary: {
              DEFAULT: '#002f68',
              container: '#d7e2ff',
              fixed: {
                DEFAULT: '#001a40',
                variant: '#0a458f',
              },
            },
            tertiary: {
              DEFAULT: '#4b1468',
              container: '#f6d9ff',
              fixed: {
                DEFAULT: '#300049',
                variant: '#632e80',
              },
            },
            warning: {
              DEFAULT: '#4d2600',
              container: '#ffdcc3',
            },
            info: {
              DEFAULT: '#02179b',
              container: '#dfe0ff',
            },
            success: {
              DEFAULT: '#003824',
              container: '#76fbbf',
            },
            error: {
              DEFAULT: '#ffffff',
              container: '#ffdad6',
            },
            background: '#e9e1d9',
            surface: {
              DEFAULT: '#cdc5bd',
              variant: '#d1c5b4',
            },
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: '14px' },
      })
    }),
  ],
}

const fs = require('fs')
// read tokens.css as text
const tokens = fs.readFileSync('./tokens.css', 'utf8')
console.log(tokens.match(/:\s*(#\w+)/gm))
