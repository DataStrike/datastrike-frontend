import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/constants.ts";
import ky from "ky";
interface Props {
  icon: string;
  label: string;
  route: string;
}
export function ButtonWithIcon({ icon, label, route }: Props) {
  const login = async () => {
    const response = await ky(`${BASE_URL}/${route}/redirect`);
    const data = await response.json();
    console.log(data);
  };

  return (
    <Button onClick={login}>
      <img src={icon + ".svg"} alt={label} className="w-6 h-6 mr-2" />
      {label}
    </Button>
  );
}
