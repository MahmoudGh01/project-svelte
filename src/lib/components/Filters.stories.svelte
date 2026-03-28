<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Filters from './Filters.svelte';

  const { Story } = defineMeta({
    title: 'Components/Filters',
    component: Filters,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
