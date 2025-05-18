import { ThemeSwitcher } from "./themeSwitcher";
import Logo from "./logo";
import Setting from "./setting";

export default function Header() {
  return (
    <div className="absolute top-0 flex w-full items-center justify-between pt-10">
      <Logo />
      <div className="flex gap-x-6 md:gap-x-10">
        <ThemeSwitcher />
        <Setting />
      </div>
    </div>
  );
}
