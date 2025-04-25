import Image from "next/image";
import Setting from "/public/assets/setting.svg";
import Sound from "/public/assets/sound.svg";
import { ThemeSwitcher } from "./themeSwitcher";

export default function Header() {
  return (
    <div className="absolute top-0 w-full flex justify-between items-center pt-10">
      <Image
        className="size-16 sm:size-20 md:size-24"
        src={"./assets/vision-twenty-light-logo.svg"}
        height={100}
        width={100}
        alt="vision-twenty-logo"
      />

      <div className="flex gap-x-2 md:gap-x-6">
        <Sound className="size-8 sm:size-12" />
        <ThemeSwitcher />
        <Setting className="size-8 sm:size-12" />
      </div>
    </div>
  );
}
