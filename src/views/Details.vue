<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDataStore } from '../store/dataStore';
import LoadingVue from '../components/Loading.vue';
import RatingVue from '../components/Rating.vue';
import ReviewVue from '../components/Review.vue';
import BMapsVue from '../components/BMaps.vue';
import { FwbCarousel } from 'flowbite-vue'

const detailsStore = useDataStore();
const router = useRoute();
const detailIds = ref(router.params.id);

onMounted(() => {
    detailsStore.fetchDataDetail(detailIds.value);
    
    reviewList(detailIds.value);
})

const imgs = (img: []) => {
    return img.map((item: { src: string, alt: string }) => ({
        src: item,
        alt: 'img-' + 1,
    }));
}

const reviewList = (id: any) => {
    detailsStore.fetchReviewList(id);
}

</script>

<template>
    <div class="flex" v-if="detailsStore.isLoading">
        <LoadingVue />
    </div>

    <div v-if="!detailsStore.isLoading && detailsStore.singleData">
        <div class="flex p-4 bg-white rounded-md shadow-md mx-10 mt-10">
            <div class="flex-none w-1/2 mr-4">
                <fwb-carousel :pictures="imgs(detailsStore.singleData.photos)" animation :slide-interval="5000" class="mx-10" />
            </div>

            <div class="flex-grow">
                <h2 class="text-xl font-semibold mb-2">{{ detailsStore.singleData.name }}</h2>
                <p class="text-gray-600 mb-4">A brief explanation of the business and products offered.</p>
                <div class="flex items-center justify-between">
                    <span class="badge badge-success text-white">{{ detailsStore.singleData.price }}</span>
                </div>

                <div class="mt-2">
                    <RatingVue :value="detailsStore.singleData.rating" />
                </div>
                <div>
                    <span v-if="detailsStore.singleData.location" class="text-sm">location : {{
                        detailsStore.singleData.location.address1 }}</span>
                </div>
                <div class="mt-2">
                    <div class="badge badge-info mr-2 text-white"
                        v-for="(item, index) in detailsStore.singleData.categories" :key="index">{{ item.title }}</div>
                </div>

                <!-- see on gmaps -->
                <div class="mt-2">
                <BMapsVue :latitude="detailsStore.singleData.coordinates.latitude"
                :longtitude="detailsStore.singleData.coordinates.longitude" class="btn-error w-40" />
                </div>
            </div>
        </div>
        <!-- review  -->
        <ReviewVue :title="'Review'" :review-list="detailsStore.reviewList.reviews" />
    </div>

</template>
