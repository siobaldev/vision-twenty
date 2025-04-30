"use client";

import { useState, useEffect, useRef } from "react";
import { IoStop } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { IoPause } from "react-icons/io5";

export default function Timer() {
  const initialTime = 20 * 60;
  const restTime = 20;
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [audioDuration, setAudioDuration] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let intervalID: NodeJS.Timeout | undefined;
    let timeoutID: NodeJS.Timeout | undefined;

    if (!audioRef.current) {
      const audio = new Audio("/audio/fireflies-alarm.mp3");
      audioRef.current = audio;

      const handleAudioData = () => {
        const duration = audio.duration;
        setAudioDuration(duration);
      };

      audio.addEventListener("loadedmetadata", handleAudioData);

      return () => {
        audio.removeEventListener("loadedmetadata", handleAudioData);
      };
    }

    if (isRunning && timeLeft > 0) {
      intervalID = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isResting) {
      audioRef.current!.play();
      timeoutID = setTimeout(() => {
        setIsResting(true);
        setTimeLeft(restTime);
      }, audioDuration * 1000);
    }

    if (timeLeft === 0 && isResting) {
      audioRef.current!.play();
      timeoutID = setTimeout(() => {
        setIsResting(false);
        setTimeLeft(initialTime);
      }, audioDuration * 1000);
    }

    return () => {
      clearTimeout(timeoutID);
      clearInterval(intervalID);
    };
  }, [isRunning, timeLeft, isResting, audioDuration, initialTime]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    if (audioRef.current && !audioRef.current?.paused) {
      audioRef.current!.pause();
      audioRef.current.currentTime = 0;
    }
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const formatTime = (second: number): string => {
    const mins = Math.floor(second / 60);
    const secs = second % 60;

    const formattedMins = mins.toString().padStart(2, "0");
    const formattedSecs = secs.toString().padStart(2, "0");

    const finalMins = formattedMins.replace(/0/g, "O");
    const finalSecs = formattedSecs.replace(/0/g, "O");

    return `${finalMins}:${finalSecs}`;
  };

  return (
    <div className="flex flex-col items-center gap-y-4 justify-center">
      <h1 className="font-orbitron text-7xl min-[30rem]:text-8xl sm:text-[8rem] md:text-[12rem] tracking-wider lg:text-[12rem] select-none">
        {formatTime(timeLeft)}
      </h1>
      <div className="flex gap-x-10 mt-10">
        <button onClick={resetTimer}>
          <IoStop className="size-14 sm:size-16 md:size-20" />
        </button>

        <button onClick={toggleTimer}>
          {isRunning ? (
            <IoPause className="size-14 sm:size-16 md:size-20" />
          ) : (
            <IoPlay className="size-14 sm:size-16 md:size-20" />
          )}
        </button>
      </div>
    </div>
  );
}
