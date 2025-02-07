<script lang="ts">
  import { setContext } from "svelte";
  import { FLEX_GRID_KEY } from "./flex-grid-utils";

  interface Props {
    colGutter?: number;
    rowGutter?: number;
    rowMarginsY?: number;
    rowMarginsX?: number;
    colPaddingY?: number;
    colPaddingX?: number;
    equalColWidths?: boolean;
    contain?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    colGutter = 0,
    rowGutter = 0,
    rowMarginsY = 0,
    rowMarginsX = 0,
    colPaddingY = 0,
    colPaddingX = 0,
    equalColWidths = false,
    contain = false,
    children
  }: Props = $props();

  setContext(FLEX_GRID_KEY, {
    "colGutter": colGutter,
    "rowGutter": rowGutter,
    "rowMarginsY": rowMarginsY,
    "rowMarginsX": rowMarginsX,
    "equalColWidths": equalColWidths,
    "colPaddingY": colPaddingY,
    "colPaddingX": colPaddingX,
  });
</script>

<div 
  class="fp-flex-grid"
  class:fp-container={contain}
  style={`margin: -${rowGutter}px -${colGutter / 2}px`}
>
  {@render children?.()}
</div>
