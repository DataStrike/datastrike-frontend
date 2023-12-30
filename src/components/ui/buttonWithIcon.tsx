import { Button } from "@/components/ui/button";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";

interface Props {
  icon: string;
  label: string;
  route: string;
}

export function ButtonWithIcon({ icon, label, route }: Props) {
  const authenticateWithRoute = async (route: string) => {
    try {
      const { url } = await ky.get(`${BASE_URL}/${route}/redirect`).json();
      window.location.href = url; // Redirect to oauth provider
    } catch (error) {
      console.error("Error authenticating with route:", error);
    }
  };

  return (
    <Button onClick={() => authenticateWithRoute(route)}>
      <img src={`${icon}.svg`} alt={label} className="w-6 h-6 mr-2" />
      {label}
    </Button>
  );
}
