<script lang="ts">
  import { setContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";

  interface Props {
    colGutter?: number;
    rowGutter?: number;
    equalColWidths?: boolean;
    contain?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    colGutter = 0,
    rowGutter = 0,
    equalColWidths = false,
    contain = false,
    children
  }: Props = $props();

  setContext(GRID_KEY, {
    "colGutter": colGutter,
    "rowGutter": rowGutter,
    "equalColWidths": equalColWidths,
  });
</script>

<div 
  class="fp-grid"
  class:fp-container={contain}
>
  {@render children?.()}
</div>

<style>
  .fp-grid {
    display: grid;
  }
</style>
