import { readonly, ref } from "vue";

export const hSplitterRatio = ref(50);
export const vSplitterRatio = ref(0);

const vSplitterRatioSaved = ref(30);
const isLeftPanelOpen = ref(false);

const openLeftPanel = () => {
  if (!isLeftPanelOpen.value) {
    isLeftPanelOpen.value = true;
    vSplitterRatio.value = vSplitterRatioSaved.value;
  }
};

const closeLeftPanel = () => {
  if (isLeftPanelOpen.value) {
    isLeftPanelOpen.value = false;
    vSplitterRatioSaved.value = vSplitterRatio.value;
    vSplitterRatio.value = 0;
  }
};

const toggleLeftPanel = () => {
  if (isLeftPanelOpen.value) {
    closeLeftPanel();
  } else {
    openLeftPanel();
  }
};

export const useLeftPanelStore = () => ({
  isLeftPanelOpen: readonly(isLeftPanelOpen),
  openLeftPanel,
  closeLeftPanel,
  toggleLeftPanel,
});
