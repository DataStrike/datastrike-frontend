import { Button } from "@/components/ui/button";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { useNavigate } from "react-router-dom";

interface Props {
  icon: string;
  label: string;
  route: string;
}

interface Url {
  url: string;
}

export function ButtonWithIcon({ icon, label, route }: Props) {
  let navigate = useNavigate();
  const authenticateWithRoute = async (route: string) => {
    try {
      // Check if user is already logged in
      const res = await ky.get(`${BASE_URL}/me`, {
        credentials: "include",
      });
      if (res.status === 200) {
        navigate("/tracker");
        return;
      }
    } catch (error) {
      const res = await ky.get(`${BASE_URL}/${route}/redirect`);
      const url: Url = await res.json();
      switch (route) {
        case "discord":
          window.location.href = url.url + "&prompt=none";
          break;
        case "google":
          window.location.href = url.url + "&prompt=consent";
          break;
        default:
          break;
      }
    }
  };

  return (
    <Button className="h-12" onClick={() => authenticateWithRoute(route)}>
      <img src={`${icon}.svg`} alt={label} className="w-6 h-6 mr-2" />
      <span>{label}</span>
    </Button>
  );
}
