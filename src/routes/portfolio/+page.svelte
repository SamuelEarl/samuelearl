<script lang="ts">
  import Page from "/src/components/Page.svelte";
  import Portfolio from "/src/assets/images/bitmojis/portfolio.png";
  import AutoAdjustingCharts from "/src/assets/images/data-dashboard/auto-adjusting-charts.gif";
  import BudgetAppMobile from "/src/assets/images/personal-finance-app/budget-app-mobile-1.png";
  import SearchForPeople from "/src/assets/images/hr-app/search-for-people.gif";
  import CMS from "/src/assets/images/cms/cms-pages.png";
  import Education from "/src/assets/images/education-app/ti-ipad.png";

  const projects = [
    { 
      src: AutoAdjustingCharts, 
      alt: "real-time data dashboard",
      description: "Real-time Data Dashboard",
      wrapperStyle: "justify-content: flex-end;",
      imgStyle: "margin-right: -25px; box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.4);",
    },
    { 
      src: BudgetAppMobile, 
      alt: "personal finance app",
      description: "Personal Finance App",
      wrapperStyle: "justify-content: center;",
      imgStyle: "height: 100%; margin-bottom: -50px;",
    },
    { 
      src: SearchForPeople, 
      alt: "HR app",
      description: "Human Resources App",
      wrapperStyle: "justify-content: flex-end;",
      imgStyle: "margin-right: -25px; box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.4);",
    },
    { 
      src: CMS, 
      alt: "content management system",
      description: "Content Management System (CMS)",
      wrapperStyle: "justify-content: center; padding: 5px;",
      imgStyle: "",
    },
    { 
      src: Education, 
      alt: "education app",
      description: "Education App",
      wrapperStyle: "justify-content: center;",
      imgStyle: "height: 100%; margin-bottom: -50px;",
    },
  ];
</script>

<Page>
  <!-- <h1 slot="heading">portfolio</h1> -->
  <div class="top">
    <div class="left">
      <h1>portfolio</h1>
      <div>These are just a few of the projects that I have created at start-ups, large corporations, and as a consultant.</div>
    </div>
    <div class="right"><img src={Portfolio} alt="portfolio" /></div>
  </div>
  <div slot="bottom" class="portfolio-grid">
    {#each projects as project}
      <div class="box">
        <div class="thumbnail-wrapper" style={project.wrapperStyle}>
          <img src={project.src} alt={project.alt} class="thumbnail" style={project.imgStyle} />
        </div>
        <div class="description">{project.description}</div>
      </div>
    {/each}
  </div>
</Page>

<style>
  @media (--xs-up) {
    .portfolio-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 30px;

      & .box {
        padding: 8px;
        border-radius: var(--border-radius);
        box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.2);

        & .thumbnail-wrapper {
          height: 250px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: var(--neutral-200);

          & .thumbnail {
            /* box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.4); */
          }
        }

        & .description {
          height: 60px;
          display: flex;
          align-items: center;
        }
      }
    }

    .top {
      display: flex;
      padding-bottom: 40px;

      & .left, & .right {
        flex: 1;
      }

      & .right {
        display: flex;
        justify-content: center;

        & img {
          width: 300px;
        }
      }
    }
  }
</style>
