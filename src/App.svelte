<script lang="ts">
  import Router from 'svelte-spa-router';
  import Navbar from './lib/components/Navbar.svelte';
  import CharacterGrid from './lib/components/CharacterGrid.svelte';
  import CharacterDetail from './lib/components/CharacterDetail.svelte';

  let characterGridRef: CharacterGrid | undefined = $state();
  let searchQuery = $state('');

  function handleSearch(event: CustomEvent<string>) {
    searchQuery = event.detail;
    if (characterGridRef) {
      characterGridRef.filterCharacters(searchQuery);
    }
  }

  const routes = {
    '/': CharacterGrid,
    '/character/:id': CharacterDetail,
  };
</script>

<Navbar on:search={handleSearch} />

<main class="min-h-screen pt-4">
  <div class="container mx-auto px-4 py-8">
    <Router {routes} />
  </div>
</main>
