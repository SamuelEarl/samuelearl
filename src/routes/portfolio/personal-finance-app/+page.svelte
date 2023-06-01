<script lang="ts">
  import PortfolioPage from "../PortfolioPage.svelte";
  import Mobile1 from "/src/assets/images/personal-finance-app/budget-app-mobile-1.png";
  import Mobile2 from "/src/assets/images/personal-finance-app/budget-app-mobile-2.png";
  import Desktop from "/src/assets/images/personal-finance-app/budget-app-desktop.png";
</script>

<PortfolioPage>
  <h1>Personal Finance App</h1>

  <p>This app is live at app.FinancialWreck.com. However, I am rewriting it and it will be replaced with an updated version in the coming months.</p>

  <div class="img-container">
    <div class="mobile-container">
      <img src={Mobile1} alt="" />
    </div>
    <div class="mobile-container">
      <img src={Mobile2} alt="" />
    </div>
    <div class="desktop-container">
      <img src={Desktop} alt="" />
    </div>
  </div>

  <p>I wrote this app with Vue.js, serverless functions, and FaunaDB.</p>

  <p>These are some of the features in this app:</p>

  <ul>
    <li>Mobile first design</li>
    <li>Complete authentication flow using passwordless login and magic links</li>
    <li>Fully customizable budgets</li>
    <li>All edits are auto-saved</li>
    <li>Summaries for income, expenses, budgeted amounts, and bank account balance</li>
    <li>Invite another user to share your account</li>
  </ul>
</PortfolioPage>

<style>
  @media (--xs-up) {
    .img-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
      margin-bottom: 40px;

      & .mobile-container {
        width: 250px;
        margin-bottom: 20px;
      }
    }
  }

  @media (--lg-up) {
    .img-container {
      flex-direction: row;
      justify-content: space-between;

      & .mobile-container {
        width: auto;
        height: 275px;
        display: flex;
        margin-bottom: 0;
      }

      & .desktop-container {
        height: 275px;
      }
    }
  }
</style>
