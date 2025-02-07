<script lang="ts">
  import { setContext } from "svelte";

  interface Props {
    tabStyle?: string; // Possible values: "fill", "line"
    marginBottom?: string;
    children?: import('svelte').Snippet;
  }

  let { tabStyle = "line", marginBottom = "var(--tabs-default-tab-bar-margin-bottom)", children }: Props = $props();

  setContext("tabStyle", tabStyle);
</script>

<div 
  class={`fp-tabs-tab-bar ${tabStyle}`} 
  style={`margin-bottom:${marginBottom};`}>
	{@render children?.()}
</div>

<style>
  @media (--xs-up) {
    .fp-tabs-tab-bar {
      display: flex;

      &.fill {
        border: var(--border-default);
        border-radius: var(--border-radius);
        overflow: hidden;
        background-color: var(--bg-color-element-default);
        color: var(--text-color-default);

        &:hover {
          box-shadow: 0 0 0 1px var(--border-color-default);
        }
      }

      &.line {
        border-bottom: var(--border-default);

        &:hover {
          box-shadow: 0 1px 0 0 var(--border-color-default);
        }
      }
    }
  }
</style>
