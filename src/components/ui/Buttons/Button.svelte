<!-- @migration-task Error while migrating Svelte code: migrating this component would require adding a `$props` rune but there's already a variable named props.
     Rename the variable and try again or migrate by hand. -->
<!-- TODO: I should remove this module and figure out a different way to create the interactive feature in the Buttons doc page. -->
<script module lang="ts">
  export interface IComponentProps {
    type: "button"|"submit";
    bgColor: string;
    borderColor: string;
    textColor: string;
    disabled: boolean;
  }

  export const componentProps:IComponentProps = {
    type: "button",
    bgColor: "var(--btn-default-bg-color)",
    borderColor: "var(--btn-default-border-color)",
    textColor: "var(--btn-default-text-color)",
    // padding: "var(--btn-default-padding)",
    // fontSize: "var(--btn-default-font-size)",
    // width: "auto",
    disabled: false,
    // formIsInvalid: false,
    // btnIcon: "",
    // btnIconDisabled: "icomoon-free:spinner2",
    // btnIconSide: "right",
    // btnIconDisabledShouldSpin: true,
    // rotateBtnIcon: "0deg",
    // rotateBtnIconDisabled: "0deg",
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Snippet } from "svelte";
  import Icon from "@iconify/svelte";
  import { delay } from "/src/components/utils";

  
  interface Props {
    type?: string;
    id?: string;
    classes?: string;
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
    padding?: string;
    fontSize?: string;
    // export let hollow = false;
    width?: string;
    disabled?: boolean;
    formIsInvalid?: boolean;
    btnIcon?: string;
    btnIconDisabled?: string;
    btnIconSide?: string;
    btnIconDisabledShouldSpin?: boolean; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).
    rotateBtnIcon?: string;
    rotateBtnIconDisabled?: string;
    btnTextDisabled?: Snippet;
    children?: Snippet;
    [key: string]: any
  }

  let {
    type = "button",
    id = "",
    classes = "",
    bgColor = "var(--btn-default-bg-color)",
    borderColor = "var(--btn-default-border-color)",
    textColor = "var(--btn-default-text-color)",
    padding = "var(--btn-default-padding)",
    fontSize = "var(--btn-default-font-size)",
    width = "auto",
    disabled = false,
    formIsInvalid = false,
    btnIcon = "",
    btnIconDisabled = "icomoon-free:spinner2",
    btnIconSide = "right",
    btnIconDisabledShouldSpin = true,
    rotateBtnIcon = "0deg",
    rotateBtnIconDisabled = "0deg",
    btnTextDisabled,
    children,
    ...rest
  }: Props = $props();

  // console.log("BUTTON children:", !!children);
  // console.log("BUTTON btnTextDisabled:", !!btnTextDisabled);
  // console.log("BUTTON rest:", rest.testProp);

  const dispatch = createEventDispatcher();

  // Set the background, border, outline, and text colors.
  const btnColorStyles = `background-color:${bgColor}; border-color:${borderColor}; outline-color:${borderColor}; color:${textColor};`;
  // Set the padding and font sizes.
  const btnSizeStyles = `padding:${padding}; font-size:${fontSize};`;

  // If no button text snippets are passed to this component, then `btnTextSnippetsExist` will be `false`.
  const btnTextSnippetsExist = !!children || !!btnTextDisabled;

  /**
   * NOTE: These `btnIconStyles` will only be applied to <Button> 
   * components that have both a `btnIcon` and `btnIconDisabled` prop.
   * They will NOT be applied to icons that are passed in a snippet.
   */
  function getBtnIconStyles() {
    let iconStyles = "";
    // Icon Buttons do not have any text. So if no button text snippets are passed to this component, then `btnTextSnippetsExist` will be false and no `order` or `margin` styles will be set on the icon.
    if (btnTextSnippetsExist) {
      if (btnIconSide === "left") {
        // iconStyles = `order: -9999; margin-right: calc(${fontSize} - 5px);`;
        iconStyles = `order: -9999; margin-right: 5px;`;
      }
      if (btnIconSide === "right") {
        // iconStyles = `order: 9999; margin-left: calc(${fontSize} - 5px);`;
        iconStyles = `order: 9999; margin-left: 5px;`;
      }
    }
    return iconStyles;
  }
  const btnIconStyles = getBtnIconStyles();

  // ---------------------------------------------------
  // The following functions add button styles for 
  // mouse events, keyboard events, and touch screens.
  // ---------------------------------------------------
  function addOutline(event) {
    if (disabled) return;
    event.target.style.outlineWidth = "2px";
    // If the user tabs over to the button, then change the outlineStyle to "dashed".
    if (event.key === "Tab") {
      event.target.style.outlineStyle = "dashed";
    }
  }

  function removeOutline(event) {
    event.target.style.outlineWidth = "0";
    // When the button loses focus, then reset the outlineStyle to the default style.
    event.target.style.outlineStyle = "solid";
  }

  // When a hovers over a button with a mouse, then the hover event will already add a 2px outline. This function adds extra width to the outline to give it the feel of being clicked when a user clicks a button with their mouse.
  function addExtraOutline(event) {
    if (disabled) return;
    event.target.style.outlineWidth = "4px";
  }

  function removeExtraOutline(event) {
    event.target.style.outlineWidth = "2px";
  }
</script>

<!-- If the button is a "submit" button in a form and if the `formIsInvalid` then disable the button, but do NOT show the disabled icon or text. Just prevent the user from submitting the form. -->
<!-- Even though I am using hover states to add and remove the button outline, I need to use on:mouseenter and on:mouseleave in order to add and remove the button outline after a user clicks a button. If I don't use those mouse event listeners, then the outlineWidth will not get reset to its default size when a user hovers away from the button. -->
<button
  {type}
  {id}
  class={`fp-btn ${type === "submit" && formIsInvalid ? "form-is-invalid" : ""} ${borderColor === "transparent" ? "transparent-border" : "non-transparent-border"} ${classes}`}
  style={`${btnColorStyles} ${btnSizeStyles} ${width === "full" ? "width: 100%" : ""}`}
  {disabled}
  {...rest}
  onmouseenter={addOutline}
  onmouseleave={removeOutline}
  onkeyup={addOutline}
  onblur={removeOutline}
  onclick={async (event) => {
    addExtraOutline(event);
    await delay(150);
    removeExtraOutline(event);
    dispatch("click");
    // NOTE: The `onclick` listener will be trigger when any equivalent keyboard events occur (e.g. `onkeyup`), so only the `onclick` listener is needed for interactive elements, such as buttons.
    // So do not dispatch a "click" event from any keyboard listeners (e.g. `onkeyup`) because the keyboard listeners appear to duplicate the functionality of the `onclick` listener.
  }}
  ontouchstart={addOutline}
  ontouchend={async (event) => {
    await delay(150);
    removeOutline(event);
  }}
>
  <!-- Button Text -->
  {#if btnTextDisabled && disabled}
    {#if btnTextDisabled}
      {@render btnTextDisabled()}
    {/if}
  {:else}
    {#if children}
      {@render children()}
    {/if}
  {/if}

  <!-- Button Icon -->
  <!-- If the btnIcon and the btnIconDisabled both exist, then display the icon. If either the btnIcon or btnIconDisabled is an empty string, then no icons will be displayed with the button. See the docs for details. -->
  {#if btnIcon && btnIconDisabled}
    <!-- If the button is a "submit" button in a form and if the `formIsInvalid` then disable the button, but do NOT show the disabled icon or text. Just prevent the user from submitting the form. -->
    {#if type === "submit" && formIsInvalid}
      <Icon icon={btnIcon} style={`${btnIconStyles} transform:rotate(${rotateBtnIcon});`} />
    <!-- If the button is disabled, then... -->
    {:else if disabled}
      <!-- NOTE: You can NOT dynamically bind classes to a component instance, so the <Icon /> component has to be repeated a couple of times - once for the "fp-spin" class and once without. -->
      {#if btnIconDisabledShouldSpin}
        <!-- ...show a spinning disabled icon. -->
        <Icon icon={btnIconDisabled} style={`${btnIconStyles}`} class="fp-spin" />
      {:else}
        <!-- ...or show a non-spinning disabled icon. -->
        <Icon icon={btnIconDisabled} style={`${btnIconStyles} transform:rotate(${rotateBtnIconDisabled});`} />
      {/if}
    <!-- If the button is not disabled, then show the btnIcon. -->
    {:else}
      <Icon icon={btnIcon} style={`${btnIconStyles} transform:rotate(${rotateBtnIcon});`} />
    {/if}
  {/if}
</button>

<style>
  @media (--xs-up) {
    .fp-btn {
      border-width: 2px;
      border-style: solid;
      outline-width: 0;
      outline-style: solid;
      font-weight: bold;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;

      /* Since I have to use on:mouseenter and on:mouseout to reset the outlineWidth, I don't know if this hover rule is actually doing anything. But I am leaving it here just in case is does affect the button styles. */
      /* &:hover {
        outline-width: 2px;
      } */

      &:disabled {
        filter: var(--disabled-filter);
        /* outline-color: var(--border-color-disabled) !important; */
        /* NOTE: Setting `pointer-events: none` actually activated the pointer-events. Weird. */
        /* pointer-events: none !important; */
      }

      /* TODO: I can probably remove all the commented styles and any classes that are no longer being used. */
      /* &.non-transparent-border:disabled {
        background-color: var(--bg-color-element-disabled) !important;
        border-color: var(--border-color-disabled) !important;
        color: var(--text-color-disabled) !important;
      } */

      &.form-is-invalid {
        outline-width: 0 !important;
        /* See my note under the :disabled styles. */
        /* pointer-events: none !important; */
        /* background-color: var(--bg-color-element-disabled) !important;
        border-color: var(--border-color-disabled) !important;
        color: var(--text-color-disabled) !important; */
      }
    }
  }
</style>
