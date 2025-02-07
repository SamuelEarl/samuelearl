<script lang="ts">
  import { getContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let {
    rowMarginsY,
    rowMarginsX,
  } = getContext(GRID_KEY);
</script>

<div
  class="fp-grid-row"
  style={`margin: ${rowMarginsY}px ${rowMarginsX}px`}
>
  {@render children?.()}
</div>

<style>
  .fp-grid-row {
    display: grid;
  }
</style>
