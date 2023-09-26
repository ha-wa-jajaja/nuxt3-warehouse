<template>
    <div
        class="flex w-full justify-between absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-10"
    >
        <!-- * BTN L -->
        <button
            class="w-12 h-12 bg-white -translate-x-1/2 pointer-events-auto"
            @click="emit('leftBtnEvent')"
        >
            L
        </button>

        <!-- * BTN R -->
        <button
            class="w-12 h-12 bg-white translate-x-1/2 pointer-events-auto"
            @click="emit('rightBtnEvent')"
        >
            R
        </button>
    </div>
</template>
<script setup>
const emit = defineEmits(["leftBtnEvent", "rightBtnEvent"]);
</script>
<style lang=""></style>
