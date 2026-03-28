import type { Preview } from '@storybook/svelte-vite';
import '../src/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0b0b0f',
        },
        {
          name: 'light',
          value: '#f4e8c1',
        },
      ],
    },
  },
};

export default preview;
