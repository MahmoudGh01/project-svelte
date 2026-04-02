<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import type { Character } from '../../types/character';
  import gryffindorIcon from '../../assets/icons8-hogwarts-legacy-gryffindor-48.png';
  import slytherinIcon from '../../assets/icons8-hogwarts-legacy-slytherin-48.png';
  import ravenclawIcon from '../../assets/icons8-hogwarts-legacy-ravenclaw-48.png';
  import hufflepuffIcon from '../../assets/icons8-hogwarts-legacy-hufflepuff-48.png';

  interface Props {
    params: { id: string };
  }

  interface HouseColors {
    border: string;
    bg: string;
    bgSolid: string;
    text: string;
    accent: string;
    icon: string | null;
  }

  let { params }: Props = $props();
  let character = $state<Character | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);

  function getHouseColors(house: string): HouseColors {
    const houseLower = house.toLowerCase();
    switch (houseLower) {
      case 'gryffindor':
        return {
          border: 'border-gryffindor-primary',
          bg: 'bg-gryffindor-primary/20',
          bgSolid: 'bg-gryffindor-primary',
          text: 'text-gryffindor-secondary',
          accent: 'text-gryffindor-primary',
          icon: gryffindorIcon,
        };
      case 'slytherin':
        return {
          border: 'border-slytherin-primary',
          bg: 'bg-slytherin-primary/20',
          bgSolid: 'bg-slytherin-primary',
          text: 'text-slytherin-secondary',
          accent: 'text-slytherin-primary',
          icon: slytherinIcon,
        };
      case 'ravenclaw':
        return {
          border: 'border-ravenclaw-primary',
          bg: 'bg-ravenclaw-primary/20',
          bgSolid: 'bg-ravenclaw-primary',
          text: 'text-ravenclaw-secondary',
          accent: 'text-ravenclaw-primary',
          icon: ravenclawIcon,
        };
      case 'hufflepuff':
        return {
          border: 'border-hufflepuff-primary',
          bg: 'bg-hufflepuff-primary/20',
          bgSolid: 'bg-hufflepuff-primary',
          text: 'text-hufflepuff-primary',
          accent: 'text-hufflepuff-secondary',
          icon: hufflepuffIcon,
        };
      default:
        return {
          border: 'border-hp-bronze',
          bg: 'bg-hp-shadow/20',
          bgSolid: 'bg-hp-shadow',
          text: 'text-hp-accent',
          accent: 'text-hp-accent',
          icon: null,
        };
    }
  }

  onMount(async () => {
    try {
      const response = await fetch(
        'https://potterapi-fedeperin.vercel.app/en/characters'
      );
      if (!response.ok) throw new Error('Failed to fetch characters');

      const characters: Character[] = await response.json();
      character = characters.find(c => c.index === parseInt(params.id)) || null;

      if (!character) {
        error = 'Character not found';
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'An error occurred';
    } finally {
      loading = false;
    }
  });

  function handleBack() {
    push('/');
  }
</script>

{#if loading}
  <div class="min-h-screen bg-hp-background flex items-center justify-center">
    <div class="text-center">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-hp-accent"
      ></div>
      <p class="mt-4 text-hp-text hp-title">Loading character details...</p>
    </div>
  </div>
{:else if error || !character}
  <div
    class="min-h-screen bg-hp-background flex items-center justify-center p-4"
  >
    <div class="text-center">
      <h2 class="text-2xl font-bold text-hp-accent hp-title mb-4">
        {error || 'Character not found'}
      </h2>
      <button
        onclick={handleBack}
        class="px-6 py-3 bg-hp-accent text-hp-background rounded-lg hover:bg-hp-accent/80 transition-colors hp-title font-semibold"
      >
        Back to Characters
      </button>
    </div>
  </div>
{:else}
  {@const houseColors = getHouseColors(character.hogwartsHouse)}
  <div class="min-h-screen">
    <!-- Back Button -->
    <div class="container mx-auto px-4 py-6">
      <button
        onclick={handleBack}
        class="inline-flex items-center gap-2 px-4 py-2 bg-hp-shadow/80 border border-hp-bronze/40 rounded-lg hover:bg-hp-shadow transition-all duration-200 text-hp-accent hover:border-hp-bronze"
      >
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Characters
      </button>
    </div>

    <!-- Character Detail -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-5xl mx-auto">
        <div
          class="bg-hp-shadow/80 backdrop-blur-md border-2 border-hp-bronze/40 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div class="grid md:grid-cols-2 gap-0">
            <!-- Image Section -->
            <div class="relative h-96 md:h-auto">
              <img
                src={character.image}
                alt={character.fullName}
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-hp-background via-hp-background/50 to-transparent"
              ></div>
            </div>

            <!-- Content Section -->
            <div class="p-8 md:p-12 space-y-6">
              <!-- House Badge -->
              {#if houseColors.icon}
                <div
                  class="inline-flex items-center gap-3 px-4 py-2 rounded-full border-2 {houseColors.border} {houseColors.bg} backdrop-blur-sm"
                >
                  <img
                    src={houseColors.icon}
                    alt={character.hogwartsHouse}
                    class="w-7 h-7 object-contain"
                  />
                  <span
                    class="hp-title text-lg font-semibold {houseColors.text}"
                  >
                    {character.hogwartsHouse}
                  </span>
                </div>
              {/if}

              <!-- Character Name -->
              <div>
                <h1
                  class="hp-title text-4xl md:text-5xl {houseColors.accent} mb-2"
                >
                  {character.fullName}
                </h1>
                {#if character.nickname}
                  <p class="text-xl text-hp-parchment/80 italic">
                    "{character.nickname}"
                  </p>
                {/if}
              </div>

              <!-- Details Grid -->
              <div class="space-y-4 pt-4">
                <!-- Birthdate -->
                {#if character.birthdate}
                  <div class="flex flex-col gap-1">
                    <dt
                      class="text-sm font-semibold uppercase tracking-wide {houseColors.text}"
                    >
                      Date of Birth
                    </dt>
                    <dd class="text-lg text-hp-parchment">
                      {character.birthdate}
                    </dd>
                  </div>
                {/if}

                <!-- Actor -->
                {#if character.interpretedBy}
                  <div class="flex flex-col gap-1">
                    <dt
                      class="text-sm font-semibold uppercase tracking-wide {houseColors.text}"
                    >
                      Portrayed By
                    </dt>
                    <dd class="text-lg text-hp-parchment">
                      {character.interpretedBy}
                    </dd>
                  </div>
                {/if}

                <!-- Children -->
                {#if character.children && character.children.length > 0}
                  <div class="flex flex-col gap-1">
                    <dt
                      class="text-sm font-semibold uppercase tracking-wide {houseColors.text}"
                    >
                      Children
                    </dt>
                    <dd class="text-lg text-hp-parchment">
                      <ul class="list-disc list-inside space-y-1">
                        {#each character.children as child}
                          <li>{child}</li>
                        {/each}
                      </ul>
                    </dd>
                  </div>
                {/if}
              </div>

              <!-- Decorative Element -->
              <div class="pt-6 flex justify-center">
                <div class="text-6xl opacity-30">⚡</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
