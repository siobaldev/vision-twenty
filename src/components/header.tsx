import { ThemeSwitcher } from "./themeSwitcher";
import { RiSettings3Fill } from "react-icons/ri";
import { RiMusic2Fill } from "react-icons/ri";
import Logo from "./logo";

export default function Header() {
  return (
    <div className="absolute top-0 w-full flex justify-between items-center pt-10">
      <Logo />
      <div className="flex gap-x-6 md:gap-x-10">
        <RiMusic2Fill className="size-8 sm:size-12" />
        <ThemeSwitcher />
        <RiSettings3Fill className="size-8 sm:size-12" />
      </div>
    </div>
  );
}
