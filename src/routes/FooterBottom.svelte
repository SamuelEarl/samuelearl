<footer class="fp-container">
  <nav class="footer-bottom legal-nav">
    <ul class="legal-nav-list">
      <li class="legal-nav-item">
        <!-- <a href="/legal/policies">Policies</a> -->
      </li>
      <li class="legal-nav-item">
        <!-- <a href="/legal/disclosures">Disclosures</a> -->
      </li>
      <li class="legal-nav-item">
        <!-- <a href="/legal/disclaimer">Disclaimer</a> -->
      </li>
      <li class="legal-nav-item">
        <!-- <a href="/legal/terms-of-use">Terms of Use</a> -->
      </li>
    </ul>
  </nav>
</footer>

<style>
  @media (--xs-up) {
    footer {

      & .footer-bottom {
        padding-top: 20px;
        padding-bottom: 20px;

        & .legal-nav-list {
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
          list-style: none;

          & .legal-nav-item {
            margin-bottom: 20px;
            
            &:last-child {
              margin-bottom: 0;
            }

            & a {  
              color: var(--neutral-400);
              border-bottom: none;
            }
          }
        }
      }
    }
  }

  @media (--lg-up) {
    footer {

      & .footer-bottom {

        & .legal-nav-list {
          flex-direction: row;
          justify-content: space-between;

          & .legal-nav-item {
            margin-bottom: 0;
          }

          /* I can uncomment the following rules to include separator lines in between each footer link. */
          /* This might be necessary if I include more legal pages in the footer. */
          /* See The Motley Fool's footer for an example (https://www.fool.com/). */
          /* & .legal-nav-item {
            flex: 1;
            display: flex;
            justify-content: center;
            margin-bottom: 0;
            border-left: 1px solid var(--neutral-500);

            &:last-child {
              border-right: 1px solid var(--neutral-500);
            }
          } */
        }
      }
    }
  }
</style>
