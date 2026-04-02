<script lang="ts">
  interface Props {
    title: string;
    subtitle: string;
    description: string;
    id?: string;
  }

  let {
    title,
    subtitle,
    description,
    id = 'page_characters',
  }: Props = $props();
</script>

<div class="relative mb-12 w-full overflow-hidden rounded-lg" {id}>
  <!-- Content -->
  <div
    class="flex flex-col items-center justify-center px-4 py-12 text-center md:px-8 md:py-16 lg:px-16 lg:py-20"
    id={`div_${id.replace('page_', '')}`}
  >
    <!-- Top Header -->
    <div
      class="mb-4 text-sm font-semibold uppercase tracking-widest text-hp-accent/90 md:text-base lg:text-lg"
    >
      {subtitle}
    </div>

    <!-- Main Title -->
    <h1
      class="hp-title hp-magical-text mb-6 text-5xl text-hp-parchment drop-shadow-2xl md:text-7xl lg:text-8xl xl:text-9xl"
      id={id.replace('page_', '')}
    >
      <span class="flex">
        <span class="text-hp-accent">{title.charAt(0)}</span>
        <div class="text-hp-parchment">{title.slice(1)}</div>
      </span>
    </h1>

    <!-- Description -->
    <div
      class="max-w-4xl rounded-lg border border-hp-bronze/30 bg-hp-shadow/40 p-6 text-base leading-relaxed text-hp-parchment/90 shadow-2xl backdrop-blur-sm md:p-8 md:text-lg lg:text-xl"
    >
      {description}
    </div>
  </div>
</div>
