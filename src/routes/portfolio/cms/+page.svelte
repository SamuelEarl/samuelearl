<script lang="ts">
  import PortfolioPage from "../PortfolioPage.svelte";
  import Pages from "/src/assets/images/cms/cms-pages.png";
  import Users from "/src/assets/images/cms/cms-users.png";
</script>

<PortfolioPage>
  <h1>Content Management System (CMS)</h1>

  <p>I created a CMS as a hobby project to learn backend development better and to learn Docker. I wrote it as a single-page app with Vue.js in the front-end, hapi.js as the Node.js server, Neo4j as the database, and I used Docker Compose for a multi-container Docker environment.</p>
  
  <p>These are some of the features in this app:</p>

  <ul>
    <li>Complete authentication flow with user registration, email verification, login, and password reset</li>
    <li>Cookie authentication</li>
    <li>Admin portal where the admin can manage user permissions</li>
    <li>Public facing pages</li>
    <li>Drag and drop to reorder pages</li>
    <li>Show, hide, edit, delete pages</li>
    <li>Data validation on both the server and the client</li>
    <li>Mobile-first design</li>
  </ul>

  <div class="img-container">
    <img src={Pages} alt="CMS pages" />
    <img src={Users} alt="CMS users" />
  </div>

  <p>Feel free to clone the <a href="https://github.com/SamuelEarl/ink-cms-vue-hapi-neo4j">repo</a> and check out the code. You could follow the instructions in the README to run this app on your computer in Docker, but it might be a bit of a hassle because my environment variables for the database and other features are not included in the repo.</p>

  <p>NOTE: I was experimenting with <code>try/catch/finally</code> blocks in this project, so the API endpoints are constructed a little differently from what you might normally see.</p>
</PortfolioPage>

<style>
  @media (--xs-up) {
    .img-container {
      display: flex;
      flex-direction: column;

      & img {
        margin-bottom: 40px;
      }
    }
  }

  @media (--lg-up) {
    .img-container {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
