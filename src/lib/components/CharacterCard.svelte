<script lang="ts">
  import type { Character } from '../../types/character';

  interface Props {
    character: Character;
  }

  let { character }: Props = $props();

  function getHouseColors(house: string): string {
    const lowerHouse = house.toLowerCase();
    
    if (lowerHouse.includes('gryffindor')) {
      return 'border-red-500 bg-red-50 dark:bg-red-950/20 dark:border-red-700';
    } else if (lowerHouse.includes('slytherin')) {
      return 'border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-700';
    } else if (lowerHouse.includes('ravenclaw')) {
      return 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700';
    } else if (lowerHouse.includes('hufflepuff')) {
      return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-700';
    }
    
    return 'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600';
  }

  const houseColors = $derived(getHouseColors(character.hogwartsHouse));
</script>

<div class="rounded-lg border-2 p-4 shadow-lg transition-transform hover:scale-105 {houseColors}">
  <div class="mb-4">
    <img
      src={character.image}
      alt={character.fullName}
      class="h-48 w-full rounded-md object-cover"
    />
  </div>
  
  <div class="space-y-2">
    <h3 class="truncate text-lg font-bold text-gray-900 dark:text-gray-100">
      {character.fullName}
    </h3>
    
    <p class="text-sm text-gray-700 dark:text-gray-300">
      <span class="font-semibold">House:</span> {character.hogwartsHouse || 'Unknown'}
    </p>
    
    {#if character.interpretedBy}
      <p class="text-sm text-gray-700 dark:text-gray-300">
        <span class="font-semibold">Actor:</span> {character.interpretedBy}
      </p>
    {/if}
    
    <p class="text-xs text-gray-600 dark:text-gray-400">
      <span class="font-semibold">Born:</span> {character.birthdate || 'Unknown'}
    </p>
  </div>
</div>
