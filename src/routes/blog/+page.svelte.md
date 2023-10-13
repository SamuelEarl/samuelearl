<script lang="ts">
  import Page from "/src/components/Page.svelte";
</script>

# a few thoughts

<div class="grid">
  <div> 
    <h2>cyber &amp; web security</h2>
    <ul>
      <li><a href="/blog/cyber-and-web-security/defend-against-cyber-attacks">How to Defend Yourself Against Cyber Attacks</a></li>
    </ul>
  </div>
  <div>
    <h2>domains &amp; hosting</h2>
    <ul>
      <li><a href="/blog/domains-and-hosting/cloudflare-domain-vercel-hosting">How to Use a Cloudflare Domain with Vercel Hosting</a></li>
      <li><a href="/blog/domains-and-hosting/create-redirect-for-www-on-cloudflare">How to Create a Redirect for `www` on Cloudflare</a></li>
    </ul>
  </div>
  <!-- <div>
    <h2>identity &amp; access management (IAM)</h2>
    <ul>
      <li><a href="/blog/iam/iam-sveltekit-firebase-auth">IAM with SvelteKit and Firebase Auth</a></li>
    </ul>
  </div> -->
  <div>
    <h2>technical interviews</h2>
    <ul>
      <li><a href="/blog/technical-interviews/good-bad-ugly">The Good and The Bad & Ugly</a></li>
    </ul>
  </div>
</div>

<style>

  h2 {
    margin-top: 20px; 
    font-size: 2rem;
    font-weight: 700;
  }

  ul {
    margin-top: 20px;
  }

  @media (--xs-up) {
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0 30px;
    }
  }

  @media (--lg-up) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
