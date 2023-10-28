/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const env = require('dotenv').config().parsed

module.exports = {
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
        "c": {
          "primary": {
            "DEFAULT": "#DF2121",
            "container": "#ffdad5",
            "fixed": {
              "DEFAULT": "#ffdad5",
              "dim": "#ffb4ab"
            }
          },
          "secondary": {
            "DEFAULT": "#775652",
            "container": "#ffdad5",
            "fixed": {
              "DEFAULT": "#ffdad5",
              "dim": "#e7bdb7"
            }
          },
          "tertiary": {
            "DEFAULT": "#715b2e",
            "container": "#fddfa6",
            "fixed": {
              "DEFAULT": "#fddfa6",
              "dim": "#e0c38c"
            }
          },
          "warning": {
            "DEFAULT": "#7e5700",
            "container": "#ffdeac"
          },
          "info": {
            "DEFAULT": "#005db5",
            "container": "#d6e3ff"
          },
          "success": {
            "DEFAULT": "#006c47",
            "container": "#8bf8c1"
          },
          "error": {
            "DEFAULT": "#ba1a1a",
            "container": "#ffdad6"
          },
          "background": "#fffbff",
          "surface": {
            "DEFAULT": "#fff8f7",
            "variant": "#f5ddda",
            "tint": "#c00010",
            "bright": "#fff8f7",
            "dim": "#e4d7d5",
            "container": {
              "lowest": "#ffffff",
              "low": "#fef1ef",
              "DEFAULT": "#f8ebe9",
              "high": "#f2e5e3",
              "highest": "#ede0de"
            }
          },
          "outline": {
            "DEFAULT": "#857371",
            "variant": "#d8c2bf"
          },
          "inverse": {
            "surface": "#362f2e",
            "on": {
              "surface": "#fbeeec"
            },
            "primary": "#ffb4ab"
          },
          "on": {
            "primary": {
              "DEFAULT": "#ffffff",
              "container": "#410002",
              "fixed": {
                "DEFAULT": "#410002",
                "variant": "#930009"
              }
            },
            "secondary": {
              "DEFAULT": "#ffffff",
              "container": "#2c1512",
              "fixed": {
                "DEFAULT": "#2c1512",
                "variant": "#5d3f3c"
              }
            },
            "tertiary": {
              "DEFAULT": "#ffffff",
              "container": "#261a00",
              "fixed": {
                "DEFAULT": "#261a00",
                "variant": "#574419"
              }
            },
            "warning": {
              "DEFAULT": "#ffffff",
              "container": "#281900"
            },
            "info": {
              "DEFAULT": "#ffffff",
              "container": "#001b3d"
            },
            "success": {
              "DEFAULT": "#ffffff",
              "container": "#002113"
            },
            "error": {
              "DEFAULT": "#ffffff",
              "container": "#410002"
            },
            "background": "#201a19",
            "surface": {
              "DEFAULT": "#201a19",
              "variant": "#534341"
            }
          }
        },
        "cd": {
          "primary": {
            "DEFAULT": "#ffb4ab",
            "container": "#930009",
            "fixed": {
              "DEFAULT": "#ffdad5",
              "dim": "#ffb4ab"
            }
          },
          "secondary": {
            "DEFAULT": "#e7bdb7",
            "container": "#5d3f3c",
            "fixed": {
              "DEFAULT": "#ffdad5",
              "dim": "#e7bdb7"
            }
          },
          "tertiary": {
            "DEFAULT": "#e0c38c",
            "container": "#574419",
            "fixed": {
              "DEFAULT": "#fddfa6",
              "dim": "#e0c38c"
            }
          },
          "warning": {
            "DEFAULT": "#febb3b",
            "container": "#5f4100"
          },
          "info": {
            "DEFAULT": "#a8c8ff",
            "container": "#00468b"
          },
          "success": {
            "DEFAULT": "#6fdba6",
            "container": "#005235"
          },
          "error": {
            "DEFAULT": "#ffb4ab",
            "container": "#93000a"
          },
          "background": "#201a19",
          "surface": {
            "DEFAULT": "#181211",
            "variant": "#534341",
            "tint": "#ffb4ab",
            "bright": "#3f3736",
            "dim": "#181211",
            "container": {
              "lowest": "#120d0c",
              "low": "#201a19",
              "DEFAULT": "#251e1d",
              "high": "#2f2827",
              "highest": "#3b3332"
            }
          },
          "outline": {
            "DEFAULT": "#a08c8a",
            "variant": "#534341"
          },
          "inverse": {
            "surface": "#ede0de",
            "on": {
              "surface": "#201a19"
            },
            "primary": "#c00010"
          },
          "on": {
            "primary": {
              "DEFAULT": "#690004",
              "container": "#ffdad5",
              "fixed": {
                "DEFAULT": "#410002",
                "variant": "#930009"
              }
            },
            "secondary": {
              "DEFAULT": "#442926",
              "container": "#ffdad5",
              "fixed": {
                "DEFAULT": "#2c1512",
                "variant": "#5d3f3c"
              }
            },
            "tertiary": {
              "DEFAULT": "#3f2e04",
              "container": "#fddfa6",
              "fixed": {
                "DEFAULT": "#261a00",
                "variant": "#574419"
              }
            },
            "warning": {
              "DEFAULT": "#422c00",
              "container": "#ffdeac"
            },
            "info": {
              "DEFAULT": "#003062",
              "container": "#d6e3ff"
            },
            "success": {
              "DEFAULT": "#003823",
              "container": "#8bf8c1"
            },
            "error": {
              "DEFAULT": "#690005",
              "container": "#ffdad6"
            },
            "background": "#ede0de",
            "surface": {
              "DEFAULT": "#d0c4c2",
              "variant": "#d8c2bf"
            }
          }
        }
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