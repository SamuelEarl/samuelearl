<script lang="ts">
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import "/src/assets/styles/main.css";
</script>

<svelte:head>
	<title>Samuel Earl - Software Developer | Business Strategy | UX Design</title>
</svelte:head>

<div class="layout">
	<div class="header-wrapper">
		<Header />
	</div>
  <main>
    <slot />
  </main>
	<div class="footer-wrapper">
		<Footer />
	</div>
</div>

<style>
  @media (--xs-up) {
    .layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;

      & .header-wrapper {
        position: sticky;
        top: 0;
        background-color: var(--secondary-color);
        box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.5);
      }

      & main {
        flex: 1;
        width: 100%;
        /* padding-top: 35px; */
        /* padding-bottom: 50px; */
      }

      & .footer-wrapper {
        box-shadow: inset 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
        background-color: var(--neutral-200);
      }
    }
  }
</style>
