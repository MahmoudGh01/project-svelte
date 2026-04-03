<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SearchBar from './SearchBar.svelte';

  const { Story } = defineMeta({
    title: 'Components/SearchBar',
    component: SearchBar,
    tags: ['autodocs'],
  });
</script>

<Story
  name="Default"
  args={{
    searchQuery: '',
    onSearchChange: (query: string) => console.log('Search query:', query),
  }}
/>

<Story
  name="WithSearchQuery"
  args={{
    searchQuery: 'Harry Potter',
    onSearchChange: (query: string) => console.log('Search query:', query),
  }}
/>

<Story
  name="LongSearchQuery"
  args={{
    searchQuery:
      'Searching for a very long character name like Albus Dumbledore',
    onSearchChange: (query: string) => console.log('Search query:', query),
  }}
/>
