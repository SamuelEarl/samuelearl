<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="project-page fp-container">
  {@render children?.()}
</div>

<style>
  @media (--xs-up) {
    .project-page {
      padding-top: 35px;
      padding-bottom: 50px;
    }
  }
</style>
