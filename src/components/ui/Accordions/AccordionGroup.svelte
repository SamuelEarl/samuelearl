<script module>
  export let ACCORDION_KEY = Symbol();
</script>

<script lang="ts">
  import { setContext } from "svelte";

  interface Props {
    id?: string;
    classes?: string;
    border?: boolean;
    groupPadding?: string;
    accordionTitlePadding?: string;
    fontSize?: string;
    spaceBetweenAccordions?: string;
    children?: import('svelte').Snippet;
  }

  let {
    id = "",
    classes = "",
    border = true,
    groupPadding = "var(--accordion-default-group-padding)",
    accordionTitlePadding = "var(--accordion-default-title-padding)",
    fontSize = "var(--accordion-default-font-size)",
    spaceBetweenAccordions = "var(--accordion-default-space-between-accordions)",
    children
  }: Props = $props();

  setContext(ACCORDION_KEY, {
    "accordionTitlePadding": accordionTitlePadding,
    "fontSize": fontSize,
    "spaceBetweenAccordions": spaceBetweenAccordions,
  });
</script>

<div
  {id}
  class={`fp-accordion-group ${border ? "border" : ""} ${classes}`} 
  style={`padding:${groupPadding};`}
>
  {@render children?.()}
</div>

<style>
  .fp-accordion-group.border {
    border: 1px solid var(--border-color-default);
    border-radius: var(--border-radius);
  }
</style>
