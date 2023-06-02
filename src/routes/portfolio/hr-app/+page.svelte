<script lang="ts">
  import PortfolioPage from "../PortfolioPage.svelte";
  import ZoomAndPan from "/src/assets/images/hr-app/zoom-and-pan.gif";
  import Search from "/src/assets/images/hr-app/search-for-people.gif";
  import ClickToCenter from "/src/assets/images/hr-app/click-to-center.gif";
</script>

<PortfolioPage>
  <h1>Human Resources App</h1>

  <p>The following images of a company org chart are part of a larger project that is being created with Svelte.js, GraphQL, D3.js, a graph database, and serverless functions.</p>
  
  <p>These are some of the features in this app:</p>

  <h2>Full Zoom And Pan Capability</h2>

  <p><img src={ZoomAndPan} alt="zoom and pan" /></p>

  <p>The zoom and pan feature allows users to see and navigate the entire organization easily. This is especially helpful for very large organizations where a list view would be too cumbersome to work with.</p>

  <h2>Search By First Name, Last Name, Or Title</h2>

  <p><img src={Search} alt="search for people" /></p>

  <p>Users can search for an individual by first name, last name, or title. When the user clicks on one of the people in the search results, that person is centered in the org chart. The user can then perform an action, such as view the person's profile, move the person to another place in the org chart, add a new person to the chart, etc.</p>

  <h2>Click To Center</h2>

  <p><img src={ClickToCenter} alt="click to center" /></p>

  <p>When a user clicks on a person's card in the org chart, that person's card will be centered and it will be highlighted for a couple of seconds.</p>
</PortfolioPage>
