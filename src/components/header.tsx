import Image from "next/image";
import { ThemeSwitcher } from "./themeSwitcher";
import { RiSettings3Fill } from "react-icons/ri";
import { RiMusic2Fill } from "react-icons/ri";

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

      <div className="flex gap-x-6 md:gap-x-10">
        <RiMusic2Fill className="size-8 sm:size-12" />
        <ThemeSwitcher />
        <RiSettings3Fill className="size-8 sm:size-12" />
      </div>
    </div>
  );
}
