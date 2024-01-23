<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps(['label', 'options', 'class', 'classTitle'])
const id = `select-${Math.floor(Math.random() * 1000)}`;
const selectedOption = ref<string | null>(null);
const emits = defineEmits(['option-selected']);

const handlerSelectChange = () => {
    const event = new CustomEvent('option-selected', {
        detail: {label: props.label, value: selectedOption.value},
    })
    
    emits('option-selected', event);
}

if (props.options) {
    selectedOption.value = props.options.length > 0 ? props.options[0].value : null;
}
</script>

<template>
    <div>
        <label for="id" v-if="label" class="mb-60" :class="props.classTitle">{{ label }} </label>
        <select :id="id" v-model="selectedOption" @change="handlerSelectChange" class="select select-bordered p-2" :class="props.class">
            <option disabled selected>Choose</option>
            <option v-for="(option, index) in options" :key="index" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>