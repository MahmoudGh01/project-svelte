<script lang="ts">
  import { onMount } from 'svelte';
  import type { Character } from '../../types/character';
  import CharacterCard from './CharacterCard.svelte';

  let characters = $state<Character[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  onMount(async () => {
    try {
      loading = true;
      const response = await fetch(
        'https://potterapi-fedeperin.vercel.app/en/characters'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }

      const data: Character[] = await response.json();
      characters = data.slice(0, 12);
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading = false;
    }
  });

  function handleRetry() {
    window.location.reload();
  }
</script>

<div class="container mx-auto px-4 py-8">
  {#if loading}
    <div class="mb-8">
      <div
        class="h-12 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
      ></div>
    </div>
    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {#each Array(12) as _, i (i)}
        <div
          class="h-80 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
        ></div>
      {/each}
    </div>
  {:else if error}
    <div class="flex min-h-screen flex-col items-center justify-center">
      <div class="text-center">
        <h2 class="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">
          Error Loading Characters
        </h2>
        <p class="mb-6 text-gray-700 dark:text-gray-300">{error}</p>
        <button
          onclick={handleRetry}
          class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  {:else}
    <h1 class="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">
      Harry Potter Characters
    </h1>
    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {#each characters as character (character.index)}
        <CharacterCard {character} />
      {/each}
    </div>
  {/if}
</div>
