import "../globals.css";
import { ButtonWithIcon } from "@/components/ui/buttonWithIcon.tsx";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-semibold mb-3">Login</h1>
      <div className="flex gap-2">
        <ButtonWithIcon icon={"google"} label={"Google"} route={"google"} />
      </div>
    </div>
  );
}

export default Home;
