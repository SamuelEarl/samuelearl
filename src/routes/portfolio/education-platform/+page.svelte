<script lang="ts">
  import PortfolioPage from "../PortfolioPage.svelte";
  import Phone from "/src/assets/images/education-platform/ti-iphone.png";
  import Tablet from "/src/assets/images/education-platform/ti-ipad.png";
  import Laptop from "/src/assets/images/education-platform/ti-macbook.png";
</script>

<PortfolioPage>
  <h1>Education Platform</h1>

  <p>The front-end is a single-page application (SPA) written with SvelteKit. Each page is designed to be completely mobile-responsive. All UI components (e.g. dropdown menus, accordion menus, modal dialog boxes, image dropzones) are either taken from my <a href="/open-source-projects">Fanny Pack UI</a> component library or are custom made for this app. The back-end uses serverless functions.</p>

  <div class="img-container">
    <img src={Phone} alt="phone" class="phone" />
    <img src={Tablet} alt="tablet" class="tablet" />
    <img src={Laptop} alt="laptop" class="laptop" />
  </div>

  <p>This platform allows users to create accounts, sign-in, create their own courses, and take courses. The platform administrator can grant or revoke permissions for various permissions levels. The course pages utilitize WYSIWYG editors with media plugins that allow users to type text or embed images and videos&mdash;similar to content management systems.</p>
</PortfolioPage>

<style>
  @media (--xs-up) {
    .img-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      & img {
        margin-bottom: 40px;
      }
    }
  }

  @media (--lg-up) {
    .img-container {
      flex-direction: row;
      justify-content: space-between;

      & img {
        height: 250px;
      }
    }
  }
</style>
