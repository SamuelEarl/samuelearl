<script lang="ts">
  import { setContext } from "svelte";
	import Header from "./Header.svelte";
	import FooterTop from "./FooterTop.svelte";
  import FooterBottom from "./FooterBottom.svelte";
	import "/src/assets/styles/main.css";
</script>

<svelte:head>
	<title>Samuel Earl - Senior Full-Stack Software Developer</title>
</svelte:head>

<div class="layout">
	<div class="header-wrapper">
		<Header />
	</div>
  <main class="fp-container">
    <slot />
  </main>
	<div class="footer-top-wrapper">
		<FooterTop />
	</div>
  <!-- <div class="footer-bottom-wrapper">
		<FooterBottom />
	</div> -->
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
        padding-top: 35px;
        padding-bottom: 50px;
      }

      & .footer-top-wrapper {
        box-shadow: inset 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
        background-color: var(--neutral-200);
      }

      & .footer-bottom-wrapper {
        border-top: 1px solid var(--black);
        background-color: var(--secondary-color);
      }
    }
  }
</style>
