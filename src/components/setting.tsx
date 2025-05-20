"use client";

import { useState, useEffect, useRef } from "react";
import { RiSettings3Fill } from "react-icons/ri";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useAlarmStore } from "./useAlarmStore";
import { useSettingStore } from "./useSettingStore";

export default function Setting() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tempVolume, settempVolume] = useState<string>("");
  const { setAlarm, setVolume, volume } = useAlarmStore();
  const [selectedAlarm, setSelectedAlarm] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { disableSetting } = useSettingStore();

  // * Sets up the initial alarm sound from localStorage or uses a default
  useEffect(() => {
    const storedAlarm = localStorage.getItem("alarmSound");
    const storedVolume = localStorage.getItem("volume");

    setSelectedAlarm(storedAlarm || "fireflies-alarm");
    settempVolume(storedVolume || "50");
    setVolume(storedVolume || "50");
  }, [setVolume]);

  // * Sets up the selected alarm sound and captures its duration
  useEffect(() => {
    // * Early return if no alarm is selected
    if (!selectedAlarm) return;

    // * Create new audio instance with selected alarm sound
    const audio = new Audio(`/audio/${selectedAlarm}.mp3`);
    audioRef.current = audio;

    // * Cleanup function to pause or stop playing audio
    return () => {
      handleAudioCleanup();
    };
  }, [selectedAlarm, isOpen]);

  // * Updates temporary volume in real-time
  useEffect(() => {
    if (audioRef.current && isOpen && selectedAlarm) {
      // * Convert percentage to decimal (0-1 range for audio volume)
      audioRef.current.volume = Number(tempVolume) / 100;
    }
  }, [tempVolume, isOpen, selectedAlarm]);

  // * Stops any playing alarm and resets its time
  const handleAudioCleanup = () => {
    if (audioRef.current) {
      // * Pause playback and reset to beginning
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // * Function to handle alarm selection and plays sound when user selects
  const handleSelectChange = (value: string) => {
    // * Sets selected alarm
    setSelectedAlarm(value);

    // * Use setTimeout to ensure the audio element is updated with the new sound
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log("Failed to play audio: ", error);
        });
      }
    }, 0);
  };

  // * Function to handle volume change
  const handleVolumeChange = (value: string) => {
    // * Sets volume value
    settempVolume(value);
  };

  // * Function to save user settings into localStorage
  const saveSettings = () => {
    // * Sets global alarm and volume
    setAlarm(selectedAlarm);
    setVolume(tempVolume);
  };

  // * Opens/closes setting panel and ensures audio clean up
  const toggleSettings = () => {
    setIsOpen(!isOpen);

    // * Stops any currently playing alarm sound when closing settings
    if (audioRef.current && !audioRef.current.paused) {
      handleAudioCleanup();
    }
  };

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={toggleSettings}>
        <DropdownMenuTrigger
          aria-label="Setting"
          disabled={disableSetting}
          asChild
        >
          <RiSettings3Fill className="size-8 cursor-pointer sm:size-12" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-light dark:border-light/20 border-dark/20 dark:bg-dark text-dark dark:text-light mr-4 xl:mr-0">
          <DropdownMenuLabel>Alarms</DropdownMenuLabel>
          <DropdownMenuItem disabled={disableSetting}>
            <Select onValueChange={handleSelectChange} value={selectedAlarm}>
              <SelectTrigger
                onClick={(e) => e.stopPropagation()}
                className="border-dark/20 dark:border-light/20 w-[180px]"
              >
                <SelectValue placeholder="Alarm" />
              </SelectTrigger>
              <SelectContent
                onClick={(e) => e.stopPropagation()}
                className="bg-light border-dark/20 dark:bg-dark dark:border-light/20 touch-none text-base md:text-lg lg:text-xl"
              >
                <SelectItem className="cursor-pointer" value="fireflies-alarm">
                  Fireflies
                </SelectItem>
                <SelectItem
                  className="cursor-pointer"
                  value="no-surprises-alarm"
                >
                  No Surprises
                </SelectItem>
                <SelectItem
                  className="cursor-pointer"
                  value="die-for-you-alarm"
                >
                  Die For You
                </SelectItem>
                <SelectItem className="cursor-pointer" value="apocalypse-alarm">
                  Apocalypse
                </SelectItem>
                <SelectItem className="cursor-pointer" value="after-dark-alarm">
                  After Dark
                </SelectItem>
              </SelectContent>
            </Select>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-dark/20 dark:bg-light/20" />
          <DropdownMenuLabel>
            Volume <span>({volume}%)</span>
          </DropdownMenuLabel>
          <div className="flex gap-x-2 p-2">
            <span className="flex items-center gap-x-1">
              {Number(tempVolume) > 0 ? <FaVolumeHigh /> : <FaVolumeXmark />}
            </span>
            <Slider
              disabled={disableSetting}
              defaultValue={[Number(tempVolume)]}
              max={100}
              step={1}
              onValueChange={(value) => handleVolumeChange(value[0].toString())}
            />
            <span>{tempVolume}%</span>
          </div>

          <DropdownMenuSeparator className="bg-dark/20 dark:bg-light/20" />
          <div className="flex justify-between gap-x-2 px-2 py-4">
            <Button
              onClick={() => toggleSettings()}
              className="bg-orange/20 cursor-pointer"
            >
              Close
            </Button>
            <Button
              disabled={disableSetting}
              onClick={saveSettings}
              className="bg-orange cursor-pointer"
            >
              Save
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
