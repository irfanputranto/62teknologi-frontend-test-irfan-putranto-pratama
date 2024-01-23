<script setup lang="ts">
import {ref, onMounted} from 'vue';

const showText = ref(false);

onMounted(() => {
  setTimeout(() => {
    showText.value = true;
  }, 500);
});

</script>

<template>
  <div
    class="hero min-[50px]-screen"
    style="
      background-image: url(/img/hero-bg.jpg);
    "
  >
    <div class="hero-overlay bg-opacity-60">
      <div class="hero-content mx-auto my-56">
      <div class="flex flex-col">
        <div class="text-white font-mono text-2xl text-center">
            <span class="animate-typing text-4xl lg:text-6xl" v-if="showText">Yelp Business</span>
        </div>
        <div class="mt-14">
        <slot></slot>
        </div>
      </div>
      </div>
    
    </div>
  </div>
</template>

<style>
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.animate-typing {
  display: inline-block;
  overflow: hidden;
  border-right: 0.1em solid #ffffff;
  white-space: nowrap;
  margin-right: 0px;
  animation: typing 1s steps(10, end) 1s forwards;
}
</style>
