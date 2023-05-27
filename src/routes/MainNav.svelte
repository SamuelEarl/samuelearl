<script lang="ts">
  import { getContext } from "svelte";
  import { goto, beforeNavigate } from "$app/navigation";
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
      label: "open source projects",
      url: "/open-source-projects",
    },
    {
      label: "contact",
      url: "/contact",
    },
    // {
    //   label: "code samples",
    //   url: "/code-samples",
    // },
  ];

  // let backBtnText = "";
  // let displayedNav = mainNav;
  // let dropdownNav = null;

  // // Clear the dropdownNav when a user navigates so the subnav
  // // is not still displaying after a user has clicked a link.
  // beforeNavigate(async (params) => {
  //   dropdownNav = null;
  // });
</script>

<!-- 
  If I use an {#if} block here, then the mobile-nav will not transition
  into and out of the DOM. So I am using a `display: none` style rule instead. 
-->
<!-- {#if screenWidth < 1024} -->
  <nav class="mobile-nav" transition:fly|local>
    <ul class="mobile-nav-menu">
      <!-- Display the mainNav. -->
      <!-- {#if displayedNav === mainNav} -->
        {#each mainNav as item}
          <li class="main-nav-item">
            <a class="main-nav-link" href={item.url}>
              <span class="main-nav-link-label">{item.label}</span>
              <span class="main-nav-link-chevron"><Icon icon="mdi:chevron-right" width="24" /></span>
            </a>
          </li>
        {/each}
      <!-- Display a subnav. -->
      <!-- {:else}
        Add a "Back" button to the top of the subnav.
        <li class="nav-item subnav-item go-back-wrapper" on:click={() => displayedNav = mainNav}>
          <span class="back-chevron"><Icon icon="mdi:chevron-left" width="24" /></span>
          <span>{backBtnText}</span>
        </li>
        Loop through the subnav and display each item.
        {#each displayedNav as item}
          <li class="nav-item subnav-item">
            <a class="subnav-link" href={item.url}>{item.label}</a>
          </li>
        {/each}
      {/if} -->
    </ul>
  </nav>
<!-- {:else} -->
  <div class="desktop-nav-wrapper">
    <nav class="desktop-nav">
      <ul>
        {#each mainNav as item}
          <li class="main-nav-item">
            <a class="main-nav-link" href={item.url}>{item.label}</a>
            <!-- {item.mainNavItemHeading}
            {#if dropdownNav && dropdownNav === item.subNav}
              <ul class="dropdown-menu">
                {#each dropdownNav as item}
                  <li class="dropdown-item">
                    <a class="dropdown-link" href={item.url}>{item.label}</a>
                  </li>
                {/each}
              </ul>
            {/if} -->
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

        /* & li.nav-item { */
          

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

          /* &.subnav-item {

            &.go-back-wrapper {
              justify-content: flex-start;
              padding: 15px 5px 25px 5px;
              color: var(--primary-color);

              & .back-chevron {
                margin-right: 5px;
              }
            }

            & a.subnav-link {
              display: block;
              width: 100%;
              border: none;
              padding: 15px 5px;
              color: var(--text-color-default);
            }
          } */
        /* } */
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

          /* & ul.dropdown-menu {
            position: absolute;
            top: 40px;
            left: 10px;
            width: 350px;
            display: flex;
            flex-direction: column;
            margin: 0;
            list-style: none;
            border: var(--border-default);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow-depth);
            background-color: var(--white);

            & li.dropdown-item {
              margin-bottom: 0;

              & a.dropdown-link {
                display: block;
                width: 100%;
                border: none;
                padding: 10px;
                color: var(--text-color-default);
                
                &:hover {
                  background-color: var(--bg-color-hover);
                }
              }
            }
          } */
        }
      }
    }
  }
</style>
