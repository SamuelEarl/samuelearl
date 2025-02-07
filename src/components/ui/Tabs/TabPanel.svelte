<script lang="ts">
	import { getContext } from "svelte";
	import { TABS_KEY } from "./TabsContainer.svelte";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

	const panel = {};
	const {
    registerPanel, 
    selectedPanel,
    panelPaddingStyle, 
  } = getContext(TABS_KEY);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <div style={`${panelPaddingStyle}`}>
    {@render children?.()}
  </div>
{/if}
