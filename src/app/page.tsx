import Header from "@/components/header";
import Timer from "@/components/timer";
import TimerInfo from "@/components/timerInfo";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="h-screen relative flex flex-col items-center justify-center">
        <Header />
        <Timer />
      </div>
      <TimerInfo />
    </div>
  );
}
