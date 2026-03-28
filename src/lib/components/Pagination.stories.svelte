<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Pagination from './Pagination.svelte';

  const { Story } = defineMeta({
    title: 'Components/Pagination',
    component: Pagination,
    tags: ['autodocs'],
  });
</script>

<Story
  name="FirstPage"
  args={{ currentPage: 1, totalItems: 200, itemsPerPage: 12 }}
/>

<Story
  name="MiddlePage"
  args={{ currentPage: 5, totalItems: 200, itemsPerPage: 12 }}
/>

<Story
  name="LastPage"
  args={{ currentPage: 17, totalItems: 200, itemsPerPage: 12 }}
/>

<Story
  name="FewItems"
  args={{ currentPage: 1, totalItems: 30, itemsPerPage: 12 }}
/>

<Story
  name="ManyPages"
  args={{ currentPage: 10, totalItems: 500, itemsPerPage: 12 }}
/>

<Story
  name="LargePageSize"
  args={{ currentPage: 1, totalItems: 200, itemsPerPage: 50 }}
/>

<Story
  name="SinglePage"
  args={{ currentPage: 1, totalItems: 8, itemsPerPage: 12 }}
/>
