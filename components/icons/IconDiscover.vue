<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="active ? 'color:#C084FC;stroke-width:2.5' : 'color:#334155;stroke-width:1.8'">
    <circle cx="12" cy="12" r="10"/>
    <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/>
  </svg>
</template>
<script setup>
defineProps({ active: Boolean })
</script>
