<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import Icon from "@iconify/svelte";
  import { Button } from "/src/components";
  import MainNav from "./MainNav.svelte";
  // import Photo from "/src/assets/images/profile-photo-gray-scale-round-200x200.png";

  let showMobileMainNav = $state(false);

  // On mobile clear the MainNav after a user navigates so it
  // is not still displaying after a user has clicked a link.
  afterNavigate(async (params) => {
    showMobileMainNav = false;
  });
</script>

<header class="fp-container">
  <div class="mobile-main-nav-btn-wrapper">
    {#if showMobileMainNav}
      <Button
        btnIcon=""
        padding="0px"
        bgColor="var(--transparent)"
        borderColor="var(--transparent)"
        textColor="var(--text-color-default)"
        on:click={() => showMobileMainNav = false}
      >
        <Icon icon="mdi:close" width=40 color="var(--white)" />
      </Button>
    {:else}
      <Button
        btnIcon=""
        padding="0px"
        bgColor="var(--transparent)"
        borderColor="var(--transparent)"
        textColor="var(--text-color-default)"
        on:click={() => showMobileMainNav = true}
      >
        <Icon icon="mdi:menu" width=40 color="var(--white)" />
      </Button>
    {/if}
  </div>
  <div class="photo-wrapper">
    <a href="/" class="home-link">
      <!-- <img src={Photo} class="photo" alt="profile" /> -->
      <span class="name">
        <span class="first">Samuel</span>
        <span class="last">Earl</span>
      </span>
    </a>
  </div>
  <div class="main-nav-and-login-wrapper">
    <div class="main-nav-wrapper-lg-screen">
      <MainNav />
    </div>
    <!-- I might use this <div class="spacer"> element until I am ready to include the login button for the app. -->
    <!-- TODO: At that point I will delete this <div class="spacer"> element. -->
    <div class="spacer">
      <Icon icon="mdi:menu" width=40 color="transparent" />
    </div>
  </div>
</header>

{#if showMobileMainNav}
  <MainNav />
{/if}

<style>
  @media (--xs-up) {
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      padding-bottom: 10px;

      & .home-link {
        display: flex;
        align-items: center;
        border-bottom: none;

        & .photo {
          height: 40px;
        }

        & .name {
          color: var(--white);

          & .first {
            font-weight: 900;
            margin-right: -4px;
          }

          & .last {
            font-weight: 300;
          }
        }
      }

      & .main-nav-and-login-wrapper {

        & .main-nav-wrapper-lg-screen {
          display: none;
        }
      }
    }
  }

  @media (--lg-up) {
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .mobile-main-nav-btn-wrapper {
        display: none;
      }

      & .main-nav-and-login-wrapper {
        display: flex;

        & .main-nav-wrapper-lg-screen {
          display: block;
        }

        & .spacer {
          display: none;
        }

        & .login-btn-wrapper {
          margin-left: 20px;
        }
      }
    }
  }
</style>
