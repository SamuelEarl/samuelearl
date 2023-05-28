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
      <p>Studied business in college and understand the process for launching new products that will be successful (hint: Steve Blank teaches the process).</p>
    </div>
    <div class="ux-design">
      <h1>ux design</h1>
      <p>Budding UX Designer. Many companies do not have UX Designers on staff and I wanna help where I can!</p>
    </div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;

    & .image-wrapper {
      flex: 1;
      margin-right: 50px;
      
      & img {
        max-width: 400px;
      }
    }

    & .content-wrapper {
      flex: 1;

      & h1 {
        font-size: 4rem;
        font-weight: 900;
      }
    }
  }
</style>
