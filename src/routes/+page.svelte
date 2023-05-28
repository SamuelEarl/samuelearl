<script lang="ts">
  import Bitmoji from "/src/assets/images/bitmoji.png";
</script>

<div class="wrapper">
  <div class="image-wrapper">
    <img src={Bitmoji} alt="bitmoji" />
  </div>
  <div class="content-wrapper">
    <div class="frontend">
      <h1>frontend</h1>
      <p>Senior frontend developer specializing in Svelte, React, D3.js &amp; data visualizations, and whatever you need.</p>
    </div>
    <div class="backend">
      <h1>backend</h1>
      <p>Senior backend developer with experience in Node.js, Python, SQL &amp; NoSQL databases, serverless, and always learning more.</p>
    </div>
    <div class="business">
      <h1>business</h1>
      <p>Studied business in college and understand the process for launching new products that will be successful<br> (hint: Steve Blank teaches this process).</p>
    </div>
    <div class="ux-design">
      <h1>ux design</h1>
      <p>Budding UX Designer. Many companies do not have UX Designers on staff and I wanna help where I can!</p>
    </div>
  </div>
</div>

<style>
  @media (--xs-up) {
    .wrapper {
      display: flex;
      flex-direction: column;

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
        flex: 1;
        margin: 0;
        margin-right: 50px;
        
        & img {
          height: auto;
          max-width: 400px;
        }
      }

      & .content-wrapper {
        flex: 1;
      }
    }
  }
</style>
