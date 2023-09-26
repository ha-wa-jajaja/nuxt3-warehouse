<template>
    <div>
        <div class="input-code">
            <div
                class="input-code-block"
                v-for="codeIndex in 6"
                :key="`input-code-${codeIndex}`"
                @click="focusInput(codeIndex)"
            >
                <input
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    ref="verificationBlocks"
                    :value="val[codeIndex - 1]"
                    @input="
                        checkInput(codeIndex - 1, $event)
                    "
                    @keyup.left="prevInput(codeIndex)"
                    @keyup.right="nextInput(codeIndex)"
                    @blur="blurFunc(codeIndex)"
                />
            </div>
        </div>

        <!-- * Slot for error message -->
        <slot name="error"> </slot>
    </div>
</template>

<script setup>
const props = defineProps({
    // v model handling
    modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

// val & emitting
const val = ref([]);

const checkInput = (idx, event) => {
    if (event.target.value == "") {
        val.value[idx] = null;
        prevInput(idx + 1);
    } else if (/[0-9]/g.test(event.target.value)) {
        val.value[idx] = event.target.value;
        nextInput(idx + 1);
    } else if (!/[0-9]/g.test(event.target.value)) {
        event.target.value = "";
    }
};
const parsed_val = computed(() => val.value.join(""));
watch(parsed_val, (value) => {
    emit("update:modelValue", value);
});

// error handling
const error = ref(false);
const setError = (bool) => {
    error.value = bool;
};

const blurInput = () => {
    focusedInput.value = null;
};

defineExpose({
    setError,
    blurInput,
});

// input controls
const verificationBlocks = ref(null);

const focusedInput = ref(null);

const focusInput = (num) => {
    focusedInput.value = num;
    verificationBlocks.value[num - 1].focus();
    nextTick(() => {
        verificationBlocks.value[num - 1].setSelectionRange(
            0,
            2
        );
    });
};

const prevInput = (num) => {
    if (num !== 1) {
        focusedInput.value = num - 1;
        verificationBlocks.value[num - 2].focus();
        nextTick(() => {
            verificationBlocks.value[
                num - 2
            ].setSelectionRange(0, 2);
        });
    }
};
const nextInput = (num) => {
    if (num !== 6) {
        focusedInput.value = num + 1;
        verificationBlocks.value[num].focus();
        nextTick(() => {
            verificationBlocks.value[num].setSelectionRange(
                0,
                2
            );
        });
    }
};

function blurFunc(idx) {
    if (idx == 6) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
}
onMounted(() => {
    for (let x = 1; x <= 6; x++) {
        val.value.push(null);
    }
});
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}

.input-code {
    display: flex;
}

.input-code-block {
    overflow: hidden;

    /* default styles */
    border: 1px solid gray;
    width: 48px;
    height: 66px;
}

.input-code-block input {
    width: 100%;
    height: 100%;
    text-align: center;
    &:focus {
        outline: none;
    }
}
</style>
