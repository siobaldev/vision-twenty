import { create } from "zustand";

type settingState = {
  disableSetting: boolean;
  setDisableSetting: (newValue: boolean) => void;
};

export const useSettingStore = create<settingState>((set) => ({
  disableSetting: false,
  setDisableSetting: (newValue: boolean) => set({ disableSetting: newValue }),
}));
