<script lang="ts">
  import Icon from "@iconify/svelte";
  import Page from "../../components/Page.svelte";
  import Bitmoji from "/src/assets/images/bitmojis/contact.png";
</script>

<Page>
  <div>
    <div class="left">
      <h1>contact</h1>
      <p>Get in touch with me through LinkedIn or email.</p>
      <div class="social-wrapper">
        <Icon icon="bi:linkedin" color="#0982c0" width="50" />
        <div class="label">LinkedIn</div>
      </div>
    </div>
    <div class="right">
      RIGHT
    </div>
  </div>

  <div slot="bottom">
    Send me an email
  </div>
</Page>

<style>
  @media (--xs-up) {
    .social-wrapper {
      margin-top: 30px;
      display: flex;
      align-items: center;

      & .label {
        margin-left: 10px;
        font-size: 2rem;
        color: #0982c0;
      }
    }
  }
</style>
