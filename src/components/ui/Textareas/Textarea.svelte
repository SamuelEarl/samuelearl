<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import { createId } from "/src/components/utils";
  import { Label } from "../Labels";
  
  interface Props {
    label?: string;
    id?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    padding?: string;
    fontSize?: string;
    [key: string]: any
  }

  let {
    label = "",
    id = "",
    value = $bindable(""),
    placeholder = "",
    disabled = false,
    padding = "var(--textarea-default-padding)",
    fontSize = "var(--textarea-default-font-size)",
    ...rest
  }: Props = $props();

  let componentId = createId();
</script>


<Label {label} forVal={`fp-textarea-${componentId}`} />
<textarea
  bind:value={value}
  {id}
  style={`padding:${padding}; font-size:${fontSize};`}
  oninput={bubble('input')}
  onkeyup={bubble('keyup')}
  onblur={bubble('blur')}
  {placeholder}
  {disabled}
  {...rest}
></textarea>


<style>
  textarea {
    width: 100%;
    border: var(--border-default);
    border-color: var(--custom-textarea-border-color, var(--border-color-default));
    outline-color: var(--custom-textarea-border-color, var(--border-color-default));
    border-radius: var(--border-radius, 3px);
    background-color: var(--custom-textarea-bg-color, var(--bg-color-element-default));
    color: var(--custom-textarea-text-color, var(--text-color-default));

    &::placeholder {
      color: var(--custom-textarea-placeholder-text-color, var(--placeholder-color-default));
    }

    &:hover {
      box-shadow: 0 0 0 2px var(--custom-textarea-border-color, var(--border-color-default));
    }

    &:focus {
      outline-width: 2px;
      outline-style: dashed;
    }

    &:disabled {
      border-color: var(--border-color-disabled);
      box-shadow: none;
      color: var(--text-color-disabled);
      background-color: var(--bg-color-element-disabled);
      cursor: default;
    }
  }
</style>
