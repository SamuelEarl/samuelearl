<script lang="ts">
  import Page from "/src/components/Page.svelte";
  import Bitmoji from "/src/assets/images/bitmojis/homepage.png";
</script>

<Page>
  <div class="wrapper">
    <div class="image-wrapper">
      <img src={Bitmoji} alt="bitmoji" />
    </div>
    <div class="content-wrapper">
      <div class="frontend">
        <h1>frontend</h1>
        <p>Senior frontend developer specializing in Svelte, React, D3.js, and data visualization. Always up for learning new things.</p>
      </div>
      <div class="backend">
        <h1>backend</h1>
        <p>Senior backend developer with experience in Node.js, Python, SQL databases, NoSQL databases, and serverless functions.</p>
      </div>
      <div class="ux-design">
        <h1>ml & ai</h1>
        <p>Experience creating <span class="tooltip">ML<span class="tooltip-text">Machine Learning</span></span> / <span class="tooltip">AI<span class="tooltip-text">Artificial Intelligence</span></span> scripts for end-user products and working with data scientists on data intensive projects.
      </div>
      <div class="business">
        <h1>business strategy</h1>
        <p>Studied business in college and understand <a href="http://www.google.com/search?q=steve+blank+how+to+build+a+startup" target="_blank">the process for successful product launches</a> (as opposed to failed product launches&mdash;ouch).</p>
      </div>
    </div>
  </div>
</Page>

<style>
  @media (--xs-up) {
    .wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;

      & .image-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
        
        & img {
          height: 200px;
        }
      }
    }

    /* Tooltip container */
    .tooltip {
      position: relative;
      display: inline-block;
      border-bottom: 1px dotted black; /* If you want dots under the hoverable text */

      /* Tooltip text */
      & .tooltip-text {
        visibility: hidden;
        /* width: 120px; */
        width: 220px;
        background-color: #555;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;

        /* Position the tooltip text */
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -110px;

        /* Fade in tooltip */
        opacity: 0;
        transition: opacity 0.3s;

        /* Tooltip arrow */
        &::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #555 transparent transparent transparent;
        }
      }

      /* Show the tooltip text when you mouse over the tooltip container */
      &:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  @media (--lg-up) {
    .wrapper {
      flex-direction: row;

      & .image-wrapper {
        display: block;
        flex: 3;
        margin: 0;
        margin-right: 40px;
        
        & img {
          height: auto;
          max-width: 400px;
        }
      }

      & .content-wrapper {
        flex: 4;
      }
    }
  }
</style>
