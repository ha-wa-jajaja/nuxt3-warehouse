export const useFlickingCtrl = () => {
    const moving = ref(false);
    async function flickingNavigate(flicking, dir) {
        if (moving.value) return;
        moving.value = true;

        if (dir == true) {
            await flicking.value.next();
            moving.value = false;
        } else if (dir == false) {
            await flicking.value.prev();
            moving.value = false;
        }
    }

    const slideIdx = ref(0);
    function flickingChanged(ele) {
        slideIdx.value = ele.index;
    }

    async function flickingNavigateTo(flicking, idx) {
        moving.value = true;
        await flicking.value.moveTo(idx);
        moving.value = false;
    }

    return {
        moving,
        flickingNavigate,
        slideIdx,
        flickingChanged,
        flickingNavigateTo,
    };
};
