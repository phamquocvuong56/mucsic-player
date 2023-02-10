/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    screens: {
      tablet: { max: '1169px' },
      // lg: { max: "1023px" },
      mobile: { max: '767px' },
    },
    extend: {
      dropShadow: {
        menuBar: '0 15px 25px rgba(0, 0, 0, 0.1)',
      },
      width: {
        '70px': '4.375rem',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
      },
      inset: {
        0.75: '0.75rem',
      },
    },
    height: {
      '370px': '23.125rem',
      '70px': '4.375rem',
      full: '100%',
      40: '10rem',
      10: '3.5rem',
    },
    borderRadius: {
      '36px': '2.25rem',
      sm: '0.125rem',
      md: '0.375rem',
      '3xl': '1.5rem',
    },
    inset: {
      '110px': '6.875rem',
      '1/2': '50%',
      0: '0',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px',
      '1/2': '50%',
    },
  },
  plugins: [],
};
