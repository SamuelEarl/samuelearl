<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import { createId } from "/src/components/utils";
  // Importing an external CSS file into the "style" block does not work. When this component gets packaged up and then imported into another app the styles will not be included. So the styles need to be imported into the "script" block.
  import "./checkbox.css";

  interface Props {
    id?: any;
    checked: any;
    label: any;
    disabled?: boolean;
    marginBottom?: string;
    verticalAlignment?: string;
  }

  let {
    id = createId(),
    checked = $bindable(),
    label,
    disabled = false,
    marginBottom = "var(--checkbox-default-margin-bottom)",
    verticalAlignment = "var(--checkbox-default-vertical-alignment)"
  }: Props = $props();
</script>


<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<label
  for={id}
  class="fp-checkbox-label-wrapper" 
  class:disabled
  style={`margin-bottom: ${marginBottom};`}
  tabindex="0"
>
<!-- 
  TODO: 
  * See the TODO.md file for migration notes about Event Forwarding.
  * I need to test keyboard events to check/uncheck the box.
-->
  <input
    type="checkbox"
    {id}
    class="fp-checkbox-input"
    bind:checked={checked}
    {disabled}
    onchange={bubble('change')}
    oninput={bubble('input')}
    tabindex="-1"
  > {label}
  <span 
    class="fp-checkbox-checkmark" 
    style={`top: ${verticalAlignment};`}
  ></span>
</label><br>
