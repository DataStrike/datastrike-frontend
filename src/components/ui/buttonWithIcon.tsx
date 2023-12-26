import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
interface Props {
  icon: string;
  label: string;
  route: string;
}
export function ButtonWithIcon({ icon, label, route }: Props) {
  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const response = await ky(`${BASE_URL}/${route}/callback`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${res.access_token}`,
        },
      });

      // If response is 200, redirect to dashboard
      if (response.status === 200) {
        window.location.href = "/dashboard";
      }
    },
  });

  return (
    <Button onClick={() => login()}>
      <img src={icon + ".svg"} alt={label} className="w-6 h-6 mr-2" />
      {label}
    </Button>
  );
}
