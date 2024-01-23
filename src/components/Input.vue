<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['label', 'placeholder', 'class']);
const emits = defineEmits(['input-text-custom']);

const inputId = `input-${Math.floor(Math.random() * 1000)}`;
const valueInput = ref('');

const emitInputChange = () => {
    emits('input-text-custom', valueInput.value);
}

</script>

<template>
    <div>
        <input type="text" :id="inputId" v-model="valueInput" @input="emitInputChange" :placeholder="props.placeholder" class="input input-bordered" :class="props.class">
    </div>
</template>