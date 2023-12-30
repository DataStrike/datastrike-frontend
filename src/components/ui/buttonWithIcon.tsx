import { Button } from "@/components/ui/button";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";

interface Props {
  icon: string;
  label: string;
  route: string;
}

interface Url {
  url: string;
}

export function ButtonWithIcon({ icon, label, route }: Props) {
  const authenticateWithRoute = async (route: string) => {
    try {
      // Check if user is already logged in
      const res = await ky.get(`${BASE_URL}/me`, {
        credentials: "include",
      });
      if (res.status === 200) {
        window.location.href = "/dashboard";
        return;
      }
    } catch (error) {
      const res = await ky.get(`${BASE_URL}/${route}/redirect`);
      const url: Url = await res.json();
      window.location.href = url.url;
    }
  };

  return (
    <Button onClick={() => authenticateWithRoute(route)}>
      <img src={`${icon}.svg`} alt={label} className="w-6 h-6 mr-2" />
      {label}
    </Button>
  );
}
