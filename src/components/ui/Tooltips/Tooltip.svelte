<script lang="ts">
  import tooltip from "./tooltip";

  interface Props {
    tooltipText?: string;
    children?: import('svelte').Snippet;
  }

  let {
    tooltipText = "",
    children
  }: Props = $props();
</script>

<span class="tooltip-wrapper" use:tooltip={{ content: tooltipText }}>
  {@render children?.()}
</span>


<style>
  .tooltip-wrapper {
    display: inline-block;
  }

  /* Theme the Tippy elements: https://atomiks.github.io/tippyjs/v6/themes/#tippy-elements */
  :global(.tippy-content) {
    padding: 10px;
    border-radius: var(--border-radius);
    /* background-color: var(--red); */
    color: var(--white);
    /* This will preserve any line breaks in the Tippy content. */
    white-space: pre-line;
  }
</style>
