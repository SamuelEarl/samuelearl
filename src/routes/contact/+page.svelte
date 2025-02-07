<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Button, Input, Textarea } from "/src/components";
  import Page from "/src/components/Page.svelte";
  import Bitmoji from "/src/assets/images/bitmojis/contact.png";

  let name = "";
  let subject = "";
  let email = "";
  let message = "";
  let disabled = false;
  $: checkFormValidation = () => {
    let isInvalid = true;
    if (name && subject && email && message) {
      isInvalid = false;
    }
    return isInvalid;
  }
</script>

<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<Page>
  <!-- <h1 slot="heading">contact</h1> -->
  <div class="top">
    <div class="left">
      <h1>contact</h1>
      <!-- <p>Get in touch with me through LinkedIn or send me an email.</p> -->
      <p>Click the link below and get in touch with me on LinkedIn.</p>
      <div class="social-wrapper">
        <a href="https://www.linkedin.com/in/samuel-earl/" target="_blank">
          <Icon icon="bi:linkedin" color="#0982c0" width="50" />
          <span class="label">LinkedIn</span>
        </a>
      </div>
    </div>
    <div class="right">
      <img src={Bitmoji} alt="contact">
    </div>
  </div>

  <!-- <div slot="bottom">
    <h2>send me an email</h2>
    <form>
      <div>
        <Input type="text" bind:value={name} label="Your Name" />
      </div>
      <br>
      <div>
        <Input type="text" bind:value={subject} label="Subject" />
      </div>
      <br>
      <div>
        <Input type="text" bind:value={email} label="Your Email Address" />
      </div>
      <br>
      <div>
        <Textarea label="Message" bind:value={message} rows="5" />
      </div>
      <br>
      TODO: Turnstile is Cloudflare's alternative to CAPTCHA verification.
      <div class="cf-turnstile" data-sitekey="0x4AAAAAAAFXr3Nkrx70YH5C" data-callback="javascriptCallback"></div>
      <br>
      <div>
        <Button type="submit" formIsInvalid={checkFormValidation()} {disabled} btnIcon="fa:send">
          Send
        </Button>
      </div>
    </form>
  </div> -->
</Page>

<style>
  @media (--xs-up) {
    .top {
      margin-bottom: 40px;

      & .left {
        margin-bottom: 60px;

        & p {
          font-size: 1.5rem;
          margin-bottom: 40px;
        }

        & .social-wrapper {

          & a {
            display: flex;
            align-items: center;
            border: none;

            & .label {
              margin-left: 10px;
              font-size: 2rem;
              color: #0982c0;
            }
          }
        }
      }
    }
  }

  @media (--lg-up) {
    .top {
      display: flex;

      & .left {
        flex: 1;
        margin-right: 50px;

        & p {
          margin-bottom: 60px;
        }
      }

      & .right {
        flex: 1;
        padding-top: 20px;
      }
    }
  }
</style>
