<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="blog-layout fp-container">
  {@render children?.()}
</div>

<style>
  @media (--xs-up) {
    .blog-layout {
      /* I am using padding-top and padding-bottom instead of the shorthand `padding: 20px 0;` so it does not affect the padding from the `fp-container` class. */
      padding-top: 35px;
      padding-bottom: 20px;
    }
  }
</style>
