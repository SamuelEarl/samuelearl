<script lang="ts">
  import PortfolioPage from "../PortfolioPage.svelte";
  import HomepageOpenMenu from "/src/assets/images/data-scientist-dashboard/homepage-open-menu.png";
  import AddDataSources from "/src/assets/images/data-scientist-dashboard/add-data-sources.png";
  import InsertWidgets from "/src/assets/images/data-scientist-dashboard/insert-widgets.png";
  import CreateChartWidget from "/src/assets/images/data-scientist-dashboard/create-chart-widget.gif";
  import CreateTableWidget from "/src/assets/images/data-scientist-dashboard/create-table-widget-move-and-resize.gif";
  import LivePreview from "/src/assets/images/data-scientist-dashboard/change-title-and-live-preview.gif";
</script>

<PortfolioPage>
  <h1>Data Scientist Dashboard</h1>

  <p><em>NOTE: The following examples use test (or dummy) data, so no sensitive data is being exposed in these examples.</em></p>

  <p>While working at Kemper, I was asked to create a dashboard application that the data science team could use to present their findings to executives. A data scientist could create a dashboard, add data sources to their dashboard, create tables and charts, publish the dashboard, and share the published link with anyone inside the company.</p>
  
  <p>I was the sole developer on this project, which was created with a Python backend (using FastAPI), a SvelteKit frontend, and a Postgres database. It ran inside Docker containers for local development and Kubernetes in the production environment.</p>
  
  <p>These are some of the features in this app:</p>

  <h2>View, Edit, Delete, Or Create New Dashboards</h2>

  <p><img src={HomepageOpenMenu} alt="homepage with open menu" /></p>

  <p>The dashboards were organized by business unit. Data scientists could create as many dashboards as they wanted.</p>

  <h2>Add Data Sources</h2>

  <p><img src={AddDataSources} alt="add data sources" /></p>

  <p>To create data sources for a dashboard, data scientists would copy and paste the file path of a data file (e.g. a CSV file) that was stored in S3. The data sources in each dashboard were only available in that specific dashboard. In other words, no one could access another person's data sources.</p>

  <h2>Insert Widgets</h2>

  <p><img src={InsertWidgets} alt="insert widgets" /></p>

  <p>Data scientists could insert widgets and then create either a data table or a chart inside each widget. Data scientists had the option of inserting individual widgets or a predefined layout that filled the entire dashboard.</p>

  <h2>Create Chart Widgets</h2>

  <p><img src={CreateChartWidget} alt="create chart widget" /></p>

  <p>When data scientists selected the chart widget they could attach a data source to the chart and then define the chart parameters, including axes and the data that would populate the chart. End users could filter the data that was displayed in the chart from a dropdown menu located at the bottom of the chart.</p>

  <h2>Create Table Widgets</h2>

  <p><img src={CreateTableWidget} alt="create table widget" /></p>

  <p>When data scientists selected the table widget they could attach a data source to the table and a table would get created with the data. The table widgets were not necessarily used in a final dashboard. They were often used to inspect the data in the dataset as data scientists were creating their charts.</p>

  <h2>Live Preview</h2>

  <p><img src={LivePreview} alt="live preview" /></p>

  <p>Data scientists could click the "Live Preview" button to see how their finished dashboard would look to an executive or another stake holder after it was published.</p>
</PortfolioPage>


<style>
  img {
    border: var(--border-default);
    box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.4);
  }
</style>
