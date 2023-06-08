<script lang="ts">
  import PortfolioPage from "../PortfolioPage.svelte";
  import Homepage from "/src/assets/images/loss-predictor/homepage.png";
  import FireForm from "/src/assets/images/loss-predictor/fire-form.png";
  import Prediction from "/src/assets/images/loss-predictor/prediction.png";
</script>

<PortfolioPage>
  <h1>Claims Loss Predictor</h1>

  <p>While working at Kemper, I was asked to create a loss predictor app that claims agents could use. A claims agent would interview a customer about an insurance claim and get some basic information that they would then enter into a form. When the claims agent submitted the form, a machine learning algorithm (created by data scientists) returned a prediction about the claim that would appear in a popup window. (I honestly don't know what that prediction was used for, but it helped the claims agents do their job.)</p>
  
  <p>I was the sole developer on this project, which was created with a Python backend (using FastAPI), a Vue.js frontend, and the data was saved to an S3 bucket. It ran inside Docker containers for local development and Kubernetes in the production environment.</p>
  
  <p>These are some of the features in this app:</p>

  <h2>Appealing Homepage &amp; Easy-to-Navigate Menu</h2>

  <p><img src={Homepage} alt="homepage" /></p>

  <p>One of the original challenges for this app was to figure out how to create a homepage that looked nice and that made sense for this app. Creating stylized buttons on both the homepage and in the navigation to the left seemed like the right approach.</p>

  <h2>Clean, Organized Forms For Quick Data Entry</h2>

  <p><img src={FireForm} alt="clean forms" /></p>

  <p>I wanted to make sure that agents could enter data quickly without getting lost in the forms. So I made the form fields large and gave them plenty of space between each other. The agents could tab between the fields and quickly enter their data.</p>

  <h2>Claims Prediction with Easy Data Retrieval</h2>

  <p><img src={Prediction} alt="claims prediction" /></p>

  <p>After claims agents submitted their forms, a popup window appeared along with a prediction and some data that they had to copy and paste into their notes. I made sure that the information they needed was clearly organized and added a "Copy To Clipboard" feature for quick copying and pasting.</p>
</PortfolioPage>


<style>
  img {
    box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.4);
  }
</style>
