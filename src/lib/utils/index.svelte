<script context="module">
  import { browser } from "$app/environment";

  export let screenWidth = 0;
  export let screenHeight = 0;

  if (browser) {
    screenWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    screenHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  }
</script>
