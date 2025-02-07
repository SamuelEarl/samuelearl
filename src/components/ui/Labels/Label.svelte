<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Tooltip } from "../Tooltips";

  interface Props {
    label: any;
    forVal: any;
    id?: string;
    labelAlign?: string;
    tooltipIcon?: string;
    tooltipText?: string;
  }

  let {
    label,
    forVal,
    id = "",
    labelAlign = "left",
    tooltipIcon = "entypo:info-with-circle",
    tooltipText = ""
  }: Props = $props();
</script>


{#if label && forVal}
  <div
    class={`fp-label-container ${labelAlign}`}
    style="margin-bottom: var(--label-default-margin-bottom);"
  >
    <label 
      for={forVal}
      {id}
      style="font-size: var(--label-default-font-size);"
    >
      {label}
    </label>
    {#if tooltipText}
      <Tooltip tooltipText={tooltipText}>
        <Icon icon={tooltipIcon} />
      </Tooltip>
    {/if}
  </div>
{/if}


<style>
  .fp-label-container {

    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }
  }
</style>
