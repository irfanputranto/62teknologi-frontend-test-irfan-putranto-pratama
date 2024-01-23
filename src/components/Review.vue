<script setup lang="ts">
import RatingVue from './Rating.vue';

const props = defineProps(['reviewList', 'title']);
const defaultProfile = '/img/profileDefault.png';
const handlerImgError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultProfile;
}

const formatingDate = (dateTime: Date)  => {
    return new Intl.DateTimeFormat('en-EN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(dateTime);
}
</script>

<template>
<div class="p-4 bg-white rounded-md shadow-md mx-10 mt-5">
<div v-if="props.title">
            <h1 class="text-3xl font-bold mb-3">{{ props.title }}</h1>
            <hr class="border-b-2 border-gray-300 mb-6">
</div>

            <article v-for="(itemReview, index) in props.reviewList" :key="index">
                <div class="flex items-center mb-4">
                    <img class="w-10 h-10 me-4 rounded-full" v-if="itemReview.user.image_url"
                        :src="itemReview.user.image_url" alt="itemReview.user.name" @error="handlerImgError">
                    <img v-else :src="defaultProfile" alt="default" class="w-10 h-10 me-4 rounded-full">
                    <div class="font-medium dark:text-white">
                        <a :href="itemReview.user.profile_url">
                            <p>{{ itemReview.user.name }}</p>
                        </a>
                    </div>
                </div>

                <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    <RatingVue :value="itemReview.rating" class="" />
                </div>

                <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                    <p>Reviewed on <time datetime="">{{ formatingDate(new Date(itemReview.time_created)) }}</time></p>
                </footer>
                <p class="mb-2 text-gray-500 dark:text-gray-400">{{ itemReview.text }}</p>
                <hr class="border-b-2 border-gray-200 mb-6">
            </article>
        </div>
</template>