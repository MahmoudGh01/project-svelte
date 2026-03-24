/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Core Harry Potter theme colors
        hp: {
          background: '#0B0B0F',
          primary: '#7F0909',
          secondary: '#2A623D',
          accent: '#ECB939',
          parchment: '#F4E8C1',
          text: '#EAEAEA',
          darkBlue: '#0E1A40',
          bronze: '#946B2D',
          shadow: '#111111',
        },
        // Authentic Hogwarts House Colors
        gryffindor: {
          DEFAULT: '#740001', // Deep scarlet red
          primary: '#740001',
          secondary: '#FFCD14', // Bright gold
          light: '#8B2635', // Lighter red
          dark: '#5C0001', // Darker red
          accent: '#FFCD14', // Gold
        },
        slytherin: {
          DEFAULT: '#0D4F3C', // Deep emerald green
          primary: '#0D4F3C',
          secondary: '#C0C0C0', // Silver
          light: '#1A5D4A', // Lighter green
          dark: '#083A2E', // Darker green
          accent: '#C0C0C0', // Silver
        },
        ravenclaw: {
          DEFAULT: '#0E1A40', // Deep blue
          primary: '#0E1A40',
          secondary: '#946B2D', // Bronze
          light: '#1B2951', // Lighter blue
          dark: '#0A1230', // Darker blue
          accent: '#946B2D', // Bronze
        },
        hufflepuff: {
          DEFAULT: '#FFD800', // Bright canary yellow
          primary: '#FFD800',
          secondary: '#000000', // Black
          light: '#FFE135', // Lighter yellow
          dark: '#E6C200', // Darker yellow
          accent: '#000000', // Black
        },
      },
    },
  },
  plugins: [],
};
