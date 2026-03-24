<script lang="ts">
  import { onMount } from 'svelte';
  import type { Character } from '../../types/character';
  import CharacterCard from './CharacterCard.svelte';
  import Filters, { type FilterOptions } from './Filters.svelte';
  import Pagination from './Pagination.svelte';

  let allCharacters = $state<Character[]>([]);
  let filteredCharacters = $state<Character[]>([]);
  let paginatedCharacters = $state<Character[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let currentFilters = $state<FilterOptions>({
    house: 'all',
    hasActor: 'all',
    hasChildren: 'all',
  });
  let currentSearchQuery = $state('');
  let currentPage = $state(1);
  let itemsPerPage = $state(12);

  export function filterCharacters(searchQuery: string) {
    currentSearchQuery = searchQuery;
    applyFiltersAndSearch();
  }

  function handleFilterChange(event: CustomEvent<FilterOptions>) {
    currentFilters = event.detail;
    currentPage = 1; // Reset to first page when filters change
    applyFiltersAndSearch();
  }

  function handlePageChange(event: CustomEvent<number>) {
    currentPage = event.detail;
    updatePaginatedCharacters();
  }

  function handlePageSizeChange(event: CustomEvent<number>) {
    itemsPerPage = event.detail;
    currentPage = 1; // Reset to first page when page size changes
    updatePaginatedCharacters();
  }

  function applyFiltersAndSearch() {
    let filtered = allCharacters;

    // Apply search query first
    if (currentSearchQuery.trim()) {
      const query = currentSearchQuery.toLowerCase();
      filtered = filtered.filter(
        character =>
          character.fullName.toLowerCase().includes(query) ||
          character.hogwartsHouse?.toLowerCase().includes(query) ||
          character.interpretedBy?.toLowerCase().includes(query) ||
          character.nickname?.toLowerCase().includes(query)
      );
    }

    // Apply house filter
    if (currentFilters.house !== 'all') {
      if (currentFilters.house === 'unknown') {
        filtered = filtered.filter(
          character =>
            !character.hogwartsHouse || character.hogwartsHouse.trim() === ''
        );
      } else {
        filtered = filtered.filter(character =>
          character.hogwartsHouse?.toLowerCase().includes(currentFilters.house)
        );
      }
    }

    // Apply actor filter
    if (currentFilters.hasActor !== 'all') {
      if (currentFilters.hasActor === 'with-actor') {
        filtered = filtered.filter(
          character =>
            character.interpretedBy && character.interpretedBy.trim() !== ''
        );
      } else if (currentFilters.hasActor === 'without-actor') {
        filtered = filtered.filter(
          character =>
            !character.interpretedBy || character.interpretedBy.trim() === ''
        );
      }
    }

    // Apply children filter
    if (currentFilters.hasChildren !== 'all') {
      if (currentFilters.hasChildren === 'with-children') {
        filtered = filtered.filter(
          character => character.children && character.children.length > 0
        );
      } else if (currentFilters.hasChildren === 'without-children') {
        filtered = filtered.filter(
          character => !character.children || character.children.length === 0
        );
      }
    }

    filteredCharacters = filtered;
    currentPage = 1; // Reset to first page when filters change
    updatePaginatedCharacters();
  }

  function updatePaginatedCharacters() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    paginatedCharacters = filteredCharacters.slice(startIndex, endIndex);
  }

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
      allCharacters = data;
      filteredCharacters = data;
      updatePaginatedCharacters();
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
        class="h-12 w-64 animate-pulse rounded bg-hp-shadow/50 shadow-lg"
      ></div>
    </div>
    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {#each Array(12) as _, i (i)}
        <div
          class="h-80 animate-pulse rounded-lg border-2 border-hp-bronze/30 bg-hp-shadow/50 shadow-xl"
        ></div>
      {/each}
    </div>
  {:else if error}
    <div class="flex min-h-screen flex-col items-center justify-center">
      <div class="text-center">
        <h2 class="mb-4 text-2xl font-bold text-hp-primary drop-shadow-lg">
          Error Loading Characters
        </h2>
        <p class="mb-6 text-hp-parchment">{error}</p>
        <button
          onclick={handleRetry}
          class="rounded-lg border-2 border-hp-accent bg-hp-accent/20 px-6 py-3 font-semibold text-hp-accent transition-all hover:bg-hp-accent hover:text-hp-background"
        >
          Try Again
        </button>
      </div>
    </div>
  {:else}
    <!-- Filters Section -->
    <div class="mb-6">
      <Filters on:filterChange={handleFilterChange} />
    </div>

    <!-- Results Count -->
    <div class="mb-6 flex items-center justify-between">
      <p class="text-hp-parchment drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <span class="font-semibold text-hp-accent"
          >{filteredCharacters.length}</span
        >
        {filteredCharacters.length === 1 ? 'character' : 'characters'} found
        {#if allCharacters.length !== filteredCharacters.length}
          <span class="text-hp-parchment/80">
            (filtered from {allCharacters.length})</span
          >
        {/if}
      </p>
    </div>

    <!-- Character Grid -->
    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {#each paginatedCharacters as character (character.index)}
        <CharacterCard {character} />
      {/each}
    </div>

    {#if filteredCharacters.length === 0 && allCharacters.length > 0}
      <div class="text-center py-12">
        <div
          class="max-w-md mx-auto bg-hp-shadow/80 backdrop-blur-md rounded-lg p-8 border border-hp-bronze/40 shadow-xl"
        >
          <div class="text-6xl mb-4">🔍</div>
          <h3
            class="text-xl font-semibold text-hp-accent mb-2 hp-title drop-shadow-lg"
          >
            No characters found
          </h3>
          <p class="text-hp-parchment mb-4 drop-shadow-md">
            Try adjusting your search terms or filters to find more characters.
          </p>
          <div class="text-sm text-hp-parchment/80 drop-shadow-md">
            <p class="font-semibold text-hp-accent">💡 Tips:</p>
            <ul class="list-disc list-inside space-y-1 mt-2">
              <li>Try searching by name, house, or actor</li>
              <li>Check if filters are too restrictive</li>
              <li>Use the "Clear All Filters" button to reset</li>
            </ul>
          </div>
        </div>
      </div>
    {/if}

    <!-- Pagination -->
    {#if filteredCharacters.length > 0}
      <div class="mt-8">
        <Pagination
          {currentPage}
          {itemsPerPage}
          totalItems={filteredCharacters.length}
          on:pageChange={handlePageChange}
          on:pageSizeChange={handlePageSizeChange}
        />
      </div>
    {/if}
  {/if}
</div>
