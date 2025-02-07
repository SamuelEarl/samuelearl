<script lang="ts">
  

  interface Props {
    // import Icon from "@iconify/svelte";
    spinnerSize?: number;
    msg?: string;
    msgFontSize?: string;
    msgIsAboveSpinner?: boolean;
  }

  let {
    spinnerSize = 60,
    msg = "",
    msgFontSize = "2.5rem",
    msgIsAboveSpinner = false
  }: Props = $props();
</script>

<div class="loading-wrapper">
  {#if msg && msgIsAboveSpinner}
    <div class="loading-message-above" style={`font-size: ${msgFontSize};`}>{msg}</div>
  {/if}
  <!-- <div><Icon icon="icomoon-free:spinner2" width={spinnerSize} class="fp-spin" /></div> -->
  <!--
    How to copy the SVG code of an icon so it loads quickly in your app:
    * Inspect the SVG element.
    * In DevTools, right-click on the <svg> element.
    * Select "Copy" >> "Copy element".
    * Paste the SVG code in your component.
  -->
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="fp-spin iconify iconify--icomoon-free" width={spinnerSize} height={spinnerSize} viewBox="0 0 16 16"><path fill="currentColor" d="M16 8a7.917 7.917 0 0 0-2.431-5.568A7.776 7.776 0 0 0 5.057.896c-.923.405-1.758.992-2.449 1.712S1.371 4.182 1.011 5.105a7.531 7.531 0 0 0 .115 5.742c.392.892.961 1.7 1.658 2.368S4.307 14.41 5.2 14.758a7.286 7.286 0 0 0 2.799.493a7.157 7.157 0 0 0 6.526-4.547a6.98 6.98 0 0 0 .415-1.622l.059.002a1 1 0 0 0 .996-1.083h.004zm-1.589 2.655c-.367.831-.898 1.584-1.55 2.206s-1.422 1.112-2.254 1.434a6.759 6.759 0 0 1-2.608.454a6.676 6.676 0 0 1-4.685-2.065a6.597 6.597 0 0 1-1.38-2.173a6.514 6.514 0 0 1 .116-4.976c.342-.77.836-1.468 1.441-2.044s1.321-1.029 2.092-1.326c.771-.298 1.596-.438 2.416-.416s1.629.202 2.368.532c.74.329 1.41.805 1.963 1.387s.988 1.27 1.272 2.011a6.02 6.02 0 0 1 .397 2.32h.004a1 1 0 0 0 .888 1.077a6.872 6.872 0 0 1-.481 1.578z"></path></svg>
  </div>

  {#if msg && !msgIsAboveSpinner}
    <div class="loading-message-below" style={`font-size: ${msgFontSize};`}>{msg}</div>
  {/if}
</div>

<style>
  .loading-wrapper {
    width: 100%;
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .loading-message-above {
      margin-bottom: 20px;
    }

    & .loading-message-below {
      margin-top: 20px;
    }
  }
</style>
