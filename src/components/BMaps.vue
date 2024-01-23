<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps(['latitude', 'longtitude']);

const MapsLinks = computed(() => {
    return `https://www.google.com/maps?q=${props.latitude},${props.longtitude}`;
})

</script>
<template>
        <a :href="MapsLinks" target="_blank" class="btn  rounded-md text-white">See on Google Maps</a>
</template>