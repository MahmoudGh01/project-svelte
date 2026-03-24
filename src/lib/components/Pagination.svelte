<script module lang="ts">
  export interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    maxVisiblePages?: number;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  interface Props {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    maxVisiblePages?: number;
  }

  let {
    currentPage,
    totalItems,
    itemsPerPage,
    maxVisiblePages = 5,
  }: Props = $props();

  const dispatch = createEventDispatcher<{
    pageChange: number;
    pageSizeChange: number;
  }>();

  const totalPages = $derived(Math.ceil(totalItems / itemsPerPage));
  const startItem = $derived((currentPage - 1) * itemsPerPage + 1);
  const endItem = $derived(Math.min(currentPage * itemsPerPage, totalItems));

  // Calculate visible page numbers
  const visiblePages = $derived.by(() => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  });

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      dispatch('pageChange', page);
    }
  }

  function handlePageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newPageSize = parseInt(select.value);
    dispatch('pageSizeChange', newPageSize);
  }

  function handleKeyDown(event: KeyboardEvent, page: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToPage(page);
    }
  }
</script>

{#if totalPages > 1}
  <div
    class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-hp-shadow/80 border border-hp-bronze/40 rounded-lg backdrop-blur-md shadow-xl"
  >
    <!-- Results Info -->
    <div class="text-hp-text text-sm">
      <span class="text-hp-accent font-semibold">
        {startItem.toLocaleString()}-{endItem.toLocaleString()}
      </span>
      of
      <span class="text-hp-accent font-semibold">
        {totalItems.toLocaleString()}
      </span>
      characters
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center space-x-2">
      <!-- First Page -->
      <button
        onclick={() => goToPage(1)}
        disabled={currentPage === 1}
        class="px-3 py-2 rounded bg-hp-shadow/50 border border-hp-bronze/30 text-hp-parchment
               hover:bg-hp-accent/20 hover:border-hp-accent hover:text-hp-accent
               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-hp-shadow/50
               disabled:hover:border-hp-bronze/30 disabled:hover:text-hp-parchment
               transition-all duration-200 font-semibold text-sm"
        title="First page"
      >
        ««
      </button>

      <!-- Previous Page -->
      <button
        onclick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        class="px-3 py-2 rounded bg-hp-shadow/50 border border-hp-bronze/30 text-hp-parchment
               hover:bg-hp-accent/20 hover:border-hp-accent hover:text-hp-accent
               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-hp-shadow/50
               disabled:hover:border-hp-bronze/30 disabled:hover:text-hp-parchment
               transition-all duration-200 font-semibold text-sm"
        title="Previous page"
      >
        ‹
      </button>

      <!-- Page Numbers -->
      {#each visiblePages as page}
        <button
          onclick={() => goToPage(page)}
          onkeydown={e => handleKeyDown(e, page)}
          class="px-3 py-2 rounded border transition-all duration-200 font-semibold text-sm min-w-[40px]
                 {page === currentPage
            ? 'bg-hp-accent text-hp-background border-hp-accent shadow-lg'
            : 'bg-hp-shadow/50 border-hp-bronze/30 text-hp-parchment hover:bg-hp-accent/20 hover:border-hp-accent hover:text-hp-accent'}"
          title="Page {page}"
        >
          {page}
        </button>
      {/each}

      <!-- Next Page -->
      <button
        onclick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        class="px-3 py-2 rounded bg-hp-shadow/50 border border-hp-bronze/30 text-hp-parchment
               hover:bg-hp-accent/20 hover:border-hp-accent hover:text-hp-accent
               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-hp-shadow/50
               disabled:hover:border-hp-bronze/30 disabled:hover:text-hp-parchment
               transition-all duration-200 font-semibold text-sm"
        title="Next page"
      >
        ›
      </button>

      <!-- Last Page -->
      <button
        onclick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        class="px-3 py-2 rounded bg-hp-shadow/50 border border-hp-bronze/30 text-hp-parchment
               hover:bg-hp-accent/20 hover:border-hp-accent hover:text-hp-accent
               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-hp-shadow/50
               disabled:hover:border-hp-bronze/30 disabled:hover:text-hp-parchment
               transition-all duration-200 font-semibold text-sm"
        title="Last page"
      >
        »»
      </button>
    </div>

    <!-- Page Size Selector -->
    <div class="flex items-center space-x-2 text-hp-text text-sm">
      <label for="page-size" class="text-hp-accent font-semibold">Show:</label>
      <select
        id="page-size"
        value={itemsPerPage}
        onchange={handlePageSizeChange}
        class="px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 rounded
               text-hp-parchment focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 focus:outline-none
               transition-all duration-200"
      >
        <option value="8">8 per page</option>
        <option value="12">12 per page</option>
        <option value="16">16 per page</option>
        <option value="24">24 per page</option>
        <option value="50">50 per page</option>
      </select>
    </div>
  </div>
{/if}

<style>
  select option {
    background-color: #111111;
    color: #f4e8c1;
  }
</style>
