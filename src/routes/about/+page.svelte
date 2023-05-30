<script lang="ts">
  import Page from "/src/components/Page.svelte";
  import Photo from "/src/assets/images/profile-photo-gray-scale-round-200x200.png";
</script>

<Page>
  <div class="greeting">
    <div class="text">
      <h1>Hi,</h1>
      <h1>I'm Sam.</h1>
    </div>
    <div class="picture">
      <img src={Photo} alt="profile" />
    </div>
  </div>
</Page>

<style>
  .greeting {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .text h1 {
      font-size: 4rem;
    }
  }
</style>
