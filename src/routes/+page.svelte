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
      <div class="business">
        <h1>business strategy</h1>
        <p>Studied business in college and understand <a href="http://www.google.com/search?q=steve+blank+how+to+build+a+startup" target="_blank">the process for successful product launches</a> (as opposed to failed product launches&mdash;ouch).</p>
      </div>
      <div class="ux-design">
        <h1>ux design</h1>
        <p>Budding UX Designer. Many companies do not have UX Designers on staff and I wanna help where I can!</p>
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
