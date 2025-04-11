import Play from "/public/assets/play.svg";
import Stop from "/public/assets/stop.svg";
export default function Timer() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-neopixel text-8xl sm:text-[8rem] md:text-[12rem] lg:text-[14rem] xl:text-[17rem] select-none">
        20:00
      </h1>
      <div className="flex gap-x-8 mt-10">
        <Stop className="size-10 sm:size-12 md:size-16 lg:size-20" />
        <Play className="size-10 sm:size-12 md:size-16 lg:size-20" />
      </div>
    </div>
  );
}
