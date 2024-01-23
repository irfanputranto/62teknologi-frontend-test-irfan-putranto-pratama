<script setup lang="ts">
const props = defineProps(['class']);
</script>

<template>
   <button class="btn btn-primary" :class="props.class">
    <slot></slot>
   </button>
</template>