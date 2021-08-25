const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
  prefix: '',
  purge: {
    enabled: true,
    content: ['./src/**/*.{vue,js,ts,jsx,tsx,html}']
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      textColor: {
        marketing: "var(--color-text-marketing)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        tertiary: "var(--color-text-tertiary)",
        focus: "var(--color-text-focus)",
        inverse: "var(--color-text-inverse)",
        darker: "var(--color-bg-darker)",
        lighter: "var(--color-bg-lighter)",
        "theme-50": "var(--color-text-theme-50)",
        "theme-100": "var(--color-text-theme-100)",
        "theme-200": "var(--color-text-theme-200)",
        "theme-300": "var(--color-text-theme-300)",
        "theme-400": "var(--color-text-theme-400)",
        "theme-500": "var(--color-text-theme-500)",
        "theme-600": "var(--color-text-theme-600)",
        "theme-700": "var(--color-text-theme-700)",
        "theme-800": "var(--color-text-theme-800)",
        "theme-900": "var(--color-text-theme-900)",
      },
      backgroundColor: {
        marketing: "var(--color-bg-marketing)",
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
        focus: "var(--color-bg-focus)",
        inverse: "var(--color-bg-inverse)",
        darker: "var(--color-bg-darker)",
        lighter: "var(--color-bg-lighter)",
        "theme-50": "var(--color-bg-theme-50)",
        "theme-100": "var(--color-bg-theme-100)",
        "theme-200": "var(--color-bg-theme-200)",
        "theme-300": "var(--color-bg-theme-300)",
        "theme-400": "var(--color-bg-theme-400)",
        "theme-500": "var(--color-bg-theme-500)",
        "theme-600": "var(--color-bg-theme-600)",
        "theme-700": "var(--color-bg-theme-700)",
        "theme-800": "var(--color-bg-theme-800)",
        "theme-900": "var(--color-bg-theme-900)",
      },
      borderColor: {
        marketing: "var(--color-bg-marketing)",
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
        focus: "var(--color-bg-focus)",
        inverse: "var(--color-bg-inverse)",
        darker: "var(--color-bg-darker)",
        lighter: "var(--color-bg-lighter)",
        "theme-50": "var(--color-bg-theme-50)",
        "theme-100": "var(--color-bg-theme-100)",
        "theme-200": "var(--color-bg-theme-200)",
        "theme-300": "var(--color-bg-theme-300)",
        "theme-400": "var(--color-bg-theme-400)",
        "theme-500": "var(--color-bg-theme-500)",
        "theme-600": "var(--color-bg-theme-600)",
        "theme-700": "var(--color-bg-theme-700)",
        "theme-800": "var(--color-bg-theme-800)",
        "theme-900": "var(--color-bg-theme-900)",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
        },
      },
      spacing: {
        '7': '1.75rem',
        '9': '2.25rem',
        '28': '7rem',
        '80': '20rem',
        '96': '24rem',
      },
      height: {
        '1/2': '50%',
      },
      scale: {
        '30': '.3',
      },
      boxShadow: {
        outline: '0 0 0 3px rgba(88,11,28, 0.4)',
      },
      colors: {
        indigo: colors.indigo,
        blue: colors.blue,
        red: colors.red,
        orange: colors.orange,
        yellow: colors.yellow,
        green: colors.green,
        teal: colors.teal,
        purple: colors.purple,
        pink: colors.pink,
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        amber: colors.amber,
        lime: colors.lime,
        emerald: colors.emerald,
        cyan: colors.cyan,
        sky: colors.sky,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        rose: colors.rose
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      borderColor: ["dark"]
    },
    scale: ['responsive', 'hover', 'focus', 'group-hover', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'active'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover', 'active'],
  },
   plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
    ]
};