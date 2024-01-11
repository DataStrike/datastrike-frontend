import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChangeEvent, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

export function Teams() {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-semibold">Teams</div>
      <Card className="w-72">
        <CardHeader>
          <CardTitle>Create</CardTitle>
          <CardDescription>Create a team</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button className="w-full">
            <PlusIcon />
            Create
          </Button>
        </CardContent>
      </Card>

      <Card className="w-72">
        <CardHeader>
          <CardTitle>Join</CardTitle>
          <CardDescription>Join a team from its code</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Input
            placeholder="Code"
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value)
            }
          />
          <Button disabled={code.length === 0} className="mt-2 w-full">
            Join
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
