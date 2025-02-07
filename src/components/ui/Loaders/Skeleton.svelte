<script lang="ts">
  interface Props {
    width?: string;
    height?: string;
    circle?: boolean;
  }

  let { width = "100%", height = "100%", circle = false }: Props = $props();

  const propStyles = `width: ${width}; height: ${height}; border-radius: ${circle ? "50%" : "var(--border-radius)"};`;
</script>

<div class="skeleton" style={propStyles}></div>

<style>
  .skeleton {
    animation: loading-pulse 1s linear infinite alternate;
  }

  @keyframes loading-pulse {
    0% {
      background-color: var(--neutral-2);
    }
    100% {
      background-color: var(--neutral-4);
    }
  }
</style>
