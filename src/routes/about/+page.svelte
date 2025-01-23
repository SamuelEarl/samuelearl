<script lang="ts">
  import Page from "/src/components/Page.svelte";
  import Photo from "/src/assets/images/profile-photos/profile-photo-transparent-background-crop-to-content.png";
</script>

<Page>
  <div class="top">
    <div class="left">
      <h1>Hi,<br>I'm Sam.</h1>
      <p>I'm a senior full-stack web developer based in a small city in Arizona and started working in web development in 2014. When I'm not creating software products, you'll find me spending time with my wife and children, catching up on sports, or doing church stuff.</p>
    </div>
    <div class="right">
      <img src={Photo} alt="profile" />
    </div>
  </div>
  <div slot="bottom" class="bottom">
    <h2>random facts</h2>
    <ul>
      <li><strong>I enjoy process improvement.</strong> In college I majored in business with an emphasis in information systems. I enjoyed my operations management classes in part because of the emphasis on process improvement and efficiency. I am often on the lookout for better ways to do things, whether that is looking for a webhosting solution that provides more value for the cost or finding better software frameworks to use for development or evaluating business processes and workflows for ways to make them more efficient.</li>
      <li><strong>I love learning new things.</strong> There are too many things that I want to learn: how to play soccer, basics of cybersecurity, UX and graphic design, how to cook authentic Japanese food, 3D printing so I can create fun gifts for people (I might want to learn how to sew for the same reason), how to create augmented reality apps, and on and on...</li>
      <li><strong>I like recording lessons that I've learned.</strong> I wouldn't consider myself a blogger, but I sort of enjoy writing lessons in tutorial format so I can refer back to them later. That process also helps me to learn things better.</li>
      <li><strong>I love creating stuff.</strong> When people ask me what I like to do for fun my answer is often, "I like to create stuff." I think everyone enjoys creating things, but we probably each enjoy creating things in different ways or through different mediums. Some people love sculpting. Others enjoy writing books or articles. Some people like creating businesses. One of the things I enjoy about software development is taking an idea and bringing it to life. I love getting lost in the creative process of software development. It really is a fun hobby.</li>
    </ul>
  </div>
</Page>

<style>
  @media (--xs-up) {
    .top {
      display: flex;
      flex-direction: column;
      /* margin-bottom: 40px; */

      & .left {
        margin-bottom: 20px;
      }

      & .right {
        display: flex;
        justify-content: center;
      }
    }

    .bottom {

      & h2 {
        margin-top: 0;
      }
    }
  }

  @media (--lg-up) {
    .top {
      flex-direction: row;
      justify-content: space-between;
      /* align-items: center; */

      & .left {
        flex: 1;

        & h1 {
          font-size: 4rem;
        }
      }

      & .right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
    }
  }
</style>
