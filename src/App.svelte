<script lang="ts">
  import Navbar from './lib/components/Navbar.svelte';
  import CharacterGrid from './lib/components/CharacterGrid.svelte';

  let characterGridRef: CharacterGrid;

  function handleSearch(event: CustomEvent<string>) {
    const searchQuery = event.detail;
    if (characterGridRef) {
      characterGridRef.filterCharacters(searchQuery);
    }
  }
</script>

<Navbar on:search={handleSearch} />

<main class="min-h-screen pt-4">
  <div class="container mx-auto px-4 py-8">
    <CharacterGrid bind:this={characterGridRef} />
  </div>
</main>
