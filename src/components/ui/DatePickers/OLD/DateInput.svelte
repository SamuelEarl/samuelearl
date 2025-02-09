<script lang="ts">
  import { run } from 'svelte/legacy';

  import { onMount, createEventDispatcher, tick } from "svelte";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import type { Writable } from "svelte/store";
  import { writable } from "svelte/store";
  import Icon from "@iconify/svelte";
  import { toText } from "./date-utils";
  import type { Locale } from "./locale";
  import { parse, createFormat } from "./parse";
  import type { FormatToken } from "./parse";
  import Calendar from "./Calendar.svelte";
  import { Label } from "../Labels";
  import { createId } from "/src/components/utils";


  const dispatch = createEventDispatcher<{ select: undefined }>();
  let activeDateInput = $state();
  let activeCalendar = $state();
  let componentId = createId();
  let inputFontSize = $state();

  onMount(() => {
    setIconFontSize();
  });

  // TODO: Fix this error: The `d.getTime()` function throws errors when I try to load a <DateInput /> component that gets its data from the database. The problem is that when the date is created it is created as a Date object with this format:
  // Mon Sep 04 2023 15:06:21 GMT-0700 (Mountain Standard Time)
  // ...but when that Date object gets passed to the endpoint it is JSON stringified, which converts the Date object to an ISO date string with this format:
  // 2023-09-04T07:00:00Z
  // That ISO string is what gets saved in the database. So when the data is retrieved from the database, that ISO string is what gets passed to this component instead of a Date object, which is why the `d.getTime() is not a function` error occurs. So I need to figure out how to convert the ISO string to a Date object in this component.
  
  // inner date value store for preventing value updates (and also
  // text updates as a result) when date is unchanged
  const innerStore: Writable<Date | null> = writable(null);
  const store = (() => {
    return {
      subscribe: innerStore.subscribe,
      set: (d: Date | null) => {
        if (d === null) {
          innerStore.set(null);
          value = d;
        } 
        else if (d.getTime() !== $innerStore?.getTime()) {
          innerStore.set(d);
          value = d;
        }
      },
    }
  })();

  

  /** Default date to display in input before value is assigned */
  const currentDate = new Date();
  
  
  
  

  /** Format string */
  // export let format = "yyyy-MM-dd HH:mm:ss";
  let format = "yyyy-MM-dd";
  let formatTokens = $state(createFormat(format));

  

  function valueUpdate(value: Date | null, formatTokens: FormatToken[]) {
    text = toText(value, formatTokens);
  }

  // I am not exporting this `text` prop. If it becomes necessary later, then I will figure out what this prop does and I will export it.
  // export let text = toText($store, formatTokens);
  let text = $state(toText($store, formatTokens));
  let textHistory = $state([text, text]);

  function textUpdate(text: string, formatTokens: FormatToken[]) {
    if (text.length) {
      const result = parse(text, formatTokens, $store);
      if (result.date !== null) {
        valid = true;
        store.set(result.date);
      } 
      else {
        valid = false;
      }
    } 
    else {
      valid = true; // <-- empty string is always valid
      // value resets to null if you clear the field
      if (value) {
        value = null;
        store.set(null);
      }
    }
  }

  function handleInput(e: unknown) {
    if (
      e instanceof InputEvent &&
      e.inputType === "insertText" &&
      typeof e.data === "string" &&
      text === textHistory[0] + e.data
    ) {
      // check for missing punctuation, and add if there is any
      let result = parse(textHistory[0], formatTokens, $store);
      if (result.missingPunctuation !== "" && !result.missingPunctuation.startsWith(e.data)) {
        text = textHistory[0] + result.missingPunctuation + e.data;
      }
    }
  }

  
  
  interface Props {
    label?: string;
    padding?: string;
    fontSize?: string;
    dateInputIcon?: string;
    disabled?: boolean;
    /** Date value */
    value?: Date | null;
    /** The earliest value the user can select */
    min?: any;
    /** The latest value the user can select */
    max?: any;
    /** Placeholder text to show when input field is empty */
    placeholder?: string;
    /** Whether the text is valid */
    valid?: boolean;
    /** Locale object for internationalization */
    locale?: Locale;
    /** Show or hide the calendar */
    showCalendar?: boolean;
    /** Close the date popup when a date is selected */
    closeOnSelection?: boolean;
  }

  let {
    label = "",
    padding = "var(--date-picker-default-padding-v) var(--date-picker-default-padding-h)",
    fontSize = "var(--date-picker-default-font-size)",
    dateInputIcon = "mdi:calendar",
    disabled = false,
    value = $bindable(null),
    min = new Date(currentDate.getFullYear() - 10, 0, 1),
    max = new Date(currentDate.getFullYear() + 10, 11, 31),
    placeholder = "YYYY-MM-DD",
    valid = $bindable(false),
    locale = {},
    showCalendar = $bindable(false),
    closeOnSelection = true
  }: Props = $props();

  // handle on:focusout for parent element. If the parent element loses
  // focus (e.g input element), showCalendar is set to false.
  function handleHideCalendar(e: FocusEvent) {
    if (
      e?.currentTarget instanceof HTMLElement &&
      e.relatedTarget &&
      e.relatedTarget instanceof Node &&
      e.currentTarget.contains(e.relatedTarget)
    ) {
      return;
    } 
    else {
      // TODO: Fix this bug: Pass the `closeOnSelection` prop's value as `true`. Then when I click on a date and then try to close the calendar by clicking on the icon button, it does not close after the first click (but it will close after the second click). If I comment out the following line, then the calendar will close after the first button click. So I need to figure out how the FocusEvent that is passed to this function is conflicting with the click event on the icon button. Whatever I come up with, though, needs to be tested to make sure that it does not mess up other scenarios.
      showCalendar = false;
    }
  }

  async function handleKeydown(e: KeyboardEvent) {
    if (showCalendar && (e.key === "Escape" || e.key === "Enter")) {
      showCalendar = false;
      e.preventDefault();
      activeDateInput.blur();
      // When the calendar is open, we prevent "Escape" from propagating,
      // so for example a parent modal won't be closed.
      e.stopPropagation();
    }
  }

  function handleSelection(e: CustomEvent<undefined>) {
    dispatch("select", e.detail);
    if (closeOnSelection) {
      showCalendar = false;
    }
  }

  /**
   * Get the input field's font-size, even if that size is set in a stylesheet:
   * https://stackoverflow.com/a/15195345/9453009
   */
  function setIconFontSize() {
    let dateInputField = document.getElementById(`fp-date-input-${componentId}`);
    let style = window.getComputedStyle(dateInputField, null).getPropertyValue("font-size");
    inputFontSize = parseFloat(style);
  }
  run(() => {
    store.set(value);
  });
  run(() => {
    formatTokens = createFormat(format);
  });
  run(() => {
    valueUpdate($store, formatTokens);
  });
  run(() => {
    textHistory = [textHistory[1], text];
  });
  run(() => {
    textUpdate(text, formatTokens);
  });
</script>


<Label {label} forVal={`fp-date-input-${componentId}`} />
<div class="date-picker-container" onfocusout={handleHideCalendar} onkeydown={handleKeydown}>
  <div
    class="fp-date-input-container" 
    class:showCalendar 
    class:disabled={disabled}
  >
    <input
      id={`fp-date-input-${componentId}`}
      class="fp-date-input"
      style={`font-size:${fontSize}; padding:${padding};`}
      type="text"
      bind:value={text}
      bind:this={activeDateInput}
      {placeholder}
      onfocus={() => showCalendar = true}
      onmousedown={async () => {
        showCalendar = true;
        // When a user clicks on the input field, then give the calendar component the focus so the screen will scroll down to show the entire calendar.
        await tick();
        activeCalendar.focus();
      }}
      oninput={handleInput}
      {disabled}
    />
    <!--
      You can use tabindex="-1" to give elements that don't normally receive focus the ability to receive focus. I think the tabindex="-1" attribute on the following <div> will give the <div> focus when a user clicks on it. This allows the user to click the button and then click outside of the button to close the calendar. The focus event will bubble up to the parent element (.date-picker-container) where the `on:focusout` event will call `handleHideCalendar`.
    -->
    <div
      class="fp-date-input-btn"
      class:disabled={disabled}
      style={`padding:${padding};`}
      tabindex="-1"
      onclick={async () => {
        if (disabled) return;
        showCalendar = !showCalendar;
        // For an explanation of this code, see the comment in the
        // `on:mousedown` event of the `fp-date-input` element.
        await tick();
        if (showCalendar) activeCalendar.focus();
      }}
    >
      <!-- This <Icon/> element does not inherit the font-size property of its parent component, so I am setting it programmatically. -->
      <Icon icon="{dateInputIcon}" width="{inputFontSize}" />
    </div>
  </div>
  {#if showCalendar}
    <div class="calendar-container" tabindex="-1" bind:this={activeCalendar} class:showCalendar transition:fly>
      <div class="triangle-up"></div>
      <Calendar
        on:focusout={handleHideCalendar}
        on:select={handleSelection}
        bind:value={$store}
        {min}
        {max}
        {locale}
        popup={true}
      />
    </div>
  {/if}
</div>

<style>
  .date-picker-container {
    position: relative;
    /* width: 100%; */

    & .fp-date-input-container {
      display: flex;
      border: var(--border-width-default) var(--border-style-default) var(--custom-date-picker-border-color, var(--border-color-default));
      border-radius: var(--border-radius);
      overflow: hidden;

      &:hover {
        box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
      }

      &.showCalendar {
        box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
      }

      &.disabled {
        border-color: var(--border-color-disabled);
        pointer-events: none;
      }

      & .fp-date-input {
        flex: 1;
        width: 100%;
        border: none;
        /* This `border-radius` style along with the `overflow: hidden` style in the `.fp-date-input-container` element will ensure that the background color goes all the way out to the border no matter how high or low the border radius value is. */
        border-radius: calc(var(--border-radius) - 10px) 0 0 calc(var(--border-radius) - 10px);
        outline: none;
        background-color: var(--custom-date-picker-bg-color, var(--bg-color-element-default));
        color: var(--custom-date-picker-text-color, inherit);

        &::placeholder {
          color: var(--custom-date-input-placeholder-text-color, var(--placeholder-color-default));
        }

        &:disabled {
          background-color: var(--bg-color-element-disabled);
          color: var(--text-color-disabled);
        }
      }

      & .fp-date-input-btn {
        display: flex;
        align-items: center;
        border-left: var(--border-default);
        border-radius: 0 calc(var(--border-radius) - 10px) calc(var(--border-radius) - 10px) 0;
        background-color: var(--custom-date-input-btn-bg-color, var(--border-color-default));
        color: var(--custom-date-input-btn-icon-color, inherit);
        cursor: pointer;

        &.disabled {
          border-color: var(--border-color-disabled);
          border-left-color: var(--text-color-disabled);
          background-color: var(--bg-color-element-disabled);
          color: var(--text-color-disabled);
          pointer-events: none;
        }
      }
    }
  }

  .calendar-container {
    position: absolute;
    margin-top: 2px;
    z-index: 10;
    outline: none;

    &.showCalendar {
      display: block;
    }

    & .triangle-up {
      width: 10px;
      height: 10px;
      border: 2px solid;
      border-color: var(--border-color-default);
      border-bottom: none;
      border-right: none;
      border-radius: 4px 0 0 0;
      /* Move the triangle down by 5px and over from the left by (border-radius + 10px). */
      margin: 0 auto -5px calc(var(--border-radius) + 10px);
      background-color: var(--white);
      transform: rotate(45deg);
      z-index: 100;
    }
  }
</style>
