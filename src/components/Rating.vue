<script setup lang="ts"> 
import {computed} from 'vue';

const props = defineProps(['value']);
const maxRating = 5;


const fullStars  = computed(() => Math.floor(props.value));
const halfStar = computed(() => props.value % 1 !== 0);
const emptyStars = computed(() => maxRating - fullStars.value - (halfStar.value ? 1 : 0)); 

</script>

<template>
    <div class="flex items-center space-x-1">
        <span v-for="star in fullStars" :key="star" class="text-yellow-500 text-xl">★</span>
        <span v-if="halfStar" class="text-yellow-500 text-xl">★½</span>
    <span v-for="emptyStar in emptyStars" :key="emptyStar" class="text-gray-500 text-xl">★</span>
        <span class="text-gray-500">{{ props.value }}</span>
    </div>
</template>