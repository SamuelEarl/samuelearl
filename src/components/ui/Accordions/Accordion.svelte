<script lang="ts">
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";
  import type { Snippet } from "svelte";
  import { ACCORDION_KEY } from "./AccordionGroup.svelte";

  interface Props {
    wrapperId?: string;
    btnId?: string;
    panelId?: string;
    wrapperClasses?: string;
    btnClasses?: string;
    panelClasses?: string;
    title: any;
    open?: boolean;
    children?: Snippet;
  }

  let {
    wrapperId = "",
    btnId = "",
    panelId = "",
    wrapperClasses = "",
    btnClasses = "",
    panelClasses = "",
    title,
    open = false,
    children,
  }: Props = $props();

  const { 
    accordionTitlePadding,
    fontSize,
    spaceBetweenAccordions 
  } = getContext(ACCORDION_KEY);

  const accordionPanelPadding = `padding: calc(2 * ${accordionTitlePadding}) ${accordionTitlePadding} ${accordionTitlePadding} ${accordionTitlePadding};`
</script>

<!-- Accordion Wrapper -->
<div id={wrapperId} class={`fp-accordion-wrapper ${wrapperClasses}`} style={`margin-bottom:${spaceBetweenAccordions}`}>
  <!-- Accordion Title -->
  <button
    id={btnId}
    class={`fp-accordion-title ${btnClasses}`}
    class:active={open}
    style={`padding:${accordionTitlePadding}; font-size:${fontSize};`}
    onclick={() => {
      open = !open;
      // NOTE: Do not use an `onkeyup` event listener after this `onclick` listener because they will conflict with each other. Only the `onclick` listener is needed for interactive elements such as buttons.
    }}
  >
    {title}
  </button>

  <!-- Accordion Panel -->
  {#if open}
    <div
      id={panelId}
      class={`fp-accordion-panel ${panelClasses}`}
      style={`${accordionPanelPadding} font-size:${fontSize};`}
      transition:slide
    >
      {@render children?.()}
    </div>
  {/if}
</div>


<style>
  .fp-accordion-wrapper {

    &:last-child {
      margin-bottom: 0 !important;
    }

    & .fp-accordion-title {
      width: 100%;
      text-align: left;
      border: var(--border-default);
      outline-color: var(--border-color-default);
      border-radius: var(--border-radius);
      background-color: var(--bg-color-element-default);
      color: var(--text-color-default);
      cursor: pointer;

      &:after {
        content: "+"; /* Unicode character for "plus" sign (+) */
        font-weight: bold;
        color: inherit;
        float: right;
        margin-left: 5px;
      }

      &.active:after {
        content: "−"; /* Unicode character for "minus" sign (-) */
      }

      &:hover {
        box-shadow: var(--box-shadow-default);
      }

      &:focus {
        outline-width: 2px;
        outline-style: dashed;
      }
    }
  }
</style>
