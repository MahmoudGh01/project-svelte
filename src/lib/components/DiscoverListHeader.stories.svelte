<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DiscoverListHeader from './DiscoverListHeader.svelte';

  const { Story } = defineMeta({
    title: 'Components/DiscoverListHeader',
    component: DiscoverListHeader,
    tags: ['autodocs'],
  });
</script>

<Story
  name="Default"
  args={{
    title: 'Characters',
    subtitle: 'discover the wizarding world',
    description:
      'The Harry Potter series features hundreds of memorable characters from the wizarding world. From the brave students of Hogwarts to the powerful wizards and witches who shaped magical history, each character brings their own unique story. Explore the beloved heroes, cunning villains, and everyone in between who made the wizarding world come alive...',
    id: 'page_characters',
  }}
/>

<Story
  name="CustomContent"
  args={{
    title: 'Spells',
    subtitle: 'master the magical arts',
    description:
      'Discover the vast collection of spells and incantations used throughout the wizarding world. From simple charms to powerful defensive spells, each magical formula has its own unique properties and requirements.',
    id: 'page_spells',
  }}
/>

<Story
  name="ShortDescription"
  args={{
    title: 'Houses',
    subtitle: 'choose your destiny',
    description: 'Gryffindor, Slytherin, Hufflepuff, and Ravenclaw await.',
    id: 'page_houses',
  }}
/>
