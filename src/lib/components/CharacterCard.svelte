<script lang="ts">
  import type { Character } from '../../types/character';
  import gryffindorIcon from '../../assets/icons8-hogwarts-legacy-gryffindor-48.png';
  import slytherinIcon from '../../assets/icons8-hogwarts-legacy-slytherin-48.png';
  import ravenclawIcon from '../../assets/icons8-hogwarts-legacy-ravenclaw-48.png';
  import hufflepuffIcon from '../../assets/icons8-hogwarts-legacy-hufflepuff-48.png';

  interface Props {
    character: Character;
  }

  let { character }: Props = $props();

  function getHouseColors(house: string): string {
    const lowerHouse = house.toLowerCase();

    if (lowerHouse.includes('gryffindor')) {
      return 'border-gryffindor-primary bg-gryffindor-primary/20 hover:bg-gryffindor-primary/30 shadow-gryffindor-primary/40 hover:shadow-gryffindor-primary/60';
    } else if (lowerHouse.includes('slytherin')) {
      return 'border-slytherin-primary bg-slytherin-primary/20 hover:bg-slytherin-primary/30 shadow-slytherin-primary/40 hover:shadow-slytherin-primary/60';
    } else if (lowerHouse.includes('ravenclaw')) {
      return 'border-ravenclaw-primary bg-ravenclaw-primary/20 hover:bg-ravenclaw-primary/30 shadow-ravenclaw-primary/40 hover:shadow-ravenclaw-primary/60';
    } else if (lowerHouse.includes('hufflepuff')) {
      return 'border-hufflepuff-primary bg-hufflepuff-primary/20 hover:bg-hufflepuff-primary/30 shadow-hufflepuff-primary/40 hover:shadow-hufflepuff-primary/60';
    }

    return 'border-hp-bronze bg-hp-shadow/50 hover:bg-hp-shadow/70 shadow-hp-shadow/50';
  }

  function getHouseAccentColor(house: string): string {
    const lowerHouse = house.toLowerCase();

    if (lowerHouse.includes('gryffindor')) {
      return 'text-gryffindor-secondary'; // Gold
    } else if (lowerHouse.includes('slytherin')) {
      return 'text-slytherin-secondary'; // Silver
    } else if (lowerHouse.includes('ravenclaw')) {
      return 'text-ravenclaw-secondary'; // Bronze
    } else if (lowerHouse.includes('hufflepuff')) {
      return 'text-hufflepuff-primary'; // Yellow (visible on dark background)
    }

    return 'text-hp-accent'; // Default gold
  }

  function getHouseIcon(house: string): string | null {
    const lowerHouse = house.toLowerCase();

    if (lowerHouse.includes('gryffindor')) {
      return gryffindorIcon;
    } else if (lowerHouse.includes('slytherin')) {
      return slytherinIcon;
    } else if (lowerHouse.includes('ravenclaw')) {
      return ravenclawIcon;
    } else if (lowerHouse.includes('hufflepuff')) {
      return hufflepuffIcon;
    }

    return null;
  }

  function getHouseBadgeColors(house: string): string {
    const lowerHouse = house.toLowerCase();

    if (lowerHouse.includes('gryffindor')) {
      return 'bg-gryffindor-primary/90 border-gryffindor-secondary';
    } else if (lowerHouse.includes('slytherin')) {
      return 'bg-slytherin-primary/90 border-slytherin-secondary';
    } else if (lowerHouse.includes('ravenclaw')) {
      return 'bg-ravenclaw-primary/90 border-ravenclaw-secondary';
    } else if (lowerHouse.includes('hufflepuff')) {
      return 'bg-hufflepuff-primary/90 border-hufflepuff-secondary';
    }

    return 'bg-hp-shadow/90 border-hp-bronze';
  }

  const houseColors = $derived(getHouseColors(character.hogwartsHouse));
  const houseAccentColor = $derived(
    getHouseAccentColor(character.hogwartsHouse)
  );
  const houseIcon = $derived(getHouseIcon(character.hogwartsHouse));
  const houseBadgeColors = $derived(
    getHouseBadgeColors(character.hogwartsHouse)
  );
</script>

<!-- Full-image card with overlay content -->
<div
  class="relative rounded-lg border-2 shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden h-80 {houseColors}"
>
  <!-- Full-size background image -->
  <img
    src={character.image}
    alt={character.fullName}
    class="absolute inset-0 w-full h-full object-cover"
  />

  <!-- Dark overlay for readability -->
  <div
    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"
  ></div>

  <!-- House Badge (Top Right) -->
  <div class="absolute top-3 right-3 z-10">
    <div
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border-2 {houseBadgeColors} backdrop-blur-sm shadow-lg"
    >
      {#if houseIcon}
        <img src={houseIcon} alt={character.hogwartsHouse} class="w-5 h-5" />
        <span class="text-xs font-semibold text-white hp-title hp-magical-text"
          >{character.hogwartsHouse}</span
        >
      {:else}
        <span class="text-base">❓</span>
        <span class="text-xs font-semibold text-white">Unknown</span>
      {/if}
    </div>
  </div>

  <!-- Content overlay -->
  <div class="absolute inset-0 p-4 flex flex-col justify-end">
    <div class="space-y-2 text-white">
      <h3
        class="text-lg font-bold {houseAccentColor} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hp-title"
      >
        {character.fullName}
      </h3>

      {#if character.interpretedBy}
        <p
          class="text-sm text-hp-parchment drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        >
          <span class="font-semibold {houseAccentColor}">Actor:</span>
          {character.interpretedBy}
        </p>
      {/if}

      <p
        class="text-xs text-hp-text/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
      >
        <span class="font-semibold {houseAccentColor}">Born:</span>
        {character.birthdate || 'Unknown'}
      </p>
    </div>
  </div>
</div>
