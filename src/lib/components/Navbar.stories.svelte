<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Navbar from './Navbar.svelte';

  const { Story } = defineMeta({
    title: 'Components/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<Story name="Default" />
