<script module lang="ts">
  export interface FilterOptions {
    house: string;
    hasActor: string; // 'all', 'with-actor', 'without-actor'
    hasChildren: string; // 'all', 'with-children', 'without-children'
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ filterChange: FilterOptions }>();

  let filters = $state<FilterOptions>({
    house: 'all',
    hasActor: 'all',
    hasChildren: 'all',
  });

  let isExpanded = $state(true); // Start expanded for better UX

  function handleFilterChange() {
    dispatch('filterChange', filters);
  }

  function clearFilters() {
    filters = {
      house: 'all',
      hasActor: 'all',
      hasChildren: 'all',
    };
    handleFilterChange();
  }

  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
</script>

<div
  class="bg-hp-shadow/80 border border-hp-bronze/40 rounded-lg backdrop-blur-md shadow-xl"
>
  <!-- Filter Header -->
  <button
    onclick={toggleExpanded}
    class="w-full flex items-center justify-between p-4 text-hp-accent hover:text-hp-secondary transition-colors"
  >
    <div class="flex items-center space-x-2">
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
        ></path>
      </svg>
      <span class="font-semibold hp-title">Filters</span>
    </div>
    <svg
      class="w-5 h-5 transform transition-transform {isExpanded
        ? 'rotate-180'
        : ''}"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </button>

  <!-- Filter Content -->
  {#if isExpanded}
    <div class="px-4 pb-4 border-t border-hp-bronze/20">
      <!-- Horizontal Filter Layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <!-- House Filter -->
        <div class="space-y-2">
          <label
            for="house-filter"
            class="block text-sm font-semibold text-hp-accent"
            >Hogwarts House</label
          >
          <select
            id="house-filter"
            bind:value={filters.house}
            onchange={handleFilterChange}
            class="w-full px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 rounded
                   text-hp-parchment focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 focus:outline-none
                   transition-all duration-200"
          >
            <option value="all">All Houses</option>
            <option value="gryffindor">🦁 Gryffindor</option>
            <option value="slytherin">🐍 Slytherin</option>
            <option value="ravenclaw">🦅 Ravenclaw</option>
            <option value="hufflepuff">🦡 Hufflepuff</option>
            <option value="unknown">❓ Unknown</option>
          </select>
        </div>

        <!-- Actor Filter -->
        <div class="space-y-2">
          <label
            for="actor-filter"
            class="block text-sm font-semibold text-hp-accent"
            >Movie Appearance</label
          >
          <select
            id="actor-filter"
            bind:value={filters.hasActor}
            onchange={handleFilterChange}
            class="w-full px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 rounded
                   text-hp-parchment focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 focus:outline-none
                   transition-all duration-200"
          >
            <option value="all">All Characters</option>
            <option value="with-actor">🎬 Appeared in Movies</option>
            <option value="without-actor">📚 Books Only</option>
          </select>
        </div>

        <!-- Children Filter -->
        <div class="space-y-2">
          <label
            for="children-filter"
            class="block text-sm font-semibold text-hp-accent"
            >Family Status</label
          >
          <select
            id="children-filter"
            bind:value={filters.hasChildren}
            onchange={handleFilterChange}
            class="w-full px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 rounded
                   text-hp-parchment focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 focus:outline-none
                   transition-all duration-200"
          >
            <option value="all">All Characters</option>
            <option value="with-children">👨‍👩‍👧‍👦 Has Children</option>
            <option value="without-children">🧙‍♀️ No Children</option>
          </select>
        </div>

        <!-- Clear Filters Button -->
        <div class="space-y-2">
          <div class="text-sm font-semibold text-transparent">Actions</div>
          <!-- Spacer for alignment -->
          <button
            onclick={clearFilters}
            class="w-full px-4 py-2 bg-hp-accent/20 border border-hp-accent text-hp-accent rounded
                   hover:bg-hp-accent hover:text-hp-background transition-all duration-200 font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  select option {
    background-color: #111111;
    color: #f4e8c1;
  }
</style>
