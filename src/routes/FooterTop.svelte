<script lang="ts">
  // import Logo from "/src/assets/images/logo-white.svg";

  const beginningYear = 2023;
  const currentYear = new Date().getFullYear();
  const copyrightYears = beginningYear === currentYear ? currentYear : `${beginningYear} - ${currentYear}`;
</script>

<footer class="fp-container">
  <div class="footer-top">
    <div class="logo-wrapper">
      <!-- <a href="/"><img src={Logo} class="logo" alt="logo" /></a> -->
    </div>
    <div class="copyright-wrapper">
      &#169; {copyrightYears} Samuel Earl
    </div>
  </div>
</footer>

<style>
  @media (--xs-up) {
    footer {
      color: var(--white);

      & .footer-top {
        display: flex;
        flex-direction: column;
        padding-top: 40px;
        padding-bottom: 40px;

        & .logo-wrapper {
          margin-bottom: 20px;
        
          & .logo {
            height: 40px;
          }
        }
      }
    }
  }

  @media (--lg-up) {
    footer {

      & .footer-top {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & .logo-wrapper {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
