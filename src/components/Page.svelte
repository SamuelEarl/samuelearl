<script lang="ts">
  interface Props {
    heading?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    bottom?: import('svelte').Snippet;
  }

  let { heading, children, bottom }: Props = $props();
	
</script>

<div class="page">
  {#if heading}
    <div class="heading-wrapper fp-container">
      {@render heading?.()}
    </div>
  {/if}
  <div class="main-content-wrapper fp-container">
    {@render children?.()}
  </div>
  {#if bottom}
    <div class="bottom-content-outer">
      <div class="bottom-content-inner fp-container">
        {@render bottom?.()}
      </div>
    </div>
  {/if}
</div>

<style>
  @media (--xs-up) {
    .page {
      /* view height - header - footer */
      min-height: calc(100vh - 70px - 110px);
      display: flex;
      flex-direction: column;
      padding-top: 35px;

      & .heading-wrapper {
        width: 100%;
      }

      & .main-content-wrapper {
        flex: 1;
        width: 100%;
      }

      & .bottom-content-outer {
        padding: 60px 0;
        box-shadow: inset 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
        background-color: var(--neutral-50);
      }
    }
  }
</style>
