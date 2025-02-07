<script lang="ts">
  import type { Snippet } from "svelte";
  import hljs from "highlight.js";
  import hljs from "highlight.js/lib/core";
  import typescript from "highlight.js/lib/languages/typescript";
  import python from "highlight.js/lib/languages/python";

  interface Props {
    children: Snippet;
    language: string;
  }

  let {
    children, 
    language
  }: Props = $props();

  hljs.registerLanguage("typescript", typescript);
  hljs.registerLanguage("python", python);

  const highlightedCode = hljs.highlight(
    children,
    { language: language }
  ).value
</script>

{@render highlightedCode()}
