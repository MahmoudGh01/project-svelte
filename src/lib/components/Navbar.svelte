<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ search: string }>();

  let searchQuery = $state('');

  function handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    dispatch('search', searchQuery);
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    dispatch('search', searchQuery);
  }
</script>

<nav
  class="sticky top-0 z-50 bg-hp-background/98 backdrop-blur-lg border-b-2 border-hp-bronze/50 shadow-2xl"
>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Search Bar (Left) -->
      <div class="flex-1 max-w-md">
        <form onsubmit={handleSubmit} class="relative">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-hp-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search characters..."
              bind:value={searchQuery}
              oninput={handleSearch}
              class="w-full pl-10 pr-4 py-2 bg-hp-shadow/50 border-2 border-hp-bronze/30 rounded-lg
                     text-hp-parchment placeholder-hp-text/60
                     focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 focus:outline-none
                     transition-all duration-300"
            />
          </div>
        </form>
      </div>

      <!-- Logo (Center) -->
      <div class="flex-1 flex justify-center">
        <div class="flex items-center space-x-3">
          <h1
            class="text-4xl font-bold text-hp-accent drop-shadow-lg tracking-wide hp-title hp-magical-text"
          >
            Harry Potter
          </h1>
        </div>
      </div>

      <!-- GitHub Link (Right) -->
      <div class="flex-1 flex justify-end">
        <a
          href="https://github.com/MahmoudGh01/project-svelte"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 text-hp-text hover:text-hp-accent transition-colors duration-300
                 hover:bg-hp-accent/10 rounded-lg"
          aria-label="View source on GitHub"
        >
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</nav>
