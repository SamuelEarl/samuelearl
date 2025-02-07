<script lang="ts">
  import { fly } from "svelte/transition";
  import Icon from "@iconify/svelte";
  
  // import { screenWidth } from "$lib/utils/index.svelte";

  const mainNav = [
    {
      label: "about",
      url: "/about",
    },
    {
      label: "portfolio",
      url: "/portfolio",
    },
    {
      label: "open source",
      url: "/open-source-projects",
    },
    {
      label: "blog",
      url: "/blog",
    },
    {
      label: "contact",
      url: "/contact",
    },
    // TODO: Instead of displaying code samples or code challenges, like from Ad Hoc LLC, I will just blog about those topics and show my code in my blogs.
    // {
    //   label: "code samples",
    //   url: "/code-samples",
    // },
  ];
</script>

<!-- 
  If I use an {#if} block here, then the mobile-nav will not transition
  into and out of the DOM. So I am using a `display: none` style rule instead. 
-->
<!-- {#if screenWidth < 1024} -->
  <nav class="mobile-nav" transition:fly>
    <ul class="mobile-nav-menu">
      <!-- Display the mainNav. -->
      {#each mainNav as item}
        <li class="main-nav-item">
          <a class="main-nav-link" href={item.url}>
            <span class="main-nav-link-label">{item.label}</span>
            <span class="main-nav-link-chevron"><Icon icon="mdi:chevron-right" width="24" /></span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
<!-- {:else} -->
  <div class="desktop-nav-wrapper">
    <nav class="desktop-nav">
      <ul>
        {#each mainNav as item}
          <li class="main-nav-item">
            <a class="main-nav-link" href={item.url}>{item.label}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
<!-- {/if} -->

<style>
  @media (--xs-up) {
    nav.desktop-nav {
      display: none;
    }

    nav.mobile-nav {
      position: relative;
      z-index: 100;

      & ul.mobile-nav-menu {
        position: absolute;
        width: 100%;
        /* The height of the mobile nav menu is 100vh minus the height of the header. */
        height: calc(100vh - 64px);
        z-index: 100;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        padding-top: 15px;
        list-style: none;
        background-color: var(--white);
        overflow-y: auto;
        border-bottom: var(--border-secondary);
        border-bottom-width: 3px;          

        & li.main-nav-item {            
          border-bottom: var(--border-default);
          margin: 0 10px;
          font-weight: bold;
          cursor: pointer;

          & .main-nav-link {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
            padding: 15px 5px;
            color: var(--text-color-default);

            & .main-nav-link-chevron {
              color: var(--primary-color);
            }
          }
        }
      }
    }
  }

  @media (--lg-up) {
    nav.mobile-nav {
      display: none;
    }

    nav.desktop-nav {
      display: block;

      & ul {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;

        & li {
          cursor: pointer;
        }
        
        & li.main-nav-item {
          position: relative;
          padding: 10px;
          margin: 0;
          border-bottom: none;
          color: var(--white);

          &:last-child {
            padding-right: 0;
            margin-right: 0;
          }

          & a.main-nav-link {
            border: none;
            padding: 10px;
            color: var(--white);

            &:last-child {
              padding-right: 0;
            }
          }
        }
      }
    }
  }
</style>
