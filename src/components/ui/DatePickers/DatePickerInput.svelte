<!-- 
  I converted this component to a SvelteKit component:
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/

  This content is licensed according to the W3C Software License at
  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
-->

<!-- 
  TODOs:
  * I need to clean up the CSS and make sure that it uses accessible principles. See notes about high contrast styles (which is the last bullet point) on this page: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#accessibilityfeatures.
      * I need to change the styles for the other components to also use accessible principles.
  * I need to test the accessibility on the input field and the button. The example from the link above focuses on the accessibility of the calendar, but it doesn't talk about the input field or button accessbility. So I need to make sure those have been designed with accessibility in mind too.
-->

<script lang="ts">
  import { run } from 'svelte/legacy';

  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import Calendar from "./DatePickerCalendar.svelte";
  import { getDateObjFromISODate, isValidDate } from "./utils";
  import { Label } from "../Labels";
  import { createId } from "/src/components/utils";

  
  interface Props {
    label?: string;
    value: string;
    /** Checks whether the ISO date string is valid */
    isValid?: boolean;
    paddingV?: string;
    paddingH?: string;
    fontSize?: string;
    placeholder?: string;
    btnIcon?: string;
    btnIconSize?: number;
    disabled?: boolean;
  }

  let {
    label = "",
    value = $bindable(),
    isValid = $bindable(false),
    paddingV = "var(--date-picker-input-default-padding-v)",
    paddingH = "var(--date-picker-input-default-padding-h)",
    fontSize = "var(--date-picker-input-default-font-size)",
    placeholder = "YYYY-MM-DD",
    btnIcon = "mdi:calendar",
    btnIconSize = $bindable(0),
    disabled = false
  }: Props = $props();

  let componentId = createId();
  let focused = $state(false);
  let dialogWidth = $state(0);
  let showDialog = $state(false);

  let dateObjFromVal = $derived(getDateObjFromISODate(value));

  // This will update the `isValid` prop when the value changes.
  run(() => {
    isValid = isValidDate(value);
  });

  const dayLabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  onMount(() => {
    // If the user does not pass a value for the `btnIconSize` prop, then set the value for `btnIconSize` by calling `setBtnIconSize()`.
    if (!btnIconSize) {
      setBtnIconSize();
    }
  });

  function calculateDialogWidth() {
    if (!showDialog) {
      // Get window width: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      // For screens that are wider than 400, then set the dialogWidth to be 350. For screens that are narrower than 400, set the width of the dialog to the window width - 30 so there is 15px of padding between the sides of the screen and the sides of the dialog.
      // This calculation might seem strange (and I might change it later), but for desktop screens, users don't need larger buttons because they are probably using a mouse. Calendars that are at least 350px wide should be wide enough for most users, even on touch screens.
      dialogWidth = windowWidth > 400 ? 350 : windowWidth - 30;
      showDialog = true;
    }
    else {
      showDialog = false;
    }
  }

  /**
   * Get the input field's font-size, even if that size is set in a stylesheet:
   * https://stackoverflow.com/a/15195345/9453009
   */
  function setBtnIconSize() {
    let dateInputField = document.getElementById(`fp-date-picker-${componentId}`);
    let style = window.getComputedStyle(dateInputField, null).getPropertyValue("font-size");
    btnIconSize = parseFloat(style);
  }
</script>

<Label {label} forVal={`fp-date-picker-${componentId}`} />

<div class="date-picker-wrapper">
  <div id={`input-btn-group-${componentId}`} class="input-btn-group" class:focused class:disabled>
    <input
      type="text" 
      {placeholder}
      id={`fp-date-picker-${componentId}`}
      style={`font-size:${fontSize}; padding:${paddingV} ${paddingH};`}
      aria-describedby="id-description-1"
      bind:value
      {disabled}
      onfocus={() => focused = true}
      onblur={() => focused = false}
    >
    <span id="id-description-1" class="desc screen-reader-only">date format: YYYY-MM-DD</span>
    <button
      type="button" 
      class="date-btn"
      style={`padding:${paddingV} calc(${paddingV} + 3px);`}
      aria-label={`Change Date, ${dayLabels[dateObjFromVal.getDay()]} ${monthLabels[dateObjFromVal.getMonth()]} ${dateObjFromVal.getDate()}, ${dateObjFromVal.getFullYear()}`}
      {disabled}
      onclick={calculateDialogWidth}
      onkeyup={calculateDialogWidth}
    >
      <Icon icon={btnIcon} width={btnIconSize} />
    </button>
  </div>
  {#if showDialog}
    <Calendar
      {value}
      {dialogWidth} 
      on:change={(event) => {
        value = event.detail;
      }}
      on:hideDialog={() => showDialog = false} 
    />
  {/if}
</div>

<style>
  .screen-reader-only {
    position: absolute;
    top: -2000em;
    left: -3000em;
  }

  .input-btn-group {
    width: 100%;
    display: flex;
    border: var(--border-width-default) var(--border-style-default) var(--custom-date-picker-border-color, var(--border-color-default));
    border-radius: var(--border-radius);
    /* This `overflow: hidden` style will ensure that the background color of the input and button elements goes all the way out to the border no matter how high or low the border radius value is. */
    overflow: hidden;

    &:hover, &.focused {
      box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
    }

    &.disabled {
      pointer-events: none;
    }

    & input {
      flex: 1;
      width: 100%;
      margin: 0;
      border: none;
      outline: none;
      background-color: var(--custom-date-picker-input-bg-color, var(--bg-color-element-default));
      color: var(--custom-date-picker-input-text-color, inherit);

      &::placeholder {
        color: var(--custom-date-picker-input-placeholder-text-color, var(--placeholder-color-default));
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        background-color: var(--bg-color-element-disabled);
        color: var(--text-color-disabled);
        pointer-events: none;
      }
    }

    & .date-btn {
      border-left: var(--border-width-default) var(--border-style-default) var(--custom-date-picker-btn-separator-color, var(--border-color-default));
      background-color: var(--custom-date-picker-btn-bg-color, var(--neutral-3));
      color: var(--custom-date-picker-btn-icon-color, inherit);

      &:focus {
        outline: none;
      }

      &:disabled {
        border-color: var(--text-color-disabled);
        background-color: var(--bg-color-element-disabled);
        color: var(--text-color-disabled);
        pointer-events: none;
      }
    }
  }
</style>
