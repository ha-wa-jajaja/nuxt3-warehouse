<!-- npm install @egjs/vue3-flicking -->
<!-- npm install @egjs/flicking-plugins -->
<template>
    <section class="w-full relative bg-slate-100">
        <Flicking
            ref="flicking_side_l"
            class="flicking-box w-[28%] border border-green-300 !absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none -translate-x-[80%]"
            :options="{
                circular: true,
                horizontal: true,
                moveType: 'strict',
                interruptable: false,
            }"
            :hideBeforeInit="true"
        >
            <div
                class="panel w-full h-full bg-white flex flex-row-reverse"
                v-for="(slide, index) in slides"
                :key="`home-slide-hap-${index}-lg`"
            >
                <h1 class="text-[72px]">{{ slide }}</h1>
            </div>
        </Flicking>

        <main class="temp-container border border-red-500">
            <div
                class="w-full relative flex justify-between items-center"
            >
                <Flicking
                    :plugins="plugins"
                    ref="flicking_main"
                    class="flicking-box w-[49%] border border-green-300"
                    :options="{
                        circular: true,
                        horizontal: true,
                        moveType: 'strict',
                        interruptable: false,
                    }"
                    :hideBeforeInit="true"
                    @will-change="flickingChanged"
                >
                    <div
                        class="panel w-full h-full bg-white"
                        v-for="(slide, index) in slides"
                        :key="`home-slide-hap-${index}-lg`"
                    >
                        <h1 class="text-[72px]">
                            {{ slide }}
                        </h1>
                    </div>
                </Flicking>

                <HomeNavigationBtnHome
                    @leftBtnEvent="navPrev"
                    @rightBtnEvent="navNext"
                />

                <section class="w-[46%]">
                    <div
                        class="w-full bg-white px-6 py-8 mb-6 rounded-xl"
                    >
                        <p class="mb-4">title</p>
                        <div class="flex mb-4">
                            time & location
                        </div>
                        <div class="mb-4">tag</div>
                        <div class="mb-4 line-clamp-2">
                            description
                        </div>
                        <button>learn more btn</button>
                    </div>

                    <HomeNavigationDots
                        :current-idx="slideIdx"
                        :item-length="slides.length"
                        :parent-comp="'home-hap-side'"
                        @navTo="navTo"
                    />

                    <button
                        class="mt-8 border border-black"
                    >
                        view all btn
                    </button>
                </section>
            </div>
        </main>

        <Flicking
            ref="flicking_side_r"
            class="flicking-box w-[28%] border border-green-300 !absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none translate-x-[80%]"
            :options="{
                circular: true,
                horizontal: true,
                moveType: 'strict',
                interruptable: false,
            }"
            :hideBeforeInit="true"
        >
            <div
                class="panel w-full h-full bg-white"
                v-for="(slide, index) in slides"
                :key="`home-slide-hap-${index}-lg`"
            >
                <h1 class="text-[72px]">{{ slide }}</h1>
            </div>
        </Flicking>
    </section>
</template>
<script setup>
import Flicking from "@egjs/vue3-flicking";
import { Sync } from "@egjs/flicking-plugins";

const slides = computed(() => [1, 2, 3, 4, 5, 6, 7, 8]);

const flicking_main = ref(null);
const {
    flickingNavigate,
    slideIdx,
    flickingChanged,
    flickingNavigateTo,
} = useFlickingCtrl();

function navPrev() {
    flickingNavigate(flicking_main, false);
}

function navNext() {
    flickingNavigate(flicking_main, true);
}
function navTo(idx) {
    flickingNavigateTo(flicking_main, idx);
}

const flicking_side_l = ref(null);
const flicking_side_r = ref(null);
const plugins = ref([]);
onMounted(async () => {
    await nextTick();
    plugins.value = [
        new Sync({
            type: "camera",
            synchronizedFlickingOptions: [
                {
                    flicking: flicking_main.value,
                    isSlidable: true,
                },
                {
                    flicking: flicking_side_l.value,
                    isClickable: true,
                },
                {
                    flicking: flicking_side_r.value,
                    isClickable: true,
                },
            ],
        }),
    ];
});
</script>
<style>
@import url("node_modules/@egjs/vue3-flicking/dist/flicking.css");
.temp-container {
    position: relative;
    width: 100%;
    padding: 0 120px;
    max-width: 1440px;
    margin: 0 auto;
}

.flicking-box {
    aspect-ratio: 1/1;
}
</style>
