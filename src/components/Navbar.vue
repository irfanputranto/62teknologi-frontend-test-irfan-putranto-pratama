<template>
  <div class="container mx-auto navbar bg-base-100">
    <div class="flex-1">
    <router-link to="/" class="btn btn-ghost text-xl">Business</router-link>
    </div>

    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/" active-class="btn-active">Home</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
