<script lang="ts">
  import Page from "/src/components/Page.svelte";
  import Portfolio from "/src/assets/images/bitmojis/portfolio.png";
  import HomepageOpenMenu from "/src/assets/images/data-scientist-dashboard/homepage-open-menu.png";
  import LossPredictorHomepage from "/src/assets/images/loss-predictor/homepage.png";
  import InteractiveCharts from "/src/assets/images/data-dashboard/interactive-charts.gif";
  import BudgetAppMobile from "/src/assets/images/personal-finance-app/budget-app-mobile-1.png";
  import SearchForPeople from "/src/assets/images/hr-app/search-for-people.gif";
  import CMS from "/src/assets/images/cms/cms-pages.png";
  import Education from "/src/assets/images/education-platform/ti-ipad.png";

  const projects = [
    { 
      src: HomepageOpenMenu, 
      alt: "data scientist dashboard",
      description: "Data Scientist Dashboard",
      url: "data-scientist-dashboard",
      wrapperStyle: "justify-content: flex-end;",
      imgStyle: "margin-right: -25px; box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.4);",
    },
    { 
      src: LossPredictorHomepage, 
      alt: "claims loss predictor",
      description: "Claims Loss Predictor",
      url: "claims-loss-predictor",
      wrapperStyle: "justify-content: flex-end;",
      imgStyle: "margin-right: -25px; box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.4);",
    },
    { 
      src: InteractiveCharts, 
      alt: "real-time data dashboard",
      description: "Real-time Data Dashboard",
      url: "real-time-data-dashboard",
      wrapperStyle: "justify-content: flex-end;",
      imgStyle: "margin-right: -25px; box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.4);",
    },
    { 
      src: BudgetAppMobile, 
      alt: "personal finance app",
      description: "Personal Finance App",
      url: "personal-finance-app",
      wrapperStyle: "justify-content: center;",
      imgStyle: "height: 100%; margin-bottom: -50px;",
    },
    { 
      src: SearchForPeople, 
      alt: "HR app",
      description: "Human Resources App",
      url: "hr-app",
      wrapperStyle: "justify-content: flex-end;",
      imgStyle: "margin-right: -25px; box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.4);",
    },
    { 
      src: Education, 
      alt: "education platform",
      description: "Education Platform",
      url: "education-platform",
      wrapperStyle: "justify-content: center;",
      imgStyle: "height: 100%; margin-bottom: -50px;",
    },
    { 
      src: CMS, 
      alt: "content management system",
      description: "Content Management System (CMS)",
      url: "cms",
      wrapperStyle: "justify-content: center; padding: 5px;",
      imgStyle: "",
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
      <div class="box-wrapper">
        <a href={`/portfolio/${project.url}`}>
          <div class="box">
            <div class="thumbnail-wrapper" style={project.wrapperStyle}>
              <img src={project.src} alt={project.alt} class="thumbnail" style={project.imgStyle} />
            </div>
            <div class="description">{project.description}</div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</Page>

<style>
  @media (--xs-up) {
    .top {
      display: flex;
      flex-direction: column;
      padding-bottom: 40px;

      & .left {
        padding-bottom: 30px;
      }

      & .right {
        display: flex;
        justify-content: center;

        & img {
          width: 300px;
        }
      }
    }

    .portfolio-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;

      & .box {
        padding: 8px;
        border-radius: var(--border-radius);
        box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.3);
        color: var(--text-color-default);

        &:hover {
          box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.3);
        }

        & .thumbnail-wrapper {
          height: 250px;
          display: flex;
          align-items: center;
          border-radius: var(--border-radius) var(--border-radius) 0 0;
          overflow: hidden;
          background-color: var(--neutral-200);
        }

        & .description {
          height: 60px;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  @media (--lg-up) {
    .top {
      flex-direction: row;

      & .left {
        flex: 1;
        padding: 0;
      }

      & .right {
        flex: 1;
      }
    }

    .portfolio-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
