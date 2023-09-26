<template>
    <div class="flex">
        <button
            class="h-2 mr-2 last:mr-0 transition-all duration-200 rounded-full cursor-pointer"
            :class="
                currentIdx == index - 1
                    ? 'w-3 bg-[#009345]'
                    : 'w-2 bg-[#231F20]'
            "
            v-for="index in itemLength"
            :key="`${parentComp}-nav-dot-${index}`"
            @click="emit('navTo', index - 1)"
        ></button>
    </div>
</template>
<script setup>
const props = defineProps({
    currentIdx: {
        type: Number,
        default: 0,
    },
    itemLength: {
        type: Number,
        default: 0,
    },
    parentComp: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["navTo"]);
</script>
<style lang=""></style>
