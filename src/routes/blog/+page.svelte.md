<script lang="ts">
  import Page from "/src/components/Page.svelte";
</script>

# a few thoughts

<div class="content">
  <div class="left-col">
    <div class="topic">
      <h2>cyber &amp; web security</h2>
      <ul>
        <li><a href="/blog/cyber-and-web-security/defend-against-cyber-attacks">How to Defend Yourself Against Cyber Attacks</a></li>
      </ul>
    </div>
    <div class="topic">
      <h2>domains &amp; hosting</h2>
      <ul>
        <li><a href="/blog/domains-and-hosting/cloudflare-domain-vercel-hosting">How to Use a Cloudflare Domain with Vercel Hosting</a></li>
        <li><a href="/blog/domains-and-hosting/create-redirect-for-www-on-cloudflare">How to Create a Redirect for `www` on Cloudflare</a></li>
      </ul>
    </div>
    <!-- <div class="topic">
      <h2>git</h2>
      <ul>
        <li><a href="/blog/git/software-development-workflow-with-git">Software Development Workflow with Git</a></li>
      </ul>
    </div> -->
  </div>
  <div class="right-col">
    <div class="topic">
      <h2>graph databases</h2>
      <ul>
        <li><a href="/blog/graph-databases/web-development-with-tigergraph">Web Development with TigerGraph</a></li>
        <!-- <li><a href="/blog/graph-databases/nebulagraph">NebulaGraph</a></li> -->
        <!-- <li><a href="/blog/graph-databases/amazon-neptune">Amazon Neptune</a></li> -->
        <!-- <li><a href="/blog/graph-databases/edgedb">EdgeDB - A Relational-Graph Database</a></li> -->
      </ul>
    </div>
    <!-- <div class="topic">
      <h2>identity &amp; access management (IAM)</h2>
      <ul>
        <li><a href="/blog/iam/iam-sveltekit-firebase-auth">IAM with SvelteKit and Firebase Auth</a></li>
      </ul>
    </div> -->
    <div class="topic">
      <h2>javascript</h2>
      <ul>
        <li><a href="/blog/javascript/invoke-apis-concurrently-with-promise-all">Invoke APIs Concurrently with Promise.all()</a></li>
        <li><a href="/blog/javascript/working-with-dates-in-javascript">Working with Dates in JavaScript</a></li>
      </ul>
    </div>
    <div class="topic">
      <h2>technical interviews</h2>
      <ul>
        <li><a href="/blog/technical-interviews/good-bad-ugly">The Good, The Bad & The Ugly</a></li>
      </ul>
    </div>
  </div>
</div>

<style>
  h1 {
    margin-bottom: 25px;
  }

  h2 {
    margin: 0; 
    font-size: 2rem;
    font-weight: 700;
  }

  @media (--xs-up) {
    .content {
      display: flex;
      flex-direction: column;

      & .topic {
        margin-bottom: 40px;
      }
    }
  }

  @media (--lg-up) {
    .content {
      flex-direction: row;
      gap: 0 50px;
    }
  }
</style>
