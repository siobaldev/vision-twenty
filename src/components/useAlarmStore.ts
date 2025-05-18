import { create } from "zustand";

interface alarmState {
  alarm: string;
  volume: string;
  setAlarm: (newAlarm: string) => void;
  setVolume: (newVolume: string) => void;
}

export const useAlarmStore = create<alarmState>((set) => ({
  alarm: "",
  volume: "",
  setAlarm: (newAlarm: string) => {
    localStorage.setItem("alarmSound", newAlarm);
    set({ alarm: newAlarm });
  },
  setVolume: (newVolume: string) => {
    localStorage.setItem("volume", newVolume);
    set({ volume: newVolume });
  },
}));
