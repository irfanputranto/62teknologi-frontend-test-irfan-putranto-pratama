<script setup lang="ts">
defineProps(['title', 'badge', 'description', 'image', 'categories', 'alt', 'location', 'linkName', 'linkParams'])
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure >
      <img :src="image" :alt="alt" class="h-48 w-96 object-cover rounded-md"  />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
      <router-link :to="{name: linkName, params: linkParams }">{{ title }}</router-link>
       
        <div class="badge badge-success text-white" v-if="badge">{{ badge }}</div>
      </h2>
      <span v-if="location" class="text-sm">location : {{ location }}</span>
      <p>{{ description }}</p>

      <div class="card-actions justify-end" v-if="categories">
        <div class="badge badge-outline" v-for="(item, index) in categories" :key="index">{{ item.title }}</div>
      </div>
    </div>

  </div>
</template>