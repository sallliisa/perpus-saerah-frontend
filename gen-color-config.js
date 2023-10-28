/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const fs = require('fs')

const dir = './tokens.css'

const data = fs.readFileSync(dir, 'utf8')

const twConfig = {
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
            DEFAULT: data.match(/--md-sys-color-primary-light: (#.*);/m)[1],
            container: data.match(/--md-sys-color-primary-container-light: (#.*);/m)[1],
            fixed: {
              DEFAULT: data.match(/--md-sys-color-primary-fixed-light: (#.*);/m)[1],
              dim: data.match(/--md-sys-color-primary-fixed-dim-light: (#.*);/m)[1],
            },
          },
          secondary: {
            DEFAULT: data.match(/--md-sys-color-secondary-light: (#.*);/m)[1],
            container: data.match(/--md-sys-color-secondary-container-light: (#.*);/m)[1],
            fixed: {
              DEFAULT: data.match(/--md-sys-color-secondary-fixed-light: (#.*);/m)[1],
              dim: data.match(/--md-sys-color-secondary-fixed-dim-light: (#.*);/m)[1],
            },
          },
          tertiary: {
            DEFAULT: data.match(/--md-sys-color-tertiary-light: (#.*);/m)[1],
            container: data.match(/--md-sys-color-tertiary-container-light: (#.*);/m)[1],
            fixed: {
              DEFAULT: data.match(/--md-sys-color-tertiary-fixed-light: (#.*);/m)[1],
              dim: data.match(/--md-sys-color-tertiary-fixed-dim-light: (#.*);/m)[1],
            },
          },
          warning: {
            DEFAULT: data.match(/--md-sys-color-warning-light: (#.*);/m)[1],
            container: data.match(/--md-sys-color-warning-container-light: (#.*);/m)[1],
          },
          info: {
            DEFAULT: data.match(/--md-sys-color-info-light: (#.*);/m)[1],
            container: data.match(/--md-sys-color-info-container-light: (#.*);/m)[1],
          },
          success: {
            DEFAULT: data.match(/--md-sys-color-success-light: (#.*);/m)[1],
            container: data.match(/--md-sys-color-success-container-light: (#.*);/m)[1],
          },
          error: {
            DEFAULT: data.match(/--md-sys-color-error-light: (#.*);/m)[1],
            container: data.match(/--md-sys-color-error-container-light: (#.*);/m)[1],
          },
          background: data.match(/--md-sys-color-background-light: (#.*);/m)[1],
          surface: {
            DEFAULT: data.match(/--md-sys-color-surface-light: (#.*);/m)[1],
            variant: data.match(/--md-sys-color-surface-variant-light: (#.*);/m)[1],
            tint: data.match(/--md-sys-color-surface-tint-light: (#.*);/m)[1],
            bright: data.match(/--md-sys-color-surface-bright-light: (#.*);/m)[1],
            dim: data.match(/--md-sys-color-surface-dim-light: (#.*);/m)[1],
            container: {
              lowest: data.match(/--md-sys-color-surface-container-lowest-light: (#.*);/m)[1],
              low: data.match(/--md-sys-color-surface-container-low-light: (#.*);/m)[1],
              DEFAULT: data.match(/--md-sys-color-surface-container-light: (#.*);/m)[1],
              high: data.match(/--md-sys-color-surface-container-high-light: (#.*);/m)[1],
              highest: data.match(/--md-sys-color-surface-container-highest-light: (#.*);/m)[1],
            },
          },
          outline: {
            DEFAULT: data.match(/--md-sys-color-outline-light: (#.*);/m)[1],
            variant: data.match(/--md-sys-color-outline-variant-light: (#.*);/m)[1],
          },
          inverse: {
            surface: data.match(/--md-sys-color-inverse-surface-light: (#.*);/m)[1],
            on: {
              surface: data.match(/--md-sys-color-inverse-on-surface-light: (#.*);/m)[1],
            },
            primary: data.match(/--md-sys-color-inverse-primary-light: (#.*);/m)[1],
          },
          on: {
            primary: {
              DEFAULT: data.match(/--md-sys-color-on-primary-light: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-primary-container-light: (#.*);/m)[1],
              fixed: {
                DEFAULT: data.match(/--md-sys-color-on-primary-fixed-light: (#.*);/m)[1],
                variant: data.match(/--md-sys-color-on-primary-fixed-variant-light: (#.*);/m)[1],
              },
            },
            secondary: {
              DEFAULT: data.match(/--md-sys-color-on-secondary-light: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-secondary-container-light: (#.*);/m)[1],
              fixed: {
                DEFAULT: data.match(/--md-sys-color-on-secondary-fixed-light: (#.*);/m)[1],
                variant: data.match(/--md-sys-color-on-secondary-fixed-variant-light: (#.*);/m)[1],
              },
            },
            tertiary: {
              DEFAULT: data.match(/--md-sys-color-on-tertiary-light: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-tertiary-container-light: (#.*);/m)[1],
              fixed: {
                DEFAULT: data.match(/--md-sys-color-on-tertiary-fixed-light: (#.*);/m)[1],
                variant: data.match(/--md-sys-color-on-tertiary-fixed-variant-light: (#.*);/m)[1],
              },
            },
            warning: {
              DEFAULT: data.match(/--md-sys-color-on-warning-light: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-warning-container-light: (#.*);/m)[1],
            },
            info: {
              DEFAULT: data.match(/--md-sys-color-on-info-light: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-info-container-light: (#.*);/m)[1],
            },
            success: {
              DEFAULT: data.match(/--md-sys-color-on-success-light: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-success-container-light: (#.*);/m)[1],
            },
            error: {
              DEFAULT: data.match(/--md-sys-color-on-error-light: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-error-container-light: (#.*);/m)[1],
            },
            background: data.match(/--md-sys-color-on-background-light: (#.*);/m)[1],
            surface: {
              DEFAULT: data.match(/--md-sys-color-on-surface-light: (#.*);/m)[1],
              variant: data.match(/--md-sys-color-on-surface-variant-light: (#.*);/m)[1],
            },
          },
        },
        cd: {
          primary: {
            DEFAULT: data.match(/--md-sys-color-primary-dark: (#.*);/m)[1],
            container: data.match(/--md-sys-color-primary-container-dark: (#.*);/m)[1],
            fixed: {
              DEFAULT: data.match(/--md-sys-color-primary-fixed-dark: (#.*);/m)[1],
              dim: data.match(/--md-sys-color-primary-fixed-dim-dark: (#.*);/m)[1],
            },
          },
          secondary: {
            DEFAULT: data.match(/--md-sys-color-secondary-dark: (#.*);/m)[1],
            container: data.match(/--md-sys-color-secondary-container-dark: (#.*);/m)[1],
            fixed: {
              DEFAULT: data.match(/--md-sys-color-secondary-fixed-dark: (#.*);/m)[1],
              dim: data.match(/--md-sys-color-secondary-fixed-dim-dark: (#.*);/m)[1],
            },
          },
          tertiary: {
            DEFAULT: data.match(/--md-sys-color-tertiary-dark: (#.*);/m)[1],
            container: data.match(/--md-sys-color-tertiary-container-dark: (#.*);/m)[1],
            fixed: {
              DEFAULT: data.match(/--md-sys-color-tertiary-fixed-dark: (#.*);/m)[1],
              dim: data.match(/--md-sys-color-tertiary-fixed-dim-dark: (#.*);/m)[1],
            },
          },
          warning: {
            DEFAULT: data.match(/--md-sys-color-warning-dark: (#.*);/m)[1],
            container: data.match(/--md-sys-color-warning-container-dark: (#.*);/m)[1],
          },
          info: {
            DEFAULT: data.match(/--md-sys-color-info-dark: (#.*);/m)[1],
            container: data.match(/--md-sys-color-info-container-dark: (#.*);/m)[1],
          },
          success: {
            DEFAULT: data.match(/--md-sys-color-success-dark: (#.*);/m)[1],
            container: data.match(/--md-sys-color-success-container-dark: (#.*);/m)[1],
          },
          error: {
            DEFAULT: data.match(/--md-sys-color-error-dark: (#.*);/m)[1],
            container: data.match(/--md-sys-color-error-container-dark: (#.*);/m)[1],
          },
          background: data.match(/--md-sys-color-background-dark: (#.*);/m)[1],
          surface: {
            DEFAULT: data.match(/--md-sys-color-surface-dark: (#.*);/m)[1],
            variant: data.match(/--md-sys-color-surface-variant-dark: (#.*);/m)[1],
            tint: data.match(/--md-sys-color-surface-tint-dark: (#.*);/m)[1],
            bright: data.match(/--md-sys-color-surface-bright-dark: (#.*);/m)[1],
            dim: data.match(/--md-sys-color-surface-dim-dark: (#.*);/m)[1],
            container: {
              lowest: data.match(/--md-sys-color-surface-container-lowest-dark: (#.*);/m)[1],
              low: data.match(/--md-sys-color-surface-container-low-dark: (#.*);/m)[1],
              DEFAULT: data.match(/--md-sys-color-surface-container-dark: (#.*);/m)[1],
              high: data.match(/--md-sys-color-surface-container-high-dark: (#.*);/m)[1],
              highest: data.match(/--md-sys-color-surface-container-highest-dark: (#.*);/m)[1],
            },
          },
          outline: {
            DEFAULT: data.match(/--md-sys-color-outline-dark: (#.*);/m)[1],
            variant: data.match(/--md-sys-color-outline-variant-dark: (#.*);/m)[1],
          },
          inverse: {
            surface: data.match(/--md-sys-color-inverse-surface-dark: (#.*);/m)[1],
            on: {
              surface: data.match(/--md-sys-color-inverse-on-surface-dark: (#.*);/m)[1],
            },
            primary: data.match(/--md-sys-color-inverse-primary-dark: (#.*);/m)[1],
          },
          on: {
            primary: {
              DEFAULT: data.match(/--md-sys-color-on-primary-dark: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-primary-container-dark: (#.*);/m)[1],
              fixed: {
                DEFAULT: data.match(/--md-sys-color-on-primary-fixed-dark: (#.*);/m)[1],
                variant: data.match(/--md-sys-color-on-primary-fixed-variant-dark: (#.*);/m)[1],
              },
            },
            secondary: {
              DEFAULT: data.match(/--md-sys-color-on-secondary-dark: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-secondary-container-dark: (#.*);/m)[1],
              fixed: {
                DEFAULT: data.match(/--md-sys-color-on-secondary-fixed-dark: (#.*);/m)[1],
                variant: data.match(/--md-sys-color-on-secondary-fixed-variant-dark: (#.*);/m)[1],
              },
            },
            tertiary: {
              DEFAULT: data.match(/--md-sys-color-on-tertiary-dark: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-tertiary-container-dark: (#.*);/m)[1],
              fixed: {
                DEFAULT: data.match(/--md-sys-color-on-tertiary-fixed-dark: (#.*);/m)[1],
                variant: data.match(/--md-sys-color-on-tertiary-fixed-variant-dark: (#.*);/m)[1],
              },
            },
            warning: {
              DEFAULT: data.match(/--md-sys-color-on-warning-dark: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-warning-container-dark: (#.*);/m)[1],
            },
            info: {
              DEFAULT: data.match(/--md-sys-color-on-info-dark: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-info-container-dark: (#.*);/m)[1],
            },
            success: {
              DEFAULT: data.match(/--md-sys-color-on-success-dark: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-success-container-dark: (#.*);/m)[1],
            },
            error: {
              DEFAULT: data.match(/--md-sys-color-on-error-dark: (#.*);/m)[1],
              container: data.match(/--md-sys-color-on-error-container-dark: (#.*);/m)[1],
            },
            background: data.match(/--md-sys-color-on-background-dark: (#.*);/m)[1],
            surface: {
              DEFAULT: data.match(/--md-sys-color-on-surface-dark: (#.*);/m)[1],
              variant: data.match(/--md-sys-color-on-surface-variant-dark: (#.*);/m)[1],
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
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'grid-dynamic': (value) => {
            return {
              gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
            }
          },
        },
        { values: theme('spacing') }
      )
    }),
  ],
}

// write result to generated.tailwind.config.js
const path = require('path')
fs.writeFileSync(path.resolve(__dirname, 'generated.tailwind.config.js'), `module.exports = ${JSON.stringify(twConfig.theme.extend.colors, null, 2)}`)
