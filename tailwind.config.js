import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
// import flowbitePlugin from 'flowbite';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    formsPlugin,
    typographyPlugin,
    // flowbitePlugin
  ],
  theme: {
    extend: {
      colors: {
        'persian-blue': '#287b82', // Customize this value based on your exact preference
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
};
