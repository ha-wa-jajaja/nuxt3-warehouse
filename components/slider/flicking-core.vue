<!-- npm install @egjs/vue3-flicking -->
<template>
    <Flicking
        ref="flicking"
        class="w-full"
        :options="{
            circular: true,
            horizontal: true,
            moveType: 'strict',
            interruptable: false,
        }"
        :hideBeforeInit="true"
        @will-change="flickingChanged"
    >
        <slot></slot>
    </Flicking>
</template>
<script setup>
import Flicking from "@egjs/vue3-flicking";

const flicking = ref(null);

const {
    flickingNavigate,
    slideIdx,
    flickingChanged,
    flickingNavigateTo,
} = useFlickingCtrl();

function navPrev() {
    flickingNavigate(flicking, false);
}

function navNext() {
    flickingNavigate(flicking, true);
}
function navTo(idx) {
    flickingNavigateTo(flicking, idx);
}

defineExpose({ navPrev, navNext, navTo, flicking });
</script>
<style lang=""></style>
