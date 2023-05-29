<script lang="ts">
  const beginningYear = 2023;
  const currentYear = new Date().getFullYear();
  const copyrightYears = beginningYear === currentYear ? currentYear : `${beginningYear} - ${currentYear}`;
</script>

<footer class="fp-container">
  <div class="footer-top">
    <div class="copyright-wrapper">
      &#169; {copyrightYears} Samuel Earl
    </div>
    <div class="nav-wrapper">
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
        color: var(--text-color-default);

        & .nav-wrapper {
          margin-bottom: 20px;
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

        & .nav-wrapper {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
