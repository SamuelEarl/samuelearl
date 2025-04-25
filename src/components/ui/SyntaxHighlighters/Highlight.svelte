<script lang="ts">
  import SvelteHighlight, { LineNumbers } from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";
  import python from "svelte-highlight/languages/python";
  import c from "svelte-highlight/languages/c";
  import bash from "svelte-highlight/languages/bash";
  import yaml from "svelte-highlight/languages/yaml";

  import material from "svelte-highlight/styles/material";

  interface Props {
    language: string;
    code: string;
    lineNumbers: boolean;
  }

  let {
    language,
    code,
    lineNumbers = true
  }: Props = $props();

  let lang = typescript;
  if (language === "python") lang = python;
  else if (language === "c") lang = c;
  else if (language === "bash") lang = bash;
  else if (language === "yaml") lang = yaml;
</script>

<svelte:head>
  {@html material}
</svelte:head>

{#if lineNumbers}
  <SvelteHighlight language={lang} {code} let:highlighted>
    <LineNumbers {highlighted} />
  </SvelteHighlight>
{:else}
  <SvelteHighlight language={lang} {code} />
{/if}

<br>
