<script lang="ts">
  import Page from "/src/components/Page.svelte";
  import OpenSourceProjects from "/src/assets/images/bitmojis/open-source-projects.png";
  import FannyPackUILogo from "/src/assets/images/fanny-pack-ui/fanny-pack-ui-logo.png";
</script>

<Page>
  <div class="top">
    <div class="left">
      <h1>open source projects</h1>
      <p>I have contributed to a few open source projects over the years, but I am most excited about this UI component library that I am creating.</p>
    </div>
    <div class="right">
      <img src={OpenSourceProjects} alt="open source projects" />
    </div>
  </div>
  <div slot="bottom" class="bottom">
    <div class="img-container">
      <a href="https://fanny-pack-ui.pages.dev/" target="_blank">
        <img src={FannyPackUILogo} alt="Fanny Pack UI Logo" />
      </a>
    </div>
    <div class="content-container">
      <p>When creating web apps it is really helpful to use a UI component library to maintain a consistent theme throughout the app. There are a lot of great component libraries already available, but they often follow popular design systems (e.g. Google's Material UI). That is great if you don't mind your app looking like a Google product, but a lot of companies have their own design systems, which require custom-styled components.</p>
      <p>So I decided to create my own component library that has a fully customizable theme. You can check it out: <a href="https://fanny-pack-ui.pages.dev/" target="_blank">Fanny Pack UI</a>.</p>
      <p><strong>Heads-up:</strong> This project is still a work in progress, so I don't recommend that other developers use the components yet. However, each component is thoroughly documented and there are plenty of comments throughout the code in case someone wants to copy, paste, and modify any of the components.</p>
    </div>
  </div>
</Page>

<style>
  @media (--xs-up) {
    .top {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      & .left {
        margin-bottom: 20px;
      }
    }

    .bottom {

      & .img-container {
        margin-bottom: 40px;
      }
    }
  }

  @media (--lg-up) {
    .top {
      flex-direction: row;

      & .left {
        flex: 1;
        margin-right: 50px;
      }

      & .right {
        flex: 1;
      }
    }

    .bottom {

      & .img-container {
        float: left;
        margin-right: 50px;
      }

      & .content-container {
        flex: 4;
      }
    }
  }
</style>
