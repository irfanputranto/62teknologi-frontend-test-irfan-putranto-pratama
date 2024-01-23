<script setup lang="ts">
import {ref, computed} from 'vue';
import { useDataStore } from '../store/dataStore';

const store = useDataStore();
const props = defineProps(['totalItems', 'itemsPerPage', 'offset']);
const emits = defineEmits(['page-change']);

const currentPage = ref(store.currentPage);
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const goToPage = (page: number) => {
    scrollToTop();
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        
        emits('page-change', {
            offset: calculateOffset(page),
            limit: props.itemsPerPage,
        })
    }
} 

const calculateOffset = (page: number) => {
    return (page -1) * props.itemsPerPage + props.offset;
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
</script>


<template>
    <div class="join">
        <button class="join-item btn" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" :class="{'cursor-not-allowed': currentPage === 1}" ><</button>
        <button class="join-item btn">Page {{ currentPage }}</button>
        <button class="join-item btn" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" :class="{'cursor-not-allowed' : currentPage === totalPages}">></button>
    </div>
  
</template>