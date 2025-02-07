<!--
  NOTES:
  * Localization: I think the browser will handle localization for the <input type="number"/> field. So users whose currency uses commas instead of periods to separate whole numbers from fractional numbers should be able to type commas into the number input field. I have not figured out how to test that though. There might be an option where I need to pass in a `lang` prop (or something like that) to handle localization for the number input field.
  * Internationalization API, see:
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
-->

<script lang="ts">
  import { formatIntegerToCurrency } from '../../utils';
  import { tick, createEventDispatcher } from "svelte";
  import { createId } from "/src/components/utils";
  import { Label } from "../Labels";

  interface Props {
    value?: number;
    valAlign?: string;
    locale?: string;
    currency?: string;
    label?: string;
    padding?: string;
    fontSize?: string;
    labelAlign?: string;
    placeholder?: string;
    disabled?: boolean;
    onchange: InputEvent,
    oninput: InputEvent,
  }

  let {
    value = $bindable(0),
    valAlign = "right",
    locale = "en-US",
    currency = "USD",
    label = "",
    padding = "var(--input-default-padding)",
    fontSize = "var(--input-default-font-size)",
    labelAlign = "right",
    placeholder = "",
    disabled = false,
    // Forward Events:
    onchange,
    oninput,
  }: Props = $props();

  const dispatch = createEventDispatcher();
  let componentId = createId();
  let showNumberInput = $state(false);
  let numberInput = $state();

  const inputStyles = `padding:${padding}; font-size:${fontSize};`;

  async function handleTextInputFocus() {
    // Convert the integer `value`, which is the value expressed in cents, to the float value, which is the value expressed in dollars and cents with two decimal places.
    value = value / 100;
    showNumberInput = true;
    await tick();
    // Place the focus inside the number input field.
    // NOTE: This `focus()` method is unnecessary for browsers, but it might be necessary to explicitly set the focus on the `numberInput` in order to bring up a virtual keyboard on mobile devices. TODO: I will need to test this, though.
    numberInput.focus();
    // Highlight the value.
    numberInput.select();
  }

  /**
   * If the user clicks outside of the input field or presses "Enter" or "Esc",
   * then hide the "number" input field and show the "text" input field.
   */
  async function loseFocus(event) {
    // NOTE: `event.keyCode` is deprecated. Use `event.key` instead. See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key.
    if (event.type === "blur" || event.key === "Enter" || event.key === "Escape") {
      // If a user deletes the number in the "number" input field and does not enter another number in its place, then `value` will be `null`. The `formatValue()` function will format `null` to be `$0.00`, so it will appear to be a valid value to the user. However, since `value` is actually `null` there could be unexpected errors when `value` gets passed to another part of the app or saved to the database. To prevent any possible problems, the following `if` statement will set any values that are either `null` or `undefined` back to their default value of 0.
      if (value === null || value === undefined) {
        value = 0;
      }
      // Remove all decimals numbers longer than 2 decimal places.
      // Use the `toFixed()` method to handle decimal numbers. See https://javascript.info/number#imprecise-calculations.
      // Multiply the `value` by 100 to express the `value` in cents.
      value = value * 100;

      // Only the onblur event will trigger the <input type="text" /> element to switch to the <input type="number" /> element. Keyboard events will not trigger the elements to switch. However, an "Enter" or "Escape" key press, will programmatically trigger an onblur event on the <input type="number" /> element, which will call this `loseFocus()` function with a blur event and trigger the number and text input elements to switch (see the `if (event.type === "blur")` conditional check below).
      if (event.key === "Enter" || event.key === "Escape") {
        // The `handleTextInputFocus()` function converts the integer `value` to a float value with the `value = value / 100` calculation. However, since a keypress event will not trigger the blur event, the `handleTextInputFocus()` function will never get called and the `value = value * 100` calculation above will continue to increase the `value` by a factor of 100 each time the "Enter" or "Escape" keys are pressed (to exit out of the input field). The following `value = value / 100` calculation will ensure that the `value` gets set to the decimal version, which will offset the `value = value * 100` calculation.
        value = value / 100;
        numberInput.blur();
      }

      if (event.type === "blur") {
        // Since this component needs to return an integer, the following method will truncate any decimal values off the `value` after the `value` has been multiplied by 100, which is the `value` expressed in cents.
        value = Math.trunc( value );
        showNumberInput = false;
        // The `onblur` event is already used by the <input type="number" /> element (in this file) to switch the input field from a number input back to a text input. So this component is unable to forward the blur event like you normally would in Svelte. Instead, this component manually dispatches the blur event here when the user clicks outside of the input field or presses "Enter" or "Esc". This will act the same as if the blur event were forwarded. The main difference is that the `blur` event will be found on the `event.detail` object rather than the `event` object.
        dispatch("onblur", event);
      }
    }
  }

  let formattedStringValue = $derived(formatIntegerToCurrency(value, locale, currency));
</script>


<Label {label} forVal={`fp-input-${componentId}`} {labelAlign} />
{#if showNumberInput}
  <!-- Using a "number" input here will allow a user's device to display a numeric virtual keyboard when the user clicks inside this input field. -->
  <input
    type="number"
    id={`fp-input-${componentId}`}
    class={`fp-currency-input ${valAlign}`}
    style={inputStyles}
    step="0.01"
    min="0.00"
    placeholder={placeholder}
    disabled={disabled}
    bind:value={value}
    bind:this={numberInput}
    onkeyup={loseFocus}
    onblur={loseFocus}
    {onchange}
    {oninput}
  />
{:else}
  <input
    type="text"
    id={`fp-input-${componentId}`}
    class={`fp-currency-input ${valAlign}`}
    style={inputStyles}
    placeholder={placeholder}
    disabled={disabled}
    value={formattedStringValue}
    onfocus={handleTextInputFocus}
  />
{/if}


<style>
  /* Remove Arrows/Spinners */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .fp-currency-input {
    width: 100%;
    outline: none;
    border: 1px solid;
    border-color: var(--custom-input-border-color, var(--border-color-default));
    outline-color: var(--custom-input-border-color, var(--border-color-default));
    border-radius: var(--border-radius);
    background-color: var(--custom-input-bg-color, var(--bg-color-element-default));
    color: var(--custom-input-text-color, var(--text-color-default));

    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }

    &::placeholder {
      color: var(--custom-input-placeholder-text-color, var(--placeholder-color-default));
    }

    &:hover {
      box-shadow: 0 0 0 2px var(--custom-input-border-color, var(--border-color-default));
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
